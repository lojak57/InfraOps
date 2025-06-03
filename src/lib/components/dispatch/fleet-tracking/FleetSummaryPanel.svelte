<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 862-line component → @current-size: ~60 lines  
@phase: Phase 2 - High Priority Components
@extractors: FleetSummaryPanel from FleetTrackingMap.svelte
-->
<script lang="ts">
	import { calculateFleetStats } from './utils/fleet-utils.js';
	import type { FleetAsset } from './types/fleet-tracking.types.js';
	
	// Props
	export let fleetAssets: FleetAsset[];
	export let autoUpdate: boolean;
	
	// Calculate stats
	$: stats = calculateFleetStats(fleetAssets);
</script>

<!-- Fleet Summary -->
<div class="fleet-summary">
	<div class="summary-stats">
		<div class="stat-item">
			<span class="stat-value">{stats.transit}</span>
			<span class="stat-label">En Route</span>
		</div>
		<div class="stat-item">
			<span class="stat-value">{stats.loading}</span>
			<span class="stat-label">Loading</span>
		</div>
		<div class="stat-item">
			<span class="stat-value">{stats.delivery}</span>
			<span class="stat-label">Delivery</span>
		</div>
	</div>
	<div class="update-indicator">
		<span class="update-dot" class:active={autoUpdate}></span>
		<span class="update-label">Live Tracking</span>
	</div>
</div>

<style>
	.fleet-summary {
		position: absolute;
		bottom: 16px;
		left: 16px;
		right: 16px;
		z-index: 1000;
		background: rgba(15, 23, 42, 0.9);
		backdrop-filter: blur(8px);
		border-radius: 8px;
		padding: 12px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.summary-stats {
		display: flex;
		gap: 24px;
	}

	.stat-item {
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 18px;
		font-weight: 700;
		color: #e2e8f0;
		font-family: 'JetBrains Mono', monospace;
	}

	.stat-label {
		display: block;
		font-size: 10px;
		color: #94a3b8;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-top: 2px;
	}

	.update-indicator {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.update-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #6b7280;
		transition: all 0.3s ease;
	}

	.update-dot.active {
		background: #10b981;
		animation: pulse 2s infinite;
	}

	.update-label {
		font-size: 11px;
		color: #94a3b8;
		font-weight: 500;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.fleet-summary {
			flex-direction: column;
			gap: 12px;
			align-items: stretch;
		}

		.summary-stats {
			justify-content: space-around;
		}
	}
</style> 