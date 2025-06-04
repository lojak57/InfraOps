/**
 * Truck Mock Data
 * 
 * Individual truck/asset data including performance metrics, maintenance,
 * and real-time status for dispatch analytics.
 */

import type { DemoTruckData } from '../../types/dispatch-analytics.types';

// ================================
// Truck Data
// ================================

export const DEMO_TRUCKS: DemoTruckData[] = [
	// Alpha Yard Trucks
	{
		id: 'T-205',
		model: 'Peterbilt 579',
		year: 2021,
		capacity: 130,
		driverId: 'D-147',
		driverName: 'Driver Alpha-1',
		yardId: 'alpha-yard',
		currentStatus: 'active',
		todayJobs: 2,
		weekJobs: 12,
		efficiency: 76.2, // Problem truck
		avgVolumeLoss: 4.1,
		safetyScore: 89.3,
		lastJobTime: new Date(Date.now() - 7200000),
		nextScheduled: new Date(Date.now() + 3600000),
		alerts: [
			{
				type: 'volume_loss',
				severity: 'high',
				summary: '4.8% loss on last job - above threshold',
				timestamp: new Date(Date.now() - 7200000)
			},
			{
				type: 'temp_variance',
				severity: 'medium',
				summary: 'Excessive temperature variance detected',
				timestamp: new Date(Date.now() - 7200000)
			}
		],
		mileage: 87432,
		fuelEfficiency: 6.2,
		lastMaintenance: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
		nextMaintenance: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
	},
	{
		id: 'T-212',
		model: 'Kenworth T680',
		year: 2022,
		capacity: 130,
		driverId: 'D-189',
		driverName: 'Driver Alpha-2',
		yardId: 'alpha-yard',
		currentStatus: 'transit',
		todayJobs: 3,
		weekJobs: 18,
		efficiency: 98.7, // Top performer
		avgVolumeLoss: 1.2,
		safetyScore: 99.1,
		lastJobTime: new Date(Date.now() - 1800000),
		nextScheduled: new Date(Date.now() + 5400000),
		alerts: [],
		mileage: 45231,
		fuelEfficiency: 7.8,
		lastMaintenance: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
		nextMaintenance: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000)
	},
	{
		id: 'T-198',
		model: 'Freightliner Cascadia',
		year: 2020,
		capacity: 130,
		driverId: 'D-203',
		driverName: 'Driver Alpha-3',
		yardId: 'alpha-yard',
		currentStatus: 'pickup',
		todayJobs: 2,
		weekJobs: 15,
		efficiency: 92.4,
		avgVolumeLoss: 2.0,
		safetyScore: 95.7,
		lastJobTime: new Date(Date.now() - 14400000),
		nextScheduled: new Date(Date.now() + 900000),
		alerts: [],
		mileage: 112847,
		fuelEfficiency: 6.9,
		lastMaintenance: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
		nextMaintenance: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
	},
	{
		id: 'T-156',
		model: 'Volvo VNL',
		year: 2023,
		capacity: 130,
		driverId: 'D-224',
		driverName: 'Driver Alpha-4',
		yardId: 'alpha-yard',
		currentStatus: 'active',
		todayJobs: 2,
		weekJobs: 14,
		efficiency: 94.1,
		avgVolumeLoss: 1.7,
		safetyScore: 97.2,
		lastJobTime: new Date(Date.now() - 10800000),
		nextScheduled: new Date(Date.now() + 7200000),
		alerts: [],
		mileage: 28734,
		fuelEfficiency: 7.3,
		lastMaintenance: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
		nextMaintenance: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
	},
	{
		id: 'T-187',
		model: 'Mack Anthem',
		year: 2022,
		capacity: 130,
		driverId: 'D-245',
		driverName: 'Driver Alpha-5',
		yardId: 'alpha-yard',
		currentStatus: 'available',
		todayJobs: 1,
		weekJobs: 11,
		efficiency: 88.9,
		avgVolumeLoss: 2.4,
		safetyScore: 94.8,
		lastJobTime: new Date(Date.now() - 25200000),
		nextScheduled: new Date(Date.now() + 1800000),
		alerts: [],
		mileage: 63421,
		fuelEfficiency: 6.5,
		lastMaintenance: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
		nextMaintenance: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
	},
	// Beta Yard Trucks (Top Performers)
	{
		id: 'T-301',
		model: 'Peterbilt 579',
		year: 2023,
		capacity: 130,
		driverId: 'D-267',
		driverName: 'Driver Beta-1',
		yardId: 'beta-yard',
		currentStatus: 'active',
		todayJobs: 3,
		weekJobs: 19,
		efficiency: 96.8,
		avgVolumeLoss: 1.4,
		safetyScore: 98.2,
		lastJobTime: new Date(Date.now() - 3600000),
		nextScheduled: new Date(Date.now() + 7200000),
		alerts: [],
		mileage: 23451,
		fuelEfficiency: 7.6,
		lastMaintenance: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
		nextMaintenance: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
	},
	{
		id: 'T-318',
		model: 'Kenworth T680',
		year: 2023,
		capacity: 130,
		driverId: 'D-291',
		driverName: 'Driver Beta-2',
		yardId: 'beta-yard',
		currentStatus: 'available',
		todayJobs: 2,
		weekJobs: 16,
		efficiency: 95.3,
		avgVolumeLoss: 1.6,
		safetyScore: 97.9,
		lastJobTime: new Date(Date.now() - 10800000),
		nextScheduled: new Date(Date.now() + 1800000),
		alerts: [],
		mileage: 18732,
		fuelEfficiency: 7.4,
		lastMaintenance: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
		nextMaintenance: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000)
	},
	{
		id: 'T-334',
		model: 'Volvo VNL',
		year: 2022,
		capacity: 130,
		driverId: 'D-315',
		driverName: 'Driver Beta-3',
		yardId: 'beta-yard',
		currentStatus: 'maintenance',
		todayJobs: 0,
		weekJobs: 14,
		efficiency: 93.1,
		avgVolumeLoss: 1.9,
		safetyScore: 96.4,
		lastJobTime: new Date(Date.now() - 86400000),
		nextScheduled: new Date(Date.now() + 21600000),
		alerts: [
			{
				type: 'maintenance',
				severity: 'low',
				summary: 'Scheduled maintenance in progress',
				timestamp: new Date(Date.now() - 3600000)
			}
		],
		mileage: 67234,
		fuelEfficiency: 6.8,
		lastMaintenance: new Date(),
		nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
	},
	{
		id: 'T-342',
		model: 'Freightliner Cascadia',
		year: 2023,
		capacity: 130,
		driverId: 'D-331',
		driverName: 'Driver Beta-4',
		yardId: 'beta-yard',
		currentStatus: 'transit',
		todayJobs: 2,
		weekJobs: 17,
		efficiency: 97.1,
		avgVolumeLoss: 1.3,
		safetyScore: 98.5,
		lastJobTime: new Date(Date.now() - 5400000),
		nextScheduled: new Date(Date.now() + 9000000),
		alerts: [],
		mileage: 15632,
		fuelEfficiency: 7.7,
		lastMaintenance: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
		nextMaintenance: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000)
	},
	{
		id: 'T-358',
		model: 'Peterbilt 389',
		year: 2021,
		capacity: 130,
		driverId: 'D-352',
		driverName: 'Driver Beta-5',
		yardId: 'beta-yard',
		currentStatus: 'pickup',
		todayJobs: 1,
		weekJobs: 13,
		efficiency: 91.7,
		avgVolumeLoss: 2.1,
		safetyScore: 95.9,
		lastJobTime: new Date(Date.now() - 18000000),
		nextScheduled: new Date(Date.now() + 3600000),
		alerts: [],
		mileage: 78924,
		fuelEfficiency: 6.7,
		lastMaintenance: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
		nextMaintenance: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000)
	}
];

