import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Enhanced temperature readings
export interface TemperatureReading {
	timestamp: Date;
	ambient: number;
	internal: number;
	containerTemp: number;
	productTemp: number;
}

// New flow meter readings
export interface FlowMeterReading {
	timestamp: Date;
	netVolume: number;        // Units
	massFlowRate: number;     // Units/min
	density: number;          // Specific gravity
	waterContent: number;     // percentage
	productTemp: number;      // °F
	gasContent: number;       // percentage
}

// Pressure sensor readings
export interface PressureReading {
	timestamp: Date;
	containerLoad: number;     // PSI
	containerUnload: number;   // PSI vacuum
	containerInternal: number; // PSI
	ventLine: number;         // PSI
}

// Gas detection readings
export interface GasDetection {
	timestamp: Date;
	toxicGasExternal: number;  // PPM
	toxicGasInternal: number;  // PPM
	coExternal: number;        // PPM
	coInternal: number;        // PPM
	combustibleExternal: number; // % LEL
	combustibleInternal: number; // % LEL
	oxygenExternal: number;    // % O2
}

// Enhanced sensor readings
export interface SensorReading {
	timestamp: Date;
	tankLevel: number;        // feet
	productTemp: number;      // °F
	flowRate: number;         // Units/min
	systemPressure: number;   // PSI
	gasDetection: boolean;    // safety status
}

// Pump system data
export interface PumpSystemData {
	timestamp: Date;
	pumpRpm: number;
	pumpTemp: number;         // °F
	inverterVoltage: number;  // V
	inverterTemp: number;     // °F
	motorTemp: number;        // °F
	rectifierTemp: number;    // °F
	generatorTemp: number;    // °F
	pumpStartTime?: Date;
	pumpStopTime?: Date;
	totalPumpTime: number;    // minutes
	systemOnline: boolean;
}

// Enhanced system status
export interface SystemStatus {
	systemOnline: boolean;
	connectedDevices: number;
	networkHealth: number;        // percentage
	lastUpdate: Date;
	dataLatency: number;          // milliseconds
	flowMeterOnline: boolean;
	gasDetectorsOnline: boolean;
	pressureSensorsOnline: boolean;
	temperatureSensorsOnline: boolean;
	pumpSystemOnline: boolean;
	operationsOnline: boolean;
}

export interface Site {
	id: string;
	name: string;
	location: { lat: number; lng: number };
	type: 'pickup' | 'delivery';
}

export interface Job {
	id: string;
	vehicleId: string;
	driverId: string;
	pickupSite: Site;
	deliverySite: Site;
	initialVolume: number; // units
	finalVolume?: number; // units
	expectedVariance: number; // calculated units
	actualVariance?: number; // measured units
	status: 'loading' | 'transit' | 'unpickup' | 'completed';
	startTime: Date;
	endTime?: Date;
	temperatureReadings: TemperatureReading[];
	flowMeterReadings: FlowMeterReading[];
	pressureReadings: PressureReading[];
	gasDetections: GasDetection[];
	sensorReadings: SensorReading[];
	pumpSystemData: PumpSystemData[];
	currentLocation?: { lat: number; lng: number };
	transitProgress: number; // 0-100%
	estimatedTimeRemaining: number; // minutes
}

export interface Driver {
	id: string;
	name: string;
	experience: number; // years
	totalJobs: number;
	averageEfficiency: number; // percentage
}

export interface Vehicle {
	id: string;
	plateNumber: string;
	capacity: number; // units
	model: string;
	year: number;
	averageEfficiency: number;
}

// Helper function to create consistent timestamps
function getStaticTimestamp(offsetMinutes: number = 0): Date {
	// Use a fixed base timestamp for SSR consistency
	const baseTime = 1735064220000; // Fixed timestamp
	return new Date(baseTime + (offsetMinutes * 60 * 1000));
}

