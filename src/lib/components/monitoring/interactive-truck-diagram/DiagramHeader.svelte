<script lang="ts">
	export let title: string = '🚛 Live Truck Monitoring - PLN-014 - TEST UPDATE WORKING';
	export let connectionStatus: string = 'LOVISVision Connected';
	export let isConnected: boolean = true;
</script>

<div class="diagram-header">
	<h3 class="diagram-title">{title}</h3>
	<div class="connection-status" class:connected={isConnected}>
		<div class="status-dot"></div>
		<span>{connectionStatus}</span>
	</div>
</div>

<style>
	.diagram-header {
		background: linear-gradient(135deg, #f8fafc, #e2e8f0);
		padding: 16px 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.diagram-title {
		font-size: 18px;
		font-weight: 600;
		color: #0f172a;
		margin: 0;
	}

	.connection-status {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		font-weight: 500;
		color: #ef4444;
	}

	.connection-status.connected {
		color: #16a34a;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #ef4444;
	}

	.connection-status.connected .status-dot {
		background: #16a34a;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.6; }
	}
</style> 