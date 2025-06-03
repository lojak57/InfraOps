/**
 * DataTracker Platform - Dispatch Store
 * 
 * State management for dispatch operations including fleet oversight,
 * route planning, and real-time job coordination.
 */

import { writable, derived, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { BaseEntity, GeoLocation } from '../types/common.types';

// ================================
// Dispatch Domain Types
// ================================

export interface DispatchState {
  activeJobs: Job[];
  availableDrivers: Driver[];
  availableTrucks: Truck[];
  fleetStatus: FleetStatus;
  routeAssignments: RouteAssignment[];
  alerts: DispatchAlert[];
  isLoading: boolean;
}

export interface Job extends BaseEntity {
  truckId: string;
  driverId: string;
  origin: Location;
  destination: Location;
  status: JobStatus;
  priority: JobPriority;
  estimatedDuration: number; // minutes
  actualDuration?: number; // minutes
  currentLocation?: GeoLocation;
  progress: number; // 0-100%
  cargo: CargoInfo;
  telemetry: TelemetrySnapshot;
}

export type JobStatus = 
  | 'pending'
  | 'assigned'
  | 'en_route_pickup'
  | 'pickup'
  | 'en_route_delivery'
  | 'offpickup'
  | 'completed'
  | 'cancelled';

export type JobPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface CargoInfo {
  type: CargoType;
  volume: number; // gallons/units
  temperature: number; // fahrenheit
  pressure: number; // PSI
  hazmatClass?: string;
}

export type CargoType = 'liquid_product' | 'processed_product' | 'natural_gas' | 'water' | 'chemicals';

export interface Location extends BaseEntity {
  name: string;
  address: string;
  coordinates: GeoLocation;
  type: 'pickup' | 'delivery' | 'staging';
  operationalStatus: 'active' | 'maintenance' | 'offline';
}

export interface Driver extends BaseEntity {
  employeeId: string;
  firstName: string;
  lastName: string;
  status: DriverStatus;
  currentLocation?: GeoLocation;
  assignedTruckId?: string;
  certifications: Certification[];
  performanceRating: number; // 1-5
  hoursWorked: number; // current shift
  maxHours: number; // DOT limits
}

export type DriverStatus = 
  | 'available'
  | 'on_duty'
  | 'driving'
  | 'pickup'
  | 'unpickup'
  | 'break'
  | 'off_duty'
  | 'unavailable';

export interface Certification {
  type: CertificationType;
  number: string;
  expirationDate: Date;
  isValid: boolean;
}

export type CertificationType = 'cdl' | 'hazmat' | 'dot_medical' | 'safety_training';

export interface Truck extends BaseEntity {
  fleetNumber: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  capacity: number; // gallons
  status: TruckStatus;
  currentLocation?: GeoLocation;
  assignedDriverId?: string;
  maintenanceStatus: MaintenanceStatus;
  fuelLevel: number; // percentage
  mileage: number;
}

export type TruckStatus = 
  | 'available'
  | 'in_use'
  | 'pickup'
  | 'unpickup'
  | 'maintenance'
  | 'out_of_service';

export interface MaintenanceStatus {
  lastInspection: Date;
  nextInspection: Date;
  issuesCount: number;
  isOverdue: boolean;
}

export interface FleetStatus {
  totalTrucks: number;
  availableTrucks: number;
  trucksInUse: number;
  trucksInMaintenance: number;
  totalDrivers: number;
  availableDrivers: number;
  driversOnDuty: number;
  activeJobs: number;
  completedToday: number;
  averageUtilization: number; // percentage
}

export interface RouteAssignment extends BaseEntity {
  jobId: string;
  driverId: string;
  truckId: string;
  plannedRoute: RoutePoint[];
  estimatedDistance: number; // miles
  estimatedTime: number; // minutes
  actualRoute?: RoutePoint[];
  deviations: RouteDeviation[];
}

export interface RoutePoint {
  coordinates: GeoLocation;
  timestamp: Date;
  speed?: number; // mph
  heading?: number; // degrees
}

export interface RouteDeviation {
  timestamp: Date;
  reason: string;
  impact: 'minor' | 'moderate' | 'major';
  delayMinutes: number;
}

export interface DispatchAlert extends BaseEntity {
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  jobId?: string;
  driverId?: string;
  truckId?: string;
  isRead: boolean;
  isResolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
}

export type AlertType = 
  | 'route_deviation'
  | 'delay'
  | 'mechanical_issue'
  | 'safety_violation'
  | 'fuel_low'
  | 'driver_overtime'
  | 'maintenance_due'
  | 'weather_warning';

export type AlertSeverity = 'info' | 'warning' | 'critical';

export interface TelemetrySnapshot {
  timestamp: Date;
  speed: number; // mph
  fuelLevel: number; // percentage
  engineTemp: number; // fahrenheit
  fluidPressure: number; // PSI
  cargoTemp: number; // fahrenheit
  cargoPressure: number; // PSI
  location: GeoLocation;
}

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
// Actions
// ================================

/**
 * Load dispatch data from API
 */
export async function loadDispatchData(): Promise<void> {
  dispatchState.update(state => ({ ...state, isLoading: true }));
  
  try {
    // TODO: Replace with actual API calls
    const mockData = await loadMockDispatchData();
    
    dispatchState.update(state => ({
      ...state,
      ...mockData,
      isLoading: false
    }));
  } catch (error) {
    console.error('Failed to load dispatch data:', error);
    dispatchState.update(state => ({ ...state, isLoading: false }));
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
    const jobIndex = state.activeJobs.findIndex(h => h.id === jobId);
    if (jobIndex >= 0) {
      state.activeJobs[jobIndex] = {
        ...state.activeJobs[jobIndex],
        driverId,
        truckId,
        status: 'assigned'
      };
    }
    
    // Update driver status
    const driverIndex = state.availableDrivers.findIndex(d => d.id === driverId);
    if (driverIndex >= 0) {
      state.availableDrivers[driverIndex] = {
        ...state.availableDrivers[driverIndex],
        status: 'on_duty',
        assignedTruckId: truckId
      };
    }
    
    // Update truck status
    const truckIndex = state.availableTrucks.findIndex(t => t.id === truckId);
    if (truckIndex >= 0) {
      state.availableTrucks[truckIndex] = {
        ...state.availableTrucks[truckIndex],
        status: 'in_use',
        assignedDriverId: driverId
      };
    }
    
    return state;
  });
}

