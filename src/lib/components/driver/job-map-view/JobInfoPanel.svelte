<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import JobStepsProgress from '../job-map/JobStepsProgress.svelte';
	import JobMetrics from '../job-map/JobMetrics.svelte';
	import LoadDetailsSection from './LoadDetailsSection.svelte';
	import SpecialInstructionsSection from './SpecialInstructionsSection.svelte';
	import QuickActionsSection from './QuickActionsSection.svelte';
	import type { JobDetails } from './types/map-view.types';

	export let job: JobDetails;
	export let onExitMap: () => void;
	export let onStepCompleted: (event: CustomEvent) => void;
	export let onStartTransit: (job: JobDetails) => void;
</script>

<div class="job-info-panel">
	<!-- Header -->
	<div class="panel-header">
		<button class="back-btn tap-target" on:click={onExitMap}>
			<ArrowLeft size={16} />
			<span>Back to Dashboard</span>
		</button>
		<span class="job-id">Job #{job.id}</span>
	</div>

	<!-- Job Progress -->
	<JobStepsProgress on:step-completed={onStepCompleted} />

	<!-- Live Metrics -->
	<JobMetrics {job} />

	<!-- Load Information -->
	<LoadDetailsSection {job} />

	<!-- Special Instructions -->
	{#if job.specialInstructions}
		<SpecialInstructionsSection instructions={job.specialInstructions} />
	{/if}

	<!-- Quick Actions -->
	<QuickActionsSection {job} {onStartTransit} />
</div>

<style>
	.job-info-panel {
		width: 50%;
		background: linear-gradient(135deg, #f8fafc 0%, #f0f9f0 50%, #e8f5e8 100%);
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.panel-header {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		padding: 16px 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.back-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		background: rgba(59, 130, 246, 0.1);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 8px;
		color: #3b82f6;
		padding: 8px 12px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.back-btn:hover {
		background: rgba(59, 130, 246, 0.2);
		transform: translateY(-1px);
	}

	.job-id {
		font-family: 'JetBrains Mono', monospace;
		font-size: 14px;
		color: #6b7280;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.job-info-panel {
			width: 100%;
			height: 50vh;
		}
	}
</style> 