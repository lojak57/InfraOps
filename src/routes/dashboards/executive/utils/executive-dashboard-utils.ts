// Executive Dashboard Utilities - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @original-size: Part of 613-line component → @current-size: ~80 lines  
// @phase: Phase 7 - Executive Dashboard Components
// @extractors: Tab configuration, chart config, and utility functions

import { BarChart3, DollarSign, Building2, Target, TrendingUp, Truck, Shield } from 'lucide-svelte';
import type { DashboardTab, ChartPadding, ActionButton, TabId } from '../types/executive-dashboard.types.js';

// Default chart padding configuration
export function getDefaultChartPadding(): ChartPadding {
	return {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 15,
		paddingBottom: 50
	};
}

// Tab configuration
export function getDashboardTabs(): DashboardTab[] {
	return [
		{ id: 'overview', label: 'Executive Overview', icon: BarChart3 },
		{ id: 'financial', label: 'Financial Performance', icon: DollarSign },
		{ id: 'operations', label: 'Operations Summary', icon: Building2 },
		{ id: 'strategic', label: 'Strategic Metrics', icon: Target }
	];
}

// Action button configuration
export function getActionButtons(
	onExportReport: () => void,
	onRefreshData: () => void
): ActionButton[] {
	return [
		{
			icon: BarChart3,
			label: 'Export Report',
			onClick: onExportReport
		},
		{
			icon: TrendingUp,
			label: 'Refresh Data',
			onClick: onRefreshData
		}
	];
}

// Keyboard shortcut handler
export function handleKeyboardShortcuts(
	event: KeyboardEvent,
	toggleDebugControls: () => void
): void {
	if (event.ctrlKey && event.shiftKey && event.code === 'KeyD') {
		event.preventDefault();
		toggleDebugControls();
	}
}

// Tab validation
export function isValidTabId(tabId: string): tabId is TabId {
	return ['overview', 'financial', 'operations', 'strategic'].includes(tabId);
}

// Chart padding updater
export function updateChartPadding(
	currentPadding: ChartPadding,
	updates: Partial<ChartPadding>
): ChartPadding {
	return {
		...currentPadding,
		...updates
	};
}

// Chart configuration for consistent chart rendering
export function getChartConfig(padding: ChartPadding) {
	return {
		paddingLeft: padding.paddingLeft,
		paddingRight: padding.paddingRight,
		paddingTop: padding.paddingTop,
		paddingBottom: padding.paddingBottom
	};
} 