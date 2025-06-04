/**
 * Monitoring, SCADA & Telemetry Types
 * 
 * Types related to real-time monitoring, SCADA systems, sensors, valves, 
 * and industrial control systems.
 */

import type { BaseEntity, TimestampedEntity, GeoLocation } from './base.types';

// ================================
// Monitoring Store State
// ================================

export interface MonitoringState {
  // System Management
  systems: MonitoringSystem[];
  selectedSystemId: string | null;
  connectionStatus: ConnectionStatus;
  
  // Real-time Data
  telemetryData: Record<string, TelemetryData>;
  sensorReadings: Record<string, SensorReading[]>;
  valveStatuses: Record<string, ValveStatus[]>;
  
  // Alerts & Notifications
  activeAlerts: SystemAlert[];
  alertHistory: SystemAlert[];
  unacknowledgedCount: number;
  
  // SCADA Operations
  pendingCommands: ScadaCommand[];
  commandHistory: ScadaCommand[];
  
  // Dashboard Configuration
  dashboards: MonitoringDashboard[];
  activeDashboardId: string | null;
  
  // System Status
  isLoading: boolean;
  lastUpdate: Date | null;
  error: string | null;
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

// ================================
// Valve Management
// ================================

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

// ================================
// Sensor Management
// ================================

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

// ================================
// Real-time Telemetry
// ================================

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

// ================================
// SCADA Operations
// ================================

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

// ================================
// Monitoring Dashboard Types
// ================================

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