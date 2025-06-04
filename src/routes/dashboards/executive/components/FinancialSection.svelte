<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 613-line component → @current-size: ~80 lines  
@phase: Phase 7 - Executive Dashboard Components
@extractors: FinancialSection from Executive Dashboard
-->
<script lang="ts">
	import MetricCard from '$lib/components/ui/MetricCard.svelte';
	import ChartContainer from './ChartContainer.svelte';
	import { DollarSign, TrendingUp, Target } from 'lucide-svelte';
	import type { ChartPadding } from '../types/executive-dashboard.types.js';
	
	// Props
	export let chartPadding: ChartPadding;
</script>

<div class="financial-section">
	<div class="financial-metrics">
		<MetricCard 
			title="Quarterly Revenue" 
			value="$303.9M" 
			unit="" 
			icon={DollarSign}
			status="normal"
			trend="up"
			trendValue="+6.4%"
			color="emerald"
		/>
		<MetricCard 
			title="Cost per Unit Reduction Potential" 
			value="$7.50 → $7.00" 
			unit="" 
			icon={TrendingUp}
			status="normal"
			trend="up"
			trendValue="+0.8% EBITDA"
			color="blue"
		/>
		<MetricCard 
			title="Leverage Ratio" 
			value="3.3x" 
			unit="" 
			icon={Target}
			status="normal"
			trend="stable"
			trendValue="Within target"
			color="emerald"
		/>
	</div>

	<div class="financial-charts">
		<ChartContainer
			title="Revenue Trends (12 Months)"
			color="#10B981"
			height={450}
			unit="$M"
			animated={true}
			{chartPadding}
		/>
		<ChartContainer
			title="Cost Analysis & Margins"
			color="#3B82F6"
			height={450}
			unit="$"
			animated={true}
			{chartPadding}
		/>
	</div>
</div>

<style>
	.financial-section {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.financial-metrics {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 20px;
		margin-bottom: 32px;
	}

	.financial-metrics > :global(*) {
		display: flex;
		flex-direction: column;
	}

	.financial-charts {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		align-items: flex-start;
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.financial-metrics {
			grid-template-columns: 1fr;
			gap: 16px;
			margin-bottom: 24px;
		}

		.financial-charts {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}
</style> 