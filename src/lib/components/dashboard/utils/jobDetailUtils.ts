/**
 * Job Detail View Utilities
 * 
 * Utility functions for formatting data, calculating status,
 * and handling business logic in job detail displays.
 */

// ================================
// Type Definitions
// ================================

export interface VarianceStatus {
  label: string;
  color: string;
  icon: string;
}

export interface SafetyThresholds {
  warning: number;
  critical: number;
}

export type SafetyStatus = 'normal' | 'warning' | 'critical';

// ================================
// Variance & Status Functions
// ================================

export function getVarianceStatus(expectedLoss: number, actualLoss?: number): VarianceStatus {
  if (!actualLoss) {
    return { 
      label: 'In Progress', 
      color: 'bg-blue-100 text-blue-700', 
      icon: '⏳' 
    };
  }
  
  const variance = Math.abs(actualLoss - expectedLoss);
  const variancePercent = (variance / expectedLoss) * 100;
  
  if (variancePercent <= 5) {
    return { 
      label: 'Good', 
      color: 'bg-emerald-100 text-emerald-700', 
      icon: '✅' 
    };
  } else if (variancePercent <= 15) {
    return { 
      label: 'Low Variance', 
      color: 'bg-amber-100 text-amber-700', 
      icon: '⚠️' 
    };
  } else {
    return { 
      label: 'High Variance', 
      color: 'bg-red-100 text-red-700', 
      icon: '🚨' 
    };
  }
}

export function getSafetyStatus(value: number, thresholds: SafetyThresholds): SafetyStatus {
  if (value >= thresholds.critical) return 'critical';
  if (value >= thresholds.warning) return 'warning';
  return 'normal';
}

// ================================
// Formatting Functions
// ================================

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function formatNumber(value: number, decimals: number = 1): string {
  return value.toFixed(decimals);
}

export function formatTemperature(value: number): string {
  return `${value.toFixed(1)}°F`;
}

export function formatPressure(value: number): string {
  return `${value.toFixed(1)} PSI`;
}

export function formatVolume(value: number): string {
  return value.toLocaleString();
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

// ================================
// Safety Assessment Functions
// ================================

export function getSafetyStatusClass(status: SafetyStatus): string {
  switch (status) {
    case 'normal':
      return 'text-emerald-600';
    case 'warning':
      return 'text-amber-600';
    case 'critical':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

export function getSafetyStatusText(status: SafetyStatus): string {
  switch (status) {
    case 'normal':
      return '✓ Safe';
    case 'warning':
      return '⚠️ Monitor';
    case 'critical':
      return '🚨 Critical';
    default:
      return '❓ Unknown';
  }
}

export function getTemperatureStatus(temp: number, maxTemp: number): SafetyStatus {
  const warningThreshold = maxTemp * 0.8;
  const criticalThreshold = maxTemp * 0.9;
  
  if (temp >= criticalThreshold) return 'critical';
  if (temp >= warningThreshold) return 'warning';
  return 'normal';
}

// ================================
// Gas Detection Thresholds
// ================================

export const GAS_THRESHOLDS = {
  h2s: { warning: 10, critical: 20 },
  co: { warning: 35, critical: 200 },
  lel: { warning: 10, critical: 25 },
  o2: { warning: 1, critical: 3 } // Deviation from 20.9%
} as const;

// ================================
// Temperature Thresholds
// ================================

export const TEMP_THRESHOLDS = {
  pump: 200,
  inverter: 160,
  motor: 180
} as const; 