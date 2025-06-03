// Compliance Dashboard Types - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 1 - Critical Components

import type { ComplianceAlert, CustomerDocument } from '$lib/stores/documentStore';

export interface ComplianceStats {
	totalDocuments: number;
	validDocuments: number;
	expiredDocuments: number;
	expiringDocuments: number;
	pendingDocuments: number;
	complianceScore: number;
	lastUpdated: Date;
}

export interface ComplianceChartData {
	labels: string[];
	datasets: Array<{
		data: number[];
		backgroundColor: string[];
		borderWidth: number;
		hoverOffset?: number;
	}>;
}

export interface DocumentTypeDistribution {
	type: string;
	count: number;
}

export interface ExpiryTimeline {
	next7Days: number;
	next30Days: number;
	next90Days: number;
}

export interface ComplianceFilters {
	timeframe: '7d' | '30d' | '90d' | '1y';
	showOnlyExpiring: boolean;
	customerId?: string;
}

export interface ComplianceActions {
	acknowledgeAlert: (alertId: string) => void;
	exportReport: () => void;
	refreshData: () => void;
}

// Re-export for convenience
export type { ComplianceAlert, CustomerDocument }; 