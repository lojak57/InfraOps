<script lang="ts">
	import { Navigation } from 'lucide-svelte';
	import { formatETA, generateNavigationUrl } from './utils/map-calculations';

	export let job: any;
	export let trackingState: any;

	function openNavigation() {
		const url = generateNavigationUrl(job);
		window.open(url, '_blank');
	}
</script>

<div class="map-header">
	<div class="route-info">
		<div class="route-badge primary">
			<span class="route-distance">{job.distance} miles</span>
			<span class="route-separator">•</span>
			<span class="route-time">{Math.round(job.estimatedDuration * 60)} min</span>
		</div>
		<div class="route-status">
			<span class="status-label">Route to Pickup</span>
			<span class="eta-info">ETA: {formatETA(trackingState.estimatedArrival)}</span>
		</div>
	</div>
	<div class="map-controls">
		<button class="map-btn tap-target" on:click={openNavigation} title="Open in Navigation App">
			<Navigation size={16} />
			<span class="btn-text">Navigate</span>
		</button>
	</div>
</div>

<style>
	.map-header {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		padding: 16px 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 1000;
	}

	.route-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.route-badge {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		font-weight: 600;
	}

	.route-badge.primary {
		color: #3b82f6;
	}

	.route-separator {
		color: #cbd5e1;
	}

	.route-status {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
	}

	.status-label {
		color: #64748b;
		font-weight: 500;
	}

	.eta-info {
		color: #3b82f6;
		font-weight: 600;
	}

	.map-controls {
		display: flex;
		gap: 8px;
	}

	.map-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 12px;
		background: #3b82f6;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.map-btn:hover {
		background: #2563eb;
		transform: translateY(-1px);
	}
</style> 