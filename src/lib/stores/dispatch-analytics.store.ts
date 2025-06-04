import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import type { 
	DispatchAnalyticsState, 
	DrillDownLevel, 
	ViewMode 
} from './types/dispatch-analytics.types';
import { 
	DEMO_FLEET, 
	DEMO_YARDS, 
	DEMO_TRUCKS, 
	DEMO_HAULS 
} from './data/dispatch-demo-data';

// Create the store
function createDispatchAnalyticsStore() {
	const initialState: DispatchAnalyticsState = {
		currentLevel: 'fleet',
		selectedYard: null,
		selectedTruck: null,
		selectedJob: null,
		viewMode: 'analytics',
		timeframe: 'today',
		demoMode: true,
		simulatedUpdates: true,
		lastUpdate: new Date(),
		autoAdvance: false,
		demoFleet: DEMO_FLEET,
		demoYards: DEMO_YARDS,
		demoTrucks: DEMO_TRUCKS,
		demoJobs: DEMO_HAULS
	};

	const { subscribe, set, update } = writable(initialState);

	return {
		subscribe,
		set,
		update,
		
		// Drill-down actions
		drillDown: (level: DrillDownLevel, id: string) => {
			update(state => {
				const newState = { ...state };
				
				switch (level) {
					case 'yard':
						newState.currentLevel = 'yard';
						newState.selectedYard = id;
						newState.selectedTruck = null;
						newState.selectedJob = null;
						break;
					case 'truck':
						newState.currentLevel = 'truck';
						newState.selectedTruck = id;
						newState.selectedJob = null;
						break;
					case 'job':
						newState.currentLevel = 'job';
						newState.selectedJob = id;
						break;
				}
				
				return newState;
			});
		},
		
		drillUp: () => {
			update(state => {
				const newState = { ...state };
				
				switch (state.currentLevel) {
					case 'job':
						newState.currentLevel = 'truck';
						newState.selectedJob = null;
						break;
					case 'truck':
						newState.currentLevel = 'yard';
						newState.selectedTruck = null;
						newState.selectedJob = null;
						break;
					case 'yard':
						newState.currentLevel = 'fleet';
						newState.selectedYard = null;
						newState.selectedTruck = null;
						newState.selectedJob = null;
						break;
				}
				
				return newState;
			});
		},
		
		resetToFleet: () => {
			update(state => ({
				...state,
				currentLevel: 'fleet',
				selectedYard: null,
				selectedTruck: null,
				selectedJob: null
			}));
		},
		
		setViewMode: (mode: ViewMode) => {
			update(state => ({ ...state, viewMode: mode }));
		},
		
		setTimeframe: (timeframe: 'today' | 'week' | 'month' | 'quarter') => {
			update(state => ({ ...state, timeframe }));
		},
		
		toggleDemoMode: () => {
			update(state => ({ ...state, demoMode: !state.demoMode }));
		},
		
		toggleSimulatedUpdates: () => {
			update(state => ({ ...state, simulatedUpdates: !state.simulatedUpdates }));
		},
		
		updateLastRefresh: () => {
			update(state => ({ ...state, lastUpdate: new Date() }));
		}
	};
}

export const dispatchAnalytics = createDispatchAnalyticsStore();

// Derived stores for easier access
export const currentLevel = derived(dispatchAnalytics, $state => $state.currentLevel);
export const selectedYard = derived(dispatchAnalytics, $state => $state.selectedYard);
export const selectedTruck = derived(dispatchAnalytics, $state => $state.selectedTruck);
export const selectedJob = derived(dispatchAnalytics, $state => $state.selectedJob);
export const viewMode = derived(dispatchAnalytics, $state => $state.viewMode);
export const demoMode = derived(dispatchAnalytics, $state => $state.demoMode);

// Computed data stores
export const currentYardData = derived(
	[dispatchAnalytics, selectedYard],
	([$state, $selectedYard]) => {
		if (!$selectedYard) return null;
		return $state.demoYards.find(yard => yard.id === $selectedYard) || null;
	}
);

export const currentTruckData = derived(
	[dispatchAnalytics, selectedTruck],
	([$state, $selectedTruck]) => {
		if (!$selectedTruck) return null;
		return $state.demoTrucks.find(truck => truck.id === $selectedTruck) || null;
	}
);

export const currentJobData = derived(
	[dispatchAnalytics, selectedJob],
	([$state, $selectedJob]) => {
		if (!$selectedJob) return null;
		return $state.demoJobs.find(job => job.id === $selectedJob) || null;
	}
);

export const yardsForCurrentLevel = derived(
	dispatchAnalytics,
	$state => $state.demoYards
);

export const trucksForCurrentYard = derived(
	[dispatchAnalytics, selectedYard],
	([$state, $selectedYard]) => {
		if (!$selectedYard) return [];
		return $state.demoTrucks.filter(truck => truck.yardId === $selectedYard);
	}
);

export const jobsForCurrentTruck = derived(
	[dispatchAnalytics, selectedTruck],
	([$state, $selectedTruck]) => {
		if (!$selectedTruck) return [];
		return $state.demoJobs.filter(job => job.truckId === $selectedTruck);
	}
);

// Demo simulation
if (browser) {
	let updateInterval: number;
	
	dispatchAnalytics.subscribe(state => {
		if (state.simulatedUpdates && state.demoMode) {
			if (updateInterval) clearInterval(updateInterval);
			
			updateInterval = setInterval(() => {
				dispatchAnalytics.updateLastRefresh();
			}, 30000); // Update every 30 seconds
		} else {
			if (updateInterval) clearInterval(updateInterval);
		}
	});
} 