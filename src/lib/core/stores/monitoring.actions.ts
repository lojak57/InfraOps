/**
 * Monitoring Actions & Business Logic
 * 
 * Functions for managing monitoring systems, real-time telemetry updates,
 * alert management, SCADA operations, and valve control.
 */

import { get } from 'svelte/store';
import { monitoringStore, getInitialState } from './monitoring-core.store';
import { 
  generateMockSensorData,
  generateMockValveData,
  generateMockMonitoringSystems,
  generateMockTelemetryData,
  generateMockAlert
} from '../data/monitoring-mock-data';
import type { 
  MonitoringState,
  SystemHealthStatus,
  TelemetryData,
  SystemAlert,
  ScadaCommand,
  CommandStatus,
  ValvePosition,
  ConnectionStatus
} from '../types/monitoring.types';

// ================================
// Monitoring Actions
// ================================

export const monitoringActions = {
  // System Management
  async loadSystems(): Promise<void> {
    monitoringStore.update((state: MonitoringState) => ({ 
      ...state, 
      isLoading: true, 
      error: null 
    }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSystems = generateMockMonitoringSystems();
      
      monitoringStore.update((state: MonitoringState) => ({
        ...state,
        systems: mockSystems,
        selectedSystemId: mockSystems[0]?.id || null,
        isLoading: false,
        lastUpdate: new Date()
      }));
      
    } catch (error) {
      monitoringStore.update((state: MonitoringState) => ({
        ...state,
        error: error instanceof Error ? error.message : 'Failed to load systems',
        isLoading: false
      }));
    }
  },

  selectSystem(systemId: string): void {
    monitoringStore.update((state: MonitoringState) => ({
      ...state,
      selectedSystemId: systemId
    }));
  },

  updateSystemStatus(systemId: string, status: SystemHealthStatus): void {
    monitoringStore.update((state: MonitoringState) => ({
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
    monitoringStore.update((state: MonitoringState) => ({
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
      const state: MonitoringState = get(monitoringStore);
      if (state.selectedSystemId) {
        const telemetryData = generateMockTelemetryData(state.selectedSystemId);
        
        this.updateTelemetryData(state.selectedSystemId, telemetryData);
        
        // Check for new alerts
        telemetryData.sensors.forEach(sensor => {
          if (sensor.status === 'critical' || sensor.status === 'warning') {
            this.addAlert(generateMockAlert(state.selectedSystemId!, sensor));
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
    monitoringStore.update((state: MonitoringState) => {
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
    monitoringStore.update((state: MonitoringState) => ({
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
    monitoringStore.update((state: MonitoringState) => {
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
    monitoringStore.update((state: MonitoringState) => {
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
    
    monitoringStore.update((state: MonitoringState) => ({
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
      
      monitoringStore.update((state: MonitoringState) => ({
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
      
      monitoringStore.update((state: MonitoringState) => ({
        ...state,
        pendingCommands: state.pendingCommands.filter(c => c.id !== fullCommand.id),
        commandHistory: [...state.commandHistory, failedCommand]
      }));
      
      return false;
    }
  },

  // Valve Control
  async toggleValve(valveId: string, targetPosition: ValvePosition): Promise<boolean> {
    const state: MonitoringState = get(monitoringStore);
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
    monitoringStore.update((state: MonitoringState) => ({
      ...state,
      activeDashboardId: dashboardId
    }));
  },

  // Utility Actions
  setConnectionStatus(status: ConnectionStatus): void {
    monitoringStore.update((state: MonitoringState) => ({
      ...state,
      connectionStatus: status
    }));
  },

  clearError(): void {
    monitoringStore.update((state: MonitoringState) => ({
      ...state,
      error: null
    }));
  },

  reset(): void {
    this.stopRealTimeUpdates();
    monitoringStore.set(getInitialState());
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