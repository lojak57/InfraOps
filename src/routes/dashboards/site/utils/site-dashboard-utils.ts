// Site Dashboard Utilities - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @original-size: Part of 603-line component → @current-size: ~150 lines  
// @phase: Phase 8 - Site Dashboard Components
// @extractors: Mock data, tab configuration, and utility functions

import { Users, Truck, BarChart3, TrendingUp, AlertTriangle } from 'lucide-svelte';
import type { 
	SiteTab, 
	BatteryStatusItem, 
	FleetData, 
	PerformanceCard, 
	QuickStat, 
	OperationCard 
} from '../types/site-dashboard.types.js';

// Tab configuration
export function getSiteTabs(): SiteTab[] {
	return [
		{ id: 'operator-management', label: 'Operator Management', icon: Users },
		{ id: 'asset-overview', label: 'Asset Overview', icon: Truck },
		{ id: 'site-ops', label: 'Site Operations', icon: BarChart3 }
	];
}

// Driver Management Battery Data
export function getDriverStatusItems(): BatteryStatusItem[] {
	return [
		{
			id: 'duty-status',
			label: 'Duty Status',
			value: '18/24',
			status: 'excellent',
			percentage: 75,
			sparklineData: [16, 17, 18, 17, 18, 19, 18],
			location: 'North Yard',
			lastUpdated: '2 min ago'
		},
		{
			id: 'current-location',
			label: 'En Route',
			value: '12',
			status: 'good',
			percentage: 67,
			sparklineData: [10, 11, 12, 11, 13, 12, 12],
			location: 'Various',
			lastUpdated: '30 sec ago'
		},
		{
			id: 'last-load',
			label: 'Load Time Avg',
			value: '42min',
			status: 'warning',
			percentage: 45,
			sparklineData: [38, 40, 42, 45, 44, 42, 43],
			location: 'Loading Bays',
			lastUpdated: '1 min ago'
		}
	];
}

// Fleet Status Data
export function getFleetData(): FleetData {
	return {
		active: {
			count: 18,
			items: [
				{ id: 'T-001', name: 'T-001', status: 'On Route', extra: 'ETA: 2:15 PM' },
				{ id: 'T-003', name: 'T-003', status: 'Loading', extra: 'Bay #3' },
				{ id: 'T-005', name: 'T-005', status: 'In Transit', extra: '15 min to dest' },
				{ id: 'T-007', name: 'T-007', status: 'Ready', extra: 'Awaiting dispatch' },
				{ id: 'T-009', name: 'T-009', status: 'Active', extra: 'Driver en route' }
			]
		},
		maintenance: {
			count: 3,
			items: [
				{ id: 'T-012', name: 'T-012', status: 'Service', extra: 'Scheduled maintenance' },
				{ id: 'T-018', name: 'T-018', status: 'Inspection', extra: 'DOT inspection due' },
				{ id: 'T-024', name: 'T-024', status: 'Repair', extra: 'Brake system repair' }
			]
		},
		available: {
			count: 3,
			items: [
				{ id: 'T-002', name: 'T-002', status: 'Ready', extra: 'Fueled and inspected' },
				{ id: 'T-016', name: 'T-016', status: 'Standby', extra: 'Driver break' },
				{ id: 'T-021', name: 'T-021', status: 'Ready', extra: 'Available for dispatch' }
			]
		}
	};
}

// Performance Cards Data
export function getPerformanceCards(): PerformanceCard[] {
	return [
		{
			id: 'daily-throughput',
			status: 'excellent',
			icon: TrendingUp,
			statusLabel: 'EXCELLENT',
			title: 'Daily Throughput',
			value: '2,847 units',
			description: 'vs yesterday',
			actionLabel: 'View Details'
		},
		{
			id: 'units-per-drive',
			status: 'good',
			icon: BarChart3,
			statusLabel: 'GOOD',
			title: 'Units per Drive Hour',
			value: '185.3',
			description: 'Above target efficiency',
			actionLabel: 'View Details'
		},
		{
			id: 'load-efficiency',
			status: 'warning',
			icon: AlertTriangle,
			statusLabel: 'REVIEW',
			title: 'Load Efficiency Index',
			value: '4.2',
			description: '3 assets in maintenance',
			actionLabel: 'View Details'
		}
	];
}

// Quick Stats Data
export function getQuickStats(): QuickStat[] {
	return [
		{ label: 'Active Assets', value: '75.3%' },
		{ label: 'Operators En Route', value: '68.2%' },
		{ label: '7-Day Average', value: '2,701 units' },
		{ label: 'Efficiency Rating', value: '92.3%', withTrend: true, trendValue: 2.1 }
	];
}

// Operations Summary Data
export function getOperationCards(): OperationCard[] {
	return [
		{
			title: 'Loading Efficiency',
			value: '94.7%',
			description: 'improvement',
			withTrend: true,
			trendValue: 2.1
		},
		{
			title: 'Safety Incidents',
			value: '0',
			description: '247 days incident-free'
		}
	];
}

// Utility functions
export function getFleetSectionKey(section: string): 'active' | 'maintenance' | 'available' {
	const sectionKey = section.toLowerCase().split(' ')[0];
	return sectionKey as 'active' | 'maintenance' | 'available';
} 