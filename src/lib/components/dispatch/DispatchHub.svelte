<script lang="ts">
	import { dispatchAnalytics } from '$lib/stores/dispatchAnalytics';
	import { navigationTerms, assetTerms } from '$lib/core/stores/platform.store';
	import { onMount, onDestroy } from 'svelte';
	import { 
		Home, 
		Building2, 
		Truck, 
		FileText 
	} from 'lucide-svelte';
	
	// Utility imports
	import { 
		getBreadcrumbs, 
		calculateTabStats, 
		getDefaultDrillDownForTab, 
		shouldResetOnTabChange,
		type TabType 
	} from './utils/dispatch-hub-utils';
	
	// Component imports
	import DispatchHeader from './shared/DispatchHeader.svelte';
	import DispatchBreadcrumb from './shared/DispatchBreadcrumb.svelte';
	import DispatchTabNavigation from './shared/DispatchTabNavigation.svelte';
	
	// Analytics component imports
	import FleetAnalytics from './FleetAnalytics.svelte';
	import YardAnalytics from './YardAnalytics.svelte';
	import TruckAnalytics from './TruckAnalytics.svelte';
	import JobDetailView from './JobDetailView.svelte';
	import RawDataTable from './RawDataTable.svelte';

	// ================================
	// State Management
	// ================================

	// Active tab management - using Svelte 5 runes
	let activeTab = $state<TabType>('fleet');

	// Platform terminology
	const navTerms = $derived($navigationTerms);
	const terms = $derived($assetTerms);

	// Reactive state from store
	const level = $derived($dispatchAnalytics.currentLevel);
	const selectedYard = $derived($dispatchAnalytics.selectedYard);
	const selectedTruck = $derived($dispatchAnalytics.selectedTruck);
	const selectedJob = $derived($dispatchAnalytics.selectedJob);
	const lastUpdate = $derived($dispatchAnalytics.lastUpdate);
	const fleetData = $derived($dispatchAnalytics.demoFleet);
	const yardData = $derived($dispatchAnalytics.demoYards);
	const truckData = $derived($dispatchAnalytics.demoTrucks);
	const jobData = $derived($dispatchAnalytics.demoJobs);

	// Derived computations using utilities
	const breadcrumbs = $derived(getBreadcrumbs(
		level, 
		selectedYard, 
		selectedTruck, 
		selectedJob, 
		yardData, 
		terms, 
		navTerms,
		{ Home, Building2, Truck, FileText }
	));
	
	const tabStats = $derived(calculateTabStats(fleetData, yardData, truckData, jobData));

	// ================================
	// Event Handlers
	// ================================

	function handleTabChange(tab: TabType) {
		console.log('Tab clicked:', tab);
		activeTab = tab;
		
		// Reset drill-down when switching to raw data
		if (shouldResetOnTabChange(tab)) {
			dispatchAnalytics.resetToFleet();
			return;
		}
		
		// Auto-drill down for tabs that require it
		if (level === 'fleet') {
			const drillDown = getDefaultDrillDownForTab(tab, yardData, truckData, jobData);
			if (drillDown && drillDown.id) {
				dispatchAnalytics.drillDown(drillDown.level as any, drillDown.id);
			}
		}
	}

	function handleDrillDown(targetLevel: string, id?: string) {
		switch (targetLevel) {
			case 'fleet':
				dispatchAnalytics.resetToFleet();
				activeTab = 'fleet';
				break;
			case 'yard':
				if (id) {
					dispatchAnalytics.drillDown('yard', id);
					activeTab = 'yard';
				}
				break;
			case 'truck':
				if (id) {
					dispatchAnalytics.drillDown('truck', id);
					activeTab = 'truck';
				}
				break;
			case 'job':
				if (id) {
					dispatchAnalytics.drillDown('job', id);
					activeTab = 'job';
				}
				break;
		}
	}

	// ================================
	// Lifecycle Management
	// ================================

	let jobDetailEventListener: ((event: CustomEvent) => void) | null = null;

	onMount(() => {
		jobDetailEventListener = (event: CustomEvent) => {
			const { jobId } = event.detail;
			activeTab = 'job';
		};
		
		window.addEventListener('job-detail-requested', jobDetailEventListener as EventListener);
	});

	onDestroy(() => {
		if (jobDetailEventListener) {
			window.removeEventListener('job-detail-requested', jobDetailEventListener as EventListener);
		}
	});
</script>

<div class="fleet-intelligence-analytics">
	<!-- Header Section -->
	<DispatchHeader 
		{navTerms} 
		{terms} 
		{fleetData} 
		{lastUpdate} 
	/>

	<!-- Breadcrumb Navigation -->
	{#if level !== 'fleet' && activeTab !== 'raw'}
		<DispatchBreadcrumb 
			{breadcrumbs} 
			onDrillDown={handleDrillDown} 
		/>
	{/if}

	<!-- Tab Navigation -->
	<DispatchTabNavigation 
		{activeTab}
		{tabStats}
		{navTerms}
		{terms}
		{jobData}
		onTabChange={handleTabChange}
	/>

	<!-- Content Area -->
	<div class="analytics-content">
		<!-- Debug indicator -->
		<div class="tab-debug">
			<span class="debug-current-tab">Active Tab: {activeTab}</span>
		</div>
		
		{#if activeTab === 'fleet'}
			<FleetAnalytics {handleDrillDown} />
		{:else if activeTab === 'yard'}
			<YardAnalytics {handleDrillDown} />
		{:else if activeTab === 'truck'}
			<TruckAnalytics {handleDrillDown} />
		{:else if activeTab === 'job'}
			<JobDetailView {handleDrillDown} />
		{:else if activeTab === 'raw'}
			<div class="raw-data-container">
				<div class="debug-indicator">
					<span class="debug-badge">Raw Data Active - {jobData.length} jobs loaded</span>
				</div>
				<RawDataTable />
			</div>
		{/if}
	</div>
</div>

<style>
	.fleet-intelligence-analytics {
		@apply flex flex-col h-full bg-gray-50 dark:bg-gray-900;
	}

	.analytics-content {
		@apply flex-1 overflow-hidden min-h-0;
	}

	.tab-debug {
		@apply p-2 bg-green-100 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800;
	}

	.debug-current-tab {
		@apply inline-flex items-center px-2 py-1 bg-green-600 text-white text-xs font-mono rounded;
	}

	.raw-data-container {
		@apply flex flex-col h-full bg-gray-50 dark:bg-gray-900;
	}

	.debug-indicator {
		@apply flex justify-center p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800;
	}

	.debug-badge {
		@apply inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full;
	}
</style> 