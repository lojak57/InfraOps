import type { 
	LoadCalculatorInputs, 
	LoadCalculatorResults, 
	InputField, 
	ResultCard, 
	CapacityBarInfo, 
	AlertInfo 
} from '../types/load-calculator.types';
import { Truck } from 'lucide-svelte';

export function calculateLoadResults(inputs: LoadCalculatorInputs): LoadCalculatorResults {
	const grossVehicleWeightLimit = 80000; // Standard DOT limit
	const totalTare = inputs.truckTare + inputs.trailerTare + inputs.driverWeight + inputs.equipment;
	const roadPenalty = getRoadPenalty(inputs.roadConditions);
	const availableWeight = grossVehicleWeightLimit - totalTare - inputs.weatherPenalty - roadPenalty;
	const maxUnits = Math.floor(availableWeight / (inputs.materialDensity * 42)); // 42 gallons per unit
	const totalVolume = maxUnits * 42; // Convert to gallons
	const weightUtilization = (totalTare / grossVehicleWeightLimit) * 100;
	const loadCapacityPercent = (availableWeight / grossVehicleWeightLimit) * 100;
	const capacityStatus = getCapacityStatus(loadCapacityPercent);

	return {
		maxUnits,
		totalVolume,
		availableWeight,
		weightUtilization,
		totalTare,
		grossVehicleWeightLimit,
		loadCapacityPercent,
		capacityStatus
	};
}

export function getRoadPenalty(roadConditions: 'Good' | 'Fair' | 'Poor'): number {
	switch (roadConditions) {
		case 'Poor': return 2000;
		case 'Fair': return 1000;
		case 'Good': default: return 0;
	}
}

export function getCapacityStatus(percent: number): 'good' | 'warning' | 'danger' {
	if (percent >= 70) return 'good';
	if (percent >= 50) return 'warning';
	return 'danger';
}

export function formatNumber(num: number): string {
	return new Intl.NumberFormat('en-US').format(Math.round(num));
}

export function getInputFields(): InputField[] {
	return [
		{
			id: 'truck-tare',
			label: 'Truck Tare Weight',
			key: 'truckTare',
			min: 0,
			max: 30000,
			unit: 'lbs'
		},
		{
			id: 'trailer-tare',
			label: 'Trailer Tare Weight',
			key: 'trailerTare',
			min: 0,
			max: 20000,
			unit: 'lbs'
		},
		{
			id: 'driver-weight',
			label: 'Driver + Personal Gear',
			key: 'driverWeight',
			min: 100,
			max: 500,
			unit: 'lbs'
		},
		{
			id: 'equipment',
			label: 'Equipment Weight',
			key: 'equipment',
			min: 0,
			max: 2000,
			unit: 'lbs'
		},
		{
			id: 'material-density',
			label: 'Material Density',
			key: 'materialDensity',
			min: 6,
			max: 12,
			step: 0.1,
			unit: 'lbs/gal'
		},
		{
			id: 'weather-penalty',
			label: 'Weather Penalty',
			key: 'weatherPenalty',
			min: 0,
			max: 5000,
			step: 100,
			unit: 'lbs'
		}
	];
}

export function getResultCards(results: LoadCalculatorResults): ResultCard[] {
	return [
		{
			value: results.maxUnits,
			label: 'Max Units',
			isPrimary: true,
			icon: Truck
		},
		{
			value: results.totalVolume,
			label: 'Total Gallons'
		},
		{
			value: results.availableWeight,
			label: 'Available Weight (lbs)'
		},
		{
			value: results.totalTare,
			label: 'Total Tare Weight (lbs)'
		}
	];
}

export function getCapacityBarInfo(results: LoadCalculatorResults): CapacityBarInfo {
	return {
		percent: results.loadCapacityPercent,
		status: results.capacityStatus,
		label: 'Load Capacity',
		dotLimit: results.grossVehicleWeightLimit
	};
}

export function getAlerts(results: LoadCalculatorResults): AlertInfo[] {
	return [
		{
			type: 'warning',
			message: 'Low load capacity. Check vehicle specifications.',
			condition: results.loadCapacityPercent < 50
		},
		{
			type: 'danger',
			message: 'Vehicle exceeds DOT weight limits!',
			condition: results.availableWeight < 0
		}
	];
}

export function getRoadConditionsOptions(): Array<{ value: 'Good' | 'Fair' | 'Poor'; label: string }> {
	return [
		{ value: 'Good', label: 'Good' },
		{ value: 'Fair', label: 'Fair' },
		{ value: 'Poor', label: 'Poor' }
	];
} 