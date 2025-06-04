export interface Driver {
	id: string;
	name: string;
	hoursRemaining: number;
	status: string;
	lastLocation: string;
}

export interface UnavailableDriver {
	id: string;
	name: string;
	reason: string;
	returnDate: string;
}

export interface Route {
	id: string;
	driver: string;
	truck: string;
	route: string;
	status: string;
	eta: string;
	currentJob: string;
}

export interface MapTruck {
	id: string;
	driver: string;
	lat: number;
	lng: number;
	currentJob: string;
	eta: string;
	status: string;
}

export interface Assignment {
	id: string;
	route: string;
	priority: string;
	pickupTime: string;
	estimatedDuration: string;
}

export interface TruckStatus {
	available: number;
	inMaintenance: number;
	total: number;
}

export interface SectionStates {
	pendingAssignments: boolean;
	availableDrivers: boolean;
	activeRoutes: boolean;
	outOfService: boolean;
	fleetStatus: boolean;
}

export interface DispatchState {
	sectionStates: SectionStates;
	showAssignmentModal: boolean;
	selectedAssignment: Assignment | null;
	selectedDriver: string;
	showFullscreenMap: boolean;
}

export interface DispatchData {
	availableDrivers: Driver[];
	unavailableDrivers: UnavailableDriver[];
	activeRoutes: Route[];
	mapTrucks: MapTruck[];
	pendingAssignments: Assignment[];
	truckStatus: TruckStatus;
}

export interface AssignmentActions {
	openAssignment: (assignment: Assignment) => void;
	assignDriver: () => void;
	cancelAssignment: () => void;
} 