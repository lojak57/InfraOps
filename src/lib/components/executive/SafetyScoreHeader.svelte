<script lang="ts">
  import { TrendingUp } from 'lucide-svelte';
  import type { ScoreComposition } from './safety-analytics.types';

  export let overallScore: number;
  export let scoreComposition: ScoreComposition[];
</script>

<div class="score-header">
  <div class="main-score">
    <div class="score-circle">
      <div class="score-value font-mono text-4xl font-bold">{overallScore}<span class="score-unit text-lg opacity-80">%</span></div>
      <div class="score-label text-xs opacity-90">Overall Safety Score</div>
    </div>
    <div class="score-trend">
      <TrendingUp size={20} />
      <span class="text-green-600 font-semibold text-sm">+1.2% vs last month</span>
    </div>
  </div>
  <div class="score-composition">
    <h3 class="text-lg font-semibold text-slate-800 mb-5">Score Composition</h3>
    <div class="composition-breakdown">
      {#each scoreComposition as component}
        <div class="composition-item">
          <span class="component-name text-sm text-slate-600 font-medium">{component.name} ({component.weight}%)</span>
          <div class="component-bar">
            <div class="component-fill" style="width: {component.score}%"></div>
          </div>
          <span class="component-score text-sm font-mono font-semibold text-slate-800">{component.score}%</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .score-header {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 40px;
    margin-bottom: 40px;
    padding: 32px;
    background: linear-gradient(135deg, #f8fafc 0%, #f0fdf4 100%);
    border-radius: 20px;
    border: 1px solid #e2e8f0;
  }

  .main-score {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .score-circle {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    position: relative;
  }

  .score-trend {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 14px;
  }

  .composition-breakdown {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .composition-item {
    display: grid;
    grid-template-columns: 1fr 150px 60px;
    align-items: center;
    gap: 12px;
  }

  .component-bar {
    height: 8px;
    background: #f1f5f9;
    border-radius: 4px;
    overflow: hidden;
  }

  .component-fill {
    height: 100%;
    background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
    transition: width 0.3s ease;
  }

  @media (max-width: 768px) {
    .score-header {
      grid-template-columns: 1fr;
      gap: 24px;
      padding: 20px;
    }
  }

  @media (max-width: 640px) {
    .composition-item {
      grid-template-columns: 1fr 80px 50px;
      gap: 8px;
    }

    .score-circle {
      width: 140px;
      height: 140px;
    }
  }
</style> 