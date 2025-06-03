<script lang="ts">
	import { currentJobData, viewMode, dispatchAnalytics } from '$lib/stores/dispatchAnalytics';
	import DemoJobCard from './DemoJobCard.svelte';
	import { MapPin, Clock, Thermometer, Droplets, Gauge, DollarSign, AlertTriangle, User, Truck, Activity, FileText, TrendingUp, Target } from 'lucide-svelte';
	import { format } from 'date-fns';

	// Drill-down handler prop (not needed for job detail but kept for consistency)
	export let handleDrillDown: (targetLevel: string, id?: string) => void;

	$: jobData = $currentJobData;
	$: allJobs = $dispatchAnalytics.demoJobs;
	$: allTrucks = $dispatchAnalytics.demoTrucks;
	$: allYards = $dispatchAnalytics.demoYards;

	// Show all jobs when no specific job is selected
	$: showingAllJobs = !jobData;

	// Group jobs by status for better organization
	$: jobsByStatus = {
		completed: allJobs.filter(h => h.status === 'completed'),
		'in-progress': allJobs.filter(h => h.status === 'in-progress'),
		scheduled: allJobs.filter(h => h.status === 'scheduled')
	};

	function formatVolume(volume: number) {
		return new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(volume);
	}

	function formatCurrency(amount: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(amount);
	}

	function formatDateTime(date: Date) {
		return format(date, 'MMM dd, yyyy • hh:mm:ss a');
	}

	function formatCoordinate(coord: number) {
		return coord.toFixed(6);
	}

	function getJobStatusClass(status: string) {
		switch (status) {
			case 'completed': return 'success';
			case 'in-progress': return 'warning';
			case 'scheduled': return 'info';
			default: return 'neutral';
		}
	}
</script>

