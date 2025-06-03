<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 1056 lines → @current-size: ~180 lines  
@phase: Phase 1 - Critical Components
@extractors: RegionalHeader, PerformanceMetrics, regional.store.ts, regional-utils.ts, regional.types.ts
-->
<script lang="ts">
	import RegionalHeader from './components/RegionalHeader.svelte';
	import PerformanceMetrics from './components/PerformanceMetrics.svelte';
	import RegionalYardComparison from '$lib/components/regional/RegionalYardComparison.svelte';
	import { 
		activeRegion, 
		showYardComparison, 
		selectedRegion, 
		currentRegionData,
		regionalDataStore,
		regionalActions 
	} from './stores/regional.store.js';
	import { 
		getStatusColor, 
		getPerformanceBarColor, 
		needsAttention 
	} from './utils/regional-utils.js';

	// Reactive values from stores
	$: currentData = $currentRegionData;
	$: regionalData = $regionalDataStore;

	// Event handlers
	function handleYardComparison(regionName: string) {
		regionalActions.openYardComparison(regionName);
	}

	function handleCloseYardComparison() {
		regionalActions.closeYardComparison();
	}
</script>

<div class="regional-dashboard font-sans text-sm text-slate-800">
	<!-- Header and Region Filters -->
	<RegionalHeader 
		activeRegion={$activeRegion}
		onYardComparison={handleYardComparison}
	/>

	<!-- Performance Metrics Section -->
	<PerformanceMetrics 
		currentRegionData={currentData}
		activeRegion={$activeRegion}
		onYardComparison={handleYardComparison}
	/>

	<!-- Main Content -->
	<div class="main-content">
		<!-- Regional Comparison Summary -->
		<div class="content-section">
			<h2 class="text-xl font-semibold text-slate-800 mb-6">Cross-Regional Performance</h2>
			<div class="comparison-grid">
				{#each Object.entries(regionalData) as [regionName, data]}
					<div class="region-summary-card" class:active={regionName === $activeRegion} style="--region-color: {regionalActions.getRegionColor(regionName)}">
						<div class="region-header">
							<h3 class="text-lg font-semibold text-slate-800">{regionName}</h3>
							<div class="region-status {getStatusColor(data.status)}"></div>
						</div>
						<div class="region-metrics">
							<div class="metric-row">
								<span class="text-slate-600">Fleet Size:</span>
								<span class="metric-value font-mono font-semibold text-slate-800">{data.fleetSize}</span>
							</div>
							<div class="metric-row">
								<span class="text-slate-600">Total BPD:</span>
								<span class="metric-value font-mono font-semibold text-slate-800">{data.totalBPD.toLocaleString()}</span>
							</div>
							<div class="metric-row">
								<span class="text-slate-600">Efficiency:</span>
								<span class="metric-value font-mono font-semibold {data.efficiency >= 93 ? 'text-green-600' : data.efficiency >= 90 ? 'text-slate-800' : 'text-red-600'}">{data.efficiency}%</span>
							</div>
						</div>
						<button 
							class="compare-btn border border-slate-400 text-slate-700 bg-transparent hover:bg-slate-100 px-4 py-2 rounded text-sm font-medium transition-colors"
							on:click={() => handleYardComparison(regionName)}
						>
							Compare Yards →
						</button>
					</div>
				{/each}
			</div>
		</div>

		<!-- Visual Comparison Charts -->
		<div class="content-section">
			<div class="section-header">
				<h2 class="text-xl font-semibold text-slate-800">Regional Performance Comparison Charts</h2>
				<p class="text-slate-600">Visual analysis of key operational metrics across all regions</p>
			</div>
			
			<div class="charts-grid chart-card-container">
				<!-- Fleet Size Comparison -->
				<div class="chart-card">
					<div class="chart-header">
						<h3 class="text-base font-semibold text-slate-800">Fleet Size Distribution</h3>
						<span class="chart-subtitle text-sm text-slate-600">Total trucks by region</span>
					</div>
					<div class="chart-content">
						<div class="bar-chart">
							{#each Object.entries(regionalData) as [regionName, data]}
								{@const maxFleet = Math.max(...Object.values(regionalData).map(d => d.fleetSize))}
								{@const percentage = (data.fleetSize / maxFleet) * 100}
								<div class="chart-row">
									<div class="chart-label text-slate-700">{regionName}</div>
									<div class="chart-bar-container">
										<div 
											class="chart-bar chart-bar-with-value"
											style="width: {percentage}%; background: {getPerformanceBarColor(data.fleetSize, 'fleet')};"
										>
											<span class="chart-value-inside">{data.fleetSize}</span>
											{#if needsAttention(data.fleetSize, 'fleet')}
												<span class="alert-icon">❗</span>
											{/if}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<!-- BPD Production Comparison -->
				<div class="chart-card">
					<div class="chart-header">
						<h3 class="text-base font-semibold text-slate-800">Total BPD Production</h3>
						<span class="chart-subtitle text-sm text-slate-600">Daily units produced</span>
					</div>
					<div class="chart-content">
						<div class="bar-chart">
							{#each Object.entries(regionalData) as [regionName, data]}
								{@const maxBPD = Math.max(...Object.values(regionalData).map(d => d.totalBPD))}
								{@const percentage = (data.totalBPD / maxBPD) * 100}
								<div class="chart-row">
									<div class="chart-label text-slate-700">{regionName}</div>
									<div class="chart-bar-container">
										<div 
											class="chart-bar chart-bar-with-value"
											style="width: {percentage}%; background: {getPerformanceBarColor(data.totalBPD, 'bpd')};"
										>
											<span class="chart-value-inside">{data.totalBPD.toLocaleString()}</span>
											{#if needsAttention(data.totalBPD, 'bpd')}
												<span class="alert-icon">❗</span>
											{/if}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Yard Comparison Modal -->
	{#if $showYardComparison}
		<RegionalYardComparison 
			visible={true}
			regionName={$selectedRegion}
			regionData={[]}
			on:close={handleCloseYardComparison}
		/>
	{/if}
</div>

<style>
	.regional-dashboard {
		min-height: 100vh;
		background: white;
	}

	.main-content {
		background: white;
	}

	.content-section {
		padding: 2rem 3rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.section-header {
		margin-bottom: 2rem;
	}

	.comparison-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.region-summary-card {
		background: white;
		border: 2px solid #e2e8f0;
		border-radius: 0.75rem;
		padding: 1.5rem;
		transition: all 0.2s;
	}

	.region-summary-card.active {
		border-color: var(--region-color);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.region-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.region-status {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.region-metrics {
		margin-bottom: 1.5rem;
	}

	.metric-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.compare-btn {
		width: 100%;
	}

	.charts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.chart-card {
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 0.75rem;
		padding: 1.5rem;
	}

	.chart-header {
		margin-bottom: 1.5rem;
	}

	.chart-subtitle {
		opacity: 0.8;
	}

	.bar-chart {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.chart-row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.chart-label {
		min-width: 120px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.chart-bar-container {
		flex: 1;
		height: 32px;
		background: #f1f5f9;
		border-radius: 0.25rem;
		position: relative;
		overflow: hidden;
	}

	.chart-bar {
		height: 100%;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 0.5rem;
		position: relative;
		transition: width 0.8s ease;
	}

	.chart-value-inside {
		color: white;
		font-size: 0.75rem;
		font-weight: 600;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.alert-icon {
		margin-left: 0.25rem;
		font-size: 0.75rem;
	}
</style> 