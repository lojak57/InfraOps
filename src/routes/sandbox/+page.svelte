<script lang="ts">
	import { Play, ArrowRight, Truck, BarChart3, MapPin, Globe, Clock, Users } from 'lucide-svelte';
	import DataTrackerLogo from '$lib/components/ui/DataTrackerLogo.svelte';

	const sandboxDemos = [
		{
			id: 'dispatch',
			title: 'Fleet Dispatch Center',
			icon: MapPin,
			description: 'Explore real-time fleet tracking, route optimization, and job assignment capabilities.',
			href: '/dashboards/dispatch?demo=true',
			features: ['Live fleet tracking', 'Route optimization', 'Job assignment', 'Driver coordination'],
			difficulty: 'Beginner'
		},
		{
			id: 'executive',
			title: 'Executive Dashboard',
			icon: BarChart3,
			description: 'View comprehensive business analytics, KPIs, and performance metrics.',
			href: '/dashboards/executive?demo=true',
			features: ['Business KPIs', 'Financial analytics', 'Performance trends', 'ROI insights'],
			difficulty: 'Beginner'
		},
		{
			id: 'driver',
			title: 'Driver Workflow',
			icon: Truck,
			description: 'Experience the complete driver workflow from pre-trip to delivery completion.',
			href: '/dashboards/driver?demo=true',
			features: ['Pre-trip inspection', 'Job tracking', 'Route navigation', 'Delivery confirmation'],
			difficulty: 'Intermediate'
		},
		{
			id: 'monitoring',
			title: 'Live Asset Monitoring',
			icon: Clock,
			description: 'Monitor real-time sensor data, system alerts, and equipment status.',
			href: '/monitoring/truck-diagram?demo=true',
			features: ['Real-time sensors', 'System alerts', 'Equipment status', 'IoT integration'],
			difficulty: 'Advanced'
		}
	];

	const quickStats = [
		{ label: 'Demo Vehicles', value: '24', icon: Truck },
		{ label: 'Active Routes', value: '12', icon: MapPin },
		{ label: 'Mock Drivers', value: '18', icon: Users },
		{ label: 'Sample Jobs', value: '47', icon: BarChart3 }
	];
</script>

<svelte:head>
	<title>Sandbox Demo - DataTracker Platform</title>
	<meta name="description" content="Try DataTracker Platform with live demo data - no signup required" />
</svelte:head>

<div class="sandbox-page">
	<!-- Hero Section -->
	<section class="sandbox-hero">
		<div class="hero-content">
			<DataTrackerLogo />
			<div class="hero-badge">
				<Play size={16} />
				Live Demo Environment
			</div>
			<h1 class="hero-title">
				Try DataTracker Platform
				<span class="hero-highlight">Risk-Free</span>
			</h1>
			<p class="hero-subtitle">
				Explore our full-featured fleet management platform with realistic sample data. 
				All features are enabled - no limitations, no signup required.
			</p>
		</div>
	</section>

	<!-- Quick Stats -->
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

	<!-- Demo Options -->
	<section class="demos-section">
		<div class="demos-content">
			<h2 class="section-title">Choose Your Experience</h2>
			<p class="section-subtitle">Start with any role or workflow - switch between them anytime</p>
			
			<div class="demos-grid">
				{#each sandboxDemos as demo}
					<div class="demo-card">
						<div class="demo-header">
							<div class="demo-icon">
								<svelte:component this={demo.icon} size={32} />
							</div>
							<div class="demo-difficulty {demo.difficulty.toLowerCase()}">
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
				{/each}
			</div>
		</div>
	</section>

	<!-- Info Banner -->
	<section class="info-section">
		<div class="info-content">
			<div class="info-icon">
				<Clock size={24} />
			</div>
			<div class="info-text">
				<h3>Sandbox Environment Details</h3>
				<p>All data is simulated and resets every 24 hours. Changes you make won't affect real operations. Perfect for testing, training, or evaluating the platform.</p>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="sandbox-footer">
		<div class="footer-content">
			<p>Ready to implement DataTracker? <a href="/dashboard-selector">Access Full Platform</a></p>
		</div>
	</footer>
</div>

<style>
	.sandbox-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 25%, #f0fdf4 75%, #fefce8 100%);
		font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
	}

	/* Hero Section */
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

	/* Stats Section */
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

	/* Demos Section */
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

	/* Info Section */
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

	/* Footer */
	.sandbox-footer {
		padding: 40px 20px;
		text-align: center;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(10px);
		border-top: 1px solid rgba(0, 0, 0, 0.05);
	}

	.footer-content p {
		font-size: 16px;
		color: #64748b;
		margin: 0;
	}

	.footer-content a {
		color: #3b82f6;
		text-decoration: none;
		font-weight: 600;
	}

	.footer-content a:hover {
		text-decoration: underline;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero-title {
			font-size: 32px;
		}

		.hero-subtitle {
			font-size: 16px;
		}

		.stats-container {
			grid-template-columns: repeat(2, 1fr);
		}

		.info-content {
			flex-direction: column;
			text-align: center;
		}
	}
</style> 