// Helper function to get current time only on client
function getCurrentTime(): Date {
	return browser ? new Date() : getStaticTimestamp();
}

// Current active job
export const currentJob = writable<Job | null>(null);

// Historical jobs data
export const jobHistory = writable<Job[]>([]);

// Available sites
export const sites = writable<Site[]>([
	{
		id: 'site-1',
		name: 'Regional Distribution Center',
		location: { lat: 31.8457, lng: -102.3676 },
		type: 'pickup'
	},
	{
		id: 'site-2',
		name: 'Central Warehouse',
		location: { lat: 28.8644, lng: -97.9222 },
		type: 'pickup'
	},
	{
		id: 'site-3',
		name: 'Metro Processing Facility',
		location: { lat: 29.7604, lng: -95.3698 },
		type: 'delivery'
	},
	{
		id: 'site-4',
		name: 'Coastal Distribution Terminal',
		location: { lat: 27.8006, lng: -97.3964 },
		type: 'delivery'
	}
]);

// Drivers database
export const drivers = writable<Driver[]>([
	{
		id: 'driver-1',
		name: 'Jake Thompson',
		experience: 8,
		totalJobs: 1240,
		averageEfficiency: 97.2
	},
	{
		id: 'driver-2',
		name: 'Maria Santos',
		experience: 5,
		totalJobs: 890,
		averageEfficiency: 98.1
	},
	{
		id: 'driver-3',
		name: 'Robert Johnson',
		experience: 12,
		totalJobs: 2150,
		averageEfficiency: 96.8
	},
	{
		id: 'driver-4',
		name: 'Sarah Miller',
		experience: 3,
		totalJobs: 450,
		averageEfficiency: 98.5
	}
]);

// Vehicles database
export const vehicles = writable<Vehicle[]>([
	{
		id: 'vehicle-1',
		plateNumber: 'TRK-001',
		capacity: 8000, // units
		model: 'Freight Jober 3000',
		year: 2022,
		averageEfficiency: 96.5
	},
	{
		id: 'vehicle-2',
		plateNumber: 'TRK-002',
		capacity: 8500, // units
		model: 'Freight Jober 3500',
		year: 2023,
		averageEfficiency: 97.8
	},
	{
		id: 'vehicle-3',
		plateNumber: 'TRK-003',
		capacity: 7500, // units
		model: 'Freight Jober 2500',
		year: 2021,
		averageEfficiency: 95.2
	}
]);

// Derived store for active jobs
export const activeJobs = derived(jobHistory, ($jobs) => 
	$jobs.filter(job => job.status !== 'completed')
);

// Derived store for completed jobs
export const completedJobs = derived(jobHistory, ($jobs) => 
	$jobs.filter(job => job.status === 'completed')
);

// Derived store for jobs in transit
export const jobsInTransit = derived(jobHistory, ($jobs) => 
	$jobs.filter(job => job.status === 'transit')
);

// System status store
export const systemStatus = writable<SystemStatus>({
	systemOnline: true,
	connectedDevices: 8,
	networkHealth: 98.5,
	lastUpdate: getCurrentTime(),
	dataLatency: 120,
	flowMeterOnline: true,
	gasDetectorsOnline: true,
	pressureSensorsOnline: true,
	temperatureSensorsOnline: true,
	pumpSystemOnline: true,
	operationsOnline: true
});

