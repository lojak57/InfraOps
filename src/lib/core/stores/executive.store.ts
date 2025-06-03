/**
 * DataTracker Platform - Executive Store
 * 
 * Professional business intelligence and analytics management system for
 * executive dashboards, KPI tracking, financial metrics, and performance analytics.
 * 
 * Features:
 * - Executive dashboard management
 * - Real-time KPI tracking and monitoring
 * - Financial and operational analytics
 * - Automated report generation
 * - Performance benchmarking
 * - Alert management for business metrics
 * - Multi-tenant analytics with proper isolation
 */

import { writable, derived, get } from 'svelte/store';
import type {
  ExecutiveDashboard,
  ExecutiveWidget,
  KPIDefinition,
  AnalyticsDataPoint,
  FinancialMetrics,
  OperationalMetrics,
  ExecutiveReport,
  KPIAlert,
  BenchmarkData,
  TimeRange,
  TimeRangePreset,
  TimePeriod,
  PerformanceStatus,
  KPICategory
} from '../types/common.types';

// ================================
// Store State Interfaces
// ================================

export interface ExecutiveState {
  // Dashboard Management
  dashboards: ExecutiveDashboard[];
  activeDashboardId: string | null;
  
  // KPI Management
  kpiDefinitions: KPIDefinition[];
  kpiData: Record<string, AnalyticsDataPoint[]>;
  kpiAlerts: KPIAlert[];
  
  // Analytics Data
  financialMetrics: FinancialMetrics[];
  operationalMetrics: OperationalMetrics[];
  benchmarkData: Record<string, BenchmarkData>;
  
  // Reports
  reports: ExecutiveReport[];
  generatedReports: Record<string, any>; // Report ID -> Generated content
  
  // Time Management
  selectedTimeRange: TimeRange;
  comparisonTimeRange: TimeRange | null;
  
  // State Management
  isLoading: boolean;
  isRefreshing: boolean;
  lastUpdate: Date | null;
  error: string | null;
  
  // User Context
  userId: string | null;
  organizationId: string | null;
}

// ================================
// Initial State
// ================================

const getDefaultTimeRange = (): TimeRange => ({
  start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
  end: new Date(),
  preset: 'last_30_days',
  isCustom: false
});

const initialState: ExecutiveState = {
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
};

// ================================
// Core Store
// ================================

