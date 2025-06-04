<script lang="ts">
	import { Users } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import CollapsibleSection from '$lib/components/ui/CollapsibleSection.svelte';
	import type { Driver } from '../types/dispatch-page.types';

	export let availableDrivers: Driver[];
	export let isOpen: boolean = true;

	const dispatch = createEventDispatcher<{
		'toggle-section': { isOpen: boolean };
	}>();

	function handleSectionToggle(event: CustomEvent) {
		dispatch('toggle-section', event.detail);
	}
</script>

<CollapsibleSection 
	title="Available Drivers"
	count={availableDrivers.length}
	icon={Users}
	defaultOpen={isOpen}
	on:toggle={handleSectionToggle}
>
	<div class="driver-list p-4">
		{#each availableDrivers as driver}
			<div class="driver-item flex items-center justify-between p-3 border-b border-slate-100 last:border-b-0">
				<div class="driver-info">
					<span class="driver-name font-medium text-slate-800 block">{driver.name}</span>
					<span class="driver-location text-sm text-slate-600">{driver.lastLocation}</span>
				</div>
				<div class="driver-hours text-right">
					<span class="hours-remaining font-semibold text-green-600">{driver.hoursRemaining}h</span>
					<span class="hours-label text-xs text-slate-500 block">remaining</span>
				</div>
			</div>
		{/each}
	</div>
</CollapsibleSection> 