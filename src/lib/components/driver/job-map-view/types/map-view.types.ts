export interface JobLocation {
	coordinates: {
		lat: number;
		lng: number;
	};
	address: string;
	tankNumber?: string;
}

export interface JobDetails {
	id: string;
	distance: number;
	estimatedDuration: number;
	estimatedUnits: number;
	tankLevelHeight?: string;
	pickupLocation: JobLocation;
	deliveryLocation: JobLocation;
	customerContact: {
		phone: string;
	};
	specialInstructions?: string;
}

export interface TrackingState {
	distanceRemaining: number;
	estimatedArrival: Date;
	currentSpeed: number;
	isTracking: boolean;
}

export interface LoadItem {
	icon: any;
	label: string;
	value: string;
}

export interface ActionButton {
	id: string;
	label: string;
	icon: any;
	variant: 'dispatch' | 'customer' | 'issue' | 'transit';
	action: () => void;
}

export interface RouteStep {
	type: 'current' | 'planned';
	label: string;
	distance: string;
	isActive: boolean;
}

export interface NavigationTurn {
	distance: string;
	instruction: string;
	currentRoad: string;
} 