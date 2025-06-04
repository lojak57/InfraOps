<script lang="ts">
	import { onMount } from 'svelte';
	import DocumentUpload from '$lib/components/documents/DocumentUpload.svelte';
	import DocumentLibrary from '$lib/components/documents/DocumentLibrary.svelte';
	import ComplianceDashboard from '$lib/components/documents/ComplianceDashboard.svelte';
	import { documents, complianceAlerts } from '$lib/stores/documentStore';
	
	// Modular component imports
	import DocumentPageHeader from './components/DocumentPageHeader.svelte';
	import DocumentTabNavigation from './components/DocumentTabNavigation.svelte';
	import DocumentUploadModal from './components/DocumentUploadModal.svelte';
	
	// Utility imports
	import { 
		handleDocumentUploaded, 
		handleUploadError,
		getUnacknowledgedAlerts,
		getDefaultTab,
		DEFAULT_CUSTOMER_ID,
		type TabType 
	} from './utils/document-page-utils';
	
	// ================================
	// State Management
	// ================================
	
	let activeTab: TabType = getDefaultTab();
	let showUploadModal = false;
	
	// Reactive alert count
	$: alertCount = getUnacknowledgedAlerts($complianceAlerts).length;
	
	// ================================
	// Event Handlers
	// ================================
	
	function onUploadClick() {
		showUploadModal = true;
	}
	
	function onModalClose() {
		showUploadModal = false;
	}
	
	function onTabChange(tab: TabType) {
		activeTab = tab;
	}
	
	function onDocumentUploaded(event: CustomEvent) {
		handleDocumentUploaded(event);
		showUploadModal = false;
	}
	
	function onUploadError(event: CustomEvent) {
		handleUploadError(event);
	}
</script>

<svelte:head>
	<title>Document Management - Logistics Tracker</title>
	<meta name="description" content="Comprehensive document management and compliance tracking for logistics operations" />
</svelte:head>

<div class="documents-page">
	<!-- Modular Header Component -->
	<DocumentPageHeader {onUploadClick} />

	<!-- Modular Tab Navigation -->
	<DocumentTabNavigation 
		{activeTab}
		documentCount={$documents.length}
		{alertCount}
		{onTabChange}
	/>

	<!-- Tab Content -->
	<div class="tab-content">
		{#if activeTab === 'library'}
			<div class="library-section">
				<DocumentLibrary 
					on:uploaded={onDocumentUploaded}
					on:error={onUploadError}
				/>
			</div>
		{:else if activeTab === 'compliance'}
			<div class="compliance-section">
				<ComplianceDashboard />
			</div>
		{:else if activeTab === 'upload'}
			<div class="upload-section">
				<div class="upload-container">
					<div class="upload-header">
						<h2>Upload New Documents</h2>
						<p>Add new compliance documents to your library</p>
					</div>
					
					<DocumentUpload 
						customerId={DEFAULT_CUSTOMER_ID}
						on:uploaded={onDocumentUploaded}
						on:error={onUploadError}
					/>
				</div>
			</div>
		{/if}
	</div>
</div>

<!-- Modular Upload Modal -->
<DocumentUploadModal 
	isOpen={showUploadModal}
	customerId={DEFAULT_CUSTOMER_ID}
	onClose={onModalClose}
	onUploaded={onDocumentUploaded}
	onError={onUploadError}
/>

<style>
	.documents-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
		padding: 12px;
	}
	
	.tab-content {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		padding: 16px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
		min-height: 400px;
	}
	
	.upload-container {
		max-width: 100%;
	}
	
	.upload-header {
		text-align: center;
		margin-bottom: 20px;
	}
	
	.upload-header h2 {
		font-size: 18px;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0 0 8px 0;
	}
	
	.upload-header p {
		color: #6b7280;
		font-size: 12px;
		margin: 0;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.documents-page {
			padding: 8px;
		}
		
		.tab-content {
			padding: 12px;
			border-radius: 12px;
			min-height: 300px;
		}
		
		.upload-header h2 {
			font-size: 16px;
		}
		
		.upload-header p {
			font-size: 11px;
		}
	}
	
	/* Tablet optimizations */
	@media (min-width: 641px) and (max-width: 1024px) {
		.documents-page {
			padding: 16px;
		}
		
		.tab-content {
			padding: 20px;
			min-height: 500px;
		}
	}
</style> 