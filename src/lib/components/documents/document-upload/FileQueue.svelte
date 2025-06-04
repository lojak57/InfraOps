<script lang="ts">
	import { X } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { getFileIcon, formatFileSize, getUploadButtonText } from './utils/document-upload-utils';

	export let files: File[];
	export let isUploading: boolean = false;

	const dispatch = createEventDispatcher<{
		'remove-file': { index: number };
		'upload-all': void;
		'clear-all': void;
	}>();

	$: hasFiles = files.length > 0;
	$: uploadButtonText = getUploadButtonText(files.length, isUploading);

	function handleRemoveFile(index: number) {
		dispatch('remove-file', { index });
	}

	function handleUploadAll() {
		dispatch('upload-all');
	}

	function handleClearAll() {
		dispatch('clear-all');
	}
</script>

{#if hasFiles}
	<div class="file-queue">
		<h4>Files Ready for Upload ({files.length})</h4>
		
		<div class="file-list">
			{#each files as file, index}
				<div class="file-item">
					<div class="file-info">
						<svelte:component this={getFileIcon(file.name)} class="file-icon" size={20} />
						<div class="file-details">
							<span class="file-name">{file.name}</span>
							<span class="file-size">{formatFileSize(file.size)}</span>
						</div>
					</div>
					
					<button
						class="remove-btn"
						on:click={() => handleRemoveFile(index)}
						aria-label="Remove file"
					>
						<X size={16} />
					</button>
				</div>
			{/each}
		</div>
		
		<div class="upload-actions">
			<button
				class="btn btn-primary"
				on:click={handleUploadAll}
				disabled={isUploading}
			>
				{uploadButtonText}
			</button>
			
			<button
				class="btn btn-secondary"
				on:click={handleClearAll}
				disabled={isUploading}
			>
				Clear All
			</button>
		</div>
	</div>
{/if}

<style>
	.file-queue {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 20px;
		padding: 24px;
		margin-bottom: 24px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
	}
	
	.file-queue h4 {
		font-size: 20px;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0 0 20px 0;
	}
	
	.file-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 24px;
	}
	
	.file-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 20px;
		background: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 12px;
		transition: all 0.2s ease;
	}
	
	.file-item:hover {
		background: rgba(255, 255, 255, 0.7);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}
	
	.file-info {
		display: flex;
		align-items: center;
		gap: 12px;
		flex: 1;
	}
	
	:global(.file-icon) {
		color: #004E89;
	}
	
	.file-details {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	
	.file-name {
		font-size: 14px;
		font-weight: 500;
		color: #1a1a1a;
		word-break: break-word;
	}
	
	.file-size {
		font-size: 12px;
		color: #6b7280;
	}
	
	.remove-btn {
		padding: 8px;
		border: none;
		background: rgba(239, 68, 68, 0.1);
		color: #dc2626;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.remove-btn:hover {
		background: rgba(239, 68, 68, 0.2);
		transform: scale(1.1);
	}
	
	.upload-actions {
		display: flex;
		gap: 12px;
	}
	
	.btn {
		padding: 12px 24px;
		border: none;
		border-radius: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
	}
	
	.btn-primary {
		background: linear-gradient(135deg, #FF6B35 0%, #ff8c42 100%);
		color: white;
		box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
	}
	
	.btn-primary:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 12px 32px rgba(255, 107, 53, 0.4);
	}
	
	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
		box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);
	}
	
	.btn-secondary {
		background: rgba(0, 78, 137, 0.1);
		color: #004E89;
		border: 1px solid rgba(0, 78, 137, 0.2);
	}
	
	.btn-secondary:hover:not(:disabled) {
		background: rgba(0, 78, 137, 0.2);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 78, 137, 0.2);
	}
	
	.btn-secondary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.file-queue {
			padding: 20px;
		}
		
		.file-item {
			padding: 12px 16px;
		}
		
		.upload-actions {
			flex-direction: column;
		}
		
		.btn {
			width: 100%;
		}
	}
</style> 