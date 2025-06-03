/**
 * DataTracker Default Theme Configuration
 * 
 * Professional logistics operations theme with modern color palette
 * and feature set optimized for fleet and data management operations.
 */

import type { ThemeConfig } from '../theme.store';

export const dataTrackerTheme: ThemeConfig = {
  brand: {
    name: 'DataTracker',
    tagline: 'Professional Fleet and Logistics Operations Platform',
    logo: '/assets/datatracker-logo.png',
    favicon: '/assets/datatracker-favicon.png',
    domain: 'datatracker.com'
  },
  
  colors: {
    // DataTracker brand colors - modern professional palette
    primary: '#1E3A8A',        // Deep blue - main brand
    primaryDark: '#1E293B',    // Very dark blue for headers
    primaryLight: '#2563EB',   // Medium blue for accents
    
    secondary: '#0F766E',      // Dark teal for secondary elements
    secondaryDark: '#134E4A',  // Darker teal
    secondaryLight: '#14B8A6', // Lighter teal
    
    // Semantic colors for operations
    success: '#059669',        // Operations success (green)
    warning: '#D97706',        // Caution/maintenance (amber)
    error: '#DC2626',          // Critical alerts (red)
    info: '#2563EB',           // Information (blue)
    
    // Business operation specific colors
    operational: '#334155',    // Steel gray for operational elements
    equipment: '#EA580C',      // Orange for equipment/vehicles
    safety: '#DC2626',         // Safety red
    
    // Professional neutral palette
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
    overlay: 'rgba(30, 41, 59, 0.8)'
  },
  
  typography: {
    fontFamily: {
      sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      serif: '"Georgia", "Times New Roman", serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
      display: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px  
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem'  // 36px
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
      sm: '0.375rem',   // 6px
      md: '0.5rem',     // 8px
      lg: '0.75rem',    // 12px
      xl: '1rem'        // 16px
    },
    spacing: {
      xs: '0.5rem',     // 8px
      sm: '1rem',       // 16px
      md: '1.5rem',     // 24px
      lg: '2rem',       // 32px
      xl: '3rem'        // 48px
    }
  }
};

// Export as default for dynamic imports
export default dataTrackerTheme; 