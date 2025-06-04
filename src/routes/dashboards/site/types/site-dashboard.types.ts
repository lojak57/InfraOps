// Site Dashboard Types - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @original-size: Part of 603-line component → @current-size: ~80 lines  
// @phase: Phase 8 - Site Dashboard Components
// @extractors: Tab configuration, fleet data, performance metrics, and dashboard types

import type { ComponentType } from 'svelte';

export interface BatteryStatusItem {
	id: string;
	label: string;
	value: string;
	status: 'excellent' | 'good' | 'warning' | 'critical';
	percentage: number;
	sparklineData: number[];
	location: string;
	lastUpdated: string;
}

export interface FleetItem {
	id: string;
	name: string;
	status: string;
	extra: string;
}

export interface FleetSection {
	count: number;
	items: FleetItem[];
}

export interface FleetData {
	active: FleetSection;
	maintenance: FleetSection;
	available: FleetSection;
}

export interface FleetSections {
	active: boolean;
	maintenance: boolean;
	available: boolean;
}

export interface PerformanceCard {
	id: string;
	status: 'excellent' | 'good' | 'warning';
	icon: ComponentType;
	statusLabel: string;
	title: string;
	value: string;
	description: string;
	actionLabel: string;
}

export interface QuickStat {
	label: string;
	value: string;
	withTrend?: boolean;
	trendValue?: number;
}

export interface OperationCard {
	title: string;
	value: string;
	description: string;
	withTrend?: boolean;
	trendValue?: number;
}

export interface SiteDashboardEvents {
	'tab-changed': { activeTab: SiteTabId };
	'analytics-opened': void;
	'analytics-closed': void;
	'fleet-section-toggled': { section: string; expanded: boolean };
}

export type SiteTabId = 'operator-management' | 'asset-overview' | 'site-ops';

export interface SiteTab {
	id: SiteTabId;
	label: string;
	icon: ComponentType;
} 