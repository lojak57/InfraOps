/**
 * Fleet Mock Data
 * 
 * Fleet-level summary data and statistics for dispatch analytics.
 * Contains high-level aggregated metrics across all operations.
 */

import type { DemoFleetData } from '../../types/dispatch-analytics.types';

// ================================
// Fleet Summary Data
// ================================

export const DEMO_FLEET: DemoFleetData = {
	totalTrucks: 247,
	totalDrivers: 312,
	totalYards: 6,
	totalJobs: 1247,
	todayJobs: 89,
	weekJobs: 634,
	monthJobs: 2847,
	efficiency: 89.3,
	totalRevenue: 28470000,
	monthlyRevenue: 4200000,
	avgVolumeLoss: 2.1,
	safetyScore: 96.8,
	alerts: [
		{
			type: 'efficiency',
			severity: 'medium',
			summary: 'Fleet efficiency 3.2% below target',
			timestamp: new Date(Date.now() - 1800000)
		}
	]
};

// ================================
// Fleet Utilities
// ================================

export function getFleetSummary() {
	return {
		...DEMO_FLEET,
		utilizationRate: (DEMO_FLEET.monthJobs / (DEMO_FLEET.totalTrucks * 30)) * 100,
		revenuePerTruck: DEMO_FLEET.monthlyRevenue / DEMO_FLEET.totalTrucks,
		jobsPerTruck: DEMO_FLEET.monthJobs / DEMO_FLEET.totalTrucks
	};
}

export function getFleetAlerts() {
	return DEMO_FLEET.alerts;
} 