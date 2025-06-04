/**
 * Dispatch Actions
 * 
 * Business logic functions for dispatch operations including job assignment,
 * status management, alerts handling, and data loading.
 */

import type { 
  DispatchState, 
  JobStatus, 
  DispatchAlert 
} from '../types/dispatch.types';

// ================================
// Data Loading Actions
// ================================

/**
 * Load dispatch data from API
 */
export async function loadDispatchData(): Promise<Partial<DispatchState>> {
  // TODO: Replace with actual API calls
  const mockData = await loadMockDispatchData();
  return mockData;
}

/**
 * Load mock dispatch data for development
 */
async function loadMockDispatchData(): Promise<Partial<DispatchState>> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    activeJobs: [
      {
        id: 'job-001',
        truckId: 'truck-001',
        driverId: 'driver-001',
        origin: {
          id: 'loc-001',
          name: 'Production Terminal Alpha',
          address: '123 Industrial Blvd, Metro City, ST 12345',
          coordinates: { lat: 35.0000, lng: -98.0000 },
          type: 'pickup',
          operationalStatus: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
          organizationId: 'default'
        },
        destination: {
          id: 'loc-002',
          name: 'Processing Facility Beta',
          address: '456 Manufacturing Ave, Industrial City, ST 54321',
          coordinates: { lat: 35.5000, lng: -97.5000 },
          type: 'delivery',
          operationalStatus: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
          organizationId: 'default'
        },
        status: 'en_route_delivery',
        priority: 'normal',
        estimatedDuration: 240,
        progress: 67,
        cargo: {
          type: 'liquid_product',
          volume: 8000,
          temperature: 76,
          pressure: 145
        },
        telemetry: {
          timestamp: new Date(),
          speed: 65,
          fuelLevel: 78,
          engineTemp: 195,
          fluidPressure: 35,
          cargoTemp: 76,
          cargoPressure: 145,
          location: { lat: 35.2500, lng: -97.7500 }
        },
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        updatedAt: new Date(),
        organizationId: 'default'
      }
    ],
    fleetStatus: {
      totalTrucks: 12,
      availableTrucks: 8,
      trucksInUse: 3,
      trucksInMaintenance: 1,
      totalDrivers: 15,
      availableDrivers: 10,
      driversOnDuty: 5,
      activeJobs: 3,
      completedToday: 8,
      averageUtilization: 72.5
    }
  };
}

// ================================
// Job Management Actions
// ================================

/**
 * Assign job to driver and truck
 */
export function assignJobAction(
  state: DispatchState,
  jobId: string, 
  driverId: string, 
  truckId: string
): DispatchState {
  const newState = { ...state };
  
  // Update job
  const jobIndex = newState.activeJobs.findIndex(h => h.id === jobId);
  if (jobIndex >= 0) {
    newState.activeJobs[jobIndex] = {
      ...newState.activeJobs[jobIndex],
      driverId,
      truckId,
      status: 'assigned'
    };
  }
  
  // Update driver status
  const driverIndex = newState.availableDrivers.findIndex(d => d.id === driverId);
  if (driverIndex >= 0) {
    newState.availableDrivers[driverIndex] = {
      ...newState.availableDrivers[driverIndex],
      status: 'on_duty',
      assignedTruckId: truckId
    };
  }
  
  // Update truck status
  const truckIndex = newState.availableTrucks.findIndex(t => t.id === truckId);
  if (truckIndex >= 0) {
    newState.availableTrucks[truckIndex] = {
      ...newState.availableTrucks[truckIndex],
      status: 'in_use',
      assignedDriverId: driverId
    };
  }
  
  return newState;
}

/**
 * Update job status
 */
export function updateJobStatusAction(
  state: DispatchState,
  jobId: string, 
  status: JobStatus
): DispatchState {
  const newState = { ...state };
  
  const jobIndex = newState.activeJobs.findIndex(h => h.id === jobId);
  if (jobIndex >= 0) {
    newState.activeJobs[jobIndex] = {
      ...newState.activeJobs[jobIndex],
      status,
      updatedAt: new Date()
    };
  }
  
  return newState;
}

// ================================
// Alert Management Actions
// ================================

/**
 * Add new alert
 */
export function addAlertAction(
  state: DispatchState,
  alert: Omit<DispatchAlert, 'id' | 'createdAt' | 'updatedAt' | 'organizationId'>
): DispatchState {
  const newState = { ...state };
  
  const newAlert: DispatchAlert = {
    ...alert,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    organizationId: 'default' // TODO: Get from auth context
  };
  
  newState.alerts = [newAlert, ...newState.alerts];
  return newState;
}

/**
 * Mark alert as resolved
 */
export function resolveAlertAction(
  state: DispatchState,
  alertId: string, 
  resolvedBy: string
): DispatchState {
  const newState = { ...state };
  
  const alertIndex = newState.alerts.findIndex(a => a.id === alertId);
  if (alertIndex >= 0) {
    newState.alerts[alertIndex] = {
      ...newState.alerts[alertIndex],
      isResolved: true,
      resolvedBy,
      resolvedAt: new Date(),
      updatedAt: new Date()
    };
  }
  
  return newState;
}

// ================================
// Utility Actions
// ================================

/**
 * Set loading state
 */
export function setLoadingAction(
  state: DispatchState,
  isLoading: boolean
): DispatchState {
  return { ...state, isLoading };
}

/**
 * Reset dispatch state
 */
export function resetDispatchStateAction(): DispatchState {
  return {
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
}

// ================================
// Validation Utilities
// ================================

/**
 * Validate job assignment
 */
export function validateJobAssignment(
  state: DispatchState,
  jobId: string,
  driverId: string,
  truckId: string
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check if job exists
  const job = state.activeJobs.find(j => j.id === jobId);
  if (!job) {
    errors.push('Job not found');
  }
  
  // Check if driver exists and is available
  const driver = state.availableDrivers.find(d => d.id === driverId);
  if (!driver) {
    errors.push('Driver not found');
  } else if (driver.status !== 'available') {
    errors.push('Driver is not available');
  }
  
  // Check if truck exists and is available
  const truck = state.availableTrucks.find(t => t.id === truckId);
  if (!truck) {
    errors.push('Truck not found');
  } else if (truck.status !== 'available') {
    errors.push('Truck is not available');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
} 