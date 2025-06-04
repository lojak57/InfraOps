<script lang="ts">
	import { page } from '$app/stores';
	import { navigationTerms, assetTerms, brandInfo } from '$lib/core/stores/platform.store';
	import { getNavigationSections, systemStatus, isActiveRoute } from '$lib/utils/navigation-utils';
	import DesktopNavigation from './navigation/DesktopNavigation.svelte';
	import MobileNavigation from './navigation/MobileNavigation.svelte';

	let mobileMenuOpen = $state(false);
	const currentPath = $derived($page.url.pathname);

	// Reactive navigation sections based on platform configuration
	const navigationSections = $derived(getNavigationSections());
	const brand = $derived($brandInfo);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="navigation-container">
	<!-- Desktop Navigation -->
	<div class="desktop-nav-wrapper">
		<DesktopNavigation 
			sections={navigationSections}
			{currentPath}
			{systemStatus}
			version="v2.1.0"
		/>
	</div>

	<!-- Mobile Navigation -->
	<div class="mobile-nav-wrapper">
		<MobileNavigation 
			sections={navigationSections}
			{currentPath}
			{mobileMenuOpen}
			onToggleMenu={toggleMobileMenu}
			onCloseMenu={closeMobileMenu}
		/>
	</div>
</nav>

<style>
	.navigation-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
		background: var(--sidebar-bg);
		backdrop-filter: blur(24px);
		border-bottom: 1px solid var(--sidebar-border);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	/* Mobile Navigation (Default) */
	.desktop-nav-wrapper {
		display: none;
	}

	.mobile-nav-wrapper {
		display: block;
	}

	/* Desktop Navigation - Enhanced for larger screens */
	@media (min-width: 1025px) {
		.navigation-container {
			position: fixed;
			top: 0;
			left: 0;
			right: auto;
			bottom: 0;
			width: 280px;
			height: 100vh;
			border-right: 1px solid var(--sidebar-border);
			border-bottom: none;
			box-shadow: 
				0 8px 32px rgba(0, 0, 0, 0.1),
				0 2px 8px rgba(0, 0, 0, 0.05);
		}

		.desktop-nav-wrapper {
			display: block;
		}

		.mobile-nav-wrapper {
			display: none;
		}
	}

	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.navigation-container {
			background: rgba(30, 30, 30, 0.95);
			border-right-color: rgba(255, 255, 255, 0.1);
			border-bottom-color: rgba(255, 255, 255, 0.1);
		}
	}
</style> 