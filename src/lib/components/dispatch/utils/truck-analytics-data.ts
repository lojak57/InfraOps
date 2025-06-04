/**
 * Truck Analytics Data Utilities
 * 
 * Data processing, calculations, and formatting functions for truck analytics.
 * Provides fleet-wide metrics, truck grouping, and performance calculations.
 */

import { formatDistanceToNow } from 'date-fns';

// ================================
// Types
// ================================

export interface TruckStatus {
	label: string;
	class: 'success' | 'warning' | 'info' | 'error' | 'neutral';
}

export interface FleetMetrics {
	totalTrucks: number;
	activeTrucks: number;
	totalJobs: number;
	todayJobs: number;
	avgEfficiency: number;
	avgVolumeLoss: number;
	maintenanceTrucks: number;
	avgFuelEfficiency: number;
}

export interface YardTruckGroup {
	yard: any;
	trucks: any[];
}

export interface AlertSummary {
	lowEfficiencyCount: number;
	highVolumeLossCount: number;
	totalAlerts: number;
}

// ================================
// Status Utilities
// ================================

/**
 * Get truck status with label and styling class
 */
export function getTruckStatus(truck: any): TruckStatus {
	switch (truck.currentStatus) {
		case 'active': 
			return { label: 'Active', class: 'success' };
		case 'pickup': 
			return { label: 'Loading', class: 'warning' };
		case 'transit': 
			return { label: 'In Transit', class: 'info' };
		case 'maintenance': 
			return { label: 'Maintenance', class: 'error' };
		case 'available': 
			return { label: 'Available', class: 'neutral' };
		default: 
			return { label: 'Unknown', class: 'neutral' };
	}
}

/**
 * Format last seen timestamp
 */
export function formatLastSeen(date: Date | null): string {
	if (!date) return 'Unknown';
	return formatDistanceToNow(date, { addSuffix: true });
}

// ================================
// Fleet Calculations
// ================================

/**
 * Calculate fleet-wide metrics
 */
export function calculateFleetMetrics(allTrucks: any[], allJobs: any[]): FleetMetrics {
	const activeTrucks = allTrucks.filter(t => 
		t.currentStatus === 'active' || 
		t.currentStatus === 'pickup' || 
		t.currentStatus === 'transit'
	).length;

	const todayJobs = allTrucks.reduce((sum, t) => sum + t.todayJobs, 0);
	const avgEfficiency = allTrucks.reduce((sum, t) => sum + t.efficiency, 0) / allTrucks.length;
	const avgVolumeLoss = allTrucks.reduce((sum, t) => sum + t.avgVolumeLoss, 0) / allTrucks.length;
	const maintenanceTrucks = allTrucks.filter(t => t.currentStatus === 'maintenance').length;
	const avgFuelEfficiency = allTrucks.reduce((sum, t) => sum + t.fuelEfficiency, 0) / allTrucks.length;

	return {
		totalTrucks: allTrucks.length,
		activeTrucks,
		totalJobs: allJobs.length,
		todayJobs,
		avgEfficiency,
		avgVolumeLoss,
		maintenanceTrucks,
		avgFuelEfficiency
	};
}

/**
 * Group trucks by yard
 */
export function groupTrucksByYard(allTrucks: any[], allYards: any[]): YardTruckGroup[] {
	return allYards.map(yard => ({
		yard,
		trucks: allTrucks.filter(truck => truck.yardId === yard.id)
	}));
}

/**
 * Calculate alert summary for fleet
 */
export function calculateAlertSummary(allTrucks: any[]): AlertSummary {
	const lowEfficiencyCount = allTrucks.filter(t => t.efficiency < 85).length;
	const highVolumeLossCount = allTrucks.filter(t => t.avgVolumeLoss > 3.0).length;
	const totalAlerts = allTrucks.reduce((sum, t) => sum + t.alerts.length, 0);

	return {
		lowEfficiencyCount,
		highVolumeLossCount,
		totalAlerts
	};
}

// ================================
// Performance Analysis
// ================================

/**
 * Check if fleet has performance issues
 */
export function hasFleetAlerts(allTrucks: any[]): boolean {
	return allTrucks.some(t => 
		t.efficiency < 85 || 
		t.avgVolumeLoss > 3.0 || 
		t.alerts.length > 0
	);
}

/**
 * Get efficiency status class
 */
export function getEfficiencyStatusClass(efficiency: number): 'success' | 'warning' {
	return efficiency >= 92 ? 'success' : 'warning';
}

/**
 * Get volume loss status class
 */
export function getVolumeLossStatusClass(volumeLoss: number): 'success' | 'warning' {
	return volumeLoss <= 2.0 ? 'success' : 'warning';
}

/**
 * Calculate maintenance percentage
 */
export function calculateMaintenancePercentage(maintenanceTrucks: number, totalTrucks: number): number {
	return totalTrucks > 0 ? (maintenanceTrucks / totalTrucks) * 100 : 0;
}

// ================================
// Data Formatting
// ================================

/**
 * Format large numbers with locale string
 */
export function formatLargeNumber(value: number): string {
	return value.toLocaleString();
}

/**
 * Format percentage with one decimal place
 */
export function formatPercentage(value: number): string {
	return value.toFixed(1);
}

/**
 * Format efficiency trend mock data
 */
export function formatEfficiencyTrend(currentEfficiency: number): string {
	// Mock trend data - in real implementation this would come from historical data
	const mockTrend = [
		{ day: 'Mon', efficiency: currentEfficiency + 2 },
		{ day: 'Tue', efficiency: currentEfficiency + 1 },
		{ day: 'Wed', efficiency: currentEfficiency - 1 },
		{ day: 'Today', efficiency: currentEfficiency }
	];

	return mockTrend
		.map(item => `${item.day} ${item.efficiency.toFixed(0)}%`)
		.join(' → ');
}

/**
 * Format volume loss trend from jobs
 */
export function formatVolumeLossTrend(jobs: any[]): string {
	return jobs
		.map(job => job.volumeLossPercent.toFixed(1) + '%')
		.join(' → ');
}

// ================================
// Validation Utilities
// ================================

/**
 * Check if truck data is valid
 */
export function isValidTruckData(truck: any): boolean {
	return truck && 
		typeof truck.id === 'string' && 
		typeof truck.efficiency === 'number' &&
		typeof truck.avgVolumeLoss === 'number';
}

/**
 * Check if showing all trucks view
 */
export function isShowingAllTrucks(truckData: any): boolean {
	return !truckData;
}

// ================================
// Constants
// ================================

export const EFFICIENCY_TARGET = 92.5;
export const VOLUME_LOSS_TARGET = 2.0;
export const LOW_EFFICIENCY_THRESHOLD = 85;
export const HIGH_VOLUME_LOSS_THRESHOLD = 3.0; 