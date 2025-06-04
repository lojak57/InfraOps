<script lang="ts">
	import DataTrackerLogo from '../DataTrackerLogo.svelte';
	import { brandInfo } from '$lib/core/stores/platform.store';

	interface Props {
		size?: number;
		showTagline?: boolean;
		isMobile?: boolean;
	}

	let { size = 120, showTagline = true, isMobile = false }: Props = $props();
	
	// Use reactive brand configuration
	const brand = $derived($brandInfo);
	const logoSize = $derived(size || (isMobile ? brand.logoSize?.mobile || 80 : brand.logoSize?.desktop || 120));
</script>

<div class="header-container" class:mobile={isMobile}>
	<a href="/" class="logo-container">
		<DataTrackerLogo size={logoSize} />
		<div class="logo-text">
			<span class="brand-name">{brand.platformName}</span>
			{#if showTagline && !isMobile}
				<span class="brand-tagline">{brand.tagline}</span>
			{/if}
		</div>
	</a>
</div>

<style>
	.header-container {
		padding: 12px 16px;
		border-bottom: 1px solid var(--header-border);
		background: var(--header-bg);
	}

	.header-container.mobile {
		padding: 6px 16px;
		height: 48px;
		display: flex;
		align-items: center;
	}

	.logo-container {
		display: flex;
		align-items: center;
		gap: 12px;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.header-container.mobile .logo-container {
		gap: 8px;
	}

	.logo-container:hover {
		transform: translateY(-1px);
	}

	.header-container.mobile .logo-container:hover {
		transform: none;
	}

	.logo-text {
		display: flex;
		flex-direction: column;
	}

	.brand-name {
		font-size: 18px;
		font-weight: 700;
		color: var(--header-text);
		line-height: 1.2;
	}

	.header-container.mobile .brand-name {
		font-size: 16px;
	}

	.brand-tagline {
		font-size: 11px;
		font-weight: 500;
		color: var(--datatracker-primary-light);
		line-height: 1.2;
	}
</style> 