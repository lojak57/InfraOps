<script lang="ts">
	import MapRenderer from '../job-map/MapRenderer.svelte';
	import MapHeader from './MapHeader.svelte';
	import NavigationOverlay from './NavigationOverlay.svelte';
	import RouteSummary from './RouteSummary.svelte';

	export let job: any;
	export let currentLocation: any;
	export let trackingState: any;
	export let onMapLoaded: (event: CustomEvent) => void;
	export let onMapError: (event: CustomEvent) => void;
</script>

<div class="map-panel">
	<div class="map-container">
		<!-- Map Header with Navigation Controls -->
		<MapHeader {job} {trackingState} />
		
		<!-- Map Renderer Component -->
		<MapRenderer 
			{job} 
			{currentLocation}
			on:map-loaded={onMapLoaded}
			on:map-error={onMapError}
		/>

		<!-- Enhanced Navigation overlay -->
		<NavigationOverlay />

		<!-- Enhanced Bottom route summary -->
		<RouteSummary {job} {trackingState} />
	</div>
</div>

<style>
	.map-panel {
		width: 50%;
		position: relative;
		background: #1a1a1a;
	}

	.map-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	@media (max-width: 768px) {
		.map-panel {
			width: 100%;
			height: 50vh;
		}
	}
</style> 