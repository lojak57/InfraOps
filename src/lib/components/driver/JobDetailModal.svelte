<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 1042 lines → @current-size: ~180 lines  
@phase: Phase 1 - Critical Components
@extractors: JobSpecifications, RouteOverview, JobStatusActions, job-calculations.ts, job-detail.types.ts
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { X } from 'lucide-svelte';
	import JobSpecifications from './job-detail/JobSpecifications.svelte';
	import RouteOverview from './job-detail/RouteOverview.svelte';
	import JobStatusActions from './job-detail/JobStatusActions.svelte';
	import { 
		calculateDistance, 
		calculateTravelTime, 
		getPriorityColor, 
		getPriorityLabel,
		toggleBodyScroll 
	} from './job-detail/utils/job-calculations.js';
	import type { ScheduledJob, Location, JobDetailActions } from './job-detail/types/job-detail.types.js';

	const dispatch = createEventDispatcher();

	// Props
	export let job: ScheduledJob;
	export let isOpen = false;

	// Current location mock - would come from GPS in production
	let currentLocation: Location = {
		lat: 29.7604,
		lng: -95.3698,
		address: 'Houston Dispatch Yard'
	};

	// Reactive calculations
	$: distanceToPickup = job ? calculateDistance(
		currentLocation.lat, 
		currentLocation.lng, 
		job.pickupLocation.coordinates.lat, 
		job.pickupLocation.coordinates.lng
	) : 0;

	$: estimatedTravelTime = calculateTravelTime(distanceToPickup);

	// Action handlers
	const actions: JobDetailActions = {
		closeModal: () => {
			dispatch('close');
		},
		
		startJob: () => {
			dispatch('start-navigation', { job });
			actions.closeModal();
		},
		
		callCustomer: () => {
			// In production: initiate phone call
			console.log('Calling customer:', job.customerContact.phone);
		}
	};

	// Manage scroll behavior
	$: toggleBodyScroll(isOpen);
</script>

{#if isOpen && job}
	<div class="modal-overlay" role="dialog" aria-modal="true">
		<div class="modal-container">
			<!-- Modal Header -->
			<div class="modal-header">
				<div class="header-content">
					<div class="job-title-section">
						<h2 class="job-title">Job Details</h2>
						<div class="job-meta">
							<span class="job-id">Ticket #{job.id}</span>
							<div class="customer-banner">{job.accountName}</div>
							<div class="priority-badge" style="background-color: {getPriorityColor(job.priority)}">
								{getPriorityLabel(job.priority)}
							</div>
						</div>
					</div>
					<button class="close-btn tap-target" on:click={actions.closeModal} aria-label="Close">
						<X size={24} />
					</button>
				</div>
			</div>

			<!-- Modal Content -->
			<div class="modal-content">
				<!-- Account Information -->
				<div class="account-section">
					<div class="account-header" style="background-color: {job.accountColor}15; border-color: {job.accountColor}30;">
						<div class="account-indicator" style="background-color: {job.accountColor}"></div>
						<div class="account-details">
							<h3 class="account-name">{job.accountName}</h3>
							<p class="account-type">Energy Company</p>
						</div>
					</div>
				</div>

				<!-- Job Specifications Component -->
				<JobSpecifications {job} />

				<!-- Route Overview Component -->
				<RouteOverview 
					{job} 
					{currentLocation} 
					{distanceToPickup} 
					{estimatedTravelTime} 
				/>

				<!-- Job Status & Actions Component -->
				<JobStatusActions {job} {actions} />
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(4px);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
		overflow-y: auto;
	}

	.modal-container {
		background: white;
		border-radius: 20px;
		width: 100%;
		max-width: 480px;
		max-height: 90vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
	}

	.modal-header {
		background: #1e293b;
		color: white;
		padding: 1.5rem;
		flex-shrink: 0;
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.job-title-section {
		flex: 1;
	}

	.job-title {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0 0 0.75rem 0;
	}

	.job-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}

	.job-id {
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.25rem 0.5rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 0.25rem;
		color: #e2e8f0;
	}

	.customer-banner {
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.25rem 0.5rem;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 0.25rem;
		color: white;
	}

	.priority-badge {
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		color: white;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.close-btn {
		background: rgba(255, 255, 255, 0.1);
		border: none;
		border-radius: 0.375rem;
		color: white;
		cursor: pointer;
		padding: 0.5rem;
		transition: background-color 0.2s;
		flex-shrink: 0;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.tap-target {
		min-height: 44px;
		min-width: 44px;
	}

	.modal-content {
		flex: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	.account-section {
		padding: 1.5rem;
		border-bottom: 1px solid #f1f5f9;
	}

	.account-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid;
		border-radius: 0.5rem;
	}

	.account-indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.account-details {
		flex: 1;
	}

	.account-name {
		font-size: 1rem;
		font-weight: 600;
		color: #1e293b;
		margin: 0 0 0.25rem 0;
	}

	.account-type {
		font-size: 0.75rem;
		color: #64748b;
		margin: 0;
	}
</style> 