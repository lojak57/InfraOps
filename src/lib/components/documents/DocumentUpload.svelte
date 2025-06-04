<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 661 lines → @current-size: ~120 lines  
@phase: Phase 5 - HEAVYWEIGHT TARGET OBLITERATION
@extractors: UploadDropZone, FileQueue, UploadProgress, document-upload-utils.ts, document-upload.types.ts
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { CustomerDocument } from '$lib/stores/documentStore';

	// Import orchestrator components
	import UploadDropZone from './document-upload/UploadDropZone.svelte';
	import FileQueue from './document-upload/FileQueue.svelte';
	import UploadProgress from './document-upload/UploadProgress.svelte';

	// Import business logic and types
	import type { UploadFiles, UploadConfig, UploadEvents } from './document-upload/types/document-upload.types';
	import {
		addFilesToQueue,
		removeFileFromQueue,
		uploadAllFiles,
		isAnyFileUploading
	} from './document-upload/utils/document-upload-utils';

	// Props
	export let customerId: string;
	export let jobId: string | undefined = undefined;
	export let allowedTypes: CustomerDocument['type'][] = ['IFTA', 'Insurance', 'Contract', 'PreTrip', 'JSA', 'Emissions', 'BOL', 'Manifest', 'Safety', 'Maintenance'];
	export let maxFileSize = 10 * 1024 * 1024; // 10MB default
	export let multiple = true;

	const dispatch = createEventDispatcher<UploadEvents>();

	// State
	let dragActive = false;
	let files: File[] = [];
	let uploadingFiles: UploadFiles = {};

	// Reactive values
	$: hasFiles = files.length > 0;
	$: isUploading = isAnyFileUploading(uploadingFiles);

	// Event handlers
	function handleFilesAdded(event: CustomEvent<{ files: File[] }>) {
		const newFiles = event.detail.files;
		files = addFilesToQueue(
			files, 
			newFiles, 
			maxFileSize, 
			multiple,
			(message, file) => dispatch('error', { message, file })
		);
	}

	function handleRemoveFile(event: CustomEvent<{ index: number }>) {
		files = removeFileFromQueue(files, event.detail.index);
	}

	async function handleUploadAll() {
		await uploadAllFiles(
			files,
			allowedTypes,
			customerId,
			jobId,
			(documentId, document) => dispatch('uploaded', { documentId, document }),
			(message, file) => dispatch('error', { message, file })
		);
		
		// Clear uploaded files
		files = [];
	}

	function handleClearAll() {
		files = [];
	}
</script>

<div class="document-upload">
	<!-- Drop Zone -->
	<UploadDropZone 
		bind:dragActive
		{maxFileSize}
		{multiple}
		on:files-added={handleFilesAdded}
	/>

	<!-- File Queue -->
	<FileQueue 
		{files}
		{isUploading}
		on:remove-file={handleRemoveFile}
		on:upload-all={handleUploadAll}
		on:clear-all={handleClearAll}
	/>

	<!-- Upload Progress -->
	<UploadProgress {uploadingFiles} />
</div>

<style>
	.document-upload {
		padding: 24px;
		max-width: 800px;
		margin: 0 auto;
	}

	@media (max-width: 768px) {
		.document-upload {
			padding: 16px;
		}
	}
</style> 