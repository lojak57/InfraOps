<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import FleetTrackingMap from '$lib/components/dispatch/FleetTrackingMap.svelte';

	export let showFullscreen: boolean = false;
	export let autoUpdate: boolean = true;

	const dispatch = createEventDispatcher<{
		'map-ready': { detail: any };
		'fullscreen-toggle': { detail: any };
	}>();

	function handleMapReady(event: CustomEvent) {
		console.log('Fleet tracking map ready:', event.detail);
		dispatch('map-ready', { detail: event.detail });
	}

	function handleFullscreenToggle(event: CustomEvent) {
		console.log('Fullscreen toggled:', event.detail);
		dispatch('fullscreen-toggle', { detail: event.detail });
	}
</script>

<div class="map-container">
	<div class="map-header">
		<h3>Live Fleet Tracking</h3>
		<div class="map-status">
			<div class="status-indicator">
				<span class="status-dot active"></span>
				<span class="status-text">Real-time Tracking Active</span>
			</div>
		</div>
	</div>
	
	<div class="map-view">
		<FleetTrackingMap 
			bind:showFullscreen
			{autoUpdate}
			trackingMode="active"
			on:map-ready={handleMapReady}
			on:fullscreen-toggle={handleFullscreenToggle}
		/>
	</div>
</div>

<style>
	.map-container {
		flex: 1;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.map-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 24px;
		border-bottom: 1px solid #e2e8f0;
		background: #f8fafc;
	}

	.map-header h3 {
		font-size: 18px;
		font-weight: 600;
		color: #1e293b;
		margin: 0;
	}

	.map-status {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.status-indicator {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.status-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.status-dot.active {
		background-color: #10B981;
	}

	.status-text {
		font-size: 12px;
		color: #64748b;
	}

	.map-view {
		flex: 1;
		position: relative;
		overflow: hidden;
		height: 100%;
	}

	/* MapLibre GL Popup Styling */
	:global(.maplibregl-popup) {
		max-width: 200px;
	}

	:global(.maplibregl-popup-content) {
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		padding: 0;
	}

	:global(.maplibregl-marker) {
		cursor: pointer;
	}
</style> 