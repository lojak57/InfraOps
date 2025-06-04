/**
 * Driver Actions & Utilities
 * 
 * Functions for managing driver state, authentication, and operations.
 */

import { driverState } from './driver-core.store';
import type { 
  DriverProfile, 
  DriverStatus, 
  DriverJobStatus, 
  InspectionResult,
  Driver
} from '../types/driver.types';

// ================================
// Driver Actions
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
 * End driver shift
 */
export function endShift(): void {
  driverState.update(state => {
    if (state.currentDriver) {
      state.currentDriver.status = 'offline';
      state.currentShift = null;
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

/**
 * Log out current driver
 */
export function logoutDriver(): void {
  driverState.update(() => ({
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
        maxDriveTime: 660,
        maxOnDutyTime: 840
      },
      certifications: [],
      violations: []
    },
    notifications: [],
    isOnline: false,
    isLoading: false
  }));
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
      firstName: 'Driver',
      lastName: 'Alpha-1',
      email: 'driver.alpha1@fleet.demo',
      phone: '(XXX) XXX-1001',
      status: 'available',
      profilePhoto: '/assets/driver-photos/alpha-1.jpg',
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
          number: 'ST-CDL-123456',
          issuedBy: 'State Transportation Dept',
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
          name: 'Production Terminal Alpha',
          address: '123 Industrial Blvd, Metro City, ST 12345',
          coordinates: { lat: 35.0000, lng: -98.0000 },
          contactPerson: 'Manager Alpha-1',
          contactPhone: '(XXX) XXX-2001',
          operatingHours: '6:00 AM - 10:00 PM'
        },
        destination: {
          name: 'Processing Facility Beta',
          address: '456 Manufacturing Ave, Industrial City, ST 54321',
          coordinates: { lat: 35.5000, lng: -97.5000 },
          contactPerson: 'Supervisor Beta-2',
          contactPhone: '(XXX) XXX-2002'
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

// ================================
// Demo Driver Data
// ================================

export const mockDrivers: Driver[] = [
  {
    id: 'D001',
    name: 'Driver Alpha-1',
    phone: '(XXX) XXX-1001',
    email: 'driver.alpha1@fleet.demo',
    status: 'available',
    hoursRemaining: 8.5,
    currentLocation: 'Metro Hub Alpha',
    currentTruck: 'FL-001',
    certifications: ['Hazmat', 'DOT Physical', 'CDL-A'],
    rating: 4.8,
    totalJobs: 247,
    photoUrl: '/images/drivers/alpha-1.jpg'
  },
  {
    id: 'D002',
    name: 'Driver Alpha-2',
    phone: '(XXX) XXX-1002',
    email: 'driver.alpha2@fleet.demo',
    status: 'busy',
    hoursRemaining: 6.2,
    currentLocation: 'Processing Terminal Beta',
    currentTruck: 'FL-002',
    certifications: ['DOT Physical', 'CDL-A', 'Safety Training'],
    rating: 4.9,
    totalJobs: 189,
    photoUrl: '/images/drivers/alpha-2.jpg'
  },
  {
    id: 'D003',
    name: 'Driver Beta-1',
    phone: '(XXX) XXX-1003',
    email: 'driver.beta1@fleet.demo',
    status: 'available',
    hoursRemaining: 4.8,
    currentLocation: 'Metro Hub Beta',
    currentTruck: 'FL-003',
    certifications: ['Hazmat', 'DOT Physical', 'CDL-A', 'First Aid'],
    rating: 4.7,
    totalJobs: 156,
    photoUrl: '/images/drivers/beta-1.jpg'
  },
  {
    id: 'D004',
    name: 'Driver Beta-2',
    phone: '(XXX) XXX-1004',
    email: 'driver.beta2@fleet.demo',
    status: 'offline',
    hoursRemaining: 0,
    currentLocation: 'Metro Hub Gamma',
    certifications: ['DOT Physical', 'CDL-A'],
    rating: 4.6,
    totalJobs: 203,
    photoUrl: '/images/drivers/beta-2.jpg'
  },
  {
    id: 'D005',
    name: 'Driver Gamma-1',
    phone: '(XXX) XXX-1005',
    email: 'driver.gamma1@fleet.demo',
    status: 'busy',
    hoursRemaining: 7.1,
    currentLocation: 'Distribution Center Delta',
    currentTruck: 'FL-004',
    certifications: ['Hazmat', 'DOT Physical', 'CDL-A', 'Defensive Driving'],
    rating: 4.9,
    totalJobs: 312,
    photoUrl: '/images/drivers/gamma-1.jpg'
  }
]; 