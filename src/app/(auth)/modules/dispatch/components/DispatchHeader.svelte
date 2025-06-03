<!--
  DataTracker Platform - Dispatch Header Component
  
  Header for dispatch dashboard with title and status.
-->

<script lang="ts">
  import DataTrackerLogo from '$lib/components/ui/DataTrackerLogo.svelte';
</script>

<div class="dispatch-header">
  <div class="header-content">
    <div class="header-brand">
      <DataTrackerLogo size={40} />
      <div class="brand-info">
        <h1 class="dashboard-title">Fleet Operations</h1>
        <p class="dashboard-subtitle">Complete visibility and control of your entire fleet</p>
      </div>
    </div>
  </div>
</div>

<style>
  .dispatch-header {
    margin-bottom: 1.5rem;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .header-brand {
      flex-direction: column;
      text-align: center;
    }
    
    .dashboard-title {
      font-size: 1.5rem;
    }
  }
</style> 