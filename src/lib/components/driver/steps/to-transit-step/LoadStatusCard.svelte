<script lang="ts">
	import { getLoadStatus } from './utils/to-transit-step-utils';

	export let sharedState: any;

	$: loadStatus = getLoadStatus(sharedState);
</script>

<div class="load-status-card">
	<h3>🛢️ Current Load Status</h3>
	<div class="load-details">
		<div class="load-stat">
			<span class="stat-label">Loaded Volume</span>
			<span class="stat-value">{loadStatus.volume} units</span>
		</div>
		<div class="load-stat">
			<span class="stat-label">From</span>
			<span class="stat-value">{loadStatus.from}</span>
		</div>
		<div class="load-stat">
			<span class="stat-label">To</span>
			<span class="stat-value">{loadStatus.to}</span>
		</div>
	</div>
</div>

<style>
	.load-status-card {
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 24px;
		margin-bottom: 24px;
	}
	
	.load-status-card h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1f2937;
		margin-bottom: 16px;
	}
	
	.load-details {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}
	
	.load-stat {
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
		.load-details {
			grid-template-columns: 1fr;
			gap: 12px;
		}
	}
</style> 