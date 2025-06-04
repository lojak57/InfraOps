<script lang="ts">
	import DocumentUpload from '$lib/components/documents/DocumentUpload.svelte';

	interface Props {
		isOpen: boolean;
		customerId: string;
		onClose: () => void;
		onUploaded: (event: CustomEvent) => void;
		onError: (event: CustomEvent) => void;
	}

	let { isOpen, customerId, onClose, onUploaded, onError }: Props = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onClose();
		}
	}

	function handleOverlayClick() {
		onClose();
	}

	function handleContentClick(e: Event) {
		e.stopPropagation();
	}
</script>

{#if isOpen}
	<div 
		class="modal-overlay" 
		role="dialog" 
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="0"
		onclick={handleOverlayClick}
		onkeydown={handleKeydown}
	>
		<div 
			class="modal-content" 
			role="document"
			onclick={handleContentClick}
			onkeydown={(e) => e.stopPropagation()}
		>
			<div class="modal-header">
				<h3 id="modal-title">Upload Documents</h3>
				<button 
					class="modal-close"
					onclick={onClose}
				>
					×
				</button>
			</div>
			
			<div class="modal-body">
				<DocumentUpload 
					{customerId}
					on:uploaded={onUploaded}
					on:error={onError}
				/>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 16px;
	}
	
	.modal-content {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		width: 100%;
		max-width: 600px;
		max-height: 90vh;
		overflow-y: auto;
	}
	
	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	
	.modal-header h3 {
		font-size: 18px;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0;
	}
	
	.modal-close {
		background: none;
		border: none;
		font-size: 24px;
		color: #6b7280;
		cursor: pointer;
		padding: 4px;
		border-radius: 6px;
		transition: all 0.2s ease;
		touch-action: manipulation;
		min-width: 32px;
		min-height: 32px;
	}
	
	.modal-close:hover {
		background: rgba(0, 0, 0, 0.1);
		color: #1a1a1a;
	}
	
	.modal-body {
		padding: 20px;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.modal-overlay {
			padding: 8px;
		}
		
		.modal-content {
			border-radius: 12px;
			max-height: 95vh;
		}
		
		.modal-header {
			padding: 12px 16px;
		}
		
		.modal-header h3 {
			font-size: 16px;
		}
		
		.modal-body {
			padding: 16px;
		}
	}
</style> 