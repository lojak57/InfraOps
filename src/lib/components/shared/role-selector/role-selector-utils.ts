import type { Role, RoleId } from '$lib/stores/types/role.types';

export function createRoleSelectorHandlers() {
	let isOpen = false;

	function toggleDropdown() {
		isOpen = !isOpen;
		return isOpen;
	}

	function closeDropdown() {
		isOpen = false;
		return isOpen;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as Element;
		if (!target.closest('.role-selector')) {
			isOpen = false;
		}
		return isOpen;
	}

	return {
		toggleDropdown,
		closeDropdown,
		handleClickOutside,
		getIsOpen: () => isOpen,
		setIsOpen: (value: boolean) => {
			isOpen = value;
			return isOpen;
		}
	};
}

export function selectRoleHandler(
	role: Role, 
	setRole: (roleId: RoleId) => void,
	closeDropdown: () => void
) {
	setRole(role.id);
	closeDropdown();
}

export function handleBackToDashboard(
	clearRoleView: () => void,
	closeDropdown: () => void
) {
	clearRoleView();
	closeDropdown();
} 