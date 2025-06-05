<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ValveOverlay from '../ValveOverlay.svelte';
	import { valveConfig } from './diagram-config';

	export let interactive: boolean = true;
	export let imageLoaded: boolean = false;
	export let showLoadingState: boolean = true;
	export let showErrorState: boolean = false;
	export let hoveredValve: string | null = null;
	export let onImageLoad: () => void;
	export let onImageError: (event: Event) => void;
	export let onValveHover: (valveId: string) => void;
	export let onValveLeave: () => void;
	export let onValveToggle: (valveId: string) => void;

	const dispatch = createEventDispatcher();
</script>

<div class="diagram-content">
	<div class="truck-wireframe-container">
		<!-- Compass Labels -->
		<div class="compass-labels">
			<div class="compass-label">Driver Side</div>
			<div class="compass-label">←→</div>
			<div class="compass-label">Passenger</div>
		</div>

		{#if showLoadingState}
			<div class="pickup-indicator">
				<div class="spinner"></div>
				<p>Loading truck diagram...</p>
			</div>
		{/if}

		{#if showErrorState}
			<div class="error-indicator">
				<p>⚠️ Could not load truck diagram</p>
				<p>Debug: Image path = /truck-diagram.png</p>
				<p>Check browser network tab for 404 errors</p>
			</div>
		{/if}

		{#if imageLoaded}
			<!-- Image and overlays wrapper with relative positioning -->
			<div class="truck-image-wrapper">
				<img
					src="/truck-diagram.png"
					alt="Truck Wireframe Diagram"
					class="truck-wireframe loaded"
					on:load={onImageLoad}
					on:error={onImageError}
				/>

				<!-- Clean Valve Overlays using ValveOverlay component -->
				{#each valveConfig as valve (valve.id)}
					<ValveOverlay
						top={valve.top}
						left={valve.left}
						status={valve.status}
						label={valve.label}
						align={valve.align}
						valveId={valve.id}
						{interactive}
						onHover={onValveHover}
						onLeave={onValveLeave}
						onClick={() => onValveToggle(valve.id)}
						showTooltip={hoveredValve === valve.id}
					/>
				{/each}

				<!-- FlowOps Logo -->
				<div class="logo-overlay">
					<svg width="40" height="20" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
						<text x="50" y="30" text-anchor="middle" fill="#64748b" font-family="Arial, sans-serif" font-size="12" font-weight="bold">FlowOps</text>
					</svg>
				</div>
			</div>
		{:else}
			<img
				src="/truck-diagram.png"
				alt="Truck Wireframe Diagram"
				class="truck-wireframe"
				on:load={onImageLoad}
				on:error={onImageError}
			/>
		{/if}
	</div>
</div>

<style>
	.diagram-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
		height: 100%;
	}

	.truck-wireframe-container {
		position: relative;
		background: white;
		border-radius: 8px;
		padding: 16px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
		min-height: 500px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.truck-wireframe {
		position: relative;
		width: 100%;
		max-width: 700px;
		height: auto;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
	}

	.truck-wireframe.loaded {
		opacity: 1;
	}

	/* Image wrapper that provides positioning context for valve overlays */
	.truck-image-wrapper {
		position: relative;
		display: inline-block;
		max-width: 700px;
		width: 100%;
	}

	.pickup-indicator, .error-indicator {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 300px;
		background: #f8fafc;
		border: 2px dashed #cbd5e1;
		border-radius: 8px;
		color: #64748b;
		text-align: center;
	}

	.error-indicator {
		border-color: #fca5a5;
		background: #fef2f2;
		color: #dc2626;
	}

	.spinner {
		width: 32px;
		height: 32px;
		border: 3px solid #e2e8f0;
		border-top: 3px solid #3b82f6;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 12px;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	/* Compass Labels */
	.compass-labels {
		position: absolute;
		top: 10px;
		right: 10px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-size: 10px;
		color: #64748b;
		font-weight: 500;
	}

	.compass-label {
		padding: 2px 6px;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 3px;
		text-align: center;
	}

	/* Sensors */
	.sensor-indicator {
		position: absolute;
		width: 8px;
		height: 8px;
		background-color: #3b82f6;
		border: 1px solid white;
		transform: rotate(45deg);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.sensor-indicator:hover {
		transform: rotate(45deg) scale(1.3);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
	}

	.logo-overlay {
		position: absolute;
		bottom: 10px;
		right: 10px;
		width: 40px;
		height: auto;
		opacity: 0.7;
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.truck-wireframe-container {
			min-height: 400px;
		}
	}

	@media (max-width: 480px) {
		.sensor-indicator {
			width: 6px;
			height: 6px;
		}

		.truck-wireframe-container {
			min-height: 300px;
		}
	}
</style> 