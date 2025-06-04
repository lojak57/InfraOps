/**
 * Driver Store - Re-exports for Backward Compatibility
 * 
 * This file has been refactored into modular components for better maintainability:
 * - Driver Types: ../types/driver.types.ts
 * - Driver Store: ./driver-core.store.ts
 * - Driver Actions: ./driver.actions.ts
 */

// ================================
// Type Re-exports
// ================================

export type {
  DriverState,
  DriverProfile,
  DriverStatus,
  DriverPreferences,
  NotificationSettings,
  ShiftInfo,
  ShiftStatus,
  BreakRecord,
  DriverJob,
  JobPriority,
  DriverJobStatus,
  JobLocation,
  CargoDetails,
  JobSchedule,
  TimeWindow,
  JobDocument,
  DocumentType,
  Checkpoint,
  RoutePoint,
  InspectionTask,
  InspectionType,
  InspectionCategory,
  InspectionResult,
  ComplianceStatus,
  HOSCompliance,
  CertificationStatus,
  CertificationType,
  DOTViolation,
  RequiredAction,
  DriverNotification,
  NotificationType,
  PerformanceMetrics,
  Certification,
  Driver
} from '../types/driver.types';

// ================================
// Store Re-exports
// ================================

export {
  driverState,
  currentDriver,
  assignedJobs,
  activeJob,
  urgentNotifications,
  pendingInspections,
  complianceAlerts
} from './driver-core.store';

// ================================
// Action Re-exports
// ================================

export {
  loginDriver,
  startShift,
  endShift,
  updateDriverStatus,
  acknowledgeJob,
  updateJobStatus,
  completeInspection,
  markNotificationRead,
  logoutDriver,
  mockDrivers
} from './driver.actions'; 