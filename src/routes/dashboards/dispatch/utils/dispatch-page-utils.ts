import type { Driver, UnavailableDriver, Route, MapTruck, Assignment, TruckStatus, SectionStates, DispatchState } from '../types/dispatch-page.types';

// Mock data generators
export function generateAvailableDrivers(): Driver[] {
	return [
		{ id: 'D001', name: 'Driver Alpha-1', hoursRemaining: 8.5, status: 'available', lastLocation: 'Metro Hub Alpha' },
		{ id: 'D002', name: 'Driver Beta-2', hoursRemaining: 6.2, status: 'available', lastLocation: 'Metro Hub Beta' },
		{ id: 'D003', name: 'Driver Gamma-3', hoursRemaining: 4.8, status: 'available', lastLocation: 'Metro Hub Gamma' },
		{ id: 'D004', name: 'Driver Delta-4', hoursRemaining: 7.1, status: 'available', lastLocation: 'Metro Hub Delta' }
	];
}

export function generateUnavailableDrivers(): UnavailableDriver[] {
	return [
		{ id: 'D005', name: 'Driver Epsilon-5', reason: 'Hours Exceeded', returnDate: '2024-01-20' },
		{ id: 'D006', name: 'Driver Zeta-6', reason: 'Vacation', returnDate: '2024-01-22' },
		{ id: 'D007', name: 'Driver Eta-7', reason: 'Maintenance Training', returnDate: '2024-01-19' }
	];
}

export function generateActiveRoutes(): Route[] {
	return [
		{
			id: 'R001',
			driver: 'Driver Theta-8',
			truck: 'FL-1001',
			route: 'Production Basin → Processing Terminal',
			eta: '14:30',
			status: 'en-route',
			currentJob: 'In Transit'
		},
		{
			id: 'R002',
			driver: 'Driver Iota-9',
			truck: 'FL-1002',
			route: 'Collection Site → Distribution Hub',
			eta: '13:45',
			status: 'en-route',
			currentJob: 'Near Destination'
		},
		{
			id: 'R003',
			driver: 'Driver Kappa-10',
			truck: 'FL-1003',
			route: 'Processing Facility → Storage Terminal',
			eta: '16:15',
			status: 'loading',
			currentJob: 'Loading'
		},
		{
			id: 'R004',
			driver: 'Driver Lambda-11',
			truck: 'FL-1004',
			route: 'Distribution Center → Port Terminal',
			eta: '12:20',
			status: 'unloading',
			currentJob: 'Delivery'
		}
	];
}

export function generateMapTrucks(): MapTruck[] {
	return [
		{ 
			id: 'T-156', 
			driver: 'Driver Alpha-1', 
			lat: 35.0000, 
			lng: -98.0000, 
			currentJob: 'Pickup at Production Site',
			eta: '14:30',
			status: 'en-route'
		},
		{ 
			id: 'T-203', 
			driver: 'Driver Alpha-2', 
			lat: 35.1500, 
			lng: -97.8500, 
			currentJob: 'Loading at Collection Hub',
			eta: '16:45',
			status: 'loading'
		},
		{ 
			id: 'T-089', 
			driver: 'Driver Beta-1', 
			lat: 35.2000, 
			lng: -97.7000, 
			currentJob: 'Delivery to Distribution Center',
			eta: '12:15',
			status: 'unloading'
		},
		{ 
			id: 'T-234', 
			driver: 'Driver Beta-2', 
			lat: 36.0000, 
			lng: -96.0000, 
			currentJob: 'En route to pickup',
			eta: '15:20',
			status: 'en-route'
		},
		{ 
			id: 'T-167', 
			driver: 'Driver Gamma-1', 
			lat: 34.5000, 
			lng: -97.0000, 
			currentJob: 'Unloading at destination',
			eta: '13:45',
			status: 'unloading'
		}
	];
}

export function generatePendingAssignments(): Assignment[] {
	return [
		{
			id: 'A001',
			route: 'Production Site Alpha → Processing Terminal Beta',
			priority: 'high',
			pickupTime: '15:00',
			estimatedDuration: '4.5h'
		},
		{
			id: 'A002',
			route: 'Collection Hub Gamma → Distribution Center Delta',
			priority: 'normal',
			pickupTime: '16:30',
			estimatedDuration: '3.2h'
		}
	];
}

export function generateTruckStatus(): TruckStatus {
	return {
		available: 12,
		inMaintenance: 10,
		total: 22
	};
}

export function getInitialSectionStates(): SectionStates {
	return {
		pendingAssignments: true,  // Always open if pending > 0
		availableDrivers: true,    // Default open 
		activeRoutes: true,        // Default open
		outOfService: false,       // Default collapsed
		fleetStatus: false         // Default collapsed
	};
}

// Business logic functions
export function getStatusColor(status: string): string {
	switch (status) {
		case 'en-route': return '#3B82F6';
		case 'pickup': return '#F59E0B';
		case 'delivery': return '#10B981';
		case 'assigned': return '#8B5CF6';
		default: return '#6B7280';
	}
}

export function removeFromPendingAssignments(assignments: Assignment[], assignmentId: string): Assignment[] {
	return assignments.filter(p => p.id !== assignmentId);
}

export function createNewRoute(driver: Driver, assignment: Assignment): Route {
	return {
		id: 'R' + (Date.now().toString().slice(-3)),
		driver: driver.name,
		truck: 'T-' + Math.floor(Math.random() * 999).toString().padStart(3, '0'),
		route: assignment.route,
		status: 'assigned',
		eta: 'TBD',
		currentJob: 'Assigned'
	};
}

export function addToActiveRoutes(routes: Route[], newRoute: Route): Route[] {
	return [...routes, newRoute];
}

export function removeFromAvailableDrivers(drivers: Driver[], driverId: string): Driver[] {
	return drivers.filter(d => d.id !== driverId);
}

export function findDriverById(drivers: Driver[], driverId: string): Driver | undefined {
	return drivers.find(d => d.id === driverId);
}

export function updateSectionState(sectionStates: SectionStates, sectionKey: string, isOpen: boolean): SectionStates {
	return {
		...sectionStates,
		[sectionKey]: isOpen
	};
}

export function shouldAutoOpenPendingAssignments(pendingCount: number, sectionStates: SectionStates): SectionStates {
	if (pendingCount > 0) {
		return {
			...sectionStates,
			pendingAssignments: true
		};
	}
	return sectionStates;
} 