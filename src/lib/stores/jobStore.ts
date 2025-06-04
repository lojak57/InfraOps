/**
 * Job Store - Re-exports for Backward Compatibility
 * 
 * This file has been refactored into modular components for better maintainability:
 * - Job Types: ./types/jobStore.types.ts
 * - Job Data: ./data/jobStore.data.ts  
 * - Job Actions: ./actions/jobStore.actions.ts
 */

import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// ================================
// Type Re-exports
// ================================

export type {
	TemperatureReading,
	FlowMeterReading,
	PressureReading,
	GasDetection,
	SensorReading,
	PumpSystemData,
	SystemStatus,
	Site,
	Driver,
	Vehicle,
	Job,
	JobStatus,
	SensorDataType,
	TemperatureStats,
	JobStoreState
} from './types/jobStore.types';

// ================================
// Data Re-exports
// ================================

export {
	mockSites,
	mockDrivers,
	mockVehicles,
	mockSystemStatus,
	demoJob,
	getCurrentTime,
	getStaticTimestamp
} from './data/jobStore.data';

// ================================
// Core Store Definitions
// ================================

// Current active job
export const currentJob = writable<any>(null);

// Historical jobs data
export const jobHistory = writable<any[]>([]);

// Available sites
export const sites = writable<any[]>([]);

// Drivers database
export const drivers = writable<any[]>([]);

// Vehicles database
export const vehicles = writable<any[]>([]);

// System status store
export const systemStatus = writable({
	systemOnline: true,
	connectedDevices: 8,
	networkHealth: 98.5,
	lastUpdate: new Date(),
	dataLatency: 120,
	flowMeterOnline: true,
	gasDetectorsOnline: true,
	pressureSensorsOnline: true,
	temperatureSensorsOnline: true,
	pumpSystemOnline: true,
	operationsOnline: true
});

// ================================
// Derived Stores
// ================================

// Derived store for active jobs
export const activeJobs = derived(jobHistory, ($jobs) => 
	$jobs.filter((job: any) => job.status !== 'completed')
);

// Derived store for completed jobs
export const completedJobs = derived(jobHistory, ($jobs) => 
	$jobs.filter((job: any) => job.status === 'completed')
);

// Derived store for jobs in transit
export const jobsInTransit = derived(jobHistory, ($jobs) => 
	$jobs.filter((job: any) => job.status === 'transit')
);

// ================================
// Actions & Utilities Re-exports
// ================================

export {
	jobActions,
	setStoreReferences,
	getTemperatureStats,
	calculateExpectedVariance,
	getLatestReading,
	filterReadingsByTimeRange,
	calculateAverageFlowRate,
	detectAnomalies,
	calculateEfficiency,
	validateSensorReading,
	sanitizeJobData
} from './actions/jobStore.actions';

// ================================
// Store Initialization
// ================================

// Initialize store references for actions
import { setStoreReferences } from './actions/jobStore.actions';
setStoreReferences(currentJob, jobHistory);

// Initialize with mock data
if (browser) {
	import('./data/jobStore.data').then(({ mockSites, mockDrivers, mockVehicles, mockSystemStatus }) => {
		sites.set(mockSites);
		drivers.set(mockDrivers);
		vehicles.set(mockVehicles);
		systemStatus.set(mockSystemStatus);
	});
}

// ================================
// Default Export for Compatibility
// ================================

export default {
	currentJob,
	jobHistory,
	sites,
	drivers,
	vehicles,
	systemStatus,
	activeJobs,
	completedJobs,
	jobsInTransit
}; 