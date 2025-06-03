<!--
  DataTracker Platform - Monitoring Module
  
  Main monitoring dashboard for SCADA systems, telemetry,
  and real-time equipment monitoring.
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { monitoringStore, monitoringActions } from '$lib/core/stores/monitoring.store';
  
  // Components
  import MonitoringHeader from './components/MonitoringHeader.svelte';
  import SystemOverview from './components/SystemOverview.svelte';
  import SensorGrid from './components/SensorGrid.svelte';
  import ValveControlPanel from './components/ValveControlPanel.svelte';
  import AlertsPanel from './components/AlertsPanel.svelte';
  
  let isLoading = true;
  let error: string | null = null;
  
  onMount(async () => {
    try {
      // Initialize monitoring store
      await monitoringActions.initialize('user-monitoring-1', 'datatracker');
      isLoading = false;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load monitoring dashboard';
      isLoading = false;
    }
  });
  
  onDestroy(() => {
    // Cleanup when component is destroyed
    monitoringActions.stopRealTimeUpdates();
  });
  
  // Subscribe to store state
  $: state = $monitoringStore;
</script>

<svelte:head>
  <title>Monitoring Dashboard - DataTracker Platform</title>
  <meta name="description" content="SCADA monitoring and telemetry dashboard" />
</svelte:head>

<!-- Loading State -->
{#if isLoading}
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center space-y-4">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="text-muted-foreground">Loading monitoring dashboard...</p>
    </div>
  </div>

<!-- Error State -->
{:else if error}
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center space-y-4 max-w-md">
      <div class="text-red-500 text-5xl">⚠️</div>
      <h2 class="text-xl font-semibold text-foreground">Monitoring Error</h2>
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
  <div class="monitoring-dashboard">
    <!-- Header Section -->
    <MonitoringHeader />
    
    <!-- System Overview -->
    <div class="dashboard-section">
      <h2 class="section-title">System Overview</h2>
      <SystemOverview />
    </div>
    
    <!-- Sensor Grid -->
    <div class="dashboard-section">
      <h2 class="section-title">Sensor Telemetry</h2>
      <SensorGrid />
    </div>
    
    <!-- Valve Control Panel -->
    <div class="dashboard-section">
      <h2 class="section-title">Valve Control</h2>
      <ValveControlPanel />
    </div>
    
    <!-- Alerts Panel -->
    <div class="dashboard-section">
      <h2 class="section-title">System Alerts</h2>
      <AlertsPanel />
    </div>
  </div>
{/if}

<style>
  .monitoring-dashboard {
    min-height: 100vh;
    background-color: var(--background);
    padding: 1.5rem;
    gap: 1.5rem;
    display: flex;
    flex-direction: column;
  }
  
  .dashboard-section {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  }
  
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--foreground);
    margin: 0 0 1.5rem 0;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .monitoring-dashboard {
      padding: 1rem;
      gap: 1rem;
    }
  }
</style> 