<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 1056 lines → @current-size: ~140 lines  
@phase: Phase 1 - Critical Components
@extractors: PerformanceMetrics, YardComparisonChart, RegionalFilters, regional-utils.ts, regional.types.ts
-->
<script lang="ts">
	import PerformanceMetrics from './components/PerformanceMetrics.svelte';
	import RegionalYardComparison from '$lib/components/regional/RegionalYardComparison.svelte';
	import { activeRegion, showYardComparison, regionalDataStore, selectedRegion } from './stores/regional.store.js';
	import { getPerformanceBarColor, needsAttention } from './utils/regional-utils.js';
	import type { RegionalData } from './types/regional.types.js';

	// Track which regional dashboard view to show
	let showComparison = false;

	// Subscribe to store updates
	$: currentRegionData = $regionalDataStore[$selectedRegion] || Object.values($regionalDataStore)[0];

	// Event handler for yard comparison
	function handleYardComparison(regionName: string) {
		showComparison = true;
		$showYardComparison = true;
	}

	function handleBackToDashboard() {
		showComparison = false;
		$showYardComparison = false;
	}
</script>

<svelte:head>
	<title>Regional Dashboard - Fleet Analytics</title>
</svelte:head>

{#if showComparison}
	<!-- Yard Comparison Component -->
	<RegionalYardComparison on:back-to-dashboard={handleBackToDashboard} />
{:else}
	<!-- Main Regional Dashboard -->
	<div class="regional-dashboard">
		<!-- Header -->
		<div class="dashboard-header">
			<h1 class="dashboard-title">Regional Operations Dashboard</h1>
			<p class="dashboard-subtitle">Real-time fleet performance across regional hubs</p>
		</div>

		<!-- Region Selector -->
		<div class="region-selector">
			{#each Object.values($regionalDataStore) as region}
				<button 
					class="region-btn {$selectedRegion === region.id ? 'active' : ''}"
					on:click={() => $selectedRegion = region.id}
				>
					{region.name}
				</button>
			{/each}
		</div>

		<!-- Performance Overview -->
		<div class="performance-section">
			<div class="section-header">
				<h2>Performance Overview - {currentRegionData.name}</h2>
				<div class="quick-stats">
					<span class="text-slate-600">Total Trucks:</span>
					<span class="metric-value font-mono font-semibold text-slate-800">{currentRegionData.totalTrucks}</span>
					<span class="text-slate-600">Daily Units:</span>
					<span class="metric-value font-mono font-semibold text-slate-800">{currentRegionData.dailyUnits.toLocaleString()}</span>
				</div>
			</div>

			<!-- Performance Metrics Component -->
			<PerformanceMetrics {currentRegionData} />
		</div>

		<!-- Comparative Performance Charts -->
		<div class="charts-section">
			<div class="section-header">
				<h2>Regional Comparison</h2>
				<p class="text-slate-600">Performance metrics across all regional hubs</p>
			</div>

			<!-- Efficiency Comparison -->
			<div class="chart-container">
				<h3 class="text-base font-semibold text-slate-800">Efficiency Comparison</h3>
				{#each Object.values($regionalDataStore) as data}
					{@const maxEfficiency = Math.max(...Object.values($regionalDataStore).map(d => d.efficiency))}
					{@const percentage = (data.efficiency / maxEfficiency) * 100}
					<div class="chart-bar">
						<span class="chart-label">{data.name}</span>
						<div class="chart-bar-container">
							<div 
								class="chart-bar-fill" 
								style="width: {percentage}%; background: {getPerformanceBarColor(data.efficiency, 'efficiency')};"
							>
								<span class="chart-value-inside">{data.efficiency}%</span>
							</div>
							{#if needsAttention(data.efficiency, 'efficiency')}
								<span class="attention-icon">⚠️</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<!-- Daily Units Production Comparison -->
			<div class="chart-container">
				<h3 class="text-base font-semibold text-slate-800">Daily Units Production</h3>
				{#each Object.values($regionalDataStore) as data}
					{@const maxDailyUnits = Math.max(...Object.values($regionalDataStore).map(d => d.dailyUnits))}
					{@const percentage = (data.dailyUnits / maxDailyUnits) * 100}
					<div class="chart-bar">
						<span class="chart-label">{data.name}</span>
						<div class="chart-bar-container">
							<div 
								class="chart-bar-fill" 
								style="width: {percentage}%; background: {getPerformanceBarColor(data.dailyUnits, 'dailyUnits')};"
							>
								<span class="chart-value-inside">{data.dailyUnits.toLocaleString()}</span>
							</div>
							{#if needsAttention(data.dailyUnits, 'dailyUnits')}
								<span class="attention-icon">⚠️</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Quick Actions -->
		<div class="actions-section">
			<button class="action-btn primary" on:click={() => handleYardComparison('current')}>
				📊 View Yard Comparison
			</button>
			<button class="action-btn secondary">
				📈 Generate Report
			</button>
			<button class="action-btn secondary">
				⚙️ Configure Alerts
			</button>
		</div>
	</div>
{/if}

<style>
	.regional-dashboard {
		min-height: 100vh;
		background: #f8fafc;
		padding: 2rem;
	}

	.dashboard-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.dashboard-title {
		font-size: 2.5rem;
		font-weight: 700;
		color: #1e293b;
		margin-bottom: 0.5rem;
	}

	.dashboard-subtitle {
		color: #64748b;
		font-size: 1.1rem;
	}

	.region-selector {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.region-btn {
		padding: 0.75rem 1.5rem;
		border: 1px solid #e2e8f0;
		background: white;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s;
		font-weight: 500;
	}

	.region-btn.active {
		background: #3b82f6;
		color: white;
		border-color: #3b82f6;
	}

	.region-btn:hover:not(.active) {
		border-color: #3b82f6;
		background: #f1f5f9;
	}

	.performance-section {
		margin-bottom: 3rem;
	}

	.charts-section {
		margin-bottom: 3rem;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.section-header h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1e293b;
	}

	.quick-stats {
		display: flex;
		gap: 1rem;
		align-items: center;
		font-size: 0.875rem;
	}

	.chart-container {
		background: white;
		padding: 1.5rem;
		border-radius: 0.75rem;
		border: 1px solid #e2e8f0;
		margin-bottom: 1.5rem;
	}

	.chart-bar {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.chart-label {
		min-width: 120px;
		font-size: 0.875rem;
		color: #64748b;
	}

	.chart-bar-container {
		flex: 1;
		position: relative;
		height: 2rem;
		background: #f1f5f9;
		border-radius: 0.25rem;
		overflow: hidden;
	}

	.chart-bar-fill {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 600;
		font-size: 0.75rem;
		min-width: 60px;
	}

	.actions-section {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.action-btn {
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		border: none;
	}

	.action-btn.primary {
		background: #3b82f6;
		color: white;
	}

	.action-btn.secondary {
		background: white;
		color: #64748b;
		border: 1px solid #e2e8f0;
	}

	.action-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}
</style> 