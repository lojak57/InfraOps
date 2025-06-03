/**
 * DataTracker Platform - Monitoring Store
 * 
 * Professional monitoring and SCADA management system for real-time
 * telemetry, valve control, sensor readings, and system alerts.
 * 
 * Features:
 * - Real-time sensor data management
 * - Valve status and control operations
 * - System health monitoring
 * - Alert management and escalation
 * - SCADA command execution
 * - Dashboard configuration
 */

import { writable, derived, get } from 'svelte/store';
import type {
  MonitoringSystem,
  TelemetryData,
  SensorReading,
  ValveStatus,
  SystemAlert,
  ScadaCommand,
  MonitoringDashboard,
  SystemHealthStatus,
  ConnectionStatus,
  AlertSeverity,
  CommandStatus,
  ValvePosition
} from '../types/common.types';

// ================================
// Store State Interfaces
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
// Initial State
// ================================

const initialState: MonitoringState = {
  systems: [],
  selectedSystemId: null,
  connectionStatus: 'disconnected',
  telemetryData: {},
  sensorReadings: {},
  valveStatuses: {},
  activeAlerts: [],
  alertHistory: [],
  unacknowledgedCount: 0,
  pendingCommands: [],
  commandHistory: [],
  dashboards: [],
  activeDashboardId: null,
  isLoading: false,
  lastUpdate: null,
  error: null
};

// ================================
// Core Store
// ================================

export const monitoringStore = writable<MonitoringState>(initialState);

// ================================
// Derived Stores
// ================================

export const selectedSystem = derived(
  monitoringStore,
  ($state) => $state.systems.find(s => s.id === $state.selectedSystemId)
);

export const currentTelemetryData = derived(
  [monitoringStore, selectedSystem],
  ([$state, $system]) => $system ? $state.telemetryData[$system.id] : null
);

export const currentSensorReadings = derived(
  [monitoringStore, selectedSystem],
  ([$state, $system]) => $system ? $state.sensorReadings[$system.id] || [] : []
);

export const currentValveStatuses = derived(
  [monitoringStore, selectedSystem],
  ([$state, $system]) => $system ? $state.valveStatuses[$system.id] || [] : []
);

export const criticalAlerts = derived(
  monitoringStore,
  ($state) => $state.activeAlerts.filter(alert => 
    alert.severity === 'critical' || alert.severity === 'emergency'
  )
);

export const systemsOverview = derived(
  monitoringStore,
  ($state) => ({
    total: $state.systems.length,
    online: $state.systems.filter(s => s.status === 'online').length,
    offline: $state.systems.filter(s => s.status === 'offline').length,
    degraded: $state.systems.filter(s => s.status === 'degraded').length,
    maintenance: $state.systems.filter(s => s.status === 'maintenance').length
  })
);

export const activeDashboard = derived(
  monitoringStore,
  ($state) => $state.dashboards.find(d => d.id === $state.activeDashboardId)
);

// ================================
// Mock Data Generation
// ================================

