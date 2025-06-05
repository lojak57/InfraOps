import type { ValveStatus, SensorReading } from '$lib/stores/truckMonitoringData';
import { toggleValve } from '$lib/stores/truckMonitoringData';

export function createDiagramHandlers(dispatch: (type: string, detail?: any) => void, interactive: boolean) {
	function handleValveClick(valve: ValveStatus) {
		if (!interactive) return;
		
		if (valve.requiresConfirmation) {
			const confirmed = confirm(`Toggle ${valve.name}?\nCurrent status: ${valve.status.toUpperCase()}`);
			if (confirmed) {
				toggleValve(valve.id);
				dispatch('valve-toggled', { valve });
			}
		} else {
			toggleValve(valve.id);
			dispatch('valve-toggled', { valve });
		}
	}

	function handleSensorClick(sensor: SensorReading) {
		dispatch('sensor-clicked', { sensor });
	}

	function handleValveToggle(valveId: string) {
		console.log(`Valve ${valveId} clicked - implement toggle logic`);
		// TODO: Integrate with actual valve control system
	}

	return {
		handleValveClick,
		handleSensorClick,
		handleValveToggle
	};
}

export function createImageHandlers() {
	function handleImageLoad() {
		console.log('✅ Truck diagram image loaded successfully');
		console.log('📐 Image dimensions will be available after render');
		return { imageLoaded: true, showLoadingState: false, showErrorState: false };
	}

	function handleImageError(event: Event) {
		console.error('❌ Failed to load truck diagram image');
		console.error('Error event:', event);
		console.error('Image src was:', (event.target as HTMLImageElement)?.src);
		return { imageLoaded: false, showLoadingState: false, showErrorState: true };
	}

	return {
		handleImageLoad,
		handleImageError
	};
}

export function createHoverHandlers() {
	let hoveredValve: string | null = null;

	function handleValveHover(valveId: string) {
		hoveredValve = valveId;
		return hoveredValve;
	}

	function handleValveLeave() {
		hoveredValve = null;
		return hoveredValve;
	}

	return {
		handleValveHover,
		handleValveLeave,
		getHoveredValve: () => hoveredValve
	};
} 