<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import LoadStatusCard from './LoadStatusCard.svelte';
  import RouteOverviewCard from './RouteOverviewCard.svelte';
  import type { DestinationInfo, RouteData, LoadStatus } from './to-delivery-step.types';

  export let deliverySubStep: string;
  export let destinationInfo: DestinationInfo;
  export let routeData: RouteData;
  export let loadStatus: LoadStatus;
  export let eventHandlers: any;

  const dispatch = createEventDispatcher();

  function handleBackToSchedule() {
    dispatch('substep-change', 'delivery-schedule');
  }

  function handleBackToDetails() {
    dispatch('substep-change', 'delivery-details');
  }
</script>

<div class="navigation-planning-content">
  <div class="navigation-header">
    {#if deliverySubStep === 'delivery-details'}
      <h2>🎯 Navigate to Delivery Site</h2>
      <p>Loaded with {loadStatus.volume} units - Navigate to {destinationInfo.name} for unpickup</p>
    {:else if deliverySubStep === 'delivery-route'}
      <h2>Delivery Route Planning</h2>
      <p>Final route review before transit to delivery location</p>
    {/if}
  </div>
  
  {#if deliverySubStep === 'delivery-details'}
    <LoadStatusCard {loadStatus} />
  {/if}
  
  <RouteOverviewCard {destinationInfo} {routeData} />
  
  <div class="navigation-actions">
    {#if deliverySubStep === 'delivery-details'}
      <button class="nav-btn secondary" on:click={handleBackToSchedule}>
        ← Back to Delivery Schedule
      </button>
    {:else if deliverySubStep === 'delivery-route'}
      <button class="nav-btn secondary" on:click={handleBackToDetails}>
        ← Back to Route Details
      </button>
    {/if}
    <button class="nav-btn primary" on:click={eventHandlers.handleStartTransitToDelivery}>
      🚛 Start Transit
    </button>
  </div>
</div>

<style>
  .navigation-planning-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .navigation-header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .navigation-header h2 {
    font-size: 2rem;
    color: #1f2937;
    margin-bottom: 8px;
  }
  
  .navigation-header p {
    color: #6b7280;
    font-size: 1.1rem;
  }
  
  .navigation-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
  }
  
  .nav-btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }
  
  .nav-btn.primary {
    background: #3b82f6;
    color: white;
  }
  
  .nav-btn.secondary {
    background: #f3f4f6;
    color: #374151;
  }
  
  .nav-btn:hover {
    transform: translateY(-1px);
  }
</style> 