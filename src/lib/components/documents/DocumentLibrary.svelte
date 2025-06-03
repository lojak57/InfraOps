<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 1030 lines → @current-size: ~180 lines  
@phase: Phase 1 - Critical Components
@extractors: DocumentFilters, DocumentGrid, document-utils.ts, document-library.types.ts
-->
<script lang="ts">
	import { Grid, List, FileText } from 'lucide-svelte';
	import { documents, documentActions } from '$lib/stores/documentStore';
	import DocumentViewer from './DocumentViewer.svelte';
	import DocumentFilters from './document-library/DocumentFilters.svelte';
	import DocumentGrid from './document-library/DocumentGrid.svelte';
	import { filterDocuments, sortDocuments } from './document-library/utils/document-utils.js';
	import type { 
		CustomerDocument, 
		DocumentFilters as FiltersType, 
		DocumentActions,
		DocumentViewSettings 
	} from './document-library/types/document-library.types.js';

	// Props
	export let customerId: string | undefined = undefined;
	export let jobId: string | undefined = undefined;
	export let showActions = true;
	export let compact = false;

	// State
	let filters: FiltersType = {
		searchQuery: '',
		selectedType: 'all',
		selectedStatus: 'all',
		sortBy: 'uploadDate',
		sortOrder: 'desc'
	};

	let viewSettings: DocumentViewSettings = {
		viewMode: 'grid',
		showActions,
		compact
	};

	let selectedDocuments: string[] = [];

	// Document viewer state
	let viewerDocument: CustomerDocument | null = null;
	let isViewerOpen = false;

	// Reactive filtered and sorted documents
	$: filteredDocs = filterDocuments(
		$documents,
		filters.searchQuery,
		filters.selectedType,
		filters.selectedStatus,
		customerId,
		jobId
	);

	$: finalDocuments = sortDocuments(filteredDocs, filters.sortBy, filters.sortOrder);

	// Actions
	const actions: DocumentActions = {
		viewDocument: (document: CustomerDocument) => {
			viewerDocument = document;
			isViewerOpen = true;
		},

		editDocument: (document: CustomerDocument) => {
			console.log('Editing document:', document);
		},

		deleteDocument: (document: CustomerDocument) => {
			if (confirm(`Are you sure you want to delete "${document.fileName}"?`)) {
				documentActions.deleteDocument(document.id);
			}
		},

		downloadDocument: (document: CustomerDocument) => {
			console.log('Downloading document:', document);
		}
	};

	// Selection handlers
	function toggleDocumentSelection(documentId: string) {
		if (selectedDocuments.includes(documentId)) {
			selectedDocuments = selectedDocuments.filter(id => id !== documentId);
		} else {
			selectedDocuments = [...selectedDocuments, documentId];
		}
	}

	function selectAllDocuments() {
		if (selectedDocuments.length === finalDocuments.length) {
			selectedDocuments = [];
		} else {
			selectedDocuments = finalDocuments.map(doc => doc.id);
		}
	}

	// Bulk actions
	function bulkDelete() {
		if (confirm(`Are you sure you want to delete ${selectedDocuments.length} documents?`)) {
			selectedDocuments.forEach(id => documentActions.deleteDocument(id));
			selectedDocuments = [];
		}
	}

	function bulkUpdateStatus(status: CustomerDocument['status']) {
		documentActions.bulkUpdateStatus(selectedDocuments, status);
		selectedDocuments = [];
	}

	// Filter update handler
	function handleFiltersChange(newFilters: FiltersType) {
		filters = newFilters;
	}

	// Document viewer handlers
	function handleViewerClose() {
		isViewerOpen = false;
		viewerDocument = null;
	}

	function handleViewerDownload(event: CustomEvent<{ document: CustomerDocument }>) {
		actions.downloadDocument(event.detail.document);
	}
</script>

