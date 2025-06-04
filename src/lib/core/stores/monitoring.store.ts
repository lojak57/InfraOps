/**
 * Monitoring Store - Re-exports for Backward Compatibility
 * 
 * This file has been refactored into modular components for better maintainability:
 * - Monitoring Types: ../types/monitoring.types.ts (includes MonitoringState)
 * - Monitoring Store: ./monitoring-core.store.ts
 * - Monitoring Actions: ./monitoring.actions.ts
 * - Mock Data: ../data/monitoring-mock-data.ts
 */

// ================================
// Type Re-exports
// ================================

export type {
  MonitoringState
} from '../types/monitoring.types';

// ================================
// Store Re-exports
// ================================

export {
  monitoringStore,
  getInitialState,
  selectedSystem,
  currentTelemetryData,
  currentSensorReadings,
  currentValveStatuses,
  criticalAlerts,
  systemsOverview,
  activeDashboard
} from './monitoring-core.store';

// ================================
// Mock Data Re-exports
// ================================

export {
  generateMockSensorData,
  generateMockValveData,
  generateMockMonitoringSystems,
  generateMockTelemetryData,
  generateMockAlert
} from '../data/monitoring-mock-data';

// ================================
// Actions are imported separately to avoid circular deps
// ================================

// Note: Import monitoringActions from './monitoring.actions' in consuming modules

// ================================
// Default Export for Compatibility
// ================================

export { monitoringStore as default } from './monitoring-core.store'; 