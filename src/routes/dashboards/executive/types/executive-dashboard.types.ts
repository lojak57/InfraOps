// Executive Dashboard Types - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @original-size: Part of 613-line component → @current-size: ~50 lines  
// @phase: Phase 7 - Executive Dashboard Components
// @extractors: Tab configuration, chart config, and dashboard types

import type { ComponentType } from 'svelte';

export interface DashboardTab {
	id: string;
	label: string;
	icon: ComponentType;
}

export interface ChartPadding {
	paddingLeft: number;
	paddingRight: number;
	paddingTop: number;
	paddingBottom: number;
}

export interface MetricCardConfig {
	title: string;
	value: string;
	unit: string;
	icon: ComponentType;
	status: 'normal' | 'warning' | 'critical';
	trend: 'up' | 'down' | 'stable';
	trendValue: string;
	color: 'emerald' | 'blue' | 'orange' | 'slate';
	clickable?: boolean;
	onClick?: () => void;
}

export interface ChartConfig {
	title: string;
	color: string;
	height: number;
	unit: string;
	animated: boolean;
}

export interface ExecutiveDashboardEvents {
	'tab-changed': { activeTab: string };
	'safety-clicked': void;
	'export-report': void;
	'refresh-data': void;
}

export type TabId = 'overview' | 'financial' | 'operations' | 'strategic';

export interface ActionButton {
	icon: ComponentType;
	label: string;
	onClick: () => void;
} 