// Truck Status Display Types - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan  
// @phase: Phase 2 - High Priority Components

import type { TruckMetrics } from '$lib/stores/calibrationData';

export interface TruckStatusViewMode {
	viewMode: 'table' | 'grid';
	sortBy: 'id' | 'lastCalibrated' | 'avgLoadDelta' | 'status';
	sortDirection: 'asc' | 'desc';
	filterStatus: 'all' | 'good' | 'warning' | 'critical';
	searchTerm: string;
}

export interface TruckStatusFilters {
	searchTerm: string;
	filterStatus: 'all' | 'good' | 'warning' | 'critical';
}

export interface TruckStatusSorting {
	sortBy: 'id' | 'lastCalibrated' | 'avgLoadDelta' | 'status';
	sortDirection: 'asc' | 'desc';
}

export interface TruckSelectionState {
	selectedTrucks: string[];
	showSelectionActions: boolean;
	allVisible: boolean;
}

export interface TruckDisplaySettings {
	viewMode: 'table' | 'grid';
	showActions: boolean;
	maxHeight: number;
}

export interface TruckStatusColumnConfig {
	key: string;
	label: string;
	sortable: boolean;
	width?: string;
	align?: 'left' | 'center' | 'right';
	className?: string;
}

export interface TruckCalibrationPercentage {
	truckId: string;
	percentage: number;
	threshold: number;
	isLow: boolean;
}

export interface TruckActionConfig {
	showDetails: boolean;
	showCalibrate: boolean;
	showBulkActions: boolean;
}

export interface TruckStatusEventData {
	type: 'view-details' | 'schedule-calibration' | 'bulk-action' | 'sort-change' | 'filter-change';
	truck?: TruckMetrics;
	truckIds?: string[];
	sortConfig?: TruckStatusSorting;
	filters?: TruckStatusFilters;
}

// Extended truck metrics with calculated fields
export interface ExtendedTruckMetrics extends TruckMetrics {
	calibrationPercentage: number;
	daysAgoText: string;
	deltaText: string;
	statusIcon: string;
	statusLabel: string;
	priorityLevel: 'high' | 'medium' | 'low';
}

export { type TruckMetrics }; 