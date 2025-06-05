<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let buttonText: string = "🎯 Arrive at Delivery Site";

	function handleEndTransit() {
		dispatch('end-transit');
	}
</script>

<div class="end-transit-section">
	<button class="end-transit-btn" on:click={handleEndTransit}>
		{buttonText}
	</button>
</div>

<style>
	.end-transit-section {
		padding: 16px;
		background: rgba(15, 23, 42, 0.95);
		border-radius: 12px;
		border: 1px solid rgba(34, 197, 94, 0.2);
	}

	.end-transit-btn {
		width: 100%;
		background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
		color: white;
		border: none;
		padding: 20px 32px;
		border-radius: 12px;
		font-size: 18px;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 1px;
		box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
		min-height: 64px;
	}

	.end-transit-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 30px rgba(34, 197, 94, 0.4);
		background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
	}

	.end-transit-btn:active {
		transform: translateY(0px);
		box-shadow: 0 6px 15px rgba(34, 197, 94, 0.3);
	}
</style> 