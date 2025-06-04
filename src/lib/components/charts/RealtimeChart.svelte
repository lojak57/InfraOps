<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Chart from '$lib/components/charts/Chart.svelte';
	
	// Modular component imports
	import ChartHeader from './components/ChartHeader.svelte';
	import ChartLoadingState from './components/ChartLoadingState.svelte';
	
	// Utility imports
	import { 
		generateRealisticData,
		generateNewDataPoint,
		updateDataArrays,
		createChartData,
		type ChartData
	} from './utils/realtime-chart-data';
	import {
		createChartOptions,
		getResponsivePadding,
		DEFAULT_PADDING,
		type ChartPadding,
		type ChartOptions
	} from './utils/realtime-chart-config';
	import {
		createAutoCleanupUpdateManager,
		LiveUpdateState,
		DEFAULT_UPDATE_INTERVAL
	} from './utils/realtime-chart-updates';

	// ================================
	// Props
	// ================================

	interface Props {
		title?: string;
		color?: string;
		height?: number;
		unit?: string;
		animated?: boolean;
		showGrid?: boolean;
		maxDataPoints?: number;
		updateInterval?: number;
		paddingLeft?: number;
		paddingRight?: number;
		paddingTop?: number;
		paddingBottom?: number;
	}

	let { 
		title = 'Real-time Data',
		color = '#004E89',
		height = 200,
		unit = '',
		animated = true,
		showGrid = true,
		maxDataPoints = 20,
		updateInterval = DEFAULT_UPDATE_INTERVAL,
		paddingLeft = DEFAULT_PADDING.left,
		paddingRight = DEFAULT_PADDING.right,
		paddingTop = DEFAULT_PADDING.top,
		paddingBottom = DEFAULT_PADDING.bottom
	}: Props = $props();

	// ================================
	// State Management
	// ================================

	let chartData: ChartData | null = null;
	let chartOptions: ChartOptions | null = null;
	let dataPoints: number[] = [];
	let labels: string[] = [];
	let screenWidth = 1024; // SSR-safe default
	let liveState = new LiveUpdateState();

	// Reactive padding calculation
	const padding = $derived<ChartPadding>({
		left: paddingLeft,
		right: paddingRight,
		top: paddingTop,
		bottom: paddingBottom
	});

	const responsivePadding = $derived(
		browser ? getResponsivePadding(screenWidth, padding) : padding
	);

	// ================================
	// Lifecycle Management
	// ================================

	onMount(() => {
		if (browser) {
			screenWidth = window.innerWidth;
			
			// Handle window resize
			const handleResize = () => {
				screenWidth = window.innerWidth;
				updateChartOptions();
			};
			window.addEventListener('resize', handleResize);
			
			// Initialize chart
			initializeChart();
			
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	});

	// ================================
	// Chart Management
	// ================================

	function initializeChart() {
		// Generate initial data
		const initialData = generateRealisticData(title, maxDataPoints, updateInterval);
		dataPoints = initialData.dataPoints;
		labels = initialData.labels;
		
		// Setup chart
		updateChartOptions();
		updateChartData();
		
		// Start live updates
		startLiveUpdates();
	}

	function updateChartOptions() {
		chartOptions = createChartOptions(
			color,
			unit,
			showGrid,
			animated,
			screenWidth,
			responsivePadding
		);
	}

	function updateChartData() {
		chartData = createChartData(title, dataPoints, labels, color);
	}

	function addNewDataPoint() {
		const lastValue = dataPoints[dataPoints.length - 1];
		const newPoint = generateNewDataPoint(title, lastValue);
		
		const updated = updateDataArrays(
			dataPoints,
			labels,
			newPoint.value,
			newPoint.timestamp,
			maxDataPoints
		);
		
		dataPoints = updated.dataPoints;
		labels = updated.labels;
		
		updateChartData();
		liveState.recordUpdate();
	}

	// ================================
	// Live Updates
	// ================================

	const updateManager = createAutoCleanupUpdateManager(
		addNewDataPoint,
		updateInterval,
		onDestroy
	);

	function startLiveUpdates() {
		liveState.start();
		updateManager.start();
	}

	// Update interval reactively
	$effect(() => {
		updateManager.setInterval(updateInterval);
	});
</script>

<div class="realtime-chart-container" style="height: {height}px;">
	<!-- Modular Header Component -->
	<ChartHeader 
		{title}
		isLive={liveState.isLive}
	/>
	
	<!-- Chart Content -->
	<div class="chart-wrapper">
		{#if chartData && chartOptions}
			<Chart 
				type="line" 
				data={chartData} 
				options={chartOptions}
				height={Math.max(height - 80, 320)}
			/>
		{:else}
			<!-- Modular Loading Component -->
			<ChartLoadingState />
		{/if}
	</div>
</div>

<style>
	.realtime-chart-container {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 20px;
		box-shadow: 
			0 8px 32px rgba(0, 0, 0, 0.1),
			0 2px 8px rgba(0, 0, 0, 0.05),
			inset 0 1px 0 rgba(255, 255, 255, 0.8);
		padding: 20px;
		font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.realtime-chart-container:hover {
		transform: translateY(-2px);
		box-shadow: 
			0 12px 40px rgba(0, 0, 0, 0.15),
			0 4px 12px rgba(0, 0, 0, 0.08),
			inset 0 1px 0 rgba(255, 255, 255, 0.9);
	}

	.chart-wrapper {
		height: calc(100% - 45px);
		position: relative;
		min-height: 450px;
		overflow: visible;
	}

	/* Mobile responsiveness */
	@media (max-width: 768px) {
		.realtime-chart-container {
			padding: 16px;
		}
	}

	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.realtime-chart-container {
			background: rgba(30, 30, 30, 0.95);
			border-color: rgba(255, 255, 255, 0.1);
		}
	}
</style> 