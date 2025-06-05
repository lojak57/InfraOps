<script lang="ts">
	import { Info } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { CalibrationViewMode } from './types/calibration.types.js';
	import { 
		calculateStatusDistribution,
		formatConfidenceScore
	} from './utils/calibration-utils.js';

	const dispatch = createEventDispatcher();

	export let fleetStats: any;
	export let viewMode: CalibrationViewMode;

	// Status distribution for overview
	$: statusDistribution = calculateStatusDistribution(fleetStats);

	function handleViewChange(view: 'overview' | 'fleet' | 'optimization') {
		viewMode.selected = view;
		dispatch('view-change', { view });
	}
</script>

<div class="recommender-header">
	<div class="header-content">
		<div class="title-section">
			<h1 class="main-title">Coriolis Calibration Status</h1>
			<p class="subtitle">AI-powered fleet monitoring • Data-driven calibration recommendations</p>
		</div>
		
		<div class="header-stats">
			<div class="stat-item">
				<span class="stat-value">{fleetStats.total}</span>
				<span class="stat-label">Total Trucks</span>
			</div>
			<div class="stat-item">
				<span class="stat-value">{fleetStats.calibrationsAvoided}</span>
				<span class="stat-label">Calibrations Skipped This Month</span>
				<div class="tooltip-container">
					<Info size={14} class="info-icon" />
					<div class="tooltip">Scheduled calibrations that were bypassed or postponed</div>
				</div>
			</div>
			<div class="stat-item">
				<span class="stat-value">{statusDistribution.good.toFixed(0)}%</span>
				<span class="stat-label">
					Fleet Health
					<div class="tooltip-container">
						<Info size={14} class="info-icon" />
						<div class="tooltip">Fleet Health is calculated using calibration consistency, calibration recency, and load deviation thresholds.</div>
					</div>
				</span>
			</div>
		</div>
	</div>

	<!-- Navigation Tabs -->
	<div class="nav-tabs">
		<button 
			class="nav-tab" 
			class:active={viewMode.selected === 'overview'}
			on:click={() => handleViewChange('overview')}
		>
			📊 Overview
		</button>
		<button 
			class="nav-tab" 
			class:active={viewMode.selected === 'fleet'}
			on:click={() => handleViewChange('fleet')}
		>
			🚛 Fleet Status
		</button>
		<button 
			class="nav-tab" 
			class:active={viewMode.selected === 'optimization'}
			on:click={() => handleViewChange('optimization')}
		>
			🧠 Optimization
		</button>
	</div>
</div>

<style>
	.recommender-header {
		background: rgba(15, 23, 42, 0.95);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1400px;
		margin: 0 auto;
		padding: 16px 24px;
	}

	.title-section {
		flex: 1;
	}

	.main-title {
		font-size: 28px;
		font-weight: 700;
		color: #e2e8f0;
		margin: 0 0 4px 0;
		background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.subtitle {
		font-size: 14px;
		color: #94a3b8;
		margin: 0;
		font-weight: 400;
	}

	.header-stats {
		display: flex;
		gap: 32px;
		align-items: center;
	}

	.stat-item {
		text-align: center;
		position: relative;
	}

	.stat-value {
		display: block;
		font-size: 20px;
		font-weight: 700;
		color: #e2e8f0;
		font-family: 'JetBrains Mono', monospace;
	}

	.stat-label {
		display: block;
		font-size: 11px;
		color: #94a3b8;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-top: 2px;
	}

	.tooltip-container {
		position: relative;
		display: inline-block;
	}

	.info-icon {
		color: #64748b;
		cursor: pointer;
	}

	.info-icon:hover {
		color: #94a3b8;
	}

	.tooltip {
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(15, 23, 42, 0.95);
		color: #e2e8f0;
		padding: 8px 12px;
		border-radius: 6px;
		font-size: 12px;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s;
		border: 1px solid rgba(255, 255, 255, 0.1);
		z-index: 1000;
		margin-bottom: 8px;
	}

	.tooltip-container:hover .tooltip {
		opacity: 1;
	}

	.nav-tabs {
		display: flex;
		gap: 4px;
		max-width: 1400px;
		margin: 0 auto;
	}

	.nav-tab {
		padding: 12px 20px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(30, 41, 59, 0.8);
		color: #94a3b8;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		border-radius: 8px 8px 0 0;
		font-size: 14px;
	}

	.nav-tab:hover {
		background: rgba(51, 65, 85, 0.9);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.nav-tab.active {
		background: rgba(51, 65, 85, 0.95);
		color: #e2e8f0;
		border-bottom-color: rgba(51, 65, 85, 0.95);
		box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.header-content {
			flex-direction: column;
			gap: 16px;
			align-items: flex-start;
		}

		.header-stats {
			align-self: stretch;
			justify-content: space-between;
			flex-wrap: wrap;
		}

		.nav-tabs {
			flex-direction: column;
		}
	}

	@media (max-width: 480px) {
		.main-title {
			font-size: 24px;
		}

		.header-stats {
			flex-direction: column;
			gap: 8px;
		}
	}
</style> 