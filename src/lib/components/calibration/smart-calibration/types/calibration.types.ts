// Smart Calibration Types - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 2 - High Priority Components

export interface FleetStats {
	total: number;
	good: number;
	warning: number;
	critical: number;
	calibrationsAvoided: number;
}

export interface StatusDistribution {
	good: number;
	warning: number;
	critical: number;
}

export interface CalibrationConfig {
	toleranceGood: number;
	toleranceWarning: number;
	toleranceCritical: number;
	confidenceThreshold: number;
	updateInterval: number;
}

export interface CalibrationActivity {
	id: string;
	type: 'calibration' | 'skip' | 'alert' | 'maintenance';
	truckId: string;
	description: string;
	timestamp: Date;
	status: 'completed' | 'scheduled' | 'failed';
	impact?: string;
}

export interface CalibrationAlert {
	id: string;
	truckId: string;
	severity: 'critical' | 'warning' | 'info';
	title: string;
	description: string;
	timestamp: Date;
	acknowledged: boolean;
	action?: string;
}

export interface TruckCalibrationData {
	id: string;
	status: 'good' | 'warning' | 'critical';
	lastCalibration: Date;
	nextDue: Date;
	deviation: number;
	confidence: number;
	alerts: CalibrationAlert[];
}

export interface ActionCard {
	id: string;
	icon: string;
	title: string;
	description: string;
	action: () => void;
	count?: number;
}

export interface CalibrationEventData {
	type: 'schedule-calibration' | 'view-truck-details' | 'view-change' | 'filter-change';
	truckIds?: string[];
	truck?: TruckCalibrationData;
	view?: 'overview' | 'fleet' | 'optimization';
	filter?: 'all' | 'good' | 'warning' | 'critical';
}

export interface CalibrationViewMode {
	selected: 'overview' | 'fleet' | 'optimization';
	truckView: 'table' | 'grid';
	filterStatus: 'all' | 'good' | 'warning' | 'critical';
	activeTab: 'overview' | 'calibrations' | 'alerts';
} 