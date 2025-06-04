<script lang="ts">
	import { Gauge, BarChart3, MapPin } from 'lucide-svelte';

	export let job: any;

	function getLoadItems(job: any) {
		return [
			{
				icon: Gauge,
				label: 'Volume:',
				value: `${job.estimatedUnits} units`
			},
			{
				icon: BarChart3,
				label: 'Tank Level:',
				value: job.tankLevelHeight || "17' 4\""
			},
			{
				icon: MapPin,
				label: 'Tank:',
				value: job.pickupLocation?.tankNumber || 'N/A'
			}
		];
	}

	$: loadItems = getLoadItems(job);
</script>

<div class="load-section">
	<h3 class="section-title">Load Details</h3>
	<div class="load-info">
		{#each loadItems as item}
			<div class="load-item">
				<svelte:component this={item.icon} size={16} />
				<span class="load-label">{item.label}</span>
				<span class="load-value">{item.value}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.load-section {
		padding: 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
	}

	.section-title {
		font-size: 16px;
		font-weight: 600;
		color: #1e293b;
		margin: 0 0 12px 0;
	}

	.load-info {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.load-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		background: white;
		border-radius: 8px;
		border: 1px solid #e2e8f0;
	}

	.load-item :global(svg) {
		color: #3b82f6;
	}

	.load-label {
		font-size: 14px;
		color: #64748b;
		font-weight: 500;
	}

	.load-value {
		font-size: 14px;
		color: #1e293b;
		font-weight: 600;
		margin-left: auto;
	}
</style> 