<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import CalibrationOverview from './CalibrationOverview.svelte';
	import CalibrationActivityPanel from './CalibrationActivityPanel.svelte';
	import TruckStatusDisplay from '../TruckStatusDisplay.svelte';
	import OptimizationPanel from '../OptimizationPanel.svelte';
	import type { CalibrationViewMode } from './types/calibration.types.js';

	const dispatch = createEventDispatcher();

	export let viewMode: CalibrationViewMode;
	export let fleetStats: any;

	function handleScheduleCalibration(event: CustomEvent) {
		dispatch('schedule-calibration', event.detail);
	}

	function handleViewTruckDetails(event: CustomEvent) {
		dispatch('view-truck-details', event.detail);
	}

	function handleViewChange(event: CustomEvent) {
		dispatch('view-change', event.detail);
	}

	function handleFilterChange(event: CustomEvent) {
		dispatch('filter-change', event.detail);
	}

	function handleTabChange(event: CustomEvent) {
		dispatch('tab-change', event.detail);
	}
</script>

<div class="content-area">
	{#if viewMode.selected === 'overview'}
		<div class="overview-layout">
			<!-- Calibration Overview Component -->
			<CalibrationOverview {fleetStats} />

			<!-- Calibration Activity Panel Component -->
			<CalibrationActivityPanel 
				{fleetStats}
				activeTab={viewMode.activeTab}
				on:view-change={handleViewChange}
				on:filter-change={handleFilterChange}
				on:tab-change={handleTabChange}
			/>
		</div>
	{:else if viewMode.selected === 'fleet'}
		<div class="fleet-layout">
			<TruckStatusDisplay 
				viewMode={viewMode.truckView}
				filterStatus={viewMode.filterStatus}
				on:schedule-calibration={handleScheduleCalibration}
				on:view-truck-details={handleViewTruckDetails}
			/>
		</div>
	{:else if viewMode.selected === 'optimization'}
		<div class="optimization-layout">
			<OptimizationPanel />
		</div>
	{/if}
</div>

<style>
	.content-area {
		max-width: 1400px;
		margin: 0 auto;
		padding: 24px;
	}

	.overview-layout {
		display: grid;
		grid-template-columns: 480px 1fr;
		gap: 24px;
	}

	.fleet-layout,
	.optimization-layout {
		width: 100%;
	}

	/* Mobile responsive */
	@media (max-width: 1024px) {
		.overview-layout {
			grid-template-columns: 1fr;
		}
	}
</style> 