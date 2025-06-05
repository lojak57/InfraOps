/**
 * DataTracker Platform - Theme Types
 * 
 * Type definitions for the theme system
 */

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