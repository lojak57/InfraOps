// Compliance Dashboard Utilities - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 1 - Critical Components

import type { 
	CustomerDocument, 
	ComplianceAlert, 
	ComplianceStats, 
	ComplianceChartData,
	DocumentTypeDistribution 
} from '../types/compliance.types.js';

// Calculate compliance statistics from documents
export function calculateComplianceStats(
	documents: CustomerDocument[], 
	currentTime: Date
): ComplianceStats {
	const total = documents.length;
	const valid = documents.filter(doc => doc.status === 'valid').length;
	const expired = documents.filter(doc => doc.status === 'expired').length;
	const expiring = documents.filter(doc => doc.status === 'expiring_soon').length;
	const pending = documents.filter(doc => doc.status === 'pending').length;
	
	const complianceScore = total > 0 ? Math.round(((valid + pending) / total) * 100) : 100;
	
	return {
		totalDocuments: total,
		validDocuments: valid,
		expiredDocuments: expired,
		expiringDocuments: expiring,
		pendingDocuments: pending,
		complianceScore,
		lastUpdated: currentTime
	};
}

// Generate compliance chart data
export function generateComplianceChartData(stats: ComplianceStats): ComplianceChartData {
	return {
		labels: ['Valid', 'Pending', 'Expiring', 'Expired'],
		datasets: [{
			data: [
				stats.validDocuments,
				stats.pendingDocuments,
				stats.expiringDocuments,
				stats.expiredDocuments
			],
			backgroundColor: [
				'#10b981',
				'#f59e0b',
				'#FF6B35',
				'#ef4444'
			],
			borderWidth: 0,
			hoverOffset: 4
		}]
	};
}

// Calculate document type distribution
export function calculateDocumentTypeDistribution(documents: CustomerDocument[]): DocumentTypeDistribution[] {
	const distribution: { [key: string]: number } = {};
	documents.forEach(doc => {
		distribution[doc.type] = (distribution[doc.type] || 0) + 1;
	});
	return Object.entries(distribution).map(([type, count]) => ({ type, count }));
}

// Generate distribution chart data
export function generateDistributionChartData(distribution: DocumentTypeDistribution[]) {
	return {
		labels: distribution.map(item => item.type),
		datasets: [{
			label: 'Document Count',
			data: distribution.map(item => item.count),
			backgroundColor: [
				'#004E89',
				'#FF6B35',
				'#10b981',
				'#f59e0b',
				'#ef4444',
				'#3b82f6',
				'#8b5cf6',
				'#ec4899',
				'#06b6d4',
				'#84cc16'
			],
			borderWidth: 0,
			borderRadius: 4
		}]
	};
}

// Get compliance score color
export function getComplianceColor(score: number): string {
	if (score >= 90) return '#10b981';
	if (score >= 75) return '#f59e0b';
	if (score >= 60) return '#FF6B35';
	return '#ef4444';
}

// Get alert severity styling
export function getAlertColor(severity: ComplianceAlert['severity']): string {
	switch (severity) {
		case 'critical': return 'border-red-500 bg-red-50';
		case 'high': return 'border-orange-500 bg-orange-50';
		case 'medium': return 'border-yellow-500 bg-yellow-50';
		case 'low': return 'border-blue-500 bg-blue-50';
		default: return 'border-gray-300 bg-gray-50';
	}
}

// Get documents expiring within specified days
export function getExpiringDocuments(
	documents: CustomerDocument[], 
	days: number, 
	currentTime: Date
): CustomerDocument[] {
	const futureDate = new Date(currentTime.getTime() + days * 24 * 60 * 60 * 1000);
	
	return documents.filter(doc => 
		doc.expiryDate && 
		doc.expiryDate > currentTime && 
		doc.expiryDate <= futureDate
	);
}

// Format date to readable string
export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

// Filter documents by customer
export function filterDocumentsByCustomer(
	documents: CustomerDocument[], 
	customerId?: string
): CustomerDocument[] {
	return customerId 
		? documents.filter(doc => doc.customerId === customerId)
		: documents;
}

// Filter alerts by customer
export function filterAlertsByCustomer(
	alerts: ComplianceAlert[], 
	documents: CustomerDocument[], 
	customerId?: string
): ComplianceAlert[] {
	if (!customerId) return alerts;
	
	return alerts.filter(alert => {
		const doc = documents.find(d => d.id === alert.documentId);
		return doc?.customerId === customerId;
	});
} 