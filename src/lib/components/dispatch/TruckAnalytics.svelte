<script lang="ts">
	import { currentTruckData, jobsForCurrentTruck, viewMode, dispatchAnalytics } from '$lib/stores/dispatchAnalytics';
	import DemoJobCard from './DemoJobCard.svelte';
	import { 
		Truck, 
		Activity, 
		TrendingUp, 
		TrendingDown, 
		Clock, 
		Fuel,
		Target,
		Wrench
	} from 'lucide-svelte';

	// Modular component imports
	import TruckKPICard from './components/TruckKPICard.svelte';
	import FleetAlertsInsight from './components/FleetAlertsInsight.svelte';
	import PerformanceChart from './components/PerformanceChart.svelte';
	import YardTruckSection from './components/YardTruckSection.svelte';

	// Utility imports
	import {
		getTruckStatus,
		formatLastSeen,
		calculateFleetMetrics,
		groupTrucksByYard,
		calculateAlertSummary,
		hasFleetAlerts,
		getEfficiencyStatusClass,
		getVolumeLossStatusClass,
		calculateMaintenancePercentage,
		formatLargeNumber,
		formatPercentage,
		formatEfficiencyTrend,
		formatVolumeLossTrend,
		isShowingAllTrucks,
		type FleetMetrics,
		type YardTruckGroup,
		type AlertSummary
	} from './utils/truck-analytics-data';

	// ================================
	// Props
	// ================================

	interface Props {
		handleDrillDown: (targetLevel: string, id?: string) => void;
	}

	let { handleDrillDown }: Props = $props();

	// ================================
	// Reactive Data
	// ================================

	const truckData = $derived($currentTruckData);
	const jobs = $derived($jobsForCurrentTruck);
	const allTrucks = $derived($dispatchAnalytics.demoTrucks);
	const allJobs = $derived($dispatchAnalytics.demoJobs);
	const allYards = $derived($dispatchAnalytics.demoYards);
	
	const showingAllTrucks = $derived(isShowingAllTrucks(truckData));
	const fleetMetrics = $derived(calculateFleetMetrics(allTrucks, allJobs));
	const trucksByYard = $derived(groupTrucksByYard(allTrucks, allYards));
	const alertSummary = $derived(calculateAlertSummary(allTrucks));
</script>

