// Regional Dashboard Store - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 1 - Critical Components

import { writable, derived } from 'svelte/store';
import type { Region, RegionalPerformance, RegionalState } from '../types/regional.types.js';

// Regional data - consolidated to regional rollups only (no states)
const regions: Region[] = [
	{
		id: 'gulf-coast',
		name: 'Gulf Coast',
		color: '#475569' // Steel gray
	},
	{
		id: 'southwest',
		name: 'Southwest TX',
		color: '#B45309' // Industrial orange
	},
	{
		id: 'rockies',
		name: 'Rockies',
		color: '#374151' // Dark charcoal
	},
	{
		id: 'midcon',
		name: 'Midcon',
		color: '#7C2D12' // Deep rust red
	}
];

// Regional performance data - scalable structure with proper typing
const regionalData: Record<string, RegionalPerformance> = {
	'Gulf Coast': {
		fleetSize: 142,
		activeTrucks: 125,
		driversAssigned: 234,
		totalBPD: 12847,
		avgDriveTime: 3.2,
		unitsPerHour: 185.3,
		efficiency: 94.2,
		utilization: 88.0,
		trend: 'up',
		status: 'excellent'
	},
	'Southwest TX': {
		fleetSize: 89,
		activeTrucks: 78,
		driversAssigned: 156,
		totalBPD: 8456,
		avgDriveTime: 3.8,
		unitsPerHour: 165.2,
		efficiency: 91.8,
		utilization: 87.6,
		trend: 'stable',
		status: 'good'
	},
	'Rockies': {
		fleetSize: 67,
		activeTrucks: 54,
		driversAssigned: 98,
		totalBPD: 5987,
		avgDriveTime: 4.2,
		unitsPerHour: 142.8,
		efficiency: 87.3,
		utilization: 80.6,
		trend: 'down',
		status: 'attention'
	},
	'Midcon': {
		fleetSize: 104,
		activeTrucks: 92,
		driversAssigned: 178,
		totalBPD: 9124,
		avgDriveTime: 3.5,
		unitsPerHour: 168.7,
		efficiency: 92.5,
		utilization: 88.5,
		trend: 'up',
		status: 'excellent'
	}
};

// Store state
export const activeRegion = writable<string>('Gulf Coast');
export const showYardComparison = writable<boolean>(false);
export const selectedRegion = writable<string>('');

// Read-only derived stores
export const regionsStore = writable(regions);
export const regionalDataStore = writable(regionalData);

// Derived store for current region data
export const currentRegionData = derived(
	[activeRegion, regionalDataStore],
	([$activeRegion, $regionalData]) => $regionalData[$activeRegion]
);

// Actions
export const regionalActions = {
	selectRegion: (regionName: string) => {
		activeRegion.set(regionName);
	},
	
	openYardComparison: (regionName: string) => {
		selectedRegion.set(regionName);
		showYardComparison.set(true);
	},
	
	closeYardComparison: () => {
		showYardComparison.set(false);
		selectedRegion.set('');
	},
	
	getRegionColor: (regionName: string): string => {
		const region = regions.find(r => r.name === regionName);
		return region ? region.color : '#6B7280';
	}
}; 