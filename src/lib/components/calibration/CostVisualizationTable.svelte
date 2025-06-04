<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { costBreakdown, calibrationConfig } from '$lib/stores/calibrationData';
	
	import type { AnimationState, CostData, CalibrationConfig } from './cost-visualization-table/types/table.types';
	import { 
		createAnimationState, 
		cleanupAnimations, 
		shouldTriggerAnimation, 
		triggerTableAnimations, 
		initializeAnimationValues 
	} from './cost-visualization-table/utils/table-animations';
	import { generateTableRows, generateSummaryCards } from './cost-visualization-table/utils/table-data';
	
	// Import orchestrator components
	import CostTableHeader from './cost-visualization-table/CostTableHeader.svelte';
	import CostDataTable from './cost-visualization-table/CostDataTable.svelte';
	import CostSummaryCards from './cost-visualization-table/CostSummaryCards.svelte';

	// Animation state management
	let animationState = createAnimationState();
	let animationTimeout: number;

	// Reactive data generation
	$: animatedValues = {
		monthly: animationState.animatedMonthly,
		annual: animationState.animatedAnnual,
		savings: animationState.animatedSavings
	};

	$: tableRows = $costBreakdown && $calibrationConfig 
		? generateTableRows($costBreakdown, $calibrationConfig, animatedValues)
		: [];

	$: summaryCards = $costBreakdown ? generateSummaryCards($costBreakdown) : [];

	// Debounced animation trigger
	function triggerAnimations() {
		if (!$costBreakdown || !shouldTriggerAnimation(animationState, $costBreakdown)) return;
		
		// Clear any pending animation
		if (animationTimeout) {
			clearTimeout(animationTimeout);
		}
		
		// Debounce animations to prevent rapid firing
		animationTimeout = setTimeout(() => {
			triggerTableAnimations(animationState, $costBreakdown, {
				updateMonthly: (value) => { animationState.animatedMonthly = value; },
				updateAnnual: (value) => { animationState.animatedAnnual = value; },
				updateSavings: (value) => { animationState.animatedSavings = value; }
			});
		}, 100); // 100ms debounce
	}

	// React to cost changes with debouncing
	$: if ($costBreakdown) {
		triggerAnimations();
	}

	// Initialize animated values on mount
	onMount(() => {
		if ($costBreakdown) {
			initializeAnimationValues(animationState, $costBreakdown);
		}
	});

	// Clean up on destroy
	onDestroy(() => {
		cleanupAnimations(animationState);
		if (animationTimeout) {
			clearTimeout(animationTimeout);
		}
	});
</script>

<div class="cost-table-container">
	<CostTableHeader />
	<CostDataTable {tableRows} hasAnimatedSavings={animationState.animationRunning} />
	<CostSummaryCards {summaryCards} />
</div>

<style>
	.cost-table-container {
		background: rgba(255, 255, 255, 0.98);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
	}
</style> 