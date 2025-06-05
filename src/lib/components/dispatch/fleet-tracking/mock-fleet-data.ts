import type { FleetAsset } from './types/fleet-tracking.types.js';

// Mock fleet data with anonymized coordinates (updated to match FleetAsset interface)
export const mockTrucks: FleetAsset[] = [
	{ 
		id: 'FL-001', 
		lat: 35.0000, 
		lng: -98.0000, 
		driver: 'Driver Alpha-1', 
		status: 'transit' as const,
		currentJob: 'Pickup at Production Site',
		eta: '14:30',
		speed: 58,
		bearing: 45,
		lastUpdate: new Date()
	},
	{ 
		id: 'FL-002', 
		lat: 35.1500, 
		lng: -97.8500, 
		driver: 'Driver Alpha-2', 
		status: 'loading' as const,
		currentJob: 'Loading at Collection Hub',
		eta: '16:45',
		speed: 0,
		bearing: 0,
		lastUpdate: new Date()
	},
	{ 
		id: 'FL-003', 
		lat: 35.2000, 
		lng: -97.7000, 
		driver: 'Driver Beta-1', 
		status: 'delivery' as const,
		currentJob: 'Unloading at destination',
		eta: '12:15',
		speed: 0,
		bearing: 0,
		lastUpdate: new Date()
	},
	{ 
		id: 'FL-004', 
		lat: 36.0000, 
		lng: -96.0000, 
		driver: 'Driver Beta-2', 
		status: 'available' as const,
		currentJob: 'Available for dispatch',
		eta: '10:00',
		speed: 0,
		bearing: 0,
		lastUpdate: new Date()
	}
];

// Mock yard locations with anonymized coordinates
export const mockYards = [
	{ 
		id: 'alpha-yard', 
		name: 'Metro Hub Alpha', 
		lat: 35.0000, 
		lng: -98.0000,
		trucks: 12,
		status: 'operational'
	},
	{ 
		id: 'beta-yard', 
		name: 'Metro Hub Beta', 
		lat: 35.1000, 
		lng: -97.9000,
		trucks: 8,
		status: 'operational'
	},
	{ 
		id: 'gamma-yard', 
		name: 'Metro Hub Gamma', 
		lat: 36.0000, 
		lng: -96.0000,
		trucks: 6,
		status: 'maintenance'
	}
]; 