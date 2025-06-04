/**
 * Executive Dashboard & Analytics Types
 * 
 * Types related to executive dashboards, KPIs, business intelligence,
 * and high-level analytics for decision makers.
 */

import type { BaseEntity, TimestampedEntity } from './base.types';
import type { UserRole } from './user.types';
import type { 
  DataType, 
  DisplayFormat, 
  AggregationType, 
  FilterOperator, 
  MetricFilter,
  AnalyticsDataSource 
} from './api.types';

// ================================
// Executive Store State
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
  reports: any[]; // Use any to avoid circular dependency with reporting.types
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
// Time & Period Types
// ================================

export type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type UpdateFrequency = 'real-time' | 'hourly' | 'daily' | 'weekly';

export interface TimeRange {
  start: Date;
  end: Date;
  preset?: TimeRangePreset;
  isCustom: boolean;
}

export type TimeRangePreset = 
  | 'today'
  | 'yesterday'
  | 'last_7_days'
  | 'last_30_days'
  | 'this_month'
  | 'last_month'
  | 'this_quarter'
  | 'last_quarter'
  | 'this_year'
  | 'last_year'
  | 'custom';

// ================================
// Executive Dashboard Types
// ================================

export interface ExecutiveDashboard extends BaseEntity {
  name: string;
  description: string;
  userId: string;
  layout: DashboardLayout;
  widgets: ExecutiveWidget[];
  kpis: KPIDefinition[];
  timeRange: TimeRange;
  refreshInterval: number;
  isDefault: boolean;
  shareSettings: ShareSettings;
}

export interface DashboardLayout {
  columns: number;
  rows: number;
  responsiveBreakpoints: Record<string, number>;
}

export interface ExecutiveWidget {
  id: string;
  type: ExecutiveWidgetType;
  title: string;
  position: WidgetPosition;
  size: WidgetSize;
  configuration: ExecutiveWidgetConfig;
  dataSource: AnalyticsDataSource;
  chartType?: ChartType;
  permissions: WidgetPermission[];
}

export type ExecutiveWidgetType = 
  | 'kpi_metric'
  | 'revenue_chart'
  | 'cost_analysis'
  | 'efficiency_gauge'
  | 'fleet_utilization'
  | 'driver_performance'
  | 'financial_summary'
  | 'trend_analysis'
  | 'geographic_heatmap'
  | 'alert_summary';

export interface ExecutiveWidgetConfig {
  updateInterval: number;
  showTargets: boolean;
  showTrends: boolean;
  comparisonPeriod?: TimePeriod;
  aggregationType: AggregationType;
  displayFormat: DisplayFormat;
  colorScheme: ColorScheme;
  drillDownEnabled: boolean;
}

export interface WidgetPosition {
  x: number;
  y: number;
}

export interface WidgetSize {
  width: number;
  height: number;
}

export type ChartType = 
  | 'line'
  | 'bar'
  | 'pie'
  | 'gauge'
  | 'heatmap'
  | 'scatter'
  | 'area'
  | 'donut';

export type ColorScheme = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'professional';

// ================================
// KPI & Metrics Types
// ================================

export interface KPIDefinition extends BaseEntity {
  name: string;
  description: string;
  category: KPICategory;
  metric: MetricDefinition;
  target: KPITarget;
  thresholds: KPIThresholds;
  calculation: CalculationRule;
  frequency: UpdateFrequency;
  isActive: boolean;
  owner: string;
}

export type KPICategory = 
  | 'financial'
  | 'operational'
  | 'safety'
  | 'efficiency'
  | 'customer'
  | 'driver'
  | 'fleet'
  | 'environmental';

export interface MetricDefinition {
  name: string;
  unit: string;
  dataType: DataType;
  sourceTable: string;
  sourceField: string;
  filters?: MetricFilter[];
}

export interface KPITarget {
  value: number;
  type: TargetType;
  period: TimePeriod;
  isStretch: boolean;
}

export type TargetType = 'minimum' | 'maximum' | 'exact' | 'range';

export interface KPIThresholds {
  excellent: number;
  good: number;
  acceptable: number;
  poor: number;
}

