/**
 * Job Mock Data
 * 
 * Individual job/haul data including performance metrics, GPS tracking,
 * sensor readings, and completion status for dispatch analytics.
 */

import type { DemoJobData } from '../../types/dispatch-analytics.types';

// ================================
// Job/Haul Data
// ================================

export const DEMO_HAULS: DemoJobData[] = [
	// The "Problem Job" - T-205's smoking gun
	{
		id: 'HL-001547',
		truckId: 'T-205',
		driverId: 'D-147',
		driverName: 'Driver Alpha-1',
		origin: 'Metro Hub Alpha',
		destination: 'Processing Terminal Beta',
		customer: 'Energy Corp Alpha',
		onloadVolume: 27845.6,
		offloadVolume: 26510.3,
		volumeLoss: 1335.3,
		volumeLossPercent: 4.8,
		avgTemp: 102.3,
		minTemp: 68.1, // The smoking gun
		maxTemp: 118.7,
		startTime: new Date(Date.now() - 7200000),
		endTime: new Date(Date.now() - 1800000),
		duration: 270,
		distance: 347,
		efficiency: 76.2,
		revenue: 485.50,
		fuelCost: 142.30,
		status: 'completed',
		alerts: [
			{
				type: 'volume_loss',
				severity: 'high',
				summary: '4.8% loss - above 3% threshold',
				timestamp: new Date(Date.now() - 1800000)
			},
			{
				type: 'temp_variance',
				severity: 'medium',
				summary: 'Excessive cooling detected - 50°F drop',
				timestamp: new Date(Date.now() - 5400000)
			}
		],
		apiGravity: 38.5,
		waterCut: 0.8,
		h2sLevels: 0.6,
		pressureReadings: [145, 147, 149, 146, 144, 142],
		tempReadings: [102, 98, 89, 78, 71, 68, 69, 71, 74, 78],
		gpsTrail: [
			{ lat: 35.0000, lng: -98.0000, timestamp: new Date(Date.now() - 7200000) },
			{ lat: 35.1500, lng: -97.8500, timestamp: new Date(Date.now() - 5400000) },
			{ lat: 35.2000, lng: -97.7000, timestamp: new Date(Date.now() - 1800000) }
		]
	},
	// Perfect job - T-212's excellence
	{
		id: 'HL-001612',
		truckId: 'T-212',
		driverId: 'D-189',
		driverName: 'Driver Alpha-2',
		origin: 'Metro Hub Alpha',
		destination: 'Distribution Center Gamma',
		customer: 'Logistics Corp Beta',
		onloadVolume: 28156.2,
		offloadVolume: 27823.7,
		volumeLoss: 332.5,
		volumeLossPercent: 1.2,
		avgTemp: 89.4,
		minTemp: 85.2,
		maxTemp: 94.1,
		startTime: new Date(Date.now() - 21600000),
		endTime: new Date(Date.now() - 14400000),
		duration: 240,
		distance: 312,
		efficiency: 98.7,
		revenue: 525.75,
		fuelCost: 138.20,
		status: 'completed',
		alerts: [],
		apiGravity: 42.1,
		waterCut: 0.3,
		h2sLevels: 0.2,
		pressureReadings: [152, 153, 154, 153, 152, 151],
		tempReadings: [89, 88, 87, 86, 85, 86, 87, 89, 91, 94],
		gpsTrail: [
			{ lat: 35.0000, lng: -98.0000, timestamp: new Date(Date.now() - 21600000) },
			{ lat: 35.1500, lng: -97.8500, timestamp: new Date(Date.now() - 18000000) },
			{ lat: 35.2000, lng: -97.7000, timestamp: new Date(Date.now() - 14400000) }
		]
	},
	// Additional demo jobs for context...
	{
		id: 'HL-001634',
		truckId: 'T-198',
		driverId: 'D-203',
		driverName: 'Driver Alpha-3',
		origin: 'Metro Hub Alpha',
		destination: 'Storage Terminal Gamma',
		customer: 'Logistics Corp Beta',
		onloadVolume: 27934.1,
		offloadVolume: 27389.6,
		volumeLoss: 544.5,
		volumeLossPercent: 1.9,
		avgTemp: 91.7,
		minTemp: 87.3,
		maxTemp: 97.2,
		startTime: new Date(Date.now() - 14400000),
		endTime: new Date(Date.now() - 7200000),
		duration: 285,
		distance: 389,
		efficiency: 92.4,
		revenue: 467.80,
		fuelCost: 156.40,
		status: 'completed',
		alerts: [],
		apiGravity: 39.8,
		waterCut: 0.6,
		h2sLevels: 0.4,
		pressureReadings: [148, 149, 150, 149, 147, 146],
		tempReadings: [92, 91, 90, 89, 88, 87, 89, 92, 95, 97],
		gpsTrail: [
			{ lat: 35.0000, lng: -98.0000, timestamp: new Date(Date.now() - 14400000) },
			{ lat: 35.3000, lng: -97.6000, timestamp: new Date(Date.now() - 10800000) },
			{ lat: 35.4000, lng: -97.4000, timestamp: new Date(Date.now() - 7200000) }
		]
	},
	{
		id: 'HL-001645',
		truckId: 'T-301',
		driverId: 'D-267',
		driverName: 'Driver Beta-1',
		origin: 'Metro Hub Beta',
		destination: 'Distribution Center Gamma',
		customer: 'Energy Corp Alpha',
		onloadVolume: 28234.7,
		offloadVolume: 27889.2,
		volumeLoss: 345.5,
		volumeLossPercent: 1.2,
		avgTemp: 88.6,
		minTemp: 84.7,
		maxTemp: 93.1,
		startTime: new Date(Date.now() - 18000000),
		endTime: new Date(Date.now() - 10800000),
		duration: 225,
		distance: 287,
		efficiency: 96.8,
		revenue: 512.40,
		fuelCost: 126.80,
		status: 'completed',
		alerts: [],
		apiGravity: 41.2,
		waterCut: 0.4,
		h2sLevels: 0.3,
		pressureReadings: [151, 152, 153, 152, 151, 150],
		tempReadings: [89, 88, 87, 85, 84, 85, 87, 90, 92, 93],
		gpsTrail: [
			{ lat: 35.1000, lng: -97.9000, timestamp: new Date(Date.now() - 18000000) },
			{ lat: 35.2000, lng: -97.7000, timestamp: new Date(Date.now() - 14400000) },
			{ lat: 35.3000, lng: -97.5000, timestamp: new Date(Date.now() - 10800000) }
		]
	},
	{
		id: 'HL-001656',
		truckId: 'T-318',
		driverId: 'D-291',
		driverName: 'Driver Beta-2',
		origin: 'Metro Hub Beta',
		destination: 'Processing Terminal Beta',
		customer: 'Energy Corp Alpha',
		onloadVolume: 27987.3,
		offloadVolume: 27612.8,
		volumeLoss: 374.5,
		volumeLossPercent: 1.3,
		avgTemp: 90.2,
		minTemp: 86.4,
		maxTemp: 95.7,
		startTime: new Date(Date.now() - 25200000),
		endTime: new Date(Date.now() - 18000000),
		duration: 255,
		distance: 342,
		efficiency: 95.3,
		revenue: 498.60,
		fuelCost: 145.30,
		status: 'completed',
		alerts: [],
		apiGravity: 40.7,
		waterCut: 0.5,
		h2sLevels: 0.4,
		pressureReadings: [149, 150, 151, 150, 149, 148],
		tempReadings: [90, 89, 88, 87, 86, 87, 89, 92, 94, 96],
		gpsTrail: [
			{ lat: 35.1000, lng: -97.9000, timestamp: new Date(Date.now() - 25200000) },
			{ lat: 35.2000, lng: -97.7000, timestamp: new Date(Date.now() - 21600000) },
			{ lat: 35.3000, lng: -97.5000, timestamp: new Date(Date.now() - 18000000) }
		]
	},
	{
		id: 'HL-001667',
		truckId: 'T-342',
		driverId: 'D-331',
		driverName: 'Driver Beta-4',
		origin: 'Metro Hub Beta',
		destination: 'Processing Terminal Beta',
		customer: 'Energy Corp Alpha',
		onloadVolume: 28098.4,
		offloadVolume: 27734.1,
		volumeLoss: 364.3,
		volumeLossPercent: 1.3,
		avgTemp: 87.9,
		minTemp: 83.2,
		maxTemp: 92.8,
		startTime: new Date(Date.now() - 32400000),
		endTime: new Date(Date.now() - 25200000),
		duration: 240,
		distance: 298,
		efficiency: 97.1,
		revenue: 523.70,
		fuelCost: 133.90,
		status: 'completed',
		alerts: [],
		apiGravity: 42.8,
		waterCut: 0.2,
		h2sLevels: 0.1,
		pressureReadings: [153, 154, 155, 154, 153, 152],
		tempReadings: [88, 87, 86, 84, 83, 84, 86, 89, 91, 93],
		gpsTrail: [
			{ lat: 35.1000, lng: -97.9000, timestamp: new Date(Date.now() - 32400000) },
			{ lat: 35.2000, lng: -97.7000, timestamp: new Date(Date.now() - 28800000) },
			{ lat: 35.3000, lng: -97.5000, timestamp: new Date(Date.now() - 25200000) }
		]
	},
	{
		id: 'HL-001678',
		truckId: 'T-156',
		driverId: 'D-224',
		driverName: 'Driver Alpha-4',
		origin: 'Production Site Delta',
		destination: 'Processing Terminal Gamma',
		customer: 'Industrial Corp Gamma',
		onloadVolume: 27756.2,
		offloadVolume: 27289.7,
		volumeLoss: 466.5,
		volumeLossPercent: 1.7,
		avgTemp: 93.4,
		minTemp: 89.1,
		maxTemp: 98.6,
		startTime: new Date(Date.now() - 39600000),
		endTime: new Date(Date.now() - 32400000),
		duration: 265,
		distance: 356,
		efficiency: 94.1,
		revenue: 478.30,
		fuelCost: 151.20,
		status: 'completed',
		alerts: [],
		apiGravity: 39.3,
		waterCut: 0.7,
		h2sLevels: 0.5,
		pressureReadings: [147, 148, 149, 148, 147, 146],
		tempReadings: [93, 92, 91, 90, 89, 90, 92, 95, 97, 99],
		gpsTrail: [
			{ lat: 36.0000, lng: -96.0000, timestamp: new Date(Date.now() - 39600000) },
			{ lat: 35.5000, lng: -96.5000, timestamp: new Date(Date.now() - 36000000) },
			{ lat: 35.0000, lng: -97.0000, timestamp: new Date(Date.now() - 32400000) }
		]
	},
	{
		id: 'HL-001689',
		truckId: 'T-187',
		driverId: 'D-245',
		driverName: 'Driver Alpha-5',
		origin: 'Production Site Epsilon',
		destination: 'Port Terminal Alpha',
		customer: 'Shipping Corp Delta',
		onloadVolume: 28021.8,
		offloadVolume: 27349.4,
		volumeLoss: 672.4,
		volumeLossPercent: 2.4,
		avgTemp: 95.7,
		minTemp: 91.3,
		maxTemp: 101.2,
		startTime: new Date(Date.now() - 46800000),
		endTime: new Date(Date.now() - 39600000),
		duration: 290,
		distance: 374,
		efficiency: 88.9,
		revenue: 456.80,
		fuelCost: 163.50,
		status: 'completed',
		alerts: [
			{
				type: 'volume_loss',
				severity: 'medium',
				summary: '2.4% loss - approaching threshold',
				timestamp: new Date(Date.now() - 39600000)
			}
		],
		apiGravity: 38.9,
		waterCut: 0.9,
		h2sLevels: 0.7,
		pressureReadings: [146, 147, 148, 147, 146, 145],
		tempReadings: [96, 95, 94, 92, 91, 92, 94, 97, 99, 101],
		gpsTrail: [
			{ lat: 36.0000, lng: -96.0000, timestamp: new Date(Date.now() - 46800000) },
			{ lat: 35.3000, lng: -95.2000, timestamp: new Date(Date.now() - 43200000) },
			{ lat: 34.7000, lng: -94.5000, timestamp: new Date(Date.now() - 39600000) }
		]
	},
	{
		id: 'HL-001690',
		truckId: 'T-358',
		driverId: 'D-352',
		driverName: 'Driver Beta-5',
		origin: 'Collection Site Delta',
		destination: 'Export Terminal Beta',
		customer: 'Chemical Corp Epsilon',
		onloadVolume: 27834.6,
		offloadVolume: 27249.8,
		volumeLoss: 584.8,
		volumeLossPercent: 2.1,
		avgTemp: 92.1,
		minTemp: 87.8,
		maxTemp: 97.4,
		startTime: new Date(Date.now() - 54000000),
		endTime: new Date(Date.now() - 46800000),
		duration: 275,
		distance: 331,
		efficiency: 91.7,
		revenue: 489.70,
		fuelCost: 148.60,
		status: 'completed',
		alerts: [],
		apiGravity: 40.1,
		waterCut: 0.6,
		h2sLevels: 0.4,
		pressureReadings: [148, 149, 150, 149, 148, 147],
		tempReadings: [92, 91, 90, 88, 87, 88, 90, 93, 96, 97],
		gpsTrail: [
			{ lat: 34.5000, lng: -97.0000, timestamp: new Date(Date.now() - 54000000) },
			{ lat: 34.2000, lng: -96.5000, timestamp: new Date(Date.now() - 50400000) },
			{ lat: 33.8000, lng: -96.0000, timestamp: new Date(Date.now() - 46800000) }
		]
	}
];

