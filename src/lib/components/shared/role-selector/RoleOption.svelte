<script lang="ts">
	import type { Role } from '$lib/stores/types/role.types';
	import { createEventDispatcher } from 'svelte';

	export let role: Role;

	const dispatch = createEventDispatcher();

	function handleSelect() {
		dispatch('select', { role });
	}
</script>

<button 
	class="role-option tap-target"
	style="--primary-color: {role.colorScheme.primary}; --secondary-color: {role.colorScheme.secondary}"
	on:click={handleSelect}
	role="menuitem"
>
	<div class="option-icon" style="background: {role.colorScheme.primary}15; color: {role.colorScheme.primary}">
		{role.icon}
	</div>
	<div class="option-details">
		<span class="option-name">{role.name}</span>
		<span class="option-title">{role.title}</span>
		<span class="option-description">{role.description}</span>
	</div>
</button>

<style>
	.role-option {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px;
		border: 1px solid transparent;
		border-radius: 12px;
		background: transparent;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
		width: 100%;
	}

	@media (min-width: 640px) {
		.role-option {
			gap: 16px;
			padding: 18px;
			border-radius: 16px;
		}
	}

	.role-option:hover {
		background: var(--primary-color, #3b82f6)08;
		border-color: var(--primary-color, #3b82f6)20;
		transform: translateY(-1px);
	}

	.option-icon {
		width: 40px;
		height: 40px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		flex-shrink: 0;
	}

	@media (min-width: 640px) {
		.option-icon {
			width: 48px;
			height: 48px;
			border-radius: 12px;
			font-size: 20px;
		}
	}

	.option-details {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
		flex: 1;
	}

	.option-name {
		font-size: 16px;
		font-weight: 700;
		color: #1f2937;
		line-height: 1.2;
	}

	@media (min-width: 640px) {
		.option-name {
			font-size: 18px;
		}
	}

	.option-title {
		font-size: 13px;
		font-weight: 600;
		color: #6b7280;
		line-height: 1.2;
	}

	@media (min-width: 640px) {
		.option-title {
			font-size: 14px;
		}
	}

	.option-description {
		font-size: 12px;
		font-weight: 400;
		color: #9ca3af;
		line-height: 1.3;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	@media (min-width: 640px) {
		.option-description {
			font-size: 13px;
			-webkit-line-clamp: 1;
		}
	}

	/* Mobile optimizations */
	@media (max-width: 480px) {
		.role-option {
			padding: 14px 12px;
			gap: 10px;
		}

		.option-icon {
			width: 36px;
			height: 36px;
			font-size: 16px;
		}

		.option-name {
			font-size: 15px;
		}

		.option-title {
			font-size: 12px;
		}

		.option-description {
			font-size: 11px;
		}
	}
</style> 