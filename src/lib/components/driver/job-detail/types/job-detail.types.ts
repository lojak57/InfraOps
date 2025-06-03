// Job Detail Modal Types - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 1 - Critical Components

export interface Location {
	lat: number;
	lng: number;
	address: string;
}

export interface JobLocation {
	name: string;
	address: string;
	coordinates: {
		lat: number;
		lng: number;
	};
	padName?: string;
	tankNumber?: string;
}

export interface CustomerContact {
	name: string;
	phone: string;
}

export interface ScheduledJob {
	id: string;
	accountName: string;
	accountColor: string;
	priority: 'urgent' | 'high' | 'normal' | 'low';
	estimatedUnits: number;
	tankLevelHeight: string;
	loadType: string;
	estimatedDuration: number;
	distance: number;
	scheduledTime: Date;
	pickupLocation: JobLocation;
	deliveryLocation: JobLocation;
	specialInstructions?: string;
	customerContact: CustomerContact;
}

export interface JobDetailState {
	currentLocation: Location;
	distanceToPickup: number;
	estimatedTravelTime: number;
}

export interface JobDetailActions {
	closeModal: () => void;
	startJob: () => void;
	callCustomer: () => void;
} 