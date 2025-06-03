/**
 * DataTracker Platform - Theme Store
 * 
 * Central theme management system for white-label deployments.
 * Supports dynamic theme pickup and runtime theme switching.
 */

import { writable, derived, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

// ================================
// Theme Configuration Types
// ================================

export interface ThemeConfig {
  brand: BrandConfig;
  colors: ColorConfig;
  typography: TypographyConfig;
  features: FeatureConfig;
  layout: LayoutConfig;
}

export interface BrandConfig {
  name: string;
  tagline: string;
  logo: string;
  favicon: string;
  domain?: string;
}

export interface ColorConfig {
  // Primary brand colors
  primary: string;
  primaryDark: string;
  primaryLight: string;
  
  // Secondary colors
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;
  
  // Semantic colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Industrial/transport specific
  industrial: string;
  machinery: string;
  safety: string;
  
  // Neutral colors
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
  
  // Background colors
  background: string;
  surface: string;
  overlay: string;
}

export interface TypographyConfig {
  fontFamily: {
    sans: string;
    serif: string;
    mono: string;
    display: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface FeatureConfig {
  hasExecutiveDashboard: boolean;
  hasDriverMobile: boolean;
  hasRealTimeMonitoring: boolean;
  hasMaintenanceModule: boolean;
  hasAnalytics: boolean;
  hasFleetTracking: boolean;
  hasComplianceTools: boolean;
  hasAPIAccess: boolean;
  hasMultiTenant: boolean;
  hasCustomBranding: boolean;
}

export interface LayoutConfig {
  sidebarWidth: string;
  headerHeight: string;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// ================================
// Default Theme Configurations
// ================================

export const defaultTheme: ThemeConfig = {
  brand: {
    name: 'DataTracker',
    tagline: 'Professional Logistics Operations Platform',
    logo: '/logo.png',
    favicon: '/favicon.png'
  },
  colors: {
    primary: '#007AFF',
    primaryDark: '#0056CC',
    primaryLight: '#339CFF',
    
    secondary: '#5AC8FA',
    secondaryDark: '#2CA8E8',
    secondaryLight: '#8CD9FC',
    
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',
    
    industrial: '#475569',
    machinery: '#B45309',
    safety: '#DC2626',
    
    gray50: '#F8FAFC',
    gray100: '#F1F5F9',
    gray200: '#E2E8F0',
    gray300: '#CBD5E1',
    gray400: '#94A3B8',
    gray500: '#64748B',
    gray600: '#475569',
    gray700: '#334155',
    gray800: '#1E293B',
    gray900: '#0F172A',
    
    background: '#FFFFFF',
    surface: '#F8FAFC',
    overlay: 'rgba(0, 0, 0, 0.5)'
  },
  typography: {
    fontFamily: {
      sans: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      serif: '"Georgia", serif',
      mono: '"JetBrains Mono", monospace',
      display: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  features: {
    hasExecutiveDashboard: true,
    hasDriverMobile: true,
    hasRealTimeMonitoring: true,
    hasMaintenanceModule: true,
    hasAnalytics: true,
    hasFleetTracking: true,
    hasComplianceTools: true,
    hasAPIAccess: true,
    hasMultiTenant: true,
    hasCustomBranding: true
  },
  layout: {
    sidebarWidth: '280px',
    headerHeight: '64px',
    borderRadius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem'
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem'
    }
  }
};

// ================================
// Theme Store Implementation
// ================================

export const currentTheme: Writable<ThemeConfig> = writable(defaultTheme);
export const isThemeLoading: Writable<boolean> = writable(false);
export const availableThemes: Writable<string[]> = writable(['default', 'datatracker']);

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
    
    switch (themeId.toLowerCase()) {
      case 'datatracker':
      case 'default':
        theme = defaultTheme;
        break;
      
      default:
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

// ================================
// Derived Stores for Easy Access
// ================================

export const brandConfig = derived(currentTheme, ($theme) => $theme.brand);
export const colorConfig = derived(currentTheme, ($theme) => $theme.colors);
export const typographyConfig = derived(currentTheme, ($theme) => $theme.typography);
export const featureConfig = derived(currentTheme, ($theme) => $theme.features);
export const layoutConfig = derived(currentTheme, ($theme) => $theme.layout);

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

// Auto-initialize theme on module load
if (browser) {
  initializeTheme();
} 