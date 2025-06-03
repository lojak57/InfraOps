<!--
  DataTracker Platform - Time Range Selector Component
  
  Professional time range selector for filtering dashboard data
  by predefined periods or custom date ranges.
-->

<script lang="ts">
  import { executiveStore, executiveActions } from '$lib/core/stores/executive.store';
  import type { TimeRangePreset } from '$lib/core/types/common.types';
  
  // Subscribe to store state
  $: selectedTimeRange = $executiveStore.selectedTimeRange;
  
  // Predefined time range options
  const timeRangeOptions: { value: TimeRangePreset; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last_7_days', label: 'Last 7 Days' },
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'this_month', label: 'This Month' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'this_quarter', label: 'This Quarter' },
    { value: 'last_quarter', label: 'Last Quarter' },
    { value: 'this_year', label: 'This Year' },
    { value: 'last_year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];
  
  // Handle preset selection
  function handlePresetSelect(preset: TimeRangePreset) {
    if (preset === 'custom') {
      // Handle custom range in a future enhancement
      console.log('Custom range selection not yet implemented');
      return;
    }
    
    executiveActions.setTimeRangePreset(preset);
  }
  
  // Format date for display
  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
  
  // Get current selection label
  function getCurrentLabel(): string {
    const option = timeRangeOptions.find(opt => opt.value === selectedTimeRange.preset);
    return option?.label || 'Custom Range';
  }
</script>

<div class="time-range-selector">
  <!-- Current Selection Display -->
  <div class="current-selection">
    <div class="selection-label">📅 Time Period</div>
    <div class="selection-value">
      {getCurrentLabel()}
    </div>
    <div class="selection-dates">
      {formatDate(selectedTimeRange.start)} - {formatDate(selectedTimeRange.end)}
    </div>
  </div>
  
  <!-- Quick Selection Buttons -->
  <div class="quick-selection">
    <div class="selection-group">
      <span class="group-label">Quick Select:</span>
      <div class="button-row">
        {#each timeRangeOptions.slice(0, 4) as option}
          <button
            class="time-button {selectedTimeRange.preset === option.value ? 'active' : ''}"
            on:click={() => handlePresetSelect(option.value)}
          >
            {option.label}
          </button>
        {/each}
      </div>
    </div>
    
    <div class="selection-group">
      <span class="group-label">Periods:</span>
      <div class="button-row">
        {#each timeRangeOptions.slice(4, 8) as option}
          <button
            class="time-button {selectedTimeRange.preset === option.value ? 'active' : ''}"
            on:click={() => handlePresetSelect(option.value)}
          >
            {option.label}
          </button>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Refresh Indicator -->
  {#if $executiveStore.isRefreshing}
    <div class="refresh-indicator">
      <div class="refresh-spinner"></div>
      <span>Updating data...</span>
    </div>
  {:else}
    <button
      class="refresh-button"
      on:click={() => executiveActions.refreshData()}
      title="Refresh Data"
    >
      🔄 Refresh
    </button>
  {/if}
</div>

<style>
  .time-range-selector {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  }
  
  .current-selection {
    text-align: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }
  
  .selection-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--muted-foreground);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
  }
  
  .selection-value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--foreground);
    margin-bottom: 0.25rem;
  }
  
  .selection-dates {
    font-size: 0.75rem;
    color: var(--muted-foreground);
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  }
  
  .quick-selection {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .selection-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .group-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--muted-foreground);
  }
  
  .button-row {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .time-button {
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 0.375rem;
    background: var(--background);
    color: var(--foreground);
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .time-button:hover {
    background: var(--muted);
    border-color: var(--primary);
  }
  
  .time-button.active {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
  }
  
  .refresh-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: var(--muted-foreground);
  }
  
  .refresh-spinner {
    width: 0.875rem;
    height: 0.875rem;
    border: 1px solid var(--muted);
    border-top: 1px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .refresh-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border);
    border-radius: 0.375rem;
    background: var(--background);
    color: var(--foreground);
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    align-self: center;
  }
  
  .refresh-button:hover {
    background: var(--muted);
    border-color: var(--primary);
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .time-range-selector {
      padding: 0.75rem;
    }
    
    .button-row {
      justify-content: center;
    }
    
    .time-button {
      font-size: 0.7rem;
      padding: 0.25rem 0.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .quick-selection {
      gap: 0.5rem;
    }
    
    .time-button {
      flex: 1;
      min-width: 0;
      text-align: center;
    }
    
    .button-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.375rem;
    }
  }
</style> 