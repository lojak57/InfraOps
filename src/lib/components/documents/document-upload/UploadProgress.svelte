<script lang="ts">
	import { CheckCircle, AlertCircle } from 'lucide-svelte';
	import type { UploadFiles } from './types/document-upload.types';

	export let uploadingFiles: UploadFiles;

	$: hasProgress = Object.keys(uploadingFiles).length > 0;
</script>

{#if hasProgress}
	<div class="upload-progress">
		<h4>Upload Progress</h4>
		
		{#each Object.entries(uploadingFiles) as [fileId, uploadFile]}
			<div class="progress-item">
				<div class="progress-info">
					<div class="progress-details">
						<span class="progress-name">{uploadFile.file.name}</span>
						<span class="progress-status">
							{#if uploadFile.status === 'uploading'}
								{Math.round(uploadFile.progress)}%
							{:else if uploadFile.status === 'success'}
								<CheckCircle class="success-icon" size={16} />
								Complete
							{:else if uploadFile.status === 'error'}
								<AlertCircle class="error-icon" size={16} />
								Failed
							{/if}
						</span>
					</div>
					
					{#if uploadFile.status === 'uploading'}
						<div class="progress-bar">
							<div 
								class="progress-fill" 
								style="width: {uploadFile.progress}%"
							></div>
						</div>
					{/if}
					
					{#if uploadFile.error}
						<span class="error-message">{uploadFile.error}</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.upload-progress {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 20px;
		padding: 24px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
	}
	
	.upload-progress h4 {
		font-size: 20px;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0 0 20px 0;
	}
	
	.progress-item {
		padding: 16px 20px;
		background: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 12px;
		margin-bottom: 12px;
	}
	
	.progress-item:last-child {
		margin-bottom: 0;
	}
	
	.progress-info {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	
	.progress-details {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.progress-name {
		font-size: 14px;
		font-weight: 500;
		color: #1a1a1a;
		word-break: break-word;
	}
	
	.progress-status {
		font-size: 12px;
		color: #6b7280;
		display: flex;
		align-items: center;
		gap: 4px;
		font-weight: 600;
	}
	
	:global(.success-icon) {
		color: #059669;
	}
	
	:global(.error-icon) {
		color: #dc2626;
	}
	
	.progress-bar {
		width: 100%;
		height: 6px;
		background: rgba(0, 78, 137, 0.2);
		border-radius: 3px;
		overflow: hidden;
	}
	
	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #FF6B35 0%, #ff8c42 100%);
		transition: width 0.3s ease-out;
		border-radius: 3px;
	}
	
	.error-message {
		font-size: 12px;
		color: #dc2626;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.upload-progress {
			padding: 20px;
		}
		
		.progress-details {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
		}
	}
</style> 