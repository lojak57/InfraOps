/**
 * Yard Mock Data
 * 
 * Yard/site-level data including performance metrics, capacity,
 * and operational status for dispatch analytics.
 */

import type { DemoYardData } from '../../types/dispatch-analytics.types';

// ================================
// Yard Data
// ================================

export const DEMO_YARDS: DemoYardData[] = [
	{
		id: 'alpha-yard',
		name: 'Metro Hub Alpha',
		location: 'LAT: 35.000000, LONG: -98.000000',
		region: 'Central Region',
		totalTrucks: 41,
		activeTrucks: 38,
		todayJobs: 23,
		weekJobs: 167,
		efficiency: 91.2,
		revenue: 847000,
		avgVolumeLoss: 1.8,
		status: 'attention',
		pickupBays: 6,
		activeBays: 4,
		alerts: [
			{
				type: 'efficiency',
				severity: 'medium',
				summary: 'Truck T-205 underperforming',
				timestamp: new Date(Date.now() - 3600000)
			}
		]
	},
	{
		id: 'beta-yard',
		name: 'Metro Hub Beta',
		location: 'LAT: 35.100000, LONG: -97.900000',
		region: 'Central Region',
		totalTrucks: 38,
		activeTrucks: 35,
		todayJobs: 21,
		weekJobs: 152,
		efficiency: 94.7,
		revenue: 723000,
		avgVolumeLoss: 1.6,
		status: 'excellent',
		pickupBays: 5,
		activeBays: 3,
		alerts: []
	}
];

// ================================
// Yard Utilities
// ================================

export function getYardById(yardId: string): DemoYardData | undefined {
	return DEMO_YARDS.find(yard => yard.id === yardId);
}

export function getYardsByRegion(region: string): DemoYardData[] {
	return DEMO_YARDS.filter(yard => yard.region === region);
}

export function getYardsByStatus(status: string): DemoYardData[] {
	return DEMO_YARDS.filter(yard => yard.status === status);
}

export function getYardAlerts(): { yardId: string; alerts: any[] }[] {
	return DEMO_YARDS
		.filter(yard => yard.alerts.length > 0)
		.map(yard => ({ yardId: yard.id, alerts: yard.alerts }));
}

export function calculateYardUtilization(yard: DemoYardData): number {
	return (yard.activeTrucks / yard.totalTrucks) * 100;
}

export function calculateBayUtilization(yard: DemoYardData): number {
	return (yard.activeBays / yard.pickupBays) * 100;
}

export function getYardPerformanceMetrics(yardId: string) {
	const yard = getYardById(yardId);
	if (!yard) return null;

	return {
		efficiency: yard.efficiency,
		utilization: calculateYardUtilization(yard),
		bayUtilization: calculateBayUtilization(yard),
		revenuePerTruck: yard.revenue / yard.totalTrucks,
		jobsPerTruck: yard.weekJobs / yard.totalTrucks,
		avgVolumeLoss: yard.avgVolumeLoss,
		alertCount: yard.alerts.length
	};
} 