/**
 * DataTracker Platform - Theme DOM Utilities
 * 
 * Utilities for applying themes to the DOM
 */

import { browser } from '$app/environment';
import type { ThemeConfig } from '../types/theme-types';

/**
 * Apply theme to DOM by setting CSS custom properties
 */
export function applyThemeToDom(theme: ThemeConfig): void {
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