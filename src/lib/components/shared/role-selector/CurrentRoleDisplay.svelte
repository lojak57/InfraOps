<script lang="ts">
	import type { Role } from '$lib/stores/types/role.types';
	import { createEventDispatcher } from 'svelte';

	export let selectedRole: Role;

	const dispatch = createEventDispatcher();

	function handleBackToDashboard() {
		dispatch('back-to-dashboard');
	}
</script>

<div class="current-role-display">
	<div class="role-info">
		<span class="role-icon" style="color: {selectedRole.colorScheme.primary}">{selectedRole.icon}</span>
		<div class="role-details">
			<span class="role-name" style="color: {selectedRole.colorScheme.primary}">{selectedRole.name}</span>
			<span class="role-title">{selectedRole.title}</span>
		</div>
	</div>
	<button 
		class="back-button tap-target"
		on:click={handleBackToDashboard}
		title="Back to main dashboard"
	>
		← Dashboard
	</button>
</div>

<style>
	.current-role-display {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		padding: 12px 16px;
		box-shadow: 
			0 4px 16px rgba(0, 0, 0, 0.08),
			0 1px 4px rgba(0, 0, 0, 0.04);
		gap: 12px;
		flex-wrap: wrap;
	}

	@media (min-width: 640px) {
		.current-role-display {
			border-radius: 20px;
			padding: 16px 24px;
			flex-wrap: nowrap;
		}
	}

	.role-info {
		display: flex;
		align-items: center;
		gap: 12px;
		flex: 1;
		min-width: 0;
	}

	.role-icon {
		font-size: 24px;
		line-height: 1;
		flex-shrink: 0;
	}

	@media (min-width: 640px) {
		.role-icon {
			font-size: 28px;
		}
	}

	.role-details {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}

	.role-name {
		font-size: 16px;
		font-weight: 700;
		line-height: 1.2;
	}

	@media (min-width: 640px) {
		.role-name {
			font-size: 18px;
		}
	}

	.role-title {
		font-size: 12px;
		font-weight: 500;
		color: #6b7280;
		line-height: 1.2;
	}

	@media (min-width: 640px) {
		.role-title {
			font-size: 14px;
		}
	}

	.back-button {
		background: rgba(59, 130, 246, 0.1);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 10px;
		color: #3b82f6;
		padding: 8px 16px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		flex-shrink: 0;
		white-space: nowrap;
	}

	@media (min-width: 640px) {
		.back-button {
			padding: 10px 20px;
			font-size: 15px;
		}
	}

	.back-button:hover {
		background: rgba(59, 130, 246, 0.2);
		transform: translateY(-1px);
	}

	/* Mobile optimizations */
	@media (max-width: 480px) {
		.current-role-display {
			padding: 12px;
			border-radius: 12px;
		}
	}
</style> 