<script lang="ts">
	import { MapPin, Navigation } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let destinationName: string;
	export let distanceRemaining: number;

	function handleNavigationClick() {
		dispatch('open-navigation');
	}
</script>

<div class="map-header">
	<div class="destination-info">
		<MapPin size={16} />
		<span class="destination-name">{destinationName}</span>
		<span class="distance-remaining">{distanceRemaining} mi</span>
	</div>
	<div class="map-controls">
		<button class="nav-btn tap-target" title="Open Navigation" on:click={handleNavigationClick}>
			<Navigation size={16} />
		</button>
	</div>
</div>

<style>
	.map-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 16px;
		background: rgba(15, 23, 42, 0.95);
		border-bottom: 1px solid rgba(59, 130, 246, 0.1);
		z-index: 10;
	}

	.destination-info {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #60a5fa;
	}

	.destination-name {
		font-weight: 600;
		font-size: 14px;
	}

	.distance-remaining {
		font-size: 12px;
		color: #94a3b8;
		font-family: 'JetBrains Mono', monospace;
	}

	.map-controls {
		display: flex;
		gap: 8px;
	}

	.nav-btn {
		background: rgba(59, 130, 246, 0.1);
		border: 1px solid rgba(59, 130, 246, 0.3);
		border-radius: 6px;
		color: #60a5fa;
		padding: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		min-height: 36px;
		min-width: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-btn:hover {
		background: rgba(59, 130, 246, 0.2);
	}

	/* Tap targets for better mobile usability */
	.tap-target {
		min-height: 44px;
		min-width: 44px;
	}

	/* Tablet and desktop adjustments */
	@media (min-width: 768px) {
		.map-header {
			padding: 16px 20px;
		}

		.destination-name {
			font-size: 15px;
		}

		.distance-remaining {
			font-size: 13px;
		}
	}

	@media (min-width: 1024px) {
		.map-header {
			padding: 20px 24px;
		}
	}
</style> 