<script lang="ts">
	import type { NavigationSection as NavigationSectionType, SystemStatus } from '$lib/types/navigation.types';
	import NavigationHeader from './NavigationHeader.svelte';
	import NavigationSection from './NavigationSection.svelte';
	import NavigationFooter from './NavigationFooter.svelte';

	interface Props {
		sections: NavigationSectionType[];
		currentPath: string;
		systemStatus: SystemStatus;
		version: string;
	}

	let { sections, currentPath, systemStatus, version }: Props = $props();
</script>

<div class="desktop-nav">
	<NavigationHeader size={120} showTagline={true} />
	
	<div class="nav-sections">
		{#each sections as section}
			<NavigationSection {section} {currentPath} />
		{/each}
	</div>

	<NavigationFooter {systemStatus} {version} />
</div>

<style>
	.desktop-nav {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 0;
	}

	.nav-sections {
		flex: 1;
		overflow-y: auto;
		padding: 16px 0;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.nav-sections::-webkit-scrollbar {
		display: none;
	}
</style> 