<script lang="ts">
	import { Play, ArrowRight } from 'lucide-svelte';
	import { getDifficultyClass, type SandboxDemo } from '../utils/sandbox-data';

	interface Props {
		demo: SandboxDemo;
	}

	let { demo }: Props = $props();
</script>

<div class="demo-card">
	<div class="demo-header">
		<div class="demo-icon">
			<svelte:component this={demo.icon} size={32} />
		</div>
		<div class="demo-difficulty {getDifficultyClass(demo.difficulty)}">
			{demo.difficulty}
		</div>
	</div>
	
	<h3 class="demo-title">{demo.title}</h3>
	<p class="demo-description">{demo.description}</p>
	
	<div class="demo-features">
		{#each demo.features as feature}
			<span class="feature-tag">{feature}</span>
		{/each}
	</div>
	
	<a href={demo.href} class="demo-cta">
		<Play size={18} />
		Start Demo
		<ArrowRight size={18} />
	</a>
</div>

<style>
	.demo-card {
		background: white;
		padding: 32px;
		border-radius: 16px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
		transition: all 0.3s ease;
		border: 1px solid #f1f5f9;
	}

	.demo-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
	}

	.demo-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;
	}

	.demo-icon {
		width: 64px;
		height: 64px;
		background: linear-gradient(135deg, #f8fafc, #e2e8f0);
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #3b82f6;
	}

	.demo-difficulty {
		padding: 4px 12px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.demo-difficulty.beginner {
		background: #dcfce7;
		color: #166534;
	}

	.demo-difficulty.intermediate {
		background: #fef3c7;
		color: #92400e;
	}

	.demo-difficulty.advanced {
		background: #fee2e2;
		color: #991b1b;
	}

	.demo-title {
		font-size: 20px;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 12px;
	}

	.demo-description {
		font-size: 15px;
		color: #64748b;
		line-height: 1.6;
		margin: 0 0 24px;
	}

	.demo-features {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 24px;
	}

	.feature-tag {
		padding: 4px 10px;
		background: #f1f5f9;
		color: #475569;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 500;
	}

	.demo-cta {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		width: 100%;
		padding: 14px 24px;
		background: linear-gradient(135deg, #3b82f6, #1d4ed8);
		color: white;
		border-radius: 10px;
		font-size: 16px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.demo-cta:hover {
		transform: translateY(-1px);
		box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
	}
</style> 