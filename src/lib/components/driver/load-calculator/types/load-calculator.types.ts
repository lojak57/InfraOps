export interface LoadCalculatorInputs {
	truckTare: number;
	trailerTare: number;
	driverWeight: number;
	equipment: number;
	materialDensity: number;
	weatherPenalty: number;
	roadConditions: 'Good' | 'Fair' | 'Poor';
}

export interface LoadCalculatorResults {
	maxUnits: number;
	totalVolume: number;
	availableWeight: number;
	weightUtilization: number;
	totalTare: number;
	grossVehicleWeightLimit: number;
	loadCapacityPercent: number;
	capacityStatus: 'good' | 'warning' | 'danger';
}

export interface InputField {
	id: string;
	label: string;
	key: keyof LoadCalculatorInputs;
	min: number;
	max: number;
	step?: number;
	unit: string;
}

export interface ResultCard {
	value: number;
	label: string;
	isPrimary?: boolean;
	icon?: any;
}

export interface CapacityBarInfo {
	percent: number;
	status: 'good' | 'warning' | 'danger';
	label: string;
	dotLimit: number;
}

export interface AlertInfo {
	type: 'warning' | 'danger';
	message: string;
	condition: boolean;
} 