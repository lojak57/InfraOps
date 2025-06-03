// Job Detail View Types - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 2 - High Priority Components

export interface JobData {
	id: string;
	truckId: string;
	driverId: string;
	driverName: string;
	origin: string;
	destination: string;
	customer: string;
	distance: number;
	status: 'completed' | 'in-progress' | 'scheduled';
	startTime: Date;
	endTime?: Date;
	duration: number;
	onloadVolume: number;
	offloadVolume: number;
	volumeLoss: number;
	volumeLossPercent: number;
	avgTemp: number;
	minTemp: number;
	maxTemp: number;
	tempReadings: number[];
	apiGravity: number;
	waterCut: number;
	h2sLevels: number;
	pressureReadings: number[];
	gpsTrail: GPSWaypoint[];
	revenue: number;
	fuelCost: number;
	efficiency: number;
	alerts: JobAlert[];
}

export interface GPSWaypoint {
	lat: number;
	lng: number;
	timestamp: Date;
}

export interface JobAlert {
	id: string;
	type: string;
	severity: 'low' | 'medium' | 'high' | 'critical';
	message: string;
	timestamp: Date;
}

export interface JobOverviewData {
	totalJobs: number;
	totalRevenue: number;
	avgEfficiency: number;
	avgVolumeLoss: number;
	totalVolume: number;
	avgDuration: number;
	jobsByStatus: {
		completed: JobData[];
		'in-progress': JobData[];
		scheduled: JobData[];
	};
}

export interface JobKPICard {
	title: string;
	value: string;
	subtitle: string;
	status: 'primary' | 'success' | 'warning' | 'info' | 'neutral';
	icon: string;
}

export interface JobDetailSections {
	basic: boolean;
	volume: boolean;
	temperature: boolean;
	chemical: boolean;
	pressure: boolean;
	gps: boolean;
	financial: boolean;
	performance: boolean;
}

export interface JobFormatters {
	formatVolume: (volume: number) => string;
	formatCurrency: (amount: number) => string;
	formatDateTime: (date: Date) => string;
	formatCoordinate: (coord: number) => string;
	getJobStatusClass: (status: string) => string;
} 