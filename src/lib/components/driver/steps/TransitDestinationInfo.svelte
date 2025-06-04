<script lang="ts">
  import type { DestinationInfo, RouteData } from './to-delivery-step.types';

  export let destinationInfo: DestinationInfo;
  export let routeData: RouteData;
</script>

<div class="destination-info">
  <div class="destination-icon">{destinationInfo.icon}</div>
  <div class="destination-text">
    <span class="destination-name">{destinationInfo.name}</span>
    <span class="destination-distance">{routeData.distance} remaining</span>
  </div>
</div>

<style>
  .destination-info {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1f2937;
    color: white;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 24px;
  }
  
  .destination-icon {
    font-size: 2rem;
    margin-right: 16px;
  }
  
  .destination-text {
    display: flex;
    flex-direction: column;
  }
  
  .destination-name {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .destination-distance {
    color: #9ca3af;
    font-size: 0.875rem;
  }
</style> 