{#if showingAllJobs}
	<!-- Show aggregated jobs data -->
	<div class="jobs-overview">
		<div class="analytics-header">
			<h1 class="page-title">All Job Tickets Overview</h1>
			<p class="page-subtitle">
				<FileText class="w-4 h-4 inline" />
				Fleet-wide job performance and detailed ticket data
			</p>
		</div>

		<!-- Aggregated KPI Dashboard -->
		<div class="kpi-grid">
			<div class="kpi-card primary">
				<div class="kpi-icon">
					<FileText class="w-6 h-6" />
				</div>
				<div class="kpi-content">
					<div class="kpi-value">{allJobs.length}</div>
					<div class="kpi-label">Total Jobs</div>
					<div class="kpi-sub">{jobsByStatus.completed.length} completed, {jobsByStatus['in-progress'].length} active</div>
				</div>
			</div>

			<div class="kpi-card success">
				<div class="kpi-icon">
					<DollarSign class="w-6 h-6" />
				</div>
				<div class="kpi-content">
					<div class="kpi-value">{formatCurrency(allJobs.reduce((sum, h) => sum + h.revenue, 0))}</div>
					<div class="kpi-label">Total Revenue</div>
					<div class="kpi-sub">All jobs combined</div>
				</div>
			</div>

			<div class="kpi-card {(allJobs.reduce((sum, h) => sum + h.efficiency, 0) / allJobs.length) >= 92 ? 'success' : 'warning'}">
				<div class="kpi-icon">
					<TrendingUp class="w-6 h-6" />
				</div>
				<div class="kpi-content">
					<div class="kpi-value">{((allJobs.reduce((sum, h) => sum + h.efficiency, 0) / allJobs.length)).toFixed(1)}%</div>
					<div class="kpi-label">Avg Efficiency</div>
					<div class="kpi-sub">Target: 92.5%</div>
				</div>
			</div>

			<div class="kpi-card {(allJobs.reduce((sum, h) => sum + h.volumeLossPercent, 0) / allJobs.length) <= 2.0 ? 'success' : 'warning'}">
				<div class="kpi-icon">
					<Target class="w-6 h-6" />
				</div>
				<div class="kpi-content">
					<div class="kpi-value">{((allJobs.reduce((sum, h) => sum + h.volumeLossPercent, 0) / allJobs.length)).toFixed(1)}%</div>
					<div class="kpi-label">Avg Volume Loss</div>
					<div class="kpi-sub">Target: ≤2.0%</div>
				</div>
			</div>

			<div class="kpi-card info">
				<div class="kpi-icon">
					<Droplets class="w-6 h-6" />
				</div>
				<div class="kpi-content">
					<div class="kpi-value">{formatVolume(allJobs.reduce((sum, h) => sum + h.onloadVolume, 0))}</div>
					<div class="kpi-label">Total Volume</div>
					<div class="kpi-sub">Units transported</div>
				</div>
			</div>

			<div class="kpi-card neutral">
				<div class="kpi-icon">
					<Clock class="w-6 h-6" />
				</div>
				<div class="kpi-content">
					<div class="kpi-value">{((allJobs.reduce((sum, h) => sum + h.duration, 0) / allJobs.length)).toFixed(0)}</div>
					<div class="kpi-label">Avg Duration</div>
					<div class="kpi-sub">Minutes per job</div>
				</div>
			</div>
		</div>

		<!-- Problem Jobs Alert -->
		{#if allJobs.some(h => h.efficiency < 85 || h.volumeLossPercent > 3.0 || h.alerts.length > 0)}
			<div class="insights-banner">
				<div class="insight-icon">
					<AlertTriangle class="w-5 h-5" />
				</div>
				<div class="insight-content">
					<div class="insight-title">Job Performance Alerts</div>
					<div class="insight-text">
						{allJobs.filter(h => h.efficiency < 85).length} jobs below efficiency threshold, 
						{allJobs.filter(h => h.volumeLossPercent > 3.0).length} with high volume loss, 
						{allJobs.reduce((sum, h) => sum + h.alerts.length, 0)} total active alerts
					</div>
				</div>
			</div>
		{/if}

		<!-- Jobs by Status -->
		<div class="jobs-section">
			<h2 class="section-title">
				Job Tickets by Status
				<span class="section-subtitle">Click any job to view detailed ticket data</span>
			</h2>
			
			{#each Object.entries(jobsByStatus) as [status, jobs] (status)}
				{#if jobs.length > 0}
					<div class="status-section">
						<h3 class="status-header">
							<Activity class="w-4 h-4" />
							{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')} Jobs
							<span class="job-count">({jobs.length} tickets)</span>
						</h3>
						
						<div class="jobs-grid">
							{#each jobs.slice(0, 6) as job (job.id)}
								<DemoJobCard {job} />
							{/each}
						</div>
						
						{#if jobs.length > 6}
							<div class="show-more">
								<button class="show-more-btn">
									Show {jobs.length - 6} more {status} jobs
								</button>
							</div>
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	</div>
{:else if jobData}
	<!-- Show specific job data (existing code) -->
	<div class="job-detail">
		<!-- Header -->
		<div class="detail-header">
			<div class="job-header-info">
				<h1 class="page-title">Job {jobData.id}</h1>
				<div class="job-meta">
					<span class="truck-id">
						<Truck class="w-4 h-4" />
						{jobData.truckId} - {jobData.driverName}
					</span>
					<span class="route">
						<MapPin class="w-4 h-4" />
						{jobData.origin} → {jobData.destination}
					</span>
					<span class="customer">
						Customer: {jobData.customer}
					</span>
				</div>
			</div>
		</div>

		<!-- Critical Alerts (if any) -->
		{#if jobData.alerts.length > 0}
			<div class="critical-alerts">
				<div class="alert-header">
					<AlertTriangle class="w-5 h-5" />
					<h2>Critical Issues Detected</h2>
				</div>
				{#each jobData.alerts as alert}
					<div class="alert-item severity-{alert.severity}">
						<AlertTriangle class="w-4 h-4" />
						<div class="alert-content">
							<div class="alert-type">{alert.type.replace('_', ' ').toUpperCase()}</div>
							<div class="alert-summary">{alert.summary}</div>
							<div class="alert-time">{formatDateTime(alert.timestamp)}</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Summary Analytics (always visible) -->
		<div class="summary-section">
			<h2 class="section-title">Job Summary</h2>
			<div class="summary-grid">
				<div class="summary-card {jobData.volumeLossPercent > 3 ? 'critical' : jobData.volumeLossPercent > 2 ? 'warning' : 'good'}">
					<div class="summary-icon">
						<Droplets class="w-6 h-6" />
					</div>
					<div class="summary-content">
						<div class="summary-value">{jobData.volumeLossPercent.toFixed(2)}%</div>
						<div class="summary-label">Volume Loss</div>
						<div class="summary-detail">{formatVolume(jobData.volumeLoss)} units lost</div>
					</div>
				</div>

				<div class="summary-card {jobData.efficiency >= 95 ? 'good' : jobData.efficiency >= 85 ? 'warning' : 'critical'}">
					<div class="summary-icon">
						<Gauge class="w-6 h-6" />
					</div>
					<div class="summary-content">
						<div class="summary-value">{jobData.efficiency.toFixed(1)}%</div>
						<div class="summary-label">Efficiency</div>
						<div class="summary-detail">{Math.floor(jobData.duration / 60)}h {jobData.duration % 60}m duration</div>
					</div>
				</div>

				<div class="summary-card">
					<div class="summary-icon">
						<Thermometer class="w-6 h-6" />
					</div>
					<div class="summary-content">
						<div class="summary-value">{jobData.avgTemp.toFixed(1)}°F</div>
						<div class="summary-label">Avg Temperature</div>
						<div class="summary-detail">Range: {jobData.minTemp.toFixed(1)}°F - {jobData.maxTemp.toFixed(1)}°F</div>
					</div>
				</div>

				<div class="summary-card">
					<div class="summary-icon">
						<DollarSign class="w-6 h-6" />
					</div>
					<div class="summary-content">
						<div class="summary-value">{formatCurrency(jobData.revenue)}</div>
						<div class="summary-label">Revenue</div>
						<div class="summary-detail">Fuel: {formatCurrency(jobData.fuelCost)}</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Raw Data Mode -->
		{#if $viewMode === 'raw' || $viewMode === 'analytics'}
			<div class="raw-data-section">
				<h2 class="section-title">
					📋 Complete Job Ticket Data
					<span class="section-subtitle">Every sensor reading, every timestamp, every measurement</span>
				</h2>
				
				<!-- Operational Data -->
				<div class="data-category">
					<h3 class="category-title">
						🚛 Operational Data
					</h3>
					<div class="data-grid">
						<div class="data-group">
							<h4 class="group-title">Route Information</h4>
							<div class="data-pairs">
								<div class="data-pair">
									<span class="data-label">Job ID:</span>
									<span class="data-value">{jobData.id}</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Origin:</span>
									<span class="data-value">{jobData.origin}</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Destination:</span>
									<span class="data-value">{jobData.destination}</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Customer:</span>
									<span class="data-value">{jobData.customer}</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Distance:</span>
									<span class="data-value">{jobData.distance} miles</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Status:</span>
									<span class="data-value status-{jobData.status}">{jobData.status}</span>
								</div>
							</div>
						</div>

						<div class="data-group">
							<h4 class="group-title">Personnel & Equipment</h4>
							<div class="data-pairs">
								<div class="data-pair">
									<span class="data-label">Truck ID:</span>
									<span class="data-value">{jobData.truckId}</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Driver ID:</span>
									<span class="data-value">{jobData.driverId}</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Driver Name:</span>
									<span class="data-value">{jobData.driverName}</span>
								</div>
							</div>
						</div>

						<div class="data-group">
							<h4 class="group-title">Timing</h4>
							<div class="data-pairs">
								<div class="data-pair">
									<span class="data-label">Start Time:</span>
									<span class="data-value">{formatDateTime(jobData.startTime)}</span>
								</div>
								{#if jobData.endTime}
									<div class="data-pair">
										<span class="data-label">End Time:</span>
										<span class="data-value">{formatDateTime(jobData.endTime)}</span>
									</div>
								{/if}
								<div class="data-pair">
									<span class="data-label">Duration:</span>
									<span class="data-value">{Math.floor(jobData.duration / 60)}h {jobData.duration % 60}m</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Volume & Loss Data -->
				<div class="data-category critical-data">
					<h3 class="category-title">
						💧 Volume & Loss Analysis
					</h3>
					<div class="data-grid">
						<div class="data-group">
							<h4 class="group-title">Volume Measurements</h4>
							<div class="data-pairs">
								<div class="data-pair">
									<span class="data-label">Onload Volume:</span>
									<span class="data-value">{formatVolume(jobData.onloadVolume)} bbl</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Offload Volume:</span>
									<span class="data-value">{formatVolume(jobData.offloadVolume)} bbl</span>
								</div>
								<div class="data-pair critical">
									<span class="data-label">Volume Loss:</span>
									<span class="data-value loss-value">{formatVolume(jobData.volumeLoss)} bbl</span>
								</div>
								<div class="data-pair critical">
									<span class="data-label">Loss Percentage:</span>
									<span class="data-value loss-value">{jobData.volumeLossPercent.toFixed(3)}%</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Temperature Data -->
				<div class="data-category">
					<h3 class="category-title">
						🌡️ Temperature Monitoring
					</h3>
					<div class="data-grid">
						<div class="data-group">
							<h4 class="group-title">Temperature Statistics</h4>
							<div class="data-pairs">
								<div class="data-pair">
									<span class="data-label">Average Temp:</span>
									<span class="data-value">{jobData.avgTemp.toFixed(2)}°F</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Minimum Temp:</span>
									<span class="data-value">{jobData.minTemp.toFixed(2)}°F</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Maximum Temp:</span>
									<span class="data-value">{jobData.maxTemp.toFixed(2)}°F</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Temp Variance:</span>
									<span class="data-value">{(jobData.maxTemp - jobData.minTemp).toFixed(2)}°F</span>
								</div>
							</div>
						</div>

						<div class="data-group">
							<h4 class="group-title">Temperature Readings</h4>
							<div class="readings-grid">
								{#each jobData.tempReadings as reading, index}
									<div class="reading-item">
										<span class="reading-index">T{index + 1}:</span>
										<span class="reading-value">{reading.toFixed(1)}°F</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<!-- Chemical Analysis -->
				<div class="data-category">
					<h3 class="category-title">
						🔬 Chemical Analysis
					</h3>
					<div class="data-grid">
						<div class="data-group">
							<h4 class="group-title">Coriolis Measurements</h4>
							<div class="data-pairs">
								<div class="data-pair">
									<span class="data-label">API Gravity:</span>
									<span class="data-value">{jobData.apiGravity.toFixed(2)}°</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Water Cut:</span>
									<span class="data-value">{jobData.waterCut.toFixed(2)}%</span>
								</div>
							</div>
						</div>

						<div class="data-group">
							<h4 class="group-title">Safety Measurements</h4>
							<div class="data-pairs">
								<div class="data-pair {jobData.h2sLevels > 1.0 ? 'critical' : ''}">
									<span class="data-label">H2S Levels:</span>
									<span class="data-value">{jobData.h2sLevels.toFixed(2)} ppm</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Pressure Data -->
				<div class="data-category">
					<h3 class="category-title">
						⚡ Pressure Systems
					</h3>
					<div class="data-grid">
						<div class="data-group">
							<h4 class="group-title">Pressure Readings</h4>
							<div class="readings-grid">
								{#each jobData.pressureReadings as reading, index}
									<div class="reading-item">
										<span class="reading-index">P{index + 1}:</span>
										<span class="reading-value">{reading} PSI</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<!-- GPS Tracking -->
				<div class="data-category">
					<h3 class="category-title">
						📍 GPS Tracking Data
					</h3>
					<div class="data-grid">
						<div class="data-group">
							<h4 class="group-title">Route Waypoints</h4>
							<div class="gps-trail">
								{#each jobData.gpsTrail as waypoint, index}
									<div class="waypoint-item">
										<div class="waypoint-header">
											<span class="waypoint-index">Waypoint {index + 1}</span>
											<span class="waypoint-time">{formatDateTime(waypoint.timestamp)}</span>
										</div>
										<div class="waypoint-coords">
											<span class="coord">Lat: {formatCoordinate(waypoint.lat)}</span>
											<span class="coord">Lng: {formatCoordinate(waypoint.lng)}</span>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<!-- Financial Data -->
				<div class="data-category">
					<h3 class="category-title">
						💰 Financial Details
					</h3>
					<div class="data-grid">
						<div class="data-group">
							<h4 class="group-title">Revenue & Costs</h4>
							<div class="data-pairs">
								<div class="data-pair">
									<span class="data-label">Gross Revenue:</span>
									<span class="data-value">{formatCurrency(jobData.revenue)}</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Fuel Cost:</span>
									<span class="data-value">{formatCurrency(jobData.fuelCost)}</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Net Profit:</span>
									<span class="data-value">{formatCurrency(jobData.revenue - jobData.fuelCost)}</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Profit Margin:</span>
									<span class="data-value">{(((jobData.revenue - jobData.fuelCost) / jobData.revenue) * 100).toFixed(2)}%</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Performance Metrics -->
				<div class="data-category">
					<h3 class="category-title">
						📊 Performance Metrics
					</h3>
					<div class="data-grid">
						<div class="data-group">
							<h4 class="group-title">Calculated Efficiency</h4>
							<div class="data-pairs">
								<div class="data-pair">
									<span class="data-label">Overall Efficiency:</span>
									<span class="data-value efficiency-{jobData.efficiency >= 95 ? 'excellent' : jobData.efficiency >= 85 ? 'good' : jobData.efficiency >= 75 ? 'warning' : 'critical'}">{jobData.efficiency.toFixed(3)}%</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Miles per Hour:</span>
									<span class="data-value">{(jobData.distance / (jobData.duration / 60)).toFixed(2)} mph</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Revenue per Mile:</span>
									<span class="data-value">{formatCurrency(jobData.revenue / jobData.distance)}</span>
								</div>
								<div class="data-pair">
									<span class="data-label">Revenue per Hour:</span>
									<span class="data-value">{formatCurrency(jobData.revenue / (jobData.duration / 60))}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
{:else}
	<div class="no-data">
		<p>No job data available</p>
	</div>
{/if}

<style>
	.job-detail {
		@apply p-6 space-y-6 overflow-y-auto h-full;
	}

	.jobs-overview {
		@apply flex flex-col gap-6 p-6 h-full overflow-y-auto;
	}

	.analytics-header {
		@apply text-center space-y-2;
	}

	.page-title {
		@apply text-3xl font-bold text-gray-900 dark:text-white;
	}

	.page-subtitle {
		@apply text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2;
	}

	.kpi-grid {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4;
	}

	.kpi-card {
		@apply bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow;
	}

	.kpi-card.primary {
		@apply border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20;
	}

	.kpi-card.success {
		@apply border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20;
	}

	.kpi-card.warning {
		@apply border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20;
	}

	.kpi-card.info {
		@apply border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20;
	}

	.kpi-card.neutral {
		@apply border-gray-200 dark:border-gray-700;
	}

	.kpi-icon {
		@apply flex items-center justify-center w-12 h-12 rounded-lg bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 mb-4;
	}

	.kpi-content {
		@apply space-y-1;
	}

	.kpi-value {
		@apply text-2xl font-bold text-gray-900 dark:text-white;
	}

	.kpi-label {
		@apply text-sm font-medium text-gray-600 dark:text-gray-300;
	}

	.kpi-sub {
		@apply text-xs text-gray-500 dark:text-gray-400;
	}

	.insights-banner {
		@apply flex items-start gap-4 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl;
	}

	.insight-icon {
		@apply flex items-center justify-center w-10 h-10 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 rounded-lg flex-shrink-0;
	}

	.insight-content {
		@apply space-y-1;
	}

	.insight-title {
		@apply font-semibold text-yellow-800 dark:text-yellow-300;
	}

	.insight-text {
		@apply text-sm text-yellow-700 dark:text-yellow-400;
	}

	.section-title {
		@apply flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-white mb-4;
	}

	.section-subtitle {
		@apply text-sm text-gray-500 dark:text-gray-400;
	}

	.status-section {
		@apply space-y-4 mb-8;
	}

	.status-header {
		@apply flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white pb-2 border-b border-gray-200 dark:border-gray-700;
	}

	.job-count {
		@apply text-sm text-gray-500 dark:text-gray-400 font-normal;
	}

	.jobs-grid {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
	}

	.show-more {
		@apply text-center pt-4;
	}

	.show-more-btn {
		@apply px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors;
	}

	.detail-header {
		@apply mb-6;
	}

	.job-meta {
		@apply flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300;
	}

	.truck-id,
	.route,
	.customer {
		@apply flex items-center gap-2;
	}

	.critical-alerts {
		@apply bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-3;
	}

	.alert-header {
		@apply flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold;
	}

	.alert-item {
		@apply flex items-start gap-3 p-3 bg-white dark:bg-red-900/20 rounded border border-red-200 dark:border-red-700;
	}

	.alert-content {
		@apply flex-1;
	}

	.alert-type {
		@apply text-xs font-mono text-red-600 dark:text-red-400 mb-1;
	}

	.alert-summary {
		@apply text-sm font-medium text-gray-900 dark:text-white;
	}

	.alert-time {
		@apply text-xs text-gray-500 dark:text-gray-400 font-mono;
	}

	.summary-section {
		@apply space-y-4;
	}

	.summary-grid {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4;
	}

	.summary-card {
		@apply bg-white dark:bg-gray-800 border rounded-lg p-4 flex items-center gap-4;
	}

	.summary-card.good {
		@apply border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10;
	}

	.summary-card.warning {
		@apply border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10;
	}

	.summary-card.critical {
		@apply border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10;
	}

	.summary-icon {
		@apply flex-shrink-0 p-2 rounded-lg bg-white dark:bg-gray-700;
	}

	.summary-content {
		@apply flex-1;
	}

	.summary-value {
		@apply text-xl font-bold text-gray-900 dark:text-white;
	}

	.summary-label {
		@apply text-sm font-medium text-gray-600 dark:text-gray-300;
	}

	.summary-detail {
		@apply text-xs text-gray-500 dark:text-gray-400;
	}

	.raw-data-section {
		@apply space-y-6;
	}

	.data-category {
		@apply bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden;
	}

	.data-category.critical-data {
		@apply border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/5;
	}

	.category-title {
		@apply text-lg font-semibold text-gray-900 dark:text-white p-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700;
	}

	.data-grid {
		@apply grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4;
	}

	.data-group {
		@apply space-y-3;
	}

	.group-title {
		@apply text-sm font-semibold text-gray-700 dark:text-gray-300 pb-2 border-b border-gray-200 dark:border-gray-600;
	}

	.data-pairs {
		@apply space-y-2;
	}

	.data-pair {
		@apply flex justify-between items-center py-1;
	}

	.data-pair.critical {
		@apply bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded;
	}

	.data-label {
		@apply text-sm text-gray-600 dark:text-gray-400 font-medium;
	}

	.data-value {
		@apply text-sm text-gray-900 dark:text-white font-mono;
	}

	.data-value.loss-value {
		@apply text-red-600 dark:text-red-400 font-bold;
	}

	.status-completed {
		@apply text-green-600 dark:text-green-400;
	}

	.status-in-progress {
		@apply text-blue-600 dark:text-blue-400;
	}

	.efficiency-excellent {
		@apply text-green-600 dark:text-green-400;
	}

	.efficiency-good {
		@apply text-blue-600 dark:text-blue-400;
	}

	.efficiency-warning {
		@apply text-yellow-600 dark:text-yellow-400;
	}

	.efficiency-critical {
		@apply text-red-600 dark:text-red-400;
	}

	.readings-grid {
		@apply grid grid-cols-2 sm:grid-cols-3 gap-2;
	}

	.reading-item {
		@apply flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs;
	}

	.reading-item.critical-reading {
		@apply bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300;
	}

	.reading-index {
		@apply font-medium;
	}

	.reading-value {
		@apply font-mono;
	}

	.gps-trail {
		@apply space-y-3;
	}

	.waypoint-item {
		@apply p-3 bg-gray-50 dark:bg-gray-700 rounded;
	}

	.waypoint-header {
		@apply flex justify-between items-center mb-2;
	}

	.waypoint-index {
		@apply text-sm font-medium text-gray-900 dark:text-white;
	}

	.waypoint-time {
		@apply text-xs text-gray-500 dark:text-gray-400 font-mono;
	}

	.waypoint-coords {
		@apply flex gap-4 text-xs font-mono text-gray-600 dark:text-gray-300;
	}

	.no-data {
		@apply p-6 text-center text-gray-500 dark:text-gray-400;
	}
</style> 