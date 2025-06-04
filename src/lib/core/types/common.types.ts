/**
 * DataTracker Platform - Common Type Definitions
 * 
 * This file has been refactored into modular components for better maintainability:
 * - Base & Utility Types: ./base.types.ts
 * - User & Organization Types: ./user.types.ts
 * - API & Validation Types: ./api.types.ts
 * - Monitoring & SCADA Types: ./monitoring.types.ts
 * - Executive & Analytics Types: ./executive.types.ts
 * - Reporting Types: ./reporting.types.ts
 * - Driver Types: ./driver.types.ts
 */

// ================================
// Re-exports for Backward Compatibility
// ================================

// Base & Utility Types
export type {
  BaseEntity,
  TimestampedEntity,
  GeoLocation,
  Location,
  LocationType,
  OperatingHours,
  DaySchedule,
  ContactInfo,
  Maybe,
  Optional,
  Required,
  SystemStatus,
  HealthStatus,
  ServiceStatus,
  DomainEvent,
  WebSocketMessage
} from './base.types';

export {
  isNotNull,
  isDefined
} from './base.types';

// User & Organization Types
export type {
  User,
  UserRole,
  Permission,
  UserProfile,
  Organization,
  OrganizationSize,
  OrganizationSettings,
  UnitSystem,
  FeatureFlags,
  SubscriptionInfo,
  SubscriptionPlan,
  SubscriptionStatus,
  BrandingConfig
} from './user.types';

// API & Validation Types
export type {
  ApiResponse,
  ApiError,
  PaginationInfo,
  ValidationResult,
  ValidationError,
  AnalyticsDataSource,
  DataSourceType,
  DataConnectionConfig,
  AuthConfig,
  AuthType,
  DashboardFilter,
  FilterOperator,
  MetricFilter,
  ComparisonOperator,
  DataType,
  DisplayFormat,
  AggregationType
} from './api.types';

// Monitoring & SCADA Types
export type {
  MonitoringState,
  MonitoringSystem,
  MonitoringSystemType,
  SystemHealthStatus,
  MonitoringConfiguration,
  AlertThreshold,
  ThresholdType,
  AlertSeverity,
  ValveStatus,
  ValveType,
  ValvePosition,
  ValveActuation,
  ValveAction,
  ActuationMethod,
  SensorReading,
  SensorType,
  DataQuality,
  SensorStatus,
  SensorThresholds,
  CalibrationInfo,
  TelemetryData,
  SystemAlert,
  AlertType,
  ConnectionStatus,
  ScadaCommand,
  CommandType,
  CommandPriority,
  CommandStatus,
  CommandResponse,
  MonitoringDashboard,
  DashboardLayout,
  MonitoringWidget,
  WidgetType,
  WidgetPosition,
  WidgetSize,
  WidgetConfiguration
} from './monitoring.types';

// Executive & Analytics Types
export type {
  ExecutiveState,
  TimePeriod,
  UpdateFrequency,
  TimeRange,
  TimeRangePreset,
  ExecutiveDashboard,
  ExecutiveWidget,
  ExecutiveWidgetType,
  ExecutiveWidgetConfig,
  ChartType,
  ColorScheme,
  KPIDefinition,
  KPICategory,
  MetricDefinition,
  KPITarget,
  TargetType,
  KPIThresholds,
  CalculationRule,
  AggregationLevel,
  AnalyticsDataPoint,
  PerformanceStatus,
  AnalyticsContext,
  FinancialMetrics,
  OperationalMetrics,
  KPIAlert,
  AlertCondition,
  AlertRecipient,
  NotificationMethod,
  BenchmarkData,
  ShareSettings,
  WidgetPermission
} from './executive.types';

// Reporting Types
export type {
  ExecutiveReport,
  ReportType,
  ReportRecipient,
  DeliveryMethod,
  ReportSchedule,
  ReportFrequency,
  ReportFormat,
  ReportSection,
  SectionType,
  SectionContent,
  ChartConfiguration,
  AxisConfiguration,
  SeriesConfiguration
} from './reporting.types';

// Driver Types
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
} from './driver.types'; 