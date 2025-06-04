<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Job } from '$lib/stores/jobStore';
	
	// Tab Components
	import OverviewTab from './tabs/OverviewTab.svelte';
	import CoriolisTab from './tabs/CoriolisTab.svelte';
	import TemperatureTab from './tabs/TemperatureTab.svelte';
	import PressureTab from './tabs/PressureTab.svelte';
	import SafetyTab from './tabs/SafetyTab.svelte';
	import DryDriveTab from './tabs/DryDriveTab.svelte';

	export let job: Job;
	export let driver: any;
	export let truck: any;

	const dispatch = createEventDispatcher();

	// Tab management
	let activeTab = 'overview';
	const tabs = [
		{ id: 'overview', label: 'Overview', icon: '📊' },
		{ id: 'coriolis', label: 'Coriolis', icon: '🛢️' },
		{ id: 'temperature', label: 'Temperature', icon: '🌡️' },
		{ id: 'pressure', label: 'Pressure', icon: '⚡' },
		{ id: 'safety', label: 'Safety', icon: '🛡️' },
		{ id: 'drydrive', label: 'DryDrive', icon: '⚙️' }
	];

	// Safe property access
	$: jobId = job.id || 'unknown';
	$: driverName = driver?.name || 'Unknown Driver';
	$: truckPlate = truck?.plateNumber || 'Unknown Truck';
</script>

<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
	<div class="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
		<!-- Header -->
		<div class="bg-white/90 backdrop-blur-md rounded-t-3xl border-b border-slate-200/50 p-6 flex-shrink-0">
			<div class="flex items-center justify-between mb-4">
				<div>
					<h2 class="display-medium text-oil-black">Job Details</h2>
					<p class="text-oil-gray">ID: {jobId.slice(-8)} • {truckPlate} • {driverName}</p>
				</div>
				<button 
					on:click={() => dispatch('close')}
					class="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
				>
					<span class="text-slate-600">✕</span>
				</button>
			</div>

			<!-- Tab Navigation -->
			<div class="flex space-x-1 bg-slate-100 rounded-xl p-1">
				{#each tabs as tab}
					<button
						class="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {activeTab === tab.id ? 'bg-white text-oil-black shadow-sm' : 'text-oil-gray hover:text-oil-black'}"
						on:click={() => activeTab = tab.id}
					>
						<span class="text-base">{tab.icon}</span>
						<span class="hidden sm:inline">{tab.label}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Tab Content -->
		<div class="flex-1 overflow-y-auto p-6">
			{#if activeTab === 'overview'}
				<OverviewTab {job} {driver} {truck} />
			{:else if activeTab === 'coriolis'}
				<CoriolisTab {job} />
			{:else if activeTab === 'temperature'}
				<TemperatureTab {job} />
			{:else if activeTab === 'pressure'}
				<PressureTab {job} />
			{:else if activeTab === 'safety'}
				<SafetyTab {job} />
			{:else if activeTab === 'drydrive'}
				<DryDriveTab {job} />
			{/if}
		</div>
	</div>
</div> 