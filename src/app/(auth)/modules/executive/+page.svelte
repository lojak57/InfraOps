<!--
  DataTracker Platform - Executive Dashboard
  
  Professional executive overview with real-time KPIs, financial metrics,
  and business intelligence. Utilizes the executive store for comprehensive
  analytics and performance tracking.
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { executiveStore, executiveActions, currentFinancialMetrics, currentOperationalMetrics, kpiPerformanceSummary } from '$lib/core/stores/executive.store';
  
  // Components
  import ExecutiveHeader from './components/ExecutiveHeader.svelte';
  import KPIGrid from './components/KPIGrid.svelte';
  import FinancialOverview from './components/FinancialOverview.svelte';
  import OperationalSummary from './components/OperationalSummary.svelte';
  import TimeRangeSelector from './components/TimeRangeSelector.svelte';
  
  let isLoading = true;
  let error: string | null = null;
  
  onMount(async () => {
    try {
      // Initialize executive store with user context
      await executiveActions.initialize('user-executive-1', 'datatracker');
      isLoading = false;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load executive dashboard';
      isLoading = false;
    }
  });
  
  onDestroy(() => {
    // Cleanup when component is destroyed
    executiveActions.stopRealTimeUpdates();
  });
  
  // Subscribe to store state
  $: state = $executiveStore;
  $: financialMetrics = $currentFinancialMetrics;
  $: operationalMetrics = $currentOperationalMetrics;
  $: kpiSummary = $kpiPerformanceSummary;
</script>

<svelte:head>
  <title>Executive Dashboard - DataTracker Platform</title>
  <meta name="description" content="Executive overview with real-time KPIs, financial metrics, and business intelligence" />
</svelte:head>

<!-- Loading State -->
{#if isLoading}
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center space-y-4">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="text-muted-foreground">Loading executive dashboard...</p>
    </div>
  </div>

<!-- Error State -->
{:else if error}
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center space-y-4 max-w-md">
      <div class="text-red-500 text-5xl">⚠️</div>
      <h2 class="text-xl font-semibold text-foreground">Dashboard Error</h2>
      <p class="text-muted-foreground">{error}</p>
      <button 
        class="btn btn-primary"
        on:click={() => location.reload()}
      >
        Retry
      </button>
    </div>
  </div>

<!-- Main Dashboard -->
{:else}
  <div class="executive-dashboard">
    <!-- Header Section -->
    <div class="dashboard-header">
      <ExecutiveHeader />
      <TimeRangeSelector />
    </div>
    
    <!-- KPI Performance Overview -->
    <div class="dashboard-section">
      <div class="section-header">
        <h2 class="section-title">Key Performance Indicators</h2>
        <div class="kpi-summary">
          <span class="kpi-count excellent">{kpiSummary.excellent} Excellent</span>
          <span class="kpi-count good">{kpiSummary.good} Good</span>
          <span class="kpi-count acceptable">{kpiSummary.acceptable} Acceptable</span>
          {#if kpiSummary.poor > 0}
            <span class="kpi-count poor">{kpiSummary.poor} Poor</span>
          {/if}
          {#if kpiSummary.critical > 0}
            <span class="kpi-count critical">{kpiSummary.critical} Critical</span>
          {/if}
        </div>
      </div>
      <KPIGrid />
    </div>
    
    <!-- Financial & Operational Overview -->
    <div class="dashboard-grid">
      <div class="dashboard-section">
        <h2 class="section-title">Financial Performance</h2>
        <FinancialOverview metrics={financialMetrics} />
      </div>
      
      <div class="dashboard-section">
        <h2 class="section-title">Operational Metrics</h2>
        <OperationalSummary metrics={operationalMetrics} />
      </div>
    </div>
    
    <!-- Real-time Status -->
    <div class="status-bar">
      <div class="status-item">
        <span class="status-label">Last Updated:</span>
        <span class="status-value">
          {state.lastUpdate ? new Date(state.lastUpdate).toLocaleTimeString() : 'Never'}
        </span>
      </div>
      <div class="status-item">
        <span class="status-label">Data Quality:</span>
        <span class="status-value status-good">Live</span>
      </div>
      <div class="status-item">
        <span class="status-label">Active KPIs:</span>
        <span class="status-value">{kpiSummary.total}</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .executive-dashboard {
    min-height: 100vh;
    background-color: var(--background);
    padding: 1.5rem;
    gap: 1.5rem;
    display: flex;
    flex-direction: column;
  }
  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border);
  }
  
  .dashboard-section {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--foreground);
    margin: 0;
  }
  
  .kpi-summary {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  
  .kpi-count {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .kpi-count.excellent {
    background-color: var(--success-light);
    color: var(--success-dark);
  }
  
  .kpi-count.good {
    background-color: var(--primary-light);
    color: var(--primary-dark);
  }
  
  .kpi-count.acceptable {
    background-color: var(--warning-light);
    color: var(--warning-dark);
  }
  
  .kpi-count.poor {
    background-color: var(--error-light);
    color: var(--error-dark);
  }
  
  .kpi-count.critical {
    background-color: var(--error);
    color: white;
  }
  
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    .dashboard-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: var(--muted);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .status-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .status-label {
    color: var(--muted-foreground);
    font-weight: 500;
  }
  
  .status-value {
    color: var(--foreground);
    font-weight: 600;
  }
  
  .status-value.status-good {
    color: var(--success);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .executive-dashboard {
      padding: 1rem;
      gap: 1rem;
    }
    
    .dashboard-header {
      flex-direction: column;
      align-items: stretch;
    }
    
    .section-header {
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
    }
    
    .kpi-summary {
      justify-content: center;
    }
    
    .status-bar {
      flex-direction: column;
      text-align: center;
    }
  }
</style> 