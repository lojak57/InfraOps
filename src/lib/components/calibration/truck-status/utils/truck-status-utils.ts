// Truck Status Display Utilities - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 2 - High Priority Components

import type { 
	TruckMetrics, 
	ExtendedTruckMetrics, 
	TruckStatusFilters, 
	TruckStatusSorting,
	TruckCalibrationPercentage 
} from '../types/truck-status.types.js';

// Format days ago text
export function formatDaysAgo(date: Date): string {
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - date.getTime());
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	
	if (diffDays === 0) return 'Today';
	if (diffDays === 1) return '1 day ago';
	return `${diffDays} days ago`;
}

// Format delta percentage
export function formatDelta(delta: number): string {
	const sign = delta >= 0 ? '+' : '';
	return `${sign}${delta.toFixed(2)}%`;
}

// Get status icon for truck status
export function getStatusIcon(status: TruckMetrics['status']): string {
	switch (status) {
		case 'good': return '✅';
		case 'warning': return '⚠️';
		case 'critical': return '🔴';
		default: return '❓';
	}
}

// Get status label text
export function getStatusLabel(status: TruckMetrics['status']): string {
	switch (status) {
		case 'good': return 'Good';
		case 'warning': return 'Needs Cal';
		case 'critical': return 'Critical';
		default: return 'Unknown';
	}
}

// Get percentage color class
export function getPercentageColor(value: number, threshold = 80): string {
	if (value < threshold) return 'text-red-500 font-semibold';
	return 'text-slate-200';
}

// Calculate calibration percentage (mock implementation)
export function getCalibrationPercentage(truck: TruckMetrics): number {
	// Simulate calibration percentage based on status
	if (truck.status === 'good') return Math.random() * 15 + 85; // 85-100%
	if (truck.status === 'warning') return Math.random() * 20 + 60; // 60-80%
	return Math.random() * 40 + 20; // 20-60% for critical
}

// Filter trucks based on search and status
export function filterTrucks(
	trucks: TruckMetrics[], 
	filters: TruckStatusFilters
): TruckMetrics[] {
	return trucks.filter(truck => {
		// Status filter
		if (filters.filterStatus !== 'all' && truck.status !== filters.filterStatus) {
			return false;
		}
		
		// Search filter
		if (filters.searchTerm && !truck.id.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
			return false;
		}
		
		return true;
	});
}

// Sort trucks based on sorting configuration
export function sortTrucks(
	trucks: TruckMetrics[], 
	sorting: TruckStatusSorting
): TruckMetrics[] {
	return [...trucks].sort((a, b) => {
		let aValue: any, bValue: any;
		
		switch (sorting.sortBy) {
			case 'id':
				aValue = a.id;
				bValue = b.id;
				break;
			case 'lastCalibrated':
				aValue = a.lastCalibrated.getTime();
				bValue = b.lastCalibrated.getTime();
				break;
			case 'avgLoadDelta':
				aValue = Math.abs(a.avgLoadDelta);
				bValue = Math.abs(b.avgLoadDelta);
				break;
			case 'status':
				const statusOrder = { 'critical': 3, 'warning': 2, 'good': 1 };
				aValue = statusOrder[a.status];
				bValue = statusOrder[b.status];
				break;
			default:
				aValue = a.id;
				bValue = b.id;
		}
		
		if (sorting.sortDirection === 'asc') {
			return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
		} else {
			return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
		}
	});
}

// Create extended truck metrics with calculated fields
export function createExtendedTruckMetrics(truck: TruckMetrics): ExtendedTruckMetrics {
	return {
		...truck,
		calibrationPercentage: getCalibrationPercentage(truck),
		daysAgoText: formatDaysAgo(truck.lastCalibrated),
		deltaText: formatDelta(truck.avgLoadDelta),
		statusIcon: getStatusIcon(truck.status),
		statusLabel: getStatusLabel(truck.status),
		priorityLevel: getPriorityLevel(truck)
	};
}

// Get priority level for truck based on status and delta
export function getPriorityLevel(truck: TruckMetrics): 'high' | 'medium' | 'low' {
	if (truck.status === 'critical') return 'high';
	if (truck.status === 'warning' && Math.abs(truck.avgLoadDelta) > 0.3) return 'medium';
	if (truck.status === 'warning') return 'low';
	return 'low';
}

// Toggle truck selection in array
export function toggleTruckSelection(truckId: string, selectedTrucks: string[]): string[] {
	if (selectedTrucks.includes(truckId)) {
		return selectedTrucks.filter(id => id !== truckId);
	} else {
		return [...selectedTrucks, truckId];
	}
}

// Select all visible trucks
export function selectAllTrucks(trucks: TruckMetrics[]): string[] {
	return trucks.map(truck => truck.id);
}

// Clear all selections
export function clearSelection(): string[] {
	return [];
}

// Get status color for styling
export function getStatusColor(status: TruckMetrics['status']): string {
	switch (status) {
		case 'good': return '#22c55e';
		case 'warning': return '#f59e0b';
		case 'critical': return '#ef4444';
		default: return '#6b7280';
	}
}

// Get status badge classes
export function getStatusBadgeClasses(status: TruckMetrics['status']): string {
	const baseClasses = 'status-badge';
	switch (status) {
		case 'good': return `${baseClasses} good`;
		case 'warning': return `${baseClasses} warning`;
		case 'critical': return `${baseClasses} critical`;
		default: return baseClasses;
	}
}

// Get truck row classes
export function getTruckRowClasses(truck: TruckMetrics, isSelected: boolean): string {
	let classes = 'truck-row';
	if (isSelected) classes += ' selected';
	classes += ` ${truck.status}`;
	return classes;
}

// Get truck card classes
export function getTruckCardClasses(truck: TruckMetrics, isSelected: boolean): string {
	let classes = 'truck-card';
	if (isSelected) classes += ' selected';
	classes += ` ${truck.status}`;
	return classes;
}

// Validate calibration percentage threshold
export function validateCalibrationThreshold(percentage: number, threshold: number = 80): boolean {
	return percentage >= threshold;
}

// Get metric value classes for styling
export function getMetricValueClasses(value: number, isPositive?: boolean): string {
	let classes = 'metric-value';
	if (isPositive !== undefined) {
		classes += isPositive ? ' positive' : ' negative';
	}
	return classes;
}

// Format numbers for display
export function formatNumber(value: number, decimals: number = 0): string {
	return value.toLocaleString(undefined, { 
		minimumFractionDigits: decimals, 
		maximumFractionDigits: decimals 
	});
}

// Calculate summary statistics
export function calculateTruckStatistics(trucks: TruckMetrics[]) {
	const total = trucks.length;
	const good = trucks.filter(t => t.status === 'good').length;
	const warning = trucks.filter(t => t.status === 'warning').length;
	const critical = trucks.filter(t => t.status === 'critical').length;
	
	return {
		total,
		good,
		warning,
		critical,
		goodPercentage: total > 0 ? (good / total) * 100 : 0,
		warningPercentage: total > 0 ? (warning / total) * 100 : 0,
		criticalPercentage: total > 0 ? (critical / total) * 100 : 0
	};
} 