<script lang="ts">
  import { getScoreColor } from './safety-analytics-utils';
  import type { SafetyCompliance } from './safety-analytics.types';

  export let compliance: SafetyCompliance;

  const complianceItems = [
    { name: 'DOT Compliance', score: compliance.dot },
    { name: 'OSHA Standards', score: compliance.osha },
    { name: 'Environmental', score: compliance.environmental },
    { name: 'Internal Policies', score: compliance.internal }
  ];
</script>

<div class="compliance-section">
  <h2 class="text-xl font-semibold text-slate-800 mb-6">Regulatory Compliance</h2>
  <div class="compliance-grid chart-card-container">
    {#each complianceItems as item}
      <div class="compliance-item chart-card">
        <div class="compliance-header">
          <span class="compliance-name text-base font-semibold text-slate-800">{item.name}</span>
          <span class="compliance-score text-lg font-mono font-bold {getScoreColor(item.score)}">{item.score}%</span>
        </div>
        <div class="compliance-bar">
          <div class="compliance-fill" style="width: {item.score}%"></div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .compliance-section {
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

  .compliance-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .compliance-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .compliance-bar {
    height: 12px;
    background: #f1f5f9;
    border-radius: 6px;
    overflow: hidden;
  }

  .compliance-fill {
    height: 100%;
    background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
    border-radius: 6px;
    transition: width 0.3s ease;
  }

  @media (max-width: 768px) {
    .compliance-grid {
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