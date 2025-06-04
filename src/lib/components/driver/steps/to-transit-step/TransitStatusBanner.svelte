<script lang="ts">
	import { getDeliveryStatusSteps } from './utils/to-transit-step-utils';

	const statusSteps = getDeliveryStatusSteps();
</script>

<div class="delivery-status-banner">
	{#each statusSteps as step}
		<div class="status-item {step.state}">
			<span class="status-icon">{step.icon}</span>
			<span class="status-text">{step.text}</span>
		</div>
	{/each}
</div>

<style>
	.delivery-status-banner {
		display: flex;
		justify-content: space-between;
		background: #f8fafc;
		border-radius: 12px;
		padding: 20px;
		margin-top: 24px;
		border: 2px solid #e2e8f0;
	}
	
	.status-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		flex: 1;
	}
	
	.status-icon {
		font-size: 1.5rem;
		margin-bottom: 8px;
	}
	
	.status-text {
		font-size: 0.875rem;
		font-weight: 500;
	}
	
	.status-item.completed {
		color: #10b981;
	}
	
	.status-item.active {
		color: #3b82f6;
		font-weight: 600;
	}
	
	.status-item.pending {
		color: #6b7280;
	}

	@media (max-width: 768px) {
		.delivery-status-banner {
			flex-direction: column;
			gap: 16px;
		}
	}
</style> 