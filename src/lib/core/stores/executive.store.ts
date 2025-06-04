/**
 * Executive Store - Re-exports for Backward Compatibility
 * 
 * This file has been refactored into modular components for better maintainability:
 * - Executive Types: ../types/executive.types.ts (includes ExecutiveState)
 * - Executive Store: ./executive-core.store.ts
 * - Executive Actions: ./executive.actions.ts
 * - Mock Data: ../data/executive-mock-data.ts
 */

// ================================
// Type Re-exports
// ================================

export type {
  ExecutiveState
} from '../types/executive.types';

// ================================
// Store Re-exports
// ================================

export {
  executiveStore,
  getInitialState,
  activeDashboard,
  currentKPIs,
  kpisByCategory,
  currentFinancialMetrics,
  currentOperationalMetrics,
  activeKPIAlerts,
  criticalKPIAlerts,
  kpiPerformanceSummary,
  dashboardWidgets
} from './executive-core.store';

// ================================
// Mock Data Re-exports
// ================================

export {
  getDefaultTimeRange,
  generateMockFinancialMetrics,
  generateMockOperationalMetrics,
  generateMockKPIData,
  generateMockDashboard,
  generateKPIDataPoints
} from '../data/executive-mock-data';

// ================================
// Action Re-exports (imported separately to avoid circular deps)
// ================================

// Note: Actions are imported from separate file in consuming modules
// to avoid circular dependency issues

// ================================
// Default Export for Compatibility
// ================================

export { executiveStore as default } from './executive-core.store'; 