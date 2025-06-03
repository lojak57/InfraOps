<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 796-line component → @current-size: ~150 lines  
@phase: Phase 2 - High Priority Components
@extractors: TruckStatusTable from TruckStatusDisplay.svelte
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { 
		formatDaysAgo, 
		formatDelta, 
		getCalibrationPercentage,
		getStatusIcon,
		getStatusLabel,
		getPercentageColor
	} from './utils/truck-status-utils.js';
	import type { TruckMetrics, TruckStatusSorting } from './types/truck-status.types.js';
	
	const dispatch = createEventDispatcher();
	
	// Props
	export let trucks: TruckMetrics[];
	export let selectedTrucks: string[];
	export let sorting: TruckStatusSorting;
	
	function handleSort(column: TruckStatusSorting['sortBy']) {
		if (sorting.sortBy === column) {
			const newDirection = sorting.sortDirection === 'asc' ? 'desc' : 'asc';
			dispatch('sort-change', { sortBy: column, sortDirection: newDirection });
		} else {
			dispatch('sort-change', { sortBy: column, sortDirection: 'desc' });
		}
	}
	
	function toggleTruckSelection(truckId: string) {
		dispatch('toggle-selection', { truckId });
	}
	
	function selectAllVisible() {
		dispatch('select-all-visible');
	}
	
	function scheduleCalibration(truckIds: string[]) {
		dispatch('schedule-calibration', { truckIds });
	}
	
	function viewTruckDetails(truck: TruckMetrics) {
		dispatch('view-details', { truck });
	}
</script>

