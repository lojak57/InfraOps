import type { YardData } from './regional-yard.types';

export const mockYardComparison: YardData[] = [
  {
    yardName: 'Metro Hub Beta',
    location: 'Central Region',
    fleetSize: 28,
    activeTrucks: 24,
    driversAssigned: 42,
    dailyUnits: 2847,
    avgDriveTime: 3.2,
    unitsPerHour: 185.3,
    utilizationRate: 85.7,
    efficiency: 94.2,
    rank: 2,
    trend: 'up',
    status: 'excellent',
    notes: 'Peak performer - model yard',
    sparklineData: [2650, 2720, 2780, 2810, 2847, 2890, 2920]
  },
  {
    yardName: 'Metro Hub Gamma',
    location: 'Northern Region',
    fleetSize: 22,
    activeTrucks: 18,
    driversAssigned: 34,
    dailyUnits: 2456,
    avgDriveTime: 3.8,
    unitsPerHour: 165.2,
    utilizationRate: 81.8,
    efficiency: 91.8,
    rank: 3,
    trend: 'stable',
    status: 'good',
    notes: 'Consistent performance',
    sparklineData: [2320, 2380, 2420, 2440, 2456, 2470, 2480]
  },
  {
    yardName: 'Metro Hub Alpha',
    location: 'Eastern Region',
    fleetSize: 35,
    activeTrucks: 31,
    driversAssigned: 58,
    dailyUnits: 3124,
    avgDriveTime: 2.9,
    unitsPerHour: 198.7,
    utilizationRate: 88.6,
    efficiency: 96.1,
    rank: 1,
    trend: 'up',
    status: 'excellent',
    notes: 'Highest efficiency in region',
    sparklineData: [2950, 3020, 3080, 3100, 3124, 3150, 3180]
  },
  {
    yardName: 'Metro Hub Delta',
    location: 'Western Region',
    fleetSize: 19,
    activeTrucks: 15,
    driversAssigned: 28,
    dailyUnits: 1987,
    avgDriveTime: 4.2,
    unitsPerHour: 142.8,
    utilizationRate: 78.9,
    efficiency: 87.3,
    rank: 4,
    trend: 'down',
    status: 'attention',
    notes: 'Needs operational review',
    sparklineData: [2150, 2100, 2050, 2020, 1987, 1960, 1940]
  }
];

// Regional Yard Analytics - Anonymized Demo Data
export const REGIONAL_YARDS = [
	{
		id: 'alpha-yard',
		name: 'Metro Hub Alpha',
		region: 'Central Region',
		coordinates: { lat: 35.0000, lng: -98.0000 },
		totalTrucks: 23,
		activeTrucks: 21,
		efficiency: 94.2,
		avgVolumeLoss: 1.8,
		status: 'excellent',
		monthlyRevenue: 847000,
		alerts: []
	},
	{
		id: 'beta-yard',
		name: 'Metro Hub Beta', 
		region: 'Northern Region',
		coordinates: { lat: 36.0000, lng: -96.0000 },
		totalTrucks: 19,
		activeTrucks: 17,
		efficiency: 91.7,
		avgVolumeLoss: 2.1,
		status: 'good',
		monthlyRevenue: 723000,
		alerts: [
			{ type: 'efficiency', severity: 'medium', message: 'Efficiency below target' }
		]
	},
	{
		id: 'gamma-yard',
		name: 'Metro Hub Gamma',
		region: 'Southern Region', 
		coordinates: { lat: 34.0000, lng: -97.0000 },
		totalTrucks: 15,
		activeTrucks: 13,
		efficiency: 88.9,
		avgVolumeLoss: 2.4,
		status: 'attention',
		monthlyRevenue: 634000,
		alerts: [
			{ type: 'maintenance', severity: 'high', message: 'Truck FL-205 requires service' },
			{ type: 'volume_loss', severity: 'medium', message: 'Above average volume loss detected' }
		]
	}
]; 