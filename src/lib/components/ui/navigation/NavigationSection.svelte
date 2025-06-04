<script lang="ts">
	import type { NavigationSection } from '$lib/types/navigation.types';
	import NavigationItem from './NavigationItem.svelte';

	interface Props {
		section: NavigationSection;
		currentPath: string;
		isMobile?: boolean;
		onItemClick?: () => void;
	}

	let { section, currentPath, isMobile = false, onItemClick }: Props = $props();
</script>

<div class="nav-section" class:mobile={isMobile}>
	<h3 class="section-title">{section.title}</h3>
	<div class="section-items">
		{#each section.items as item}
			<NavigationItem 
				{item} 
				{currentPath} 
				{isMobile}
				{onItemClick}
			/>
		{/each}
	</div>
</div>

<style>
	.nav-section {
		margin-bottom: 24px;
	}

	.section-title {
		font-size: 12px;
		font-weight: 600;
		color: var(--nav-section-title);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin: 0 20px 12px 20px;
		padding-bottom: 4px;
		border-bottom: 1px solid var(--sidebar-border);
	}

	.nav-section.mobile .section-title {
		margin: 0 0 12px 0;
		padding-bottom: 8px;
	}

	.section-items {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.nav-section.mobile .section-items {
		gap: 4px;
	}
</style> 