<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 603-line component → @current-size: ~130 lines  
@phase: Phase 8 - Site Dashboard Components
@extractors: AssetOverviewSection from Site Dashboard
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import MetricCard from '$lib/components/ui/MetricCard.svelte';
	import FleetStatusSection from '$lib/components/ui/FleetStatusSection.svelte';
	import { Truck, BarChart3 } from 'lucide-svelte';
	import { getFleetData, getFleetSectionKey } from '../utils/site-dashboard-utils.js';
	import type { SiteDashboardEvents, FleetSections } from '../types/site-dashboard.types.js';
	
	const dispatch = createEventDispatcher<SiteDashboardEvents>();
	
	// Props
	export let fleetSections: FleetSections;
	
	// Get fleet data
	const fleetData = getFleetData();
	
	function handleFleetSectionToggle(event: CustomEvent) {
		const { section, expanded } = event.detail;
		const sectionKey = getFleetSectionKey(section);
		fleetSections[sectionKey] = expanded;
		
		dispatch('fleet-section-toggled', { section, expanded });
	}
</script>

<div>
	<!-- Overview Metrics -->
	<div class="overview-metrics grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
		<MetricCard 
			title="Total Assets" 
			value="89" 
			unit="assets" 
			icon={Truck}
			status="normal"
			trend="stable"
			trendValue="0 this week"
			color="slate"
		/>
		<MetricCard 
			title="Active Today" 
			value="67" 
			unit="assets" 
			icon={Truck}
			status="normal"
			trend="up"
			trendValue="+8 vs yesterday"
			color="slate"
		/>
		<MetricCard 
			title="Maintenance Mode" 
			value="8" 
			unit="assets" 
			icon={BarChart3}
			status="warning"
			trend="stable"
			trendValue="scheduled"
			color="slate"
		/>
		<MetricCard 
			title="Utilization Rate" 
			value="75.3" 
			unit="%" 
			icon={BarChart3}
			status="normal"
			trend="up"
			trendValue="+3.2%"
			color="slate"
		/>
	</div>

	<!-- Fleet Status with Accordion -->
	<div class="content-section">
		<h2 class="text-lg font-semibold tracking-tight text-slate-800 mb-6">Asset Status Overview</h2>
		<div class="fleet-status-sections space-y-4">
			<FleetStatusSection 
				title="Active Assets"
				count={fleetData.active.count}
				status="active"
				expanded={fleetSections.active}
				items={fleetData.active.items}
				on:toggle={handleFleetSectionToggle}
			/>
			<FleetStatusSection 
				title="Maintenance"
				count={fleetData.maintenance.count}
				status="maintenance"
				expanded={fleetSections.maintenance}
				items={fleetData.maintenance.items}
				on:toggle={handleFleetSectionToggle}
			/>
			<FleetStatusSection 
				title="Available"
				count={fleetData.available.count}
				status="available"
				expanded={fleetSections.available}
				items={fleetData.available.items}
				on:toggle={handleFleetSectionToggle}
			/>
		</div>
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

		.overview-metrics {
			gap: 16px;
		}
	}
</style> 