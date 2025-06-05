<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import { createTransitMap, addTransitRoute } from './map-utils';
	import type { TransitLocation, JobLocation } from './map-utils';
	import MapControls from './MapControls.svelte';
	import NextStepBanner from './NextStepBanner.svelte';

	const dispatch = createEventDispatcher();

	export let job: any; // Job details from parent
	export let currentLocation: TransitLocation;
	export let transitSpeed: number;
	export let distanceToDelivery: number;

	// Map container and instance
	let mapContainer: HTMLDivElement;
	let map: maplibregl.Map;

	// Map initialization for in-transit view
	onMount(() => {
		if (mapContainer && job) {
			// Initialize map with focused view on current route
			map = createTransitMap(mapContainer, currentLocation);

			// Add navigation controls
			map.addControl(new maplibregl.NavigationControl(), 'top-right');

			// Add route and markers when map loads
			map.on('load', () => {
				addTransitRoute(map, currentLocation, job.deliveryLocation, transitSpeed, distanceToDelivery);
			});
		}
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});

	function handleOpenNavigation() {
		dispatch('open-navigation');
	}
</script>

<div class="map-section">
	<MapControls 
		destinationName={job.deliveryLocation.name}
		distanceRemaining={distanceToDelivery}
		on:open-navigation={handleOpenNavigation}
	/>
	
	<div class="map-container" bind:this={mapContainer}></div>
	
	<NextStepBanner />
</div>

<style>
	.map-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: rgba(15, 23, 42, 0.8);
		border: 1px solid rgba(59, 130, 246, 0.1);
		border-radius: 10px;
		overflow: hidden;
		position: relative;
	}

	.map-container {
		flex: 1;
		width: 100%;
		position: relative;
	}

	/* Tablet and desktop adjustments */
	@media (min-width: 768px) {
		.map-section {
			border-radius: 12px;
		}
	}
</style> 