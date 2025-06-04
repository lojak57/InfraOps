<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 613-line component → @current-size: ~45 lines  
@phase: Phase 7 - Executive Dashboard Components
@extractors: StrategicSection from Executive Dashboard
-->
<script lang="ts">
	import MetricCard from '$lib/components/ui/MetricCard.svelte';
	import { Target, TrendingUp } from 'lucide-svelte';
</script>

<div class="strategic-section">
	<div class="strategic-metrics">
		<MetricCard 
			title="Post-Acquisition Integration Efficiency" 
			value="85" 
			unit="%" 
			icon={Target}
			status="normal"
			trend="down"
			trendValue="-2%"
			color="orange"
		/>
		<MetricCard 
			title="ESG Progress: Emissions Reduction" 
			value="1.3" 
			unit="t CO2e/1,000 units" 
			icon={TrendingUp}
			status="normal"
			trend="up"
			trendValue="On track for 6%"
			color="emerald"
		/>
	</div>
</div>

<style>
	.strategic-section {
		display: flex;
		flex-direction: column;
	}

	.strategic-metrics {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 20px;
		margin-bottom: 32px;
	}

	.strategic-metrics > :global(*) {
		display: flex;
		flex-direction: column;
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.strategic-metrics {
			grid-template-columns: 1fr;
			gap: 16px;
			margin-bottom: 24px;
		}
	}
</style> 