// Demo data for active job
export const demoJob: Job = {
	id: 'JOB-001547',
	vehicleId: 'vehicle-1',
	driverId: 'driver-1',
	pickupSite: {
		id: 'site-1',
		name: 'Regional Distribution Center',
		location: { lat: 31.8457, lng: -102.3676 },
		type: 'pickup'
	},
	deliverySite: {
		id: 'site-3',
		name: 'Metro Processing Facility',
		location: { lat: 29.7604, lng: -95.3698 },
		type: 'delivery'
	},
	initialVolume: 7850,
	expectedVariance: 125.5,
	status: 'transit',
	startTime: getStaticTimestamp(-180), // 3 hours ago
	transitProgress: 65,
	estimatedTimeRemaining: 95,
	currentLocation: { lat: 30.8, lng: -99.2 },
	temperatureReadings: [
		{
			timestamp: getStaticTimestamp(-180),
			ambient: 78.2,
			internal: 82.1,
			containerTemp: 185.4,
			productTemp: 168.1
		},
		{
			timestamp: getStaticTimestamp(-120),
			ambient: 82.5,
			internal: 85.3,
			containerTemp: 178.9,
			productTemp: 165.7
		},
		{
			timestamp: getStaticTimestamp(-60),
			ambient: 85.1,
			internal: 88.2,
			containerTemp: 172.3,
			productTemp: 162.4
		},
		{
			timestamp: getStaticTimestamp(0),
			ambient: 88.7,
			internal: 91.8,
			containerTemp: 165.8,
			productTemp: 158.9
		}
	],
	flowMeterReadings: [
		{
			timestamp: getStaticTimestamp(-180),
			netVolume: 7850.0,
			massFlowRate: 125.5,
			density: 0.85,
			waterContent: 0.02,
			productTemp: 168.1,
			gasContent: 0.001
		},
		{
			timestamp: getStaticTimestamp(0),
			netVolume: 7724.5,
			massFlowRate: 0.0,
			density: 0.85,
			waterContent: 0.02,
			productTemp: 158.9,
			gasContent: 0.001
		}
	],
	pressureReadings: [
		{
			timestamp: getStaticTimestamp(-180),
			containerLoad: 14.7,
			containerUnload: -2.1,
			containerInternal: 12.3,
			ventLine: 0.5
		},
		{
			timestamp: getStaticTimestamp(0),
			containerLoad: 14.2,
			containerUnload: -1.8,
			containerInternal: 11.9,
			ventLine: 0.3
		}
	],
	gasDetections: [
		{
			timestamp: getStaticTimestamp(-180),
			toxicGasExternal: 0.0,
			toxicGasInternal: 0.0,
			coExternal: 2.1,
			coInternal: 0.8,
			combustibleExternal: 0.0,
			combustibleInternal: 0.0,
			oxygenExternal: 20.9
		},
		{
			timestamp: getStaticTimestamp(0),
			toxicGasExternal: 0.0,
			toxicGasInternal: 0.0,
			coExternal: 1.8,
			coInternal: 0.5,
			combustibleExternal: 0.0,
			combustibleInternal: 0.0,
			oxygenExternal: 20.9
		}
	],
	sensorReadings: [
		{
			timestamp: getStaticTimestamp(-180),
			tankLevel: 8.5,
			productTemp: 168.1,
			flowRate: 125.5,
			systemPressure: 14.7,
			gasDetection: false
		},
		{
			timestamp: getStaticTimestamp(0),
			tankLevel: 8.3,
			productTemp: 158.9,
			flowRate: 0.0,
			systemPressure: 14.2,
			gasDetection: false
		}
	],
	pumpSystemData: [
		{
			timestamp: getStaticTimestamp(-180),
			pumpRpm: 1800,
			pumpTemp: 185.2,
			inverterVoltage: 480.5,
			inverterTemp: 165.8,
			motorTemp: 195.3,
			rectifierTemp: 158.9,
			generatorTemp: 175.6,
			pumpStartTime: getStaticTimestamp(-180),
			totalPumpTime: 45,
			systemOnline: true
		},
		{
			timestamp: getStaticTimestamp(-120),
			pumpRpm: 0,
			pumpTemp: 165.4,
			inverterVoltage: 480.2,
			inverterTemp: 145.2,
			motorTemp: 168.7,
			rectifierTemp: 142.1,
			generatorTemp: 155.3,
			pumpStopTime: getStaticTimestamp(-120),
			totalPumpTime: 60,
			systemOnline: true
		}
	]
};