export const executiveStore = writable<ExecutiveState>(initialState);

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
    const categories: Record<KPICategory, KPIDefinition[]> = {
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

// ================================
// Mock Data Generation
// ================================

function generateMockFinancialMetrics(organizationId: string): FinancialMetrics {
  const baseRevenue = 2500000;
  const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
  
  const totalRevenue = baseRevenue * (1 + variation);
  const totalCosts = totalRevenue * (0.65 + Math.random() * 0.1); // 65-75% cost ratio
  
  return {
    organizationId,
    period: 'monthly',
    timestamp: new Date(),
    
    // Revenue Metrics
    totalRevenue,
    revenuePerJob: totalRevenue / 450, // ~450 jobs/month
    revenuePerMile: totalRevenue / 125000, // ~125k miles/month
    revenueGrowth: (Math.random() - 0.3) * 0.4, // -30% to +10%
    
    // Cost Metrics
    totalCosts,
    fuelCosts: totalCosts * 0.35,
    driverCosts: totalCosts * 0.28,
    maintenanceCosts: totalCosts * 0.15,
    operationalCosts: totalCosts * 0.22,
    costPerMile: totalCosts / 125000,
    costPerJob: totalCosts / 450,
    
    // Profitability
    grossProfit: totalRevenue - totalCosts,
    grossMargin: ((totalRevenue - totalCosts) / totalRevenue) * 100,
    netProfit: (totalRevenue - totalCosts) * 0.85, // After taxes/overhead
    netMargin: (((totalRevenue - totalCosts) * 0.85) / totalRevenue) * 100,
    ebitda: (totalRevenue - totalCosts) * 0.92,
    
    // Efficiency
    utilizationRate: 82 + Math.random() * 15, // 82-97%
    emptyMilePercentage: 8 + Math.random() * 12, // 8-20%
    costEfficiencyIndex: 85 + Math.random() * 20 // 85-105
  };
}

function generateMockOperationalMetrics(organizationId: string): OperationalMetrics {
  return {
    organizationId,
    period: 'monthly',
    timestamp: new Date(),
    
    // Fleet Performance
    totalJobs: 450 + Math.floor(Math.random() * 100),
    completedJobs: 425 + Math.floor(Math.random() * 90),
    completionRate: 92 + Math.random() * 7, // 92-99%
    averageJobTime: 4.2 + Math.random() * 1.5, // 4.2-5.7 hours
    onTimeDeliveryRate: 87 + Math.random() * 12, // 87-99%
    
    // Driver Performance
    totalDrivers: 28 + Math.floor(Math.random() * 8),
    activeDrivers: 24 + Math.floor(Math.random() * 6),
    driverUtilization: 78 + Math.random() * 18, // 78-96%
    averageHoursPerDriver: 42 + Math.random() * 8, // 42-50 hours/week
    driverSatisfactionScore: 72 + Math.random() * 23, // 72-95%
    
    // Fleet Utilization
    totalTrucks: 18 + Math.floor(Math.random() * 5),
    activeTrucks: 16 + Math.floor(Math.random() * 4),
    truckUtilization: 85 + Math.random() * 12, // 85-97%
    averageMilesPerTruck: 6500 + Math.random() * 2000, // 6.5k-8.5k miles/month
    maintenanceDowntime: 2.5 + Math.random() * 3, // 2.5-5.5%
    
    // Safety Metrics
    incidentCount: Math.floor(Math.random() * 3), // 0-2 incidents
    incidentRate: Math.random() * 0.8, // 0-0.8 per 100k miles
    safetyScore: 88 + Math.random() * 11, // 88-99
    complianceScore: 92 + Math.random() * 7, // 92-99
    
    // Efficiency Metrics
    fuelEfficiency: 6.2 + Math.random() * 1.1, // 6.2-7.3 MPG
    routeOptimizationScore: 78 + Math.random() * 18, // 78-96
    loadFactorAverage: 0.82 + Math.random() * 0.15 // 82-97%
  };
}

function generateMockKPIData(): KPIDefinition[] {
  return [
    {
      id: 'kpi-revenue-growth',
      name: 'Monthly Revenue Growth',
      description: 'Month-over-month revenue growth percentage',
      category: 'financial',
      metric: {
        name: 'Revenue Growth',
        unit: '%',
        dataType: 'percentage',
        sourceTable: 'financial_metrics',
        sourceField: 'revenue_growth'
      },
      target: {
        value: 5,
        type: 'minimum',
        period: 'monthly',
        isStretch: false
      },
      thresholds: {
        excellent: 10,
        good: 5,
        acceptable: 0,
        poor: -5
      },
      calculation: {
        formula: '((current_revenue - previous_revenue) / previous_revenue) * 100',
        dependencies: ['revenue'],
        aggregationLevel: 'organization'
      },
      frequency: 'daily',
      isActive: true,
      owner: 'CFO',
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: 'datatracker'
    },
    {
      id: 'kpi-fleet-utilization',
      name: 'Fleet Utilization Rate',
      description: 'Percentage of fleet actively generating revenue',
      category: 'operational',
      metric: {
        name: 'Fleet Utilization',
        unit: '%',
        dataType: 'percentage',
        sourceTable: 'operational_metrics',
        sourceField: 'truck_utilization'
      },
      target: {
        value: 85,
        type: 'minimum',
        period: 'monthly',
        isStretch: false
      },
      thresholds: {
        excellent: 95,
        good: 85,
        acceptable: 75,
        poor: 65
      },
      calculation: {
        formula: '(active_trucks / total_trucks) * 100',
        dependencies: ['truck_count', 'active_trucks'],
        aggregationLevel: 'organization'
      },
      frequency: 'real-time',
      isActive: true,
      owner: 'Operations Manager',
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: 'datatracker'
    },
    {
      id: 'kpi-safety-score',
      name: 'Safety Performance Score',
      description: 'Composite safety score based on incidents and compliance',
      category: 'safety',
      metric: {
        name: 'Safety Score',
        unit: 'score',
        dataType: 'integer',
        sourceTable: 'operational_metrics',
        sourceField: 'safety_score'
      },
      target: {
        value: 95,
        type: 'minimum',
        period: 'monthly',
        isStretch: false
      },
      thresholds: {
        excellent: 98,
        good: 95,
        acceptable: 90,
        poor: 85
      },
      calculation: {
        formula: '100 - (incident_rate * compliance_penalty)',
        dependencies: ['incidents', 'compliance'],
        aggregationLevel: 'organization'
      },
      frequency: 'daily',
      isActive: true,
      owner: 'Safety Manager',
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: 'datatracker'
    }
  ];
}

// ================================
// Store Actions
// ================================

export const executiveActions = {
  // Initialization
  async initialize(userId: string, organizationId: string): Promise<void> {
    executiveStore.update(state => ({
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
      
      executiveStore.update(state => ({
        ...state,
        isLoading: false,
        lastUpdate: new Date()
      }));
      
    } catch (error) {
      executiveStore.update(state => ({
        ...state,
        error: error instanceof Error ? error.message : 'Failed to initialize executive store',
        isLoading: false
      }));
    }
  },

  // Dashboard Management
  async loadDashboards(): Promise<void> {
    const mockDashboard: ExecutiveDashboard = {
      id: 'exec-dashboard-main',
      name: 'Executive Overview',
      description: 'Primary executive dashboard with key business metrics',
      userId: 'user-1',
      layout: {
        columns: 12,
        rows: 8,
        responsiveBreakpoints: { mobile: 768, tablet: 1024, desktop: 1440 }
      },
      widgets: [
        {
          id: 'widget-revenue',
          type: 'revenue_chart',
          title: 'Monthly Revenue Trend',
          position: { x: 0, y: 0 },
          size: { width: 6, height: 3 },
          configuration: {
            updateInterval: 300000, // 5 minutes
            showTargets: true,
            showTrends: true,
            comparisonPeriod: 'monthly',
            aggregationType: 'sum',
            displayFormat: 'currency',
            colorScheme: 'professional',
            drillDownEnabled: true
          },
          dataSource: {
            id: 'financial-metrics',
            name: 'Financial Metrics',
            type: 'database',
            connection: {},
            refreshRate: 300000,
            isActive: true
          },
          chartType: 'line',
          permissions: []
        }
      ],
      kpis: [],
      timeRange: getDefaultTimeRange(),
      refreshInterval: 300000,
      isDefault: true,
      shareSettings: {
        isPublic: false,
        allowedUsers: [],
        allowedRoles: ['admin', 'manager'],
        requiresAuthentication: true
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: 'datatracker'
    };
    
    executiveStore.update(state => ({
      ...state,
      dashboards: [mockDashboard],
      activeDashboardId: mockDashboard.id
    }));
  },

  async loadKPIDefinitions(): Promise<void> {
    const kpis = generateMockKPIData();
    
    executiveStore.update(state => ({
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
    executiveStore.update(state => ({
      ...state,
      reports: []
    }));
  },

  // KPI Management
  updateKPIData(kpiId: string): void {
    const state = get(executiveStore);
    const kpi = state.kpiDefinitions.find(k => k.id === kpiId);
    if (!kpi) return;
    
    // Generate mock data points
    const dataPoints: AnalyticsDataPoint[] = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      
      let value: number;
      let status: PerformanceStatus;
      
      // Generate realistic values based on KPI type
      switch (kpiId) {
        case 'kpi-revenue-growth':
          value = -2 + Math.random() * 12; // -2% to +10%
          status = value >= 10 ? 'excellent' : value >= 5 ? 'good' : value >= 0 ? 'acceptable' : 'poor';
          break;
        case 'kpi-fleet-utilization':
          value = 70 + Math.random() * 25; // 70-95%
          status = value >= 95 ? 'excellent' : value >= 85 ? 'good' : value >= 75 ? 'acceptable' : 'poor';
          break;
        case 'kpi-safety-score':
          value = 85 + Math.random() * 13; // 85-98
          status = value >= 98 ? 'excellent' : value >= 95 ? 'good' : value >= 90 ? 'acceptable' : 'poor';
          break;
        default:
          value = Math.random() * 100;
          status = 'good';
      }
      
      const target = kpi.target.value;
      const variance = value - target;
      const variancePercentage = (variance / target) * 100;
      
      return {
        kpiId,
        value,
        target,
        variance,
        variancePercentage,
        status,
        context: {
          period: 'daily',
          aggregationLevel: 'organization',
          filters: {},
          metadata: {}
        },
        timestamp: date
      };
    });
    
    executiveStore.update(state => ({
      ...state,
      kpiData: {
        ...state.kpiData,
        [kpiId]: dataPoints
      }
    }));
  },

  // Real-time Updates
  startRealTimeUpdates(): void {
    const updateInterval = setInterval(() => {
      const state = get(executiveStore);
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
      
      executiveStore.update(currentState => ({
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
    executiveStore.update(state => ({
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
    executiveStore.update(state => ({ ...state, isRefreshing: true }));
    
    try {
      const state = get(executiveStore);
      
      if (state.organizationId) {
        // Refresh all data based on current time range
        const financialMetrics = generateMockFinancialMetrics(state.organizationId);
        const operationalMetrics = generateMockOperationalMetrics(state.organizationId);
        
        executiveStore.update(currentState => ({
          ...currentState,
          financialMetrics: [financialMetrics, ...currentState.financialMetrics.slice(0, 11)],
          operationalMetrics: [operationalMetrics, ...currentState.operationalMetrics.slice(0, 11)],
          isRefreshing: false,
          lastUpdate: new Date()
        }));
      }
      
    } catch (error) {
      executiveStore.update(state => ({
        ...state,
        error: error instanceof Error ? error.message : 'Failed to refresh data',
        isRefreshing: false
      }));
    }
  },

  // Dashboard Actions
  setActiveDashboard(dashboardId: string): void {
    executiveStore.update(state => ({
      ...state,
      activeDashboardId: dashboardId
    }));
  },

  // Utility Actions
  clearError(): void {
    executiveStore.update(state => ({
      ...state,
      error: null
    }));
  },

  reset(): void {
    this.stopRealTimeUpdates();
    executiveStore.set(initialState);
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

export default executiveStore; 