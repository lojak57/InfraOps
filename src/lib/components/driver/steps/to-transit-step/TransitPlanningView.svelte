<script lang="ts">
	import LoadStatusCard from './LoadStatusCard.svelte';
	import SiteDetailsCard from './SiteDetailsCard.svelte';
	import RouteDetailsCard from './RouteDetailsCard.svelte';
	import { getDestination, getRouteStats } from './utils/to-transit-step-utils';

	export let transitType: 'pickup' | 'delivery';
	export let sharedState: any;
	export let eventHandlers: any;

	$: destination = getDestination(transitType, sharedState);
	$: routeStats = getRouteStats(transitType);
</script>

<div class="navigation-planning-content">
	<div class="navigation-header">
		<h2>🎯 Navigate to {transitType === 'pickup' ? 'Pickup' : 'Delivery'} Site</h2>
		<p>
			{#if transitType === 'pickup'}
				Navigate to well pad for pickup
			{:else}
				Loaded with {sharedState.activeJob?.deliveryVolume || '120'} units - Navigate to {destination.name} for unpickup
			{/if}
		</p>
	</div>
	
	<!-- Load Status for Delivery -->
	{#if transitType === 'delivery'}
		<LoadStatusCard {sharedState} />
	{/if}
	
	<!-- Site Details -->
	<SiteDetailsCard {transitType} {destination} {sharedState} />
	
	<!-- Route Details -->
	<RouteDetailsCard {routeStats} {transitType} />
	
	<div class="primary-actions">
		<button 
			class="action-btn primary" 
			on:click={() => {
				if (transitType === 'pickup') {
					eventHandlers.handleStartTransit && eventHandlers.handleStartTransit();
				} else {
					eventHandlers.handleStartTransitToDelivery && eventHandlers.handleStartTransitToDelivery();
				}
			}}
		>
			Start Transit
		</button>
	</div>
</div>

<style>
	.navigation-planning-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.navigation-header {
		text-align: center;
		margin-bottom: 32px;
	}

	.navigation-header h2 {
		font-size: 1.875rem;
		font-weight: 700;
		color: #1f2937;
		margin-bottom: 12px;
	}

	.navigation-header p {
		font-size: 1.125rem;
		color: #6b7280;
	}

	.primary-actions {
		display: flex;
		justify-content: center;
		gap: 16px;
		margin-top: 32px;
	}
	
	.action-btn {
		padding: 14px 28px;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	
	.action-btn.primary {
		background: #3b82f6;
		color: #ffffff;
	}
	
	.action-btn.primary:hover {
		background: #2563eb;
	}
</style> 