export interface CalculationRule {
  formula: string;
  dependencies: string[];
  aggregationLevel: AggregationLevel;
}

export type AggregationLevel = 'organization' | 'region' | 'fleet' | 'driver' | 'job';

// ================================
// Analytics Data Types
// ================================

export interface AnalyticsDataPoint extends TimestampedEntity {
  kpiId: string;
  value: number;
  target?: number;
  variance: number;
  variancePercentage: number;
  status: PerformanceStatus;
  context: AnalyticsContext;
}

export type PerformanceStatus = 'excellent' | 'good' | 'acceptable' | 'poor' | 'critical';

export interface AnalyticsContext {
  period: TimePeriod;
  aggregationLevel: AggregationLevel;
  filters: Record<string, any>;
  metadata: Record<string, any>;
}

// ================================
// Financial Metrics
// ================================

export interface FinancialMetrics extends TimestampedEntity {
  organizationId: string;
  period: TimePeriod;
  
  // Revenue Metrics
  totalRevenue: number;
  revenuePerJob: number;
  revenuePerMile: number;
  revenueGrowth: number;
  
  // Cost Metrics  
  totalCosts: number;
  fuelCosts: number;
  driverCosts: number;
  maintenanceCosts: number;
  operationalCosts: number;
  costPerMile: number;
  costPerJob: number;
  
  // Profitability
  grossProfit: number;
  grossMargin: number;
  netProfit: number;
  netMargin: number;
  ebitda: number;
  
  // Efficiency
  utilizationRate: number;
  emptyMilePercentage: number;
  costEfficiencyIndex: number;
}

// ================================
// Operational Metrics
// ================================

export interface OperationalMetrics extends TimestampedEntity {
  organizationId: string;
  period: TimePeriod;
  
  // Fleet Performance
  totalJobs: number;
  completedJobs: number;
  completionRate: number;
  averageJobTime: number;
  onTimeDeliveryRate: number;
  
  // Driver Performance
  totalDrivers: number;
  activeDrivers: number;
  driverUtilization: number;
  averageHoursPerDriver: number;
  driverSatisfactionScore: number;
  
  // Fleet Utilization
  totalTrucks: number;
  activeTrucks: number;
  truckUtilization: number;
  averageMilesPerTruck: number;
  maintenanceDowntime: number;
  
  // Safety Metrics
  incidentCount: number;
  incidentRate: number;
  safetyScore: number;
  complianceScore: number;
  
  // Efficiency Metrics
  fuelEfficiency: number;
  routeOptimizationScore: number;
  loadFactorAverage: number;
}

// ================================
// Alerting & Notifications
// ================================

export interface KPIAlert extends BaseEntity {
  kpiId: string;
  name: string;
  condition: AlertCondition;
  threshold: number;
  severity: AlertSeverity;
  recipients: AlertRecipient[];
  isActive: boolean;
  lastTriggered?: Date;
  triggerCount: number;
}

export interface AlertCondition {
  operator: ComparisonOperator;
  value: number;
  duration?: number; // minutes
  consecutiveFailures?: number;
}

export type ComparisonOperator = 'greater_than' | 'less_than' | 'equals' | 'not_equals' | 'between';
export type AlertSeverity = 'info' | 'warning' | 'critical' | 'emergency';

export interface AlertRecipient {
  email: string;
  name: string;
  notificationMethods: NotificationMethod[];
}

export type NotificationMethod = 'email' | 'sms' | 'push' | 'webhook' | 'dashboard';

// ================================
// Benchmarking & Comparison
// ================================

export interface BenchmarkData extends TimestampedEntity {
  kpiId: string;
  organizationValue: number;
  industryAverage: number;
  topQuartile: number;
  benchmark: number;
  percentile: number;
  ranking: number;
  totalParticipants: number;
}

// ================================
// Sharing & Permissions
// ================================

export interface ShareSettings {
  isPublic: boolean;
  allowedUsers: string[];
  allowedRoles: UserRole[];
  expiresAt?: Date;
  requiresAuthentication: boolean;
}

export interface WidgetPermission {
  userId: string;
  role: UserRole;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
} 