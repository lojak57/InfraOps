<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { TimeframeOption } from './regional-yard.types';

  export let regionName: string;
  export let selectedTimeframe: TimeframeOption;

  const dispatch = createEventDispatcher<{
    close: void;
    timeframeChange: { timeframe: TimeframeOption };
  }>();

  const timeframeOptions: TimeframeOption[] = ['Last 7 Days', 'Last 30 Days', 'Custom'];

  function handleTimeframeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const timeframe = target.value as TimeframeOption;
    selectedTimeframe = timeframe;
    dispatch('timeframeChange', { timeframe });
  }

  function handleClose() {
    dispatch('close');
  }
</script>

<div class="comparison-header">
  <div class="header-content">
    <h2>{regionName} Region - Yard Performance Comparison</h2>
    <p>Compare operational KPIs across all yards in your region</p>
  </div>
  <div class="header-controls">
    <select 
      value={selectedTimeframe} 
      on:change={handleTimeframeChange}
      class="timeframe-select"
    >
      {#each timeframeOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
    <button on:click={handleClose} class="close-btn">✕</button>
  </div>
</div>

<style>
  .comparison-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    border-bottom: 1px solid #e2e8f0;
    background: linear-gradient(135deg, #475569 0%, #334155 50%, #1e293b 100%);
    color: white;
  }

  .header-content h2 {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 8px 0;
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .header-content p {
    font-size: 16px;
    margin: 0;
    opacity: 0.9;
  }

  .header-controls {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .timeframe-select {
    padding: 8px 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 14px;
    cursor: pointer;
  }

  .timeframe-select option {
    background: #1e293b;
    color: white;
  }

  .close-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;
    color: white;
    transition: all 0.2s ease;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .comparison-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      padding: 20px;
    }

    .header-controls {
      width: 100%;
      justify-content: space-between;
    }
  }
</style> 