<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import DriverSchedule from '../DriverSchedule.svelte';
  import LoadCalculator from '../LoadCalculator.svelte';
  import DeliveryStatusBanner from './DeliveryStatusBanner.svelte';
  import type { StatusItem } from './to-delivery-step.types';
  import { getDeliveryStatusItems } from './to-delivery-step-utils';

  export let sharedState: any;
  export let eventHandlers: any;

  const dispatch = createEventDispatcher();

  $: statusItems = getDeliveryStatusItems();
  $: deliveryVolume = sharedState.activeJob?.deliveryVolume || '120';
</script>

<div class="delivery-content">
  <div class="delivery-header">
    <h2>🚛 Loaded & Ready for Delivery</h2>
    <p>Tank loaded with {deliveryVolume} units - Plan your delivery route and navigate to offload site</p>
    
    <DeliveryStatusBanner {statusItems} />
  </div>
  
  <DriverSchedule on:job-selected={eventHandlers.handleJobSelected} />
  <LoadCalculator 
    truckTare={15000}
    trailerTare={8000}
    on:calculation-complete={(e) => console.log('Load calculation:', e.detail)}
  />
  
  <div class="start-navigation-action">
    <button class="start-nav-btn" on:click={eventHandlers.handleStartDeliveryNavigation}>
      🗺️ Start Navigation to Delivery
    </button>
  </div>
</div>

<style>
  .delivery-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .delivery-header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .delivery-header h2 {
    font-size: 2rem;
    color: #1f2937;
    margin-bottom: 8px;
  }
  
  .delivery-header p {
    color: #6b7280;
    font-size: 1.1rem;
  }
  
  .start-navigation-action {
    text-align: center;
    margin-top: 32px;
  }
  
  .start-nav-btn {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  
  .start-nav-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  }
</style> 