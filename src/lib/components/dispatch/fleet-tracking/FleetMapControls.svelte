<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 862-line component → @current-size: ~80 lines  
@phase: Phase 2 - High Priority Components
@extractors: FleetMapControls from FleetTrackingMap.svelte
-->
<script lang="ts">
	import { Truck, MapPin, Navigation, Maximize2 } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { getFilteredAssets } from './utils/fleet-utils.js';
	import type { FleetAsset } from './types/fleet-tracking.types.js';
	
	const dispatch = createEventDispatcher();
	
	// Props
	export let fleetAssets: FleetAsset[];
	export let trackingMode: 'all' | 'active' | 'custom';
	export let showFullscreen: boolean;
	
	// Calculate filtered counts
	$: activeAssets = getFilteredAssets(fleetAssets, 'active');
	
	function handleTrackingModeChange(mode: 'all' | 'active' | 'custom') {
		dispatch('tracking-mode-change', { mode });
	}
	
	function handleRecenterMap() {
		dispatch('recenter-map');
	}
	
	function handleToggleFullscreen() {
		dispatch('toggle-fullscreen');
	}
</script>

<!-- Map Controls -->
<div class="map-controls">
	<div class="control-group">
		<button 
			class="control-btn" 
			class:active={trackingMode === 'active'}
			on:click={() => handleTrackingModeChange('active')}
			title="Track Active Assets"
		>
			<Truck size={16} />
			Active ({activeAssets.length})
		</button>
		<button 
			class="control-btn" 
			class:active={trackingMode === 'all'}
			on:click={() => handleTrackingModeChange('all')}
			title="Track All Assets"
		>
			<MapPin size={16} />
			All ({fleetAssets.length})
		</button>
	</div>
	
	<div class="control-group">
		<button class="control-btn" on:click={handleRecenterMap} title="Recenter Map">
			<Navigation size={16} />
		</button>
		<button class="control-btn" on:click={handleToggleFullscreen} title="Toggle Fullscreen">
			<Maximize2 size={16} />
		</button>
	</div>
</div>

<style>
	.map-controls {
		position: absolute;
		top: 16px;
		left: 16px;
		z-index: 1000;
		display: flex;
		gap: 12px;
		background: rgba(15, 23, 42, 0.9);
		backdrop-filter: blur(8px);
		padding: 8px;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.control-group {
		display: flex;
		gap: 4px;
	}

	.control-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 12px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		color: #e2e8f0;
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.control-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateY(-1px);
	}

	.control-btn.active {
		background: rgba(59, 130, 246, 0.8);
		border-color: rgba(59, 130, 246, 1);
		color: white;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.map-controls {
			flex-direction: column;
			align-items: stretch;
		}

		.control-group {
			flex-direction: column;
		}
	}
</style> 