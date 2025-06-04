<script lang="ts">
  export let icon: string;
  export let value: string | number;
  export let label: string;
  export let subtitle: string = '';
  export let status: string = '';
  export let statusColor: string = 'text-gray-600';
  export let valueColor: string = 'text-gray-900';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  $: iconSize = size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-xl';
  $: valueSize = size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-xl';
  $: padding = size === 'lg' ? 'p-6' : size === 'md' ? 'p-4' : 'p-3';
</script>

<div class="glass-card {padding} text-center">
  <div class="{iconSize} mb-3">{icon}</div>
  <div class="metric-display {valueColor} {valueSize} mb-2">{value}</div>
  <div class="text-oil-gray font-medium">{label}</div>
  {#if subtitle}
    <div class="mt-2 text-sm text-oil-gray">{subtitle}</div>
  {/if}
  {#if status}
    <div class="mt-2 text-sm {statusColor}">{status}</div>
  {/if}
</div> 