/**
 * DataTracker Platform - Driver Store
 * 
 * State management for driver workflows including mobile interfaces,
 * DOT compliance tracking, and driver-specific operations.
 */

import { writable, derived, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { BaseEntity, GeoLocation } from '../types/common.types';

// ================================
// Driver Domain Types
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
// Store Implementation
// ================================

const initialState: DriverState = {
  currentDriver: null,
  currentShift: null,
  assignedJobs: [],
  inspectionTasks: [],
  complianceStatus: {
    hosCompliance: {
      currentStatus: 'compliant',
      hoursAvailable: 11,
      nextBreakRequired: new Date(Date.now() + 4 * 60 * 60 * 1000),
      nextRestRequired: new Date(Date.now() + 10 * 60 * 60 * 1000),
      maxDriveTime: 660, // 11 hours
      maxOnDutyTime: 840 // 14 hours
    },
    certifications: [],
    violations: []
  },
  notifications: [],
  isOnline: false,
  isLoading: false
};

// Core store
export const driverState: Writable<DriverState> = writable(initialState);

// ================================
// Derived Stores
// ================================

export const currentDriver = derived(
  driverState,
  ($state) => $state.currentDriver
);

export const assignedJobs = derived(
  driverState,
  ($state) => $state.assignedJobs
);

export const activeJob = derived(
  driverState,
  ($state) => $state.assignedJobs.find(job => 
    !['completed', 'cancelled'].includes(job.status)
  ) || null
);

export const urgentNotifications = derived(
  driverState,
  ($state) => $state.notifications.filter(notification => 
    !notification.isRead && notification.priority === 'urgent'
  )
);

export const pendingInspections = derived(
  driverState,
  ($state) => $state.inspectionTasks.filter(task => 
    !task.isCompleted && task.dueDate <= new Date(Date.now() + 24 * 60 * 60 * 1000)
  )
);

export const complianceAlerts = derived(
  driverState,
  ($state) => {
    const alerts = [];
    const { hosCompliance, certifications } = $state.complianceStatus;
    
    if (hosCompliance.currentStatus !== 'compliant') {
      alerts.push({
        type: 'HOS Violation',
        severity: hosCompliance.currentStatus
      });
    }
    
    certifications.forEach(cert => {
      if (cert.status === 'expiring' && cert.daysUntilExpiration <= 30) {
        alerts.push({
          type: `${cert.type.toUpperCase()} Expiring`,
          severity: 'warning'
        });
      }
    });
    
    return alerts;
  }
);

// ================================
// Actions
// ================================

/**
 * Initialize driver session
 */
export async function loginDriver(employeeId: string, pin: string): Promise<boolean> {
  driverState.update(state => ({ ...state, isLoading: true }));
  
  try {
    // TODO: Replace with actual authentication
    const driverData = await authenticateDriver(employeeId, pin);
    
    if (driverData) {
      driverState.update(state => ({
        ...state,
        currentDriver: driverData,
        isOnline: true,
        isLoading: false
      }));
      
      // Load driver-specific data
      await loadDriverData(driverData.id);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Driver login failed:', error);
    driverState.update(state => ({ ...state, isLoading: false }));
    return false;
  }
}

/**
 * Start driver shift
 */
export function startShift(): void {
  driverState.update(state => {
    if (state.currentDriver) {
      state.currentShift = {
        startTime: new Date(),
        maxDuration: 14 * 60, // 14 hours DOT limit
        hoursWorked: 0,
        breaksTaken: [],
        currentStatus: 'on_duty',
        violations: []
      };
      
      state.currentDriver.status = 'on_duty';
    }
    return state;
  });
}

/**
 * Update driver status
 */
export function updateDriverStatus(status: DriverStatus): void {
  driverState.update(state => {
    if (state.currentDriver) {
      state.currentDriver.status = status;
      state.currentDriver.updatedAt = new Date();
      
      // Update shift status if relevant
      if (state.currentShift) {
        if (['driving', 'on_duty'].includes(status)) {
          state.currentShift.currentStatus = status === 'driving' ? 'driving' : 'on_duty';
        }
      }
    }
    return state;
  });
}

/**
 * Acknowledge job assignment
 */
export function acknowledgeJob(jobId: string): void {
  driverState.update(state => {
    const jobIndex = state.assignedJobs.findIndex(h => h.id === jobId);
    if (jobIndex >= 0) {
      state.assignedJobs[jobIndex] = {
        ...state.assignedJobs[jobIndex],
        status: 'acknowledged',
        updatedAt: new Date()
      };
    }
    return state;
  });
}

/**
 * Update job status
 */
export function updateJobStatus(jobId: string, status: DriverJobStatus): void {
  driverState.update(state => {
    const jobIndex = state.assignedJobs.findIndex(h => h.id === jobId);
    if (jobIndex >= 0) {
      state.assignedJobs[jobIndex] = {
        ...state.assignedJobs[jobIndex],
        status,
        updatedAt: new Date()
      };
    }
    return state;
  });
}

/**
 * Complete inspection task
 */
export function completeInspection(
  taskId: string, 
  result: InspectionResult, 
  notes?: string
): void {
  driverState.update(state => {
    const taskIndex = state.inspectionTasks.findIndex(t => t.id === taskId);
    if (taskIndex >= 0) {
      state.inspectionTasks[taskIndex] = {
        ...state.inspectionTasks[taskIndex],
        isCompleted: true,
        completedAt: new Date(),
        result,
        notes,
        updatedAt: new Date()
      };
    }
    return state;
  });
}

/**
 * Mark notification as read
 */
export function markNotificationRead(notificationId: string): void {
  driverState.update(state => {
    const notificationIndex = state.notifications.findIndex(n => n.id === notificationId);
    if (notificationIndex >= 0) {
      state.notifications[notificationIndex] = {
        ...state.notifications[notificationIndex],
        isRead: true,
        updatedAt: new Date()
      };
    }
    return state;
  });
}

// ================================
// Mock Data Functions (Temporary)
// ================================

async function authenticateDriver(employeeId: string, pin: string): Promise<DriverProfile | null> {
  // Simulate authentication delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful authentication
  if (employeeId === 'DRIVER001' && pin === '1234') {
    return {
      id: 'driver-001',
      employeeId: 'DRIVER001',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@datatracker.com',
      phone: '+1-555-0123',
      status: 'available',
      profilePhoto: '/assets/driver-photos/john-smith.jpg',
      preferences: {
        language: 'en',
        notifications: {
          push: true,
          sms: true,
          email: false,
          newJobs: true,
          emergencyAlerts: true,
          maintenanceReminders: true,
          dotCompliance: true
        },
        mapView: 'road',
        temperatureUnit: 'fahrenheit',
        distanceUnit: 'miles',
        darkMode: false
      },
      certifications: [
        {
          type: 'cdl',
          number: 'TX-CDL-123456',
          issuedBy: 'Texas DPS',
          issuedDate: new Date('2020-01-15'),
          expirationDate: new Date('2025-01-15'),
          isValid: true
        }
      ],
      performanceMetrics: {
        safetyScore: 95,
        efficiencyScore: 88,
        onTimeDelivery: 94.5,
        fuelEfficiency: 6.2,
        totalJobs: 156,
        totalMiles: 48750,
        incidentCount: 0,
        violationCount: 1,
        lastUpdated: new Date()
      },
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date(),
      organizationId: 'default'
    };
  }
  
  return null;
}

async function loadDriverData(driverId: string): Promise<void> {
  // TODO: Load actual driver data from API
  
  driverState.update(state => ({
    ...state,
    assignedJobs: [
      {
        id: 'job-driver-001',
        jobNumber: 'TH-2024-001',
        priority: 'routine',
        status: 'assigned',
        origin: {
          name: 'Permian Basin Terminal',
          address: '123 Logistics Rd, Midland, TX 79701',
          coordinates: { lat: 31.8457, lng: -102.3676 },
          contactPerson: 'Mike Johnson',
          contactPhone: '+1-432-555-0156',
          operatingHours: '6:00 AM - 10:00 PM'
        },
        destination: {
          name: 'Houston Processing Facility',
          address: '456 Processing Facility Ave, Houston, TX 77002',
          coordinates: { lat: 29.7604, lng: -95.3698 },
          contactPerson: 'Sarah Williams',
          contactPhone: '+1-713-555-0198'
        },
        cargo: {
          type: 'Product Oil',
          quantity: 8000,
          unit: 'gallons',
          temperature: 75
        },
        schedule: {
          pickupWindow: {
            earliest: new Date(Date.now() + 2 * 60 * 60 * 1000),
            latest: new Date(Date.now() + 4 * 60 * 60 * 1000)
          },
          deliveryWindow: {
            earliest: new Date(Date.now() + 6 * 60 * 60 * 1000),
            latest: new Date(Date.now() + 8 * 60 * 60 * 1000)
          },
          estimatedDuration: 240,
          estimatedDistance: 285
        },
        instructions: [
          'Verify tanker cleanliness before pickup',
          'Check temperature sensors are functional',
          'Confirm cargo manifest details',
          'Take photos of seal numbers'
        ],
        documents: [],
        checkpoints: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        organizationId: 'default'
      }
    ]
  }));
}

// Auto-initialize if driver ID is stored
if (browser) {
  const storedDriverId = localStorage.getItem('datatracker-driver-id');
  if (storedDriverId) {
    // TODO: Auto-login with stored credentials
  }
} 