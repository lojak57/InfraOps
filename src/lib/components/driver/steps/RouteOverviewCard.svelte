<script lang="ts">
  import type { DestinationInfo, RouteData } from './to-delivery-step.types';

  export let destinationInfo: DestinationInfo;
  export let routeData: RouteData;
</script>

<div class="route-overview">
  <div class="route-card">
    <h3>{destinationInfo.icon} {destinationInfo.type}</h3>
    <p><strong>{destinationInfo.name}</strong></p>
    <p>{destinationInfo.address}</p>
    <p>{destinationInfo.detail}</p>
    <p>Contact: {destinationInfo.contact}</p>
  </div>
  
  <div class="route-details">
    <div class="route-stat">
      <span class="stat-label">Distance</span>
      <span class="stat-value">{routeData.distance}</span>
    </div>
    <div class="route-stat">
      <span class="stat-label">Estimated Time</span>
      <span class="stat-value">{routeData.estimatedTime}</span>
    </div>
    <div class="route-stat">
      <span class="stat-label">ETA</span>
      <span class="stat-value">{routeData.eta}</span>
    </div>
  </div>
</div>

<style>
  .route-overview {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    margin-bottom: 32px;
  }
  
  .route-card {
    margin-bottom: 24px;
  }
  
  .route-card h3 {
    color: #1f2937;
    margin-bottom: 12px;
  }
  
  .route-card p {
    color: #6b7280;
    margin: 4px 0;
  }
  
  .route-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
  }
  
  .route-stat {
    text-align: center;
    padding: 16px;
    background: #f9fafb;
    border-radius: 8px;
  }
  
  .stat-label {
    display: block;
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 4px;
  }
  
  .stat-value {
    display: block;
    color: #1f2937;
    font-size: 1.5rem;
    font-weight: 700;
  }
</style> 