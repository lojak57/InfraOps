/**
 * Base Entity and Utility Types
 * 
 * Core foundational types used across the entire application.
 * All entities should extend BaseEntity for consistency.
 */

// ================================
// Base Entity Types  
// ================================

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
}

export interface TimestampedEntity {
  timestamp: Date;
}

// ================================
// Location & Geographic Types
// ================================

export interface GeoLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}

export interface Location extends BaseEntity {
  name: string;
  address: string;
  coordinates: GeoLocation;
  type: LocationType;
  operatingHours?: OperatingHours;
  contactInfo?: ContactInfo;
}

export type LocationType = 
  | 'collection point'
  | 'storage_facility' 
  | 'processing facility'
  | 'distribution_center'
  | 'customer_site';

export interface OperatingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string; // HH:MM format
  closeTime?: string; // HH:MM format
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  emergencyContact?: string;
}

// ================================
// Utility Types
// ================================

export type Maybe<T> = T | null | undefined;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// Type guards
export const isNotNull = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export const isDefined = <T>(value: T | undefined): value is T => {
  return value !== undefined;
};

// ================================
// System Status Types
// ================================

export interface SystemStatus {
  isOnline: boolean;
  lastHeartbeat: Date;
  health: HealthStatus;
  services: ServiceStatus[];
}

export type HealthStatus = 'healthy' | 'degraded' | 'down' | 'maintenance';

export interface ServiceStatus {
  name: string;
  status: HealthStatus;
  responseTime: number;
  lastChecked: Date;
  errorMessage?: string;
}

// ================================
// Event Types
// ================================

export interface DomainEvent<T = unknown> {
  id: string;
  type: string;
  timestamp: Date;
  payload: T;
  source: string;
  version: number;
}

export interface WebSocketMessage<T = unknown> {
  type: string;
  payload: T;
  timestamp: Date;
  id: string;
} 