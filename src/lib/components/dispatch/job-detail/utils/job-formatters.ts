// Job Detail Utilities - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 2 - High Priority Components

import { format } from 'date-fns';
import type { JobData, JobOverviewData } from '../types/job-detail.types.js';

// Format volume with proper decimal places
export function formatVolume(volume: number): string {
	return new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(volume);
}

// Format currency values
export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(amount);
}

// Format date and time
export function formatDateTime(date: Date): string {
	return format(date, 'MMM dd, yyyy • hh:mm:ss a');
}

// Format GPS coordinates
export function formatCoordinate(coord: number): string {
	return coord.toFixed(6);
}

// Get status CSS class
export function getJobStatusClass(status: string): string {
	switch (status) {
		case 'completed': return 'success';
		case 'in-progress': return 'warning';
		case 'scheduled': return 'info';
		default: return 'neutral';
	}
}

// Calculate overview data from jobs array
export function calculateJobOverview(allJobs: JobData[]): JobOverviewData {
	const jobsByStatus = {
		completed: allJobs.filter(h => h.status === 'completed'),
		'in-progress': allJobs.filter(h => h.status === 'in-progress'),
		scheduled: allJobs.filter(h => h.status === 'scheduled')
	};

	return {
		totalJobs: allJobs.length,
		totalRevenue: allJobs.reduce((sum, h) => sum + h.revenue, 0),
		avgEfficiency: allJobs.length > 0 ? allJobs.reduce((sum, h) => sum + h.efficiency, 0) / allJobs.length : 0,
		avgVolumeLoss: allJobs.length > 0 ? allJobs.reduce((sum, h) => sum + h.volumeLossPercent, 0) / allJobs.length : 0,
		totalVolume: allJobs.reduce((sum, h) => sum + h.onloadVolume, 0),
		avgDuration: allJobs.length > 0 ? allJobs.reduce((sum, h) => sum + h.duration, 0) / allJobs.length : 0,
		jobsByStatus
	};
}

// Check if jobs have performance issues
export function hasPerformanceAlerts(allJobs: JobData[]): boolean {
	return allJobs.some(h => h.efficiency < 85 || h.volumeLossPercent > 3.0 || h.alerts.length > 0);
}

// Get performance alert counts
export function getPerformanceAlertCounts(allJobs: JobData[]) {
	return {
		lowEfficiency: allJobs.filter(h => h.efficiency < 85).length,
		highVolumeLoss: allJobs.filter(h => h.volumeLossPercent > 3.0).length,
		totalAlerts: allJobs.reduce((sum, h) => sum + h.alerts.length, 0)
	};
}

// Get efficiency status class
export function getEfficiencyClass(efficiency: number): string {
	if (efficiency >= 95) return 'efficiency-excellent';
	if (efficiency >= 90) return 'efficiency-good';
	if (efficiency >= 85) return 'efficiency-warning';
	return 'efficiency-critical';
}

// Check if reading is critical
export function isCriticalReading(value: number, type: 'temperature' | 'pressure' | 'h2s'): boolean {
	switch (type) {
		case 'temperature':
			return value > 150 || value < 32; // Critical temperature ranges
		case 'pressure':
			return value > 1000 || value < 5; // Critical pressure ranges
		case 'h2s':
			return value > 1.0; // Critical H2S levels
		default:
			return false;
	}
}

// Format duration in hours and minutes
export function formatDuration(minutes: number): string {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${hours}h ${mins}m`;
}

// Calculate profit margin
export function calculateProfitMargin(revenue: number, fuelCost: number): number {
	if (revenue === 0) return 0;
	return ((revenue - fuelCost) / revenue) * 100;
}

// Get KPI card status based on value and thresholds
export function getKPIStatus(type: string, value: number): 'primary' | 'success' | 'warning' | 'info' | 'neutral' {
	switch (type) {
		case 'efficiency':
			return value >= 92 ? 'success' : 'warning';
		case 'volumeLoss':
			return value <= 2.0 ? 'success' : 'warning';
		default:
			return 'info';
	}
} 