<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 613-line component → @current-size: ~55 lines  
@phase: Phase 7 - Executive Dashboard Components
@extractors: NavigationTabs from Executive Dashboard
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getDashboardTabs } from '../utils/executive-dashboard-utils.js';
	import type { ExecutiveDashboardEvents, TabId } from '../types/executive-dashboard.types.js';
	
	const dispatch = createEventDispatcher<ExecutiveDashboardEvents>();
	
	// Props
	export let activeTab: TabId;
	
	// Get tab configuration
	$: tabs = getDashboardTabs();
	
	function selectTab(tabId: TabId) {
		activeTab = tabId;
		dispatch('tab-changed', { activeTab: tabId });
	}
</script>

<div class="nav-tabs">
	{#each tabs as tab}
		<button 
			class="nav-tab" 
			class:active={activeTab === tab.id}
			on:click={() => selectTab(tab.id as TabId)}
		>
			<svelte:component this={tab.icon} size={16} />
			<span class="tab-label">{tab.label}</span>
		</button>
	{/each}
</div>

<style>
	.nav-tabs {
		display: flex;
		gap: 8px;
		margin-bottom: 24px;
		overflow-x: auto;
		padding: 4px;
	}

	.nav-tab {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 20px;
		background: transparent;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		color: #64748b;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.nav-tab:hover {
		background: rgba(248, 250, 252, 0.8);
		border-color: #cbd5e1;
		color: #1e293b;
	}

	.nav-tab.active {
		background: #1e293b;
		color: white;
		border-color: #1e293b;
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.nav-tab {
			padding: 10px 14px;
			gap: 6px;
			font-size: 13px;
		}
	}

	@media (max-width: 640px) {
		.nav-tabs {
			gap: 8px;
		}

		.nav-tab {
			padding: 10px 12px;
			gap: 6px;
		}

		.tab-label {
			display: none;
		}
	}
</style> 