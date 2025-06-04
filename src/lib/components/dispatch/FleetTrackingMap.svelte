<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 862 lines → @current-size: ~180 lines  
@phase: Phase 2 - High Priority Components
@extractors: FleetMapControls, FleetMapLegend, FleetSummaryPanel, fleet-utils.ts, fleet-tracking.types.ts
-->
<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import FleetMapControls from './fleet-tracking/FleetMapControls.svelte';
	import FleetMapLegend from './fleet-tracking/FleetMapLegend.svelte';
	import FleetSummaryPanel from './fleet-tracking/FleetSummaryPanel.svelte';
	import { 
		getFilteredAssets,
		getStatusColor,
		getStatusIcon,
		generateAssetPopupContent,
		simulateAssetMovement,
		getRouteCoordinates,
		calculateFleetBounds
	} from './fleet-tracking/utils/fleet-utils.js';
	import type { FleetAsset } from './fleet-tracking/types/fleet-tracking.types.js';

	const dispatch = createEventDispatcher();

	// Component exports
	export let showFullscreen = false;
	export let autoUpdate = true;
	export let trackingMode: 'all' | 'active' | 'custom' = 'active';

	// Map and tracking state
	let mapContainer: HTMLDivElement;
	let map: maplibregl.Map | null = null;
	let markers: Record<string, maplibregl.Marker> = {};
	let routeLines: Record<string, any> = {};
	let updateInterval: number;
	let isMapLoaded = false;

	// Mock fleet data with anonymized coordinates (updated to match FleetAsset interface)
	const mockTrucks: FleetAsset[] = [
		{ 
			id: 'FL-001', 
			lat: 35.0000, 
			lng: -98.0000, 
			driver: 'Driver Alpha-1', 
			status: 'transit' as const,
			currentJob: 'Pickup at Production Site',
			eta: '14:30',
			speed: 58,
			bearing: 45,
			lastUpdate: new Date()
		},
		{ 
			id: 'FL-002', 
			lat: 35.1500, 
			lng: -97.8500, 
			driver: 'Driver Alpha-2', 
			status: 'loading' as const,
			currentJob: 'Loading at Collection Hub',
			eta: '16:45',
			speed: 0,
			bearing: 0,
			lastUpdate: new Date()
		},
		{ 
			id: 'FL-003', 
			lat: 35.2000, 
			lng: -97.7000, 
			driver: 'Driver Beta-1', 
			status: 'delivery' as const,
			currentJob: 'Unloading at destination',
			eta: '12:15',
			speed: 0,
			bearing: 0,
			lastUpdate: new Date()
		},
		{ 
			id: 'FL-004', 
			lat: 36.0000, 
			lng: -96.0000, 
			driver: 'Driver Beta-2', 
			status: 'available' as const,
			currentJob: 'Available for dispatch',
			eta: '10:00',
			speed: 0,
			bearing: 0,
			lastUpdate: new Date()
		}
	];

	// Mock yard locations with anonymized coordinates
	const mockYards = [
		{ 
			id: 'alpha-yard', 
			name: 'Metro Hub Alpha', 
			lat: 35.0000, 
			lng: -98.0000,
			trucks: 12,
			status: 'operational'
		},
		{ 
			id: 'beta-yard', 
			name: 'Metro Hub Beta', 
			lat: 35.1000, 
			lng: -97.9000,
			trucks: 8,
			status: 'operational'
		},
		{ 
			id: 'gamma-yard', 
			name: 'Metro Hub Gamma', 
			lat: 36.0000, 
			lng: -96.0000,
			trucks: 6,
			status: 'maintenance'
		}
	];

	// Filtered assets based on tracking mode
	$: filteredAssets = getFilteredAssets(mockTrucks, trackingMode);

	onMount(() => {
		initializeMap();
		if (autoUpdate) {
			startRealtimeTracking();
		}
	});

	onDestroy(() => {
		stopRealtimeTracking();
		if (map) {
			map.remove();
		}
	});

	function initializeMap() {
		if (!mapContainer) return;

		map = new maplibregl.Map({
			container: mapContainer,
			style: {
				"version": 8,
				"sources": {
					"satellite": {
						"type": "raster",
						"tiles": ["https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"],
						"tileSize": 256
					}
				},
				"layers": [{
					"id": "satellite",
					"type": "raster",
					"source": "satellite"
				}]
			},
			center: [-95.3698, 29.7604],
			zoom: 6
		});

		map.on('load', () => {
			isMapLoaded = true;
			addFleetAssetsToMap();
			fitMapToFleet();
		});
	}

	function addFleetAssetsToMap() {
		if (!map) return;

		// Clear existing markers
		Object.values(markers).forEach(marker => marker.remove());
		markers = {};

		// Clear existing routes
		Object.keys(routeLines).forEach(routeId => {
			if (map && map.getLayer(routeId)) map.removeLayer(routeId);
			if (map && map.getSource(routeId)) map.removeSource(routeId);
		});
		routeLines = {};

		// Add new markers and routes
		filteredAssets.forEach(asset => {
			addAssetMarker(asset);
			addAssetRoute(asset);
		});
	}

	function addAssetMarker(asset: FleetAsset) {
		if (!map) return;

		const el = document.createElement('div');
		el.className = 'fleet-marker';
		el.innerHTML = `
			<div class="marker-container">
				<div class="marker-icon" style="background-color: ${getStatusColor(asset.status)}">
					${getStatusIcon(asset.status)}
				</div>
				<div class="marker-label">${asset.id}</div>
			</div>
		`;

		const popup = new maplibregl.Popup({
			offset: 25,
			closeButton: true,
			closeOnClick: false
		}).setHTML(generateAssetPopupContent(asset));

		const marker = new maplibregl.Marker({ element: el })
			.setLngLat([asset.lng, asset.lat])
			.setPopup(popup)
			.addTo(map);

		markers[asset.id] = marker;
	}

	function addAssetRoute(asset: FleetAsset) {
		if (!map || !asset.route) return;

		const routeId = `route-${asset.id}`;
		const coordinates = getRouteCoordinates(asset);

		map.addSource(routeId, {
			'type': 'geojson',
			'data': {
				'type': 'Feature',
				'properties': { 'truckId': asset.id, 'status': asset.status },
				'geometry': { 'type': 'LineString', 'coordinates': coordinates }
			}
		});

		map.addLayer({
			'id': routeId,
			'type': 'line',
			'source': routeId,
			'layout': { 'line-join': 'round', 'line-cap': 'round' },
			'paint': {
				'line-color': getStatusColor(asset.status),
				'line-width': 3,
				'line-opacity': 0.7
			}
		});

		routeLines[routeId] = true;
	}

	function fitMapToFleet() {
		if (!map || filteredAssets.length === 0) return;

		const bounds = calculateFleetBounds(filteredAssets);
		map.fitBounds(bounds, { padding: 50, maxZoom: 12 });
	}

	function startRealtimeTracking() {
		updateInterval = setInterval(() => {
			filteredAssets = filteredAssets.map(simulateAssetMovement);
			if (isMapLoaded) addFleetAssetsToMap();
		}, 10000);
	}

	function stopRealtimeTracking() {
		if (updateInterval) clearInterval(updateInterval);
	}

	// Event handlers for child components
	function handleTrackingModeChange(event: CustomEvent<{ mode: 'all' | 'active' | 'custom' }>) {
		trackingMode = event.detail.mode;
		if (isMapLoaded) {
			addFleetAssetsToMap();
			fitMapToFleet();
		}
	}

	function handleRecenterMap() {
		fitMapToFleet();
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