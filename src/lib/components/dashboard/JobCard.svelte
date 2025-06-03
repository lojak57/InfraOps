<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Job, Driver, Truck } from '$lib/stores/jobStore';

	export let job: Job;
	export let driver: Driver;
	export let truck: Truck;

	const dispatch = createEventDispatcher();

	function getStatusColor(status: string) {
		switch (status) {
			case 'pickup': return 'bg-amber-400';
			case 'transit': return 'bg-blue-400';
			case 'offpickup': return 'bg-emerald-400';
			case 'completed': return 'bg-slate-400';
			default: return 'bg-slate-400';
		}
	}

	function getStatusIcon(status: string) {
		switch (status) {
			case 'pickup': return '📦';
			case 'transit': return '🚛';
			case 'offpickup': return '🏭';
			case 'completed': return '✅';
			default: return '❓';
		}
	}

	function formatTime(minutes: number) {
		const hours = Math.floor(minutes / 60);
		const mins = Math.round(minutes % 60);
		if (hours > 0) {
			return `${hours}h ${mins}m`;
		}
		return `${mins}m`;
	}

	$: latestReading = job.temperatureReadings[job.temperatureReadings.length - 1];
</script>

<div 
	class="glass-card p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
	on:click={() => dispatch('select')}
	on:keydown={(e) => e.key === 'Enter' && dispatch('select')}
	role="button"
	tabindex="0"
>
	<!-- Header -->
	<div class="flex items-start justify-between mb-4">
		<div>
			<div class="flex items-center gap-2 mb-1">
				<div class="text-2xl">{getStatusIcon(job.status)}</div>
				<div class="text-lg font-semibold text-oil-black capitalize">{job.status}</div>
				<div class="w-3 h-3 {getStatusColor(job.status)} rounded-full shadow-sm animate-pulse"></div>
			</div>
			<div class="text-sm text-oil-gray">Job ID: {job.id.slice(-8)}</div>
		</div>
		<div class="text-right">
			<div class="font-mono text-sm text-oil-black">{truck.plateNumber}</div>
			<div class="text-xs text-oil-gray">{truck.model}</div>
		</div>
	</div>

	<!-- Route -->
	<div class="flex items-center gap-2 mb-4 p-3 bg-white/50 rounded-xl">
		<div class="flex-1">
			<div class="text-sm font-medium text-oil-black">{job.onloadSite.name}</div>
			<div class="text-xs text-oil-gray">Origin</div>
		</div>
		<div class="flex-shrink-0">
			<div class="w-8 h-8 bg-gradient-to-r from-primary-orange to-oil-blue rounded-full flex items-center justify-center">
				<div class="text-white text-xs">→</div>
			</div>
		</div>
		<div class="flex-1 text-right">
			<div class="text-sm font-medium text-oil-black">{job.offloadSite.name}</div>
			<div class="text-xs text-oil-gray">Destination</div>
		</div>
	</div>

	<!-- Progress Bar (for transit) -->
	{#if job.status === 'transit'}
		<div class="mb-4">
			<div class="flex justify-between text-xs text-oil-gray mb-1">
				<span>Progress</span>
				<span>{job.transitProgress.toFixed(1)}%</span>
			</div>
			<div class="w-full bg-slate-200 rounded-full h-2">
				<div 
					class="bg-gradient-to-r from-primary-orange to-oil-blue h-2 rounded-full transition-all duration-500"
					style="width: {job.transitProgress}%"
				></div>
			</div>
			<div class="text-xs text-oil-gray mt-1">ETA: {formatTime(job.estimatedTimeRemaining)}</div>
		</div>
	{/if}

	<!-- Key Metrics Grid -->
	<div class="grid grid-cols-2 gap-4 mb-4">
		<div class="text-center p-3 bg-white/30 rounded-xl">
			<div class="metric-display text-primary-orange text-xl">{job.initialVolume.toLocaleString()}</div>
			<div class="text-xs text-oil-gray">Initial Volume (gal)</div>
		</div>
		<div class="text-center p-3 bg-white/30 rounded-xl">
			<div class="metric-display text-oil-blue text-xl">{job.expectedLoss.toFixed(1)}</div>
			<div class="text-xs text-oil-gray">Expected Loss (gal)</div>
		</div>
	</div>

	<!-- Live Temperature Data -->
	{#if latestReading}
		<div class="grid grid-cols-2 gap-4 mb-4">
			<div class="text-center p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200/50">
				<div class="flex items-center justify-center gap-1 mb-1">
					<span class="text-lg">🌡️</span>
					<span class="text-xs text-amber-700">Internal</span>
				</div>
				<div class="metric-display text-amber-700 text-lg">{latestReading.internal.toFixed(1)}°F</div>
			</div>
			<div class="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200/50">
				<div class="flex items-center justify-center gap-1 mb-1">
					<span class="text-lg">☀️</span>
					<span class="text-xs text-orange-700">Ambient</span>
				</div>
				<div class="metric-display text-orange-700 text-lg">{latestReading.ambient.toFixed(1)}°F</div>
			</div>
		</div>
	{/if}

	<!-- Driver Info -->
	<div class="flex items-center justify-between pt-4 border-t border-white/20">
		<div class="flex items-center gap-3">
			<div class="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
				<span class="text-white text-xs font-bold">{driver.name.split(' ').map(n => n[0]).join('')}</span>
			</div>
			<div>
				<div class="text-sm font-medium text-oil-black">{driver.name}</div>
				<div class="text-xs text-oil-gray">{driver.experience}y experience</div>
			</div>
		</div>
		<div class="text-right">
			<div class="text-sm font-mono text-oil-black">{driver.averageEfficiency.toFixed(1)}%</div>
			<div class="text-xs text-oil-gray">Efficiency</div>
		</div>
	</div>

	<!-- Variance Alert (for offpickup) -->
	{#if job.status === 'offpickup' && job.actualLoss !== undefined}
		{@const variance = Math.abs(job.actualLoss - job.expectedLoss)}
		{@const variancePercent = (variance / job.expectedLoss * 100)}
		<div class="mt-4 p-3 rounded-xl {variancePercent > 10 ? 'bg-red-50 border border-red-200' : variancePercent > 5 ? 'bg-amber-50 border border-amber-200' : 'bg-emerald-50 border border-emerald-200'}">
			<div class="flex items-center justify-between">
				<div class="text-sm font-medium {variancePercent > 10 ? 'text-red-700' : variancePercent > 5 ? 'text-amber-700' : 'text-emerald-700'}">
					Actual Loss: {job.actualLoss.toFixed(1)} gal
				</div>
				<div class="text-xs {variancePercent > 10 ? 'text-red-600' : variancePercent > 5 ? 'text-amber-600' : 'text-emerald-600'}">
					{variancePercent > 10 ? '⚠️ High' : variancePercent > 5 ? '⚠️ Moderate' : '✅ Normal'} Variance
				</div>
			</div>
		</div>
	{/if}
</div> 