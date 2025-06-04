<script lang="ts">
  import MetricCard from '../shared/MetricCard.svelte';
  import { formatVolume, formatPercentage } from '../utils/jobDetailUtils';
  import type { Job } from '$lib/stores/jobStore';

  export let job: Job;
  export let driver: any; // Using any for flexibility
  export let truck: any;  // Using any for flexibility
  
  // Safe property access with fallbacks
  $: onloadSite = (job as any).onloadSite || { name: 'Unknown Origin' };
  $: offloadSite = (job as any).offloadSite || { name: 'Unknown Destination' };
  $: expectedLoss = (job as any).expectedLoss || 0;
  $: transitProgress = (job as any).transitProgress || 0;
  $: estimatedTimeRemaining = (job as any).estimatedTimeRemaining || 0;
  $: initialVolume = (job as any).initialVolume || 0;
  $: jobStatus = job.status || 'unknown';
  $: driverEfficiency = driver?.averageEfficiency || 0;
  $: truckEfficiency = truck?.averageEfficiency || 0;
</script>

<div class="space-y-6">
  <!-- Route Overview -->
  <div class="glass-card p-6">
    <h3 class="font-semibold text-oil-black mb-4 flex items-center gap-2">
      <span class="text-lg">🛣️</span>
      Route Information
    </h3>
    <div class="flex flex-col sm:flex-row items-center gap-4">
      <div class="w-full sm:flex-1 text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
        <div class="text-2xl mb-2">📍</div>
        <div class="font-semibold text-emerald-700">{onloadSite.name}</div>
        <div class="text-sm text-emerald-600">Origin</div>
      </div>
      
      <div class="hidden sm:flex items-center gap-2">
        <div class="w-12 h-1 bg-gradient-to-r from-emerald-400 to-oil-blue rounded"></div>
        <span class="text-2xl">→</span>
        <div class="w-12 h-1 bg-gradient-to-r from-oil-blue to-orange-400 rounded"></div>
      </div>
      
      <div class="w-full sm:flex-1 text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
        <div class="text-2xl mb-2">🏭</div>
        <div class="font-semibold text-orange-700">{offloadSite.name}</div>
        <div class="text-sm text-orange-600">Destination</div>
      </div>
    </div>
  </div>

  <!-- Key Metrics Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <MetricCard
      icon="🛢️"
      value={formatVolume(initialVolume)}
      label="Initial Volume (gal)"
      valueColor="text-primary-orange"
    />
    <MetricCard
      icon="📊"
      value="{transitProgress}%"
      label="Transit Progress"
      valueColor="text-oil-blue"
    />
    <MetricCard
      icon="⏱️"
      value={estimatedTimeRemaining}
      label="Minutes Remaining"
      valueColor="text-amber-600"
    />
    <MetricCard
      icon="🎯"
      value={expectedLoss.toFixed(1)}
      label="Expected Loss (gal)"
      valueColor="text-emerald-600"
    />
  </div>

  <!-- Status Summary -->
  <div class="glass-card p-6">
    <h3 class="font-semibold text-oil-black mb-4">Current Status</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="text-center p-4 bg-blue-50 rounded-xl">
        <div class="text-xl mb-2">🚛</div>
        <div class="font-semibold text-blue-700 capitalize">{jobStatus}</div>
        <div class="text-sm text-blue-600">Job Status</div>
      </div>
      <div class="text-center p-4 bg-emerald-50 rounded-xl">
        <div class="text-xl mb-2">👨‍💼</div>
        <div class="font-semibold text-emerald-700">{formatPercentage(driverEfficiency)}</div>
        <div class="text-sm text-emerald-600">Driver Efficiency</div>
      </div>
      <div class="text-center p-4 bg-amber-50 rounded-xl">
        <div class="text-xl mb-2">🚚</div>
        <div class="font-semibold text-amber-700">{formatPercentage(truckEfficiency)}</div>
        <div class="text-sm text-amber-600">Truck Efficiency</div>
      </div>
    </div>
  </div>
</div> 