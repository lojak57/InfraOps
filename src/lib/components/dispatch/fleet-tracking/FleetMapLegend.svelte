<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 862-line component → @current-size: ~50 lines  
@phase: Phase 2 - High Priority Components
@extractors: FleetMapLegend from FleetTrackingMap.svelte
-->
<script lang="ts">
	import { getStatusColor } from './utils/fleet-utils.js';
	
	// Legend configuration
	const legendItems = [
		{ status: 'transit', label: 'Transit' },
		{ status: 'loading', label: 'Loading' },
		{ status: 'delivery', label: 'Delivery' },
		{ status: 'available', label: 'Available' },
		{ status: 'maintenance', label: 'Maintenance' }
	];
</script>

<!-- Fleet Status Legend -->
<div class="map-legend">
	{#each legendItems as item}
		<div class="legend-item">
			<span class="legend-dot" style="background-color: {getStatusColor(item.status)}"></span>
			<span class="legend-label">{item.label}</span>
		</div>
	{/each}
</div>

<style>
	.map-legend {
		position: absolute;
		top: 16px;
		right: 16px;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		gap: 8px;
		background: rgba(15, 23, 42, 0.9);
		backdrop-filter: blur(8px);
		padding: 12px;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.legend-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.3);
	}

	.legend-label {
		font-size: 12px;
		color: #e2e8f0;
		font-weight: 500;
		white-space: nowrap;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.map-legend {
			position: static;
			margin: 8px;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
		}
	}
</style> 