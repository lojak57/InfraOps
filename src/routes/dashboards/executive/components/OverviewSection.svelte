<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 613-line component → @current-size: ~110 lines  
@phase: Phase 7 - Executive Dashboard Components
@extractors: OverviewSection from Executive Dashboard
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import MetricCard from '$lib/components/ui/MetricCard.svelte';
	import ChartContainer from './ChartContainer.svelte';
	import { DollarSign, TrendingUp, Truck, Shield } from 'lucide-svelte';
	import type { ChartPadding, ExecutiveDashboardEvents } from '../types/executive-dashboard.types.js';
	
	const dispatch = createEventDispatcher<ExecutiveDashboardEvents>();
	
	// Props
	export let chartPadding: ChartPadding;
	
	function handleSafetyClick() {
		dispatch('safety-clicked');
	}
</script>

<div class="overview-section">
	<!-- Hero Metrics -->
	<div class="hero-metrics">
		<MetricCard 
			title="Monthly Revenue" 
			value="$101.3M" 
			unit="" 
			icon={DollarSign}
			status="normal"
			trend="up"
			trendValue="+6.4%"
			color="emerald"
		/>
		<MetricCard 
			title="EBITDA Margin" 
			value="9.2" 
			unit="%" 
			icon={TrendingUp}
			status="normal"
			trend="down"
			trendValue="-1.5%"
			color="blue"
		/>
		<MetricCard 
			title="Active Fleet" 
			value="745/865" 
			unit="trucks (86%)" 
			icon={Truck}
			status="normal"
			trend="up"
			trendValue="+50 trucks"
			color="orange"
		/>
		<MetricCard 
			title="Safety Score" 
			value="98.8" 
			unit="%" 
			icon={Shield}
			status="normal"
			trend="down"
			trendValue="-0.1%"
			color="emerald"
			clickable={true}
			onClick={handleSafetyClick}
		/>
	</div>

	<!-- Charts -->
	<div class="charts-section">
		<ChartContainer
			title="Company Performance Overview (Adjusted EBITDA)"
			color="#10B981"
			height={450}
			unit="$M"
			animated={true}
			{chartPadding}
		/>
		<ChartContainer
			title="Regional Revenue Distribution"
			color="#3B82F6"
			height={450}
			unit="%"
			animated={true}
			{chartPadding}
		/>
	</div>
</div>

<style>
	.overview-section {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.hero-metrics {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 20px;
		margin-bottom: 32px;
	}

	.hero-metrics > :global(*) {
		flex: 1;
		min-width: 280px;
		max-width: 300px;
		display: flex;
		flex-direction: column;
	}

	.charts-section {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		align-items: flex-start;
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.hero-metrics {
			grid-template-columns: 1fr;
			gap: 16px;
			margin-bottom: 24px;
		}

		.charts-section {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}
</style> 