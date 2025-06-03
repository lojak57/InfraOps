<!--
  DataTracker Platform - Operational Summary Component
  
  Professional display of operational metrics including fleet performance,
  driver metrics, safety indicators, and efficiency measures.
-->

<script lang="ts">
  import type { OperationalMetrics } from '$lib/core/types/common.types';
  
  export let metrics: OperationalMetrics | null;
  
  // Format percentage values
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  
  // Format integer values
  const formatInteger = (value: number) => {
    return Math.round(value).toString();
  };
  
  // Format decimal values
  const formatDecimal = (value: number, places = 1) => {
    return value.toFixed(places);
  };
  
  // Get performance status color
  const getPerformanceClass = (value: number, thresholds: { excellent: number; good: number; acceptable: number }) => {
    if (value >= thresholds.excellent) return 'performance-excellent';
    if (value >= thresholds.good) return 'performance-good';
    if (value >= thresholds.acceptable) return 'performance-acceptable';
    return 'performance-poor';
  };
</script>

{#if !metrics}
  <div class="pickup-state">
    <div class="pickup-spinner"></div>
    <p>Loading operational metrics...</p>
  </div>
{:else}
  <div class="operational-grid">
    <!-- Fleet Performance -->
    <div class="metric-section">
      <h4 class="section-title">🚛 Fleet Performance</h4>
      <div class="metric-item">
        <span class="metric-label">Total Jobs</span>
        <span class="metric-value primary">{formatInteger(metrics.totalJobs)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Completed</span>
        <span class="metric-value">{formatInteger(metrics.completedJobs)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Completion Rate</span>
        <span class="metric-value {getPerformanceClass(metrics.completionRate, { excellent: 95, good: 90, acceptable: 85 })}">
          {formatPercentage(metrics.completionRate)}
        </span>
      </div>
      <div class="metric-item">
        <span class="metric-label">On-Time Delivery</span>
        <span class="metric-value {getPerformanceClass(metrics.onTimeDeliveryRate, { excellent: 95, good: 90, acceptable: 85 })}">
          {formatPercentage(metrics.onTimeDeliveryRate)}
        </span>
      </div>
    </div>
    
    <!-- Driver Metrics -->
    <div class="metric-section">
      <h4 class="section-title">👨‍💼 Driver Performance</h4>
      <div class="metric-item">
        <span class="metric-label">Total Drivers</span>
        <span class="metric-value">{formatInteger(metrics.totalDrivers)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Active Drivers</span>
        <span class="metric-value success">{formatInteger(metrics.activeDrivers)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Utilization</span>
        <span class="metric-value {getPerformanceClass(metrics.driverUtilization, { excellent: 90, good: 80, acceptable: 70 })}">
          {formatPercentage(metrics.driverUtilization)}
        </span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Satisfaction Score</span>
        <span class="metric-value {getPerformanceClass(metrics.driverSatisfactionScore, { excellent: 85, good: 75, acceptable: 65 })}">
          {formatDecimal(metrics.driverSatisfactionScore)}/100
        </span>
      </div>
    </div>
    
    <!-- Fleet Utilization -->
    <div class="metric-section">
      <h4 class="section-title">🔧 Fleet Utilization</h4>
      <div class="metric-item">
        <span class="metric-label">Total Trucks</span>
        <span class="metric-value">{formatInteger(metrics.totalTrucks)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Active Trucks</span>
        <span class="metric-value success">{formatInteger(metrics.activeTrucks)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Utilization Rate</span>
        <span class="metric-value {getPerformanceClass(metrics.truckUtilization, { excellent: 90, good: 80, acceptable: 70 })}">
          {formatPercentage(metrics.truckUtilization)}
        </span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Downtime</span>
        <span class="metric-value {metrics.maintenanceDowntime > 5 ? 'performance-poor' : metrics.maintenanceDowntime > 3 ? 'performance-acceptable' : 'performance-good'}">
          {formatPercentage(metrics.maintenanceDowntime)}
        </span>
      </div>
    </div>
    
    <!-- Safety & Efficiency -->
    <div class="metric-section">
      <h4 class="section-title">🛡️ Safety & Efficiency</h4>
      <div class="metric-item">
        <span class="metric-label">Safety Score</span>
        <span class="metric-value {getPerformanceClass(metrics.safetyScore, { excellent: 95, good: 90, acceptable: 85 })}">
          {formatDecimal(metrics.safetyScore)}/100
        </span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Incidents</span>
        <span class="metric-value {metrics.incidentCount === 0 ? 'performance-excellent' : metrics.incidentCount <= 1 ? 'performance-good' : 'performance-poor'}">
          {formatInteger(metrics.incidentCount)}
        </span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Fuel Efficiency</span>
        <span class="metric-value {getPerformanceClass(metrics.fuelEfficiency, { excellent: 7, good: 6.5, acceptable: 6 })}">
          {formatDecimal(metrics.fuelEfficiency)} MPG
        </span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Load Factor</span>
        <span class="metric-value {getPerformanceClass(metrics.loadFactorAverage * 100, { excellent: 90, good: 85, acceptable: 80 })}">
          {formatPercentage(metrics.loadFactorAverage * 100)}
        </span>
      </div>
    </div>
  </div>
{/if}

<style>
  .operational-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .metric-section {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    padding: 1rem;
  }
  
  .section-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--foreground);
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
  }
  
  .metric-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--muted);
  }
  
  .metric-item:last-child {
    border-bottom: none;
  }
  
  .metric-label {
    font-size: 0.875rem;
    color: var(--muted-foreground);
    font-weight: 500;
  }
  
  .metric-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--foreground);
    text-align: right;
  }
  
  .metric-value.primary {
    color: var(--primary);
    font-size: 1rem;
  }
  
  .metric-value.success {
    color: var(--success);
  }
  
  .performance-excellent {
    color: var(--success) !important;
    font-weight: 700;
  }
  
  .performance-good {
    color: var(--primary) !important;
    font-weight: 600;
  }
  
  .performance-acceptable {
    color: var(--warning) !important;
  }
  
  .performance-poor {
    color: var(--error) !important;
    font-weight: 700;
  }
  
  .pickup-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    color: var(--muted-foreground);
  }
  
  .pickup-spinner {
    width: 2rem;
    height: 2rem;
    border: 2px solid var(--muted);
    border-top: 2px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .operational-grid {
      grid-template-columns: 1fr;
    }
  }
</style> 