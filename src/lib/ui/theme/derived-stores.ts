/**
 * DataTracker Platform - Derived Theme Stores
 * 
 * Derived stores for easy access to specific theme properties.
 */

import { derived } from 'svelte/store';
import { currentTheme } from './core-store';

// ================================
// Derived Stores for Easy Access
// ================================

export const brandConfig = derived(currentTheme, ($theme) => $theme.brand);
export const colorConfig = derived(currentTheme, ($theme) => $theme.colors);
export const typographyConfig = derived(currentTheme, ($theme) => $theme.typography);
export const featureConfig = derived(currentTheme, ($theme) => $theme.features);
export const layoutConfig = derived(currentTheme, ($theme) => $theme.layout); 