// ================================
// Truck Utilities
// ================================

export function getTruckById(truckId: string): DemoTruckData | undefined {
	return DEMO_TRUCKS.find(truck => truck.id === truckId);
}

export function getTrucksByYard(yardId: string): DemoTruckData[] {
	return DEMO_TRUCKS.filter(truck => truck.yardId === yardId);
}

export function getTrucksByStatus(status: string): DemoTruckData[] {
	return DEMO_TRUCKS.filter(truck => truck.currentStatus === status);
}

export function getTruckAlerts(): { truckId: string; alerts: any[] }[] {
	return DEMO_TRUCKS
		.filter(truck => truck.alerts.length > 0)
		.map(truck => ({ truckId: truck.id, alerts: truck.alerts }));
}

export function getTopPerformers(limit: number = 5): DemoTruckData[] {
	return [...DEMO_TRUCKS]
		.sort((a, b) => b.efficiency - a.efficiency)
		.slice(0, limit);
}

export function getUnderperformers(threshold: number = 85): DemoTruckData[] {
	return DEMO_TRUCKS.filter(truck => truck.efficiency < threshold);
}

export function getTrucksNeedingMaintenance(): DemoTruckData[] {
	const now = new Date();
	const oneWeek = 7 * 24 * 60 * 60 * 1000;
	
	return DEMO_TRUCKS.filter(truck => 
		truck.nextMaintenance.getTime() - now.getTime() <= oneWeek
	);
}

export function calculateFleetAverages() {
	const trucks = DEMO_TRUCKS;
	const count = trucks.length;
	
	return {
		averageEfficiency: trucks.reduce((sum, truck) => sum + truck.efficiency, 0) / count,
		averageVolumeLoss: trucks.reduce((sum, truck) => sum + truck.avgVolumeLoss, 0) / count,
		averageSafetyScore: trucks.reduce((sum, truck) => sum + truck.safetyScore, 0) / count,
		averageFuelEfficiency: trucks.reduce((sum, truck) => sum + truck.fuelEfficiency, 0) / count,
		averageMileage: trucks.reduce((sum, truck) => sum + truck.mileage, 0) / count
	};
} 