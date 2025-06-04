<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 603-line component → @current-size: ~70 lines  
@phase: Phase 8 - Site Dashboard Components
@extractors: SiteNavigationTabs from Site Dashboard
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getSiteTabs } from '../utils/site-dashboard-utils.js';
	import type { SiteDashboardEvents, SiteTabId } from '../types/site-dashboard.types.js';
	
	const dispatch = createEventDispatcher<SiteDashboardEvents>();
	
	// Props
	export let activeTab: SiteTabId;
	
	// Get tab configuration
	$: tabs = getSiteTabs();
	
	function selectTab(tabId: SiteTabId) {
		activeTab = tabId;
		dispatch('tab-changed', { activeTab: tabId });
	}
</script>

<div class="section-nav bg-white rounded-lg border shadow-sm mb-6 p-1">
	<div class="nav-buttons flex gap-1">
		{#each tabs as tab}
			<button 
				class="nav-btn {activeTab === tab.id ? 'active' : ''}"
				on:click={() => selectTab(tab.id)}
			>
				<svelte:component this={tab.icon} size={16} />
				{tab.label}
			</button>
		{/each}
	</div>
</div>

<style>
	.nav-buttons {
		display: flex;
		background: #f8fafc;
		border-radius: 8px;
		padding: 4px;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 500;
		color: #64748b;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
		flex: 1;
		justify-content: center;
	}

	.nav-btn:hover {
		color: #334155;
		background: rgba(255, 255, 255, 0.5);
	}

	.nav-btn.active {
		color: #1e293b;
		background: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.nav-buttons {
			flex-direction: column;
			gap: 4px;
		}

		.nav-btn {
			justify-content: flex-start;
		}
	}
</style> 