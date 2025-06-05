/**
 * DataTracker Platform - Core Theme Stores
 * 
 * Basic Svelte store definitions for theme management.
 */

import { writable, type Writable } from 'svelte/store';
import type { ThemeConfig } from './types';
import { defaultTheme } from './default-themes';

// ================================
// Core Theme Stores
// ================================

export const currentTheme: Writable<ThemeConfig> = writable(defaultTheme);
export const isThemeLoading: Writable<boolean> = writable(false);
export const availableThemes: Writable<string[]> = writable(['default', 'datatracker']); 