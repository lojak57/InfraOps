// Regional Dashboard Utilities - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 1 - Critical Components

import type { PerformanceThresholds } from '../types/regional.types.js';
import type { RegionalData } from '../types/regional.types';
import { PERFORMANCE_THRESHOLDS } from '../types/regional.types';

// Status color mapping - using only green/red for performance indicators
export function getStatusColor(status: string): string {
	switch (status) {
		case 'excellent': return 'bg-green-600'; // Green for excellent
		case 'good': return 'bg-slate-600'; // Neutral for good
		case 'attention': return 'bg-red-600'; // Red for attention
		default: return 'bg-slate-500';
	}
}

// Trend color mapping - only green/red for performance indicators
export function getTrendColor(trend: string): string {
	switch (trend) {
		case 'up': return 'text-green-600'; // Green for positive
		case 'down': return 'text-red-600'; // Red for negative
		default: return 'text-slate-600';
	}
}

// Get performance-based bar color (dark default, red for low performers)
export function getPerformanceBarColor(value: number, metric: string): string {
	let threshold: number;
	
	switch (metric) {
		case 'efficiency': threshold = PERFORMANCE_THRESHOLDS.efficiency; break;
		case 'utilization': threshold = PERFORMANCE_THRESHOLDS.utilization; break;
		case 'dailyUnits': threshold = PERFORMANCE_THRESHOLDS.dailyUnits; break;
		case 'alerts': threshold = PERFORMANCE_THRESHOLDS.alerts; break;
		default: return '#6b7280';
	}
	
	if (metric === 'alerts') {
		// For alerts, more is worse
		if (value >= threshold * 2) return '#ef4444'; // Red
		if (value >= threshold) return '#f59e0b';     // Yellow
		return '#10b981';                             // Green
	} else {
		// For other metrics, more is better
		if (value >= threshold * 1.2) return '#10b981'; // Green
		if (value >= threshold) return '#3b82f6';        // Blue
		if (value >= threshold * 0.8) return '#f59e0b';  // Yellow
		return '#ef4444';                                // Red
	}
}

// Check if region needs attention (for alert icons)
export function needsAttention(value: number, metric: string): boolean {
	let threshold: number;
	
	switch (metric) {
		case 'efficiency': threshold = PERFORMANCE_THRESHOLDS.efficiency; break;
		case 'utilization': threshold = PERFORMANCE_THRESHOLDS.utilization; break;
		case 'dailyUnits': threshold = PERFORMANCE_THRESHOLDS.dailyUnits; break;
		case 'alerts': threshold = PERFORMANCE_THRESHOLDS.alerts; break;
		default: return false;
	}
	
	return value < threshold;
}

// Dropdown utility functions
export function createDropdownHandlers() {
	let hoveredRegion = '';
	let dropdownTimeout: number;

	return {
		showDropdown: (regionName: string) => {
			clearTimeout(dropdownTimeout);
			hoveredRegion = regionName;
			return hoveredRegion;
		},

		hideDropdown: () => {
			dropdownTimeout = setTimeout(() => {
				hoveredRegion = '';
			}, 150);
			return hoveredRegion;
		},

		keepDropdown: () => {
			clearTimeout(dropdownTimeout);
		},

		getHoveredRegion: () => hoveredRegion
	};
}

export function calculateRegionalAverage(regionalData: Record<string, RegionalData>) {
	const regions = Object.values(regionalData);
	const count = regions.length;
	
	if (count === 0) return null;
	
	return {
		efficiency: Math.round(regions.reduce((sum, r) => sum + r.efficiency, 0) / count),
		utilization: Math.round(regions.reduce((sum, r) => sum + r.utilizationRate, 0) / count),
		dailyUnits: Math.round(regions.reduce((sum, r) => sum + r.dailyUnits, 0) / count),
		alerts: Math.round(regions.reduce((sum, r) => sum + r.alerts, 0) / count)
	};
} 