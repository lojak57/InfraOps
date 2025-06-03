<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 915-line component → @current-size: ~180 lines  
@phase: Phase 2 - High Priority Components
@extractors: JobDetailData from JobDetailView.svelte
-->
<script lang="ts">
	import { MapPin, Clock, Truck, User, AlertTriangle } from 'lucide-svelte';
	import { 
		formatDateTime, 
		formatDuration, 
		formatVolume, 
		formatCurrency, 
		formatCoordinate,
		getJobStatusClass,
		getEfficiencyClass,
		calculateProfitMargin
	} from './utils/job-formatters.js';
	import type { JobData } from './types/job-detail.types.js';
	
	// Props
	export let jobData: JobData;
</script>

<!-- Job Detail Header -->
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
			<span class="status status-{jobData.status}">
				{jobData.status}
			</span>
		</div>
		<p class="customer">
			<User class="w-4 h-4" />
			Customer: {jobData.customer}
		</p>
	</div>
</div>

<!-- Critical Alerts (if any) -->
{#if jobData.alerts && jobData.alerts.length > 0}
	<div class="critical-alerts">
		<div class="alert-header">
			<AlertTriangle class="w-4 h-4" />
			Critical Alerts ({jobData.alerts.length})
		</div>
		{#each jobData.alerts as alert}
			<div class="alert-item">
				<AlertTriangle class="w-4 h-4 text-red-500" />
				<div class="alert-content">
					<div class="alert-type">{alert.type}</div>
					<div class="alert-summary">{alert.message}</div>
					<div class="alert-time">{formatDateTime(alert.timestamp)}</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<!-- Job Summary Cards -->
<div class="summary-section">
	<h2 class="page-title">Performance Summary</h2>
	<div class="summary-grid">
		<div class="summary-card {jobData.efficiency >= 92 ? 'good' : jobData.efficiency >= 85 ? 'warning' : 'critical'}">
			<div class="summary-icon">
				<Clock class="w-5 h-5" />
			</div>
			<div class="summary-content">
				<div class="summary-value {getEfficiencyClass(jobData.efficiency)}">{jobData.efficiency.toFixed(1)}%</div>
				<div class="summary-label">Efficiency</div>
				<div class="summary-detail">Target: ≥92%</div>
			</div>
		</div>

		<div class="summary-card {jobData.volumeLossPercent <= 2.0 ? 'good' : jobData.volumeLossPercent <= 3.0 ? 'warning' : 'critical'}">
			<div class="summary-icon">
				<AlertTriangle class="w-5 h-5" />
			</div>
			<div class="summary-content">
				<div class="summary-value">{jobData.volumeLossPercent.toFixed(2)}%</div>
				<div class="summary-label">Volume Loss</div>
				<div class="summary-detail">Target: ≤2.0%</div>
			</div>
		</div>

		<div class="summary-card good">
			<div class="summary-icon">
				<MapPin class="w-5 h-5" />
			</div>
			<div class="summary-content">
				<div class="summary-value">{formatCurrency(jobData.revenue)}</div>
				<div class="summary-label">Revenue</div>
				<div class="summary-detail">{calculateProfitMargin(jobData.revenue, jobData.fuelCost).toFixed(1)}% margin</div>
			</div>
		</div>

		<div class="summary-card">
			<div class="summary-icon">
				<Clock class="w-5 h-5" />
			</div>
			<div class="summary-content">
				<div class="summary-value">{formatDuration(jobData.duration)}</div>
				<div class="summary-label">Duration</div>
				<div class="summary-detail">{jobData.distance} miles</div>
			</div>
		</div>
	</div>
</div>

<!-- Raw Data Section -->
<div class="raw-data-section">
	<h2 class="page-title">Detailed Job Data</h2>
	
	<!-- Basic Job Information -->
	<div class="data-category">
		<h3 class="category-title">📋 Basic Job Information</h3>
		<div class="data-grid">
			<div class="data-group">
				<h4 class="group-title">Job Details</h4>
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
						<span class="data-value">{formatDuration(jobData.duration)}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.detail-header {
		@apply bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6;
	}

	.job-header-info {
		@apply space-y-3;
	}

	.page-title {
		@apply text-xl font-bold text-gray-900 dark:text-white;
	}

	.job-meta {
		@apply flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400;
	}

	.truck-id, .route {
		@apply flex items-center gap-1;
	}

	.status {
		@apply px-2 py-1 rounded text-xs font-medium;
	}

	.status-completed {
		@apply bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400;
	}

	.status-in-progress {
		@apply bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400;
	}

	.status-scheduled {
		@apply bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400;
	}

	.customer {
		@apply flex items-center gap-2;
	}

	.critical-alerts {
		@apply bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-3 mb-6;
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
		@apply space-y-4 mb-6;
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

	.data-label {
		@apply text-sm text-gray-600 dark:text-gray-400 font-medium;
	}

	.data-value {
		@apply text-sm text-gray-900 dark:text-white font-mono;
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
</style> 