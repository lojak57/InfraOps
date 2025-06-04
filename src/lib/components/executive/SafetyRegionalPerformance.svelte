<script lang="ts">
  import { getScoreColor, getIncidentColor, getTrendDisplay } from './safety-analytics-utils';
  import type { RegionalSafety } from './safety-analytics.types';

  export let regional: RegionalSafety[];
</script>

<div class="regional-section">
  <h2 class="text-xl font-semibold text-slate-800 mb-6">Regional Safety Performance</h2>
  <div class="regional-grid chart-card-container">
    {#each regional as region}
      <div class="regional-card chart-card">
        <div class="regional-header">
          <h3 class="text-base font-semibold text-slate-800">{region.region}</h3>
          <div class="regional-score font-mono text-lg font-bold {getScoreColor(region.score)}">
            {region.score}%
          </div>
        </div>
        <div class="regional-details">
          <div class="detail-item">
            <span class="detail-label text-sm text-slate-600">Incidents (90 days)</span>
            <span class="detail-value text-sm font-mono font-semibold {getIncidentColor(region.incidents)}">{region.incidents}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label text-sm text-slate-600">Trend</span>
            <span class="detail-value text-sm font-semibold {getTrendDisplay(region.trend).color}">
              {getTrendDisplay(region.trend).icon} {getTrendDisplay(region.trend).text}
            </span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .regional-section {
    margin-bottom: 40px;
  }

  .chart-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;
  }

  .chart-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .chart-card-container {
    display: grid;
    gap: 20px;
  }

  .regional-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .regional-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .regional-header h3 {
    margin: 0;
  }

  .regional-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 768px) {
    .regional-grid {
      grid-template-columns: 1fr;
    }

    .chart-card-container {
      gap: 16px;
    }

    .chart-card {
      padding: 16px;
    }
  }
</style> 