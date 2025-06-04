<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 603 lines → @current-size: ~150 lines  
@phase: Phase 8 - Site Dashboard Components
@extractors: SiteDashboardHeader, SiteNavigationTabs, OperatorManagementSection, AssetOverviewSection, SiteOperationsSection, site-dashboard.types.ts, site-dashboard-utils.ts
-->
<script lang="ts">
	import YardAnalyticsTable from '$lib/components/yard/YardAnalyticsTable.svelte';
	
	// Extracted components
	import SiteDashboardHeader from './components/SiteDashboardHeader.svelte';
	import SiteNavigationTabs from './components/SiteNavigationTabs.svelte';
	import OperatorManagementSection from './components/OperatorManagementSection.svelte';
	import AssetOverviewSection from './components/AssetOverviewSection.svelte';
	import SiteOperationsSection from './components/SiteOperationsSection.svelte';
	
	// Types and utilities
	import type { SiteTabId, FleetSections } from './types/site-dashboard.types.js';

	// State management
	let showAnalyticsTable = false;
	let activeFleetTab: SiteTabId = 'operator-management';
	let fleetSections: FleetSections = {
		active: false,
		maintenance: false,
		available: false
	};

	// Event handlers
	function handleTabChanged(event: CustomEvent<{ activeTab: SiteTabId }>) {
		activeFleetTab = event.detail.activeTab;
	}
	
	function handleAnalyticsOpened() {
		showAnalyticsTable = true;
	}
	
	function handleAnalyticsClosed() {
		showAnalyticsTable = false;
	}
	
	function handleFleetSectionToggled(event: CustomEvent<{ section: string; expanded: boolean }>) {
		// Already handled by the child component
		fleetSections = { ...fleetSections };
	}
</script>

<svelte:head>
	<title>Site Manager Dashboard - Operations Platform</title>
</svelte:head>

<div class="site-dashboard">
	<!-- Header -->
	<SiteDashboardHeader />

	<!-- Top Navigation for Main Sections -->
	<SiteNavigationTabs 
		{activeFleetTab} 
		on:tab-changed={handleTabChanged}
	/>

	<!-- Main Content -->
	<div class="main-content">
		{#if activeFleetTab === 'operator-management'}
			<OperatorManagementSection />
		{:else if activeFleetTab === 'asset-overview'}
			<AssetOverviewSection 
				{fleetSections}
				on:fleet-section-toggled={handleFleetSectionToggled}
			/>
		{:else if activeFleetTab === 'site-ops'}
			<SiteOperationsSection 
				on:analytics-opened={handleAnalyticsOpened}
			/>
		{/if}
	</div>

	<!-- Analytics Table Modal -->
	<YardAnalyticsTable 
		visible={showAnalyticsTable} 
		on:close={handleAnalyticsClosed}
	/>
</div>

<style>
	.site-dashboard {
		min-height: 100vh;
		background: linear-gradient(135deg, #f8fafc 0%, #f0f9ff 50%, #e8f5e8 100%);
		padding: 20px;
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.site-dashboard {
			padding: 16px;
		}
	}
</style> 