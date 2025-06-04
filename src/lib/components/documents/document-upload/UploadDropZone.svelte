<script lang="ts">
	import { Upload } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { createDragHandlers, handleFileInput } from './utils/document-upload-utils';

	export let dragActive: boolean = false;
	export let maxFileSize: number;
	export let multiple: boolean = true;

	const dispatch = createEventDispatcher<{
		'files-added': { files: File[] };
	}>();

	const dragHandlers = createDragHandlers();

	function handleDragOver(e: DragEvent) {
		dragActive = dragHandlers.handleDragOver(e);
	}

	function handleDragLeave(e: DragEvent) {
		dragActive = dragHandlers.handleDragLeave(e);
	}

	function handleDrop(e: DragEvent) {
		const result = dragHandlers.handleDrop(e);
		dragActive = result.dragActive;
		dispatch('files-added', { files: result.files });
	}

	function handleFileInputChange(e: Event) {
		const files = handleFileInput(e);
		dispatch('files-added', { files });
	}
</script>

<div 
	class="drop-zone"
	class:drag-active={dragActive}
	on:dragover={handleDragOver}
	on:dragleave={handleDragLeave}
	on:drop={handleDrop}
	role="button"
	tabindex="0"
>
	<div class="drop-zone-content">
		<Upload class="upload-icon" size={48} />
		<h3>Drop files here or click to browse</h3>
		<p>Support for PDF, DOC, DOCX, JPG, PNG, TXT files up to {Math.round(maxFileSize / 1024 / 1024)}MB</p>
		
		<input
			type="file"
			{multiple}
			accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
			on:change={handleFileInputChange}
			class="file-input"
		/>
	</div>
</div>

<style>
	.drop-zone {
		position: relative;
		border: 2px dashed rgba(0, 78, 137, 0.3);
		border-radius: 20px;
		padding: 48px 32px;
		text-align: center;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: pointer;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		margin-bottom: 32px;
	}
	
	.drop-zone:hover {
		border-color: rgba(0, 78, 137, 0.5);
		background: rgba(0, 78, 137, 0.05);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
	}
	
	.drop-zone.drag-active {
		border-color: #FF6B35;
		background: rgba(255, 107, 53, 0.1);
		transform: scale(1.02);
		box-shadow: 0 12px 32px rgba(255, 107, 53, 0.2);
	}
	
	.drop-zone-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}
	
	.upload-icon {
		color: #004E89;
		margin-bottom: 8px;
	}
	
	.drop-zone h3 {
		font-size: 24px;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0;
		font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
	}
	
	.drop-zone p {
		font-size: 16px;
		color: #6b7280;
		margin: 0;
		max-width: 400px;
		line-height: 1.5;
	}
	
	.file-input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.drop-zone {
			padding: 32px 20px;
		}
		
		.drop-zone h3 {
			font-size: 20px;
		}
		
		.drop-zone p {
			font-size: 14px;
		}
	}
</style> 