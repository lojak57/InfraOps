<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { HeaderStats, AlertsBannerData } from '../types/monitoring-page.types';
	import { 
		getViewModeClass, 
		hasConnectionWarning, 
		getConnectionStatusColor,
		formatAlertsText 
	} from '../utils/monitoring-page-utils';

	export let stats: HeaderStats;
	export let selectedView: 'overview' | 'valves' | 'sensors';
	export let alertsBanner: AlertsBannerData;

	const dispatch = createEventDispatcher<{
		'view-change': { view: 'overview' | 'valves' | 'sensors' };
	}>();

	function handleViewChange(view: 'overview' | 'valves' | 'sensors') {
		dispatch('view-change', { view });
	}
</script>

<svelte:head>
	<title>Live Truck Monitoring - FlowOps Logistics Operations</title>
	<meta name="description" content="Real-time valve and sensor monitoring for oil transport trucks with interactive diagrams and LOVISVision integration.">
</svelte:head>

<div class="monitoring-header">
	<div class="header-content">
		<div class="title-section">
			<h1 class="main-title">🚛 Live Truck Monitoring</h1>
			<p class="subtitle">Real-time valve and sensor diagnostics • Interactive truck visualization</p>
		</div>
		
		<div class="header-stats">
			<div class="stat-item">
				<span class="stat-value">{stats.truckId}</span>
				<span class="stat-label">Truck ID</span>
			</div>
			<div class="stat-item" class:warning={hasConnectionWarning(stats)}>
				<span class="stat-value">{stats.activeAlerts}</span>
				<span class="stat-label">Active Alerts</span>
			</div>
			<div class="stat-item">
				<span class="stat-value connected">
					{getConnectionStatusColor(stats.connectionStatus)}
				</span>
				<span class="stat-label">Connection</span>
			</div>
		</div>
	</div>

	<!-- Navigation Tabs -->
	<div class="nav-tabs">
		<button 
			class={getViewModeClass(selectedView, 'overview')}
			on:click={() => handleViewChange('overview')}
		>
			🎯 Overview
		</button>
		<button 
			class={getViewModeClass(selectedView, 'valves')}
			on:click={() => handleViewChange('valves')}
		>
			🎛️ Valve Control
		</button>
		<button 
			class={getViewModeClass(selectedView, 'sensors')}
			on:click={() => handleViewChange('sensors')}
		>
			📊 Sensor Data
		</button>
	</div>

	<!-- System Alerts -->
	{#if alertsBanner.visible}
		<div class="alerts-banner">
			<div class="alerts-content">
				<div class="alerts-icon">⚠️</div>
				<div class="alerts-text">
					{formatAlertsText(alertsBanner.alerts)}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.monitoring-header {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		padding: 24px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;
		max-width: 1400px;
		margin-left: auto;
		margin-right: auto;
	}

	.title-section {
		flex: 1;
	}

	.main-title {
		font-size: 32px;
		font-weight: 800;
		color: #0f172a;
		margin: 0 0 8px 0;
		background: linear-gradient(135deg, #7CB342, #558B2F);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.subtitle {
		font-size: 16px;
		color: #64748b;
		margin: 0;
	}

	.header-stats {
		display: flex;
		gap: 24px;
	}

	.stat-item {
		text-align: center;
		padding: 12px 16px;
		background: rgba(248, 250, 252, 0.8);
		border-radius: 8px;
		border: 1px solid rgba(0, 0, 0, 0.05);
		transition: all 0.2s ease;
	}

	.stat-item.warning {
		border-color: #f59e0b;
		background: rgba(245, 158, 11, 0.05);
	}

	.stat-value {
		display: block;
		font-size: 24px;
		font-weight: 700;
		color: #0f172a;
		font-family: 'JetBrains Mono', monospace;
	}

	.stat-value.connected {
		animation: pulse 2s infinite;
	}

	.stat-label {
		display: block;
		font-size: 11px;
		color: #64748b;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-top: 2px;
	}

	.nav-tabs {
		display: flex;
		gap: 4px;
		max-width: 1400px;
		margin: 0 auto 16px auto;
	}

	.nav-tab {
		padding: 12px 20px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		background: rgba(255, 255, 255, 0.8);
		color: #64748b;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		border-radius: 8px 8px 0 0;
		font-size: 14px;
	}

	.nav-tab:hover {
		background: rgba(255, 255, 255, 0.9);
		border-color: rgba(0, 0, 0, 0.15);
	}

	.nav-tab.active {
		background: white;
		color: #7CB342;
		border-bottom-color: white;
		box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
	}

	.alerts-banner {
		background: linear-gradient(135deg, #fef3c7, #fde68a);
		border: 1px solid #f59e0b;
		border-radius: 8px;
		padding: 12px 16px;
		max-width: 1400px;
		margin: 0 auto;
	}

	.alerts-content {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.alerts-icon {
		font-size: 18px;
	}

	.alerts-text {
		flex: 1;
		color: #92400e;
		font-size: 14px;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.6; }
	}

	/* Mobile responsive */
	@media (max-width: 1024px) {
		.header-content {
			flex-direction: column;
			gap: 16px;
			align-items: flex-start;
		}

		.header-stats {
			align-self: stretch;
			justify-content: space-between;
		}

		.nav-tabs {
			flex-direction: column;
		}
	}

	@media (max-width: 768px) {
		.main-title {
			font-size: 24px;
		}

		.header-stats {
			flex-direction: column;
			gap: 8px;
		}
	}
</style> 