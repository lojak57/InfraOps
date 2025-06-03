<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { mockYardComparison } from './regional-yard-data';
	import { calculateRegionalAverage } from './regional-yard-utils';
	import type { YardData, TimeframeOption } from './regional-yard.types';
	import RegionalYardHeader from './RegionalYardHeader.svelte';
	import RegionalYardSummary from './RegionalYardSummary.svelte';
	import RegionalYardTable from './RegionalYardTable.svelte';
	import RegionalYardFooter from './RegionalYardFooter.svelte';

	const dispatch = createEventDispatcher();

	// Props
	export let visible = false;
	export let regionName = '';
	export let regionData: any[] = [];

	// State
	let selectedTimeframe: TimeframeOption = 'Last 7 Days';
	let yardComparison: YardData[] = mockYardComparison;

	// Reactive calculations
	$: regionalAverage = calculateRegionalAverage(yardComparison);

	// Event handlers
	function handleClose() {
		visible = false;
		dispatch('close');
	}

	function handleTimeframeChange(event: CustomEvent<{ timeframe: TimeframeOption }>) {
		selectedTimeframe = event.detail.timeframe;
		// Handle timeframe change logic here
	}

	function handleSort(event: CustomEvent<{ yardData: YardData[] }>) {
		yardComparison = event.detail.yardData;
	}

	function handleOverlayClick() {
		handleClose();
	}

	function handleContainerClick(event: Event) {
		event.stopPropagation();
	}
</script>

{#if visible}
	<div class="comparison-overlay" on:click={handleOverlayClick}>
		<div class="comparison-container" on:click={handleContainerClick}>
			<RegionalYardHeader 
				{regionName}
				{selectedTimeframe}
				on:close={handleClose}
				on:timeframeChange={handleTimeframeChange}
			/>

			<RegionalYardSummary 
				{regionalAverage}
				yardData={yardComparison}
			/>

			<RegionalYardTable 
				yardData={yardComparison}
				on:sort={handleSort}
			/>

			<RegionalYardFooter 
				yardData={yardComparison}
			/>
		</div>
	</div>
{/if}

<style>
	.comparison-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 20px;
	}

	.comparison-container {
		background: white;
		border-radius: 20px;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
		max-width: 95vw;
		max-height: 90vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	/* Mobile responsiveness */
	@media (max-width: 768px) {
		.comparison-container {
			max-width: 100vw;
			max-height: 100vh;
			border-radius: 0;
		}
	}
</style> 