<script lang="ts">
	import FleetSizeControl from './FleetSizeControl.svelte';
	import CostVisualizationTable from './CostVisualizationTable.svelte';
	import CostVisualizerHeader from './cost-visualizer/CostVisualizerHeader.svelte';
	import OptimizationDetailsPanel from './cost-visualizer/OptimizationDetailsPanel.svelte';
	import InsightCardsGrid from './cost-visualizer/InsightCardsGrid.svelte';
	import DemoFooter from './cost-visualizer/DemoFooter.svelte';
	
	import { costBreakdown, calibrationConfig } from '$lib/stores/calibrationData';
	import { calculateROIMetrics, calculateKeyStats } from './cost-visualizer/utils/cost-calculations';
	import { themeStore } from './cost-visualizer/utils/theme-manager';
	import { onMount } from 'svelte';

	let showOptimizationDetails = false;

	onMount(() => {
		themeStore.init();
	});

	// Reactive calculations
	$: roiMetrics = calculateROIMetrics($costBreakdown);
	$: keyStats = calculateKeyStats($costBreakdown, $calibrationConfig.fleetSize);

	// Demo configuration
	$: demoConfig = {
		companyName: 'Plains All American',
		fleetSize: $calibrationConfig.fleetSize,
		contactAction: () => {
			console.log('Contact sales clicked');
			// Add contact logic here
		}
	};

	function handleToggleTheme() {
		themeStore.toggle();
	}
</script>

<div class="visualizer-container" class:dark={$themeStore}>
	<CostVisualizerHeader 
		{keyStats}
		{roiMetrics}
		darkMode={$themeStore}
		onToggleTheme={handleToggleTheme}
	/>

	<div class="content-grid">
		<div class="config-section">
			<FleetSizeControl />
			<OptimizationDetailsPanel bind:showOptimizationDetails />
		</div>

		<div class="visualization-section">
			<CostVisualizationTable />
		</div>
	</div>

	<InsightCardsGrid {keyStats} {roiMetrics} />

	<DemoFooter {demoConfig} />
</div>

<style>
	.visualizer-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
		transition: all 0.3s ease;
	}

	.visualizer-container.dark {
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
		color: #f1f5f9;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 350px 1fr;
		gap: 24px;
		padding: 24px;
		max-width: 1400px;
		margin: 0 auto;
	}

	.config-section {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.visualization-section {
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 1024px) {
		.content-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.config-section {
			order: 2;
		}

		.visualization-section {
			order: 1;
		}
	}
</style> 