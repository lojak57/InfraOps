/**
 * DataTracker Platform - Theme Manager
 * 
 * Theme loading and management functions for runtime theme switching.
 */

import { browser } from '$app/environment';
import type { ThemeConfig } from './types';
import { defaultTheme, getThemeById } from './default-themes';
import { currentTheme, isThemeLoading } from './core-store';

// ================================
// Theme Management Functions
// ================================

/**
 * Load a theme by name/tenant ID
 */
export async function loadTheme(themeId: string): Promise<void> {
  if (!browser) return;
  
  isThemeLoading.set(true);
  
  try {
    let theme: ThemeConfig;
    
    // Try to get theme from built-in themes first
    try {
      theme = getThemeById(themeId);
    } catch {
      // Try to load custom theme
      try {
        const customTheme = await import(`./themes/${themeId}.theme.ts`);
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
 * Apply theme to DOM by setting CSS custom properties
 */
function applyThemeToDom(theme: ThemeConfig): void {
  if (!browser) return;
  
  const root = document.documentElement;
  
  // Apply color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  // Apply typography variables
  Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value);
  });
  
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    root.style.setProperty(`--text-${key}`, value);
  });
  
  // Apply layout variables
  root.style.setProperty('--sidebar-width', theme.layout.sidebarWidth);
  root.style.setProperty('--header-height', theme.layout.headerHeight);
  
  Object.entries(theme.layout.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });
  
  Object.entries(theme.layout.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });
  
  // Update document title and favicon
  document.title = `${theme.brand.name} - ${theme.brand.tagline}`;
  
  const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
  if (favicon) {
    favicon.href = theme.brand.favicon;
  }
}

/**
 * Get theme from URL or localStorage
 */
export function getThemeFromContext(): string {
  if (!browser) return 'default';
  
  // Check URL for tenant/theme parameter
  const urlParams = new URLSearchParams(window.location.search);
  const urlTheme = urlParams.get('theme') || urlParams.get('tenant');
  if (urlTheme) return urlTheme;
  
  // Check for subdomain-based theming
  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];
  if (subdomain && subdomain !== 'www' && subdomain !== 'localhost') {
    return subdomain;
  }
  
  // Check localStorage
  const storedTheme = localStorage.getItem('datatracker-theme');
  if (storedTheme) return storedTheme;
  
  return 'default';
}

/**
 * Initialize theme system
 */
export function initializeTheme(): void {
  if (!browser) return;
  
  const themeId = getThemeFromContext();
  loadTheme(themeId);
} 