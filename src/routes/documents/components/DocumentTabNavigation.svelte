<script lang="ts">
	import { Upload, Library, Shield } from 'lucide-svelte';

	interface Props {
		activeTab: 'library' | 'upload' | 'compliance';
		documentCount: number;
		alertCount: number;
		onTabChange: (tab: 'library' | 'upload' | 'compliance') => void;
	}

	let { activeTab, documentCount, alertCount, onTabChange }: Props = $props();
</script>

<div class="tab-navigation">
	<button 
		class="tab-btn"
		class:active={activeTab === 'library'}
		onclick={() => onTabChange('library')}
	>
		<Library size={16} />
		Document Library
		<span class="document-count">{documentCount}</span>
	</button>
	
	<button 
		class="tab-btn"
		class:active={activeTab === 'compliance'}
		onclick={() => onTabChange('compliance')}
	>
		<Shield size={16} />
		Compliance
		{#if alertCount > 0}
			<span class="alert-badge">{alertCount}</span>
		{/if}
	</button>
	
	<button 
		class="tab-btn"
		class:active={activeTab === 'upload'}
		onclick={() => onTabChange('upload')}
	>
		<Upload size={16} />
		Upload
	</button>
</div>

<style>
	.tab-navigation {
		display: flex;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		padding: 4px;
		margin-bottom: 16px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
		overflow-x: auto;
		gap: 2px;
	}
	
	.tab-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 12px;
		background: transparent;
		border: none;
		border-radius: 8px;
		font-weight: 500;
		font-size: 12px;
		color: #6b7280;
		cursor: pointer;
		transition: all 0.3s ease;
		white-space: nowrap;
		flex: 1;
		justify-content: center;
		min-height: 40px;
		touch-action: manipulation;
	}
	
	.tab-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		color: #1a1a1a;
	}
	
	.tab-btn.active {
		background: linear-gradient(135deg, #FF6B35 0%, #ff8c42 100%);
		color: white;
		box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
	}
	
	.document-count,
	.alert-badge {
		background: rgba(255, 255, 255, 0.2);
		color: inherit;
		padding: 2px 6px;
		border-radius: 6px;
		font-size: 10px;
		font-weight: 600;
		min-width: 16px;
		text-align: center;
	}
	
	.alert-badge {
		background: #ef4444;
		color: white;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.tab-navigation {
			padding: 3px;
			border-radius: 10px;
			margin-bottom: 12px;
		}
		
		.tab-btn {
			padding: 6px 8px;
			font-size: 10px;
			gap: 4px;
			min-height: 36px;
		}
		
		.document-count,
		.alert-badge {
			padding: 1px 4px;
			font-size: 8px;
			min-width: 12px;
		}
	}
</style> 