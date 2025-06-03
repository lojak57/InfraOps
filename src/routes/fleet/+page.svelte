<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import MetricCard from '$lib/components/ui/MetricCard.svelte';
	import { activeJobs, vehicles, drivers, systemStatus } from '$lib/stores/jobStore';

	// Fleet-level metrics
	let totalActiveVolume = 0;
	let averageEfficiency = 0;
	let systemHealthScore = 0;
	let alertCount = 0;
	
	let updateInterval: number;

	// Real-time fleet metrics simulation
	onMount(() => {
		updateInterval = setInterval(() => {
			// Calculate fleet-level metrics
			totalActiveVolume = $activeJobs.reduce((sum, job) => sum + job.initialVolume, 0);
			averageEfficiency = 95 + Math.random() * 5; // 95-100%
			systemHealthScore = 92 + Math.random() * 8; // 92-100%
			alertCount = Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0;
		}, 4000);
	});

	onDestroy(() => {
		if (updateInterval) {
			clearInterval(updateInterval);
		}
	});

	// Get truck and driver info for each job
	function getTruckInfo(truckId: string) {
		return $vehicles.find(truck => truck.id === truckId);
	}

	function getDriverInfo(driverId: string) {
		return $drivers.find(driver => driver.id === driverId);
	}

	// Get status color for job status
	function getStatusColor(status: string): string {
		switch (status) {
			case 'pickup': return 'bg-amber-100 text-amber-700 border-amber-200';
			case 'transit': return 'bg-blue-100 text-blue-700 border-blue-200';
			case 'offpickup': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
			case 'completed': return 'bg-gray-100 text-gray-700 border-gray-200';
			default: return 'bg-gray-100 text-gray-700 border-gray-200';
		}
	}

	// Get progress color
	function getProgressColor(progress: number): string {
		if (progress < 25) return 'bg-red-500';
		if (progress < 50) return 'bg-amber-500';
		if (progress < 75) return 'bg-blue-500';
		return 'bg-emerald-500';
	}
</script>

<!-- Header -->
<div class="text-center mb-6 sm:mb-8">
	<h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-oil-black mb-2">Fleet Operations</h1>
	<p class="text-sm sm:text-base text-oil-gray">Complete visibility and control of your entire fleet</p>
</div>

<!-- Fleet-Level Metrics -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
	<MetricCard
		title="Total Active Volume"
		value={totalActiveVolume}
		unit="gal"
		icon="🛢️"
		status="normal"
		trend="stable"
		trendValue="Optimal"
	/>
	
	<MetricCard
		title="Fleet Efficiency"
		value={averageEfficiency}
		unit="%"
		icon="⚡"
		status={averageEfficiency > 97 ? 'normal' : 'warning'}
		trend="up"
		trendValue="+0.3%"
	/>
	
	<MetricCard
		title="System Health"
		value={systemHealthScore}
		unit="%"
		icon="🛡️"
		status={systemHealthScore > 95 ? 'normal' : 'warning'}
		trend="stable"
		trendValue="Excellent"
	/>
	
	<MetricCard
		title="Active Alerts"
		value={alertCount}
		unit=""
		icon="🚨"
		status={alertCount > 0 ? 'warning' : 'normal'}
		trend="stable"
		trendValue={alertCount > 0 ? 'Review' : 'Clear'}
	/>
</div>

