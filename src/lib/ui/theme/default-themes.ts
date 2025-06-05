/**
 * DataTracker Platform - Default Theme Configurations
 * 
 * Predefined theme configurations for white-label deployments.
 */

import type { ThemeConfig } from './types';

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
// Theme Registry
// ================================

export const availableThemeIds = ['default', 'datatracker'] as const;
export type AvailableThemeId = typeof availableThemeIds[number];

/**
 * Get theme configuration by ID
 */
export function getThemeById(themeId: string): ThemeConfig {
  switch (themeId.toLowerCase()) {
    case 'datatracker':
    case 'default':
      return defaultTheme;
    
    default:
      console.warn(`Theme '${themeId}' not found, falling back to default`);
      return defaultTheme;
  }
} 