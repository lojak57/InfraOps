<script lang="ts">
	import { 
		Home, 
		Building2, 
		Truck, 
		FileText, 
		Database
	} from 'lucide-svelte';
	import type { TabType, TabStats } from '../utils/dispatch-hub-utils';

	interface Props {
		activeTab: TabType;
		tabStats: TabStats;
		navTerms: any;
		terms: any;
		jobData: any[];
		onTabChange: (tab: TabType) => void;
	}

	let { activeTab, tabStats, navTerms, terms, jobData, onTabChange }: Props = $props();
</script>

<div class="main-tabs">
	<div class="tab-list">
		<!-- Data Level Tabs -->
		<button 
			class="main-tab"
			class:active={activeTab === 'fleet'}
			onclick={() => onTabChange('fleet')}
			type="button"
		>
			<Home class="w-5 h-5" />
			<span class="tab-content">
				<span class="tab-label">{navTerms.dashboardName} Overview</span>
				<span class="tab-meta">
					{tabStats.fleet.efficiency}% efficiency
					{#if tabStats.fleet.alerts > 0}
						<span class="alert-indicator">{tabStats.fleet.alerts}</span>
					{/if}
				</span>
			</span>
		</button>

		<button 
			class="main-tab"
			class:active={activeTab === 'yard'}
			onclick={() => onTabChange('yard')}
			type="button"
		>
			<Building2 class="w-5 h-5" />
			<span class="tab-content">
				<span class="tab-label">{terms.site}s ({tabStats.site.count})</span>
				<span class="tab-meta">
					{tabStats.site.efficiency.toFixed(1)}% avg efficiency
					{#if tabStats.site.alerts > 0}
						<span class="alert-indicator">{tabStats.site.alerts}</span>
					{/if}
				</span>
			</span>
		</button>

		<button 
			class="main-tab"
			class:active={activeTab === 'truck'}
			onclick={() => onTabChange('truck')}
			type="button"
		>
			<Truck class="w-5 h-5" />
			<span class="tab-content">
				<span class="tab-label">{terms.asset}s ({tabStats.asset.count})</span>
				<span class="tab-meta">
					{tabStats.asset.efficiency.toFixed(1)}% avg efficiency
					{#if tabStats.asset.alerts > 0}
						<span class="alert-indicator">{tabStats.asset.alerts}</span>
					{/if}
				</span>
			</span>
		</button>

		<button 
			class="main-tab"
			class:active={activeTab === 'job'}
			onclick={() => onTabChange('job')}
			type="button"
		>
			<FileText class="w-5 h-5" />
			<span class="tab-content">
				<span class="tab-label">{terms.job} Tickets ({tabStats.job.count})</span>
				<span class="tab-meta">
					{tabStats.job.efficiency.toFixed(1)}% avg efficiency
					{#if tabStats.job.alerts > 0}
						<span class="alert-indicator">{tabStats.job.alerts}</span>
					{/if}
				</span>
			</span>
		</button>

		<!-- Separator -->
		<div class="tab-separator"></div>

		<!-- Raw Data Tab -->
		<button 
			class="main-tab raw-data-tab"
			class:active={activeTab === 'raw'}
			onclick={() => onTabChange('raw')}
			type="button"
		>
			<Database class="w-5 h-5" />
			<span class="tab-content">
				<span class="tab-label">Raw Data Table</span>
				<span class="tab-meta">View all {jobData.length} job tickets</span>
			</span>
		</button>
	</div>
</div>

<style>
	.main-tabs {
		@apply bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700;
	}

	.tab-list {
		@apply flex items-center px-4;
		width: 100%;
		overflow: visible;
		gap: 0;
	}

	.main-tab {
		@apply flex items-center gap-2 px-3 py-4 text-left border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors;
		cursor: pointer;
		background: none;
		border-top: none;
		border-left: none;
		border-right: none;
		flex: 1;
		min-width: 0;
		justify-content: center;
		text-align: center;
	}

	.main-tab:focus {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	.main-tab.active {
		@apply border-orange-500 dark:border-orange-400 bg-orange-50 dark:bg-orange-900/20;
	}

	.main-tab.raw-data-tab {
		@apply border-l border-gray-200 dark:border-gray-600;
		margin-left: 0.5rem;
		padding-left: 0.75rem;
		flex: 0.8;
	}

	.tab-content {
		@apply flex flex-col gap-0.5 items-center;
		pointer-events: none;
		min-width: 0;
		width: 100%;
	}

	.tab-label {
		@apply text-sm font-semibold text-gray-900 dark:text-white;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
	}

	.tab-meta {
		@apply text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1;
		white-space: nowrap;
		line-height: 1.2;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
	}

	.main-tab.active .tab-label {
		@apply text-orange-600 dark:text-orange-400;
	}

	.alert-indicator {
		@apply inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full;
	}

	.tab-separator {
		@apply w-px h-8 bg-gray-200 dark:bg-gray-600 mx-2 flex-shrink-0;
	}
</style> 