// Job Detail Utilities - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 1 - Critical Components

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
	const R = 3959; // Earth's radius in miles
	const dLat = (lat2 - lat1) * (Math.PI / 180);
	const dLng = (lng2 - lng1) * (Math.PI / 180);
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
		Math.sin(dLng / 2) * Math.sin(dLng / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}

// Calculate estimated travel time in minutes (assuming 45 mph average)
export function calculateTravelTime(distance: number): number {
	return Math.round((distance / 45) * 60);
}

// Format time to readable string
export function formatTime(date: Date): string {
	return date.toLocaleTimeString('en-US', { 
		hour: 'numeric', 
		minute: '2-digit',
		hour12: true 
	});
}

// Format duration from hours to readable string
export function formatDuration(hours: number): string {
	const h = Math.floor(hours);
	const m = Math.round((hours - h) * 60);
	return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// Get priority color for job priority level
export function getPriorityColor(priority: string): string {
	switch (priority) {
		case 'urgent': return '#dc2626';
		case 'high': return '#f59e0b';
		case 'normal': return '#3b82f6';
		case 'low': return '#6b7280';
		default: return '#6b7280';
	}
}

// Get formatted priority label
export function getPriorityLabel(priority: string): string {
	return priority.charAt(0).toUpperCase() + priority.slice(1);
}

// Calculate time until job starts
export function getTimeUntilJob(scheduledTime: Date): string {
	const now = new Date();
	const diffMs = scheduledTime.getTime() - now.getTime();
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
	
	if (diffMs < 0) return 'Overdue';
	if (diffHours > 0) return `${diffHours}h ${diffMins}m`;
	return `${diffMins}m`;
}

// Check if job is ready to start (within 30 minutes of scheduled time)
export function isJobReady(scheduledTime: Date): boolean {
	const now = new Date();
	const timeDiff = scheduledTime.getTime() - now.getTime();
	return timeDiff <= (30 * 60 * 1000); // Can start 30 minutes early
}

// Manage modal scroll behavior
export function toggleBodyScroll(isOpen: boolean): void {
	if (typeof document !== 'undefined') {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto';
	}
} 