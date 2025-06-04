<script lang="ts">
	import { calculateTotalTime, generateRouteSteps } from './utils/map-calculations';

	export let job: any;
	export let trackingState: any;

	$: totalTime = calculateTotalTime(job, trackingState);
	$: routeSteps = generateRouteSteps(job, trackingState);
</script>

<div class="route-summary">
	<div class="summary-header">
		<h4>Route Summary</h4>
		<span class="total-time">{totalTime} min total</span>
	</div>
	<div class="route-steps">
		{#each routeSteps as step}
			<div class="route-step" class:active={step.isActive}>
				<div class="step-indicator {step.type}"></div>
				<span class="step-label">{step.label}</span>
				<span class="step-distance">{step.distance}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.route-summary {
		position: absolute;
		bottom: 20px;
		left: 20px;
		right: 20px;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 12px;
		padding: 16px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}

	.summary-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.summary-header h4 {
		margin: 0;
		font-size: 14px;
		font-weight: 600;
		color: #1e293b;
	}

	.total-time {
		font-size: 12px;
		color: #3b82f6;
		font-weight: 600;
	}

	.route-steps {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.route-step {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
	}

	.step-indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.step-indicator.current {
		background: #059669;
	}

	.step-indicator.planned {
		background: #3b82f6;
	}

	.step-label {
		flex: 1;
		color: #64748b;
		font-weight: 500;
	}

	.step-distance {
		color: #1e293b;
		font-weight: 600;
	}

	.route-step.active .step-label,
	.route-step.active .step-distance {
		color: #059669;
	}
</style> 