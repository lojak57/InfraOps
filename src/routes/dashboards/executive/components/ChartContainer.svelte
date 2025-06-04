<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 613-line component → @current-size: ~40 lines  
@phase: Phase 7 - Executive Dashboard Components
@extractors: ChartContainer from Executive Dashboard
-->
<script lang="ts">
	import RealtimeChart from '$lib/components/charts/RealtimeChart.svelte';
	import type { ChartConfig, ChartPadding } from '../types/executive-dashboard.types.js';
	
	// Props
	export let title: string;
	export let color: string;
	export let height: number;
	export let unit: string;
	export let animated: boolean = true;
	export let chartPadding: ChartPadding;
</script>

<div class="chart-container">
	<RealtimeChart 
		{title}
		{color}
		{height}
		{unit}
		{animated}
		paddingLeft={chartPadding.paddingLeft}
		paddingRight={chartPadding.paddingRight}
		paddingTop={chartPadding.paddingTop}
		paddingBottom={chartPadding.paddingBottom}
	/>
</div>

<style>
	.chart-container {
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(226, 232, 240, 0.8);
		border-radius: 12px;
		padding: 20px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
		flex: 1;
		min-width: 500px;
		vertical-align: top;
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.chart-container {
			padding: 16px;
			min-width: unset;
		}
	}
</style> 