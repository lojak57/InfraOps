<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import DeliveryScheduleView from './DeliveryScheduleView.svelte';
  import NavigationPlanningView from './NavigationPlanningView.svelte';
  import TransitView from './TransitView.svelte';
  import { 
    generateDestinationInfo, 
    generateRouteData, 
    generateLoadStatus, 
    generateTransitMetrics,
    generateNavigationInstruction,
    handleJobStatusUpdate
  } from './to-delivery-step-utils';
  
  const dispatch = createEventDispatcher();
  export let deliverySubStep: string;
  export let sharedState: any;
  export let eventHandlers: any;
  export let transitType: 'pickup' | 'dropoff' = 'dropoff';
  
  onMount(() => {
    console.log('📍 ToDeliveryStep mounted, substep:', deliverySubStep);
    console.log('🚛 Transit type:', transitType);
    handleJobStatusUpdate(sharedState, 'Transit to Delivery');
    window.scrollTo(0, 0);
  });

  // Computed data
  $: destinationInfo = generateDestinationInfo(transitType, sharedState);
  $: routeData = generateRouteData(sharedState);
  $: loadStatus = generateLoadStatus(sharedState);
  $: transitMetrics = generateTransitMetrics(routeData);
  $: navigationInstruction = generateNavigationInstruction(transitType);

  function handleSubstepChange(event: CustomEvent<string>) {
    deliverySubStep = event.detail;
  }
</script>

<div class="workflow-view to-delivery">
  {#if deliverySubStep === 'delivery-schedule'}
    <DeliveryScheduleView {sharedState} {eventHandlers} />
  
  {:else if deliverySubStep === 'delivery-details' || deliverySubStep === 'delivery-route'}
    <NavigationPlanningView 
      {deliverySubStep}
      {destinationInfo}
      {routeData}
      {loadStatus}
      {eventHandlers}
      on:substep-change={handleSubstepChange}
    />
  
  {:else if deliverySubStep === 'delivery-transit'}
    <TransitView
      {transitType}
      {sharedState}
      {destinationInfo}
      {routeData}
      metrics={transitMetrics}
      {navigationInstruction}
      {eventHandlers}
      on:exit-transit
    />
  {/if}
</div>

<style>
  .workflow-view {
    padding: 24px;
    overflow-y: auto;
    height: 100%;
  }
</style> 