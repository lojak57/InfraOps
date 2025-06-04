/**
 * Executive Actions & Business Logic
 * 
 * Functions for managing executive dashboard state, KPI operations,
 * real-time updates, and analytics data management.
 */

import { get } from 'svelte/store';
import { executiveStore, getInitialState } from './executive-core.store';
import { 
  generateMockFinancialMetrics,
  generateMockOperationalMetrics,
  generateMockKPIData,
  generateMockDashboard,
  generateKPIDataPoints
} from '../data/executive-mock-data';
import type { 
  TimeRange, 
  TimeRangePreset, 
  ExecutiveState 
} from '../types/executive.types';

// ================================
// Executive Actions
// ================================

export const executiveActions = {
  // Initialization
  async initialize(userId: string, organizationId: string): Promise<void> {
    executiveStore.update((state: ExecutiveState) => ({
      ...state,
      isLoading: true,
      error: null,
      userId,
      organizationId
    }));
    
    try {
      // Simulate API calls
      await Promise.all([
        this.loadDashboards(),
        this.loadKPIDefinitions(),
        this.loadReports()
      ]);
      
      // Start real-time updates
      this.startRealTimeUpdates();
      
      executiveStore.update((state: ExecutiveState) => ({
        ...state,
        isLoading: false,
        lastUpdate: new Date()
      }));
      
    } catch (error) {
      executiveStore.update((state: ExecutiveState) => ({
        ...state,
        error: error instanceof Error ? error.message : 'Failed to initialize executive store',
        isLoading: false
      }));
    }
  },

  // Dashboard Management
  async loadDashboards(): Promise<void> {
    const mockDashboard = generateMockDashboard();
    
    executiveStore.update((state: ExecutiveState) => ({
      ...state,
      dashboards: [mockDashboard],
      activeDashboardId: mockDashboard.id
    }));
  },

  async loadKPIDefinitions(): Promise<void> {
    const kpis = generateMockKPIData();
    
    executiveStore.update((state: ExecutiveState) => ({
      ...state,
      kpiDefinitions: kpis
    }));
    
    // Generate initial KPI data points
    kpis.forEach(kpi => {
      this.updateKPIData(kpi.id);
    });
  },

  async loadReports(): Promise<void> {
    // Mock reports would be loaded here
    executiveStore.update((state: ExecutiveState) => ({
      ...state,
      reports: []
    }));
  },

  // KPI Management
  updateKPIData(kpiId: string): void {
    const state: ExecutiveState = get(executiveStore);
    const kpi = state.kpiDefinitions.find(k => k.id === kpiId);
    if (!kpi) return;
    
    const dataPoints = generateKPIDataPoints(kpiId, kpi);
    
    executiveStore.update((currentState: ExecutiveState) => ({
      ...currentState,
      kpiData: {
        ...currentState.kpiData,
        [kpiId]: dataPoints
      }
    }));
  },

  // Real-time Updates
  startRealTimeUpdates(): void {
    const updateInterval = setInterval(() => {
      const state: ExecutiveState = get(executiveStore);
      if (!state.organizationId) return;
      
      // Update financial metrics
      const financialMetrics = generateMockFinancialMetrics(state.organizationId);
      
      // Update operational metrics
      const operationalMetrics = generateMockOperationalMetrics(state.organizationId);
      
      // Update KPI data
      state.kpiDefinitions.forEach(kpi => {
        if (kpi.frequency === 'real-time' || kpi.frequency === 'hourly') {
          this.updateKPIData(kpi.id);
        }
      });
      
      executiveStore.update((currentState: ExecutiveState) => ({
        ...currentState,
        financialMetrics: [financialMetrics, ...currentState.financialMetrics.slice(0, 11)], // Keep last 12
        operationalMetrics: [operationalMetrics, ...currentState.operationalMetrics.slice(0, 11)],
        lastUpdate: new Date()
      }));
      
    }, 60000); // Update every minute
    
    // Store interval for cleanup
    if (typeof window !== 'undefined') {
      (window as any).executiveUpdateInterval = updateInterval;
    }
  },

  stopRealTimeUpdates(): void {
    if (typeof window !== 'undefined' && (window as any).executiveUpdateInterval) {
      clearInterval((window as any).executiveUpdateInterval);
      delete (window as any).executiveUpdateInterval;
    }
  },

  // Time Range Management
  setTimeRange(range: TimeRange): void {
    executiveStore.update((state: ExecutiveState) => ({
      ...state,
      selectedTimeRange: range
    }));
    
    // Refresh data for new time range
    this.refreshData();
  },

  setTimeRangePreset(preset: TimeRangePreset): void {
    let start: Date;
    let end = new Date();
    
    switch (preset) {
      case 'today':
        start = new Date();
        start.setHours(0, 0, 0, 0);
        break;
      case 'yesterday':
        start = new Date();
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end = new Date();
        end.setDate(end.getDate() - 1);
        end.setHours(23, 59, 59, 999);
        break;
      case 'last_7_days':
        start = new Date();
        start.setDate(start.getDate() - 7);
        break;
      case 'last_30_days':
        start = new Date();
        start.setDate(start.getDate() - 30);
        break;
      case 'this_month':
        start = new Date();
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        break;
      case 'last_month':
        start = new Date();
        start.setMonth(start.getMonth() - 1);
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        end = new Date();
        end.setDate(0); // Last day of previous month
        end.setHours(23, 59, 59, 999);
        break;
      default:
        start = new Date();
        start.setDate(start.getDate() - 30);
    }
    
    this.setTimeRange({
      start,
      end,
      preset,
      isCustom: false
    });
  },

  // Data Refresh
  async refreshData(): Promise<void> {
    executiveStore.update((state: ExecutiveState) => ({ 
      ...state, 
      isRefreshing: true 
    }));
    
    try {
      const state: ExecutiveState = get(executiveStore);
      
      if (state.organizationId) {
        // Refresh all data based on current time range
        const financialMetrics = generateMockFinancialMetrics(state.organizationId);
        const operationalMetrics = generateMockOperationalMetrics(state.organizationId);
        
        executiveStore.update((currentState: ExecutiveState) => ({
          ...currentState,
          financialMetrics: [financialMetrics, ...currentState.financialMetrics.slice(0, 11)],
          operationalMetrics: [operationalMetrics, ...currentState.operationalMetrics.slice(0, 11)],
          isRefreshing: false,
          lastUpdate: new Date()
        }));
      }
      
    } catch (error) {
      executiveStore.update((state: ExecutiveState) => ({
        ...state,
        error: error instanceof Error ? error.message : 'Failed to refresh data',
        isRefreshing: false
      }));
    }
  },

  // Dashboard Actions
  setActiveDashboard(dashboardId: string): void {
    executiveStore.update((state: ExecutiveState) => ({
      ...state,
      activeDashboardId: dashboardId
    }));
  },

  // Utility Actions
  clearError(): void {
    executiveStore.update((state: ExecutiveState) => ({
      ...state,
      error: null
    }));
  },

  reset(): void {
    this.stopRealTimeUpdates();
    executiveStore.set(getInitialState());
  }
};

// ================================
// Auto-cleanup
// ================================

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    executiveActions.stopRealTimeUpdates();
  });
} 