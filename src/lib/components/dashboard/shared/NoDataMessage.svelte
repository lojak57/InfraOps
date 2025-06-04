<script lang="ts">
  export let icon: string;
  export let message: string;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  $: iconSize = size === 'lg' ? 'text-6xl' : size === 'md' ? 'text-4xl' : 'text-3xl';
  $: textSize = size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg';
  $: padding = size === 'lg' ? 'py-16' : size === 'md' ? 'py-12' : 'py-8';
</script>

<div class="text-center {padding}">
  <div class="{iconSize} mb-4">{icon}</div>
  <div class="{textSize} text-oil-gray">{message}</div>
</div> 