<script lang="ts">
	import { Play } from 'lucide-svelte';
	import DataTrackerLogo from '$lib/components/ui/DataTrackerLogo.svelte';
	import { HERO_CONFIG } from '../utils/sandbox-data';
</script>

<section class="sandbox-hero">
	<div class="hero-content">
		<DataTrackerLogo />
		<div class="hero-badge">
			<Play size={16} />
			{HERO_CONFIG.badge}
		</div>
		<h1 class="hero-title">
			{HERO_CONFIG.title}
			<span class="hero-highlight">{HERO_CONFIG.highlight}</span>
		</h1>
		<p class="hero-subtitle">
			{HERO_CONFIG.subtitle}
		</p>
	</div>
</section>

<style>
	.sandbox-hero {
		padding: 60px 20px 40px;
		text-align: center;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
	}

	.hero-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		background: linear-gradient(135deg, #22c55e, #16a34a);
		color: white;
		border-radius: 20px;
		font-size: 14px;
		font-weight: 600;
		margin: 20px 0;
	}

	.hero-title {
		font-size: 42px;
		font-weight: 800;
		color: #0f172a;
		margin: 24px 0;
		line-height: 1.1;
	}

	.hero-highlight {
		background: linear-gradient(135deg, #22c55e, #16a34a);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: 18px;
		color: #64748b;
		margin: 0 0 40px;
		line-height: 1.6;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero-title {
			font-size: 32px;
		}

		.hero-subtitle {
			font-size: 16px;
		}
	}
</style> 