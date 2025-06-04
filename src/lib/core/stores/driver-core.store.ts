/**
 * Driver Core Store
 * 
 * Core store for driver state management with derived stores.
 * Types and actions have been modularized for better maintainability.
 */

import { writable, derived, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { DriverState } from '../types/driver.types';

// ================================
// Initial State
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

// ================================
// Core Store
// ================================

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
// Browser Auto-initialization
// ================================

if (browser) {
  const storedDriverId = localStorage.getItem('datatracker-driver-id');
  if (storedDriverId) {
    // TODO: Auto-login with stored credentials
    console.log('Auto-login driver ID found:', storedDriverId);
  }
} 