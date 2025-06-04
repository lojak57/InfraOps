<script lang="ts">
  import MetricCard from '../shared/MetricCard.svelte';
  import NoDataMessage from '../shared/NoDataMessage.svelte';
  import RealtimeChart from '$lib/components/charts/RealtimeChart.svelte';
  import { formatNumber, formatTemperature, TEMP_THRESHOLDS } from '../utils/jobDetailUtils';
  import type { Job } from '$lib/stores/jobStore';

  export let job: Job;
  
  $: dryDriveData = (job as any).dryDriveData || [];
  $: latestDryDrive = dryDriveData.length > 0 ? dryDriveData[dryDriveData.length - 1] : null;
</script>

<div class="space-y-6">
  <div class="text-center mb-6">
    <h3 class="text-2xl font-semibold text-oil-black mb-2">DryDrive System</h3>
    <p class="text-oil-gray">Pump performance and electrical system monitoring</p>
  </div>

  {#if latestDryDrive}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        icon="⚙️"
        value={formatNumber(latestDryDrive.pumpRpm || 0, 0)}
        label="Pump RPM"
        status="✓ Optimal Speed"
        statusColor="text-blue-600"
        valueColor="text-blue-600"
        size="lg"
      />
      <MetricCard
        icon="🌡️"
        value={formatTemperature(latestDryDrive.pumpTemp || 0)}
        label="Pump Temperature"
        status={(latestDryDrive.pumpTemp || 0) > TEMP_THRESHOLDS.pump ? '⚠️ High' : '✓ Normal'}
        statusColor={(latestDryDrive.pumpTemp || 0) > TEMP_THRESHOLDS.pump ? 'text-red-600' : 'text-emerald-600'}
        valueColor="text-red-600"
        size="lg"
      />
    </div>

    <div class="glass-card p-6">
      <h4 class="font-semibold text-oil-black mb-4">Performance Trends</h4>
      <RealtimeChart 
        title="DryDrive Performance Metrics"
        color="#8b5cf6"
        height={300}
        unit="%"
        animated={true}
      />
    </div>
  {:else}
    <NoDataMessage icon="⚙️" message="No DryDrive data available" />
  {/if}
</div> 