/**
 * DataTracker Platform - Theme Utilities
 * 
 * Utility functions for theme operations and CSS generation.
 */

import type { ThemeConfig, FeatureConfig, ColorConfig } from './types';
import { featureConfig, colorConfig } from './derived-stores';

// ================================
// Theme Utilities
// ================================

/**
 * Check if a feature is enabled in current theme
 */
export function isFeatureEnabled(feature: keyof FeatureConfig): boolean {
  let enabled = false;
  featureConfig.subscribe(config => {
    enabled = config[feature];
  })();
  return enabled;
}

/**
 * Get color value from current theme
 */
export function getThemeColor(colorKey: keyof ColorConfig): string {
  let color = '';
  colorConfig.subscribe(colors => {
    color = colors[colorKey];
  })();
  return color;
}

/**
 * Generate CSS custom properties string for inline styles
 */
export function generateThemeCSS(theme: ThemeConfig): string {
  const cssVars: string[] = [];
  
  Object.entries(theme.colors).forEach(([key, value]) => {
    cssVars.push(`--color-${key}: ${value}`);
  });
  
  Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
    cssVars.push(`--font-${key}: ${value}`);
  });
  
  return cssVars.join('; ');
} 