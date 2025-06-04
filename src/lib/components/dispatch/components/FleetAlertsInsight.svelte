<script lang="ts">
	import { AlertTriangle } from 'lucide-svelte';
	import type { AlertSummary } from '../utils/truck-analytics-data';

	interface Props {
		alertSummary: AlertSummary;
		isFleet?: boolean;
		truckAlerts?: any[];
	}

	let { alertSummary, isFleet = false, truckAlerts = [] }: Props = $props();

	const hasAlerts = $derived(isFleet ? 
		(alertSummary.lowEfficiencyCount > 0 || alertSummary.highVolumeLossCount > 0 || alertSummary.totalAlerts > 0) :
		(truckAlerts.length > 0));
</script>

{#if hasAlerts}
	<div class="insights-banner">
		<div class="insight-icon">
			<AlertTriangle size={20} />
		</div>
		<div class="insight-content">
			<div class="insight-title">
				{isFleet ? 'Fleet Alerts' : 'Truck Alerts'}
			</div>
			
			{#if isFleet}
				<div class="insight-text">
					{alertSummary.lowEfficiencyCount} trucks below efficiency threshold, 
					{alertSummary.highVolumeLossCount} with high volume loss, 
					{alertSummary.totalAlerts} total active alerts
				</div>
			{:else}
				{#each truckAlerts as alert}
					<div class="insight-text">{alert.summary}</div>
				{/each}
			{/if}
		</div>
	</div>
{/if}

<style>
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
</style> 