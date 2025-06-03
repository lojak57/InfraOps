/**
 * Interval Management Utility
 * Prevents memory leaks in Svelte components
 */

import { onDestroy } from 'svelte';

export interface IntervalHandle {
  clear: () => void;
  restart: () => void;
  isActive: () => boolean;
}

/**
 * Creates a managed interval that automatically cleans up on component destroy
 */
export function useInterval(
  callback: () => void,
  intervalMs: number,
  options: {
    immediate?: boolean;
    enabled?: boolean;
  } = {}
): IntervalHandle {
  const { immediate = false, enabled = true } = options;
  
  let intervalId: number | undefined;
  let isDestroyed = false;

  const clear = () => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  };

  const start = () => {
    if (isDestroyed || !enabled) return;
    
    clear(); // Clear any existing interval
    
    if (immediate) {
      callback();
    }
    
    intervalId = setInterval(() => {
      if (isDestroyed) {
        clear();
        return;
      }
      callback();
    }, intervalMs);
  };

  const restart = () => {
    clear();
    start();
  };

  const isActive = () => intervalId !== undefined;

  // Auto-cleanup on component destroy
  onDestroy(() => {
    isDestroyed = true;
    clear();
  });

  // Start the interval if enabled
  if (enabled) {
    start();
  }

  return {
    clear,
    restart,
    isActive
  };
}

/**
 * Creates a timeout that automatically cleans up
 */
export function useTimeout(
  callback: () => void,
  timeoutMs: number,
  options: { immediate?: boolean } = {}
): { clear: () => void; restart: () => void } {
  const { immediate = false } = options;
  
  let timeoutId: number | undefined;
  let isDestroyed = false;

  const clear = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  const start = () => {
    if (isDestroyed) return;
    
    clear();
    
    if (immediate) {
      callback();
      return;
    }
    
    timeoutId = setTimeout(() => {
      if (!isDestroyed) {
        callback();
      }
      timeoutId = undefined;
    }, timeoutMs);
  };

  const restart = () => {
    clear();
    start();
  };

  onDestroy(() => {
    isDestroyed = true;
    clear();
  });

  start();

  return {
    clear,
    restart
  };
} 