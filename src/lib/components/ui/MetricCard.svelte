<script lang="ts">
	import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	export let title: string;
	export let value: string | number;
	export let unit: string = '';
	export let icon: ComponentType | null = null;
	export let status: 'normal' | 'warning' | 'critical' = 'normal';
	export let trend: 'up' | 'down' | 'stable' = 'stable';
	export let trendValue: string = '';
	export let color: string = 'blue';
	export let clickable: boolean = false;
	export let onClick: (() => void) | null = null;

	const dispatch = createEventDispatcher();

	function handleClick() {
		if (clickable) {
			if (onClick) {
				onClick();
			} else {
				dispatch('click', { title, value, unit });
			}
		}
	}

	// Trend indicator with Lucide icons
	$: trendIconComponent = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : ArrowRight;
	$: trendColor = trend === 'up' ? '#22c55e' : trend === 'down' ? '#ef4444' : '#6b7280';
</script>

<div 
	class="metric-card" 
	class:clickable
	on:click={handleClick}
	role={clickable ? 'button' : undefined}
	tabindex={clickable ? 0 : undefined}
>
	<!-- Blue top line that fills from middle out on hover only -->
	<div class="top-line"></div>
	
	<!-- Title with inline icon -->
	<div class="card-title">
		{#if icon}
			<svelte:component this={icon} class="title-icon" size={16} />
		{/if}
		{title}
	</div>

	<!-- Main metric display -->
	<div class="metric-display">
		<span class="metric-value">{typeof value === 'number' ? value.toLocaleString() : value}</span>
		{#if unit}
			<span class="metric-unit">{unit}</span>
		{/if}
	</div>

	<!-- Trend indicator at bottom -->
	{#if trendValue}
		<div class="trend-indicator" style="color: {trendColor}">
			<svelte:component this={trendIconComponent} size={14} />
			<span class="trend-value">{trendValue}</span>
		</div>
	{/if}

	<!-- Status indicator for warnings -->
	{#if status !== 'normal'}
		<div class="status-badge status-{status}">
			<div class="status-dot"></div>
			<span>{status}</span>
		</div>
	{/if}
</div>

<style>
	.metric-card {
		position: relative;
		background: #ffffff; /* Clean white background */
		border: 1px solid rgba(229, 231, 235, 0.6);
		border-radius: 12px;
		padding: 20px;
		min-height: 120px;
		display: flex;
		flex-direction: column;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: default;
		overflow: hidden;
		box-shadow: 
			0 1px 3px rgba(0, 0, 0, 0.02),
			0 1px 2px rgba(0, 0, 0, 0.01);
	}
	
	.metric-card:hover {
		transform: translateY(-6px);
		box-shadow: 
			0 20px 40px rgba(0, 0, 0, 0.08),
			0 8px 16px rgba(0, 0, 0, 0.04),
			0 2px 4px rgba(0, 0, 0, 0.02);
		border-color: rgba(203, 213, 225, 0.4);
	}

	.metric-card.clickable {
		cursor: pointer;
	}

	.metric-card.clickable:hover {
		transform: translateY(-8px);
		box-shadow: 
			0 25px 50px rgba(0, 0, 0, 0.1),
			0 10px 20px rgba(0, 0, 0, 0.06),
			0 4px 8px rgba(0, 0, 0, 0.03);
	}

	.metric-card:focus {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	/* Blue line at top that fills from middle out - ONLY on hover */
	.top-line {
		position: absolute;
		top: 0;
		left: 50%;
		right: 50%;
		height: 3px;
		background: linear-gradient(90deg, #3b82f6, #1d4ed8);
		border-radius: 12px 12px 0 0;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		opacity: 0;
	}

	.metric-card:hover .top-line {
		left: 0;
		right: 0;
		opacity: 1;
	}
	
	.card-title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		font-weight: 500;
		color: #6b7280;
		margin-bottom: 8px;
		line-height: 1.3;
	}
	
	.title-icon {
		color: #9ca3af;
		flex-shrink: 0;
	}
	
	.metric-display {
		display: flex;
		align-items: baseline;
		gap: 6px;
		margin-bottom: auto;
	}
	
	.metric-value {
		font-size: 28px;
		font-weight: 700;
		color: #111827;
		line-height: 1;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}
	
	.metric-unit {
		font-size: 14px;
		font-weight: 500;
		color: #9ca3af;
		margin-left: 2px;
	}
	
	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 4px 8px;
		border-radius: 12px;
		font-size: 10px;
		font-weight: 600;
		text-transform: capitalize;
		margin-top: 8px;
		max-width: fit-content;
	}
	
	.status-badge.status-warning {
		background: rgba(245, 158, 11, 0.1);
		color: #d97706;
	}
	
	.status-badge.status-critical {
		background: rgba(239, 68, 68, 0.1);
		color: #dc2626;
	}
	
	.status-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: currentColor;
	}
	
	.trend-indicator {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		font-weight: 600;
		padding: 4px 8px;
		border-radius: 16px;
		background: rgba(0, 0, 0, 0.03);
		margin-top: 8px;
		width: fit-content;
	}
	
	.trend-value {
		font-size: 11px;
		font-weight: 600;
	}
	
	/* Responsive Design */
	@media (max-width: 768px) {
		.metric-card {
			padding: 16px;
			min-height: 100px;
		}
		
		.card-title {
			font-size: 12px;
		}
		
		.metric-value {
			font-size: 24px;
		}
		
		.metric-unit {
			font-size: 12px;
		}

		.metric-card:hover {
			transform: translateY(-4px);
		}
	}
	
	@media (max-width: 480px) {
		.metric-card {
			padding: 14px;
			min-height: 90px;
		}
		
		.metric-value {
			font-size: 20px;
		}
		
		.card-title {
			margin-bottom: 6px;
		}
	}
</style> 