// ================================
// Job Utilities
// ================================

export function getJobById(jobId: string): DemoJobData | undefined {
	return DEMO_HAULS.find(job => job.id === jobId);
}

export function getJobsByTruck(truckId: string): DemoJobData[] {
	return DEMO_HAULS.filter(job => job.truckId === truckId);
}

export function getJobsByDriver(driverId: string): DemoJobData[] {
	return DEMO_HAULS.filter(job => job.driverId === driverId);
}

export function getJobsByStatus(status: string): DemoJobData[] {
	return DEMO_HAULS.filter(job => job.status === status);
}

export function getJobsByCustomer(customer: string): DemoJobData[] {
	return DEMO_HAULS.filter(job => job.customer === customer);
}

export function getJobAlerts(): { jobId: string; alerts: any[] }[] {
	return DEMO_HAULS
		.filter(job => job.alerts.length > 0)
		.map(job => ({ jobId: job.id, alerts: job.alerts }));
}

export function getTopPerformingJobs(limit: number = 5): DemoJobData[] {
	return [...DEMO_HAULS]
		.sort((a, b) => b.efficiency - a.efficiency)
		.slice(0, limit);
}

export function getUnderperformingJobs(threshold: number = 85): DemoJobData[] {
	return DEMO_HAULS.filter(job => job.efficiency < threshold);
}

export function getHighVolumeLossJobs(threshold: number = 3.0): DemoJobData[] {
	return DEMO_HAULS.filter(job => job.volumeLossPercent > threshold);
}

export function calculateJobAverages() {
	const jobs = DEMO_HAULS;
	const count = jobs.length;
	
	return {
		averageEfficiency: jobs.reduce((sum, job) => sum + job.efficiency, 0) / count,
		averageVolumeLoss: jobs.reduce((sum, job) => sum + job.volumeLossPercent, 0) / count,
		averageRevenue: jobs.reduce((sum, job) => sum + job.revenue, 0) / count,
		averageFuelCost: jobs.reduce((sum, job) => sum + job.fuelCost, 0) / count,
		averageDuration: jobs.reduce((sum, job) => sum + job.duration, 0) / count,
		averageDistance: jobs.reduce((sum, job) => sum + job.distance, 0) / count
	};
}

export function getJobsByDateRange(startDate: Date, endDate: Date): DemoJobData[] {
	return DEMO_HAULS.filter(job => 
		job.startTime >= startDate && job.startTime <= endDate
	);
} 