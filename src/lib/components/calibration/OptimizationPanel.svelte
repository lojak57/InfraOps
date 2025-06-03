<script lang="ts">
	import { fleetStats, costBreakdown, fleetData } from '$lib/stores/calibrationData';
	import { onMount, onDestroy } from 'svelte';
	import { OptimizationAnimations } from './optimization-animations';
	import { filterAndSortRecommendations } from './optimization-utils';
	import OptimizationCounters from './OptimizationCounters.svelte';
	import OptimizationRecommendations from './OptimizationRecommendations.svelte';
	import OptimizationInsights from './OptimizationInsights.svelte';
	import OptimizationCallout from './OptimizationCallout.svelte';
	import type { CounterAnimationState, TruckRecommendation } from './optimization.types';

	let animationState: CounterAnimationState = {
		animatedCalibrationsAvoided: 0,
		animatedMoneySaved: 0,
		isAnimating: false,
		lastAnimatedValues: { avoided: 0, saved: 0 }
	};

	const animations = new OptimizationAnimations();

	// Reactive calculations
	$: nextRecommendations = filterAndSortRecommendations($fleetData, 5);

	// Animation management
	$: if ($fleetStats) {
		animations.triggerAnimations(
			animationState,
			$fleetStats,
			{
				setCalibrationsAvoided: (value) => animationState.animatedCalibrationsAvoided = value,
				setMoneySaved: (value) => animationState.animatedMoneySaved = value,
				setIsAnimating: (value) => animationState.isAnimating = value,
				setLastAnimatedValues: (values) => animationState.lastAnimatedValues = values
			}
		);
	}

	// Event handlers
	function handleSchedule(event: CustomEvent<{ truck: TruckRecommendation; priority: 'high' | 'medium' | 'low' }>) {
		const { truck, priority } = event.detail;
		console.log(`Scheduling calibration for truck ${truck.id} with ${priority} priority`);
		// Implement scheduling logic here
	}

	function handleLearnMore() {
		console.log('Opening integration details...');
		// Implement learn more logic here
	}

	// Lifecycle management
	onMount(() => {
		if ($fleetStats) {
			animationState = animations.initializeValues($fleetStats);
		}
	});

	onDestroy(() => {
		animations.destroy();
	});
</script>

<div class="optimization-panel">
	<div class="panel-header">
		<h3 class="panel-title">🧠 Smart Meter Sync Optimization</h3>
		<div class="optimization-badge">
			<span class="badge-text">40% Efficiency Gain</span>
		</div>
	</div>

	<OptimizationCounters 
		fleetStats={$fleetStats}
		animatedCalibrationsAvoided={animationState.animatedCalibrationsAvoided}
		animatedMoneySaved={animationState.animatedMoneySaved}
	/>

	<OptimizationRecommendations 
		recommendations={nextRecommendations}
		on:schedule={handleSchedule}
	/>

	<OptimizationInsights 
		fleetStats={$fleetStats}
		costBreakdown={$costBreakdown}
	/>

	<OptimizationCallout 
		on:learnMore={handleLearnMore}
	/>
</div>

<style>
	.optimization-panel {
		background: rgba(255, 255, 255, 0.98);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
	}

	.panel-header {
		background: linear-gradient(135deg, #f8fafc, #e2e8f0);
		padding: 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.panel-title {
		font-size: 20px;
		font-weight: 700;
		color: #0f172a;
		margin: 0;
	}

	.optimization-badge {
		background: linear-gradient(135deg, #059669, #047857);
		color: white;
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 600;
		box-shadow: 0 2px 8px rgba(5, 150, 105, 0.3);
	}
</style> 