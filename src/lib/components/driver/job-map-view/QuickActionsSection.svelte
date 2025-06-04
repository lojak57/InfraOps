<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Phone, AlertCircle, Truck } from 'lucide-svelte';

	export let job: any;
	export let onStartTransit: (job: any) => void;

	const dispatch = createEventDispatcher();

	function callDispatch() {
		console.log('Calling dispatch...');
	}

	function callEmergency() {
		console.log('Calling emergency contact:', job.customerContact?.phone);
	}

	function reportIssue() {
		console.log('Reporting issue...');
	}

	function handleStartTransit() {
		onStartTransit(job);
		dispatch('start-transit', { job });
	}
</script>

<div class="actions-section">
	<h3 class="section-title">Quick Actions</h3>
	<div class="action-buttons">
		<button class="action-btn dispatch tap-target" on:click={callDispatch}>
			<Phone size={16} />
			<span>Call Dispatch</span>
		</button>
		<button class="action-btn customer tap-target" on:click={callEmergency}>
			<Phone size={16} />
			<span>Emergency Contact</span>
		</button>
		<button class="action-btn issue tap-target" on:click={reportIssue}>
			<AlertCircle size={16} />
			<span>Report Issue</span>
		</button>
		<button class="action-btn transit tap-target" on:click={handleStartTransit}>
			<Truck size={16} />
			<span>Start Transit</span>
		</button>
	</div>
</div>

<style>
	.actions-section {
		padding: 20px;
		margin-top: auto;
	}

	.section-title {
		font-size: 16px;
		font-weight: 600;
		color: #1e293b;
		margin: 0 0 12px 0;
	}

	.action-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 12px;
		border: none;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.action-btn.dispatch {
		background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
		color: white;
	}

	.action-btn.customer {
		background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
		color: white;
	}

	.action-btn.issue {
		background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
		color: white;
	}

	.action-btn.transit {
		background: linear-gradient(135deg, #059669 0%, #047857 100%);
		color: white;
		grid-column: 1 / -1;
	}

	.action-btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 768px) {
		.action-buttons {
			grid-template-columns: 1fr;
		}

		.action-btn.transit {
			grid-column: 1;
		}
	}
</style> 