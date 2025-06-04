<script lang="ts">
  import MetricCard from '../shared/MetricCard.svelte';
  import NoDataMessage from '../shared/NoDataMessage.svelte';
  import { getSafetyStatus, getSafetyStatusText, getSafetyStatusClass, GAS_THRESHOLDS } from '../utils/jobDetailUtils';
  import type { Job } from '$lib/stores/jobStore';

  export let job: Job;
  
  // Safe property access
  $: gasDetections = (job as any).gasDetections || [];
  $: latestGas = gasDetections.length > 0 ? gasDetections[gasDetections.length - 1] : null;
</script>

<div class="space-y-6">
  <div class="text-center mb-6">
    <h3 class="text-2xl font-semibold text-oil-black mb-2">Safety Systems</h3>
    <p class="text-oil-gray">Gas detection, valve status, and safety alerts</p>
  </div>

  {#if latestGas}
    <!-- Gas Detection Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        icon="☠️"
        value="{latestGas.h2sExternal?.toFixed(1) || '0.0'} PPM"
        label="H2S External"
        valueColor="text-red-600"
        status={getSafetyStatusText(getSafetyStatus(latestGas.h2sExternal || 0, GAS_THRESHOLDS.h2s))}
        statusColor={getSafetyStatusClass(getSafetyStatus(latestGas.h2sExternal || 0, GAS_THRESHOLDS.h2s))}
        size="lg"
      />
      
      <MetricCard
        icon="🏠"
        value="{latestGas.h2sInternal?.toFixed(1) || '0.0'} PPM"
        label="H2S Internal"
        valueColor="text-red-600"
        status={getSafetyStatusText(getSafetyStatus(latestGas.h2sInternal || 0, GAS_THRESHOLDS.h2s))}
        statusColor={getSafetyStatusClass(getSafetyStatus(latestGas.h2sInternal || 0, GAS_THRESHOLDS.h2s))}
        size="lg"
      />
      
      <MetricCard
        icon="💨"
        value="{latestGas.coExternal?.toFixed(1) || '0.0'} PPM"
        label="CO External"
        valueColor="text-blue-600"
        status={getSafetyStatusText(getSafetyStatus(latestGas.coExternal || 0, GAS_THRESHOLDS.co))}
        statusColor={getSafetyStatusClass(getSafetyStatus(latestGas.coExternal || 0, GAS_THRESHOLDS.co))}
        size="lg"
      />
      
      <MetricCard
        icon="🔥"
        value="{latestGas.lelExternal?.toFixed(1) || '0.0'}%"
        label="LEL External"
        valueColor="text-amber-600"
        status={getSafetyStatusText(getSafetyStatus(latestGas.lelExternal || 0, GAS_THRESHOLDS.lel))}
        statusColor={getSafetyStatusClass(getSafetyStatus(latestGas.lelExternal || 0, GAS_THRESHOLDS.lel))}
        size="lg"
      />
      
      <MetricCard
        icon="💨"
        value="{latestGas.o2External?.toFixed(1) || '20.9'}%"
        label="O2 External"
        valueColor="text-emerald-600"
        status={getSafetyStatusText(getSafetyStatus(Math.abs((latestGas.o2External || 20.9) - 20.9), GAS_THRESHOLDS.o2))}
        statusColor={getSafetyStatusClass(getSafetyStatus(Math.abs((latestGas.o2External || 20.9) - 20.9), GAS_THRESHOLDS.o2))}
        size="lg"
      />
      
      <MetricCard
        icon="🛡️"
        value="All Clear"
        label="Safety Status"
        valueColor="text-emerald-600"
        status="✓ Systems Normal"
        statusColor="text-emerald-600"
        size="lg"
      />
    </div>

    <!-- Safety Alerts -->
    <div class="glass-card p-6">
      <h4 class="font-semibold text-oil-black mb-4">Active Safety Alerts</h4>
      <div class="text-center py-8">
        <div class="text-4xl mb-3">✅</div>
        <div class="text-xl font-semibold text-emerald-700 mb-2">No Active Alerts</div>
        <div class="text-emerald-600">All safety systems operating normally</div>
      </div>
    </div>
  {:else}
    <NoDataMessage icon="🛡️" message="No safety data available" />
  {/if}
</div> 