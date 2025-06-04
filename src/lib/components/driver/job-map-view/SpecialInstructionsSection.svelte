<script lang="ts">
	import { AlertCircle } from 'lucide-svelte';

	export let instructions: string;
</script>

<div class="instructions-section">
	<h3 class="section-title">Special Instructions</h3>
	<div class="instructions-card">
		<AlertCircle size={16} />
		<p>{instructions}</p>
	</div>
</div>

<style>
	.instructions-section {
		padding: 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
	}

	.section-title {
		font-size: 16px;
		font-weight: 600;
		color: #1e293b;
		margin: 0 0 12px 0;
	}

	.instructions-card {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 16px;
		background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(217, 119, 6, 0.02) 100%);
		border: 1px solid rgba(245, 158, 11, 0.2);
		border-radius: 12px;
	}

	.instructions-card :global(svg) {
		color: #f59e0b;
		margin-top: 2px;
		flex-shrink: 0;
	}

	.instructions-card p {
		margin: 0;
		font-size: 14px;
		color: #1e293b;
		line-height: 1.5;
	}
</style> 