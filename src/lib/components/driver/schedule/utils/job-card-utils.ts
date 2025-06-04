// Job Card Utilities - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @original-size: Part of 613-line component → @current-size: ~80 lines  
// @phase: Phase 6 - Driver Components
// @extractors: All utility functions for job card operations

import type { Priority } from '../types/job-card.types.js';

// Priority color utilities
export function getPriorityColor(priority: Priority): string {
	switch (priority) {
		case 'urgent': return 'bg-red-500';
		case 'high': return 'bg-red-400';
		case 'normal': return 'bg-gray-400';
		case 'low': return 'bg-gray-300';
		default: return 'bg-gray-300';
	}
}

export function getPriorityLabel(priority: Priority): string {
	return priority.charAt(0).toUpperCase() + priority.slice(1);
}

// Time formatting utilities
export function formatTime(date: Date): string {
	return date.toLocaleTimeString('en-US', { 
		hour: '2-digit', 
		minute: '2-digit',
		hour12: true 
	});
}

export function formatDuration(hours: number): string {
	const h = Math.floor(hours);
	const m = Math.round((hours - h) * 60);
	return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// Time status utilities
export function getTimeUntilJob(scheduledTime: Date): string {
	const now = new Date();
	const diffMs = scheduledTime.getTime() - now.getTime();
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
	
	if (diffMs < 0) return 'Overdue';
	if (diffHours > 0) return `${diffHours}h ${diffMins}m`;
	return `${diffMins}m`;
}

export function isJobSoon(scheduledTime: Date): boolean {
	const now = new Date();
	const diffMs = scheduledTime.getTime() - now.getTime();
	return diffMs > 0 && diffMs < (2 * 60 * 60 * 1000); // 2 hours
}

export function isJobOverdue(scheduledTime: Date): boolean {
	const now = new Date();
	return scheduledTime.getTime() < now.getTime();
}

// Time status CSS class utilities
export function getTimeStatusClass(scheduledTime: Date): string {
	if (isJobOverdue(scheduledTime)) return 'overdue';
	if (isJobSoon(scheduledTime)) return 'soon';
	return 'normal';
}

// Priority CSS class utilities
export function getPriorityClass(priority: Priority): string {
	return priority;
}

// Location name truncation utility
export function truncateLocationName(name: string): string {
	const words = name.split(' ');
	if (words.length >= 2) {
		return `${words[0]} ${words[1]}...`;
	}
	return name;
}

// Load type badge utilities
export function getLoadTypeBadgeText(loadType: string): string {
	return loadType.toUpperCase();
} 