<script lang="ts">
	import type { Incident } from '../types/incident-detail.types';
	import { extractAnalysisInfo } from '../utils/incident-detail-utils';

	export let incident: Incident;

	$: analysisInfo = extractAnalysisInfo(incident);
</script>

<div class="analysis-section">
	<div class="analysis-grid">
		<div class="analysis-card">
			<h4>Root Cause</h4>
			<p>{analysisInfo.rootCause}</p>
		</div>
		<div class="analysis-card">
			<h4>Immediate Action</h4>
			<p>{analysisInfo.immediateAction}</p>
		</div>
		<div class="analysis-card">
			<h4>Follow-up Plan</h4>
			<p>{analysisInfo.followUpPlan}</p>
		</div>
	</div>
</div>

<style>
	.analysis-section {
		margin-bottom: 32px;
	}

	.analysis-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
	}

	.analysis-card {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 12px;
		padding: 20px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.analysis-card h4 {
		margin: 0 0 12px 0;
		font-size: 14px;
		font-weight: 600;
		color: #374151;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.analysis-card p {
		margin: 0;
		color: #4b5563;
		line-height: 1.5;
		font-size: 14px;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.analysis-grid {
			grid-template-columns: 1fr;
		}
	}
</style> 