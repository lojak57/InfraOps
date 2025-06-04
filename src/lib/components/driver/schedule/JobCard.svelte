<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 613 lines → @current-size: ~60 lines  
@phase: Phase 6 - Driver Components
@extractors: PriorityBar, TimeUnitsSection, RouteDisplay, ActionSection, job-card.types.ts, job-card-utils.ts
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import PriorityBar from './components/PriorityBar.svelte';
	import TimeUnitsSection from './components/TimeUnitsSection.svelte';
	import RouteDisplay from './components/RouteDisplay.svelte';
	import ActionSection from './components/ActionSection.svelte';
	import { isJobOverdue, isJobSoon } from './utils/job-card-utils.js';
	import type { ScheduledJob, JobCardEvents } from './types/job-card.types.js';

	const dispatch = createEventDispatcher<JobCardEvents>();

	// Props
	export let job: ScheduledJob;
	export let index: number;

	function selectJob() {
		dispatch('job-selected', { job });
	}
</script>

<div 
	class="job-card tap-target {isJobOverdue(job.scheduledTime) ? 'overdue' : ''} {isJobSoon(job.scheduledTime) ? 'soon' : ''}"
	on:click={selectJob}
	role="button"
	tabindex="0"
>
	<!-- Priority indicator bar -->
	<PriorityBar priority={job.priority} />

	<!-- Main card content -->
	<div class="card-content">
		<!-- Left section: Time and Units -->
		<TimeUnitsSection {job} />

		<!-- Center section: Route and Account -->
		<RouteDisplay {job} />

		<!-- Right section: Status and Action -->
		<ActionSection {job} />
	</div>
</div>

<style>
	.job-card {
		background: white;
		border: 1px solid #e2e8f0;
		border-left: none;
		border-radius: 12px;
		overflow: hidden;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		margin-bottom: 2px;
	}

	.job-card:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		border-color: #cbd5e1;
	}

	.job-card:hover :global(.view-details-btn) {
		background: #dbeafe;
		border-color: #93c5fd;
		transform: translateX(2px);
	}

	.card-content {
		display: grid;
		grid-template-columns: 84px 1fr 96px;
		column-gap: 24px;
		padding: 20px 16px;
		align-items: center;
		min-height: 100px;
	}

	.tap-target {
		min-height: 44px;
	}

	/* Mobile Responsive */
	@media (max-width: 640px) {
		.card-content {
			grid-template-columns: auto 1fr;
			grid-template-rows: auto auto;
			gap: 12px;
			padding: 12px;
		}

		.card-content :global(.time-units-section) {
			grid-column: 1;
			grid-row: 1;
		}

		.card-content :global(.route-display) {
			grid-column: 1 / -1;
			grid-row: 2;
		}

		.card-content :global(.action-section) {
			grid-column: 2;
			grid-row: 1;
		}
	}
</style> 