<script lang="ts">
	import DataTrackerLogo from '$lib/components/ui/DataTrackerLogo.svelte';
	import { ArrowRight, Play, Truck, BarChart3, Shield, Globe } from 'lucide-svelte';

	const features = [
		{
			icon: Truck,
			title: 'Fleet Management',
			description: 'Real-time tracking, route optimization, and asset monitoring for maximum efficiency.'
		},
		{
			icon: BarChart3,
			title: 'Advanced Analytics',
			description: 'Executive dashboards with KPIs, performance metrics, and business intelligence.'
		},
		{
			icon: Shield,
			title: 'Safety & Compliance',
			description: 'Comprehensive safety monitoring, compliance tracking, and risk management.'
		},
		{
			icon: Globe,
			title: 'Multi-Site Operations',
			description: 'Manage multiple locations, regional oversight, and centralized operations.'
		}
	];
</script>

<svelte:head>
	<title>DataTracker Platform - Enterprise Fleet Management</title>
	<meta name="description" content="White-label fleet management and operations platform for enterprise logistics" />
</svelte:head>

<div class="marketing-page">
	<!-- Hero Section -->
	<section class="hero-section">
		<div class="hero-content">
			<DataTrackerLogo />
			<h1 class="hero-title">
				Enterprise Fleet Management
				<span class="hero-highlight">Reimagined</span>
			</h1>
			<p class="hero-subtitle">
				White-label operations platform that scales with your business. 
				Real-time tracking, advanced analytics, and comprehensive compliance in one unified system.
			</p>
			
			<div class="hero-actions">
				<a href="/sandbox" class="cta-primary">
					<Play size={20} />
					Try Live Demo
				</a>
				<a href="/dashboard-selector" class="cta-secondary">
					<ArrowRight size={20} />
					Access Platform
				</a>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="features-section">
		<div class="features-content">
			<h2 class="section-title">Powerful Features for Modern Operations</h2>
			<div class="features-grid">
				{#each features as feature}
					<div class="feature-card">
						<div class="feature-icon">
							<svelte:component this={feature.icon} size={32} />
						</div>
						<h3 class="feature-title">{feature.title}</h3>
						<p class="feature-description">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Sandbox CTA Section -->
	<section class="sandbox-section">
		<div class="sandbox-content">
			<h2 class="sandbox-title">Experience DataTracker in Action</h2>
			<p class="sandbox-subtitle">
				Explore our full-featured sandbox environment with sample data. 
				No signup required - start using the platform immediately.
			</p>
			<a href="/sandbox" class="sandbox-cta">
				<Play size={24} />
				Launch Sandbox Environment
				<ArrowRight size={20} />
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer class="marketing-footer">
		<p>© 2024 DataTracker Platform. White-label enterprise solutions.</p>
	</footer>
</div>

<style>
	.marketing-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #f8fafc 0%, #f0f9ff 25%, #e8f5e8 75%, #f3f4f6 100%);
		font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
	}

	/* Hero Section */
	.hero-section {
		padding: 80px 20px 120px;
		text-align: center;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(20px);
	}

	.hero-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.hero-title {
		font-size: 48px;
		font-weight: 800;
		color: #0f172a;
		margin: 40px 0 24px;
		line-height: 1.1;
	}

	.hero-highlight {
		background: linear-gradient(135deg, #3b82f6, #8b5cf6);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: 20px;
		color: #64748b;
		margin: 0 0 48px;
		line-height: 1.6;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.hero-actions {
		display: flex;
		gap: 24px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.cta-primary, .cta-secondary {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 32px;
		border-radius: 12px;
		font-size: 16px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		min-width: 180px;
		justify-content: center;
	}

	.cta-primary {
		background: linear-gradient(135deg, #3b82f6, #1d4ed8);
		color: white;
		box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
	}

	.cta-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
	}

	.cta-secondary {
		background: white;
		color: #374151;
		border: 2px solid #e5e7eb;
	}

	.cta-secondary:hover {
		border-color: #3b82f6;
		color: #3b82f6;
		transform: translateY(-2px);
	}

	/* Features Section */
	.features-section {
		padding: 80px 20px;
	}

	.features-content {
		max-width: 1200px;
		margin: 0 auto;
	}

	.section-title {
		text-align: center;
		font-size: 36px;
		font-weight: 700;
		color: #0f172a;
		margin-bottom: 64px;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 32px;
	}

	.feature-card {
		background: white;
		padding: 32px;
		border-radius: 16px;
		text-align: center;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
		transition: all 0.3s ease;
	}

	.feature-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
	}

	.feature-icon {
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #f8fafc, #e2e8f0);
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 24px;
		color: #3b82f6;
	}

	.feature-title {
		font-size: 22px;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 16px;
	}

	.feature-description {
		font-size: 16px;
		color: #64748b;
		line-height: 1.6;
		margin: 0;
	}

	/* Sandbox CTA Section */
	.sandbox-section {
		padding: 80px 20px;
		background: linear-gradient(135deg, #0f172a, #1e293b);
		color: white;
		text-align: center;
	}

	.sandbox-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.sandbox-title {
		font-size: 36px;
		font-weight: 700;
		margin: 0 0 24px;
	}

	.sandbox-subtitle {
		font-size: 18px;
		color: #cbd5e1;
		margin: 0 0 48px;
		line-height: 1.6;
	}

	.sandbox-cta {
		display: inline-flex;
		align-items: center;
		gap: 16px;
		padding: 20px 40px;
		background: linear-gradient(135deg, #22c55e, #16a34a);
		color: white;
		border-radius: 16px;
		font-size: 18px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 4px 14px rgba(34, 197, 94, 0.3);
	}

	.sandbox-cta:hover {
		transform: translateY(-3px);
		box-shadow: 0 12px 30px rgba(34, 197, 94, 0.4);
	}

	/* Footer */
	.marketing-footer {
		padding: 40px 20px;
		text-align: center;
		color: #64748b;
		font-size: 14px;
		background: rgba(255, 255, 255, 0.6);
		backdrop-filter: blur(10px);
		border-top: 1px solid rgba(0, 0, 0, 0.05);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero-title {
			font-size: 36px;
		}

		.hero-subtitle {
			font-size: 18px;
		}

		.hero-actions {
			flex-direction: column;
			align-items: center;
		}

		.cta-primary, .cta-secondary {
			width: 100%;
			max-width: 300px;
		}

		.section-title {
			font-size: 28px;
		}

		.sandbox-title {
			font-size: 28px;
		}
	}
</style>
