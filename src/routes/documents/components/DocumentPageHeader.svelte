<script lang="ts">
	import { Plus } from 'lucide-svelte';

	interface Props {
		onUploadClick: () => void;
	}

	let { onUploadClick }: Props = $props();
</script>

<div class="page-header">
	<div class="header-content">
		<h1>Document Management</h1>
		<p class="page-description">
			Manage compliance documents, track expirations, and maintain regulatory requirements
		</p>
	</div>
	
	<div class="header-actions">
		<button 
			class="upload-btn"
			onclick={onUploadClick}
		>
			<Plus size={16} />
			Upload Documents
		</button>
	</div>
</div>

<style>
	.page-header {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 20px;
		padding: 16px;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
	}
	
	.header-content h1 {
		font-size: 20px;
		font-weight: 700;
		color: #1a1a1a;
		margin: 0;
		font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
	}
	
	.page-description {
		color: #6b7280;
		margin-top: 4px;
		font-size: 12px;
		line-height: 1.4;
	}
	
	.header-actions {
		display: flex;
		justify-content: center;
	}
	
	.upload-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 10px 16px;
		background: linear-gradient(135deg, #FF6B35 0%, #ff8c42 100%);
		color: white;
		border: none;
		border-radius: 10px;
		font-weight: 600;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
		touch-action: manipulation;
		min-height: 44px;
	}
	
	.upload-btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 12px 32px rgba(255, 107, 53, 0.4);
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.page-header {
			padding: 12px;
			margin-bottom: 16px;
			border-radius: 12px;
		}
		
		.header-content h1 {
			font-size: 18px;
		}
		
		.page-description {
			font-size: 11px;
		}
		
		.upload-btn {
			padding: 8px 12px;
			font-size: 12px;
			gap: 4px;
		}
	}
	
	/* Tablet optimizations */
	@media (min-width: 641px) and (max-width: 1024px) {
		.page-header {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: 20px;
		}
		
		.header-actions {
			justify-content: flex-end;
		}
		
		.header-content h1 {
			font-size: 24px;
		}
		
		.page-description {
			font-size: 14px;
		}
	}
</style> 