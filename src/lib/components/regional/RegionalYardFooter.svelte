<script lang="ts">
  import type { YardData } from './regional-yard.types';
  import { getBestPerformer, getImprovementOpportunity } from './regional-yard-utils';

  export let yardData: YardData[];

  $: bestPerformer = getBestPerformer(yardData);
  $: improvementOpportunity = getImprovementOpportunity(yardData);
</script>

<div class="footer-actions">
  {#if bestPerformer}
    <div class="action-stat">
      <strong>Best Performer:</strong> {bestPerformer.yardName} ({bestPerformer.efficiency}% efficiency, {bestPerformer.totalBPD.toLocaleString()} BPD)
    </div>
  {/if}
  {#if improvementOpportunity}
    <div class="action-stat">
      <strong>Improvement Opportunity:</strong> {improvementOpportunity.yardName} could increase BPD by 15% with operational optimization
    </div>
  {/if}
</div>

<style>
  .footer-actions {
    padding: 24px 32px;
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
  }

  .action-stat {
    margin-bottom: 8px;
    font-size: 14px;
    color: #374151;
  }

  .action-stat:last-child {
    margin-bottom: 0;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .footer-actions {
      padding: 20px;
    }
  }
</style> 