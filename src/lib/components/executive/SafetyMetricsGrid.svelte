<script lang="ts">
  import { Award, Users, CheckCircle, Clock } from 'lucide-svelte';
  import MetricCard from '$lib/components/ui/MetricCard.svelte';
  import type { SafetyBreakdown } from './safety-analytics.types';

  export let breakdown: SafetyBreakdown;
</script>

<div class="metrics-section">
  <h2 class="text-xl font-semibold text-slate-800 mb-6">Key Safety Metrics</h2>
  <div class="metrics-grid chart-card-container">
    <MetricCard 
      title="Days Without Incident" 
      value="{breakdown.incidents.lastIncident}" 
      unit="days" 
      icon={Award}
      status="normal"
      trend="up"
      trendValue="Current streak"
      color="emerald"
    />
    <MetricCard 
      title="Training Completion" 
      value="{breakdown.training.percentage}" 
      unit="%" 
      icon={Users}
      status="normal"
      trend="up"
      trendValue="+2.1%"
      color="blue"
    />
    <MetricCard 
      title="Vehicle Inspections" 
      value="{breakdown.inspections.percentage}" 
      unit="%" 
      icon={CheckCircle}
      status="normal"
      trend="up"
      trendValue="+0.8%"
      color="emerald"
    />
    <MetricCard 
      title="Incident Response Time" 
      value="4.2" 
      unit="min avg" 
      icon={Clock}
      status="normal"
      trend="down"
      trendValue="-15%"
      color="blue"
    />
  </div>
</div>

<style>
  .metrics-section {
    margin-bottom: 40px;
  }

  .chart-card-container {
    display: grid;
    gap: 20px;
  }

  .metrics-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (max-width: 768px) {
    .metrics-grid {
      grid-template-columns: 1fr;
    }

    .chart-card-container {
      gap: 16px;
    }
  }
</style> 