// Actions for managing jobs
export const jobActions = {
	// Initialize with demo data
	initializeDemoData: () => {
		if (browser) {
			currentJob.set(demoJob);
			jobHistory.update(jobs => [...jobs, demoJob]);
		}
	},

	// Start a new job
	startJob: (job: Omit<Job, 'id' | 'startTime' | 'status'>) => {
		const newJob: Job = {
			...job,
			id: `JOB-${Date.now()}`,
			startTime: getCurrentTime(),
			status: 'loading',
			transitProgress: 0,
			temperatureReadings: [],
			flowMeterReadings: [],
			pressureReadings: [],
			gasDetections: [],
			sensorReadings: [],
			pumpSystemData: []
		};
		
		currentJob.set(newJob);
		jobHistory.update(jobs => [...jobs, newJob]);
	},

	// Update job status
	updateJobStatus: (jobId: string, status: Job['status']) => {
		jobHistory.update(jobs => 
			jobs.map(job => 
				job.id === jobId 
					? { ...job, status, ...(status === 'completed' ? { endTime: getCurrentTime() } : {}) }
					: job
			)
		);
		
		currentJob.update(job => 
			job?.id === jobId 
				? { ...job, status, ...(status === 'completed' ? { endTime: getCurrentTime() } : {}) }
				: job
		);
	},

	// Add sensor reading to current job
	addSensorReading: (reading: TemperatureReading | FlowMeterReading | PressureReading | GasDetection | SensorReading | PumpSystemData) => {
		currentJob.update(job => {
			if (!job) return job;
			
			// Determine which array to update based on reading type
			if ('ambient' in reading) {
				return { ...job, temperatureReadings: [...job.temperatureReadings, reading] };
			} else if ('netVolume' in reading) {
				return { ...job, flowMeterReadings: [...job.flowMeterReadings, reading] };
			} else if ('containerLoad' in reading) {
				return { ...job, pressureReadings: [...job.pressureReadings, reading] };
			} else if ('toxicGasExternal' in reading) {
				return { ...job, gasDetections: [...job.gasDetections, reading] };
			} else if ('tankLevel' in reading) {
				return { ...job, sensorReadings: [...job.sensorReadings, reading] };
			} else if ('pumpRpm' in reading) {
				return { ...job, pumpSystemData: [...job.pumpSystemData, reading] };
			}
			
			return job;
		});
	},

	// Complete current job
	completeJob: (finalVolume: number) => {
		currentJob.update(job => {
			if (!job) return job;
			
			const actualVariance = job.initialVolume - finalVolume;
			const completedJob = {
				...job,
				finalVolume,
				actualVariance,
				status: 'completed' as const,
				endTime: getCurrentTime(),
				transitProgress: 100
			};
			
			// Update job history
			jobHistory.update(jobs => 
				jobs.map(j => j.id === job.id ? completedJob : j)
			);
			
			return completedJob;
		});
	}
};

// Temperature analysis functions
export function getTemperatureStats(readings: TemperatureReading[]) {
	if (readings.length === 0) return null;
	
	const temps = readings.map(r => r.productTemp);
	const min = Math.min(...temps);
	const max = Math.max(...temps);
	const avg = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
	
	return { min, max, avg };
}

// Volume variance calculation
export function calculateExpectedVariance(
	initialVolume: number,
	avgAmbient: number,
	avgInternal: number,
	transitTimeHours: number
): number {
	// Generic variance calculation based on environmental factors
	const tempDifferential = Math.abs(avgInternal - avgAmbient);
	const tempFactor = tempDifferential * 0.001; // 0.1% per degree difference
	const timeFactor = transitTimeHours * 0.002; // 0.2% per hour
	
	return initialVolume * (tempFactor + timeFactor);
}

// Initialize demo data on load
if (browser) {
	jobActions.initializeDemoData();
} 