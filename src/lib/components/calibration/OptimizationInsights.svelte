<script lang="ts">
  import type { FleetStats, CostBreakdown } from './optimization.types';

  export let fleetStats: FleetStats;
  export let costBreakdown: CostBreakdown;
</script>

<div class="insights-section">
  <div class="insight-header">
    <h4 class="insight-title">🔍 Smart Insights</h4>
  </div>
  
  <div class="insights-grid">
    <div class="insight-card">
      <div class="insight-icon">🎯</div>
      <div class="insight-content">
        <div class="insight-metric">{((costBreakdown.annualSavings / costBreakdown.annualTotal) * 100).toFixed(0)}%</div>
        <div class="insight-label">Cost Reduction</div>
      </div>
    </div>
    
    <div class="insight-card">
      <div class="insight-icon">📊</div>
      <div class="insight-content">
        <div class="insight-metric">{fleetStats.avgDelta.toFixed(3)}%</div>
        <div class="insight-label">Avg Fleet Delta</div>
      </div>
    </div>
    
    <div class="insight-card">
      <div class="insight-icon">🔄</div>
      <div class="insight-content">
        <div class="insight-metric">{Math.round(fleetStats.calibrationsAvoided / (fleetStats.total / 12))}x</div>
        <div class="insight-label">Efficiency Multiplier</div>
      </div>
    </div>
  </div>
</div>

<style>
  .insights-section {
    padding: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .insight-header {
    margin-bottom: 16px;
  }

  .insight-title {
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
  }

  .insights-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .insight-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: rgba(248, 250, 252, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }

  .insight-icon {
    font-size: 20px;
  }

  .insight-metric {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    font-family: 'JetBrains Mono', monospace;
  }

  .insight-label {
    font-size: 11px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .insights-grid {
      grid-template-columns: 1fr;
    }
  }
</style> 