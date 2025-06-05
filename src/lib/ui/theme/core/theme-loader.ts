/**
 * DataTracker Platform - Theme Loader
 * 
 * Theme loading and management functionality
 */

import { browser } from '$app/environment';
import type { ThemeConfig } from '../types/theme-types';
import { defaultTheme } from '../config/default-theme';
import { applyThemeToDom, getThemeFromContext } from '../utils/theme-dom-utils';
import { currentTheme, isThemeLoading } from '../theme.store';

/**
 * Load a theme by name/tenant ID
 */
export async function loadTheme(themeId: string): Promise<void> {
  if (!browser) return;
  
  isThemeLoading.set(true);
  
  try {
    let theme: ThemeConfig;
    
    switch (themeId.toLowerCase()) {
      case 'datatracker':
      case 'default':
        theme = defaultTheme;
        break;
      
      default:
        // Try to load custom theme
        try {
          const customTheme = await import(`../themes/${themeId}.theme.ts`);
          theme = customTheme.default || customTheme.theme;
        } catch (error) {
          console.warn(`Theme '${themeId}' not found, falling back to default`);
          theme = defaultTheme;
        }
    }
    
    currentTheme.set(theme);
    applyThemeToDom(theme);
    
    // Store theme preference
    localStorage.setItem('datatracker-theme', themeId);
    
  } catch (error) {
    console.error('Failed to load theme:', error);
    currentTheme.set(defaultTheme);
  } finally {
    isThemeLoading.set(false);
  }
}

/**
 * Initialize theme system
 */
export function initializeTheme(): void {
  if (!browser) return;
  
  const themeId = getThemeFromContext();
  loadTheme(themeId);
} 