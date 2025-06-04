// Re-exports for backward compatibility
// This file has been refactored into modular components:
// - Types: ./types/dispatch-analytics.types.ts
// - Demo Data: ./data/dispatch-demo-data.ts  
// - Store Logic: ./dispatch-analytics.store.ts

export type { 
	DemoAlert,
	DemoJobData,
	DemoTruckData,
	DemoYardData,
	DemoFleetData,
	DrillDownLevel,
	ViewMode,
	DispatchAnalyticsState
} from './types/dispatch-analytics.types';

export {
	DEMO_FLEET,
	DEMO_YARDS,
	DEMO_TRUCKS,
	DEMO_HAULS
} from './data/dispatch-demo-data';

export {
	dispatchAnalytics,
	currentLevel,
	selectedYard,
	selectedTruck,
	selectedJob,
	viewMode,
	demoMode,
	currentYardData,
	currentTruckData,
	currentJobData,
	yardsForCurrentLevel,
	trucksForCurrentYard,
	jobsForCurrentTruck
} from './dispatch-analytics.store'; 