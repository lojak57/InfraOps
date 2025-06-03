<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 1030-line component → @current-size: ~180 lines  
@phase: Phase 1 - Critical Components
@extractors: DocumentGrid from DocumentLibrary.svelte
-->
<script lang="ts">
	import { FileText, Calendar, User, Eye, Download, Edit, Trash2 } from 'lucide-svelte';
	import { getStatusInfo, formatDate, formatFileSize, getDaysUntilExpiry } from '../utils/document-utils.js';
	import type { CustomerDocument, DocumentActions } from '../types/document-library.types.js';
	
	// Props
	export let documents: CustomerDocument[];
	export let selectedDocuments: string[];
	export let showActions: boolean;
	export let actions: DocumentActions;
	export let onToggleSelection: (documentId: string) => void;
</script>

<!-- Grid View -->
<div class="documents-grid">
	{#each documents as document}
		<div class="document-card glass-card">
			<div class="card-header">
				<input
					type="checkbox"
					checked={selectedDocuments.includes(document.id)}
					on:change={() => onToggleSelection(document.id)}
					class="document-checkbox"
				/>
				
				<div class="status-badge {getStatusInfo(document.status).color}">
					<svelte:component this={getStatusInfo(document.status).icon} size={12} />
					<span>{getStatusInfo(document.status).label}</span>
				</div>
			</div>
			
			<div class="card-body">
				<div class="document-icon-container">
					<FileText size={32} />
				</div>
				
				<h4 class="document-title">{document.fileName}</h4>
				<p class="document-type">{document.type}</p>
				
				<div class="document-metadata">
					<div class="metadata-item">
						<Calendar size={12} />
						<span>{formatDate(document.uploadDate)}</span>
					</div>
					<div class="metadata-item">
						<User size={12} />
						<span>{document.uploadedBy}</span>
					</div>
					<div class="metadata-item">
						<span>{formatFileSize(document.fileSize)}</span>
					</div>
				</div>
				
				{#if document.expiryDate}
					<div class="expiry-indicator">
						{#if document.status === 'expired'}
							<span class="expired-text">Expired {Math.abs(getDaysUntilExpiry(document.expiryDate))} days ago</span>
						{:else if document.status === 'expiring_soon'}
							<span class="expiring-text">Expires in {getDaysUntilExpiry(document.expiryDate)} days</span>
						{:else}
							<span class="valid-text">Valid until {formatDate(document.expiryDate)}</span>
						{/if}
					</div>
				{/if}
			</div>
			
			{#if showActions}
				<div class="card-actions">
					<button class="action-button view" on:click={() => actions.viewDocument(document)} title="View">
						<Eye size={14} />
					</button>
					<button class="action-button download" on:click={() => actions.downloadDocument(document)} title="Download">
						<Download size={14} />
					</button>
					<button class="action-button edit" on:click={() => actions.editDocument(document)} title="Edit">
						<Edit size={14} />
					</button>
					<button class="action-button delete" on:click={() => actions.deleteDocument(document)} title="Delete">
						<Trash2 size={14} />
					</button>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.documents-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.document-card {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border-radius: 1.25rem;
		padding: 1.5rem;
		transition: all 0.3s ease;
		border: 1px solid rgba(107, 114, 128, 0.2);
		display: flex;
		flex-direction: column;
	}

	.document-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(107, 114, 128, 0.2);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.document-checkbox {
		width: 18px;
		height: 18px;
		cursor: pointer;
	}

	.status-badge {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.025em;
	}

	.status-badge.status-valid {
		background: rgba(16, 185, 129, 0.1);
		color: #059669;
	}

	.status-badge.status-pending {
		background: rgba(245, 158, 11, 0.1);
		color: #d97706;
	}

	.status-badge.status-expired {
		background: rgba(239, 68, 68, 0.1);
		color: #dc2626;
	}

	.status-badge.status-expiring {
		background: rgba(255, 107, 53, 0.1);
		color: #ea580c;
	}

	.status-badge.status-rejected {
		background: rgba(239, 68, 68, 0.1);
		color: #dc2626;
	}

	.card-body {
		text-align: center;
		margin-bottom: 1.25rem;
		flex: 1;
	}

	.document-icon-container {
		color: #004E89;
		margin-bottom: 1rem;
		display: flex;
		justify-content: center;
	}

	.document-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0 0 0.5rem 0;
		line-height: 1.4;
		word-break: break-word;
	}

	.document-type {
		color: #6b7280;
		font-size: 0.875rem;
		font-weight: 500;
		margin: 0 0 1rem 0;
	}

	.document-metadata {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.metadata-item {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.375rem;
		color: #6b7280;
		font-size: 0.75rem;
	}

	.expiry-indicator {
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-align: center;
	}

	.expired-text {
		color: #dc2626;
		background: rgba(239, 68, 68, 0.1);
	}

	.expiring-text {
		color: #ea580c;
		background: rgba(255, 107, 53, 0.1);
	}

	.valid-text {
		color: #059669;
		background: rgba(16, 185, 129, 0.1);
	}

	.card-actions {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.2);
	}

	.action-button {
		padding: 0.5rem;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.action-button.view {
		background: rgba(59, 130, 246, 0.1);
		color: #2563eb;
	}

	.action-button.download {
		background: rgba(16, 185, 129, 0.1);
		color: #059669;
	}

	.action-button.edit {
		background: rgba(245, 158, 11, 0.1);
		color: #d97706;
	}

	.action-button.delete {
		background: rgba(239, 68, 68, 0.1);
		color: #dc2626;
	}

	.action-button:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.documents-grid {
			grid-template-columns: 1fr;
		}
	}
</style> 