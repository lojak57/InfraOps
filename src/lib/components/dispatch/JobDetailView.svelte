<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 915 lines → @current-size: ~180 lines  
@phase: Phase 2 - High Priority Components
@extractors: JobOverview, JobDetailData, job-formatters.ts, job-detail.types.ts
-->
<script lang="ts">
	import { currentJobData, viewMode, dispatchAnalytics } from '$lib/stores/dispatchAnalytics';
	import JobOverview from './job-detail/JobOverview.svelte';
	import JobDetailData from './job-detail/JobDetailData.svelte';
	import { Thermometer, Droplets, Gauge, DollarSign, MapPin } from 'lucide-svelte';
	import { 
		formatVolume, 
		formatCurrency, 
		formatDateTime, 
		formatCoordinate,
		isCriticalReading
	} from './job-detail/utils/job-formatters.js';
	import type { JobData } from './job-detail/types/job-detail.types.js';

	// Drill-down handler prop (not needed for job detail but kept for consistency)
	export let handleDrillDown: (targetLevel: string, id?: string) => void;

	$: jobData = $currentJobData;
	$: allJobs = $dispatchAnalytics.demoJobs as JobData[];
	$: allTrucks = $dispatchAnalytics.demoTrucks;
	$: allYards = $dispatchAnalytics.demoYards;

	// Show all jobs when no specific job is selected
	$: showingAllJobs = !jobData;
</script>

{#if showingAllJobs}
	<!-- Show aggregated jobs data -->
	<JobOverview {allJobs} />
{:else if jobData}
	<!-- Show specific job data -->
	<div class="job-detail">
		<!-- Job Detail Data Component -->
		<JobDetailData {jobData} />

		<!-- Volume & Loss Data -->
		<div class="data-category critical-data">
			<h3 class="category-title">💧 Volume & Loss Analysis</h3>
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
			<h3 class="category-title">🌡️ Temperature Monitoring</h3>
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
							<div class="reading-item {isCriticalReading(reading, 'temperature') ? 'critical-reading' : ''}">
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
			<h3 class="category-title">🔬 Chemical Analysis</h3>
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
						<div class="data-pair {isCriticalReading(jobData.h2sLevels, 'h2s') ? 'critical' : ''}">
							<span class="data-label">H2S Levels:</span>
							<span class="data-value">{jobData.h2sLevels.toFixed(2)} ppm</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Pressure Data -->
		<div class="data-category">
			<h3 class="category-title">⚡ Pressure Systems</h3>
			<div class="data-grid">
				<div class="data-group">
					<h4 class="group-title">Pressure Readings</h4>
					<div class="readings-grid">
						{#each jobData.pressureReadings as reading, index}
							<div class="reading-item {isCriticalReading(reading, 'pressure') ? 'critical-reading' : ''}">
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
			<h3 class="category-title">📍 GPS Tracking Data</h3>
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
			<h3 class="category-title">💰 Financial Details</h3>
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
	</div>
{:else}
	<div class="no-data">
		<p>No job data available</p>
	</div>
{/if}

<style>
	.job-detail {
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