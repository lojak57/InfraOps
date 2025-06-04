<script lang="ts">
	import { Truck } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import CollapsibleSection from '$lib/components/ui/CollapsibleSection.svelte';
	import type { TruckStatus } from '../types/dispatch-page.types';

	export let truckStatus: TruckStatus;
	export let isOpen: boolean = false;

	const dispatch = createEventDispatcher<{
		'toggle-section': { isOpen: boolean };
	}>();

	function handleSectionToggle(event: CustomEvent) {
		dispatch('toggle-section', event.detail);
	}
</script>

<CollapsibleSection 
	title="Fleet Status"
	count={truckStatus.total}
	icon={Truck}
	defaultOpen={isOpen}
	on:toggle={handleSectionToggle}
>
	<div class="truck-status grid grid-cols-3 gap-4 p-4">
		<div class="status-item available text-center p-3 bg-green-50 rounded-lg">
			<span class="status-number text-xl font-bold text-green-600 block">{truckStatus.available}</span>
			<span class="status-label text-sm text-green-700">Available</span>
		</div>
		<div class="status-item maintenance text-center p-3 bg-orange-50 rounded-lg">
			<span class="status-number text-xl font-bold text-orange-600 block">{truckStatus.inMaintenance}</span>
			<span class="status-label text-sm text-orange-700">Maintenance</span>
		</div>
		<div class="status-item total text-center p-3 bg-slate-50 rounded-lg">
			<span class="status-number text-xl font-bold text-slate-600 block">{truckStatus.total}</span>
			<span class="status-label text-sm text-slate-700">Total Fleet</span>
		</div>
	</div>
</CollapsibleSection>

<style>
	@media (max-width: 768px) {
		.truck-status {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 1024px) {
		.truck-status {
			grid-template-columns: 1fr 1fr;
		}
	}
</style> 