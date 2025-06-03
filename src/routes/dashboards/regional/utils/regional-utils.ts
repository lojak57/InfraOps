// Regional Dashboard Utilities - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 1 - Critical Components

import type { PerformanceThresholds } from '../types/regional.types.js';

// Performance thresholds for attention checking
const PERFORMANCE_THRESHOLDS: PerformanceThresholds = {
	bpd: 2000,
	efficiency: 88,
	bph: 150
};

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
	let threshold = 0;
	switch (metric) {
		case 'bpd': threshold = PERFORMANCE_THRESHOLDS.bpd; break;
		case 'efficiency': threshold = PERFORMANCE_THRESHOLDS.efficiency; break;
		case 'bph': threshold = PERFORMANCE_THRESHOLDS.bph; break;
		default: threshold = 0;
	}
	
	return value < threshold ? '#ef4444' : '#1e293b'; // Red for low performers, navy for others
}

// Check if region needs attention (for alert icons)
export function needsAttention(value: number, metric: string): boolean {
	let threshold = 0;
	switch (metric) {
		case 'bpd': threshold = PERFORMANCE_THRESHOLDS.bpd; break;
		case 'efficiency': threshold = PERFORMANCE_THRESHOLDS.efficiency; break;
		case 'bph': threshold = PERFORMANCE_THRESHOLDS.bph; break;
		default: threshold = 0;
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