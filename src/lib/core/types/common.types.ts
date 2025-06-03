/**
 * DataTracker Platform - Common Type Definitions
 * 
 * Core types used across the entire application.
 * All entities should extend BaseEntity for consistency.
 */

// ================================
// Base Entity Types  
// ================================

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
}

export interface TimestampedEntity {
  timestamp: Date;
}

// ================================
// Location & Geographic Types
// ================================

export interface GeoLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}

export interface Location extends BaseEntity {
  name: string;
  address: string;
  coordinates: GeoLocation;
  type: LocationType;
  operatingHours?: OperatingHours;
  contactInfo?: ContactInfo;
}

export type LocationType = 
  | 'collection point'
  | 'storage_facility' 
  | 'processing facility'
  | 'distribution_center'
  | 'customer_site';

export interface OperatingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string; // HH:MM format
  closeTime?: string; // HH:MM format
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  emergencyContact?: string;
}

// ================================
// User & Authentication Types
// ================================

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  lastLoginAt?: Date;
  profile?: UserProfile;
}

export type UserRole = 
  | 'super_admin'
  | 'admin' 
  | 'manager'
  | 'dispatcher'
  | 'driver'
  | 'viewer';

export type Permission = 
  | 'view_dashboard'
  | 'manage_jobs'
  | 'manage_drivers'
  | 'manage_trucks'
  | 'view_analytics'
  | 'manage_organization'
  | 'manage_users';

export interface UserProfile {
  avatar?: string;
  phone?: string;
  employeeId?: string;
  department?: string;
  startDate?: Date;
}

// ================================
// Organization & Tenant Types
// ================================

export interface Organization extends BaseEntity {
  name: string;
  slug: string;
  industry: string;
  size: OrganizationSize;
  settings: OrganizationSettings;
  subscription: SubscriptionInfo;
  branding: BrandingConfig;
}

export type OrganizationSize = 'small' | 'medium' | 'large' | 'enterprise';

export interface OrganizationSettings {
  timezone: string;
  currency: string;
  units: UnitSystem;
  features: FeatureFlags;
}

export type UnitSystem = 'imperial' | 'metric';

export interface FeatureFlags {
  hasExecutiveDashboard: boolean;
  hasDriverMobile: boolean;
  hasRealTimeMonitoring: boolean;
  hasMaintenanceModule: boolean;
  hasAnalytics: boolean;
  hasAPIAccess: boolean;
}

export interface SubscriptionInfo {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  trialEndsAt?: Date;
  billingCycleStart: Date;
  billingCycleEnd: Date;
}

export type SubscriptionPlan = 'free' | 'starter' | 'professional' | 'enterprise';
export type SubscriptionStatus = 'active' | 'trial' | 'past_due' | 'cancelled' | 'suspended';

export interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  faviconUrl?: string;
  customDomain?: string;
}

// ================================
// API Response Types
// ================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  pagination?: PaginationInfo;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ================================
// System Status Types
// ================================

export interface SystemStatus {
  isOnline: boolean;
  lastHeartbeat: Date;
  health: HealthStatus;
  services: ServiceStatus[];
}

export type HealthStatus = 'healthy' | 'degraded' | 'down' | 'maintenance';

export interface ServiceStatus {
  name: string;
  status: HealthStatus;
  responseTime: number;
  lastChecked: Date;
  errorMessage?: string;
}

// ================================
// Utility Types
// ================================

export type Maybe<T> = T | null | undefined;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// Type guards
export const isNotNull = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export const isDefined = <T>(value: T | undefined): value is T => {
  return value !== undefined;
};

// ================================
// Validation Types
// ================================

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// ================================
// Event Types
// ================================

export interface DomainEvent<T = unknown> {
  id: string;
  type: string;
  timestamp: Date;
  payload: T;
  source: string;
  version: number;
}

export interface WebSocketMessage<T = unknown> {
  type: string;
  payload: T;
  timestamp: Date;
  id: string;
}

// ================================
// Monitoring & SCADA Types
// ================================

export interface MonitoringSystem extends BaseEntity {
  name: string;
  type: MonitoringSystemType;
  status: SystemHealthStatus;
  location: GeoLocation;
  lastHeartbeat: Date;
  configuration: MonitoringConfiguration;
}

export type MonitoringSystemType = 
  | 'truck_scada'
  | 'pump_controller' 
  | 'valve_actuator'
  | 'sensor_array'
  | 'telemetry_gateway';

export type SystemHealthStatus = 
  | 'online'
  | 'offline' 
  | 'degraded'
  | 'maintenance'
  | 'error';

export interface MonitoringConfiguration {
  updateFrequency: number; // milliseconds
  enableAlerts: boolean;
  alertThresholds: AlertThreshold[];
  dataRetention: number; // days
}

