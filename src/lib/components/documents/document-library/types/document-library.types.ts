// Document Library Types - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 1 - Critical Components

import type { CustomerDocument } from '$lib/stores/documentStore';

export interface DocumentFilters {
	searchQuery: string;
	selectedType: CustomerDocument['type'] | 'all';
	selectedStatus: CustomerDocument['status'] | 'all';
	sortBy: 'uploadDate' | 'fileName' | 'type' | 'status' | 'expiryDate';
	sortOrder: 'asc' | 'desc';
}

export interface DocumentViewSettings {
	viewMode: 'grid' | 'list';
	showActions: boolean;
	compact: boolean;
}

export interface DocumentSelection {
	selectedDocuments: string[];
	isAllSelected: boolean;
}

export interface StatusInfo {
	icon: any;
	color: string;
	label: string;
}

export interface BulkActions {
	bulkDelete: () => void;
	bulkUpdateStatus: (status: CustomerDocument['status']) => void;
	selectAllDocuments: () => void;
	toggleDocumentSelection: (documentId: string) => void;
}

export interface DocumentActions {
	viewDocument: (document: CustomerDocument) => void;
	editDocument: (document: CustomerDocument) => void;
	deleteDocument: (document: CustomerDocument) => void;
	downloadDocument: (document: CustomerDocument) => void;
}

export interface DocumentLibraryState {
	filters: DocumentFilters;
	viewSettings: DocumentViewSettings;
	selection: DocumentSelection;
	filteredDocuments: CustomerDocument[];
}

// Re-export for convenience
export type { CustomerDocument }; 