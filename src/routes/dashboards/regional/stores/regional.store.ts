// Regional Dashboard Store - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 1 - Critical Components

import { writable, derived } from 'svelte/store';
import type { Region, RegionalPerformance, RegionalState } from '../types/regional.types.js';
import type { RegionalData } from '../types/regional.types';

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

// Mock regional data with anonymized locations and generic units
export const regionalData: Record<string, RegionalData> = {
	'metro-alpha': {
		id: 'metro-alpha',
		name: 'Metro Hub Alpha',
		region: 'Eastern Region',
		coordinates: { lat: 35.0000, lng: -98.0000 },
		totalTrucks: 34,
		activeTrucks: 31,
		driversAssigned: 52,
		efficiency: 94.2,
		utilizationRate: 91.2,
		avgDriveTime: 2.8,
		unitsPerHour: 198.7,
		dailyUnits: 12847,
		alerts: 2,
		status: 'excellent',
		lastUpdate: new Date('2024-01-15T10:30:00'),
		monthlyRevenue: 1247000,
		fuelEfficiency: 7.2
	},
	'metro-beta': {
		id: 'metro-beta',
		name: 'Metro Hub Beta',
		region: 'Central Region',
		coordinates: { lat: 36.0000, lng: -96.0000 },
		totalTrucks: 28,
		activeTrucks: 24,
		driversAssigned: 42,
		efficiency: 89.1,
		utilizationRate: 85.7,
		avgDriveTime: 3.2,
		unitsPerHour: 165.3,
		dailyUnits: 8456,
		alerts: 5,
		status: 'good',
		lastUpdate: new Date('2024-01-15T10:45:00'),
		monthlyRevenue: 967000,
		fuelEfficiency: 6.8
	},
	'metro-gamma': {
		id: 'metro-gamma',
		name: 'Metro Hub Gamma',
		region: 'Northern Region',
		coordinates: { lat: 34.0000, lng: -97.0000 },
		totalTrucks: 22,
		activeTrucks: 18,
		driversAssigned: 34,
		efficiency: 82.3,
		utilizationRate: 81.8,
		avgDriveTime: 3.8,
		unitsPerHour: 142.8,
		dailyUnits: 5987,
		alerts: 8,
		status: 'attention',
		lastUpdate: new Date('2024-01-15T10:15:00'),
		monthlyRevenue: 634000,
		fuelEfficiency: 6.1
	},
	'metro-delta': {
		id: 'metro-delta',
		name: 'Metro Hub Delta',
		region: 'Western Region',
		coordinates: { lat: 37.0000, lng: -95.0000 },
		totalTrucks: 19,
		activeTrucks: 15,
		driversAssigned: 28,
		efficiency: 87.9,
		utilizationRate: 78.9,
		avgDriveTime: 4.2,
		unitsPerHour: 156.4,
		dailyUnits: 9124,
		alerts: 3,
		status: 'good',
		lastUpdate: new Date('2024-01-15T09:50:00'),
		monthlyRevenue: 823000,
		fuelEfficiency: 6.9
	}
};

// Store state
export const activeRegion = writable<string>('Gulf Coast');
export const showYardComparison = writable<boolean>(false);
export const selectedRegion = writable<string>('metro-alpha');

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