<script lang="ts">
	import type { Incident } from '../types/incident-detail.types';
	import { extractImpactInfo } from '../utils/incident-detail-utils';

	export let incident: Incident;

	$: impactInfo = extractImpactInfo(incident);
</script>

<div class="impact-section">
	<h3>Impact Assessment</h3>
	<div class="impact-grid">
		<div class="impact-card cost">
			<div class="impact-label">Financial Impact</div>
			<div class="impact-value">{impactInfo.costFormatted}</div>
		</div>
		<div class="impact-card time">
			<div class="impact-label">Downtime</div>
			<div class="impact-value">{impactInfo.downtimeFormatted}</div>
		</div>
	</div>
</div>

<style>
	.impact-section h3 {
		margin: 0 0 20px 0;
		font-size: 18px;
		font-weight: 600;
		color: #1f2937;
	}

	.impact-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 16px;
		margin-bottom: 32px;
	}

	.impact-card {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 12px;
		padding: 20px;
		text-align: center;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.impact-card.cost {
		border-left: 4px solid #ef4444;
	}

	.impact-card.time {
		border-left: 4px solid #f59e0b;
	}

	.impact-label {
		font-size: 12px;
		font-weight: 600;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 8px;
	}

	.impact-value {
		font-size: 24px;
		font-weight: 700;
		color: #1f2937;
		font-family: 'JetBrains Mono', monospace;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.impact-grid {
			grid-template-columns: 1fr;
		}
	}
</style> 