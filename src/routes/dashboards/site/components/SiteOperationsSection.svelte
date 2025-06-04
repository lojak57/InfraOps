<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 603-line component → @current-size: ~200 lines  
@phase: Phase 8 - Site Dashboard Components
@extractors: SiteOperationsSection from Site Dashboard
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import TrendCell from '$lib/components/ui/TrendCell.svelte';
	import ClickToExplore from '$lib/components/ui/ClickToExplore.svelte';
	import { TrendingUp, BarChart3, AlertTriangle } from 'lucide-svelte';
	import { getPerformanceCards, getQuickStats, getOperationCards } from '../utils/site-dashboard-utils.js';
	import type { SiteDashboardEvents } from '../types/site-dashboard.types.js';
	
	const dispatch = createEventDispatcher<SiteDashboardEvents>();
	
	// Get data from utils
	const performanceCards = getPerformanceCards();
	const quickStats = getQuickStats();
	const operationCards = getOperationCards();
	
	function handleAnalyticsClick() {
		dispatch('analytics-opened');
	}
</script>

<div>
	<!-- Enhanced Performance Analytics Section -->
	<div class="content-section performance-analytics-section">
		<div class="section-header mb-6">
			<h2 class="text-lg font-semibold tracking-tight text-slate-800">Performance Analytics</h2>
			<p class="text-sm text-slate-600 tracking-normal">Defend your numbers with complete operational context</p>
		</div>
		
		<!-- Summary Performance Cards -->
		<div class="performance-summary grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			{#each performanceCards as card}
				<div class="perf-card {card.status}">
					<div class="perf-header">
						<div class="perf-icon">
							<svelte:component this={card.icon} size={24} />
						</div>
						<div class="perf-status text-sm font-semibold tracking-tight">{card.statusLabel}</div>
					</div>
					<h3 class="text-base font-semibold tracking-tight text-slate-800">{card.title}</h3>
					<div class="perf-value font-mono text-slate-900">{card.value}</div>
					{#if card.id === 'daily-throughput'}
						<div class="perf-trend">
							<TrendCell value={312} type="absolute" size="sm" />
							<span class="text-slate-600 text-sm">{card.description}</span>
						</div>
					{:else}
						<p class="text-slate-600 text-sm">{card.description}</p>
					{/if}
					<ClickToExplore 
						label={card.actionLabel}
						variant="subtle"
						on:click={handleAnalyticsClick}
					/>
				</div>
			{/each}
		</div>

		<!-- Quick Stats with Standardized Fonts -->
		<div class="quick-stats grid grid-cols-2 md:grid-cols-4 gap-6">
			{#each quickStats as stat}
				<div class="stat-item">
					<span class="stat-label text-xs uppercase text-slate-500 tracking-wide">{stat.label}</span>
					{#if stat.withTrend}
						<div class="stat-value-with-trend flex items-center gap-2">
							<span class="text-lg font-semibold text-slate-800 font-mono">{stat.value}</span>
							<TrendCell value={stat.trendValue || 0} size="sm" />
						</div>
					{:else}
						<span class="stat-value text-lg font-semibold text-slate-800 font-mono">{stat.value}</span>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Operations Summary -->
	<div class="content-section mt-8">
		<h2 class="text-lg font-semibold tracking-tight text-slate-800 mb-6">Operations Summary</h2>
		<div class="operations-grid grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each operationCards as card}
				<div class="operation-card">
					<h3 class="text-sm font-semibold uppercase text-slate-500 tracking-wide">{card.title}</h3>
					<div class="metric-value font-mono text-slate-900">{card.value}</div>
					{#if card.withTrend}
						<div class="trend-container">
							<TrendCell value={card.trendValue || 0} size="sm" />
							<span class="text-slate-600 text-sm">{card.description}</span>
						</div>
					{:else}
						<p class="text-slate-600 text-sm">{card.description}</p>
					{/if}
				</div>
			{/each}
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

	.performance-summary {
		margin-bottom: 32px;
	}

	.perf-card {
		background: white;
		border-radius: 16px;
		padding: 24px;
		border: 1px solid #e2e8f0;
		transition: all 0.3s ease;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.perf-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
	}

	.perf-card.excellent {
		border-left: 4px solid #059669;
		background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
	}

	.perf-card.good {
		border-left: 4px solid #3b82f6;
		background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
	}

	.perf-card.warning {
		border-left: 4px solid #f59e0b;
		background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
	}

	.perf-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 16px;
	}

	.perf-icon {
		color: #64748b;
	}

	.perf-status {
		font-size: 12px;
		color: #64748b;
		letter-spacing: 0.5px;
	}

	.perf-value {
		font-size: 28px;
		font-weight: 700;
		margin: 12px 0;
	}

	.perf-trend {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 12px;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
		background: #f8fafc;
		border-radius: 12px;
		border: 1px solid #e2e8f0;
	}

	.stat-value-with-trend {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.trend-container {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.operation-card {
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 16px;
		padding: 24px;
		text-align: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.operation-card .metric-value {
		font-size: 32px;
		font-weight: 700;
		margin: 12px 0 8px 0;
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.content-section {
			padding: 24px 16px;
		}

		.performance-summary {
			gap: 16px;
		}

		.operation-card .metric-value {
			font-size: 28px;
		}
	}
</style> 