<script lang="ts">
	import type { SummaryCard } from './types/table.types';

	export let summaryCards: SummaryCard[];
</script>

<div class="summary-cards">
	{#each summaryCards as card}
		<div class="summary-card {card.type}">
			<div class="card-label">{card.label}</div>
			<div class="card-value" class:positive={card.isPositive}>{card.value}</div>
			{#if card.subtitle}
				<div class="card-subtitle">{card.subtitle}</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.summary-cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		padding: 20px;
		background: linear-gradient(135deg, #f8fafc, #f1f5f9);
	}

	.summary-card {
		padding: 16px;
		border-radius: 8px;
		text-align: center;
		border: 1px solid rgba(0, 0, 0, 0.05);
		transition: transform 0.2s ease;
	}

	.summary-card:hover {
		transform: translateY(-2px);
	}

	.summary-card.current {
		background: rgba(239, 68, 68, 0.05);
		border-color: rgba(239, 68, 68, 0.1);
	}

	.summary-card.optimized {
		background: rgba(5, 150, 105, 0.05);
		border-color: rgba(5, 150, 105, 0.1);
	}

	.summary-card.savings {
		background: rgba(34, 197, 94, 0.05);
		border-color: rgba(34, 197, 94, 0.1);
	}

	.card-label {
		font-size: 13px;
		font-weight: 500;
		color: #64748b;
		margin-bottom: 6px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.card-value {
		font-size: 18px;
		font-weight: 700;
		color: #0f172a;
		font-family: 'JetBrains Mono', monospace;
	}

	.card-value.positive {
		color: #16a34a;
	}

	.card-subtitle {
		font-size: 12px;
		color: #16a34a;
		margin-top: 4px;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.summary-cards {
			grid-template-columns: 1fr;
		}
	}
</style> 