<script lang="ts">
	import SandboxDemoCard from './SandboxDemoCard.svelte';
	import { sandboxDemos } from '../utils/sandbox-data';
</script>

<section class="demos-section">
	<div class="demos-content">
		<h2 class="section-title">Choose Your Experience</h2>
		<p class="section-subtitle">Start with any role or workflow - switch between them anytime</p>
		
		<div class="demos-grid">
			{#each sandboxDemos as demo}
				<SandboxDemoCard {demo} />
			{/each}
		</div>
	</div>
</section>

<style>
	.demos-section {
		padding: 60px 20px;
	}

	.demos-content {
		max-width: 1200px;
		margin: 0 auto;
	}

	.section-title {
		text-align: center;
		font-size: 32px;
		font-weight: 700;
		color: #0f172a;
		margin-bottom: 16px;
	}

	.section-subtitle {
		text-align: center;
		font-size: 16px;
		color: #64748b;
		margin-bottom: 48px;
	}

	.demos-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 32px;
	}
</style> 