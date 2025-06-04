<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  
  // Import orchestrator components
  import TransitScheduleView from './to-transit-step/TransitScheduleView.svelte';
  import TransitPlanningView from './to-transit-step/TransitPlanningView.svelte';
  import TransitView from './to-transit-step/TransitView.svelte';
  
  const dispatch = createEventDispatcher();
  export let transitType: 'pickup' | 'delivery' = 'pickup';
  export let pickupSubStep: string = '';
  export let deliverySubStep: string = '';
  export let sharedState: any;
  export let eventHandlers: any;
  
  // Get the correct substep based on transitType
  $: currentSubStep = transitType === 'pickup' ? pickupSubStep : deliverySubStep;
  
  onMount(() => {
    console.log(`📍 ToTransitStep mounted, type: ${transitType}, substep: ${currentSubStep}`);
    // Ensure scroll to top with longer delay to avoid conflicts
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  });
  
  // Dynamic data based on transitType
  $: currentLocation = {
    lat: transitType === 'pickup' ? 35.0000 : 35.5000,
    lng: transitType === 'pickup' ? -98.0000 : -97.5000,
    address: transitType === 'pickup' ? 'En Route to Production Site' : 'En Route to Processing Terminal'
  };
  
  $: destination = transitType === 'pickup'
    ? {
        name: sharedState.activeJob?.pickupSiteName || 'Production Site Alpha',
        address: sharedState.activeJob?.pickupAddress || '123 Industrial Blvd, Metro City, ST 12345',
        coordinates: { lat: 35.0000, lng: -98.0000 }
      }
    : {
        name: sharedState.activeJob?.deliverySiteName || 'Processing Terminal Beta',
        address: sharedState.activeJob?.deliveryAddress || '456 Manufacturing Ave, Industrial City, ST 54321',
        coordinates: { lat: 35.5000, lng: -97.5000 }
      };
  
  // Dynamic headers and content
  $: headerTitle = transitType === 'pickup' 
    ? 'Drive to Pickup Site' 
    : 'Loaded & Ready for Delivery';
    
  $: headerDescription = transitType === 'pickup'
    ? 'Review your pickup jobs and plan your route to the selected site'
    : 'Tank loaded - Plan your delivery route and navigate to offload site';
    
  $: transitTitle = transitType === 'pickup' 
    ? 'IN TRANSIT TO PICKUP' 
    : 'IN TRANSIT TO DELIVERY';
    
  $: arriveButtonText = transitType === 'pickup'
    ? 'Arrive at Pickup Site'
    : 'Arrive at Delivery Site';
  
  // Helper function to calculate realistic ETA
  function getCurrentETA() {
    const now = new Date();
    const addMinutes = transitType === 'pickup' ? 32 : 42;
    now.setMinutes(now.getMinutes() + addMinutes);
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }
  
  // Dynamic distance and time
  $: routeStats = transitType === 'pickup' 
    ? { distance: '18.2 mi', time: '32 min' }
    : { distance: '23.4 mi', time: '42 min' };
</script>

<div class="workflow-view to-transit {transitType}">
  {#if currentSubStep === (transitType + '-schedule') || currentSubStep === 'job-selection'}
    <TransitScheduleView {transitType} {eventHandlers} />
    
  {:else if currentSubStep === (transitType + '-details') || currentSubStep === 'navigation'}
    <TransitPlanningView {transitType} {sharedState} {eventHandlers} />
    
  {:else if currentSubStep === (transitType + '-transit') || currentSubStep === 'in-transit'}
    <TransitView {transitType} {sharedState} {eventHandlers} />
  {/if}
</div>

<style>
  .workflow-view {
    padding: 24px;
    background: #ffffff;
    min-height: 100vh;
  }
  
  .workflow-view.to-transit.delivery :global(.in-transit-view) {
    background: #1f2937;
  }
</style> 