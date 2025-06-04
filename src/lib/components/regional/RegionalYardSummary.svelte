<script lang="ts">
  import type { RegionalAverage, YardData } from './regional-yard.types';
  import { getBestPerformer, getImprovementOpportunity } from './regional-yard-utils';

  export let regionalAverage: RegionalAverage;
  export let yardData: YardData[];

  $: bestPerformer = getBestPerformer(yardData);
  $: improvementOpportunity = getImprovementOpportunity(yardData);
</script>

<div class="regional-summary">
  <div class="summary-card">
    <h4>Regional Performance</h4>
    <div class="summary-stats">
      <div class="stat">
        <span class="stat-label">Avg Daily Units</span>
        <span class="stat-value">{regionalAverage.dailyUnits.toLocaleString()}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Avg Efficiency</span>
        <span class="stat-value">{regionalAverage.efficiency}%</span>
      </div>
      <div class="stat">
        <span class="stat-label">Avg Utilization</span>
        <span class="stat-value">{regionalAverage.utilizationRate}%</span>
      </div>
      <div class="stat">
        <span class="stat-label">Avg Drive Time</span>
        <span class="stat-value">{regionalAverage.avgDriveTime}h</span>
      </div>
    </div>
  </div>
  <div class="summary-card">
    <h4>Key Insights</h4>
    <p>
      {#if bestPerformer}
        <strong>{bestPerformer.yardName}</strong> leads in efficiency ({bestPerformer.efficiency}%) and Daily Units output.
      {/if}
      {#if improvementOpportunity}
        <strong>{improvementOpportunity.yardName}</strong> needs operational review to improve below-average metrics.
      {/if}
    </p>
  </div>
</div>

<style>
  .regional-summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 24px 32px;
    background: #fefefe;
  }

  .summary-card {
    background: linear-gradient(135deg, #475569 0%, #334155 100%);
    color: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(71, 85, 105, 0.2);
  }

  .summary-card h4 {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 16px 0;
  }

  .summary-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .stat {
    text-align: center;
  }

  .stat-label {
    display: block;
    font-size: 12px;
    opacity: 0.8;
    margin-bottom: 4px;
  }

  .stat-value {
    display: block;
    font-size: 18px;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
  }

  .summary-card p {
    font-size: 14px;
    margin: 0;
    line-height: 1.5;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .regional-summary {
      grid-template-columns: 1fr;
      padding: 20px;
    }

    .summary-stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style> 