<!-- Active Fleet Grid -->
<div class="mb-6 sm:mb-8">
	<div class="flex items-center justify-between mb-4">
		<h3 class="text-xl sm:text-2xl font-semibold tracking-tight text-oil-black">Active Jobs</h3>
		<div class="text-sm text-oil-gray">
			{$activeJobs.length} assets active
		</div>
	</div>
	
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
		{#each $activeJobs as job}
			{@const truck = getTruckInfo(job.truckId)}
			{@const driver = getDriverInfo(job.driverId)}
			{@const latestTemp = job.temperatureReadings[job.temperatureReadings.length - 1]}
			{@const latestCoriolis = job.coriolisReadings[job.coriolisReadings.length - 1]}
			{@const latestPressure = job.pressureReadings[job.pressureReadings.length - 1]}
			
			<a href="/job?id={job.id}" class="block">
				<div class="glass-card p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
					<!-- Header -->
					<div class="flex items-center justify-between mb-4">
						<div class="flex items-center space-x-3">
							<div class="w-10 h-10 bg-primary-orange/10 rounded-xl flex items-center justify-center">
								<span class="text-lg">🚛</span>
							</div>
							<div>
								<h4 class="font-semibold text-oil-black">{truck?.plateNumber || 'Unknown'}</h4>
								<p class="text-sm text-oil-gray">{driver?.name || 'Unknown Driver'}</p>
							</div>
						</div>
						<div class="px-3 py-1 rounded-full text-xs font-medium border {getStatusColor(job.status)}">
							{job.status.charAt(0).toUpperCase() + job.status.slice(1)}
						</div>
					</div>

					<!-- Route Info -->
					<div class="mb-4">
						<div class="text-sm text-oil-gray mb-2">
							{job.onloadSite.name} → {job.offloadSite.name}
						</div>
						<div class="w-full bg-gray-200 rounded-full h-2">
							<div class="h-2 rounded-full {getProgressColor(job.transitProgress)}" style="width: {job.transitProgress}%"></div>
						</div>
						<div class="flex justify-between text-xs text-oil-gray mt-1">
							<span>{job.transitProgress}% complete</span>
							<span>{job.estimatedTimeRemaining} min remaining</span>
						</div>
					</div>

					<!-- Key Metrics Grid -->
					<div class="grid grid-cols-2 gap-3">
						<div class="bg-white/30 rounded-lg p-3">
							<div class="text-xs text-oil-gray">Volume</div>
							<div class="font-semibold text-oil-black">{latestCoriolis?.netVolume.toFixed(1) || 'N/A'} units</div>
						</div>
						<div class="bg-white/30 rounded-lg p-3">
							<div class="text-xs text-oil-gray">Oil Temp</div>
							<div class="font-semibold text-oil-black">{latestTemp?.oilTemp.toFixed(1) || 'N/A'}°F</div>
						</div>
						<div class="bg-white/30 rounded-lg p-3">
							<div class="text-xs text-oil-gray">API Gravity</div>
							<div class="font-semibold text-oil-black">{latestCoriolis?.apiGravity.toFixed(1) || 'N/A'}°</div>
						</div>
						<div class="bg-white/30 rounded-lg p-3">
							<div class="text-xs text-oil-gray">Pressure</div>
							<div class="font-semibold text-oil-black">{latestPressure?.tankerInternal.toFixed(1) || 'N/A'} PSI</div>
						</div>
					</div>

					<!-- System Status Indicators -->
					<div class="flex items-center justify-between mt-4 pt-3 border-t border-white/20">
						<div class="flex space-x-2">
							<div class="w-2 h-2 bg-emerald-400 rounded-full" title="Coriolis Online"></div>
							<div class="w-2 h-2 bg-emerald-400 rounded-full" title="Temperature Sensors Online"></div>
							<div class="w-2 h-2 bg-emerald-400 rounded-full" title="Pressure Sensors Online"></div>
							<div class="w-2 h-2 bg-emerald-400 rounded-full" title="Gas Detectors Online"></div>
						</div>
						<div class="text-xs text-oil-gray">
							All systems operational
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<!-- System Status Overview -->
<div class="glass-card p-4 sm:p-6">
	<h3 class="text-xl font-semibold tracking-tight text-oil-black mb-4">System Status Overview</h3>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
		<div class="text-center p-4 bg-white/30 rounded-xl">
			<div class="w-3 h-3 bg-emerald-400 rounded-full mx-auto mb-2"></div>
			<div class="text-sm font-medium text-oil-black">SCADA</div>
			<div class="text-xs text-oil-gray">Online</div>
		</div>
		<div class="text-center p-4 bg-white/30 rounded-xl">
			<div class="w-3 h-3 bg-emerald-400 rounded-full mx-auto mb-2"></div>
			<div class="text-sm font-medium text-oil-black">Coriolis</div>
			<div class="text-xs text-oil-gray">{$activeJobs.length} Active</div>
		</div>
		<div class="text-center p-4 bg-white/30 rounded-xl">
			<div class="w-3 h-3 bg-emerald-400 rounded-full mx-auto mb-2"></div>
			<div class="text-sm font-medium text-oil-black">Gas Detectors</div>
			<div class="text-xs text-oil-gray">All Safe</div>
		</div>
		<div class="text-center p-4 bg-white/30 rounded-xl">
			<div class="w-3 h-3 bg-emerald-400 rounded-full mx-auto mb-2"></div>
			<div class="text-sm font-medium text-oil-black">DryDrive</div>
			<div class="text-xs text-oil-gray">Optimal</div>
		</div>
		<div class="text-center p-4 bg-white/30 rounded-xl">
			<div class="w-3 h-3 bg-emerald-400 rounded-full mx-auto mb-2"></div>
			<div class="text-sm font-medium text-oil-black">Network</div>
			<div class="text-xs text-oil-gray">{$systemStatus.networkHealth.toFixed(1)}%</div>
		</div>
	</div>
</div> 