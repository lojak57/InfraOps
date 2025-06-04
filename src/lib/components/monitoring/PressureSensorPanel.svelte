<script lang="ts">
	import { sensorReadings } from '$lib/stores/truckMonitoringData';
	import { createEventDispatcher } from 'svelte';
	import PanelHeader from './PanelHeader.svelte';
	import SensorCard from './SensorCard.svelte';
	import SensorSummary from './SensorSummary.svelte';

	const dispatch = createEventDispatcher();

	function handleSensorClick(event: CustomEvent) {
		dispatch('sensor-clicked', event.detail);
	}
</script>

<div class="sensor-panel-container">
	<PanelHeader />

	<div class="sensor-grid">
		{#each $sensorReadings as sensor (sensor.id)}
			<SensorCard {sensor} on:sensor-clicked={handleSensorClick} />
		{/each}
	</div>

	<SensorSummary sensors={$sensorReadings} />
</div>

<style>
	.sensor-panel-container {
		background: rgba(255, 255, 255, 0.98);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
	}

	.sensor-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 16px;
		padding: 20px;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.sensor-grid {
			grid-template-columns: 1fr;
		}
	}
</style> 