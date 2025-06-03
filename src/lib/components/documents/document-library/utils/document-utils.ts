// Document Library Utilities - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 1 - Critical Components

import { CheckCircle, Clock, XCircle, AlertTriangle, FileText } from 'lucide-svelte';
import type { CustomerDocument, StatusInfo } from '../types/document-library.types.js';

// Document type options
export const documentTypes: (CustomerDocument['type'] | 'all')[] = [
	'all', 'IFTA', 'Insurance', 'Contract', 'PreTrip', 'JSA', 'Emissions', 'BOL', 'Manifest', 'Safety', 'Maintenance'
];

// Status options
export const statusOptions: (CustomerDocument['status'] | 'all')[] = [
	'all', 'valid', 'pending', 'expired', 'expiring_soon', 'rejected'
];

// Get status information including icon, color, and label
export function getStatusInfo(status: CustomerDocument['status']): StatusInfo {
	switch (status) {
		case 'valid':
			return { icon: CheckCircle, color: 'status-valid', label: 'Valid' };
		case 'pending':
			return { icon: Clock, color: 'status-pending', label: 'Pending' };
		case 'expired':
			return { icon: XCircle, color: 'status-expired', label: 'Expired' };
		case 'expiring_soon':
			return { icon: AlertTriangle, color: 'status-expiring', label: 'Expiring Soon' };
		case 'rejected':
			return { icon: XCircle, color: 'status-rejected', label: 'Rejected' };
		default:
			return { icon: FileText, color: 'status-unknown', label: 'Unknown' };
	}
}

// Format file size from bytes to readable string
export function formatFileSize(bytes: number): string {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Format date to readable string
export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

// Calculate days until expiry
export function getDaysUntilExpiry(expiryDate: Date): number {
	const now = new Date();
	const diffTime = expiryDate.getTime() - now.getTime();
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Filter documents based on criteria
export function filterDocuments(
	documents: CustomerDocument[],
	searchQuery: string,
	selectedType: CustomerDocument['type'] | 'all',
	selectedStatus: CustomerDocument['status'] | 'all',
	customerId?: string,
	jobId?: string
): CustomerDocument[] {
	return documents.filter(doc => {
		// Filter by customer if specified
		if (customerId && doc.customerId !== customerId) return false;
		
		// Filter by job if specified
		if (jobId && doc.jobId !== jobId) return false;
		
		// Filter by search query
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			const matchesSearch = 
				doc.fileName.toLowerCase().includes(query) ||
				doc.type.toLowerCase().includes(query) ||
				doc.tags.some(tag => tag.toLowerCase().includes(query)) ||
				doc.metadata.description?.toLowerCase().includes(query) ||
				doc.uploadedBy.toLowerCase().includes(query);
			
			if (!matchesSearch) return false;
		}
		
		// Filter by type
		if (selectedType !== 'all' && doc.type !== selectedType) return false;
		
		// Filter by status
		if (selectedStatus !== 'all' && doc.status !== selectedStatus) return false;
		
		return true;
	});
}

// Sort documents based on criteria
export function sortDocuments(
	documents: CustomerDocument[],
	sortBy: 'uploadDate' | 'fileName' | 'type' | 'status' | 'expiryDate',
	sortOrder: 'asc' | 'desc'
): CustomerDocument[] {
	return [...documents].sort((a, b) => {
		let aValue: any, bValue: any;
		
		switch (sortBy) {
			case 'fileName':
				aValue = a.fileName.toLowerCase();
				bValue = b.fileName.toLowerCase();
				break;
			case 'type':
				aValue = a.type;
				bValue = b.type;
				break;
			case 'status':
				aValue = a.status;
				bValue = b.status;
				break;
			case 'expiryDate':
				aValue = a.expiryDate?.getTime() || 0;
				bValue = b.expiryDate?.getTime() || 0;
				break;
			default:
				aValue = a.uploadDate.getTime();
				bValue = b.uploadDate.getTime();
		}
		
		if (sortOrder === 'asc') {
			return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
		} else {
			return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
		}
	});
} 