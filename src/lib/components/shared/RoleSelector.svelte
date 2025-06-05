<script lang="ts">
	import { selectedRole, isRoleView, availableRoles, clearRoleView, setRole } from '$lib/stores/roleStore';
	import { createRoleSelectorHandlers, selectRoleHandler, handleBackToDashboard } from './role-selector/role-selector-utils';
	import CurrentRoleDisplay from './role-selector/CurrentRoleDisplay.svelte';
	import RoleDropdown from './role-selector/RoleDropdown.svelte';

	const handlers = createRoleSelectorHandlers();
	let isOpen = false;

	function toggleDropdown() {
		isOpen = handlers.toggleDropdown();
	}

	function closeDropdown() {
		isOpen = handlers.closeDropdown();
	}

	function handleRoleSelect(event: CustomEvent) {
		selectRoleHandler(event.detail.role, setRole, closeDropdown);
	}

	function handleBack() {
		handleBackToDashboard(clearRoleView, closeDropdown);
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const newIsOpen = handlers.handleClickOutside(event);
		if (newIsOpen !== isOpen) {
			isOpen = newIsOpen;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="role-selector">
	{#if $isRoleView}
		<CurrentRoleDisplay selectedRole={$selectedRole} on:back-to-dashboard={handleBack} />
	{:else}
		<RoleDropdown 
			availableRoles={$availableRoles} 
			{isOpen} 
			on:toggle={toggleDropdown}
			on:role-select={handleRoleSelect} 
		/>
	{/if}
</div>

<style>
	.role-selector {
		position: relative;
		font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
		width: 100%;
		max-width: 400px;
	}
</style> 