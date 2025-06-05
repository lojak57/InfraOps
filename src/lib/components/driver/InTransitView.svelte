<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import InTransitHeader from './InTransitHeader.svelte';
	import SafetyMetricsDashboard from './SafetyMetricsDashboard.svelte';
	import EmergencyActionPanel from './EmergencyActionPanel.svelte';
	import TransitMapDisplay from './in-transit-view/TransitMapDisplay.svelte';
	import EndTransitButton from './in-transit-view/EndTransitButton.svelte';
	import { createInitialTransitState } from './in-transit-view/transit-state';
	import type { TransitLocation } from './in-transit-view/map-utils';

	const dispatch = createEventDispatcher();

	export let job: any; // Job details from parent

	// Current location and transit state
	const currentLocation: TransitLocation = {
		lat: 29.8000,  // Slightly further along the route
		lng: -95.4000,
		address: 'US-290 West - In Transit'
	};
	
	// Initialize transit state using utility
	const transitState = createInitialTransitState();

	// Event handlers for child components
	function handleExitTransit() {
		dispatch('exit-transit');
	}

	function handleEndTransit() {
		dispatch('transit-complete');
	}

	function handleEmergencyCall() {
		console.log('Emergency call initiated from panel');
	}

	function handleDispatchCall() {
		console.log('Dispatch call initiated from panel');
	}

	function handleSafetyReport() {
		console.log('Safety report initiated from panel');
	}

	function handleOpenNavigation() {
		console.log('Opening navigation app');
	}
</script>

<div class="transit-view-container">
	<!-- Header Component -->
	<InTransitHeader 
		{job} 
		alertLevel={transitState.alertLevel}
		on:exit-transit={handleExitTransit}
	/>

	<!-- Safety Metrics Dashboard Component -->
	<SafetyMetricsDashboard 
		transitSpeed={transitState.transitSpeed}
		maxSpeedAlert={transitState.maxSpeedAlert}
		tankPressure={transitState.tankPressure}
		loadTemperature={transitState.loadTemperature}
		estimatedArrival={transitState.estimatedArrival}
	/>

	<!-- Transit Map Display Component -->
	<TransitMapDisplay 
		{job}
		{currentLocation}
		transitSpeed={transitState.transitSpeed}
		distanceToDelivery={transitState.distanceToDelivery}
		on:open-navigation={handleOpenNavigation}
	/>

	<!-- Emergency Action Panel Component -->
	<EmergencyActionPanel 
		on:emergency-call={handleEmergencyCall}
		on:dispatch-call={handleDispatchCall}
		on:safety-report={handleSafetyReport}
	/>

	<!-- End Transit Button Component -->
	<EndTransitButton on:end-transit={handleEndTransit} />
</div>

<style>
	.transit-view-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #0f172a;
		display: flex;
		flex-direction: column;
		z-index: 2000;
		font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
		color: white;
		padding: 8px;
		box-sizing: border-box;
		gap: 6px;
	}

	/* Tablet and desktop adjustments */
	@media (min-width: 768px) {
		.transit-view-container {
			padding: 12px;
			gap: 8px;
		}
	}

	@media (min-width: 1024px) {
		.transit-view-container {
			padding: 16px;
			gap: 12px;
		}
	}
</style> 