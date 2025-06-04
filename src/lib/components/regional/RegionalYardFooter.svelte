<script lang="ts">
  import type { YardData } from './regional-yard.types.js';
  import { getBestPerformer, getImprovementOpportunity } from './regional-yard-utils.js';

  export let yardData: YardData[];

  $: bestPerformer = getBestPerformer(yardData);
  $: improvementOpportunity = getImprovementOpportunity(yardData);
</script>

<div class="yard-footer">
  {#if bestPerformer}
    <div class="insight positive">
      <strong>Best Performer:</strong> {bestPerformer.yardName} ({bestPerformer.efficiency}% efficiency, {bestPerformer.dailyUnits.toLocaleString()} Daily Units)
    </div>
  {/if}
  {#if improvementOpportunity}
    <div class="insight attention">
      <strong>Improvement Opportunity:</strong> {improvementOpportunity.yardName} could increase Daily Units by 15% with operational optimization
    </div>
  {/if}
</div>

<style>
  .yard-footer {
    padding: 1.5rem;
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
    border-radius: 0 0 0.75rem 0.75rem;
  }

  .insight {
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
  }

  .insight:last-child {
    margin-bottom: 0;
  }

  .insight.positive {
    background: #dcfce7;
    color: #166534;
    border-left: 4px solid #10b981;
  }

  .insight.attention {
    background: #fef3c7;
    color: #92400e;
    border-left: 4px solid #f59e0b;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .yard-footer {
      padding: 20px;
    }
  }
</style> 