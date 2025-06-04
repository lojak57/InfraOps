/**
 * Realtime Chart Update Utilities
 * 
 * Live update management, timer handling, and real-time data streaming
 * for chart components.
 */

import { browser } from '$app/environment';

// ================================
// Types
// ================================

export interface UpdateManager {
	start: () => void;
	stop: () => void;
	isRunning: () => boolean;
	setInterval: (interval: number) => void;
}

export interface UpdateCallback {
	(): void;
}

// ================================
// Update Manager
// ================================

/**
 * Create live update manager for chart data
 */
export function createUpdateManager(
	callback: UpdateCallback,
	intervalMs: number = 4000
): UpdateManager {
	let timerId: number | null = null;
	let currentInterval = intervalMs;

	const start = () => {
		if (!browser || timerId !== null) return;
		
		timerId = setInterval(() => {
			callback();
		}, currentInterval);
	};

	const stop = () => {
		if (timerId !== null) {
			clearInterval(timerId);
			timerId = null;
		}
	};

	const isRunning = () => timerId !== null;

	const setInterval = (interval: number) => {
		currentInterval = interval;
		if (isRunning()) {
			stop();
			start();
		}
	};

	return {
		start,
		stop,
		isRunning,
		setInterval
	};
}

/**
 * Create auto-cleanup update manager that stops on component destroy
 */
export function createAutoCleanupUpdateManager(
	callback: UpdateCallback,
	intervalMs: number = 4000,
	onDestroy?: (cleanup: () => void) => void
): UpdateManager {
	const manager = createUpdateManager(callback, intervalMs);
	
	// Register cleanup if onDestroy is provided
	if (onDestroy) {
		onDestroy(() => manager.stop());
	}

	return manager;
}

// ================================
// Update State Management
// ================================

/**
 * Track live update state
 */
export class LiveUpdateState {
	private _isLive: boolean = false;
	private _lastUpdate: Date | null = null;
	private _updateCount: number = 0;

	get isLive(): boolean {
		return this._isLive;
	}

	get lastUpdate(): Date | null {
		return this._lastUpdate;
	}

	get updateCount(): number {
		return this._updateCount;
	}

	start(): void {
		this._isLive = true;
		this._lastUpdate = new Date();
	}

	stop(): void {
		this._isLive = false;
	}

	recordUpdate(): void {
		this._lastUpdate = new Date();
		this._updateCount++;
	}

	reset(): void {
		this._isLive = false;
		this._lastUpdate = null;
		this._updateCount = 0;
	}

	getTimeSinceLastUpdate(): number | null {
		if (!this._lastUpdate) return null;
		return Date.now() - this._lastUpdate.getTime();
	}
}

// ================================
// Update Frequency Control
// ================================

/**
 * Adaptive update frequency based on page visibility
 */
export function createAdaptiveUpdateManager(
	callback: UpdateCallback,
	normalInterval: number = 4000,
	backgroundInterval: number = 10000
): UpdateManager {
	let manager = createUpdateManager(callback, normalInterval);
	let isVisible = true;

	// Handle visibility changes
	const handleVisibilityChange = () => {
		const newIsVisible = !document.hidden;
		
		if (newIsVisible !== isVisible) {
			isVisible = newIsVisible;
			const newInterval = isVisible ? normalInterval : backgroundInterval;
			manager.setInterval(newInterval);
		}
	};

	// Setup visibility listener if in browser
	if (browser) {
		document.addEventListener('visibilitychange', handleVisibilityChange);
	}

	return {
		start: () => manager.start(),
		stop: () => {
			manager.stop();
			if (browser) {
				document.removeEventListener('visibilitychange', handleVisibilityChange);
			}
		},
		isRunning: () => manager.isRunning(),
		setInterval: (interval: number) => {
			normalInterval = interval;
			if (isVisible) {
				manager.setInterval(interval);
			}
		}
	};
}

// ================================
// Update Throttling
// ================================

/**
 * Throttle update frequency to prevent overwhelming
 */
export function createThrottledUpdateManager(
	callback: UpdateCallback,
	intervalMs: number = 4000,
	maxUpdatesPerSecond: number = 2
): UpdateManager {
	const minInterval = 1000 / maxUpdatesPerSecond;
	let lastUpdateTime = 0;

	const throttledCallback = () => {
		const now = Date.now();
		if (now - lastUpdateTime >= minInterval) {
			lastUpdateTime = now;
			callback();
		}
	};

	return createUpdateManager(throttledCallback, intervalMs);
}

// ================================
// Update Batching
// ================================

/**
 * Batch multiple updates into single callback
 */
export function createBatchedUpdateManager(
	callback: UpdateCallback,
	intervalMs: number = 4000,
	batchSize: number = 1
): UpdateManager {
	let updateQueue: Array<() => void> = [];
	let pendingUpdates = 0;

	const batchedCallback = () => {
		pendingUpdates++;
		
		if (pendingUpdates >= batchSize) {
			// Execute all queued updates
			callback();
			pendingUpdates = 0;
			updateQueue = [];
		}
	};

	return createUpdateManager(batchedCallback, intervalMs);
}

// ================================
// Utilities
// ================================

/**
 * Format update frequency for display
 */
export function formatUpdateFrequency(intervalMs: number): string {
	const seconds = intervalMs / 1000;
	if (seconds < 60) {
		return `${seconds}s`;
	}
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
}

/**
 * Calculate updates per minute
 */
export function getUpdatesPerMinute(intervalMs: number): number {
	return Math.round(60000 / intervalMs);
}

/**
 * Get recommended interval based on data type
 */
export function getRecommendedInterval(dataType: string): number {
	const type = dataType.toLowerCase();
	
	// Critical metrics need faster updates
	if (type.includes('safety') || type.includes('emergency')) return 1000;
	if (type.includes('pressure') || type.includes('temperature')) return 2000;
	if (type.includes('flow') || type.includes('rate')) return 3000;
	if (type.includes('volume') || type.includes('efficiency')) return 5000;
	
	return 4000; // Default
}

// ================================
// Constants
// ================================

export const DEFAULT_UPDATE_INTERVAL = 4000; // 4 seconds
export const FAST_UPDATE_INTERVAL = 1000; // 1 second
export const SLOW_UPDATE_INTERVAL = 10000; // 10 seconds
export const MAX_UPDATES_PER_SECOND = 2; 