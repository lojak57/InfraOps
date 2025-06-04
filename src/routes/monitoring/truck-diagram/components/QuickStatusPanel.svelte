<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { StatusCounts, LOVISVisionStatus } from '../types/monitoring-page.types';
	import { formatLastSyncTime } from '../utils/monitoring-page-utils';

	export let statusCounts: StatusCounts;
	export let lovisVision: LOVISVisionStatus;

	const dispatch = createEventDispatcher<{
		'view-details': { view: 'valves' | 'sensors' };
	}>();

	function handleViewDetails(view: 'valves' | 'sensors') {
		dispatch('view-details', { view });
	}
</script>

<div class="quick-status">
	<div class="status-grid">
		<!-- Valve Status Card -->
		<div class="status-card valves">
			<div class="status-header">
				<span class="status-icon">🎛️</span>
				<span class="status-title">Valve Status</span>
			</div>
			<div class="status-summary">
				<div class="summary-row">
					<span>🟢 Open:</span>
					<span>{statusCounts.valves.open}</span>
				</div>
				<div class="summary-row">
					<span>🔴 Closed:</span>
					<span>{statusCounts.valves.closed}</span>
				</div>
				<div class="summary-row">
					<span>🟡 Unknown:</span>
					<span>{statusCounts.valves.unknown}</span>
				</div>
			</div>
			<button class="view-details-btn" on:click={() => handleViewDetails('valves')}>
				View Details
			</button>
		</div>

		<!-- Sensor Status Card -->
		<div class="status-card sensors">
			<div class="status-header">
				<span class="status-icon">📊</span>
				<span class="status-title">Sensor Status</span>
			</div>
			<div class="status-summary">
				<div class="summary-row">
					<span>🟢 Normal:</span>
					<span>{statusCounts.sensors.normal}</span>
				</div>
				<div class="summary-row">
					<span>🟡 Warning:</span>
					<span>{statusCounts.sensors.warning}</span>
				</div>
				<div class="summary-row">
					<span>🔴 Critical:</span>
					<span>{statusCounts.sensors.critical}</span>
				</div>
			</div>
			<button class="view-details-btn" on:click={() => handleViewDetails('sensors')}>
				View Details
			</button>
		</div>

		<!-- LOVISVision Integration Card -->
		<div class="status-card integration">
			<div class="status-header">
				<span class="status-icon">📡</span>
				<span class="status-title">LOVISVision</span>
			</div>
			<div class="integration-status">
				<div class="connection-indicator" class:connected={lovisVision.connected}>
					<div class="connection-dot"></div>
					<span>{lovisVision.connected ? 'Connected' : 'Disconnected'}</span>
				</div>
				<div class="last-sync">
					Last sync: {formatLastSyncTime(lovisVision.lastSync)}
				</div>
			</div>
			<div class="integration-features">
				<div class="feature-item">
					{lovisVision.features.realtimeMonitoring ? '✅' : '❌'} Real-time pressure monitoring
				</div>
				<div class="feature-item">
					{lovisVision.features.emailAlerts ? '✅' : '❌'} Automatic email alerts
				</div>
				<div class="feature-item">
					{lovisVision.features.valveStatusCapture ? '✅' : '❌'} Valve status capture
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.quick-status {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.status-grid {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.status-card {
		background: rgba(255, 255, 255, 0.95);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		padding: 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.status-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 12px;
	}

	.status-icon {
		font-size: 18px;
	}

	.status-title {
		font-size: 16px;
		font-weight: 600;
		color: #0f172a;
	}

	.status-summary {
		margin-bottom: 12px;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 13px;
		margin-bottom: 4px;
	}

	.view-details-btn {
		width: 100%;
		padding: 8px 12px;
		background: #7CB342;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.view-details-btn:hover {
		background: #558B2F;
		transform: translateY(-1px);
	}

	.integration-status {
		margin-bottom: 12px;
	}

	.connection-indicator {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 4px;
		color: #ef4444;
	}

	.connection-indicator.connected {
		color: #16a34a;
	}

	.connection-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #ef4444;
	}

	.connection-indicator.connected .connection-dot {
		background: #16a34a;
		animation: pulse 2s infinite;
	}

	.last-sync {
		font-size: 11px;
		color: #64748b;
	}

	.integration-features {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.feature-item {
		font-size: 11px;
		color: #374151;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.6; }
	}
</style> 