export interface AlertThreshold {
  sensorId: string;
  type: ThresholdType;
  value: number;
  severity: AlertSeverity;
}

export type ThresholdType = 'min' | 'max' | 'range' | 'deviation';
export type AlertSeverity = 'info' | 'warning' | 'critical' | 'emergency';

// Valve Management
export interface ValveStatus extends BaseEntity {
  systemId: string;
  valveId: string;
  name: string;
  location: string;
  type: ValveType;
  status: ValvePosition;
  hasSensor: boolean;
  isAirActuated: boolean;
  requiresConfirmation: boolean;
  lastActuated: Date;
  actuationHistory: ValveActuation[];
}

export type ValveType = 
  | 'pressure_relief'
  | 'belly_valve'
  | 'emergency_shutoff'
  | 'vent_valve'
  | 'load_valve'
  | 'isolation_valve';

export type ValvePosition = 'open' | 'closed' | 'partial' | 'unknown' | 'fault';

export interface ValveActuation extends TimestampedEntity {
  userId: string;
  action: ValveAction;
  previousPosition: ValvePosition;
  newPosition: ValvePosition;
  method: ActuationMethod;
  confirmed: boolean;
}

export type ValveAction = 'open' | 'close' | 'emergency_stop' | 'manual_override';
export type ActuationMethod = 'scada' | 'manual' | 'automatic' | 'emergency';

// Sensor Management
export interface SensorReading extends TimestampedEntity {
  systemId: string;
  sensorId: string;
  name: string;
  location: string;
  type: SensorType;
  value: number;
  unit: string;
  quality: DataQuality;
  status: SensorStatus;
  thresholds: SensorThresholds;
  calibrationInfo: CalibrationInfo;
}

export type SensorType = 
  | 'pressure'
  | 'vacuum' 
  | 'temperature'
  | 'flow_rate'
  | 'level'
  | 'ph'
  | 'conductivity'
  | 'vibration';

export type DataQuality = 'good' | 'uncertain' | 'bad' | 'not_connected';
export type SensorStatus = 'normal' | 'warning' | 'critical' | 'maintenance' | 'fault';

export interface SensorThresholds {
  minWarning?: number;
  maxWarning: number;
  minCritical?: number;
  maxCritical: number;
  deadband: number;
}

export interface CalibrationInfo {
  lastCalibrated: Date;
  nextCalibrationDue: Date;
  calibrationOffset: number;
  calibrationFactor: number;
  isCalibrated: boolean;
}

// Real-time Telemetry
export interface TelemetryData extends TimestampedEntity {
  systemId: string;
  truckId?: string;
  sensors: SensorReading[];
  valves: ValveStatus[];
  alerts: SystemAlert[];
  connectionStatus: ConnectionStatus;
  dataQuality: DataQuality;
}

export interface SystemAlert extends TimestampedEntity {
  id: string;
  systemId: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  sourceComponent: string;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
  resolvedAt?: Date;
  escalated: boolean;
}

export type AlertType = 
  | 'sensor_threshold'
  | 'valve_fault'
  | 'communication_lost'
  | 'system_fault'
  | 'calibration_due'
  | 'maintenance_required';

export type ConnectionStatus = 
  | 'connected'
  | 'disconnected' 
  | 'syncing'
  | 'timeout'
  | 'error';

// SCADA Operations
export interface ScadaCommand extends TimestampedEntity {
  id: string;
  systemId: string;
  commandType: CommandType;
  targetComponent: string;
  parameters: Record<string, any>;
  priority: CommandPriority;
  status: CommandStatus;
  issuedBy: string;
  executedAt?: Date;
  response?: CommandResponse;
}

export type CommandType = 
  | 'valve_control'
  | 'sensor_calibration'
  | 'system_reset'
  | 'data_request'
  | 'emergency_stop';

export type CommandPriority = 'low' | 'normal' | 'high' | 'emergency';
export type CommandStatus = 'pending' | 'executing' | 'completed' | 'failed' | 'timeout';

export interface CommandResponse {
  success: boolean;
  message: string;
  data?: Record<string, any>;
  executionTime: number;
}

// Monitoring Dashboard Types
export interface MonitoringDashboard extends BaseEntity {
  name: string;
  layout: DashboardLayout;
  widgets: MonitoringWidget[];
  filters: DashboardFilter[];
  refreshInterval: number;
  isDefault: boolean;
}

export interface DashboardLayout {
  columns: number;
  rows: number;
  responsiveBreakpoints: Record<string, number>;
}

export interface MonitoringWidget {
  id: string;
  type: WidgetType;
  title: string;
  position: WidgetPosition;
  size: WidgetSize;
  configuration: WidgetConfiguration;
  dataSource: string;
}

