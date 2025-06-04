<script lang="ts">
  import MetricCard from '../shared/MetricCard.svelte';
  import NoDataMessage from '../shared/NoDataMessage.svelte';
  import RealtimeChart from '$lib/components/charts/RealtimeChart.svelte';
  import { formatPressure } from '../utils/jobDetailUtils';
  import type { Job } from '$lib/stores/jobStore';

  export let job: Job;
  
  $: pressureReadings = (job as any).pressureReadings || [];
  $: latestPressure = pressureReadings.length > 0 ? pressureReadings[pressureReadings.length - 1] : null;
</script>

<div class="space-y-6">
  <div class="text-center mb-6">
    <h3 class="text-2xl font-semibold text-oil-black mb-2">Pressure Systems</h3>
    <p class="text-oil-gray">Comprehensive pressure monitoring and safety thresholds</p>
  </div>

  {#if latestPressure}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MetricCard
        icon="⬆️"
        value={formatPressure(latestPressure.tankerOnLoad || 0)}
        label="Tanker OnLoad"
        status="✓ Normal Range"
        statusColor="text-emerald-600"
        valueColor="text-emerald-600"
        size="lg"
      />
      <MetricCard
        icon="⬇️"
        value={formatPressure(latestPressure.tankerOffLoad || 0)}
        label="Tanker OffLoad"
        status="✓ Vacuum Normal"
        statusColor="text-blue-600"
        valueColor="text-blue-600"
        size="lg"
      />
    </div>

    <div class="glass-card p-6">
      <h4 class="font-semibold text-oil-black mb-4">Pressure Trends</h4>
      <RealtimeChart 
        title="Pressure System Monitoring"
        color="#10b981"
        height={300}
        unit=" PSI"
        animated={true}
      />
    </div>
  {:else}
    <NoDataMessage icon="⚡" message="No pressure data available" />
  {/if}
</div> 