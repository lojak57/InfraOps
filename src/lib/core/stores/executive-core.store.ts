/**
 * Executive Core Store
 * 
 * Core store for executive dashboard state management with derived stores.
 * Types, actions, and mock data have been modularized for better maintainability.
 */

import { writable, derived, type Writable } from 'svelte/store';
import type { 
  ExecutiveState, 
  KPICategory 
} from '../types/executive.types';
import { getDefaultTimeRange } from '../data/executive-mock-data';

// ================================
// Initial State
// ================================

export const getInitialState = (): ExecutiveState => ({
  dashboards: [],
  activeDashboardId: null,
  kpiDefinitions: [],
  kpiData: {},
  kpiAlerts: [],
  financialMetrics: [],
  operationalMetrics: [],
  benchmarkData: {},
  reports: [],
  generatedReports: {},
  selectedTimeRange: getDefaultTimeRange(),
  comparisonTimeRange: null,
  isLoading: false,
  isRefreshing: false,
  lastUpdate: null,
  error: null,
  userId: null,
  organizationId: null
});

// ================================
// Core Store
// ================================

export const executiveStore: Writable<ExecutiveState> = writable(getInitialState());

// ================================
// Derived Stores
// ================================

export const activeDashboard = derived(
  executiveStore,
  ($state) => $state.dashboards.find(d => d.id === $state.activeDashboardId)
);

export const currentKPIs = derived(
  executiveStore,
  ($state) => $state.kpiDefinitions.filter(kpi => kpi.isActive)
);

export const kpisByCategory = derived(
  currentKPIs,
  ($kpis) => {
    const categories: Record<KPICategory, typeof $kpis> = {
      financial: [],
      operational: [],
      safety: [],
      efficiency: [],
      customer: [],
      driver: [],
      fleet: [],
      environmental: []
    };
    
    $kpis.forEach(kpi => {
      categories[kpi.category].push(kpi);
    });
    
    return categories;
  }
);

export const currentFinancialMetrics = derived(
  executiveStore,
  ($state) => {
    const latest = $state.financialMetrics
      .filter(m => m.organizationId === $state.organizationId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
    return latest || null;
  }
);

export const currentOperationalMetrics = derived(
  executiveStore,
  ($state) => {
    const latest = $state.operationalMetrics
      .filter(m => m.organizationId === $state.organizationId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
    return latest || null;
  }
);

export const activeKPIAlerts = derived(
  executiveStore,
  ($state) => $state.kpiAlerts.filter(alert => alert.isActive)
);

export const criticalKPIAlerts = derived(
  activeKPIAlerts,
  ($alerts) => $alerts.filter(alert => 
    alert.severity === 'critical' || alert.severity === 'emergency'
  )
);

export const kpiPerformanceSummary = derived(
  executiveStore,
  ($state) => {
    const summary = {
      total: 0,
      excellent: 0,
      good: 0,
      acceptable: 0,
      poor: 0,
      critical: 0
    };
    
    Object.values($state.kpiData).forEach(dataPoints => {
      if (dataPoints.length > 0) {
        const latest = dataPoints[dataPoints.length - 1];
        summary.total++;
        summary[latest.status]++;
      }
    });
    
    return summary;
  }
);

export const dashboardWidgets = derived(
  activeDashboard,
  ($dashboard) => $dashboard?.widgets || []
); 