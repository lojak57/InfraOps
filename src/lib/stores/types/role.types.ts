/**
 * Role System Types
 * 
 * Type definitions for role-based dashboard system including metrics,
 * charts, layouts, and configuration structures.
 */

// ================================
// Core Role Types
// ================================

export type RoleId = 'overview' | 'executive' | 'driver' | 'dispatch' | 'yard-manager' | 'regional-manager';

export interface MetricConfig {
	id: string;
	label: string;
	value: string | number;
	unit?: string;
	trend?: 'up' | 'down' | 'stable';
	trendValue?: string;
	priority: 'hero' | 'primary' | 'secondary';
	impact: 'high' | 'medium' | 'low';
	description: string;
}

export interface ChartConfig {
	id: string;
	type: 'line' | 'bar' | 'doughnut' | 'gauge' | 'map';
	title: string;
	priority: 'hero' | 'primary' | 'secondary';
	relevance: string;
}

export interface LayoutConfig {
	heroMetrics: string[];
	primaryMetrics: string[];
	secondaryMetrics: string[];
	heroCharts: string[];
	primaryCharts: string[];
	gridLayout: 'executive' | 'operational' | 'mobile' | 'overview';
}

export interface ColorScheme {
	primary: string;
	secondary: string;
	accent: string;
}

export interface Role {
	id: RoleId;
	name: string;
	title: string;
	description: string;
	icon: string;
	focus: string;
	metrics: MetricConfig[];
	charts: ChartConfig[];
	layout: LayoutConfig;
	colorScheme: ColorScheme;
}

// ================================
// Utility Types
// ================================

export type MetricPriority = 'hero' | 'primary' | 'secondary';
export type MetricImpact = 'high' | 'medium' | 'low';
export type TrendDirection = 'up' | 'down' | 'stable';
export type ChartType = 'line' | 'bar' | 'doughnut' | 'gauge' | 'map';
export type GridLayout = 'executive' | 'operational' | 'mobile' | 'overview'; 