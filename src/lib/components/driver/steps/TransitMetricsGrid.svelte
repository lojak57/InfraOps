<script lang="ts">
  import type { TransitMetrics } from './to-delivery-step.types';

  export let metrics: TransitMetrics;
</script>

<div class="transit-metrics-grid">
  <div class="metric-card speed">
    <div class="metric-icon">🏃</div>
    <div class="metric-value">{metrics.speed.current}</div>
    <div class="metric-unit">{metrics.speed.unit}</div>
    <div class="metric-max">Max: {metrics.speed.max}</div>
  </div>
  
  <div class="metric-card pressure">
    <div class="metric-icon">⚡</div>
    <div class="metric-value">{metrics.pressure.value}</div>
    <div class="metric-unit">{metrics.pressure.unit}</div>
    <div class="metric-status">{metrics.pressure.status}</div>
  </div>
  
  <div class="metric-card temperature">
    <div class="metric-icon">🌡️</div>
    <div class="metric-value">{metrics.temperature.value}°</div>
    <div class="metric-unit">{metrics.temperature.unit}</div>
    <div class="metric-status">{metrics.temperature.status}</div>
  </div>
  
  <div class="metric-card eta">
    <div class="metric-icon">⏰</div>
    <div class="metric-value">{metrics.eta.timeRemaining}</div>
    <div class="metric-unit">ETA</div>
    <div class="metric-status">{metrics.eta.arrivalTime}</div>
  </div>
</div>

<style>
  .transit-metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }
  
  .metric-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .metric-icon {
    font-size: 2rem;
    margin-bottom: 12px;
  }
  
  .metric-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 4px;
  }
  
  .metric-unit {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 8px;
  }
  
  .metric-status, .metric-max {
    color: #10b981;
    font-size: 0.875rem;
  }
</style> 