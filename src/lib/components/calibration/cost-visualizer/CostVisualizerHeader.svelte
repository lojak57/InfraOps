<script lang="ts">
	import type { CostMetrics, ROIMetrics, MetricItem } from './types/cost-visualizer.types';
	import { formatCurrency } from './utils/cost-calculations';

	export let keyStats: CostMetrics;
	export let roiMetrics: ROIMetrics;
	export let darkMode: boolean;
	export let onToggleTheme: () => void;

	$: metricItems = [
		{
			label: 'Fleet Size',
			value: keyStats.totalFleet.toLocaleString()
		},
		{
			label: 'Current Annual Cost',
			value: formatCurrency(keyStats.currentAnnualCost),
			type: 'cost' as const
		},
		{
			label: 'Annual Savings',
			value: formatCurrency(keyStats.annualSavings),
			type: 'savings' as const,
			highlight: true
		},
		{
			label: 'ROI',
			value: `${roiMetrics.annualROI.toFixed(1)}%`,
			type: 'roi' as const
		}
	];
</script>

<div class="visualizer-header">
	<div class="header-content">
		<div class="title-section">
			<h1 class="main-title">Coriolis Calibration Cost Visualizer</h1>
			<p class="subtitle">Calculate the true cost of monthly calibrations across your fleet</p>
		</div>
		<div class="header-controls">
			<button 
				class="theme-toggle"
				on:click={onToggleTheme}
				aria-label="Toggle dark mode"
			>
				{#if darkMode}
					<span class="icon">☀️</span>
					Light Mode
				{:else}
					<span class="icon">🌙</span>
					Dark Mode
				{/if}
			</button>
		</div>
	</div>
	
	<!-- Key Metrics Bar -->
	<div class="metrics-bar">
		{#each metricItems as metric}
			<div class="metric-item" class:highlight={metric.highlight}>
				<span class="metric-label">{metric.label}</span>
				<span class="metric-value" class:cost={metric.type === 'cost'} class:savings={metric.type === 'savings'} class:roi={metric.type === 'roi'}>
					{metric.value}
				</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.visualizer-header {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		padding: 24px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	:global(.dark) .visualizer-header {
		background: rgba(15, 23, 42, 0.95);
		border-bottom-color: rgba(255, 255, 255, 0.1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;
	}

	.title-section {
		flex: 1;
	}

	.main-title {
		font-size: 32px;
		font-weight: 800;
		color: #0f172a;
		margin: 0 0 8px 0;
		background: linear-gradient(135deg, #3b82f6, #1d4ed8);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	:global(.dark) .main-title {
		background: linear-gradient(135deg, #60a5fa, #3b82f6);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.subtitle {
		font-size: 16px;
		color: #64748b;
		margin: 0;
	}

	:global(.dark) .subtitle {
		color: #94a3b8;
	}

	.theme-toggle {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.8);
		color: #475569;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	:global(.dark) .theme-toggle {
		border-color: rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.1);
		color: #e2e8f0;
	}

	.theme-toggle:hover {
		background: rgba(255, 255, 255, 1);
		border-color: rgba(0, 0, 0, 0.2);
		transform: translateY(-1px);
	}

	:global(.dark) .theme-toggle:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.metrics-bar {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		padding: 20px;
		background: rgba(248, 250, 252, 0.8);
		border-radius: 12px;
		border: 1px solid rgba(0, 0, 0, 0.05);
	}

	:global(.dark) .metrics-bar {
		background: rgba(30, 41, 59, 0.8);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.metric-item {
		text-align: center;
		padding: 12px;
		border-radius: 8px;
		transition: all 0.2s ease;
	}

	.metric-item:hover {
		background: rgba(255, 255, 255, 0.8);
		transform: translateY(-2px);
	}

	:global(.dark) .metric-item:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.metric-item.highlight {
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.2);
	}

	:global(.dark) .metric-item.highlight {
		background: rgba(34, 197, 94, 0.2);
		border-color: rgba(34, 197, 94, 0.3);
	}

	.metric-label {
		display: block;
		font-size: 12px;
		font-weight: 500;
		color: #64748b;
		margin-bottom: 4px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	:global(.dark) .metric-label {
		color: #94a3b8;
	}

	.metric-value {
		display: block;
		font-size: 20px;
		font-weight: 700;
		color: #0f172a;
		font-family: 'JetBrains Mono', monospace;
	}

	:global(.dark) .metric-value {
		color: #f1f5f9;
	}

	.metric-value.cost {
		color: #dc2626;
	}

	.metric-value.savings {
		color: #16a34a;
	}

	.metric-value.roi {
		color: #3b82f6;
	}

	@media (max-width: 768px) {
		.header-content {
			flex-direction: column;
			gap: 16px;
			align-items: flex-start;
		}

		.metrics-bar {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.main-title {
			font-size: 24px;
		}

		.metrics-bar {
			grid-template-columns: 1fr;
		}
	}
</style>