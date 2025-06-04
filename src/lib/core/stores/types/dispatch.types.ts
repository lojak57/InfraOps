/**
 * Dispatch Domain Types
 * 
 * Type definitions for dispatch operations including jobs, drivers, trucks,
 * fleet management, routing, and real-time telemetry.
 */

import type { BaseEntity, GeoLocation } from '../../types/common.types';

// ================================
// Core Dispatch Types
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

// ================================
// Cargo & Location Types
// ================================

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

// ================================
// Driver Types
// ================================

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

// ================================
// Truck Types
// ================================

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

// ================================
// Fleet Management Types
// ================================

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

// ================================
// Routing Types
// ================================

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

// ================================
// Alert Types
// ================================

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

// ================================
// Telemetry Types
// ================================

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