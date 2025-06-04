<script lang="ts">
  import MetricCard from '../shared/MetricCard.svelte';
  import NoDataMessage from '../shared/NoDataMessage.svelte';
  import RealtimeChart from '$lib/components/charts/RealtimeChart.svelte';
  import { formatTemperature } from '../utils/jobDetailUtils';
  import type { Job } from '$lib/stores/jobStore';

  export let job: Job;
  
  // Safe property access
  $: temperatureReadings = (job as any).temperatureReadings || [];
  $: latestReading = temperatureReadings.length > 0 ? temperatureReadings[temperatureReadings.length - 1] : null;
</script>

<div class="space-y-6">
  <div class="text-center mb-6">
    <h3 class="text-2xl font-semibold text-oil-black mb-2">Temperature Monitoring</h3>
    <p class="text-oil-gray">Multi-sensor temperature tracking and analysis</p>
  </div>

  {#if latestReading}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MetricCard
        icon="🌡️"
        value={formatTemperature(latestReading.internal || 0)}
        label="Internal Oil Temperature"
        subtitle="Primary measurement"
        valueColor="text-blue-600"
        size="lg"
      />
      
      <MetricCard
        icon="☀️"
        value={formatTemperature(latestReading.ambient || 0)}
        label="Ambient Temperature"
        subtitle="External conditions"
        valueColor="text-orange-600"
        size="lg"
      />
      
      <MetricCard
        icon="🚛"
        value={formatTemperature(latestReading.tankerTemp || 0)}
        label="Tanker Temperature"
        subtitle="Tank wall temperature"
        valueColor="text-emerald-600"
        size="lg"
      />
      
      <MetricCard
        icon="🛢️"
        value={formatTemperature(latestReading.oilTemp || 0)}
        label="Oil Temperature"
        subtitle="Product temperature"
        valueColor="text-red-600"
        size="lg"
      />
    </div>

    <!-- Temperature Differential Analysis -->
    <div class="glass-card p-6">
      <h4 class="font-semibold text-oil-black mb-4">Temperature Analysis</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center p-4 bg-blue-50 rounded-xl">
          <div class="text-lg mb-2">🔄</div>
          <div class="font-semibold text-blue-700">
            {((latestReading.ambient || 0) - (latestReading.internal || 0)).toFixed(1)}°F
          </div>
          <div class="text-sm text-blue-600">Ambient Differential</div>
        </div>
        <div class="text-center p-4 bg-emerald-50 rounded-xl">
          <div class="text-lg mb-2">📊</div>
          <div class="font-semibold text-emerald-700">
            {((latestReading.tankerTemp || 0) - (latestReading.oilTemp || 0)).toFixed(1)}°F
          </div>
          <div class="text-sm text-emerald-600">Tank Differential</div>
        </div>
        <div class="text-center p-4 bg-amber-50 rounded-xl">
          <div class="text-lg mb-2">⚡</div>
          <div class="font-semibold text-amber-700">Normal</div>
          <div class="text-sm text-amber-600">Thermal Status</div>
        </div>
      </div>
    </div>

    <!-- Temperature Trends Chart -->
    <div class="glass-card p-6">
      <h4 class="font-semibold text-oil-black mb-4">Temperature Trends</h4>
      <RealtimeChart 
        title="Multi-Sensor Temperature"
        color="#FF6B35"
        height={300}
        unit="°F"
        animated={true}
      />
    </div>
  {:else}
    <NoDataMessage icon="🌡️" message="No temperature data available" />
  {/if}
</div> 