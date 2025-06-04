<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	import DemoTruckCard from '../DemoTruckCard.svelte';
	import type { YardTruckGroup } from '../utils/truck-analytics-data';

	interface Props {
		yardTruckGroup: YardTruckGroup;
		handleDrillDown: (targetLevel: string, id?: string) => void;
	}

	let { yardTruckGroup, handleDrillDown }: Props = $props();
	let { yard, trucks } = yardTruckGroup;
</script>

{#if trucks.length > 0}
	<div class="yard-section">
		<h3 class="yard-header">
			<MapPin size={16} />
			{yard.name}
			<span class="truck-count">({trucks.length} assets)</span>
		</h3>
		
		<div class="trucks-grid">
			{#each trucks as truck (truck.id)}
				<DemoTruckCard {truck} {handleDrillDown} />
			{/each}
		</div>
	</div>
{/if}

<style>
	.yard-section {
		@apply space-y-4 mb-8;
	}

	.yard-header {
		@apply flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white pb-2 border-b border-gray-200 dark:border-gray-700;
	}

	.truck-count {
		@apply text-sm text-gray-500 dark:text-gray-400 font-normal;
	}

	.trucks-grid {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
	}
</style> 