<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import type { Role } from '$lib/stores/types/role.types';
	import { createEventDispatcher } from 'svelte';
	import RoleOption from './RoleOption.svelte';

	export let availableRoles: Role[];
	export let isOpen: boolean = false;

	const dispatch = createEventDispatcher();

	function toggleDropdown() {
		dispatch('toggle');
	}

	function handleRoleSelect(event: CustomEvent) {
		dispatch('role-select', event.detail);
	}
</script>

<div class="role-dropdown">
	<button 
		class="dropdown-trigger tap-target"
		on:click={toggleDropdown}
		aria-haspopup="true"
		aria-expanded={isOpen}
	>
		<span class="trigger-text">Select Your Role</span>
		<ChevronDown size={18} class="chevron {isOpen ? 'rotated' : ''}" />
	</button>

	{#if isOpen}
		<div class="dropdown-menu touch-scroll" role="menu">
			<div class="menu-header">
				<h3>Choose your role to see a customized dashboard</h3>
			</div>
			<div class="role-options">
				{#each availableRoles.filter(role => role.id !== 'overview') as role}
					<RoleOption {role} on:select={handleRoleSelect} />
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.role-dropdown {
		position: relative;
		width: 100%;
	}

	.dropdown-trigger {
		width: 100%;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		padding: 16px 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 
			0 4px 16px rgba(0, 0, 0, 0.08),
			0 1px 4px rgba(0, 0, 0, 0.04);
	}

	@media (min-width: 640px) {
		.dropdown-trigger {
			border-radius: 20px;
			padding: 18px 24px;
		}
	}

	.dropdown-trigger:hover {
		background: rgba(255, 255, 255, 0.98);
		border-color: rgba(124, 179, 66, 0.3);
		transform: translateY(-2px);
		box-shadow: 
			0 8px 24px rgba(0, 0, 0, 0.12),
			0 2px 8px rgba(0, 0, 0, 0.06);
	}

	.trigger-text {
		font-size: 16px;
		font-weight: 600;
		color: #1f2937;
	}

	@media (min-width: 640px) {
		.trigger-text {
			font-size: 18px;
		}
	}

	.chevron {
		transition: transform 0.2s ease;
		color: #6b7280;
		flex-shrink: 0;
	}

	.chevron.rotated {
		transform: rotate(180deg);
	}

	.dropdown-menu {
		position: absolute;
		top: calc(100% + 8px);
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(24px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 16px;
		box-shadow: 
			0 12px 40px rgba(0, 0, 0, 0.15),
			0 4px 16px rgba(0, 0, 0, 0.08);
		z-index: 1000;
		overflow: hidden;
		max-height: 80vh;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	@media (min-width: 640px) {
		.dropdown-menu {
			border-radius: 20px;
			max-height: 70vh;
		}
	}

	.menu-header {
		padding: 16px 20px 12px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
		background: rgba(248, 250, 252, 0.8);
	}

	@media (min-width: 640px) {
		.menu-header {
			padding: 20px 24px 16px;
		}
	}

	.menu-header h3 {
		font-size: 14px;
		font-weight: 600;
		color: #374151;
		margin: 0;
		text-align: center;
		line-height: 1.3;
	}

	@media (min-width: 640px) {
		.menu-header h3 {
			font-size: 16px;
		}
	}

	.role-options {
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	@media (min-width: 640px) {
		.role-options {
			padding: 16px;
			gap: 10px;
		}
	}

	/* Mobile optimizations */
	@media (max-width: 480px) {
		.dropdown-trigger {
			padding: 14px 16px;
			border-radius: 12px;
		}

		.dropdown-menu {
			border-radius: 12px;
		}
	}
</style> 