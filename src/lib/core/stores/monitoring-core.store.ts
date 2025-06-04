/**
 * Monitoring Core Store
 * 
 * Core store for monitoring system state management with derived stores.
 * Types, actions, and mock data have been modularized for better maintainability.
 */

import { writable, derived, type Writable } from 'svelte/store';
import type { MonitoringState } from '../types/monitoring.types';

// ================================
// Initial State
// ================================

export const getInitialState = (): MonitoringState => ({
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
});

// ================================
// Core Store
// ================================

export const monitoringStore: Writable<MonitoringState> = writable(getInitialState());

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