<!-- Table View -->
<div class="table-container">
	<table class="trucks-table">
		<thead>
			<tr>
				<th class="checkbox-column">
					<input 
						type="checkbox" 
						on:change={selectAllVisible}
						checked={selectedTrucks.length === trucks.length && trucks.length > 0}
					/>
				</th>
				<th class="sortable" on:click={() => handleSort('id')}>
					Truck ID
					{#if sorting.sortBy === 'id'}
						<span class="sort-icon">{sorting.sortDirection === 'asc' ? '↑' : '↓'}</span>
					{/if}
				</th>
				<th class="sortable" on:click={() => handleSort('lastCalibrated')}>
					Last Calibrated
					{#if sorting.sortBy === 'lastCalibrated'}
						<span class="sort-icon">{sorting.sortDirection === 'asc' ? '↑' : '↓'}</span>
					{/if}
				</th>
				<th class="sortable" on:click={() => handleSort('avgLoadDelta')}>
					Avg Load Delta
					{#if sorting.sortBy === 'avgLoadDelta'}
						<span class="sort-icon">{sorting.sortDirection === 'asc' ? '↑' : '↓'}</span>
					{/if}
				</th>
				<th>Calibration %</th>
				<th class="sortable" on:click={() => handleSort('status')}>
					Status
					{#if sorting.sortBy === 'status'}
						<span class="sort-icon">{sorting.sortDirection === 'asc' ? '↑' : '↓'}</span>
					{/if}
				</th>
				<th>Total Loads</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each trucks as truck (truck.id)}
				{@const calibrationPercent = getCalibrationPercentage(truck)}
				<tr 
					class="truck-row"
					class:selected={selectedTrucks.includes(truck.id)}
					class:good={truck.status === 'good'}
					class:warning={truck.status === 'warning'}
					class:critical={truck.status === 'critical'}
				>
					<td class="checkbox-column">
						<input 
							type="checkbox" 
							checked={selectedTrucks.includes(truck.id)}
							on:change={() => toggleTruckSelection(truck.id)}
						/>
					</td>
					<td class="truck-id">
						<span class="id-text">{truck.id}</span>
					</td>
					<td class="last-calibrated">
						{formatDaysAgo(truck.lastCalibrated)}
					</td>
					<td class="load-delta" class:positive={truck.avgLoadDelta > 0} class:negative={truck.avgLoadDelta < 0}>
						{formatDelta(truck.avgLoadDelta)}
					</td>
					<td class="calibration-percent">
						<span class={getPercentageColor(calibrationPercent)}>
							{calibrationPercent.toFixed(1)}%
						</span>
					</td>
					<td class="status-cell">
						<div class="status-badge" class:good={truck.status === 'good'} class:warning={truck.status === 'warning'} class:critical={truck.status === 'critical'}>
							<span class="status-icon">{getStatusIcon(truck.status)}</span>
							<span class="status-text">{getStatusLabel(truck.status)}</span>
						</div>
					</td>
					<td class="total-loads">
						{truck.totalLoads.toLocaleString()}
					</td>
					<td class="actions-cell">
						<button class="action-btn small primary" on:click={() => viewTruckDetails(truck)}>
							📊 Details
						</button>
						{#if truck.status !== 'good'}
							<button class="action-btn small secondary" on:click={() => scheduleCalibration([truck.id])}>
								📅 Calibrate
							</button>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	/* Table Styles */
	.table-container {
		overflow-x: auto;
		max-height: 600px;
		overflow-y: auto;
		background: #0f172a;
	}

	.trucks-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
		background: #0f172a;
	}

	.trucks-table th {
		background: #1e293b;
		padding: 12px 8px;
		text-align: left;
		font-weight: 600;
		color: #e2e8f0;
		border-bottom: 2px solid rgba(255, 255, 255, 0.1);
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.trucks-table th.sortable {
		cursor: pointer;
		user-select: none;
		transition: background-color 0.2s ease;
	}

	.trucks-table th.sortable:hover {
		background: #334155;
	}

	.sort-icon {
		margin-left: 4px;
		color: #3b82f6;
		font-weight: bold;
	}

	.trucks-table td {
		padding: 10px 8px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		vertical-align: middle;
		color: #cbd5e1;
	}

	.truck-row {
		transition: all 0.2s ease;
		cursor: pointer;
		background: #0f172a;
	}

	.truck-row:nth-child(even) {
		background: #1e293b;
	}

	.truck-row:nth-child(odd) {
		background: #0f172a;
	}

	.truck-row:hover {
		background: #334155 !important;
	}

	.truck-row.selected {
		background: rgba(59, 130, 246, 0.1) !important;
		border-left: 3px solid #3b82f6;
	}

	.truck-row.good {
		border-left: 3px solid #22c55e;
	}

	.truck-row.warning {
		border-left: 3px solid #f59e0b;
	}

	.truck-row.critical {
		border-left: 3px solid #ef4444;
	}

	.checkbox-column {
		width: 40px;
		text-align: center;
	}

	.truck-id {
		font-weight: 600;
		font-family: 'JetBrains Mono', monospace;
		color: #e2e8f0;
	}

	.load-delta {
		font-family: 'JetBrains Mono', monospace;
		font-weight: 600;
	}

	.load-delta.positive {
		color: #ef4444;
	}

	.load-delta.negative {
		color: #3b82f6;
	}

	.calibration-percent {
		font-family: 'JetBrains Mono', monospace;
		font-weight: 600;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 8px;
		border-radius: 12px;
		font-size: 12px;
		font-weight: 500;
		background: #374151;
		color: #d1d5db;
		border: 1px solid #4b5563;
	}

	.status-badge.good {
		background: rgba(34, 197, 94, 0.1);
		color: #16a34a;
		border: 1px solid rgba(34, 197, 94, 0.2);
	}

	.status-badge.warning {
		background: rgba(245, 158, 11, 0.1);
		color: #d97706;
		border: 1px solid rgba(245, 158, 11, 0.2);
	}

	.status-badge.critical {
		background: rgba(239, 68, 68, 0.1);
		color: #dc2626;
		border: 1px solid rgba(239, 68, 68, 0.2);
	}

	.actions-cell {
		display: flex;
		gap: 4px;
	}

	.action-btn {
		padding: 4px 8px;
		border: 1px solid transparent;
		border-radius: 6px;
		font-size: 11px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}

	.action-btn.small {
		padding: 4px 8px;
		font-size: 11px;
	}

	.action-btn.primary {
		background: #3b82f6;
		color: white;
		border-color: #3b82f6;
	}

	.action-btn.secondary {
		background: #f59e0b;
		color: white;
		border-color: #f59e0b;
	}

	.action-btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.table-container {
			font-size: 12px;
		}

		.trucks-table th,
		.trucks-table td {
			padding: 8px 4px;
		}
	}
</style> 