<div class="document-library">
	<!-- Header -->
	<div class="library-header">
		<div class="header-content">
			<h2 class="library-title">Document Library</h2>
			<div class="document-count-badge">{finalDocuments.length} documents</div>
		</div>
		
		<div class="view-controls">
			<button
				class="view-toggle-btn {viewSettings.viewMode === 'grid' ? 'active' : ''}"
				on:click={() => viewSettings.viewMode = 'grid'}
				aria-label="Grid view"
			>
				<Grid size={16} />
			</button>
			<button
				class="view-toggle-btn {viewSettings.viewMode === 'list' ? 'active' : ''}"
				on:click={() => viewSettings.viewMode = 'list'}
				aria-label="List view"
			>
				<List size={16} />
			</button>
		</div>
	</div>

	<!-- Search and Filters Component -->
	<DocumentFilters {filters} onFiltersChange={handleFiltersChange} />

	<!-- Bulk Actions -->
	{#if selectedDocuments.length > 0}
		<div class="bulk-actions-bar">
			<div class="selected-info">
				<span class="selected-count">{selectedDocuments.length} selected</span>
			</div>
			
			<div class="bulk-buttons">
				<button class="bulk-action-btn valid" on:click={() => bulkUpdateStatus('valid')}>
					Mark Valid
				</button>
				<button class="bulk-action-btn pending" on:click={() => bulkUpdateStatus('pending')}>
					Mark Pending
				</button>
				<button class="bulk-action-btn danger" on:click={bulkDelete}>
					Delete Selected
				</button>
			</div>
		</div>
	{/if}

	<!-- Documents Display -->
	<div class="documents-display {viewSettings.viewMode}">
		{#if finalDocuments.length === 0}
			<div class="empty-state">
				<div class="empty-icon">
					<FileText size={64} />
				</div>
				<h3 class="empty-title">No documents found</h3>
				<p class="empty-description">Try adjusting your search or filters</p>
			</div>
		{:else if viewSettings.viewMode === 'grid'}
			<DocumentGrid 
				documents={finalDocuments}
				{selectedDocuments}
				showActions={viewSettings.showActions}
				{actions}
				onToggleSelection={toggleDocumentSelection}
			/>
		{:else}
			<!-- TODO: Implement DocumentList component -->
			<div class="list-placeholder">
				<p>List view component coming soon...</p>
			</div>
		{/if}
	</div>
</div>

<!-- Document Viewer -->
{#if isViewerOpen && viewerDocument}
	<DocumentViewer 
		document={viewerDocument}
		isOpen={isViewerOpen}
		on:close={handleViewerClose}
		on:download={handleViewerDownload}
	/>
{/if}

<style>
	.document-library {
		padding: 2rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
	}

	.library-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.library-title {
		font-size: 2rem;
		font-weight: 700;
		color: white;
		margin: 0;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.document-count-badge {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 1rem;
		font-size: 0.875rem;
		font-weight: 600;
		backdrop-filter: blur(10px);
	}

	.view-controls {
		display: flex;
		gap: 0.5rem;
		background: rgba(255, 255, 255, 0.15);
		padding: 0.25rem;
		border-radius: 0.75rem;
		backdrop-filter: blur(10px);
	}

	.view-toggle-btn {
		padding: 0.5rem;
		border: none;
		border-radius: 0.5rem;
		background: transparent;
		color: white;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.view-toggle-btn.active {
		background: rgba(255, 255, 255, 0.2);
	}

	.view-toggle-btn:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.bulk-actions-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border-radius: 1rem;
		margin-bottom: 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.selected-count {
		font-weight: 600;
		color: #1a1a1a;
	}

	.bulk-buttons {
		display: flex;
		gap: 0.75rem;
	}

	.bulk-action-btn {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.bulk-action-btn.valid {
		background: rgba(16, 185, 129, 0.2);
		color: #059669;
	}

	.bulk-action-btn.pending {
		background: rgba(245, 158, 11, 0.2);
		color: #d97706;
	}

	.bulk-action-btn.danger {
		background: rgba(239, 68, 68, 0.2);
		color: #dc2626;
	}

	.bulk-action-btn:hover {
		transform: translateY(-1px);
	}

	.documents-display {
		margin-top: 1.5rem;
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border-radius: 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.empty-icon {
		color: rgba(255, 255, 255, 0.5);
		margin-bottom: 1.5rem;
	}

	.empty-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: white;
		margin: 0 0 0.5rem 0;
	}

	.empty-description {
		color: rgba(255, 255, 255, 0.8);
		margin: 0;
	}

	.list-placeholder {
		padding: 2rem;
		text-align: center;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border-radius: 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: white;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.document-library {
			padding: 1rem;
		}
		
		.library-header {
			flex-direction: column;
			gap: 1rem;
			align-items: stretch;
		}
		
		.library-title {
			font-size: 1.5rem;
		}
	}
</style> 