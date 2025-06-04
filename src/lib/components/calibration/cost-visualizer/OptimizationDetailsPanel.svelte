<script lang="ts">
	import { getOptimizationDetails } from './utils/cost-calculations';

	export let showOptimizationDetails: boolean = false;

	function toggleDetails() {
		showOptimizationDetails = !showOptimizationDetails;
	}

	const optimizationDetails = getOptimizationDetails();
</script>

<div class="optimization-info">
	<button 
		class="details-toggle"
		on:click={toggleDetails}
	>
		<span class="toggle-icon" class:rotated={showOptimizationDetails}>▶</span>
		How VeriJob Optimization Works
	</button>
	
	{#if showOptimizationDetails}
		<div class="optimization-details">
			<div class="detail-grid">
				{#each optimizationDetails as detail}
					<div class="detail-card">
						<h4>{detail.icon} {detail.title}</h4>
						<p>{detail.description}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.optimization-info {
		background: rgba(255, 255, 255, 0.95);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	:global(.dark) .optimization-info {
		background: rgba(30, 41, 59, 0.95);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.details-toggle {
		width: 100%;
		padding: 16px 20px;
		display: flex;
		align-items: center;
		gap: 12px;
		background: transparent;
		border: none;
		color: #475569;
		font-weight: 500;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	:global(.dark) .details-toggle {
		color: #e2e8f0;
	}

	.details-toggle:hover {
		background: rgba(59, 130, 246, 0.05);
	}

	.toggle-icon {
		transition: transform 0.2s ease;
		color: #3b82f6;
	}

	.toggle-icon.rotated {
		transform: rotate(90deg);
	}

	.optimization-details {
		padding: 0 20px 20px 20px;
		border-top: 1px solid rgba(0, 0, 0, 0.05);
	}

	:global(.dark) .optimization-details {
		border-top-color: rgba(255, 255, 255, 0.1);
	}

	.detail-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
	}

	.detail-card {
		padding: 12px;
		background: rgba(248, 250, 252, 0.8);
		border-radius: 6px;
		border: 1px solid rgba(0, 0, 0, 0.05);
	}

	:global(.dark) .detail-card {
		background: rgba(51, 65, 85, 0.5);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.detail-card h4 {
		font-size: 13px;
		font-weight: 600;
		margin: 0 0 4px 0;
		color: #334155;
	}

	:global(.dark) .detail-card h4 {
		color: #f1f5f9;
	}

	.detail-card p {
		font-size: 12px;
		color: #64748b;
		margin: 0;
		line-height: 1.4;
	}

	:global(.dark) .detail-card p {
		color: #94a3b8;
	}

	@media (max-width: 1024px) {
		.detail-grid {
			grid-template-columns: 1fr;
		}
	}
</style> 