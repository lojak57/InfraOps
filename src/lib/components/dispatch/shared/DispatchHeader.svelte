<script lang="ts">
	import { Activity } from 'lucide-svelte';
	import { formatLastUpdate, formatRevenue } from '../utils/dispatch-hub-utils';

	interface Props {
		navTerms: any;
		terms: any;
		fleetData: any;
		lastUpdate: Date;
	}

	let { navTerms, terms, fleetData, lastUpdate }: Props = $props();
</script>

<div class="analytics-header">
	<div class="header-content">
		<div class="title-section">
			<h1 class="analytics-title">
				<Activity class="w-6 h-6 text-orange-500" />
				{navTerms.intelligenceHub}
			</h1>
			<p class="analytics-subtitle">
				Real-time {terms.asset.toLowerCase()} operations intelligence • Last updated {formatLastUpdate(lastUpdate)}
			</p>
		</div>
		
		<!-- Quick Stats -->
		<div class="quick-stats">
			<div class="stat-item">
				<span class="stat-value">{fleetData.totalTrucks}</span>
				<span class="stat-label">{terms.asset}s</span>
			</div>
			<div class="stat-item">
				<span class="stat-value">{formatRevenue(fleetData.monthlyRevenue)}</span>
				<span class="stat-label">Monthly Revenue</span>
			</div>
			<div class="stat-item">
				<span class="stat-value">{fleetData.efficiency}%</span>
				<span class="stat-label">{terms.asset} Efficiency</span>
			</div>
		</div>
	</div>
</div>

<style>
	.analytics-header {
		@apply bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm;
	}

	.header-content {
		@apply flex justify-between items-center p-6;
	}

	.title-section {
		@apply flex flex-col gap-1;
	}

	.analytics-title {
		@apply flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white;
	}

	.analytics-subtitle {
		@apply text-sm text-gray-500 dark:text-gray-400 font-medium;
	}

	.quick-stats {
		@apply flex items-center gap-8;
	}

	.stat-item {
		@apply flex flex-col items-center;
	}

	.stat-value {
		@apply text-xl font-bold text-gray-900 dark:text-white;
	}

	.stat-label {
		@apply text-xs text-gray-500 dark:text-gray-400 font-medium;
	}
</style> 