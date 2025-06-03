<!--
  DataTracker Platform - Executive Header Component
  
  Professional header for executive dashboard with branding,
  title, and real-time status indicators.
-->

<script lang="ts">
  import { executiveStore } from '$lib/core/stores/executive.store';
  import DataTrackerLogo from '$lib/components/ui/DataTrackerLogo.svelte';
  
  // Subscribe to store state
  $: state = $executiveStore;
  
  // Get current date/time for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  // Get refresh status
  $: isRefreshing = state.isRefreshing;
  $: lastUpdate = state.lastUpdate;
</script>

<div class="executive-header">
  <!-- Logo and Branding -->
  <div class="header-brand">
    <DataTrackerLogo size={48} />
    <div class="brand-info">
      <h1 class="dashboard-title">Executive Dashboard</h1>
      <p class="dashboard-subtitle">Real-time Business Intelligence & Performance Analytics</p>
    </div>
  </div>
  
  <!-- Status and Time -->
  <div class="header-status">
    <div class="time-display">
      <div class="current-date">{formatDate(new Date())}</div>
      <div class="current-time">{formatTime(new Date())}</div>
    </div>
    
    <div class="refresh-status">
      {#if isRefreshing}
        <div class="status-indicator refreshing">
          <div class="spinner"></div>
          <span>Updating...</span>
        </div>
      {:else}
        <div class="status-indicator live">
          <div class="status-dot"></div>
          <span>Live Data</span>
        </div>
      {/if}
      
      {#if lastUpdate}
        <div class="last-update">
          Last: {formatTime(lastUpdate)}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .executive-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .header-brand {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .brand-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .dashboard-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--foreground);
    margin: 0;
    line-height: 1.2;
  }
  
  .dashboard-subtitle {
    font-size: 0.875rem;
    color: var(--muted-foreground);
    margin: 0;
    line-height: 1.4;
  }
  
  .header-status {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    text-align: right;
  }
  
  .time-display {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  
  .current-date {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--foreground);
  }
  
  .current-time {
    font-size: 0.75rem;
    color: var(--muted-foreground);
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  }
  
  .refresh-status {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }
  
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .status-indicator.live {
    color: var(--success);
  }
  
  .status-indicator.refreshing {
    color: var(--primary);
  }
  
  .status-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: var(--success);
    animation: pulse 2s infinite;
  }
  
  .spinner {
    width: 0.5rem;
    height: 0.5rem;
    border: 1px solid var(--primary-light);
    border-top: 1px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .last-update {
    font-size: 0.675rem;
    color: var(--muted-foreground);
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .executive-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .header-brand {
      flex-direction: column;
      text-align: center;
    }
    
    .header-status {
      align-items: center;
      text-align: center;
    }
    
    .dashboard-title {
      font-size: 1.5rem;
    }
    
    .brand-info {
      align-items: center;
    }
  }
  
  @media (max-width: 480px) {
    .dashboard-title {
      font-size: 1.25rem;
    }
    
    .dashboard-subtitle {
      font-size: 0.8rem;
    }
  }
</style> 