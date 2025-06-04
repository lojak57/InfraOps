/**
 * Driver Domain Types
 * 
 * Types related to drivers, mobile workflows, DOT compliance,
 * inspections, and driver-specific operations.
 */

import type { BaseEntity, GeoLocation } from './base.types';

// ================================
// Core Driver Types
// ================================

export interface DriverState {
  currentDriver: DriverProfile | null;
  currentShift: ShiftInfo | null;
  assignedJobs: DriverJob[];
  inspectionTasks: InspectionTask[];
  complianceStatus: ComplianceStatus;
  notifications: DriverNotification[];
  isOnline: boolean;
  isLoading: boolean;
}

export interface DriverProfile extends BaseEntity {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: DriverStatus;
  currentLocation?: GeoLocation;
  assignedTruckId?: string;
  profilePhoto?: string;
  preferences: DriverPreferences;
  certifications: Certification[];
  performanceMetrics: PerformanceMetrics;
}

export type DriverStatus = 
  | 'offline'
  | 'available'
  | 'on_duty'
  | 'driving'
  | 'pickup'
  | 'unpickup'
  | 'break'
  | 'meal_break'
  | 'maintenance'
  | 'emergency';

export interface DriverPreferences {
  language: 'en' | 'es' | 'fr';
  notifications: NotificationSettings;
  mapView: 'satellite' | 'road' | 'hybrid';
  temperatureUnit: 'celsius' | 'fahrenheit';
  distanceUnit: 'miles' | 'kilometers';
  darkMode: boolean;
}

export interface NotificationSettings {
  push: boolean;
  sms: boolean;
  email: boolean;
  newJobs: boolean;
  emergencyAlerts: boolean;
  maintenanceReminders: boolean;
  dotCompliance: boolean;
}

// ================================
// Shift & Hours of Service
// ================================

export interface ShiftInfo {
  startTime: Date;
  maxDuration: number; // minutes (DOT regulations)
  hoursWorked: number;
  breaksTaken: BreakRecord[];
  currentStatus: ShiftStatus;
  violations: DOTViolation[];
}

export type ShiftStatus = 'on_duty' | 'driving' | 'sleeper_berth' | 'off_duty';

export interface BreakRecord {
  startTime: Date;
  endTime?: Date;
  type: 'short_break' | 'meal_break' | 'rest_period';
  isRequired: boolean;
  location?: GeoLocation;
}

// ================================
// Driver Job Types
// ================================

export interface DriverJob extends BaseEntity {
  jobNumber: string;
  priority: JobPriority;
  status: DriverJobStatus;
  origin: JobLocation;
  destination: JobLocation;
  cargo: CargoDetails;
  schedule: JobSchedule;
  instructions: string[];
  documents: JobDocument[];
  checkpoints: Checkpoint[];
  actualRoute?: RoutePoint[];
}

export type JobPriority = 'routine' | 'priority' | 'urgent' | 'emergency';

export type DriverJobStatus = 
  | 'assigned'
  | 'acknowledged' 
  | 'en_route_pickup'
  | 'arrived_pickup'
  | 'pickup'
  | 'loaded'
  | 'en_route_delivery'
  | 'arrived_delivery'
  | 'unpickup'
  | 'completed'
  | 'delayed'
  | 'cancelled';

export interface JobLocation {
  name: string;
  address: string;
  coordinates: GeoLocation;
  contactPerson?: string;
  contactPhone?: string;
  specialInstructions?: string;
  accessCodes?: string;
  operatingHours?: string;
}

export interface CargoDetails {
  type: string;
  quantity: number;
  unit: 'gallons' | 'units' | 'tons';
  hazmatClass?: string;
  temperature?: number;
  pressure?: number;
  specialHandling?: string[];
}

export interface JobSchedule {
  pickupWindow: TimeWindow;
  deliveryWindow: TimeWindow;
  estimatedDuration: number; // minutes
  estimatedDistance: number; // miles
}

export interface TimeWindow {
  earliest: Date;
  latest: Date;
  preferred?: Date;
}

export interface JobDocument {
  type: DocumentType;
  name: string;
  url: string;
  isRequired: boolean;
  isUploaded: boolean;
  uploadedAt?: Date;
}

