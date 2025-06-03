<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 859 lines → @current-size: ~180 lines  
@phase: Phase 2 - High Priority Components
@extractors: CalibrationOverview, CalibrationActivityPanel, calibration-utils.ts, calibration.types.ts
-->
<script lang="ts">
	import { Info } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fleetStats, calibrationConfig } from '$lib/stores/calibrationData';
	import TruckStatusDisplay from './TruckStatusDisplay.svelte';
	import OptimizationPanel from './OptimizationPanel.svelte';
	import CalibrationOverview from './smart-calibration/CalibrationOverview.svelte';
	import CalibrationActivityPanel from './smart-calibration/CalibrationActivityPanel.svelte';
	import { 
		calculateStatusDistribution,
		calculateConfidenceScore,
		formatConfidenceScore
	} from './smart-calibration/utils/calibration-utils.js';
	import type { CalibrationViewMode } from './smart-calibration/types/calibration.types.js';

	const dispatch = createEventDispatcher();

	// View state
	let viewMode: CalibrationViewMode = {
		selected: 'overview',
		truckView: 'table',
		filterStatus: 'all',
		activeTab: 'overview'
	};

	// Status distribution for overview
	$: statusDistribution = calculateStatusDistribution($fleetStats);
	$: confidenceScore = calculateConfidenceScore($fleetStats);

	function handleScheduleCalibration(event: CustomEvent) {
		const { truckIds } = event.detail;
		console.log('Scheduling calibration for trucks:', truckIds);
		dispatch('schedule-calibration', { truckIds });
	}

	function handleViewTruckDetails(event: CustomEvent) {
		const { truck } = event.detail;
		console.log('Viewing details for truck:', truck.id);
		dispatch('view-truck-details', { truck });
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
	<!-- Header Section -->
	<div class="recommender-header">
		<div class="header-content">
			<div class="title-section">
				<h1 class="main-title">Coriolis Calibration Status</h1>
				<p class="subtitle">AI-powered fleet monitoring • Data-driven calibration recommendations</p>
			</div>
			
			<div class="header-stats">
				<div class="stat-item">
					<span class="stat-value">{$fleetStats.total}</span>
					<span class="stat-label">Total Trucks</span>
				</div>
				<div class="stat-item">
					<span class="stat-value">{$fleetStats.calibrationsAvoided}</span>
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
				on:click={() => viewMode.selected = 'overview'}
			>
				📊 Overview
			</button>
			<button 
				class="nav-tab" 
				class:active={viewMode.selected === 'fleet'}
				on:click={() => viewMode.selected = 'fleet'}
			>
				🚛 Fleet Status
			</button>
			<button 
				class="nav-tab" 
				class:active={viewMode.selected === 'optimization'}
				on:click={() => viewMode.selected = 'optimization'}
			>
				🧠 Optimization
			</button>
		</div>
	</div>

	<!-- Main Content -->
	<div class="content-area">
		{#if viewMode.selected === 'overview'}
			<div class="overview-layout">
				<!-- Calibration Overview Component -->
				<CalibrationOverview fleetStats={$fleetStats} />

				<!-- Calibration Activity Panel Component -->
				<CalibrationActivityPanel 
					fleetStats={$fleetStats}
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

	<!-- Footer -->
	<div class="recommender-footer">
		<div class="footer-content">
			<div class="tech-info">
				<span class="tech-label">ML Engine:</span>
				<span>Coriolis Predictive Analytics v2.1</span>
			</div>
			
			<div class="confidence-score">
				<span class="confidence-label">Model Confidence:</span>
				<div class="confidence-bar">
					<div class="confidence-fill" style="width: {confidenceScore * 100}%"></div>
				</div>
				<span class="confidence-value">{formatConfidenceScore(confidenceScore)}</span>
			</div>
		</div>
	</div>
</div>

<style>
	.recommender-container {
		width: 100%;
		min-height: 100vh;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
		color: #e2e8f0;
		font-family: system-ui, -apple-system, sans-serif;
	}

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

	.recommender-footer {
		background: rgba(15, 23, 42, 0.95);
		backdrop-filter: blur(20px);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: 16px 24px;
		margin-top: 24px;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1400px;
		margin: 0 auto;
	}

	.tech-info {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #e2e8f0;
		font-size: 13px;
	}

	.tech-label {
		font-weight: 600;
	}

	.confidence-score {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #e2e8f0;
		font-size: 13px;
	}

	.confidence-label {
		font-weight: 500;
	}

	.confidence-bar {
		width: 100px;
		height: 6px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 3px;
		overflow: hidden;
	}

	.confidence-fill {
		height: 100%;
		background: linear-gradient(90deg, #22c55e, #16a34a);
		transition: width 0.3s ease;
	}

	.confidence-value {
		font-weight: 600;
		font-family: 'JetBrains Mono', monospace;
	}

	/* Mobile responsive */
	@media (max-width: 1024px) {
		.overview-layout {
			grid-template-columns: 1fr;
		}
	}

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

		.footer-content {
			flex-direction: column;
			gap: 12px;
			text-align: center;
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