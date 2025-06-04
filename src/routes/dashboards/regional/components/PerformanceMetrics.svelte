<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 284 lines → @current-size: ~65 lines  
@phase: Phase 1 - Critical Components
@extractors: Yard performance metrics logic
-->
<script lang="ts">
	import type { RegionalData } from '../types/regional.types';
	import { getTrendColor } from '../utils/regional-utils';

	export let currentRegionData: RegionalData;
</script>

<div class="performance-grid">
	<!-- Efficiency -->
	<div class="perf-metric">
		<h3 class="text-base font-semibold text-slate-800">Efficiency</h3>
		<div class="perf-value text-2xl font-bold text-slate-800">{currentRegionData.efficiency}%</div>
		<div class="perf-trend text-sm {getTrendColor('up')}">+2.3% vs last week</div>
	</div>

	<!-- Utilization -->
	<div class="perf-metric">
		<h3 class="text-base font-semibold text-slate-800">Utilization</h3>
		<div class="perf-value text-2xl font-bold text-slate-800">{currentRegionData.utilizationRate}%</div>
		<div class="perf-trend text-sm {getTrendColor('up')}">+1.8% vs last week</div>
	</div>

	<!-- Daily Units -->
	<div class="perf-metric">
		<h3 class="text-base font-semibold text-slate-800">Daily Units</h3>
		<div class="perf-value text-2xl font-bold text-slate-800">{currentRegionData.dailyUnits.toLocaleString()}</div>
		<div class="perf-trend text-sm {getTrendColor('up')}">+5.2% vs last week</div>
	</div>

	<!-- Units Per Hour -->
	<div class="perf-metric">
		<h3 class="text-base font-semibold text-slate-800">Units/Hour</h3>
		<div class="perf-value text-2xl font-bold text-slate-800">{currentRegionData.unitsPerHour}</div>
		<div class="perf-trend text-sm {getTrendColor('stable')}">+0.8% vs last week</div>
	</div>
</div>

<style>
	.performance-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.perf-metric {
		background: white;
		padding: 1.5rem;
		border-radius: 0.75rem;
		border: 1px solid #e2e8f0;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	@media (min-width: 768px) {
		.performance-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style> 