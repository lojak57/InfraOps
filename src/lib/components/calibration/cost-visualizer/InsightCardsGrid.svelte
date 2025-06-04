<script lang="ts">
	import type { CostMetrics, ROIMetrics } from './types/cost-visualizer.types';
	import { generateInsightCards } from './utils/cost-calculations';

	export let keyStats: CostMetrics;
	export let roiMetrics: ROIMetrics;

	$: insightCards = generateInsightCards(keyStats, roiMetrics);
</script>

<div class="insights-section">
	<div class="insight-cards">
		{#each insightCards as card}
			<div class="insight-card {card.type}">
				<div class="insight-icon">{card.icon}</div>
				<div class="insight-content">
					<h3>{card.title}</h3>
					<p>{@html card.content}</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.insights-section {
		padding: 24px;
		max-width: 1400px;
		margin: 0 auto;
	}

	.insight-cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}

	.insight-card {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 20px;
		background: rgba(255, 255, 255, 0.95);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		transition: all 0.2s ease;
	}

	:global(.dark) .insight-card {
		background: rgba(30, 41, 59, 0.95);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.insight-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
	}

	.insight-icon {
		font-size: 24px;
		min-width: 40px;
		text-align: center;
	}

	.insight-content h3 {
		font-size: 16px;
		font-weight: 600;
		color: #0f172a;
		margin: 0 0 4px 0;
	}

	:global(.dark) .insight-content h3 {
		color: #f1f5f9;
	}

	.insight-content p {
		font-size: 14px;
		color: #64748b;
		margin: 0;
		line-height: 1.4;
	}

	:global(.dark) .insight-content p {
		color: #94a3b8;
	}

	@media (max-width: 768px) {
		.insight-cards {
			grid-template-columns: 1fr;
		}

		.insight-card {
			flex-direction: column;
			text-align: center;
		}
	}

	@media (max-width: 480px) {
		.insight-card {
			flex-direction: column;
			text-align: center;
		}
	}
</style> 