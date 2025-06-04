<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 613-line component → @current-size: ~55 lines  
@phase: Phase 7 - Executive Dashboard Components
@extractors: OperationsSection from Executive Dashboard
-->
<script lang="ts">
	import MetricCard from '$lib/components/ui/MetricCard.svelte';
	import { Truck, BarChart3, Shield } from 'lucide-svelte';
</script>

<div class="operations-section">
	<div class="operations-metrics">
		<MetricCard 
			title="Fleet Utilization" 
			value="86" 
			unit="%" 
			icon={Truck}
			status="normal"
			trend="down"
			trendValue="-1%"
			color="orange"
		/>
		<MetricCard 
			title="Volume Transported" 
			value="14.3M" 
			unit="units monthly" 
			icon={BarChart3}
			status="normal"
			trend="up"
			trendValue="+6.7%"
			color="blue"
		/>
		<MetricCard 
			title="FlowOps Impact: Temperature Compliance" 
			value="98" 
			unit="%" 
			icon={Shield}
			status="normal"
			trend="up"
			trendValue="+0.5%"
			color="emerald"
		/>
	</div>
</div>

<style>
	.operations-section {
		display: flex;
		flex-direction: column;
	}

	.operations-metrics {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
		margin-bottom: 32px;
	}

	.operations-metrics > :global(*) {
		display: flex;
		flex-direction: column;
	}

	/* Mobile Responsiveness */
	@media (max-width: 1024px) {
		.operations-metrics {
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		}
	}

	@media (max-width: 768px) {
		.operations-metrics {
			grid-template-columns: 1fr;
			gap: 16px;
			margin-bottom: 24px;
		}
	}
</style> 