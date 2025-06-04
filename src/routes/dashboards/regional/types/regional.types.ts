// Regional Dashboard Types - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 1 - Critical Components

export interface RegionalPerformance {
	fleetSize: number;
	activeTrucks: number;
	driversAssigned: number;
	dailyUnits: number;
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
	efficiency: number;
	utilization: number;
	dailyUnits: number;
	alerts: number;
}

export interface DropdownState {
	hoveredRegion: string;
	dropdownTimeout: number;
}

export interface RegionalData {
	id: string;
	name: string;
	region: string;
	coordinates: { lat: number; lng: number };
	totalTrucks: number;
	activeTrucks: number;
	driversAssigned: number;
	efficiency: number;
	utilizationRate: number;
	avgDriveTime: number;
	unitsPerHour: number;
	dailyUnits: number;
	alerts: number;
	status: 'excellent' | 'good' | 'attention' | 'critical';
	lastUpdate: Date;
	monthlyRevenue: number;
	fuelEfficiency: number;
}

export interface RegionalAlert {
	id: string;
	regionId: string;
	type: 'maintenance' | 'efficiency' | 'safety' | 'route';
	severity: 'low' | 'medium' | 'high' | 'critical';
	message: string;
	timestamp: Date;
	resolved: boolean;
}

export interface RegionalComparison {
	regionId: string;
	regionName: string;
	efficiency: number;
	dailyUnits: number;
	utilization: number;
	alerts: number;
	trend: 'up' | 'down' | 'stable';
}

export const PERFORMANCE_THRESHOLDS: PerformanceThresholds = {
	efficiency: 85,
	utilization: 80,
	dailyUnits: 2000,
	alerts: 5
}; 