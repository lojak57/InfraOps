<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';
	import type { BreadcrumbItem } from '../utils/dispatch-hub-utils';

	interface Props {
		breadcrumbs: BreadcrumbItem[];
		onDrillDown: (level: string, id?: string) => void;
	}

	let { breadcrumbs, onDrillDown }: Props = $props();
</script>

<div class="breadcrumb-bar">
	<nav class="breadcrumb">
		{#each breadcrumbs as crumb, index}
			<button 
				class="breadcrumb-item"
				class:active={index === breadcrumbs.length - 1}
				onclick={() => onDrillDown(crumb.level)}
			>
				<svelte:component this={crumb.icon} class="w-4 h-4" />
				{crumb.label}
			</button>
			{#if index < breadcrumbs.length - 1}
				<ChevronRight class="w-4 h-4 breadcrumb-separator" />
			{/if}
		{/each}
	</nav>
</div>

<style>
	.breadcrumb-bar {
		@apply px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600;
	}

	.breadcrumb {
		@apply flex items-center gap-2;
	}

	.breadcrumb-item {
		@apply flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-colors;
		cursor: pointer;
	}

	.breadcrumb-item.active {
		@apply text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20;
	}

	.breadcrumb-separator {
		@apply text-gray-400 dark:text-gray-500;
	}
</style> 