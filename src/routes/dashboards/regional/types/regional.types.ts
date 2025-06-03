// Regional Dashboard Types - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 1 - Critical Components

export interface RegionalPerformance {
	fleetSize: number;
	activeTrucks: number;
	driversAssigned: number;
	totalBPD: number;
	avgDriveTime: number;
	unitsPerHour: number;
	efficiency: number;
	utilization: number;
	trend: 'up' | 'down' | 'stable';
	status: 'excellent' | 'good' | 'attention';
}

export interface Region {
	id: string;
	name: string;
	color: string;
}

export interface RegionalState {
	regions: Region[];
	regionalData: Record<string, RegionalPerformance>;
	activeRegion: string;
	showYardComparison: boolean;
	selectedRegion: string;
}

export interface PerformanceThresholds {
	bpd: number;
	efficiency: number;
	bph: number;
}

export interface DropdownState {
	hoveredRegion: string;
	dropdownTimeout: number;
} 