<script lang="ts">
	// Modular component imports
	import SandboxHero from './components/SandboxHero.svelte';
	import QuickStatsSection from './components/QuickStatsSection.svelte';
	import DemosSection from './components/DemosSection.svelte';
	import SandboxInfoSection from './components/SandboxInfoSection.svelte';
	import SandboxFooter from './components/SandboxFooter.svelte';
</script>

<svelte:head>
	<title>Sandbox Demo - DataTracker Platform</title>
	<meta name="description" content="Try DataTracker Platform with live demo data - no signup required" />
</svelte:head>

<div class="sandbox-page">
	<!-- Modular Hero Section -->
	<SandboxHero />

	<!-- Modular Quick Stats -->
	<QuickStatsSection />

	<!-- Modular Demo Options -->
	<DemosSection />

	<!-- Modular Info Banner -->
	<SandboxInfoSection />

	<!-- Modular Footer -->
	<SandboxFooter />
</div>

<style>
	.sandbox-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 25%, #f0fdf4 75%, #fefce8 100%);
		font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
	}
</style> 