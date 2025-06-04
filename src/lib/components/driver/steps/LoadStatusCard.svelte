<script lang="ts">
  import type { LoadStatus } from './to-delivery-step.types';

  export let loadStatus: LoadStatus;
</script>

<div class="load-status-card">
  <h3>🛢️ Current Load Status</h3>
  <div class="load-details">
    <div class="load-stat">
      <span class="stat-label">Loaded Volume</span>
      <span class="stat-value">{loadStatus.volume} units</span>
    </div>
    <div class="load-stat">
      <span class="stat-label">From</span>
      <span class="stat-value">{loadStatus.fromSite}</span>
    </div>
    <div class="load-stat">
      <span class="stat-label">Load Temp</span>
      <span class="stat-value">{loadStatus.temperature}</span>
    </div>
    <div class="load-stat">
      <span class="stat-label">Pressure</span>
      <span class="stat-value">{loadStatus.pressure}</span>
    </div>
  </div>
</div>

<style>
  .load-status-card {
    background: #10b981;
    color: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }
  
  .load-status-card h3 {
    margin: 0 0 16px 0;
    font-size: 1.25rem;
  }
  
  .load-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }
  
  .load-stat {
    text-align: center;
    background: rgba(255, 255, 255, 0.2);
    padding: 12px;
    border-radius: 8px;
  }
  
  .load-stat .stat-label {
    display: block;
    font-size: 0.875rem;
    opacity: 0.9;
    margin-bottom: 4px;
  }
  
  .load-stat .stat-value {
    display: block;
    font-size: 1.1rem;
    font-weight: 700;
  }
</style> 