export type WidgetType = 
  | 'sensor_gauge'
  | 'valve_status'
  | 'trend_chart'
  | 'alert_list'
  | 'system_overview'
  | 'data_table';

export interface WidgetPosition {
  x: number;
  y: number;
}

export interface WidgetSize {
  width: number;
  height: number;
}

export interface WidgetConfiguration {
  updateInterval: number;
  showAlerts: boolean;
  colorThresholds: Record<string, string>;
  displayOptions: Record<string, any>;
}

export interface DashboardFilter {
  field: string;
  operator: FilterOperator;
  value: any;
  enabled: boolean;
}

export type FilterOperator = 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between';

// ================================
// Executive & Analytics Types
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

export type ChartType = 
  | 'line'
  | 'bar'
  | 'pie'
  | 'gauge'
  | 'heatmap'
  | 'scatter'
  | 'area'
  | 'donut';

export type AggregationType = 'sum' | 'average' | 'count' | 'max' | 'min' | 'median';
export type DisplayFormat = 'currency' | 'percentage' | 'decimal' | 'integer' | 'duration';
export type ColorScheme = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'professional';

// KPI Management
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

export type DataType = 'currency' | 'percentage' | 'integer' | 'decimal' | 'duration' | 'count';

export interface MetricFilter {
  field: string;
  operator: FilterOperator;
  value: any;
  isRequired: boolean;
}

export interface KPITarget {
  value: number;
  type: TargetType;
  period: TimePeriod;
  isStretch: boolean;
}

export type TargetType = 'minimum' | 'maximum' | 'exact' | 'range';
export type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type UpdateFrequency = 'real-time' | 'hourly' | 'daily' | 'weekly';

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

// Analytics Data
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

export interface AnalyticsDataSource {
  id: string;
  name: string;
  type: DataSourceType;
  connection: DataConnectionConfig;
  refreshRate: number;
  isActive: boolean;
}

export type DataSourceType = 'database' | 'api' | 'file' | 'real-time' | 'calculated';

export interface DataConnectionConfig {
  host?: string;
  database?: string;
  table?: string;
  query?: string;
  endpoint?: string;
  authentication?: AuthConfig;
}

export interface AuthConfig {
  type: AuthType;
  credentials: Record<string, string>;
}

export type AuthType = 'none' | 'basic' | 'bearer' | 'api-key' | 'oauth';

// Financial Analytics
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

// Operational Analytics
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

// Executive Reports
export interface ExecutiveReport extends BaseEntity {
  title: string;
  description: string;
  type: ReportType;
  period: TimePeriod;
  recipients: ReportRecipient[];
  schedule: ReportSchedule;
  format: ReportFormat;
  sections: ReportSection[];
  isActive: boolean;
  lastGenerated?: Date;
  nextGeneration?: Date;
}

export type ReportType = 
  | 'executive_summary'
  | 'financial_overview'
  | 'operational_kpis'
  | 'safety_report'
  | 'fleet_analysis'
  | 'driver_performance'
  | 'cost_analysis';

export interface ReportRecipient {
  email: string;
  name: string;
  role: UserRole;
  deliveryMethod: DeliveryMethod;
}

export type DeliveryMethod = 'email' | 'dashboard' | 'api' | 'download';

export interface ReportSchedule {
  frequency: ReportFrequency;
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string; // HH:MM format
  timezone: string;
}

export type ReportFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'on-demand';
export type ReportFormat = 'pdf' | 'excel' | 'csv' | 'json' | 'html';

export interface ReportSection {
  id: string;
  title: string;
  type: SectionType;
  content: SectionContent;
  order: number;
  isVisible: boolean;
}

export type SectionType = 
  | 'summary'
  | 'kpi_grid'
  | 'chart'
  | 'table'
  | 'text'
  | 'image'
  | 'metric_comparison';

export interface SectionContent {
  data?: any[];
  chartConfig?: ChartConfiguration;
  textContent?: string;
  imageUrl?: string;
  kpiIds?: string[];
}

export interface ChartConfiguration {
  type: ChartType;
  xAxis: AxisConfiguration;
  yAxis: AxisConfiguration;
  series: SeriesConfiguration[];
  colors?: string[];
  showLegend: boolean;
  title?: string;
}

export interface AxisConfiguration {
  label: string;
  dataKey: string;
  format?: DisplayFormat;
  min?: number;
  max?: number;
}

export interface SeriesConfiguration {
  name: string;
  dataKey: string;
  type?: ChartType;
  color?: string;
  yAxisId?: string;
}

// Time Range Management
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

// Permissions & Sharing
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

// Alerts & Notifications
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

export interface AlertRecipient {
  email: string;
  name: string;
  notificationMethods: NotificationMethod[];
}

export type NotificationMethod = 'email' | 'sms' | 'push' | 'webhook' | 'dashboard';

// Benchmarking & Comparisons
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