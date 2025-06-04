<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Assignment, Driver } from '../types/dispatch-page.types';

	export let isOpen: boolean = false;
	export let selectedAssignment: Assignment | null = null;
	export let availableDrivers: Driver[];
	export let selectedDriver: string = '';

	const dispatch = createEventDispatcher<{
		'assign-driver': void;
		'cancel-assignment': void;
		'driver-selection-change': { driverId: string };
	}>();

	function handleAssignDriver() {
		dispatch('assign-driver');
	}

	function handleCancelAssignment() {
		dispatch('cancel-assignment');
	}

	function handleDriverSelectionChange(driverId: string) {
		selectedDriver = driverId;
		dispatch('driver-selection-change', { driverId });
	}

	function handleOverlayClick() {
		handleCancelAssignment();
	}

	function handleModalClick(event: MouseEvent) {
		event.stopPropagation();
	}
</script>

{#if isOpen}
	<div class="modal-overlay" on:click={handleOverlayClick}>
		<div class="assignment-modal" on:click={handleModalClick}>
			<div class="modal-header">
				<h3>Assign Driver to Route</h3>
				<button class="close-btn" on:click={handleCancelAssignment}>×</button>
			</div>
			
			<div class="modal-content">
				<div class="assignment-details">
					<h4>Route Details</h4>
					<p><strong>Route:</strong> {selectedAssignment?.route}</p>
					<p><strong>Pickup Time:</strong> {selectedAssignment?.pickupTime}</p>
					<p><strong>Duration:</strong> {selectedAssignment?.estimatedDuration}</p>
					<p><strong>Priority:</strong> <span class="priority-badge {selectedAssignment?.priority}">{selectedAssignment?.priority.toUpperCase()}</span></p>
				</div>
				
				<div class="driver-selection">
					<h4>Select Available Driver</h4>
					<div class="driver-options">
						{#each availableDrivers as driver}
							<label class="driver-option">
								<input 
									type="radio" 
									bind:group={selectedDriver} 
									value={driver.id}
									on:change={() => handleDriverSelectionChange(driver.id)}
								/>
								<div class="driver-card">
									<span class="driver-name">{driver.name}</span>
									<span class="driver-hours">{driver.hoursRemaining}h remaining</span>
									<span class="driver-location">{driver.lastLocation}</span>
								</div>
							</label>
						{/each}
					</div>
				</div>
			</div>
			
			<div class="modal-actions">
				<button class="cancel-btn" on:click={handleCancelAssignment}>Cancel</button>
				<button class="confirm-btn" on:click={handleAssignDriver} disabled={!selectedDriver}>
					Assign Driver
				</button>
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
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.assignment-modal {
		background: white;
		border-radius: 16px;
		width: 90%;
		max-width: 600px;
		max-height: 90vh;
		overflow: hidden;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px;
		border-bottom: 1px solid #e2e8f0;
		background: #f8fafc;
	}

	.modal-header h3 {
		font-size: 18px;
		font-weight: 600;
		color: #1e293b;
		margin: 0;
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 24px;
		cursor: pointer;
		color: #64748b;
		padding: 4px;
	}

	.modal-content {
		padding: 24px;
		max-height: 60vh;
		overflow-y: auto;
	}

	.assignment-details, .driver-selection {
		margin-bottom: 24px;
	}

	.assignment-details h4, .driver-selection h4 {
		font-size: 16px;
		font-weight: 600;
		color: #1e293b;
		margin: 0 0 12px 0;
	}

	.assignment-details p {
		margin: 8px 0;
		color: #64748b;
	}

	.priority-badge {
		padding: 2px 6px;
		border-radius: 4px;
		font-size: 11px;
		font-weight: 600;
	}

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

	.driver-options {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.driver-option {
		display: block;
		cursor: pointer;
	}

	.driver-option input {
		display: none;
	}

	.driver-card {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 16px;
		border: 2px solid #e2e8f0;
		border-radius: 8px;
		transition: all 0.2s ease;
	}

	.driver-option:has(input:checked) .driver-card {
		border-color: #475569;
		background: #f8fafc;
	}

	.driver-card:hover {
		border-color: #94a3b8;
	}

	.driver-hours, .driver-location {
		font-size: 12px;
		color: #64748b;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
		padding: 24px;
		border-top: 1px solid #e2e8f0;
		background: #f8fafc;
	}

	.cancel-btn, .confirm-btn {
		padding: 12px 24px;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.cancel-btn {
		background: #f1f5f9;
		color: #64748b;
		border: 1px solid #e2e8f0;
	}

	.confirm-btn {
		background: #475569;
		color: white;
		border: none;
	}

	.confirm-btn:disabled {
		background: #94a3b8;
		cursor: not-allowed;
	}

	.confirm-btn:not(:disabled):hover {
		background: #334155;
		transform: translateY(-1px);
	}

	@media (max-width: 768px) {
		.assignment-modal {
			width: 95%;
			margin: 20px;
		}

		.modal-content {
			padding: 16px;
		}
	}
</style> 