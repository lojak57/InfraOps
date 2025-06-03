<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { activeJobs, drivers, vehicles, systemStatus, currentJob, type Job, type Driver, type Vehicle } from '$lib/stores/jobStore';
	import { useInterval } from '$lib/utils/useInterval';
	import JobCard from '$lib/components/dashboard/JobCard.svelte';
	import JobDetailView from '$lib/components/dashboard/JobDetailView.svelte';
	import SystemStatusCard from '$lib/components/dashboard/SystemStatusCard.svelte';
	import LiveDataFeed from '$lib/components/dashboard/LiveDataFeed.svelte';

	let lastUpdate = new Date(1735064220000); // Static timestamp for SSR consistency
	let selectedJob: Job | null = null;
	let jobId: string | null = null;

	// Managed interval that automatically cleans up
	const dataUpdateInterval = useInterval(
		() => {
			// Update SCADA system status
			systemStatus.update(status => ({
				...status,
				lastUpdate: new Date(),
				dataLatency: 0.8 + Math.random() * 0.8, // 0.8-1.6 seconds
				networkHealth: 97 + Math.random() * 2 // 97-99%
			}));

			// Update temperature readings for active jobs
			activeJobs.update(jobs => {
				return jobs.map(job => {
					if (job.status === 'transit' || job.status === 'pickup') {
						const newReading = {
							timestamp: new Date(),
							ambient: 88 + Math.random() * 15, // 88-103°F
							internal: 70 + Math.random() * 10,  // 70-80°F
							tankerTemp: 75 + Math.random() * 8, // 75-83°F
							oilTemp: 72 + Math.random() * 6 // 72-78°F
						};
						
						// Update transit progress for jobs in transit
						let newProgress = job.transitProgress;
						let newETA = job.estimatedTimeRemaining;
						
						if (job.status === 'transit') {
							newProgress = Math.min(100, job.transitProgress + 0.5); // Progress 0.5% every update
							newETA = Math.max(0, job.estimatedTimeRemaining - 0.5); // Reduce ETA
							
							// Update location based on progress
							const lat1 = job.onloadSite.location.lat;
							const lng1 = job.onloadSite.location.lng;
							const lat2 = job.offloadSite.location.lat;
							const lng2 = job.offloadSite.location.lng;
							
							const progressRatio = newProgress / 100;
							const currentLat = lat1 + (lat2 - lat1) * progressRatio;
							const currentLng = lng1 + (lng2 - lng1) * progressRatio;
							
							job.currentLocation = { lat: currentLat, lng: currentLng };
						}
						
						return {
							...job,
							temperatureReadings: [newReading],
							transitProgress: newProgress,
							estimatedTimeRemaining: newETA
						};
					}
					return job;
				});
			});

			lastUpdate = new Date();
		},
		3000, // Update every 3 seconds
		{ immediate: false }
	);

	onMount(() => {
		// Update to current time once mounted
		lastUpdate = new Date();
		
		// Get job ID from URL params
		jobId = $page.url.searchParams.get('id');
		if (jobId) {
			selectedJob = $activeJobs.find(h => h.id === jobId) || null;
		}
	});

	function selectJob(job: Job) {
		selectedJob = job;
	}

	function closeJobDetail() {
		selectedJob = null;
		// Navigate back to fleet or jobs page
		if (browser) {
			window.history.back();
		}
	}

	// Get driver and truck info with proper null checks
	$: driver = selectedJob ? $drivers.find(d => d.id === selectedJob!.driverId) : null;
	$: truck = selectedJob ? $vehicles.find(t => t.id === selectedJob!.truckId) : null;

	$: driverMap = $drivers.reduce((map: Record<string, Driver>, driver) => {
		map[driver.id] = driver;
		return map;
	}, {});

	$: truckMap = $vehicles.reduce((map: Record<string, Vehicle>, truck) => {
		map[truck.id] = truck;
		return map;
	}, {});
</script>

<!-- Header -->
<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
	<div>
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-oil-black">Live Job Monitoring</h1>
		<p class="text-sm sm:text-base text-oil-gray mt-2">Real-time sensor data from field operations</p>
	</div>
	<div class="text-left sm:text-right">
		<div class="text-sm text-oil-gray">Last Update</div>
		<div class="font-mono text-oil-black text-sm">{lastUpdate.toLocaleTimeString()}</div>
	</div>
</div>

<!-- System Status Row -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
	<SystemStatusCard />
	<LiveDataFeed />
	<div class="glass-card p-6">
		<div class="flex items-center gap-3 mb-4">
			<div class="w-3 h-3 bg-emerald-400 rounded-full shadow-sm animate-pulse"></div>
			<h3 class="font-semibold text-oil-black">Active Jobs</h3>
		</div>
		<div class="metric-display text-primary-orange">{$activeJobs.length}</div>
		<p class="text-sm text-oil-gray mt-2">Currently monitoring</p>
	</div>
	<div class="glass-card p-6">
		<div class="flex items-center gap-3 mb-4">
			<div class="w-3 h-3 bg-oil-blue rounded-full shadow-sm"></div>
			<h3 class="font-semibold text-oil-black">Fleet Status</h3>
		</div>
		<div class="metric-display text-oil-blue">{$vehicles.length}</div>
		<p class="text-sm text-oil-gray mt-2">Trucks operational</p>
	</div>
</div>

<!-- Active Jobs Grid -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
	{#each $activeJobs as job (job.id)}
		<JobCard 
			{job} 
			driver={driverMap[job.driverId]}
			truck={truckMap[job.truckId]}
			on:select={() => selectJob(job)}
		/>
	{/each}
</div>

{#if $activeJobs.length === 0}
	<div class="glass-card p-12 text-center">
		<div class="text-6xl mb-4">🚛</div>
		<h3 class="display-medium text-oil-black mb-2">No Active Jobs</h3>
		<p class="text-oil-gray">All trucks are currently idle or offline</p>
	</div>
{/if}

<!-- Job Detail Modal -->
{#if selectedJob && driver && truck}
	<JobDetailView 
		job={selectedJob} 
		{driver} 
		{truck} 
		on:close={closeJobDetail} 
	/>
{:else if jobId}
	<!-- Loading or not found state -->
	<div class="glass-card p-8 sm:p-12 text-center">
		<div class="text-6xl mb-4">🔍</div>
		<h3 class="text-xl font-semibold text-oil-black mb-2">Job Not Found</h3>
		<p class="text-oil-gray mb-4">The requested job could not be found or may have been completed.</p>
		<button 
			onclick={() => window.history.back()}
			class="px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-primary-orange/80 transition-colors"
		>
			Go Back
		</button>
	</div>
{:else}
	<!-- No job ID provided -->
	<div class="glass-card p-8 sm:p-12 text-center">
		<div class="text-6xl mb-4">📋</div>
		<h3 class="text-xl font-semibold text-oil-black mb-2">No Job Selected</h3>
		<p class="text-oil-gray mb-4">Please select a job from the fleet operations or job history page.</p>
		<div class="space-x-4">
			<a 
				href="/fleet"
				class="inline-block px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-primary-orange/80 transition-colors"
			>
				View Fleet
			</a>
			<a 
				href="/jobs"
				class="inline-block px-4 py-2 bg-oil-blue text-white rounded-lg hover:bg-oil-blue/80 transition-colors"
			>
				View History
			</a>
		</div>
	</div>
{/if} 