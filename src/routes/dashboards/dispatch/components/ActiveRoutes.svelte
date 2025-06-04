<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import CollapsibleSection from '$lib/components/ui/CollapsibleSection.svelte';
	import type { Route } from '../types/dispatch-page.types';

	export let activeRoutes: Route[];
	export let isOpen: boolean = true;

	const dispatch = createEventDispatcher<{
		'toggle-section': { isOpen: boolean };
	}>();

	function handleSectionToggle(event: CustomEvent) {
		dispatch('toggle-section', event.detail);
	}
</script>

<CollapsibleSection 
	title="Active Routes"
	count={activeRoutes.length}
	icon={MapPin}
	defaultOpen={isOpen}
	on:toggle={handleSectionToggle}
>
	<div class="routes-list p-4">
		{#each activeRoutes as route}
			<div class="route-item mb-3 p-3 border border-slate-200 rounded-lg last:mb-0">
				<div class="route-info mb-2">
					<div class="flex items-center justify-between">
						<span class="route-id font-semibold text-slate-800">{route.truck}</span>
						<span class="status-badge {route.status} px-2 py-1 rounded text-xs font-medium">
							{route.currentJob}
						</span>
					</div>
					<span class="driver-name text-sm text-slate-600">{route.driver}</span>
					<span class="route-path text-sm text-slate-700 block">{route.route}</span>
				</div>
				<div class="route-status">
					<span class="eta text-xs text-slate-500">ETA: {route.eta}</span>
				</div>
			</div>
		{/each}
	</div>
</CollapsibleSection>

<style>
	/* Status Badge Styles */
	.status-badge.en-route {
		background: #dbeafe;
		color: #1e40af;
	}
	
	.status-badge.pickup {
		background: #fef3c7;
		color: #d97706;
	}
	
	.status-badge.delivery {
		background: #dcfce7;
		color: #16a34a;
	}
	
	.status-badge.assigned {
		background: #ede9fe;
		color: #7c3aed;
	}

	.status-badge.loading {
		background: #fef3c7;
		color: #d97706;
	}

	.status-badge.unloading {
		background: #dcfce7;
		color: #16a34a;
	}
</style> 