<!--
  DataTracker Platform - Dispatch Module
  
  Main dispatch dashboard for fleet operations, active jobs,
  and real-time fleet status monitoring.
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  // Components
  import DispatchHeader from './components/DispatchHeader.svelte';
  import FleetMetrics from './components/FleetMetrics.svelte';
  import ActiveJobsGrid from './components/ActiveJobsGrid.svelte';
  import SystemStatusPanel from './components/SystemStatusPanel.svelte';
  
  let isLoading = true;
  let error: string | null = null;
  
  onMount(async () => {
    try {
      // Initialize dispatch dashboard
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate pickup
      isLoading = false;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load dispatch dashboard';
      isLoading = false;
    }
  });
  
  onDestroy(() => {
    // Cleanup when component is destroyed
  });
</script>

<svelte:head>
  <title>Dispatch Dashboard - DataTracker Platform</title>
  <meta name="description" content="Fleet operations and dispatch management dashboard" />
</svelte:head>

<!-- Loading State -->
{#if isLoading}
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center space-y-4">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="text-muted-foreground">Loading dispatch dashboard...</p>
    </div>
  </div>

<!-- Error State -->
{:else if error}
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center space-y-4 max-w-md">
      <div class="text-red-500 text-5xl">⚠️</div>
      <h2 class="text-xl font-semibold text-foreground">Dispatch Error</h2>
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
  <div class="dispatch-dashboard">
    <!-- Header Section -->
    <DispatchHeader />
    
    <!-- Fleet Metrics Overview -->
    <div class="dashboard-section">
      <h2 class="section-title">Fleet Overview</h2>
      <FleetMetrics />
    </div>
    
    <!-- Active Jobs Grid -->
    <div class="dashboard-section">
      <h2 class="section-title">Active Operations</h2>
      <ActiveJobsGrid />
    </div>
    
    <!-- System Status Panel -->
    <div class="dashboard-section">
      <h2 class="section-title">System Status</h2>
      <SystemStatusPanel />
    </div>
  </div>
{/if}

<style>
  .dispatch-dashboard {
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
    .dispatch-dashboard {
      padding: 1rem;
      gap: 1rem;
    }
  }
</style> 