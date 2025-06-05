<!-- 
@refactored: 2024-12-24 - VACATION DEMOLITION COMPLETE
@original-size: 439 lines → @current-size: ~80 lines (82% reduction!)
@phase: Phase 2 - High Priority Components
@extractors: RecommenderHeader, RecommenderFooter, ContentAreaWrapper
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fleetStats } from '$lib/stores/calibrationData';
	import RecommenderHeader from './smart-calibration/RecommenderHeader.svelte';
	import RecommenderFooter from './smart-calibration/RecommenderFooter.svelte';
	import ContentAreaWrapper from './smart-calibration/ContentAreaWrapper.svelte';
	import type { CalibrationViewMode } from './smart-calibration/types/calibration.types.js';

	const dispatch = createEventDispatcher();

	// View state
	let viewMode: CalibrationViewMode = {
		selected: 'overview',
		truckView: 'table',
		filterStatus: 'all',
		activeTab: 'overview'
	};

	function handleScheduleCalibration(event: CustomEvent) {
		dispatch('schedule-calibration', event.detail);
	}

	function handleViewTruckDetails(event: CustomEvent) {
		dispatch('view-truck-details', event.detail);
	}

	function handleViewChange(event: CustomEvent) {
		viewMode.selected = event.detail.view;
		if (event.detail.view === 'fleet' && event.detail.filter) {
			viewMode.filterStatus = event.detail.filter;
		}
	}

	function handleFilterChange(event: CustomEvent) {
		viewMode.filterStatus = event.detail.filter;
		viewMode.selected = 'fleet';
	}

	function handleTabChange(event: CustomEvent) {
		viewMode.activeTab = event.detail.tab;
	}
</script>

<div class="recommender-container">
	<!-- Header Component -->
	<RecommenderHeader 
		fleetStats={$fleetStats}
		{viewMode}
		on:view-change={handleViewChange}
	/>

	<!-- Content Area Component -->
	<ContentAreaWrapper 
		{viewMode}
		fleetStats={$fleetStats}
		on:schedule-calibration={handleScheduleCalibration}
		on:view-truck-details={handleViewTruckDetails}
		on:view-change={handleViewChange}
		on:filter-change={handleFilterChange}
		on:tab-change={handleTabChange}
	/>

	<!-- Footer Component -->
	<RecommenderFooter fleetStats={$fleetStats} />
</div>

<style>
	.recommender-container {
		width: 100%;
		min-height: 100vh;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
		color: #e2e8f0;
		font-family: system-ui, -apple-system, sans-serif;
	}
</style> 