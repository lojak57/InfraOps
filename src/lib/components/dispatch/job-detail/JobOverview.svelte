<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 915-line component → @current-size: ~200 lines  
@phase: Phase 2 - High Priority Components
@extractors: JobOverview from JobDetailView.svelte
-->
<script lang="ts">
	import { FileText, DollarSign, TrendingUp, Target, Droplets, Clock, AlertTriangle, Activity } from 'lucide-svelte';
	import DemoJobCard from '../DemoJobCard.svelte';
	import { 
		formatCurrency, 
		formatVolume, 
		calculateJobOverview,
		hasPerformanceAlerts,
		getPerformanceAlertCounts,
		getKPIStatus
	} from './utils/job-formatters.js';
	import type { JobData, JobOverviewData } from './types/job-detail.types.js';
	
	// Props
	export let allJobs: JobData[];
	
	// Calculate overview data
	$: overviewData = calculateJobOverview(allJobs);
	$: jobsByStatus = overviewData.jobsByStatus;
	$: showPerformanceAlerts = hasPerformanceAlerts(allJobs);
	$: alertCounts = getPerformanceAlertCounts(allJobs);
</script>

<!-- Jobs Overview -->
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
				<div class="kpi-value">{overviewData.totalJobs}</div>
				<div class="kpi-label">Total Jobs</div>
				<div class="kpi-sub">{jobsByStatus.completed.length} completed, {jobsByStatus['in-progress'].length} active</div>
			</div>
		</div>

		<div class="kpi-card success">
			<div class="kpi-icon">
				<DollarSign class="w-6 h-6" />
			</div>
			<div class="kpi-content">
				<div class="kpi-value">{formatCurrency(overviewData.totalRevenue)}</div>
				<div class="kpi-label">Total Revenue</div>
				<div class="kpi-sub">All jobs combined</div>
			</div>
		</div>

		<div class="kpi-card {getKPIStatus('efficiency', overviewData.avgEfficiency)}">
			<div class="kpi-icon">
				<TrendingUp class="w-6 h-6" />
			</div>
			<div class="kpi-content">
				<div class="kpi-value">{overviewData.avgEfficiency.toFixed(1)}%</div>
				<div class="kpi-label">Avg Efficiency</div>
				<div class="kpi-sub">Target: 92.5%</div>
			</div>
		</div>

		<div class="kpi-card {getKPIStatus('volumeLoss', overviewData.avgVolumeLoss)}">
			<div class="kpi-icon">
				<Target class="w-6 h-6" />
			</div>
			<div class="kpi-content">
				<div class="kpi-value">{overviewData.avgVolumeLoss.toFixed(1)}%</div>
				<div class="kpi-label">Avg Volume Loss</div>
				<div class="kpi-sub">Target: ≤2.0%</div>
			</div>
		</div>

		<div class="kpi-card info">
			<div class="kpi-icon">
				<Droplets class="w-6 h-6" />
			</div>
			<div class="kpi-content">
				<div class="kpi-value">{formatVolume(overviewData.totalVolume)}</div>
				<div class="kpi-label">Total Volume</div>
				<div class="kpi-sub">Units transported</div>
			</div>
		</div>

		<div class="kpi-card neutral">
			<div class="kpi-icon">
				<Clock class="w-6 h-6" />
			</div>
			<div class="kpi-content">
				<div class="kpi-value">{overviewData.avgDuration.toFixed(0)}</div>
				<div class="kpi-label">Avg Duration</div>
				<div class="kpi-sub">Minutes per job</div>
			</div>
		</div>
	</div>

	<!-- Problem Jobs Alert -->
	{#if showPerformanceAlerts}
		<div class="insights-banner">
			<div class="insight-icon">
				<AlertTriangle class="w-5 h-5" />
			</div>
			<div class="insight-content">
				<div class="insight-title">Job Performance Alerts</div>
				<div class="insight-text">
					{alertCounts.lowEfficiency} jobs below efficiency threshold, 
					{alertCounts.highVolumeLoss} with high volume loss, 
					{alertCounts.totalAlerts} total active alerts
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

<style>
	.jobs-overview {
		@apply space-y-6;
	}

	.analytics-header {
		@apply text-center space-y-2;
	}

	.page-title {
		@apply text-2xl font-bold text-gray-900 dark:text-white;
	}

	.page-subtitle {
		@apply text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2;
	}

	.kpi-grid {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
	}

	.kpi-card {
		@apply bg-white dark:bg-gray-800 border rounded-lg p-4 flex items-center gap-4 transition-all duration-200 hover:shadow-lg;
	}

	.kpi-card.primary {
		@apply border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10;
	}

	.kpi-card.success {
		@apply border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10;
	}

	.kpi-card.warning {
		@apply border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10;
	}

	.kpi-card.info {
		@apply border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10;
	}

	.kpi-card.neutral {
		@apply border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/10;
	}

	.kpi-icon {
		@apply flex-shrink-0 p-2 rounded-lg bg-white dark:bg-gray-700;
	}

	.kpi-content {
		@apply flex-1;
	}

	.kpi-value {
		@apply text-xl font-bold text-gray-900 dark:text-white;
	}

	.kpi-label {
		@apply text-sm font-medium text-gray-600 dark:text-gray-300;
	}

	.kpi-sub {
		@apply text-xs text-gray-500 dark:text-gray-400;
	}

	.insights-banner {
		@apply bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3;
	}

	.insight-icon {
		@apply flex-shrink-0 text-red-600 dark:text-red-400;
	}

	.insight-content {
		@apply flex-1;
	}

	.insight-title {
		@apply font-semibold text-red-600 dark:text-red-400 mb-1;
	}

	.insight-text {
		@apply text-sm text-red-700 dark:text-red-300;
	}

	.jobs-section {
		@apply space-y-6;
	}

	.section-title {
		@apply text-lg font-semibold text-gray-900 dark:text-white mb-2;
	}

	.section-subtitle {
		@apply block text-sm text-gray-500 dark:text-gray-400 font-normal;
	}

	.status-section {
		@apply space-y-4;
	}

	.status-header {
		@apply flex items-center gap-2 text-md font-medium text-gray-700 dark:text-gray-300;
	}

	.job-count {
		@apply text-gray-500 dark:text-gray-400;
	}

	.jobs-grid {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
	}

	.show-more {
		@apply text-center;
	}

	.show-more-btn {
		@apply px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200;
	}
</style> 