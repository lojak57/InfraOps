<!--
  DataTracker Platform - KPI Grid Component
  
  Professional grid display of key performance indicators with
  real-time data, trends, and status indicators.
-->

<script lang="ts">
  import { currentKPIs, executiveStore } from '$lib/core/stores/executive.store';
  import type { KPIDefinition, AnalyticsDataPoint, PerformanceStatus } from '$lib/core/types/common.types';
  
  // Subscribe to KPI data
  $: kpiDefinitions = $currentKPIs;
  $: kpiData = $executiveStore.kpiData;
  
  // Get latest data point for a KPI
  function getLatestKPIData(kpiId: string): AnalyticsDataPoint | null {
    const dataPoints = kpiData[kpiId];
    if (!dataPoints || dataPoints.length === 0) return null;
    return dataPoints[dataPoints.length - 1];
  }
  
  // Format KPI value based on data type
  function formatKPIValue(kpi: KPIDefinition, value: number): string {
    switch (kpi.metric.dataType) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'decimal':
        return value.toFixed(2);
      case 'integer':
        return Math.round(value).toString();
      case 'duration':
        return `${value.toFixed(1)} hrs`;
      default:
        return value.toString();
    }
  }
  
  // Get status color class
  function getStatusColorClass(status: PerformanceStatus): string {
    switch (status) {
      case 'excellent':
        return 'status-excellent';
      case 'good':
        return 'status-good';
      case 'acceptable':
        return 'status-acceptable';
      case 'poor':
        return 'status-poor';
      case 'critical':
        return 'status-critical';
      default:
        return 'status-good';
    }
  }
  
  // Get trend icon
  function getTrendIcon(variance: number): string {
    if (variance > 5) return '📈';
    if (variance < -5) return '📉';
    return '➡️';
  }
  
  // Get category icon
  function getCategoryIcon(category: string): string {
    switch (category) {
      case 'financial':
        return '💰';
      case 'operational':
        return '⚙️';
      case 'safety':
        return '🛡️';
      case 'efficiency':
        return '⚡';
      case 'customer':
        return '🤝';
      case 'driver':
        return '👨‍💼';
      case 'fleet':
        return '🚛';
      case 'environmental':
        return '🌱';
      default:
        return '📊';
    }
  }
</script>

{#if kpiDefinitions.length === 0}
  <div class="empty-state">
    <div class="empty-icon">📊</div>
    <h3 class="empty-title">No KPIs Configured</h3>
    <p class="empty-description">Configure key performance indicators to start tracking business metrics.</p>
  </div>
{:else}
  <div class="kpi-grid">
    {#each kpiDefinitions as kpi}
      {@const latestData = getLatestKPIData(kpi.id)}
      {@const value = latestData?.value || 0}
      {@const status = latestData?.status || 'good'}
      {@const variance = latestData?.variancePercentage || 0}
      
      <div class="kpi-card {getStatusColorClass(status)}">
        <!-- Header -->
        <div class="kpi-header">
          <div class="kpi-icon">{getCategoryIcon(kpi.category)}</div>
          <div class="kpi-category">{kpi.category}</div>
        </div>
        
        <!-- Main Value -->
        <div class="kpi-main">
          <div class="kpi-value">
            {formatKPIValue(kpi, value)}
          </div>
          <div class="kpi-name">{kpi.name}</div>
        </div>
        
        <!-- Target and Variance -->
        <div class="kpi-metrics">
          <div class="metric-item">
            <span class="metric-label">Target:</span>
            <span class="metric-value">{formatKPIValue(kpi, kpi.target.value)}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Variance:</span>
            <span class="metric-value variance-{variance >= 0 ? 'positive' : 'negative'}">
              {getTrendIcon(variance)} {variance >= 0 ? '+' : ''}{variance.toFixed(1)}%
            </span>
          </div>
        </div>
        
        <!-- Status Bar -->
        <div class="kpi-status-bar">
          <div class="status-indicator {getStatusColorClass(status)}">
            <span class="status-text">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
          </div>
          <div class="kpi-frequency">Updates {kpi.frequency}</div>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  .kpi-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 1.25rem;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  
  .kpi-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .kpi-card.status-excellent {
    border-left: 4px solid var(--success);
  }
  
  .kpi-card.status-good {
    border-left: 4px solid var(--primary);
  }
  
  .kpi-card.status-acceptable {
    border-left: 4px solid var(--warning);
  }
  
  .kpi-card.status-poor {
    border-left: 4px solid var(--error);
  }
  
  .kpi-card.status-critical {
    border-left: 4px solid var(--error);
    background-color: var(--error-light);
  }
  
  .kpi-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .kpi-icon {
    font-size: 1.5rem;
  }
  
  .kpi-category {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--muted-foreground);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .kpi-main {
    margin-bottom: 1rem;
  }
  
  .kpi-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--foreground);
    line-height: 1;
    margin-bottom: 0.25rem;
  }
  
  .kpi-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--foreground);
    line-height: 1.2;
  }
  
  .kpi-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: var(--muted);
    border-radius: 0.5rem;
  }
  
  .metric-item {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  
  .metric-label {
    font-size: 0.75rem;
    color: var(--muted-foreground);
    font-weight: 500;
  }
  
  .metric-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--foreground);
  }
  
  .metric-value.variance-positive {
    color: var(--success);
  }
  
  .metric-value.variance-negative {
    color: var(--error);
  }
  
  .kpi-status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .status-indicator {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .status-indicator.status-excellent {
    background-color: var(--success-light);
    color: var(--success-dark);
  }
  
  .status-indicator.status-good {
    background-color: var(--primary-light);
    color: var(--primary-dark);
  }
  
  .status-indicator.status-acceptable {
    background-color: var(--warning-light);
    color: var(--warning-dark);
  }
  
  .status-indicator.status-poor {
    background-color: var(--error-light);
    color: var(--error-dark);
  }
  
  .status-indicator.status-critical {
    background-color: var(--error);
    color: white;
  }
  
  .kpi-frequency {
    font-size: 0.75rem;
    color: var(--muted-foreground);
    font-style: italic;
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--muted-foreground);
  }
  
  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .empty-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--foreground);
    margin-bottom: 0.5rem;
  }
  
  .empty-description {
    font-size: 0.875rem;
    max-width: 400px;
    margin: 0 auto;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .kpi-grid {
      grid-template-columns: 1fr;
    }
    
    .kpi-value {
      font-size: 1.75rem;
    }
    
    .kpi-metrics {
      grid-template-columns: 1fr;
    }
    
    .kpi-status-bar {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }
  }
</style> 