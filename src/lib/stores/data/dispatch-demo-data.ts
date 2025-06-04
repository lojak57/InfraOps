/**
 * Dispatch Demo Data - Re-exports for Backward Compatibility
 * 
 * This file has been refactored into modular components for better maintainability:
 * - Fleet Data: ../dispatch/data/fleet-mock-data.ts 
 * - Yard Data: ../dispatch/data/yard-mock-data.ts
 * - Truck Data: ../dispatch/data/truck-mock-data.ts
 * - Job Data: ../dispatch/data/job-mock-data.ts
 */

// ================================
// Data Re-exports
// ================================

// Fleet Data
export {
	DEMO_FLEET,
	getFleetSummary,
	getFleetAlerts
} from '../dispatch/data/fleet-mock-data';

// Yard Data
export {
	DEMO_YARDS,
	getYardById,
	getYardsByRegion,
	getYardsByStatus,
	getYardAlerts,
	calculateYardUtilization,
	calculateBayUtilization,
	getYardPerformanceMetrics
} from '../dispatch/data/yard-mock-data';

// Truck Data
export {
	DEMO_TRUCKS,
	getTruckById,
	getTrucksByYard,
	getTrucksByStatus,
	getTruckAlerts,
	getTopPerformers,
	getUnderperformers,
	getTrucksNeedingMaintenance,
	calculateFleetAverages
} from '../dispatch/data/truck-mock-data';

// Job/Haul Data
export {
	DEMO_HAULS,
	getJobById,
	getJobsByTruck,
	getJobsByDriver,
	getJobsByStatus,
	getJobsByCustomer,
	getJobAlerts,
	getTopPerformingJobs,
	getUnderperformingJobs,
	getHighVolumeLossJobs,
	calculateJobAverages,
	getJobsByDateRange
} from '../dispatch/data/job-mock-data';

// ================================
// Aggregate Utilities
// ================================

import { DEMO_FLEET } from '../dispatch/data/fleet-mock-data';
import { DEMO_YARDS } from '../dispatch/data/yard-mock-data';
import { DEMO_TRUCKS } from '../dispatch/data/truck-mock-data';
import { DEMO_HAULS } from '../dispatch/data/job-mock-data';
import { getFleetSummary, getFleetAlerts } from '../dispatch/data/fleet-mock-data';
import { getYardAlerts } from '../dispatch/data/yard-mock-data';
import { getTruckAlerts } from '../dispatch/data/truck-mock-data';
import { getJobAlerts } from '../dispatch/data/job-mock-data';

export function getAllDispatchData() {
	return {
		fleet: DEMO_FLEET,
		yards: DEMO_YARDS,
		trucks: DEMO_TRUCKS,
		jobs: DEMO_HAULS
	};
}

export function getDispatchSummary() {
	return {
		fleet: getFleetSummary(),
		yards: DEMO_YARDS.length,
		trucks: DEMO_TRUCKS.length,
		jobs: DEMO_HAULS.length,
		alerts: {
			fleet: getFleetAlerts().length,
			yards: getYardAlerts().length,
			trucks: getTruckAlerts().length,
			jobs: getJobAlerts().length
		}
	};
} 