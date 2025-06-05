<script lang="ts">
	import { 
		calculateConfidenceScore,
		formatConfidenceScore
	} from './utils/calibration-utils.js';

	export let fleetStats: any;

	$: confidenceScore = calculateConfidenceScore(fleetStats);
</script>

<div class="recommender-footer">
	<div class="footer-content">
		<div class="tech-info">
			<span class="tech-label">ML Engine:</span>
			<span>Coriolis Predictive Analytics v2.1</span>
		</div>
		
		<div class="confidence-score">
			<span class="confidence-label">Model Confidence:</span>
			<div class="confidence-bar">
				<div class="confidence-fill" style="width: {confidenceScore * 100}%"></div>
			</div>
			<span class="confidence-value">{formatConfidenceScore(confidenceScore)}</span>
		</div>
	</div>
</div>

<style>
	.recommender-footer {
		background: rgba(15, 23, 42, 0.95);
		backdrop-filter: blur(20px);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: 16px 24px;
		margin-top: 24px;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1400px;
		margin: 0 auto;
	}

	.tech-info {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #e2e8f0;
		font-size: 13px;
	}

	.tech-label {
		font-weight: 600;
	}

	.confidence-score {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #e2e8f0;
		font-size: 13px;
	}

	.confidence-label {
		font-weight: 500;
	}

	.confidence-bar {
		width: 100px;
		height: 6px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 3px;
		overflow: hidden;
	}

	.confidence-fill {
		height: 100%;
		background: linear-gradient(90deg, #22c55e, #16a34a);
		transition: width 0.3s ease;
	}

	.confidence-value {
		font-weight: 600;
		font-family: 'JetBrains Mono', monospace;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.footer-content {
			flex-direction: column;
			gap: 12px;
			text-align: center;
		}
	}
</style> 