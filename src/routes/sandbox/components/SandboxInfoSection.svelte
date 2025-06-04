<script lang="ts">
	import { Clock } from 'lucide-svelte';
	import { SANDBOX_INFO } from '../utils/sandbox-data';
</script>

<section class="info-section">
	<div class="info-content">
		<div class="info-icon">
			<Clock size={24} />
		</div>
		<div class="info-text">
			<h3>{SANDBOX_INFO.title}</h3>
			<p>{SANDBOX_INFO.description}</p>
		</div>
	</div>
</section>

<style>
	.info-section {
		padding: 40px 20px;
		background: rgba(59, 130, 246, 0.05);
	}

	.info-content {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 24px;
		background: white;
		border-radius: 12px;
		border-left: 4px solid #3b82f6;
	}

	.info-icon {
		color: #3b82f6;
		flex-shrink: 0;
	}

	.info-text h3 {
		font-size: 18px;
		font-weight: 600;
		color: #0f172a;
		margin: 0 0 8px;
	}

	.info-text p {
		font-size: 15px;
		color: #64748b;
		margin: 0;
		line-height: 1.5;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.info-content {
			flex-direction: column;
			text-align: center;
		}
	}
</style> 