/**
 * Document Page Utilities
 * 
 * Utility functions for document page operations including event handlers,
 * state management, and UI interactions.
 */

// ================================
// Types
// ================================

export type TabType = 'library' | 'upload' | 'compliance';

// ================================
// Event Handlers
// ================================

/**
 * Handle document upload success
 */
export function handleDocumentUploaded(event: CustomEvent): void {
	console.log('Document uploaded:', event.detail);
	// Could show a success toast here in the future
}

/**
 * Handle upload error
 */
export function handleUploadError(event: CustomEvent): void {
	console.error('Upload error:', event.detail);
	// Could show an error toast here in the future
}

/**
 * Handle tab change
 */
export function handleTabChange(
	tab: TabType, 
	callback?: (tab: TabType) => void
): void {
	if (callback) {
		callback(tab);
	}
}

/**
 * Handle modal close
 */
export function handleModalClose(callback: () => void): void {
	callback();
}

// ================================
// State Utilities
// ================================

/**
 * Get active tab class
 */
export function getActiveTabClass(
	currentTab: TabType, 
	targetTab: TabType
): boolean {
	return currentTab === targetTab;
}

/**
 * Check if tab has alerts
 */
export function hasAlerts(alertCount: number): boolean {
	return alertCount > 0;
}

/**
 * Filter unacknowledged alerts
 */
export function getUnacknowledgedAlerts(alerts: any[]): any[] {
	return alerts.filter(alert => !alert.acknowledged);
}

// ================================
// UI Utilities
// ================================

/**
 * Format document count for display
 */
export function formatDocumentCount(count: number): string {
	return count.toString();
}

/**
 * Format alert count for badge
 */
export function formatAlertCount(count: number): string {
	return count > 99 ? '99+' : count.toString();
}

/**
 * Check if modal should be shown
 */
export function shouldShowModal(isOpen: boolean): boolean {
	return isOpen;
}

// ================================
// Validation Utilities
// ================================

/**
 * Validate tab type
 */
export function isValidTab(tab: string): tab is TabType {
	return ['library', 'upload', 'compliance'].includes(tab);
}

/**
 * Get default tab
 */
export function getDefaultTab(): TabType {
	return 'library';
}

// ================================
// Constants
// ================================

export const DEFAULT_CUSTOMER_ID = 'customer-001';

export const TAB_CONFIG = {
	library: {
		icon: 'Library',
		label: 'Document Library'
	},
	compliance: {
		icon: 'Shield',
		label: 'Compliance'
	},
	upload: {
		icon: 'Upload',
		label: 'Upload'
	}
} as const; 