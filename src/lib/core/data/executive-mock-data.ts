/**
 * Executive Mock Data Generation
 * 
 * Functions for generating realistic mock data for executive dashboards,
 * KPI metrics, financial data, and operational analytics.
 */

import type { 
  ExecutiveDashboard, 
  KPIDefinition, 
  AnalyticsDataPoint,
  FinancialMetrics, 
  OperationalMetrics,
  PerformanceStatus,
  TimeRange 
} from '../types/executive.types';

// ================================
// Utility Functions
// ================================

export const getDefaultTimeRange = (): TimeRange => ({
  start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
  end: new Date(),
  preset: 'last_30_days',
  isCustom: false
});

// ================================
// Financial Metrics Mock Data
// ================================

export function generateMockFinancialMetrics(organizationId: string): FinancialMetrics {
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

// ================================
// Operational Metrics Mock Data
// ================================

export function generateMockOperationalMetrics(organizationId: string): OperationalMetrics {
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

// ================================
// KPI Definitions Mock Data
// ================================

export function generateMockKPIData(): KPIDefinition[] {
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
// Mock Dashboard Data
// ================================

export function generateMockDashboard(): ExecutiveDashboard {
  return {
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
}

// ================================
// KPI Data Points Generation
// ================================

export function generateKPIDataPoints(kpiId: string, kpi: KPIDefinition): AnalyticsDataPoint[] {
  return Array.from({ length: 30 }, (_, i) => {
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
} 