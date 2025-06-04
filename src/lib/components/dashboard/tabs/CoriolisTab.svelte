<script lang="ts">
  import MetricCard from '../shared/MetricCard.svelte';
  import NoDataMessage from '../shared/NoDataMessage.svelte';
  import RealtimeChart from '$lib/components/charts/RealtimeChart.svelte';
  import { formatNumber } from '../utils/jobDetailUtils';
  import type { Job } from '$lib/stores/jobStore';

  export let job: Job;
  
  $: coriolisReadings = (job as any).coriolisReadings || [];
  $: latestCoriolis = coriolisReadings.length > 0 ? coriolisReadings[coriolisReadings.length - 1] : null;
</script>

<div class="space-y-6">
  <div class="text-center mb-6">
    <h3 class="text-2xl font-semibold text-oil-black mb-2">Coriolis Meter Readings</h3>
    <p class="text-oil-gray">Real-time volume, flow, and gravity measurements</p>
  </div>

  {#if latestCoriolis}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        icon="🛢️"
        value={formatNumber(latestCoriolis.netVolume || 0)}
        label="Net Volume (units)"
        subtitle="Real-time measurement"
        valueColor="text-primary-orange"
        size="lg"
      />
      <MetricCard
        icon="🌊"
        value={formatNumber(latestCoriolis.massFlowRate || 0, 2)}
        label="Mass Flow Rate (units/min)"
        subtitle="Current flow"
        valueColor="text-blue-600"
        size="lg"
      />
      <MetricCard
        icon="⚖️"
        value="{formatNumber(latestCoriolis.apiGravity || 0)}°"
        label="API Gravity"
        subtitle="Oil density measure"
        valueColor="text-emerald-600"
        size="lg"
      />
    </div>

    <div class="glass-card p-6">
      <h4 class="font-semibold text-oil-black mb-4">Volume & Flow Trends</h4>
      <RealtimeChart 
        title="Volume & Flow Rate"
        color="#004E89"
        height={300}
        unit=" units/min"
        animated={true}
      />
    </div>
  {:else}
    <NoDataMessage icon="📊" message="No Coriolis data available" />
  {/if}
</div> 