function generateMockSensorData(): SensorReading[] {
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

function generateMockValveData(): ValveStatus[] {
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
// Store Actions
// ================================

export const monitoringActions = {
  // System Management
  async loadSystems(): Promise<void> {
    monitoringStore.update(state => ({ ...state, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSystems: MonitoringSystem[] = [
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
        }
      ];
      
      monitoringStore.update(state => ({
        ...state,
        systems: mockSystems,
        selectedSystemId: mockSystems[0]?.id || null,
        isLoading: false,
        lastUpdate: new Date()
      }));
      
    } catch (error) {
      monitoringStore.update(state => ({
        ...state,
        error: error instanceof Error ? error.message : 'Failed to load systems',
        isLoading: false
      }));
    }
  },

  selectSystem(systemId: string): void {
    monitoringStore.update(state => ({
      ...state,
      selectedSystemId: systemId
    }));
  },

  updateSystemStatus(systemId: string, status: SystemHealthStatus): void {
    monitoringStore.update(state => ({
      ...state,
      systems: state.systems.map(system =>
        system.id === systemId
          ? { ...system, status, lastHeartbeat: new Date() }
          : system
      )
    }));
  },

  // Real-time Data Management
  updateTelemetryData(systemId: string, data: TelemetryData): void {
    monitoringStore.update(state => ({
      ...state,
      telemetryData: {
        ...state.telemetryData,
        [systemId]: data
      },
      sensorReadings: {
        ...state.sensorReadings,
        [systemId]: data.sensors
      },
      valveStatuses: {
        ...state.valveStatuses,
        [systemId]: data.valves
      },
      lastUpdate: new Date()
    }));
  },

  startRealTimeUpdates(): void {
    const updateInterval = setInterval(() => {
      const state = get(monitoringStore);
      if (state.selectedSystemId) {
        const sensorData = generateMockSensorData();
        const valveData = generateMockValveData();
        
        const telemetryData: TelemetryData = {
          systemId: state.selectedSystemId,
          truckId: 'PLN-014',
          sensors: sensorData,
          valves: valveData,
          alerts: [],
          connectionStatus: 'connected',
          dataQuality: 'good',
          timestamp: new Date()
        };
        
        this.updateTelemetryData(state.selectedSystemId, telemetryData);
        
        // Check for new alerts
        sensorData.forEach(sensor => {
          if (sensor.status === 'critical' || sensor.status === 'warning') {
            this.addAlert({
              id: `alert-${Date.now()}-${sensor.sensorId}`,
              systemId: sensor.systemId,
              type: 'sensor_threshold',
              severity: sensor.status === 'critical' ? 'critical' : 'warning',
              title: `${sensor.name} ${sensor.status.toUpperCase()}`,
              message: `Sensor reading: ${sensor.value}${sensor.unit}`,
              sourceComponent: sensor.sensorId,
              escalated: false,
              timestamp: new Date()
            });
          }
        });
      }
    }, 2000);

    // Store the interval ID for cleanup
    if (typeof window !== 'undefined') {
      (window as any).monitoringUpdateInterval = updateInterval;
    }
  },

  stopRealTimeUpdates(): void {
    if (typeof window !== 'undefined' && (window as any).monitoringUpdateInterval) {
      clearInterval((window as any).monitoringUpdateInterval);
      delete (window as any).monitoringUpdateInterval;
    }
  },

  // Alert Management
  addAlert(alert: SystemAlert): void {
    monitoringStore.update(state => {
      const existingAlert = state.activeAlerts.find(a => 
        a.sourceComponent === alert.sourceComponent && a.type === alert.type
      );
      
      if (existingAlert) {
        return state; // Don't add duplicate alerts
      }
      
      return {
        ...state,
        activeAlerts: [...state.activeAlerts, alert],
        unacknowledgedCount: state.unacknowledgedCount + 1
      };
    });
  },

  acknowledgeAlert(alertId: string, userId: string): void {
    monitoringStore.update(state => ({
      ...state,
      activeAlerts: state.activeAlerts.map(alert =>
        alert.id === alertId
          ? { ...alert, acknowledgedAt: new Date(), acknowledgedBy: userId }
          : alert
      ),
      unacknowledgedCount: Math.max(0, state.unacknowledgedCount - 1)
    }));
  },

  resolveAlert(alertId: string): void {
    monitoringStore.update(state => {
      const alert = state.activeAlerts.find(a => a.id === alertId);
      if (!alert) return state;
      
      const resolvedAlert = { ...alert, resolvedAt: new Date() };
      
      return {
        ...state,
        activeAlerts: state.activeAlerts.filter(a => a.id !== alertId),
        alertHistory: [...state.alertHistory, resolvedAlert]
      };
    });
  },

  clearAllAlerts(): void {
    monitoringStore.update(state => {
      const resolvedAlerts = state.activeAlerts.map(alert => ({
        ...alert,
        resolvedAt: new Date(),
        acknowledgedAt: alert.acknowledgedAt || new Date(),
        acknowledgedBy: alert.acknowledgedBy || 'system'
      }));
      
      return {
        ...state,
        activeAlerts: [],
        alertHistory: [...state.alertHistory, ...resolvedAlerts],
        unacknowledgedCount: 0
      };
    });
  },

  // SCADA Operations
  async executeCommand(command: Omit<ScadaCommand, 'id' | 'timestamp' | 'status'>): Promise<boolean> {
    const fullCommand: ScadaCommand = {
      ...command,
      id: `cmd-${Date.now()}`,
      status: 'pending',
      timestamp: new Date()
    };
    
    monitoringStore.update(state => ({
      ...state,
      pendingCommands: [...state.pendingCommands, fullCommand]
    }));
    
    try {
      // Simulate command execution
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const success = Math.random() > 0.1; // 90% success rate
      const response = {
        success,
        message: success ? 'Command executed successfully' : 'Command failed',
        executionTime: 1500
      };
      
      const completedCommand = {
        ...fullCommand,
        status: success ? 'completed' as CommandStatus : 'failed' as CommandStatus,
        executedAt: new Date(),
        response
      };
      
      monitoringStore.update(state => ({
        ...state,
        pendingCommands: state.pendingCommands.filter(c => c.id !== fullCommand.id),
        commandHistory: [...state.commandHistory, completedCommand]
      }));
      
      return success;
      
    } catch (error) {
      const failedCommand = {
        ...fullCommand,
        status: 'failed' as CommandStatus,
        response: {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error',
          executionTime: 0
        }
      };
      
      monitoringStore.update(state => ({
        ...state,
        pendingCommands: state.pendingCommands.filter(c => c.id !== fullCommand.id),
        commandHistory: [...state.commandHistory, failedCommand]
      }));
      
      return false;
    }
  },

  // Valve Control
  async toggleValve(valveId: string, targetPosition: ValvePosition): Promise<boolean> {
    const state = get(monitoringStore);
    if (!state.selectedSystemId) return false;
    
    return await this.executeCommand({
      systemId: state.selectedSystemId,
      commandType: 'valve_control',
      targetComponent: valveId,
      parameters: { position: targetPosition },
      priority: 'normal',
      issuedBy: 'operator' // In real app, get from auth store
    });
  },

  // Dashboard Management
  setActiveDashboard(dashboardId: string): void {
    monitoringStore.update(state => ({
      ...state,
      activeDashboardId: dashboardId
    }));
  },

  // Utility Actions
  setConnectionStatus(status: ConnectionStatus): void {
    monitoringStore.update(state => ({
      ...state,
      connectionStatus: status
    }));
  },

  clearError(): void {
    monitoringStore.update(state => ({
      ...state,
      error: null
    }));
  },

  reset(): void {
    monitoringStore.set(initialState);
  }
};

// ================================
// Auto-initialization
// ================================

if (typeof window !== 'undefined') {
  // Auto-load systems when store is created
  monitoringActions.loadSystems();
  
  // Start real-time updates
  monitoringActions.startRealTimeUpdates();
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    monitoringActions.stopRealTimeUpdates();
  });
}

export default monitoringStore; 