export type DocumentType = 
  | 'bill_of_lading'
  | 'manifest'
  | 'inspection_report'
  | 'delivery_receipt'
  | 'incident_report'
  | 'photo_evidence';

export interface Checkpoint {
  id: string;
  name: string;
  coordinates: GeoLocation;
  type: 'pickup' | 'delivery' | 'inspection' | 'fuel' | 'rest';
  isRequired: boolean;
  isCompleted: boolean;
  completedAt?: Date;
  notes?: string;
}

export interface RoutePoint {
  coordinates: GeoLocation;
  timestamp: Date;
  speed?: number; // mph
  heading?: number; // degrees
}

// ================================
// Inspection Types
// ================================

export interface InspectionTask extends BaseEntity {
  type: InspectionType;
  title: string;
  description: string;
  category: InspectionCategory;
  isRequired: boolean;
  isCompleted: boolean;
  completedAt?: Date;
  result?: InspectionResult;
  photos?: string[];
  notes?: string;
  dueDate: Date;
}

export type InspectionType = 
  | 'pre_trip'
  | 'post_trip'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'dot_inspection';

export type InspectionCategory = 
  | 'vehicle'
  | 'trailer'
  | 'cargo_area'
  | 'safety_equipment'
  | 'documentation';

export type InspectionResult = 'pass' | 'fail' | 'needs_attention';

// ================================
// Compliance & DOT Types
// ================================

export interface ComplianceStatus {
  hosCompliance: HOSCompliance;
  certifications: CertificationStatus[];
  violations: DOTViolation[];
  nextRequiredAction?: RequiredAction;
}

export interface HOSCompliance {
  currentStatus: 'compliant' | 'warning' | 'violation';
  hoursAvailable: number;
  nextBreakRequired: Date;
  nextRestRequired: Date;
  maxDriveTime: number; // minutes remaining
  maxOnDutyTime: number; // minutes remaining
}

export interface CertificationStatus {
  type: CertificationType;
  status: 'valid' | 'expiring' | 'expired';
  expirationDate: Date;
  daysUntilExpiration: number;
}

export type CertificationType = 
  | 'cdl'
  | 'hazmat'
  | 'dot_medical'
  | 'safety_training'
  | 'defensive_driving';

export interface DOTViolation {
  type: string;
  description: string;
  severity: 'minor' | 'major' | 'critical';
  timestamp: Date;
  location?: GeoLocation;
  fineAmount?: number;
  isResolved: boolean;
}

export interface RequiredAction {
  type: 'break' | 'rest' | 'inspection' | 'certification_renewal';
  description: string;
  deadline: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

// ================================
// Notification Types
// ================================

export interface DriverNotification extends BaseEntity {
  type: NotificationType;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead: boolean;
  isActionable: boolean;
  actionType?: 'acknowledge' | 'respond' | 'complete_task';
  relatedJobId?: string;
  expiresAt?: Date;
}

export type NotificationType = 
  | 'new_job'
  | 'job_update'
  | 'emergency_alert'
  | 'maintenance_reminder'
  | 'compliance_warning'
  | 'break_reminder'
  | 'weather_alert'
  | 'traffic_alert';

// ================================
// Performance & Certification Types
// ================================

export interface PerformanceMetrics {
  safetyScore: number; // 0-100
  efficiencyScore: number; // 0-100
  onTimeDelivery: number; // percentage
  fuelEfficiency: number; // mpg
  totalJobs: number;
  totalMiles: number;
  incidentCount: number;
  violationCount: number;
  lastUpdated: Date;
}

export interface Certification {
  type: CertificationType;
  number: string;
  issuedBy: string;
  issuedDate: Date;
  expirationDate: Date;
  isValid: boolean;
  documentUrl?: string;
}

// ================================
// Legacy Driver Type (for compatibility)
// ================================

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'available' | 'busy' | 'offline';
  hoursRemaining: number;
  currentLocation?: string;
  currentTruck?: string;
  certifications: string[];
  rating: number;
  totalJobs: number;
  photoUrl?: string;
} 