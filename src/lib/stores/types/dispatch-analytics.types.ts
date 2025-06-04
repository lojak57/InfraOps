// Demo Data Types for Dispatch Analytics
export interface DemoAlert {
	type: 'volume_loss' | 'temp_variance' | 'idle_time' | 'efficiency' | 'maintenance';
	severity: 'low' | 'medium' | 'high' | 'critical';
	summary: string;
	timestamp: Date;
}

export interface DemoJobData {
	id: string;
	truckId: string;
	driverId: string;
	driverName: string;
	origin: string;
	destination: string;
	customer: string;
	onloadVolume: number;
	offloadVolume: number;
	volumeLoss: number;
	volumeLossPercent: number;
	avgTemp: number;
	minTemp: number;
	maxTemp: number;
	startTime: Date;
	endTime: Date | null;
	duration: number; // minutes
	distance: number; // miles
	efficiency: number;
	revenue: number;
	fuelCost: number;
	status: 'completed' | 'in-progress' | 'scheduled';
	alerts: DemoAlert[];
	apiGravity: number;
	waterCut: number;
	h2sLevels: number;
	pressureReadings: number[];
	tempReadings: number[];
	gpsTrail: { lat: number; lng: number; timestamp: Date }[];
}

export interface DemoTruckData {
	id: string;
	model: string;
	year: number;
	capacity: number;
	driverId: string;
	driverName: string;
	yardId: string;
	currentStatus: 'active' | 'pickup' | 'transit' | 'maintenance' | 'available';
	todayJobs: number;
	weekJobs: number;
	efficiency: number;
	avgVolumeLoss: number;
	safetyScore: number;
	lastJobTime: Date | null;
	nextScheduled: Date | null;
	alerts: DemoAlert[];
	mileage: number;
	fuelEfficiency: number;
	lastMaintenance: Date;
	nextMaintenance: Date;
}

export interface DemoYardData {
	id: string;
	name: string;
	location: string;
	region: string;
	totalTrucks: number;
	activeTrucks: number;
	todayJobs: number;
	weekJobs: number;
	efficiency: number;
	revenue: number;
	avgVolumeLoss: number;
	status: 'excellent' | 'good' | 'attention' | 'critical';
	pickupBays: number;
	activeBays: number;
	alerts: DemoAlert[];
}

export interface DemoFleetData {
	totalTrucks: number;
	totalDrivers: number;
	totalYards: number;
	totalJobs: number;
	todayJobs: number;
	weekJobs: number;
	monthJobs: number;
	efficiency: number;
	totalRevenue: number;
	monthlyRevenue: number;
	avgVolumeLoss: number;
	safetyScore: number;
	alerts: DemoAlert[];
}

export type DrillDownLevel = 'fleet' | 'yard' | 'truck' | 'job';
export type ViewMode = 'analytics' | 'cards' | 'raw';

export interface DispatchAnalyticsState {
	// Drill-down state
	currentLevel: DrillDownLevel;
	selectedYard: string | null;
	selectedTruck: string | null;
	selectedJob: string | null;
	
	// View preferences
	viewMode: ViewMode;
	timeframe: 'today' | 'week' | 'month' | 'quarter';
	
	// Demo mode
	demoMode: boolean;
	simulatedUpdates: boolean;
	lastUpdate: Date;
	autoAdvance: boolean;
	
	// Demo data
	demoFleet: DemoFleetData;
	demoYards: DemoYardData[];
	demoTrucks: DemoTruckData[];
	demoJobs: DemoJobData[];
} 