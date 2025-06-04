<script lang="ts">
	import { Calculator } from 'lucide-svelte';

	export let capacityStatus: 'good' | 'warning' | 'danger';
</script>

<div class="calculator-header">
	<div class="header-icon">
		<Calculator size={24} />
	</div>
	<div class="header-info">
		<h3>Load Calculator</h3>
		<p>Real-time capacity calculations</p>
	</div>
	<div class="status-badge" class:good={capacityStatus === 'good'} class:warning={capacityStatus === 'warning'} class:danger={capacityStatus === 'danger'}>
		{capacityStatus.toUpperCase()}
	</div>
</div>

<style>
	.calculator-header {
		background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
		color: white;
		padding: 20px 24px;
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.header-icon {
		width: 48px;
		height: 48px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.header-info {
		flex: 1;
	}

	.header-info h3 {
		margin: 0 0 4px 0;
		font-size: 20px;
		font-weight: 700;
	}

	.header-info p {
		margin: 0;
		opacity: 0.9;
		font-size: 14px;
	}

	.status-badge {
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.status-badge.good {
		background: rgba(16, 185, 129, 0.2);
		color: #10b981;
	}

	.status-badge.warning {
		background: rgba(245, 158, 11, 0.2);
		color: #f59e0b;
	}

	.status-badge.danger {
		background: rgba(239, 68, 68, 0.2);
		color: #ef4444;
	}

	@media (max-width: 768px) {
		.calculator-header {
			padding: 16px 20px;
		}
	}
</style> 