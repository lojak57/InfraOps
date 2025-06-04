/**
 * Role Store (Modular)
 * 
 * This file has been refactored into modular components for better maintainability:
 * - Types: ./types/role.types.ts
 * - Data: ./data/role-configurations.ts
 * 
 * Role-based dashboard system for different user types with personalized
 * metrics, charts, and layouts.
 */

import { writable } from 'svelte/store';

// Module imports
import type { Role, RoleId } from './types/role.types';
import { 
	roleConfigurations, 
	getRoleById, 
	getAllRoles, 
	getDefaultRole 
} from './data/role-configurations';

// ================================
// Store Implementation
// ================================

// Create the stores
export const selectedRole = writable<Role>(getDefaultRole()); // Default to overview
export const isRoleView = writable<boolean>(false); // Start with main dashboard view
export const availableRoles = writable<Role[]>(getAllRoles());

// ================================
// Store Actions
// ================================

/**
 * Set the active role by ID
 */
export function setRole(roleId: RoleId): void {
	const role = getRoleById(roleId);
	if (role) {
		selectedRole.set(role);
		isRoleView.set(true);
	} else {
		console.warn(`Role with ID '${roleId}' not found`);
	}
}

/**
 * Clear role view and return to main dashboard
 */
export function clearRoleView(): void {
	isRoleView.set(false);
}

/**
 * Reset to overview role
 */
export function resetToOverview(): void {
	const overviewRole = getDefaultRole();
	selectedRole.set(overviewRole);
	isRoleView.set(false);
}

/**
 * Toggle role view on/off
 */
export function toggleRoleView(): void {
	isRoleView.update(current => !current);
}

/**
 * Get role by ID (utility function)
 */
export function getRoleConfiguration(roleId: RoleId): Role | undefined {
	return getRoleById(roleId);
}

// ================================
// Type Re-exports for Compatibility
// ================================

export type {
	RoleId,
	MetricConfig,
	ChartConfig,
	LayoutConfig,
	ColorScheme,
	Role,
	MetricPriority,
	MetricImpact,
	TrendDirection,
	ChartType,
	GridLayout
} from './types/role.types';

// ================================
// Data Re-exports for Compatibility
// ================================

export { roleConfigurations as roles } from './data/role-configurations'; 