<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 613 lines → @current-size: ~150 lines  
@phase: Phase 7 - Executive Dashboard Components
@extractors: DashboardHeader, NavigationTabs, OverviewSection, FinancialSection, OperationsSection, StrategicSection, executive-dashboard.types.ts, executive-dashboard-utils.ts
-->
<script lang="ts">
	import SafetyAnalyticsModal from '$lib/components/executive/SafetyAnalyticsModal.svelte';
	import ChartDebugControls from '$lib/components/debug/ChartDebugControls.svelte';
	
	// Extracted components
	import DashboardHeader from './components/DashboardHeader.svelte';
	import NavigationTabs from './components/NavigationTabs.svelte';
	import OverviewSection from './components/OverviewSection.svelte';
	import FinancialSection from './components/FinancialSection.svelte';
	import OperationsSection from './components/OperationsSection.svelte';
	import StrategicSection from './components/StrategicSection.svelte';
	
	// Utilities and types
	import { getDefaultChartPadding, handleKeyboardShortcuts, updateChartPadding } from './utils/executive-dashboard-utils.js';
	import type { TabId, ChartPadding } from './types/executive-dashboard.types.js';

	// State management
	let activeTab: TabId = 'overview';
	let showSafetyModal = false;
	let showDebugControls = false;
	let chartPadding: ChartPadding = getDefaultChartPadding();

	// Event handlers
	function handleTabChanged(event: CustomEvent<{ activeTab: string }>) {
		activeTab = event.detail.activeTab as TabId;
	}
	
	function handleSafetyClicked() {
		showSafetyModal = true;
	}
	
	function handleExportReport() {
		console.log('Exporting report...');
		// TODO: Implement report export functionality
	}
	
	function handleRefreshData() {
		console.log('Refreshing data...');
		// TODO: Implement data refresh functionality
	}
	
	function handlePaddingUpdate(event: CustomEvent) {
		chartPadding = updateChartPadding(chartPadding, event.detail);
	}
	
	function handleDebugClose() {
		showDebugControls = false;
	}
	
	function toggleDebugControls() {
		showDebugControls = !showDebugControls;
	}
	
	// Keyboard shortcut handler
	function handleKeydown(event: KeyboardEvent) {
		handleKeyboardShortcuts(event, toggleDebugControls);
	}
</script>

<svelte:head>
	<title>Executive Dashboard - Logistics Temp Tracker</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="executive-dashboard">
	<!-- Header -->
	<DashboardHeader 
		on:export-report={handleExportReport}
		on:refresh-data={handleRefreshData}
	/>

	<!-- Navigation Tabs -->
	<NavigationTabs 
		{activeTab}
		on:tab-changed={handleTabChanged}
	/>

	<!-- Tab Content -->
	<div class="tab-content">
		{#if activeTab === 'overview'}
			<OverviewSection 
				{chartPadding}
				on:safety-clicked={handleSafetyClicked}
			/>
		{:else if activeTab === 'financial'}
			<FinancialSection {chartPadding} />
		{:else if activeTab === 'operations'}
			<OperationsSection />
		{:else if activeTab === 'strategic'}
			<StrategicSection />
		{/if}
	</div>
</div>

<!-- Safety Analytics Modal -->
{#if showSafetyModal}
	<SafetyAnalyticsModal 
		isOpen={showSafetyModal} 
		on:close={() => showSafetyModal = false} 
	/>
{/if}

<!-- Debug Controls (Development) -->
{#if showDebugControls}
	<ChartDebugControls 
		paddingLeft={chartPadding.paddingLeft}
		paddingRight={chartPadding.paddingRight}
		paddingTop={chartPadding.paddingTop}
		paddingBottom={chartPadding.paddingBottom}
		on:update={handlePaddingUpdate}
		on:close={handleDebugClose}
	/>
{/if}

<style>
	.executive-dashboard {
		min-height: 100vh;
		background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f0f9ff 100%);
		padding: 20px;
	}

	.tab-content {
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(226, 232, 240, 0.8);
		border-radius: 12px;
		padding: 24px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.executive-dashboard {
			padding: 16px;
		}

		.tab-content {
			padding: 16px;
		}
	}
</style> 