<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 796-line component → @current-size: ~100 lines  
@phase: Phase 2 - High Priority Components
@extractors: TruckStatusGrid from TruckStatusDisplay.svelte
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { 
		formatDaysAgo, 
		formatDelta, 
		getCalibrationPercentage,
		getStatusIcon,
		getPercentageColor
	} from './utils/truck-status-utils.js';
	import type { TruckMetrics } from './types/truck-status.types.js';
	
	const dispatch = createEventDispatcher();
	
	// Props
	export let trucks: TruckMetrics[];
	export let selectedTrucks: string[];
	
	function toggleTruckSelection(truckId: string) {
		dispatch('toggle-selection', { truckId });
	}
	
	function scheduleCalibration(truckIds: string[]) {
		dispatch('schedule-calibration', { truckIds });
	}
</script>

<!-- Grid View -->
<div class="grid-container">
	{#each trucks as truck (truck.id)}
		{@const calibrationPercent = getCalibrationPercentage(truck)}
		<div 
			class="truck-card"
			class:selected={selectedTrucks.includes(truck.id)}
			class:good={truck.status === 'good'}
			class:warning={truck.status === 'warning'}
			class:critical={truck.status === 'critical'}
			on:click={() => toggleTruckSelection(truck.id)}
		>
			<div class="card-header">
				<div class="truck-id-card">{truck.id}</div>
				<div class="status-badge" class:good={truck.status === 'good'} class:warning={truck.status === 'warning'} class:critical={truck.status === 'critical'}>
					{getStatusIcon(truck.status)}
				</div>
			</div>
			
			<div class="card-metrics">
				<div class="metric">
					<span class="metric-label">Last Cal</span>
					<span class="metric-value">{formatDaysAgo(truck.lastCalibrated)}</span>
				</div>
				<div class="metric">
					<span class="metric-label">Delta</span>
					<span class="metric-value" class:positive={truck.avgLoadDelta > 0} class:negative={truck.avgLoadDelta < 0}>
						{formatDelta(truck.avgLoadDelta)}
					</span>
				</div>
				<div class="metric">
					<span class="metric-label">Cal %</span>
					<span class="metric-value {getPercentageColor(calibrationPercent)}">
						{calibrationPercent.toFixed(1)}%
					</span>
				</div>
				<div class="metric">
					<span class="metric-label">Loads</span>
					<span class="metric-value">{truck.totalLoads}</span>
				</div>
			</div>
			
			{#if truck.status !== 'good'}
				<div class="card-actions">
					<button class="action-btn small secondary" on:click|stopPropagation={() => scheduleCalibration([truck.id])}>
						Schedule Cal
					</button>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	/* Grid Styles */
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 16px;
		padding: 20px;
		max-height: 600px;
		overflow-y: auto;
		background: #0f172a;
	}

	.truck-card {
		background: #1e293b;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 16px;
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
	}

	.truck-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		background: #334155;
	}

	.truck-card.selected {
		border-color: #3b82f6;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
	}

	.truck-card.good {
		border-left: 4px solid #22c55e;
	}

	.truck-card.warning {
		border-left: 4px solid #f59e0b;
	}

	.truck-card.critical {
		border-left: 4px solid #ef4444;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.truck-id-card {
		font-size: 16px;
		font-weight: 700;
		font-family: 'JetBrains Mono', monospace;
		color: #e2e8f0;
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

	.card-metrics {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
		margin-bottom: 12px;
	}

	.metric {
		text-align: center;
	}

	.metric-label {
		display: block;
		font-size: 11px;
		color: #94a3b8;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 4px;
	}

	.metric-value {
		display: block;
		font-size: 13px;
		font-weight: 600;
		color: #e2e8f0;
		font-family: 'JetBrains Mono', monospace;
	}

	.metric-value.positive {
		color: #ef4444;
	}

	.metric-value.negative {
		color: #3b82f6;
	}

	.card-actions {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: 12px;
		margin-top: 12px;
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
		width: 100%;
		justify-content: center;
	}

	.action-btn.small {
		padding: 6px 12px;
		font-size: 12px;
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
		.grid-container {
			grid-template-columns: 1fr;
		}

		.card-metrics {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style> 