{#if showingAllTrucks}
	<!-- Fleet Overview -->
	<div class="trucks-overview">
		<div class="analytics-header">
			<h1 class="page-title">All Trucks Overview</h1>
			<p class="page-subtitle">
				<Truck size={16} />
				Fleet-wide truck performance and metrics
			</p>
		</div>

		<!-- Fleet KPI Dashboard -->
		<div class="kpi-grid">
			<TruckKPICard
				icon={Truck}
				value={fleetMetrics.totalTrucks}
				label="Total Trucks"
				subtitle="{fleetMetrics.activeTrucks} active"
				variant="primary"
			/>

			<TruckKPICard
				icon={Activity}
				value={fleetMetrics.totalJobs}
				label="Total Jobs"
				subtitle="{fleetMetrics.todayJobs} today"
				variant="success"
			/>

			<TruckKPICard
				icon={TrendingUp}
				value="{formatPercentage(fleetMetrics.avgEfficiency)}%"
				label="Avg Efficiency"
				subtitle="Target: 92.5%"
				variant={getEfficiencyStatusClass(fleetMetrics.avgEfficiency)}
			/>

			<TruckKPICard
				icon={Target}
				value="{formatPercentage(fleetMetrics.avgVolumeLoss)}%"
				label="Avg Volume Loss"
				subtitle="Target: ≤2.0%"
				variant={getVolumeLossStatusClass(fleetMetrics.avgVolumeLoss)}
			/>

			<TruckKPICard
				icon={Wrench}
				value={fleetMetrics.maintenanceTrucks}
				label="In Maintenance"
				subtitle="{formatPercentage(calculateMaintenancePercentage(fleetMetrics.maintenanceTrucks, fleetMetrics.totalTrucks))}% of fleet"
				variant="info"
			/>

			<TruckKPICard
				icon={Fuel}
				value={formatPercentage(fleetMetrics.avgFuelEfficiency)}
				label="Avg Fuel MPG"
				subtitle="Fleet average"
				variant="neutral"
			/>
		</div>

		<!-- Fleet Alerts -->
		<FleetAlertsInsight {alertSummary} isFleet={true} />

		<!-- Trucks by Yard -->
		<div class="trucks-section">
			<h2 class="section-title">
				Assets by Site
				<span class="section-subtitle">Click any asset to drill down</span>
			</h2>
			
			{#each trucksByYard as yardTruckGroup (yardTruckGroup.yard.id)}
				<YardTruckSection {yardTruckGroup} {handleDrillDown} />
			{/each}
		</div>
	</div>
{:else if truckData}
	<!-- Individual Truck Analytics -->
	<div class="truck-analytics">
		<div class="analytics-header">
			<h1 class="page-title">Asset {truckData.id}</h1>
			<p class="page-subtitle">
				<Truck size={16} />
				{truckData.model} ({truckData.year}) • Operator: {truckData.driverName}
			</p>
		</div>

		<!-- Individual Truck KPI Dashboard -->
		<div class="kpi-grid">
			<TruckKPICard
				icon={Activity}
				value={getTruckStatus(truckData).label}
				label="Current Status"
				subtitle="Last seen {formatLastSeen(truckData.lastJobTime)}"
				variant={getTruckStatus(truckData).class}
			/>

			<TruckKPICard
				icon={truckData.efficiency >= 92 ? TrendingUp : TrendingDown}
				value="{formatPercentage(truckData.efficiency)}%"
				label="Efficiency"
				subtitle="Target: 92.5%"
				variant={getEfficiencyStatusClass(truckData.efficiency)}
			/>

			<TruckKPICard
				icon={Activity}
				value={truckData.todayJobs}
				label="Today's Jobs"
				subtitle="{truckData.weekJobs} this week"
				variant="success"
			/>

			<TruckKPICard
				icon={Target}
				value="{formatPercentage(truckData.avgVolumeLoss)}%"
				label="Avg Volume Loss"
				subtitle="Target: ≤2.0%"
				variant={getVolumeLossStatusClass(truckData.avgVolumeLoss)}
			/>

			<TruckKPICard
				icon={Fuel}
				value={truckData.fuelEfficiency}
				label="Fuel Efficiency"
				subtitle="MPG"
				variant="info"
			/>

			<TruckKPICard
				icon={Clock}
				value={formatLargeNumber(truckData.mileage)}
				label="Total Mileage"
				subtitle="Miles driven"
				variant="neutral"
			/>
		</div>

		<!-- Individual Truck Alerts -->
		<FleetAlertsInsight 
			alertSummary={alertSummary} 
			isFleet={false} 
			truckAlerts={truckData.alerts} 
		/>

		<!-- Analytics Charts -->
		{#if $viewMode === 'analytics'}
			<div class="analytics-section">
				<h2 class="section-title">Truck Performance Analytics</h2>
				
				<div class="charts-grid">
					<PerformanceChart
						title="Efficiency Trend"
						period="Last 7 Days"
						mockContent="📈 Daily efficiency: {formatEfficiencyTrend(truckData.efficiency)}"
					/>

					<PerformanceChart
						title="Volume Loss Analysis"
						period="Recent Jobs"
						mockContent="🔍 Loss pattern: {formatVolumeLossTrend(jobs)}"
					/>
				</div>
			</div>
		{/if}

		<!-- Job History -->
		{#if $viewMode === 'cards' || $viewMode === 'analytics'}
			<div class="jobs-section">
				<h2 class="section-title">
					Recent Jobs
					<span class="section-subtitle">Click any job to drill down</span>
				</h2>
				
				<div class="jobs-grid">
					{#each jobs.slice(0, 6) as job (job.id)}
						<DemoJobCard {job} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
{:else}
	<div class="no-data">
		<p>No truck data available</p>
	</div>
{/if}

<style>
	.truck-analytics, .trucks-overview {
		@apply flex flex-col gap-6 p-6 h-full overflow-y-auto;
	}

	.analytics-header {
		@apply text-center space-y-2;
	}

	.page-title {
		@apply text-3xl font-bold text-gray-900 dark:text-white;
	}

	.page-subtitle {
		@apply text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2;
	}

	.kpi-grid {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4;
	}

	.section-title {
		@apply flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-white mb-4;
	}

	.section-subtitle {
		@apply text-sm text-gray-500 dark:text-gray-400;
	}

	.charts-grid {
		@apply grid grid-cols-1 lg:grid-cols-2 gap-6;
	}

	.jobs-grid {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
	}

	.no-data {
		@apply flex items-center justify-center h-full text-gray-500 dark:text-gray-400;
	}
</style> 