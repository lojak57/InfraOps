/**
 * DataTracker Platform - Dispatch Store (Modular)
 * 
 * This file has been refactored into modular components for better maintainability:
 * - Types: ./types/dispatch.types.ts
 * - Actions: ./actions/dispatch.actions.ts
 * 
 * State management for dispatch operations including fleet oversight,
 * route planning, and real-time job coordination.
 */

import { writable, derived, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

// Module imports
import type { 
  DispatchState,
  JobStatus,
  DispatchAlert
} from './types/dispatch.types';
import { 
  loadDispatchData,
  assignJobAction,
  updateJobStatusAction,
  addAlertAction,
  resolveAlertAction,
  setLoadingAction,
  resetDispatchStateAction,
  validateJobAssignment
} from './actions/dispatch.actions';

// ================================
// Store Implementation
// ================================

const initialState: DispatchState = {
  activeJobs: [],
  availableDrivers: [],
  availableTrucks: [],
  fleetStatus: {
    totalTrucks: 0,
    availableTrucks: 0,
    trucksInUse: 0,
    trucksInMaintenance: 0,
    totalDrivers: 0,
    availableDrivers: 0,
    driversOnDuty: 0,
    activeJobs: 0,
    completedToday: 0,
    averageUtilization: 0
  },
  routeAssignments: [],
  alerts: [],
  isLoading: false
};

// Core store
export const dispatchState: Writable<DispatchState> = writable(initialState);

// ================================
// Derived Stores
// ================================

export const activeJobs = derived(
  dispatchState,
  ($state) => $state.activeJobs
);

export const availableDrivers = derived(
  dispatchState,
  ($state) => $state.availableDrivers
);

export const availableTrucks = derived(
  dispatchState,
  ($state) => $state.availableTrucks
);

export const fleetStatus = derived(
  dispatchState,
  ($state) => $state.fleetStatus
);

export const criticalAlerts = derived(
  dispatchState,
  ($state) => $state.alerts.filter(alert => 
    alert.severity === 'critical' && !alert.isResolved
  )
);

export const overdueJobs = derived(
  dispatchState,
  ($state) => $state.activeJobs.filter(job => {
    if (!job.estimatedDuration) return false;
    const now = new Date();
    const elapsed = now.getTime() - job.createdAt.getTime();
    return elapsed > (job.estimatedDuration * 60 * 1000);
  })
);

// ================================
// Public API Functions
// ================================

/**
 * Load dispatch data from API
 */
export async function loadDispatchDataStore(): Promise<void> {
  dispatchState.update(state => setLoadingAction(state, true));
  
  try {
    const data = await loadDispatchData();
    
    dispatchState.update(state => ({
      ...setLoadingAction(state, false),
      ...data
    }));
  } catch (error) {
    console.error('Failed to load dispatch data:', error);
    dispatchState.update(state => setLoadingAction(state, false));
  }
}

/**
 * Assign job to driver and truck
 */
export function assignJob(
  jobId: string, 
  driverId: string, 
  truckId: string
): void {
  dispatchState.update(state => {
    const validation = validateJobAssignment(state, jobId, driverId, truckId);
    if (!validation.isValid) {
      console.error('Job assignment validation failed:', validation.errors);
      return state;
    }
    
    return assignJobAction(state, jobId, driverId, truckId);
  });
}

/**
 * Update job status
 */
export function updateJobStatus(jobId: string, status: JobStatus): void {
  dispatchState.update(state => updateJobStatusAction(state, jobId, status));
}

/**
 * Add new alert
 */
export function addAlert(alert: Omit<DispatchAlert, 'id' | 'createdAt' | 'updatedAt' | 'organizationId'>): void {
  dispatchState.update(state => addAlertAction(state, alert));
}

/**
 * Mark alert as resolved
 */
export function resolveAlert(alertId: string, resolvedBy: string): void {
  dispatchState.update(state => resolveAlertAction(state, alertId, resolvedBy));
}

/**
 * Reset dispatch state
 */
export function resetDispatchState(): void {
  dispatchState.set(resetDispatchStateAction());
}

// ================================
// Type Re-exports for Compatibility
// ================================

export type {
  DispatchState,
  Job,
  JobStatus,
  JobPriority,
  Driver,
  DriverStatus,
  Truck,
  TruckStatus,
  FleetStatus,
  DispatchAlert,
  AlertType,
  AlertSeverity,
  CargoInfo,
  CargoType,
  Location,
  RouteAssignment,
  RoutePoint,
  RouteDeviation,
  TelemetrySnapshot,
  Certification,
  CertificationType,
  MaintenanceStatus
} from './types/dispatch.types';

// ================================
// Auto-initialization
// ================================

// Auto-initialize if in browser
if (browser) {
  loadDispatchDataStore();
}

// Mock dispatch data with anonymized information
const MOCK_DRIVERS = [
	{
		id: 'D001',
		name: 'Driver Alpha-1',
		status: 'available',
		location: 'Metro Hub Alpha',
		hoursRemaining: 8.5,
		currentTruck: 'FL-001'
	},
	{
		id: 'D002', 
		name: 'Driver Alpha-2',
		status: 'busy',
		location: 'Processing Terminal Beta',
		hoursRemaining: 6.2,
		currentTruck: 'FL-002'
	},
	{
		id: 'D003',
		name: 'Driver Beta-1', 
		status: 'available',
		location: 'Metro Hub Beta',
		hoursRemaining: 4.8,
		currentTruck: 'FL-003'
	}
];

const MOCK_ROUTES = [
	{
		id: 'R001',
		driver: 'Driver Alpha-1',
		truck: 'FL-001',
		origin: 'Production Site Alpha',
		destination: 'Processing Terminal Beta',
		status: 'in-progress',
		eta: '14:30'
	},
	{
		id: 'R002',
		driver: 'Driver Beta-1', 
		truck: 'FL-003',
		origin: 'Collection Hub Gamma',
		destination: 'Distribution Center Delta',
		status: 'scheduled',
		eta: '16:45'
	}
]; 