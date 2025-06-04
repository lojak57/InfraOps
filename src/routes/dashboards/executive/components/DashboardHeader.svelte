<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 613-line component → @current-size: ~60 lines  
@phase: Phase 7 - Executive Dashboard Components
@extractors: DashboardHeader from Executive Dashboard
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getActionButtons } from '../utils/executive-dashboard-utils.js';
	import type { ExecutiveDashboardEvents } from '../types/executive-dashboard.types.js';
	
	const dispatch = createEventDispatcher<ExecutiveDashboardEvents>();
	
	// Action button handlers
	function handleExportReport() {
		dispatch('export-report');
	}
	
	function handleRefreshData() {
		dispatch('refresh-data');
	}
	
	$: actionButtons = getActionButtons(handleExportReport, handleRefreshData);
</script>

<div class="dashboard-header bg-slate-800 text-white">
	<div class="header-content">
		<div class="header-text">
			<h1 class="header-title text-xl font-semibold">Executive Dashboard</h1>
			<p class="header-subtitle text-slate-300">Strategic operations oversight and performance analytics</p>
		</div>
		<div class="header-actions">
			{#each actionButtons as button}
				<button class="action-button outline" type="button" on:click={button.onClick}>
					<svelte:component this={button.icon} size={16} />
					<span>{button.label}</span>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.dashboard-header {
		border-radius: 16px;
		padding: 24px 32px;
		margin-bottom: 24px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		flex-wrap: wrap;
	}

	.header-text h1 {
		margin: 0 0 4px 0;
	}

	.header-text p {
		margin: 0;
	}

	.header-actions {
		display: flex;
		gap: 8px;
		flex-shrink: 0;
	}

	.action-button {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 16px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		color: white;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.action-button:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.3);
		color: white;
	}

	.action-button.outline:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.6);
		transform: translateY(-1px);
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.dashboard-header {
			padding: 16px;
			margin-bottom: 16px;
		}

		.header-content {
			flex-direction: column;
			align-items: stretch;
			gap: 16px;
		}

		.header-actions {
			flex-direction: column;
			gap: 8px;
		}

		.action-button {
			justify-content: center;
			width: 100%;
		}

		.header-text h1 {
			font-size: 20px;
		}

		.header-text p {
			font-size: 13px;
		}
	}
</style> 