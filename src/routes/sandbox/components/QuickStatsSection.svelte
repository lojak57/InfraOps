<script lang="ts">
	import { quickStats } from '../utils/sandbox-data';
</script>

<section class="stats-section">
	<div class="stats-container">
		{#each quickStats as stat}
			<div class="stat-card">
				<div class="stat-icon">
					<svelte:component this={stat.icon} size={24} />
				</div>
				<div class="stat-content">
					<div class="stat-value">{stat.value}</div>
					<div class="stat-label">{stat.label}</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.stats-section {
		padding: 40px 20px;
	}

	.stats-container {
		max-width: 800px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 24px;
	}

	.stat-card {
		background: white;
		padding: 24px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		gap: 16px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	.stat-icon {
		width: 48px;
		height: 48px;
		background: linear-gradient(135deg, #f0f9ff, #dbeafe);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #3b82f6;
	}

	.stat-value {
		font-size: 24px;
		font-weight: 700;
		color: #0f172a;
		line-height: 1;
	}

	.stat-label {
		font-size: 14px;
		color: #64748b;
		margin-top: 4px;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.stats-container {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style> 