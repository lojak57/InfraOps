<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TransitMetricsGrid from './TransitMetricsGrid.svelte';
  import TransitDestinationInfo from './TransitDestinationInfo.svelte';
  import TransitMapSection from './TransitMapSection.svelte';
  import TransitQuickActions from './TransitQuickActions.svelte';
  import type { DestinationInfo, RouteData, TransitMetrics, NavigationInstruction } from './to-delivery-step.types';

  export let transitType: 'pickup' | 'dropoff';
  export let sharedState: any;
  export let destinationInfo: DestinationInfo;
  export let routeData: RouteData;
  export let metrics: TransitMetrics;
  export let navigationInstruction: NavigationInstruction;
  export let eventHandlers: any;

  const dispatch = createEventDispatcher();

  function handleExitTransit() {
    dispatch('exit-transit');
  }

  function handleArrival() {
    console.log('✅ Arrived at Delivery Site, advancing to Unload Step');
    if (sharedState?.jobProgress) {
      sharedState.jobProgress = 'readyToUnload';
    }
    eventHandlers.handleArriveAtDelivery();
  }
</script>

<div class="in-transit-content">
  <div class="transit-header">
    <button class="exit-transit-btn" on:click={handleExitTransit}>
      ← Exit Transit
    </button>
    <div class="transit-title">
      <h1>{transitType === 'pickup' ? 'IN TRANSIT TO PICKUP' : 'IN TRANSIT TO DELIVERY'}</h1>
      <span class="job-id">#{sharedState.activeJob?.id || 'J08-002-DEL'}</span>
    </div>
  </div>
  
  <TransitMetricsGrid {metrics} />
  
  <TransitDestinationInfo {destinationInfo} {routeData} />
  
  <TransitMapSection {navigationInstruction} />
  
  <TransitQuickActions />
  
  <div class="transit-actions">
    <button class="arrive-btn" on:click={handleArrival}>
      🎯 Arrive at {transitType === 'pickup' ? 'Pickup' : 'Delivery'} Site
    </button>
  </div>
</div>

<style>
  .in-transit-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .transit-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }
  
  .transit-title h1 {
    font-size: 2.5rem;
    color: #1f2937;
    margin: 0;
  }
  
  .job-id {
    color: #6b7280;
    font-size: 1rem;
  }
  
  .exit-transit-btn {
    background: #f3f4f6;
    color: #374151;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
  }
  
  .exit-transit-btn:hover {
    background: #e5e7eb;
  }
  
  .arrive-btn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    width: 100%;
    margin-top: 24px;
  }
  
  .arrive-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
  }
  
  .transit-actions {
    margin-top: 24px;
  }
</style> 