/**
 * DataTracker Platform - Theme Utilities
 * 
 * Utility functions for working with themes
 */

import type { FeatureConfig, ColorConfig } from '../types/theme-types';
import { featureConfig, colorConfig } from '../theme.store';

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