<script lang="ts">
	import { 
		getCurrentLocation, 
		getDestination, 
		getTransitTitle, 
		getArriveButtonText, 
		getCurrentETA,
		getNavigationInstruction 
	} from './utils/to-transit-step-utils';

	export let transitType: 'pickup' | 'delivery';
	export let sharedState: any;
	export let eventHandlers: any;

	$: currentLocation = getCurrentLocation(transitType);
	$: destination = getDestination(transitType, sharedState);
	$: transitTitle = getTransitTitle(transitType);
	$: arriveButtonText = getArriveButtonText(transitType);
	$: eta = getCurrentETA(transitType);
	$: navigationInstruction = getNavigationInstruction(transitType);
</script>

<div class="in-transit-view">
	<div class="transit-header-dark">
		<h1>{transitTitle}</h1>
		<p class="destination-info">
			<span class="destination-name">{destination.name}</span>
			<span class="destination-address">{destination.address}</span>
		</p>
	</div>
	
	<div class="transit-status">
		<div class="current-location">
			<span class="location-label">Current Location</span>
			<span class="location-value">{currentLocation.address}</span>
		</div>
		
		<div class="navigation-instruction">
			<span class="instruction-text">{navigationInstruction.text}</span>
		</div>
		
		<div class="arrival-eta">
			<span class="eta-label">Estimated Arrival</span>
			<span class="eta-time">{eta}</span>
		</div>
	</div>
	
	<div class="transit-actions">
		<button 
			class="action-btn primary large" 
			on:click={() => {
				if (transitType === 'pickup') {
					eventHandlers.handleArriveAtPickup && eventHandlers.handleArriveAtPickup();
				} else {
					eventHandlers.handleArriveAtDelivery && eventHandlers.handleArriveAtDelivery();
				}
			}}
		>
			{arriveButtonText}
		</button>
		
		<button class="action-btn secondary" on:click={() => eventHandlers.handleEmergencyCall && eventHandlers.handleEmergencyCall()}>
			Emergency Call
		</button>
	</div>
</div>

<style>
	.in-transit-view {
		background: #1f2937;
		color: #ffffff;
		min-height: 100vh;
		padding: 0;
		display: flex;
		flex-direction: column;
	}
	
	.transit-header-dark {
		background: #111827;
		padding: 48px 24px;
		text-align: center;
	}
	
	.transit-header-dark h1 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 16px;
		color: #ffffff;
	}
	
	.destination-info {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	
	.destination-name {
		font-size: 1.5rem;
		font-weight: 600;
		color: #3b82f6;
	}
	
	.destination-address {
		font-size: 1rem;
		color: #9ca3af;
	}
	
	.transit-status {
		flex: 1;
		padding: 48px 24px;
		display: flex;
		flex-direction: column;
		gap: 32px;
		max-width: 600px;
		margin: 0 auto;
	}
	
	.current-location, .arrival-eta {
		text-align: center;
	}
	
	.location-label, .eta-label {
		display: block;
		font-size: 0.875rem;
		color: #9ca3af;
		margin-bottom: 8px;
	}
	
	.location-value, .eta-time {
		font-size: 1.25rem;
		font-weight: 600;
		color: #ffffff;
	}
	
	.navigation-instruction {
		background: #374151;
		border-radius: 12px;
		padding: 24px;
		text-align: center;
	}
	
	.instruction-text {
		font-size: 1.125rem;
		color: #ffffff;
		line-height: 1.6;
	}
	
	.transit-actions {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 400px;
		margin: 0 auto;
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
	
	.action-btn.secondary {
		background: #6b7280;
		color: #ffffff;
	}
	
	.action-btn.secondary:hover {
		background: #4b5563;
	}
	
	.action-btn.large {
		padding: 18px 36px;
		font-size: 1.125rem;
	}
</style> 