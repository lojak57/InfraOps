// Smart Calibration Utilities - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 2 - High Priority Components

import type { FleetStats, StatusDistribution, CalibrationActivity, CalibrationAlert } from '../types/calibration.types.js';

// Calculate status distribution percentages
export function calculateStatusDistribution(fleetStats: FleetStats): StatusDistribution {
	const total = fleetStats.total || 1; // Prevent division by zero
	return {
		good: (fleetStats.good / total) * 100,
		warning: (fleetStats.warning / total) * 100,
		critical: (fleetStats.critical / total) * 100
	};
}

// Get status color for calibration status
export function getCalibrationStatusColor(status: string): string {
	switch (status) {
		case 'good': return '#22c55e';      // green
		case 'warning': return '#f59e0b';   // amber
		case 'critical': return '#ef4444'; // red
		default: return '#6b7280';         // gray
	}
}

// Get status icon for calibration status
export function getCalibrationStatusIcon(status: string): string {
	switch (status) {
		case 'good': return '✅';
		case 'warning': return '⚠️';
		case 'critical': return '🔴';
		default: return '❓';
	}
}

// Get status description text
export function getStatusDescription(status: string): string {
	switch (status) {
		case 'good': return 'Within ±0.1% tolerance range';
		case 'warning': return '±0.25% - ±0.5% range';
		case 'critical': return 'Greater than ±0.5% outlier';
		default: return 'Unknown status';
	}
}

// Generate demo calibration activities
export function generateDemoActivities(): CalibrationActivity[] {
	return [
		{
			id: 'act-001',
			type: 'calibration',
			truckId: 'T-156',
			description: 'Successful calibration completed',
			timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
			status: 'completed',
			impact: 'Deviation reduced from 0.45% to 0.08%'
		},
		{
			id: 'act-002',
			type: 'skip',
			truckId: 'T-203',
			description: 'Calibration skipped - within tolerance',
			timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
			status: 'completed',
			impact: 'Saved 45 minutes of downtime'
		},
		{
			id: 'act-003',
			type: 'alert',
			truckId: 'T-089',
			description: 'Critical deviation detected',
			timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
			status: 'scheduled',
			impact: 'Calibration scheduled for next maintenance window'
		},
		{
			id: 'act-004',
			type: 'maintenance',
			truckId: 'T-234',
			description: 'Preventive calibration during maintenance',
			timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
			status: 'completed',
			impact: 'Maintained optimal accuracy'
		}
	];
}

// Generate demo calibration alerts
export function generateDemoAlerts(): CalibrationAlert[] {
	return [
		{
			id: 'alert-001',
			truckId: 'T-089',
			severity: 'critical',
			title: 'Critical Deviation Detected',
			description: 'Truck T-089 showing 0.67% deviation from baseline. Immediate calibration recommended.',
			timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
			acknowledged: false,
			action: 'Schedule immediate calibration'
		},
		{
			id: 'alert-002',
			truckId: 'T-401',
			severity: 'warning',
			title: 'Calibration Due Soon',
			description: 'Truck T-401 calibration is due within 48 hours based on usage patterns.',
			timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
			acknowledged: true,
			action: 'Schedule within maintenance window'
		},
		{
			id: 'alert-003',
			truckId: 'T-156',
			severity: 'info',
			title: 'Calibration Optimization',
			description: 'Historical data suggests truck T-156 may benefit from extended calibration intervals.',
			timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
			acknowledged: false,
			action: 'Review calibration schedule'
		}
	];
}

// Format relative time for activities
export function formatRelativeTime(date: Date): string {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffHours / 24);

	if (diffDays > 0) {
		return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
	} else if (diffHours > 0) {
		return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
	} else {
		const diffMinutes = Math.floor(diffMs / (1000 * 60));
		return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
	}
}

// Get activity type display info
export function getActivityTypeInfo(type: string): { icon: string; color: string } {
	switch (type) {
		case 'calibration':
			return { icon: '✅', color: '#22c55e' };
		case 'skip':
			return { icon: '⏭️', color: '#3b82f6' };
		case 'alert':
			return { icon: '🚨', color: '#ef4444' };
		case 'maintenance':
			return { icon: '🔧', color: '#f59e0b' };
		default:
			return { icon: '❓', color: '#6b7280' };
	}
}

// Get alert severity info
export function getAlertSeverityInfo(severity: string): { color: string; bgColor: string } {
	switch (severity) {
		case 'critical':
			return { color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)' };
		case 'warning':
			return { color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' };
		case 'info':
			return { color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' };
		default:
			return { color: '#6b7280', bgColor: 'rgba(107, 114, 128, 0.1)' };
	}
}

// Calculate confidence score (demo calculation)
export function calculateConfidenceScore(fleetStats: FleetStats): number {
	const totalTrucks = fleetStats.total || 1;
	const healthyRatio = fleetStats.good / totalTrucks;
	const warningPenalty = (fleetStats.warning / totalTrucks) * 0.7;
	const criticalPenalty = (fleetStats.critical / totalTrucks) * 0.3;
	
	return Math.max(0.6, Math.min(0.98, healthyRatio - warningPenalty - criticalPenalty));
}

// Format confidence score as percentage
export function formatConfidenceScore(score: number): string {
	return `${Math.round(score * 100)}%`;
}

// Check if truck needs immediate attention
export function needsImmediateAttention(alerts: CalibrationAlert[]): boolean {
	return alerts.some(alert => 
		alert.severity === 'critical' && !alert.acknowledged
	);
}

// Get next action recommendation
export function getNextActionRecommendation(fleetStats: FleetStats): string {
	if (fleetStats.critical > 0) {
		return `Address ${fleetStats.critical} critical truck${fleetStats.critical > 1 ? 's' : ''}`;
	}
	if (fleetStats.warning > 3) {
		return `Review ${fleetStats.warning} trucks needing calibration`;
	}
	return 'Fleet operating within optimal parameters';
} 