<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 603-line component → @current-size: ~90 lines  
@phase: Phase 8 - Site Dashboard Components
@extractors: OperatorManagementSection from Site Dashboard
-->
<script lang="ts">
	import MetricCard from '$lib/components/ui/MetricCard.svelte';
	import BatteryStatusWidget from '$lib/components/ui/BatteryStatusWidget.svelte';
	import { Users, Shield } from 'lucide-svelte';
	import { getDriverStatusItems } from '../utils/site-dashboard-utils.js';
	
	// Get driver status data
	const driverStatusItems = getDriverStatusItems();
</script>

<div class="content-section">
	<div class="section-header mb-6">
		<h2 class="text-lg font-semibold tracking-tight text-slate-800">Operator Management</h2>
		<p class="text-sm text-slate-600">Critical operator KPIs with real-time monitoring</p>
	</div>
	
	<!-- Battery-style Driver Status Widget -->
	<div class="driver-battery-widget mb-6">
		<BatteryStatusWidget 
			items={driverStatusItems}
			viewMode="3-card"
			maxItems={3}
		/>
	</div>

	<!-- Driver Metrics Cards -->
	<div class="driver-metrics grid grid-cols-1 md:grid-cols-2 gap-6">
		<MetricCard 
			title="Active Operators" 
			value="156" 
			unit="certified" 
			icon={Users}
			status="normal"
			trend="up"
			trendValue="+4 this month"
			color="slate"
		/>
		<MetricCard 
			title="Safety Compliance" 
			value="97.8" 
			unit="%" 
			icon={Shield}
			status="normal"
			trend="up"
			trendValue="+1.2%"
			color="slate"
		/>
	</div>
</div>

<style>
	.content-section {
		background: white;
		border-radius: 16px;
		padding: 32px;
		margin-bottom: 24px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		border: 1px solid rgba(0, 0, 0, 0.05);
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.content-section {
			padding: 24px 16px;
		}

		.driver-metrics {
			gap: 16px;
		}
	}
</style> 