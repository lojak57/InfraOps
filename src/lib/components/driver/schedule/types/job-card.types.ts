// Job Card Types - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @original-size: Part of 613-line component → @current-size: ~30 lines  
// @phase: Phase 6 - Driver Components
// @extractors: ScheduledJob interface and related types

export interface ScheduledJob {
	id: string;
	accountName: string;
	accountColor: string;
	pickupLocation: {
		name: string;
		address: string;
		padName: string;
		tankNumber: string;
		coordinates: { lat: number; lng: number };
	};
	deliveryLocation: {
		name: string;
		address: string;
		coordinates: { lat: number; lng: number };
	};
	estimatedUnits: number;
	tankLevelHeight: string;
	scheduledTime: Date;
	estimatedDuration: number;
	priority: 'urgent' | 'high' | 'normal' | 'low';
	status: 'scheduled' | 'in-progress' | 'completed' | 'delayed';
	distance: number;
	routeType: 'highway' | 'rural' | 'city';
	specialInstructions?: string;
	expectedTemperature: { min: number; max: number };
	loadType: 'product' | 'condensate' | 'refined';
	hazmatRequired: boolean;
	customerContact: {
		name: string;
		phone: string;
	};
}

export interface JobCardEvents {
	'job-selected': { job: ScheduledJob };
}

export type Priority = ScheduledJob['priority'];
export type JobStatus = ScheduledJob['status'];
export type LoadType = ScheduledJob['loadType']; 