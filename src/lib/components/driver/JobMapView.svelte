<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	// Import orchestrator components
	import JobInfoPanel from './job-map-view/JobInfoPanel.svelte';
	import MapPanel from './job-map-view/MapPanel.svelte';
	
	// Import existing stores
	import { mapStore } from './job-map/stores/mapState';
	import { jobTrackingStore } from './job-map/stores/jobTracking';

	const dispatch = createEventDispatcher();

	export let job: any; // Job details from parent

	$: currentLocation = $mapStore.currentLocation;
	$: trackingState = $jobTrackingStore;

	function exitMapView() {
		dispatch('exit-map');
	}

	function handleStepCompleted(event: CustomEvent) {
		dispatch('step-completed', event.detail);
	}

	function handleMapLoaded(event: CustomEvent) {
		dispatch('map-loaded', event.detail);
	}

	function handleMapError(event: CustomEvent) {
		dispatch('map-error', event.detail);
	}

	function handleStartTransit(job: any) {
		dispatch('start-transit', { job });
	}
</script>

<div class="map-view-container">
	<!-- Left Panel - Job Info -->
	<JobInfoPanel 
		{job}
		onExitMap={exitMapView}
		onStepCompleted={handleStepCompleted}
		onStartTransit={handleStartTransit}
	/>

	<!-- Right Panel - Interactive Map -->
	<MapPanel 
		{job}
		{currentLocation}
		{trackingState}
		onMapLoaded={handleMapLoaded}
		onMapError={handleMapError}
	/>
</div>

<style>
	.map-view-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #1a1a1a;
		display: flex;
		z-index: 2000;
		font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
	}

	@media (max-width: 768px) {
		.map-view-container {
			flex-direction: column;
		}
	}
</style> 