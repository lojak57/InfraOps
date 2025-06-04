<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 651 lines → @current-size: ~120 lines  
@phase: Phase 5 - HEAVYWEIGHT TARGET OBLITERATION
@extractors: MonitoringHeader, QuickStatusPanel, MonitoringNotifications, DemoFooter, monitoring-page-utils.ts, monitoring-page.types.ts
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { systemAlerts, truckMonitoringData } from '$lib/stores/truckMonitoringData';
	import InteractiveTruckDiagram from '$lib/components/monitoring/InteractiveTruckDiagram.svelte';
	import ValveStatusPanel from '$lib/components/monitoring/ValveStatusPanel.svelte';
	import PressureSensorPanel from '$lib/components/monitoring/PressureSensorPanel.svelte';

	// Import orchestrator components
	import MonitoringHeader from './components/MonitoringHeader.svelte';
	import QuickStatusPanel from './components/QuickStatusPanel.svelte';
	import MonitoringNotifications from './components/MonitoringNotifications.svelte';
	import DemoFooter from './components/DemoFooter.svelte';

	// Import business logic and types
	import type { NotificationData } from './types/monitoring-page.types';
	import {
		calculateHeaderStats,
		calculateStatusCounts,
		getLOVISVisionStatus,
		processSystemAlerts,
		handleValveToggled,
		handleSensorClicked,
		showBrowserNotification,
		setPageTitle,
		shouldShowOverview,
		shouldShowValves,
		shouldShowSensors
	} from './utils/monitoring-page-utils';

	// State
	let selectedView: 'overview' | 'valves' | 'sensors' = 'overview';
	let showDiagramLabels = true;
	let notifications: NotificationData[] = [];

	// Reactive calculations using utilities
	$: headerStats = calculateHeaderStats($truckMonitoringData, $systemAlerts);
	$: statusCounts = calculateStatusCounts($truckMonitoringData);
	$: lovisVision = getLOVISVisionStatus($truckMonitoringData);
	$: alertsBanner = processSystemAlerts($systemAlerts);

	// Initialize page
	onMount(() => {
		setPageTitle();
	});

	// Event handlers
	function handleViewChange(event: CustomEvent<{ view: 'overview' | 'valves' | 'sensors' }>) {
		selectedView = event.detail.view;
	}

	function handleValveToggledEvent(event: CustomEvent) {
		const notification = handleValveToggled(event.detail.valve);
		notifications = [...notifications, notification];
		showBrowserNotification(notification);
	}

	function handleSensorClickedEvent(event: CustomEvent) {
		const notification = handleSensorClicked(event.detail.sensor);
		notifications = [...notifications, notification];
		showBrowserNotification(notification);
	}

	function handleStatusPanelViewDetails(event: CustomEvent<{ view: 'valves' | 'sensors' }>) {
		selectedView = event.detail.view;
	}
</script>

<div class="monitoring-container">
	<!-- Header Section -->
	<MonitoringHeader 
		stats={headerStats}
		{selectedView}
		{alertsBanner}
		on:view-change={handleViewChange}
	/>

	<!-- Main Content -->
	<div class="content-area">
		{#if shouldShowOverview(selectedView)}
			<div class="overview-layout">
				<!-- Interactive Truck Diagram -->
				<div class="diagram-section">
					<div class="section-controls">
						<label class="toggle-label">
							<input 
								type="checkbox" 
								bind:checked={showDiagramLabels}
							/>
							<span>Show Labels</span>
						</label>
					</div>
					<InteractiveTruckDiagram 
						showLabels={showDiagramLabels}
						interactive={true}
						on:valve-toggled={handleValveToggledEvent}
						on:sensor-clicked={handleSensorClickedEvent}
					/>
				</div>

				<!-- Quick Status Panels -->
				<QuickStatusPanel 
					{statusCounts}
					{lovisVision}
					on:view-details={handleStatusPanelViewDetails}
				/>
			</div>
		{/if}

		{#if shouldShowValves(selectedView)}
			<div class="valves-layout">
				<ValveStatusPanel on:valve-toggled={handleValveToggledEvent} />
			</div>
		{/if}

		{#if shouldShowSensors(selectedView)}
			<div class="sensors-layout">
				<PressureSensorPanel on:sensor-clicked={handleSensorClickedEvent} />
			</div>
		{/if}
	</div>

	<!-- Demo Footer -->
	<DemoFooter />
</div>

<!-- Notification System -->
<MonitoringNotifications bind:notifications />

<style>
	.monitoring-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	}

	.content-area {
		max-width: 1400px;
		margin: 0 auto;
		padding: 24px;
	}

	.overview-layout {
		display: grid;
		grid-template-columns: 1fr 350px;
		gap: 24px;
	}

	.diagram-section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.section-controls {
		display: flex;
		justify-content: flex-end;
		padding: 0 8px;
	}

	.toggle-label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		color: #64748b;
		cursor: pointer;
	}

	.valves-layout,
	.sensors-layout {
		width: 100%;
	}

	/* Mobile responsive */
	@media (max-width: 1024px) {
		.overview-layout {
			grid-template-columns: 1fr;
		}
	}
</style> 