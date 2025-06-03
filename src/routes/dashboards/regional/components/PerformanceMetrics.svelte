<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 1056-line component → @current-size: ~180 lines  
@phase: Phase 1 - Critical Components
@extractors: PerformanceMetrics from regional/+page.svelte
-->
<script lang="ts">
	import MetricCard from '$lib/components/ui/MetricCard.svelte';
	import { getStatusColor } from '../utils/regional-utils.js';
	import type { RegionalPerformance } from '../types/regional.types.js';
	
	// Props
	export let currentRegionData: RegionalPerformance;
	export let activeRegion: string;
	export let onYardComparison: (regionName: string) => void;
</script>

<!-- Regional Overview Cards -->
<div class="overview-metrics">
	<MetricCard 
		title="Regional Fleet" 
		value={currentRegionData.fleetSize.toString()} 
		unit="trucks" 
		status="normal"
		trend={currentRegionData.trend}
		trendValue={currentRegionData.trend === 'up' ? '+8' : currentRegionData.trend === 'down' ? '-3' : '0'}
		color="blue"
	/>
	<MetricCard 
		title="Active Trucks" 
		value={currentRegionData.activeTrucks.toString()} 
		unit="operating" 
		status="normal"
		trend={currentRegionData.trend}
		trendValue={`${Math.round(currentRegionData.utilization)}% util`}
		color="emerald"
	/>
	<MetricCard 
		title="Drivers Assigned" 
		value={currentRegionData.driversAssigned.toString()} 
		unit="certified" 
		status="normal"
		trend="stable"
		trendValue="full staffed"
		color="purple"
	/>
	<MetricCard 
		title="Regional Efficiency" 
		value={currentRegionData.efficiency.toString()} 
		unit="%" 
		status="normal"
		trend={currentRegionData.trend}
		trendValue={currentRegionData.trend === 'up' ? '+2.1%' : currentRegionData.trend === 'down' ? '-1.5%' : '0%'}
		color="orange"
	/>
</div>

<!-- Regional Performance Section -->
<div class="content-section regional-performance-section">
	<div class="section-header">
		<h2 class="text-xl font-semibold text-slate-800">{activeRegion} Performance Overview</h2>
		<p class="text-slate-600">Detailed operational metrics for regional comparison</p>
	</div>
	
	<!-- Performance Cards -->
	<div class="performance-cards">
		<div class="perf-card clickable" on:click={() => onYardComparison(activeRegion)}>
			<div class="perf-header">
				<div class="perf-status {getStatusColor(currentRegionData.status)}">
					{currentRegionData.status.toUpperCase()}
				</div>
			</div>
			<h3 class="text-base font-semibold text-slate-800">Total BPD</h3>
			<div class="perf-value text-2xl font-bold text-slate-800">{currentRegionData.totalBPD.toLocaleString()}</div>
			<div class="click-hint text-xs text-slate-500">Click to compare yards</div>
		</div>

		<div class="perf-card clickable" on:click={() => onYardComparison(activeRegion)}>
			<div class="perf-header">
				<div class="perf-status bg-slate-500">OPTIMIZED</div>
			</div>
			<h3 class="text-base font-semibold text-slate-800">Avg Drive Time</h3>
			<div class="perf-value text-2xl font-bold text-slate-800">{currentRegionData.avgDriveTime}h</div>
			<div class="click-hint text-xs text-slate-500">View yard breakdown</div>
		</div>

		<div class="perf-card clickable" on:click={() => onYardComparison(activeRegion)}>
			<div class="perf-header">
				<div class="perf-status bg-slate-500">TARGET</div>
			</div>
			<h3 class="text-base font-semibold text-slate-800">Units per Hour</h3>
			<div class="perf-value text-2xl font-bold text-slate-800">{currentRegionData.unitsPerHour}</div>
			<div class="click-hint text-xs text-slate-500">Analyze performance</div>
		</div>
	</div>

	<!-- Quick Regional Stats -->
	<div class="regional-stats">
		<div class="stat-item">
			<span class="stat-label text-slate-600">Fleet Utilization</span>
			<span class="stat-value font-mono font-semibold text-slate-800">{currentRegionData.utilization}%</span>
		</div>
		<div class="stat-item">
			<span class="stat-label text-slate-600">Regional Efficiency</span>
			<span class="stat-value font-mono font-semibold text-slate-800">{currentRegionData.efficiency}%</span>
		</div>
		<div class="stat-item">
			<span class="stat-label text-slate-600">Active/Total Ratio</span>
			<span class="stat-value font-mono font-semibold text-slate-800">{Math.round((currentRegionData.activeTrucks / currentRegionData.fleetSize) * 100)}%</span>
		</div>
		<div class="stat-item">
			<span class="stat-label text-slate-600">Driver Coverage</span>
			<span class="stat-value font-mono font-semibold text-slate-800">{Math.round((currentRegionData.driversAssigned / currentRegionData.fleetSize) * 100)}%</span>
		</div>
	</div>
</div>

<style>
	.overview-metrics {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		padding: 2rem 3rem;
		background: #f8fafc;
	}

	.content-section {
		padding: 2rem 3rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.section-header {
		margin-bottom: 2rem;
	}

	.regional-performance-section {
		background: #f8fafc;
		border-bottom: 1px solid #e2e8f0;
	}

	.performance-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.perf-card {
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 0.75rem;
		padding: 1.5rem;
		transition: all 0.2s;
	}

	.perf-card.clickable {
		cursor: pointer;
	}

	.perf-card.clickable:hover {
		border-color: #3b82f6;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		transform: translateY(-2px);
	}

	.perf-header {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;
	}

	.perf-status {
		padding: 0.25rem 0.75rem;
		border-radius: 0.375rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: white;
	}

	.perf-value {
		margin: 0.5rem 0;
	}

	.click-hint {
		opacity: 0;
		transition: opacity 0.2s;
	}

	.perf-card.clickable:hover .click-hint {
		opacity: 1;
	}

	.regional-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
		padding: 1.5rem;
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 0.75rem;
	}

	.stat-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 0;
	}

	.stat-label {
		font-size: 0.875rem;
	}

	.stat-value {
		font-size: 1rem;
	}
</style> 