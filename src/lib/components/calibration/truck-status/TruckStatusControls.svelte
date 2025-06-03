<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 796-line component → @current-size: ~120 lines  
@phase: Phase 2 - High Priority Components
@extractors: TruckStatusControls from TruckStatusDisplay.svelte
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { TruckStatusFilters, TruckStatusViewMode } from './types/truck-status.types.js';
	
	const dispatch = createEventDispatcher();
	
	// Props
	export let filters: TruckStatusFilters;
	export let viewMode: 'table' | 'grid';
	export let selectedTrucks: string[];
	export let totalTrucks: number;
	export let filteredCount: number;
	
	function handleSearchChange(event: Event) {
		const target = event.target as HTMLInputElement;
		filters.searchTerm = target.value;
		dispatch('filter-change', { filters });
	}
	
	function handleStatusFilterChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		filters.filterStatus = target.value as TruckStatusFilters['filterStatus'];
		dispatch('filter-change', { filters });
	}
	
	function handleViewModeChange(newViewMode: 'table' | 'grid') {
		dispatch('view-mode-change', { viewMode: newViewMode });
	}
	
	function handleScheduleCalibration() {
		dispatch('schedule-calibration', { truckIds: selectedTrucks });
	}
	
	function handleClearSelection() {
		dispatch('clear-selection');
	}
</script>

<!-- Controls Section -->
<div class="controls-section">
	<div class="search-filters">
		<input
			type="text"
			placeholder="Search truck ID..."
			value={filters.searchTerm}
			on:input={handleSearchChange}
			class="search-input"
		/>
		
		<select value={filters.filterStatus} on:change={handleStatusFilterChange} class="filter-select">
			<option value="all">All Status</option>
			<option value="good">✅ Good</option>
			<option value="warning">⚠️ Needs Cal</option>
			<option value="critical">🔴 Critical</option>
		</select>
		
		<div class="view-toggle">
			<button 
				class="view-btn"
				class:active={viewMode === 'table'}
				on:click={() => handleViewModeChange('table')}
			>
				📋 Table
			</button>
			<button 
				class="view-btn"
				class:active={viewMode === 'grid'}
				on:click={() => handleViewModeChange('grid')}
			>
				🔲 Grid
			</button>
		</div>
	</div>
	
	<div class="results-info">
		<span class="results-count">
			{filteredCount} of {totalTrucks} trucks
		</span>
		
		{#if selectedTrucks.length > 0}
			<div class="selection-actions">
				<span class="selection-count">{selectedTrucks.length} selected</span>
				<button class="action-btn schedule" on:click={handleScheduleCalibration}>
					📅 Schedule Calibration
				</button>
				<button class="action-btn clear" on:click={handleClearSelection}>Clear</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.controls-section {
		background: linear-gradient(135deg, #1e293b, #334155);
		padding: 20px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 16px;
	}

	.search-filters {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.search-input {
		padding: 8px 12px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(30, 41, 59, 0.8);
		color: #e2e8f0;
		border-radius: 6px;
		font-size: 14px;
		min-width: 200px;
		transition: all 0.2s ease;
	}

	.search-input::placeholder {
		color: #94a3b8;
	}

	.search-input:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
	}

	.filter-select {
		padding: 8px 12px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(30, 41, 59, 0.8);
		color: #e2e8f0;
		border-radius: 6px;
		font-size: 14px;
		cursor: pointer;
	}

	.filter-select option {
		background: #1e293b;
		color: #e2e8f0;
	}

	.view-toggle {
		display: flex;
		background: rgba(30, 41, 59, 0.8);
		border-radius: 6px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.view-btn {
		padding: 8px 12px;
		background: transparent;
		border: none;
		color: #94a3b8;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 12px;
	}

	.view-btn:hover {
		background: rgba(51, 65, 85, 0.5);
		color: #e2e8f0;
	}

	.view-btn.active {
		background: #3b82f6;
		color: white;
	}

	.results-info {
		display: flex;
		align-items: center;
		gap: 16px;
		color: #e2e8f0;
	}

	.results-count {
		font-size: 14px;
		color: #94a3b8;
	}

	.selection-actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.selection-count {
		font-size: 14px;
		font-weight: 500;
		color: #3b82f6;
	}

	.action-btn {
		padding: 6px 12px;
		border: 1px solid transparent;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}

	.action-btn.schedule {
		background: #059669;
		color: white;
		border-color: #059669;
	}

	.action-btn.clear {
		background: #6b7280;
		color: white;
		border-color: #6b7280;
	}

	.action-btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.controls-section {
			flex-direction: column;
			align-items: stretch;
		}

		.search-filters {
			flex-direction: column;
		}

		.search-input {
			min-width: auto;
			width: 100%;
		}

		.results-info {
			justify-content: space-between;
		}
	}
</style> 