/**
 * Update job status
 */
export function updateJobStatus(jobId: string, status: JobStatus): void {
  dispatchState.update(state => {
    const jobIndex = state.activeJobs.findIndex(h => h.id === jobId);
    if (jobIndex >= 0) {
      state.activeJobs[jobIndex] = {
        ...state.activeJobs[jobIndex],
        status,
        updatedAt: new Date()
      };
    }
    return state;
  });
}

/**
 * Add new alert
 */
export function addAlert(alert: Omit<DispatchAlert, 'id' | 'createdAt' | 'updatedAt' | 'organizationId'>): void {
  dispatchState.update(state => {
    const newAlert: DispatchAlert = {
      ...alert,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: 'default' // TODO: Get from auth context
    };
    
    state.alerts.unshift(newAlert);
    return state;
  });
}

/**
 * Mark alert as resolved
 */
export function resolveAlert(alertId: string, resolvedBy: string): void {
  dispatchState.update(state => {
    const alertIndex = state.alerts.findIndex(a => a.id === alertId);
    if (alertIndex >= 0) {
      state.alerts[alertIndex] = {
        ...state.alerts[alertIndex],
        isResolved: true,
        resolvedBy,
        resolvedAt: new Date(),
        updatedAt: new Date()
      };
    }
    return state;
  });
}

// ================================
// Mock Data (Temporary)
// ================================

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
          name: 'Permian Basin Terminal',
          address: '123 Logistics Rd, Midland, TX',
          coordinates: { lat: 31.8457, lng: -102.3676 },
          type: 'pickup',
          operationalStatus: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
          organizationId: 'default'
        },
        destination: {
          id: 'loc-002',
          name: 'Houston Processing Facility',
          address: '456 Processing Facility Ave, Houston, TX',
          coordinates: { lat: 29.7604, lng: -95.3698 },
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
          location: { lat: 30.5, lng: -99.2 }
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

// Auto-initialize if in browser
if (browser) {
  loadDispatchData();
} 