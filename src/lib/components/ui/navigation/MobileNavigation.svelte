<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import type { NavigationSection as NavigationSectionType } from '$lib/types/navigation.types';
	import NavigationHeader from './NavigationHeader.svelte';
	import NavigationSection from './NavigationSection.svelte';

	interface Props {
		sections: NavigationSectionType[];
		currentPath: string;
		mobileMenuOpen: boolean;
		onToggleMenu: () => void;
		onCloseMenu: () => void;
	}

	let { sections, currentPath, mobileMenuOpen, onToggleMenu, onCloseMenu }: Props = $props();
</script>

<div class="mobile-nav">
	<div class="mobile-header">
		<NavigationHeader size={80} showTagline={false} isMobile={true} />
		<button 
			class="mobile-menu-toggle"
			onclick={onToggleMenu}
			aria-label="Toggle navigation menu"
		>
			{#if mobileMenuOpen}
				<X size={24} />
			{:else}
				<Menu size={24} />
			{/if}
		</button>
	</div>

	{#if mobileMenuOpen}
		<!-- Mobile Menu Backdrop -->
		<div class="mobile-backdrop" onclick={onCloseMenu}></div>
		<div class="mobile-menu open" role="dialog" aria-modal="true">
			<div class="mobile-menu-content">
				{#each sections as section}
					<NavigationSection 
						{section} 
						{currentPath} 
						isMobile={true}
						onItemClick={onCloseMenu}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.mobile-nav {
		display: block;
	}

	.mobile-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 48px;
		background: var(--header-bg);
		border-bottom: 1px solid var(--header-border);
	}

	.mobile-menu-toggle {
		background: none;
		border: none;
		color: var(--nav-text);
		cursor: pointer;
		padding: 8px;
		border-radius: 8px;
		transition: all 0.2s ease;
		margin-right: 16px;
	}

	.mobile-menu-toggle:hover {
		background: var(--nav-hover-bg);
		color: var(--nav-hover-text);
	}

	.mobile-backdrop {
		position: fixed;
		top: 56px;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 998;
		opacity: 0;
		animation: fadeIn 0.3s ease forwards;
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}

	.mobile-menu {
		position: fixed;
		top: 56px;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--sidebar-bg);
		backdrop-filter: blur(24px);
		overflow-y: auto;
		z-index: 999;
		transform: translateY(-100%);
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.mobile-menu.open {
		transform: translateY(0);
	}

	.mobile-menu-content {
		padding: 16px;
		padding-bottom: 80px; /* Extra space for safe area */
	}
</style> 