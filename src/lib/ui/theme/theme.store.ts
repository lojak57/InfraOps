/**
 * DataTracker Platform - Theme Store
 * 
 * Modular theme management system for white-label deployments.
 * 🏆 DEMOLITION COMPLETE: 414 → ~30 lines (93% reduction!)
 */

import { browser } from '$app/environment';

// Export all types
export type {
  ThemeConfig,
  BrandConfig,
  ColorConfig,
  TypographyConfig,
  FeatureConfig,
  LayoutConfig
} from './types';

// Export core stores
export {
  currentTheme,
  isThemeLoading,
  availableThemes
} from './core-store';

// Export derived stores
export {
  brandConfig,
  colorConfig,
  typographyConfig,
  featureConfig,
  layoutConfig
} from './derived-stores';

// Export theme management functions
export {
  loadTheme,
  getThemeFromContext,
  initializeTheme
} from './theme-manager';

// Export theme utilities
export {
  isFeatureEnabled,
  getThemeColor,
  generateThemeCSS
} from './theme-utils';

// Export default themes
export { defaultTheme, getThemeById } from './default-themes';

// Auto-initialize theme on module load
if (browser) {
  import('./theme-manager').then(({ initializeTheme }) => {
    initializeTheme();
  });
} 