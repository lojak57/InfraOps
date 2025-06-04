<script lang="ts">
	import type { LoadCalculatorResults } from './types/load-calculator.types';
	import { formatNumber, getResultCards, getCapacityBarInfo, getAlerts } from './utils/load-calculations';
	import { AlertTriangle } from 'lucide-svelte';

	export let results: LoadCalculatorResults;

	$: resultCards = getResultCards(results);
	$: capacityBarInfo = getCapacityBarInfo(results);
	$: alerts = getAlerts(results);
</script>

<div class="results-section">
	<h4>Load Capacity Results</h4>
	
	<div class="results-grid">
		{#each resultCards as card}
			<div class="result-card" class:primary={card.isPrimary}>
				{#if card.isPrimary && card.icon}
					<div class="result-icon">
						<svelte:component this={card.icon} size={20} />
					</div>
				{/if}
				<div class="result-content">
					<div class="result-value">{formatNumber(card.value)}</div>
					<div class="result-label">{card.label}</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Capacity Bar -->
	<div class="capacity-bar-container">
		<div class="capacity-header">
			<span class="capacity-label">{capacityBarInfo.label}</span>
			<span class="capacity-percent">{capacityBarInfo.percent.toFixed(1)}%</span>
		</div>
		<div class="capacity-bar">
			<div 
				class="capacity-fill" 
				class:good={capacityBarInfo.status === 'good'} 
				class:warning={capacityBarInfo.status === 'warning'} 
				class:danger={capacityBarInfo.status === 'danger'}
				style="width: {capacityBarInfo.percent}%"
			></div>
		</div>
		<div class="capacity-info">
			<small>DOT Limit: {formatNumber(capacityBarInfo.dotLimit)} lbs</small>
		</div>
	</div>

	<!-- Alerts -->
	{#each alerts as alert}
		{#if alert.condition}
			<div class="alert {alert.type}">
				<AlertTriangle size={16} />
				<span>{alert.message}</span>
			</div>
		{/if}
	{/each}
</div>

<style>
	.results-section {
		margin-bottom: 32px;
	}

	.results-section h4 {
		font-size: 16px;
		font-weight: 600;
		color: #1e293b;
		margin: 0 0 16px 0;
	}

	.results-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 16px;
		margin-bottom: 24px;
	}

	.result-card {
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 20px;
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.result-card.primary {
		background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
		border-color: #3b82f6;
	}

	.result-icon {
		width: 40px;
		height: 40px;
		background: #3b82f6;
		color: white;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.result-content {
		flex: 1;
	}

	.result-value {
		font-size: 24px;
		font-weight: 700;
		color: #1e293b;
		line-height: 1;
	}

	.result-label {
		font-size: 12px;
		color: #64748b;
		margin-top: 4px;
		font-weight: 500;
	}

	.capacity-bar-container {
		background: #f8fafc;
		border-radius: 12px;
		padding: 20px;
		border: 1px solid #e2e8f0;
		margin-bottom: 16px;
	}

	.capacity-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
	}

	.capacity-label {
		font-size: 14px;
		font-weight: 500;
		color: #374151;
	}

	.capacity-percent {
		font-size: 16px;
		font-weight: 700;
		color: #1e293b;
	}

	.capacity-bar {
		width: 100%;
		height: 8px;
		background: #e5e7eb;
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: 8px;
	}

	.capacity-fill {
		height: 100%;
		border-radius: 4px;
		transition: all 0.3s ease;
	}

	.capacity-fill.good {
		background: linear-gradient(90deg, #10b981, #059669);
	}

	.capacity-fill.warning {
		background: linear-gradient(90deg, #f59e0b, #d97706);
	}

	.capacity-fill.danger {
		background: linear-gradient(90deg, #ef4444, #dc2626);
	}

	.capacity-info {
		text-align: center;
	}

	.capacity-info small {
		color: #6b7280;
		font-size: 12px;
	}

	.alert {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 500;
		margin-top: 16px;
	}

	.alert.warning {
		background: #fef3c7;
		color: #d97706;
		border: 1px solid #fcd34d;
	}

	.alert.danger {
		background: #fee2e2;
		color: #dc2626;
		border: 1px solid #fca5a5;
	}

	@media (max-width: 768px) {
		.results-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 12px;
		}

		.result-card {
			padding: 16px;
		}

		.result-value {
			font-size: 20px;
		}
	}
</style> 