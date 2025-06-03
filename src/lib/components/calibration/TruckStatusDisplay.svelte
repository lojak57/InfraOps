<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 796 lines → @current-size: ~180 lines  
@phase: Phase 2 - High Priority Components
@extractors: TruckStatusControls, TruckStatusTable, TruckStatusGrid, truck-status-utils.ts, truck-status.types.ts
-->
<script lang="ts">
	import { fleetData } from '$lib/stores/calibrationData';
	import { createEventDispatcher } from 'svelte';
	import TruckStatusControls from './truck-status/TruckStatusControls.svelte';
	import TruckStatusTable from './truck-status/TruckStatusTable.svelte';
	import TruckStatusGrid from './truck-status/TruckStatusGrid.svelte';
	import { 
		filterTrucks, 
		sortTrucks, 
		toggleTruckSelection, 
		selectAllTrucks, 
		clearSelection 
	} from './truck-status/utils/truck-status-utils.js';
	import type { 
		TruckStatusFilters, 
		TruckStatusSorting 
	} from './truck-status/types/truck-status.types.js';

	const dispatch = createEventDispatcher();

	// Exported props
	export let viewMode: 'table' | 'grid' = 'table';
	export let filterStatus: 'all' | 'good' | 'warning' | 'critical' = 'all';
	export let sortBy: 'id' | 'lastCalibrated' | 'avgLoadDelta' | 'status' = 'status';
	export let sortDirection: 'asc' | 'desc' = 'desc';

	// Internal state
	let selectedTrucks: string[] = [];
	let searchTerm: string = '';
	
	// Reactive filters and sorting
	let filters: TruckStatusFilters;
	let sorting: TruckStatusSorting;
	
	$: filters = {
		searchTerm,
		filterStatus
	};
	
	$: sorting = {
		sortBy,
		sortDirection
	};

	// Filtered and sorted truck data
	$: filteredTrucks = filterTrucks($fleetData, filters);
	$: finalTrucks = sortTrucks(filteredTrucks, sorting);

	// Event handlers
	function handleFilterChange(event: CustomEvent) {
		const { filters: newFilters } = event.detail;
		searchTerm = newFilters.searchTerm;
		filterStatus = newFilters.filterStatus;
	}
	
	function handleViewModeChange(event: CustomEvent) {
		viewMode = event.detail.viewMode;
	}
	
	function handleSortChange(event: CustomEvent) {
		const { sortBy: newSortBy, sortDirection: newSortDirection } = event.detail;
		sortBy = newSortBy;
		sortDirection = newSortDirection;
	}
	
	function handleToggleSelection(event: CustomEvent) {
		const { truckId } = event.detail;
		selectedTrucks = toggleTruckSelection(truckId, selectedTrucks);
	}
	
	function handleSelectAllVisible() {
		selectedTrucks = selectAllTrucks(finalTrucks);
	}
	
	function handleClearSelection() {
		selectedTrucks = clearSelection();
	}
	
	function handleScheduleCalibration(event: CustomEvent) {
		const { truckIds } = event.detail;
		dispatch('schedule-calibration', { truckIds });
	}
	
	function handleViewDetails(event: CustomEvent) {
		const { truck } = event.detail;
		dispatch('view-details', { truck });
	}
</script>

<div class="truck-status-container">
	<!-- Controls Component -->
	<TruckStatusControls 
		filters={filters}
		viewMode={viewMode}
		selectedTrucks={selectedTrucks}
		totalTrucks={$fleetData.length}
		filteredCount={filteredTrucks.length}
		on:filter-change={handleFilterChange}
		on:view-mode-change={handleViewModeChange}
		on:schedule-calibration={handleScheduleCalibration}
		on:clear-selection={handleClearSelection}
	/>

	<!-- Dynamic View Component -->
	{#if viewMode === 'table'}
		<TruckStatusTable 
			trucks={finalTrucks}
			selectedTrucks={selectedTrucks}
			sorting={sorting}
			on:sort-change={handleSortChange}
			on:toggle-selection={handleToggleSelection}
			on:select-all-visible={handleSelectAllVisible}
			on:schedule-calibration={handleScheduleCalibration}
			on:view-details={handleViewDetails}
		/>
	{:else if viewMode === 'grid'}
		<TruckStatusGrid 
			trucks={finalTrucks}
			selectedTrucks={selectedTrucks}
			on:toggle-selection={handleToggleSelection}
			on:schedule-calibration={handleScheduleCalibration}
		/>
	{/if}
</div>

<style>
	.truck-status-container {
		background: rgba(15, 23, 42, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
	}
</style> 