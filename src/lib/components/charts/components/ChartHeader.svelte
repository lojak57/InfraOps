<script lang="ts">
	import LiveIndicator from './LiveIndicator.svelte';

	interface Props {
		title: string;
		isLive?: boolean;
		showLiveIndicator?: boolean;
		subtitle?: string;
		actions?: any[];
	}

	let { 
		title, 
		isLive = false, 
		showLiveIndicator = true, 
		subtitle,
		actions = []
	}: Props = $props();
</script>

<div class="chart-header">
	<div class="chart-title-container">
		<div class="chart-title-section">
			<h3 class="chart-title">{title}</h3>
			{#if subtitle}
				<p class="chart-subtitle">{subtitle}</p>
			{/if}
		</div>
		
		<div class="chart-header-actions">
			{#if showLiveIndicator}
				<LiveIndicator {isLive} />
			{/if}
			
			{#if actions.length > 0}
				<div class="custom-actions">
					{#each actions as action}
						<button 
							class="action-btn"
							onclick={action.onClick}
						>
							{action.label}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.chart-header {
		margin-bottom: 12px;
	}

	.chart-title-container {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		min-height: 32px;
	}

	.chart-title-section {
		flex: 1;
		min-width: 0;
	}

	.chart-title {
		font-size: 16px;
		font-weight: 600;
		color: #ffffff;
		margin: 0;
		line-height: 1.2;
		word-wrap: break-word;
	}

	.chart-subtitle {
		font-size: 12px;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.7);
		margin: 4px 0 0 0;
		line-height: 1.3;
	}

	.chart-header-actions {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.custom-actions {
		display: flex;
		gap: 4px;
	}

	.action-btn {
		padding: 4px 8px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		color: #ffffff;
		font-size: 11px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-1px);
	}

	/* Mobile responsiveness */
	@media (max-width: 768px) {
		.chart-title-container {
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
		}

		.chart-title {
			font-size: 14px;
		}

		.chart-subtitle {
			font-size: 11px;
		}

		.chart-header-actions {
			align-self: flex-end;
		}
	}

	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.chart-title {
			color: #f3f4f6;
		}

		.chart-subtitle {
			color: rgba(243, 244, 246, 0.7);
		}

		.action-btn {
			background: rgba(243, 244, 246, 0.1);
			border-color: rgba(243, 244, 246, 0.2);
			color: #f3f4f6;
		}

		.action-btn:hover {
			background: rgba(243, 244, 246, 0.2);
		}
	}
</style> 