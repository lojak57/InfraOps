<!--
  DataTracker Platform - Financial Overview Component
  
  Professional display of financial metrics including revenue,
  costs, profitability, and efficiency indicators.
-->

<script lang="ts">
  import type { FinancialMetrics } from '$lib/core/types/common.types';
  
  export let metrics: FinancialMetrics | null;
  
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format percentage values
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  
  // Get trend indicator
  const getTrendIndicator = (value: number) => {
    if (value > 5) return { icon: '📈', class: 'trend-up' };
    if (value < -5) return { icon: '📉', class: 'trend-down' };
    return { icon: '➡️', class: 'trend-stable' };
  };
</script>

{#if !metrics}
  <div class="pickup-state">
    <div class="pickup-spinner"></div>
    <p>Loading financial metrics...</p>
  </div>
{:else}
  <div class="financial-grid">
    <!-- Revenue Section -->
    <div class="metric-section">
      <h4 class="section-title">💰 Revenue</h4>
      <div class="metric-item">
        <span class="metric-label">Total Revenue</span>
        <span class="metric-value primary">{formatCurrency(metrics.totalRevenue)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Revenue per Job</span>
        <span class="metric-value">{formatCurrency(metrics.revenuePerJob)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Revenue per Mile</span>
        <span class="metric-value">{formatCurrency(metrics.revenuePerMile)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Growth Rate</span>
        <span class="metric-value {getTrendIndicator(metrics.revenueGrowth * 100).class}">
          {getTrendIndicator(metrics.revenueGrowth * 100).icon}
          {formatPercentage(metrics.revenueGrowth * 100)}
        </span>
      </div>
    </div>
    
    <!-- Profitability Section -->
    <div class="metric-section">
      <h4 class="section-title">📊 Profitability</h4>
      <div class="metric-item">
        <span class="metric-label">Gross Profit</span>
        <span class="metric-value success">{formatCurrency(metrics.grossProfit)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Net Profit</span>
        <span class="metric-value">{formatCurrency(metrics.netProfit)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Gross Margin</span>
        <span class="metric-value">{formatPercentage(metrics.grossMargin)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Net Margin</span>
        <span class="metric-value">{formatPercentage(metrics.netMargin)}</span>
      </div>
    </div>
    
    <!-- Costs Section -->
    <div class="metric-section">
      <h4 class="section-title">💸 Cost Breakdown</h4>
      <div class="metric-item">
        <span class="metric-label">Total Costs</span>
        <span class="metric-value warning">{formatCurrency(metrics.totalCosts)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Fuel Costs</span>
        <span class="metric-value">{formatCurrency(metrics.fuelCosts)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Driver Costs</span>
        <span class="metric-value">{formatCurrency(metrics.driverCosts)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Maintenance</span>
        <span class="metric-value">{formatCurrency(metrics.maintenanceCosts)}</span>
      </div>
    </div>
    
    <!-- Efficiency Section -->
    <div class="metric-section">
      <h4 class="section-title">⚡ Efficiency</h4>
      <div class="metric-item">
        <span class="metric-label">Utilization Rate</span>
        <span class="metric-value">{formatPercentage(metrics.utilizationRate)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Empty Miles</span>
        <span class="metric-value">{formatPercentage(metrics.emptyMilePercentage)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Cost Efficiency</span>
        <span class="metric-value">{metrics.costEfficiencyIndex.toFixed(1)}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">EBITDA</span>
        <span class="metric-value">{formatCurrency(metrics.ebitda)}</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .financial-grid {
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
  
  .metric-value.warning {
    color: var(--warning);
  }
  
  .metric-value.trend-up {
    color: var(--success);
  }
  
  .metric-value.trend-down {
    color: var(--error);
  }
  
  .metric-value.trend-stable {
    color: var(--muted-foreground);
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
    .financial-grid {
      grid-template-columns: 1fr;
    }
  }
</style> 