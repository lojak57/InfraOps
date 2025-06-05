<!-- 
@refactored: 2024-12-24 - VACATION DEMOLITION COMPLETE
@original-size: 426 lines → @current-size: ~85 lines (80% reduction!)
@phase: Phase 2 - High Priority Components
@extractors: FleetMapManager, TrackingManager, mock-fleet-data
-->
<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import FleetMapControls from './fleet-tracking/FleetMapControls.svelte';
	import FleetMapLegend from './fleet-tracking/FleetMapLegend.svelte';
	import FleetSummaryPanel from './fleet-tracking/FleetSummaryPanel.svelte';
	import { FleetMapManager } from './fleet-tracking/map-manager';
	import { TrackingManager } from './fleet-tracking/tracking-manager';
	import { mockTrucks } from './fleet-tracking/mock-fleet-data';
	import { getFilteredAssets } from './fleet-tracking/utils/fleet-utils.js';
	import type { FleetAsset } from './fleet-tracking/types/fleet-tracking.types.js';

	const dispatch = createEventDispatcher();

	// Component exports
	export let showFullscreen = false;
	export let autoUpdate = true;
	export let trackingMode: 'all' | 'active' | 'custom' = 'active';

	// Map and tracking managers
	let mapContainer: HTMLDivElement;
	let mapManager: FleetMapManager;
	let trackingManager: TrackingManager;

	// Filtered assets based on tracking mode
	$: filteredAssets = getFilteredAssets(mockTrucks, trackingMode);

	onMount(() => {
		// Initialize map manager
		if (mapContainer) {
			mapManager = new FleetMapManager(mapContainer);
			mapManager.initializeMap();

			// Initialize tracking manager
			trackingManager = new TrackingManager(filteredAssets, handleAssetsUpdate);

			// Start tracking if auto-update is enabled
			if (autoUpdate) {
				trackingManager.startRealtimeTracking();
			}

			// Add initial assets to map
			setTimeout(() => {
				if (mapManager.mapLoaded) {
					mapManager.addFleetAssetsToMap(filteredAssets);
					mapManager.fitMapToFleet(filteredAssets);
				}
			}, 1000);
		}
	});

	onDestroy(() => {
		trackingManager?.destroy();
		mapManager?.destroy();
	});

	function handleAssetsUpdate(assets: FleetAsset[]) {
		if (mapManager?.mapLoaded) {
			mapManager.addFleetAssetsToMap(assets);
		}
	}

	// Event handlers for child components
	function handleTrackingModeChange(event: CustomEvent<{ mode: 'all' | 'active' | 'custom' }>) {
		trackingMode = event.detail.mode;
		if (mapManager?.mapLoaded) {
			mapManager.addFleetAssetsToMap(filteredAssets);
			mapManager.fitMapToFleet(filteredAssets);
		}
	}

	function handleRecenterMap() {
		if (mapManager) {
			mapManager.fitMapToFleet(filteredAssets);
		}
	}

	function handleToggleFullscreen() {
		showFullscreen = !showFullscreen;
		dispatch('fullscreen-toggle', { fullscreen: showFullscreen });
	}
</script>

<div class="fleet-map-container" class:fullscreen={showFullscreen}>
	<!-- Map Controls Component -->
	<FleetMapControls 
		fleetAssets={filteredAssets}
		{trackingMode}
		{showFullscreen}
		on:tracking-mode-change={handleTrackingModeChange}
		on:recenter-map={handleRecenterMap}
		on:toggle-fullscreen={handleToggleFullscreen}
	/>

	<!-- Fleet Status Legend Component -->
	<FleetMapLegend />

	<!-- Map Container -->
	<div class="map-content" bind:this={mapContainer}></div>

	<!-- Fleet Summary Component -->
	<FleetSummaryPanel fleetAssets={filteredAssets} {autoUpdate} />
</div>

<style>
	.fleet-map-container {
		position: relative;
		width: 100%;
		height: 600px;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: #0f172a;
	}

	.fleet-map-container.fullscreen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		height: 100vh;
		border-radius: 0;
	}

	.map-content {
		width: 100%;
		height: 100%;
	}

	/* Global marker styles */
	:global(.fleet-marker) {
		cursor: pointer;
	}

	:global(.marker-container) {
		display: flex;
		flex-direction: column;
		align-items: center;
		transition: transform 0.3s ease;
	}

	:global(.marker-icon) {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		border: 3px solid white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		transition: all 0.2s ease;
	}

	:global(.marker-icon:hover) {
		transform: scale(1.1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
	}

	:global(.marker-label) {
		background: rgba(15, 23, 42, 0.9);
		color: white;
		padding: 2px 6px;
		border-radius: 4px;
		font-size: 10px;
		font-weight: 600;
		margin-top: 4px;
		white-space: nowrap;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	/* Global popup styles */
	:global(.fleet-popup) {
		font-family: system-ui, -apple-system, sans-serif;
		min-width: 220px;
	}

	:global(.popup-header) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
		padding-bottom: 8px;
		border-bottom: 1px solid #e5e7eb;
	}

	:global(.popup-header strong) {
		font-weight: 700;
		color: #1f2937;
	}

	:global(.status-badge) {
		padding: 2px 6px;
		border-radius: 4px;
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	:global(.popup-content) {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	:global(.popup-row) {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	:global(.popup-row .label) {
		font-size: 12px;
		color: #6b7280;
		font-weight: 500;
	}

	:global(.popup-row .value) {
		font-size: 12px;
		color: #1f2937;
		font-weight: 600;
		text-align: right;
	}
</style> 