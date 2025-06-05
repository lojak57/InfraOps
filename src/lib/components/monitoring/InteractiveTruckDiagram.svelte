<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { createDiagramHandlers, createImageHandlers, createHoverHandlers } from './interactive-truck-diagram/diagram-handlers';
	import DiagramHeader from './interactive-truck-diagram/DiagramHeader.svelte';
	import TruckDiagramDisplay from './interactive-truck-diagram/TruckDiagramDisplay.svelte';

	const dispatch = createEventDispatcher();

	export let showLabels = true;
	export let interactive = true;

	let selectedHotspot: string | null = null;
	let imageLoaded = false;
	let showLoadingState = true;
	let showErrorState = false;
	let hoveredValve: string | null = null;

	// Create handlers
	const diagramHandlers = createDiagramHandlers(dispatch, interactive);
	const imageHandlers = createImageHandlers();
	const hoverHandlers = createHoverHandlers();

	function handleImageLoad() {
		const result = imageHandlers.handleImageLoad();
		imageLoaded = result.imageLoaded;
		showLoadingState = result.showLoadingState;
		showErrorState = result.showErrorState;
	}

	function handleImageError(event: Event) {
		const result = imageHandlers.handleImageError(event);
		imageLoaded = result.imageLoaded;
		showLoadingState = result.showLoadingState;
		showErrorState = result.showErrorState;
	}

	function handleValveHover(valveId: string) {
		hoveredValve = hoverHandlers.handleValveHover(valveId);
	}

	function handleValveLeave() {
		hoveredValve = hoverHandlers.handleValveLeave();
	}

	onMount(() => {
		console.log('🚛 InteractiveTruckDiagram component mounted');
		console.log('📍 Image source: /truck-diagram.png');
		console.log('🔥 NEW CODE VERSION - PRESSURE RELIEF VALVES ADDED');
	});
</script>

<div class="truck-diagram-container">
	<DiagramHeader />

	<TruckDiagramDisplay 
		{interactive}
		{imageLoaded}
		{showLoadingState}
		{showErrorState}
		{hoveredValve}
		onImageLoad={handleImageLoad}
		onImageError={handleImageError}
		onValveHover={handleValveHover}
		onValveLeave={handleValveLeave}
		onValveToggle={diagramHandlers.handleValveToggle}
	/>
</div>

<style>
	.truck-diagram-container {
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
		border-radius: 12px;
		padding: 24px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		margin-bottom: 24px;
		min-height: 500px;
	}

	/* Mobile Responsive */
	@media (max-width: 480px) {
		.truck-diagram-container {
			padding: 16px;
		}
	}
</style> 