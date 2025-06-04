<script lang="ts">
	import { Phone } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		'emergency-contact': void;
	}>();

	function handleEmergencyContact() {
		dispatch('emergency-contact');
	}
</script>

<div class="dispatch-header bg-slate-800 text-white">
	<div class="header-content">
		<div class="header-text">
			<h1 class="header-title text-xl font-semibold">Dispatch Operations Center</h1>
			<p class="header-subtitle text-slate-300">Real-time fleet coordination and route management</p>
		</div>
		<div class="header-actions">
			<button class="emergency-btn" on:click={handleEmergencyContact}>
				<Phone size={16} />
				Emergency Contact
			</button>
		</div>
	</div>
</div>

<style>
	.dispatch-header {
		border-radius: 16px;
		margin: 20px;
		padding: 24px 32px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header-text h1 {
		margin: 0 0 4px 0;
	}

	.header-text p {
		margin: 0;
	}

	.emergency-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 20px;
		background: #ef4444;
		color: white;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.emergency-btn:hover {
		background: #dc2626;
		transform: translateY(-1px);
	}

	@media (max-width: 1024px) {
		.header-content {
			flex-direction: column;
			gap: 16px;
			text-align: center;
		}
	}

	@media (max-width: 768px) {
		.dispatch-header {
			margin: 12px;
			padding: 20px;
		}

		.header-text h1 {
			font-size: 24px;
		}
	}
</style> 