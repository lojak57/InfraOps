<!--
  DataTracker Platform - Fleet Metrics Component
  
  Professional display of fleet-level performance metrics.
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { activeJobs } from '$lib/stores/jobStore';
  import MetricCard from '$lib/components/ui/MetricCard.svelte';
  
  // Fleet-level metrics
  let totalActiveVolume = 0;
  let averageEfficiency = 0;
  let systemHealthScore = 0;
  let alertCount = 0;
  
  let updateInterval: number;
  
  // Real-time fleet metrics simulation
  onMount(() => {
    updateInterval = setInterval(() => {
      // Calculate fleet-level metrics
      totalActiveVolume = $activeJobs.reduce((sum, job) => sum + job.initialVolume, 0);
      averageEfficiency = 95 + Math.random() * 5; // 95-100%
      systemHealthScore = 92 + Math.random() * 8; // 92-100%
      alertCount = Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0;
    }, 4000);
  });
  
  onDestroy(() => {
    if (updateInterval) {
      clearInterval(updateInterval);
    }
  });
</script>

<div class="fleet-metrics">
  <div class="metrics-grid">
    <MetricCard
      title="Total Active Volume"
      value={totalActiveVolume}
      unit="gal"
      icon="🛢️"
      status="normal"
      trend="stable"
      trendValue="Optimal"
    />
    
    <MetricCard
      title="Fleet Efficiency"
      value={averageEfficiency}
      unit="%"
      icon="⚡"
      status={averageEfficiency > 97 ? 'normal' : 'warning'}
      trend="up"
      trendValue="+0.3%"
    />
    
    <MetricCard
      title="System Health"
      value={systemHealthScore}
      unit="%"
      icon="🛡️"
      status={systemHealthScore > 95 ? 'normal' : 'warning'}
      trend="stable"
      trendValue="Excellent"
    />
    
    <MetricCard
      title="Active Alerts"
      value={alertCount}
      unit=""
      icon="🚨"
      status={alertCount > 0 ? 'warning' : 'normal'}
      trend="stable"
      trendValue={alertCount > 0 ? 'Review' : 'Clear'}
    />
  </div>
</div>

<style>
  .fleet-metrics {
    width: 100%;
  }
  
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .metrics-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
  }
  
  @media (min-width: 1024px) {
    .metrics-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style> 