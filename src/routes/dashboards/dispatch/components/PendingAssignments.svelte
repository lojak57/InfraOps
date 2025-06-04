<script lang="ts">
	import { Clock } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import CollapsibleSection from '$lib/components/ui/CollapsibleSection.svelte';
	import type { Assignment } from '../types/dispatch-page.types';

	export let pendingAssignments: Assignment[];
	export let isOpen: boolean = true;

	const dispatch = createEventDispatcher<{
		'toggle-section': { isOpen: boolean };
		'open-assignment': { assignment: Assignment };
	}>();

	$: pendingCount = pendingAssignments.length;
	$: hasPendingAssignments = pendingCount > 0;

	function handleSectionToggle(event: CustomEvent) {
		dispatch('toggle-section', event.detail);
	}

	function handleOpenAssignment(assignment: Assignment) {
		dispatch('open-assignment', { assignment });
	}
</script>

<CollapsibleSection 
	title="🚨 Pending Assignments"
	count={pendingCount}
	icon={Clock}
	defaultOpen={isOpen}
	highlight={true}
	flashIf={hasPendingAssignments}
	urgent={true}
	on:toggle={handleSectionToggle}
>
	<div class="assignments-list p-4">
		{#each pendingAssignments as assignment}
			<div class="assignment-item mb-4 p-4 border border-slate-200 rounded-lg last:mb-0">
				<div class="assignment-info mb-2">
					<span class="assignment-route font-semibold text-slate-800 block">{assignment.route}</span>
					<span class="assignment-details text-sm text-slate-600">
						Pickup: {assignment.pickupTime} • Duration: {assignment.estimatedDuration}
					</span>
				</div>
				<div class="assignment-actions flex items-center justify-between">
					<span class="priority-badge {assignment.priority} px-2 py-1 rounded text-xs font-semibold uppercase">
						{assignment.priority}
					</span>
					<button 
						class="assign-btn px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors" 
						on:click={() => handleOpenAssignment(assignment)}
					>
						Assign Driver
					</button>
				</div>
			</div>
		{/each}
	</div>
</CollapsibleSection>

<style>
	/* Priority Badge Styles */
	.priority-badge.high {
		background: #fecaca;
		color: #dc2626;
		border: 1px solid #fca5a5;
	}
	
	.priority-badge.normal {
		background: #e0e7ff;
		color: #3730a3;
		border: 1px solid #c7d2fe;
	}
	
	.priority-badge.low {
		background: #f3f4f6;
		color: #6b7280;
		border: 1px solid #e5e7eb;
	}
</style> 