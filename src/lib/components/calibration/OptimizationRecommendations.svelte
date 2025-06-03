<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { formatDelta, getPriorityLevel, getPriorityColor, getEstimatedDaysUntilCalibration } from './optimization-utils';
  import type { TruckRecommendation } from './optimization.types';

  export let recommendations: TruckRecommendation[];

  const dispatch = createEventDispatcher<{
    schedule: { truck: TruckRecommendation; priority: 'high' | 'medium' | 'low' };
  }>();

  function handleSchedule(truck: TruckRecommendation) {
    const priority = getPriorityLevel(truck);
    dispatch('schedule', { truck, priority });
  }
</script>

<div class="recommendations-section">
  <div class="recommendations-header">
    <h4 class="recommendations-title">🎯 Next Recommended Calibrations</h4>
    <div class="recommendations-count">
      {recommendations.length} pending
    </div>
  </div>

  <div class="recommendations-list">
    {#each recommendations as truck, index (truck.id)}
      {@const priority = getPriorityLevel(truck)}
      {@const estimatedDays = getEstimatedDaysUntilCalibration(truck)}
      <div class="recommendation-item" class:high={priority === 'high'} class:medium={priority === 'medium'} class:low={priority === 'low'}>
        <div class="recommendation-priority">
          <div class="priority-indicator" style="background-color: {getPriorityColor(priority)}">
            {index + 1}
          </div>
        </div>
        
        <div class="recommendation-content">
          <div class="truck-info">
            <span class="truck-id">{truck.id}</span>
            <span class="truck-status" class:critical={truck.status === 'critical'} class:warning={truck.status === 'warning'}>
              {truck.status === 'critical' ? '🔴 Critical' : '⚠️ Warning'}
            </span>
          </div>
          <div class="recommendation-details">
            <span class="delta-info">Delta: {formatDelta(truck.avgLoadDelta)}</span>
            <span class="timing-info">
              {#if estimatedDays === 0}
                Immediate action required
              {:else}
                Recommended within {estimatedDays} days
              {/if}
            </span>
          </div>
        </div>
        
        <div class="recommendation-actions">
          <button 
            class="schedule-btn" 
            class:urgent={priority === 'high'}
            on:click={() => handleSchedule(truck)}
          >
            {#if priority === 'high'}
              🚨 Schedule Now
            {:else}
              📅 Schedule
            {/if}
          </button>
        </div>
      </div>
    {/each}
  </div>

  {#if recommendations.length === 0}
    <div class="no-recommendations">
      <div class="no-rec-icon">🎉</div>
      <div class="no-rec-text">
        <h4>All trucks are optimally calibrated!</h4>
        <p>No immediate calibrations needed. The system will continue monitoring.</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .recommendations-section {
    padding: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .recommendations-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .recommendations-title {
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
  }

  .recommendations-count {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
  }

  .recommendations-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 300px;
    overflow-y: auto;
  }

  .recommendation-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: rgba(248, 250, 252, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .recommendation-item:hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .recommendation-item.high {
    border-left: 4px solid #ef4444;
  }

  .recommendation-item.medium {
    border-left: 4px solid #f59e0b;
  }

  .recommendation-item.low {
    border-left: 4px solid #3b82f6;
  }

  .priority-indicator {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 12px;
  }

  .recommendation-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .truck-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .truck-id {
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
    color: #0f172a;
  }

  .truck-status {
    font-size: 11px;
    font-weight: 500;
    padding: 2px 6px;
    border-radius: 8px;
  }

  .truck-status.critical {
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
  }

  .truck-status.warning {
    background: rgba(245, 158, 11, 0.1);
    color: #d97706;
  }

  .recommendation-details {
    display: flex;
    gap: 12px;
    font-size: 12px;
    color: #64748b;
  }

  .delta-info {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
  }

  .schedule-btn {
    padding: 6px 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    background: #3b82f6;
    color: white;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .schedule-btn.urgent {
    background: #ef4444;
    animation: pulse 2s infinite;
  }

  .schedule-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  .no-recommendations {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: rgba(34, 197, 94, 0.05);
    border: 1px solid rgba(34, 197, 94, 0.1);
    border-radius: 8px;
    text-align: left;
  }

  .no-rec-icon {
    font-size: 32px;
  }

  .no-rec-text h4 {
    color: #16a34a;
    margin: 0 0 4px 0;
    font-size: 14px;
  }

  .no-rec-text p {
    color: #64748b;
    margin: 0;
    font-size: 12px;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .recommendation-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
</style> 