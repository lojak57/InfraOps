<script lang="ts">
	import { getTransitMetrics } from './utils/to-transit-step-utils';

	export let routeStats: any;
	export let transitType: 'pickup' | 'delivery';

	$: transitMetrics = getTransitMetrics(routeStats, transitType);
</script>

<div class="route-details-card">
	<h3>🗺️ Route Information</h3>
	<div class="route-details">
		<div class="route-stat">
			<span class="stat-label">Distance</span>
			<span class="stat-value">{transitMetrics.distance}</span>
		</div>
		<div class="route-stat">
			<span class="stat-label">Estimated Time</span>
			<span class="stat-value">{transitMetrics.estimatedTime}</span>
		</div>
		<div class="route-stat">
			<span class="stat-label">ETA</span>
			<span class="stat-value">{transitMetrics.eta}</span>
		</div>
	</div>
</div>

<style>
	.route-details-card {
		background: #ffffff;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 24px;
		margin-bottom: 24px;
	}
	
	.route-details-card h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1f2937;
		margin-bottom: 16px;
	}
	
	.route-details {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}
	
	.route-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.stat-label {
		font-size: 0.875rem;
		color: #6b7280;
		margin-bottom: 4px;
	}
	
	.stat-value {
		font-size: 1.125rem;
		font-weight: 600;
		color: #1f2937;
	}

	@media (max-width: 768px) {
		.route-details {
			grid-template-columns: 1fr;
			gap: 12px;
		}
	}
</style> 