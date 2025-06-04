<script lang="ts">
	import { AlertTriangle } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import CollapsibleSection from '$lib/components/ui/CollapsibleSection.svelte';
	import type { UnavailableDriver } from '../types/dispatch-page.types';

	export let unavailableDrivers: UnavailableDriver[];
	export let isOpen: boolean = false;

	const dispatch = createEventDispatcher<{
		'toggle-section': { isOpen: boolean };
	}>();

	function handleSectionToggle(event: CustomEvent) {
		dispatch('toggle-section', event.detail);
	}
</script>

<CollapsibleSection 
	title="Out of Service"
	count={unavailableDrivers.length}
	icon={AlertTriangle}
	defaultOpen={isOpen}
	on:toggle={handleSectionToggle}
>
	<div class="unavailable-list p-4">
		{#each unavailableDrivers as driver}
			<div class="unavailable-item flex items-center justify-between p-3 border-b border-slate-100 last:border-b-0">
				<div class="unavailable-info">
					<span class="driver-name font-medium text-slate-800 block">{driver.name}</span>
					<span class="unavailable-reason text-sm text-red-600">{driver.reason}</span>
				</div>
				<div class="return-date text-sm text-slate-500">Returns {driver.returnDate}</div>
			</div>
		{/each}
	</div>
</CollapsibleSection> 