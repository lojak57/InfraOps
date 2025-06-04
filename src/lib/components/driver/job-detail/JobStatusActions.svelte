<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 1042-line component → @current-size: ~100 lines  
@phase: Phase 1 - Critical Components
@extractors: JobStatusActions from JobDetailModal.svelte
-->
<script lang="ts">
	import { Clock, CheckCircle, AlertCircle, User, Phone } from 'lucide-svelte';
	import { formatTime, getTimeUntilJob, isJobReady } from './utils/job-calculations.js';
	import type { ScheduledJob, JobDetailActions } from './types/job-detail.types.js';
	
	// Props
	export let job: ScheduledJob;
	export let actions: JobDetailActions;
	
	$: jobReady = isJobReady(job.scheduledTime);
</script>

<!-- Special Instructions -->
{#if job.specialInstructions}
	<div class="instructions-section">
		<h4 class="section-title">Special Instructions</h4>
		<div class="instructions-card">
			<AlertCircle size={18} />
			<p class="instructions-text">{job.specialInstructions}</p>
		</div>
	</div>
{/if}

<!-- Emergency Contact -->
<div class="contact-section">
	<h4 class="section-title">Emergency Contact</h4>
	<div class="contact-card">
		<div class="contact-info">
			<User size={18} />
			<div class="contact-details">
				<span class="contact-name">{job.customerContact.name}</span>
				<span class="contact-phone">{job.customerContact.phone}</span>
			</div>
		</div>
		<button class="call-btn tap-target" on:click={actions.callCustomer}>
			<Phone size={16} />
			<span>Call</span>
		</button>
	</div>
</div>

<!-- Job Status -->
<div class="status-section">
	<div class="status-indicator">
		{#if jobReady}
			<CheckCircle size={20} class="status-icon ready" />
			<div class="status-text">
				<span class="status-title">Ready to Start</span>
				<span class="status-subtitle">You can begin this job now</span>
			</div>
		{:else}
			<Clock size={20} class="status-icon waiting" />
			<div class="status-text">
				<span class="status-title">Scheduled for {formatTime(job.scheduledTime)}</span>
				<span class="status-subtitle">Starts in {getTimeUntilJob(job.scheduledTime)}</span>
			</div>
		{/if}
	</div>
</div>

<!-- Modal Actions -->
<div class="modal-actions">
	<button 
		class="start-btn tap-target {jobReady ? 'enabled' : 'disabled'}"
		disabled={!jobReady}
		on:click={actions.startJob}
	>
		{#if jobReady}
			<CheckCircle size={18} />
			<span>Start Job</span>
		{:else}
			<Clock size={18} />
			<span>Not Ready</span>
		{/if}
	</button>
</div>

<style>
	.instructions-section {
		padding: 1.5rem;
		border-bottom: 1px solid #f1f5f9;
	}

	.section-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 1rem;
	}

	.instructions-card {
		display: flex;
		gap: 0.75rem;
		padding: 1rem;
		background: #fef7f0;
		border: 1px solid #fed7aa;
		border-radius: 0.5rem;
		color: #9a3412;
	}

	.instructions-text {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.contact-section {
		padding: 1.5rem;
		border-bottom: 1px solid #f1f5f9;
	}

	.contact-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
	}

	.contact-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.contact-details {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.contact-name {
		font-size: 0.875rem;
		font-weight: 600;
		color: #1e293b;
	}

	.contact-phone {
		font-size: 0.75rem;
		color: #64748b;
		font-family: monospace;
	}

	.call-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: #3b82f6;
		color: white;
		border: none;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.call-btn:hover {
		background: #2563eb;
	}

	.tap-target {
		min-height: 44px;
		min-width: 44px;
	}

	.status-section {
		padding: 1.5rem;
		border-bottom: 1px solid #f1f5f9;
	}

	.status-indicator {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
	}

	.status-text {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.status-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: #1e293b;
	}

	.status-subtitle {
		font-size: 0.75rem;
		color: #64748b;
	}

	:global(.status-icon.ready) {
		color: #22c55e;
	}

	:global(.status-icon.waiting) {
		color: #f59e0b;
	}

	.modal-actions {
		padding: 1.5rem;
		background: #f8fafc;
		border-top: 1px solid #e2e8f0;
	}

	.start-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		border: none;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}

	.start-btn.enabled {
		background: #22c55e;
		color: white;
	}

	.start-btn.enabled:hover {
		background: #16a34a;
		transform: translateY(-1px);
	}

	.start-btn.disabled {
		background: #f1f5f9;
		color: #94a3b8;
		cursor: not-allowed;
	}
</style> 