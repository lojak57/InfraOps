/**
 * Monitoring Mock Data Generation
 * 
 * Functions for generating realistic mock data for monitoring systems,
 * sensor readings, valve statuses, and SCADA telemetry.
 */

import type { 
  MonitoringSystem,
  SensorReading,
  ValveStatus,
  TelemetryData,
  SystemAlert,
  SystemHealthStatus
} from '../types/monitoring.types';

// ================================
// Mock Sensor Data Generation
// ================================

export function generateMockSensorData(): SensorReading[] {
  return [
    {
      systemId: 'PLN-014-SCADA',
      sensorId: 'pressure-001',
      name: 'Tanker On-Load Pressure',
      location: 'Between pump & tanker',
      type: 'pressure',
      value: 18.7 + (Math.random() - 0.5) * 2,
      unit: 'psi',
      quality: 'good',
      status: 'normal',
      thresholds: {
        maxWarning: 25,
        maxCritical: 30,
        deadband: 0.5
      },
      calibrationInfo: {
        lastCalibrated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        nextCalibrationDue: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
        calibrationOffset: 0.1,
        calibrationFactor: 1.0,
        isCalibrated: true
      },
      timestamp: new Date()
    },
    {
      systemId: 'PLN-014-SCADA',
      sensorId: 'vacuum-001',
      name: 'Tanker Off-Load Vacuum',
      location: 'Between pump & tanker',
      type: 'vacuum',
      value: -6.2 + (Math.random() - 0.5) * 1,
      unit: 'psi',
      quality: 'good',
      status: 'normal',
      thresholds: {
        minWarning: -8,
        minCritical: -10,
        maxWarning: -2,
        maxCritical: 0,
        deadband: 0.2
      },
      calibrationInfo: {
        lastCalibrated: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        nextCalibrationDue: new Date(Date.now() + 350 * 24 * 60 * 60 * 1000),
        calibrationOffset: 0.05,
        calibrationFactor: 1.0,
        isCalibrated: true
      },
      timestamp: new Date()
    },
    {
      systemId: 'PLN-014-SCADA',
      sensorId: 'temp-001',
      name: 'Pump Temperature',
      location: 'Pump housing',
      type: 'temperature',
      value: 165 + (Math.random() - 0.5) * 10,
      unit: '°F',
      quality: 'good',
      status: 'warning',
      thresholds: {
        maxWarning: 180,
        maxCritical: 200,
        deadband: 2.0
      },
      calibrationInfo: {
        lastCalibrated: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        nextCalibrationDue: new Date(Date.now() + 320 * 24 * 60 * 60 * 1000),
        calibrationOffset: -1.5,
        calibrationFactor: 1.02,
        isCalibrated: true
      },
      timestamp: new Date()
    }
  ];
}

// ================================
// Mock Valve Data Generation
// ================================

export function generateMockValveData(): ValveStatus[] {
  return [
    {
      id: 'valve-001',
      systemId: 'PLN-014-SCADA',
      valveId: 'pressure-relief-vent',
      name: 'Pressure Relief Vent',
      location: 'Spill Dam',
      type: 'pressure_relief',
      status: 'closed',
      hasSensor: true,
      isAirActuated: false,
      requiresConfirmation: true,
      lastActuated: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actuationHistory: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: 'datatracker'
    },
    {
      id: 'valve-002',
      systemId: 'PLN-014-SCADA',
      valveId: 'belly-valve',
      name: 'Belly Valve',
      location: 'After pump',
      type: 'belly_valve',
      status: 'open',
      hasSensor: false,
      isAirActuated: true,
      requiresConfirmation: true,
      lastActuated: new Date(Date.now() - 30 * 60 * 1000),
      actuationHistory: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: 'datatracker'
    }
  ];
}

// ================================
// Mock Monitoring Systems Generation
// ================================

export function generateMockMonitoringSystems(): MonitoringSystem[] {
  return [
    {
      id: 'PLN-014-SCADA',
      name: 'PLN-014 SCADA System',
      type: 'truck_scada',
      status: 'online',
      location: { lat: 32.7767, lng: -96.7970, accuracy: 10 },
      lastHeartbeat: new Date(),
      configuration: {
        updateFrequency: 1000,
        enableAlerts: true,
        alertThresholds: [],
        dataRetention: 30
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: 'datatracker'
    },
    {
      id: 'PLN-015-SCADA',
      name: 'PLN-015 SCADA System',
      type: 'pump_controller',
      status: 'degraded',
      location: { lat: 32.7800, lng: -96.8000, accuracy: 15 },
      lastHeartbeat: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      configuration: {
        updateFrequency: 2000,
        enableAlerts: true,
        alertThresholds: [],
        dataRetention: 60
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: 'datatracker'
    }
  ];
}

// ================================
// Mock Telemetry Data Generation
// ================================

export function generateMockTelemetryData(systemId: string): TelemetryData {
  const sensorData = generateMockSensorData();
  const valveData = generateMockValveData();
  
  return {
    systemId,
    truckId: systemId.replace('-SCADA', ''),
    sensors: sensorData.map(sensor => ({
      ...sensor,
      systemId
    })),
    valves: valveData.map(valve => ({
      ...valve,
      systemId
    })),
    alerts: [],
    connectionStatus: 'connected',
    dataQuality: 'good',
    timestamp: new Date()
  };
}

// ================================
// Mock Alert Generation
// ================================

export function generateMockAlert(
  systemId: string, 
  sensor: SensorReading
): SystemAlert {
  return {
    id: `alert-${Date.now()}-${sensor.sensorId}`,
    systemId: sensor.systemId,
    type: 'sensor_threshold',
    severity: sensor.status === 'critical' ? 'critical' : 'warning',
    title: `${sensor.name} ${sensor.status.toUpperCase()}`,
    message: `Sensor reading: ${sensor.value}${sensor.unit}`,
    sourceComponent: sensor.sensorId,
    escalated: false,
    timestamp: new Date()
  };
} 