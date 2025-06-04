/**
 * Platform Configuration Store
 * 
 * Reactive Svelte store for platform configuration that enables
 * dynamic industry terminology and white-label branding throughout the app.
 */

import { writable, derived, type Readable } from 'svelte/store';
import { 
  platformConfig, 
  industryPresets,
  type IndustryProfile,
  type IndustryTerminology,
  type IndustryBranding,
  type IndustryFeatures,
  type IndustryUnits
} from '../config/platform.config';

// ================================
// Core Platform Store
// ================================

export const currentIndustryId = writable<string>('baseline');
export const currentProfile = writable<IndustryProfile>(industryPresets.baseline);

// Derived stores for specific configuration aspects
export const terminology: Readable<IndustryTerminology> = derived(
  currentProfile,
  $profile => $profile.terminology
);

export const branding: Readable<IndustryBranding> = derived(
  currentProfile,
  $profile => $profile.branding
);

export const features: Readable<IndustryFeatures> = derived(
  currentProfile,
  $profile => $profile.features
);

export const units: Readable<IndustryUnits> = derived(
  currentProfile,
  $profile => $profile.units
);

// ================================
// Platform Store Actions
// ================================

export const platformStore = {
  /**
   * Set the industry profile for the entire platform
   */
  setIndustry: (industryId: string) => {
    const profile = industryPresets[industryId];
    if (profile) {
      platformConfig.setIndustryProfile(industryId);
      currentIndustryId.set(industryId);
      currentProfile.set(profile);
      
      // Store preference in localStorage for persistence
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('platform-industry', industryId);
      }
    } else {
      throw new Error(`Industry profile '${industryId}' not found`);
    }
  },

  /**
   * Get current industry ID
   */
  getCurrentIndustry: (): string => {
    return platformConfig.getProfile().id;
  },

  /**
   * Check if a feature is enabled
   */
  isFeatureEnabled: (feature: keyof IndustryFeatures): boolean => {
    return platformConfig.isFeatureEnabled(feature);
  },

  /**
   * Initialize platform from stored preferences
   */
  initialize: () => {
    if (typeof localStorage !== 'undefined') {
      const storedIndustry = localStorage.getItem('platform-industry');
      if (storedIndustry && industryPresets[storedIndustry]) {
        platformStore.setIndustry(storedIndustry);
      }
    }
  },

  /**
   * Get all available industry profiles
   */
  getAvailableIndustries: () => {
    return Object.values(industryPresets).map(profile => ({
      id: profile.id,
      name: profile.name
    }));
  }
};

// ================================
// Convenience Derived Stores
// ================================

// Navigation-specific terminology
export const navigationTerms = derived(terminology, $terminology => ({
  intelligenceHub: $terminology.intelligenceHub,
  liveMonitoring: $terminology.liveMonitoring,
  operatorCenter: $terminology.operatorCenter,
  managementHub: $terminology.managementHub,
  analytics: $terminology.analytics,
  dashboardName: $terminology.dashboardName,
  commandCenter: $terminology.commandCenter
}));

// Asset-specific terminology
export const assetTerms = derived(terminology, $terminology => ({
  asset: $terminology.asset,
  operator: $terminology.operator,
  site: $terminology.site,
  job: $terminology.job
}));

// Brand-specific information
export const brandInfo = derived(branding, $branding => ({
  platformName: $branding.platformName,
  tagline: $branding.tagline,
  logoSize: $branding.logoSize || { desktop: 120, mobile: 80 },
  primaryColor: $branding.primaryColor,
  secondaryColor: $branding.secondaryColor,
  supportEmail: $branding.supportEmail
}));

// ================================
// Auto-initialization
// ================================

// Initialize platform configuration on store creation
if (typeof window !== 'undefined') {
  platformStore.initialize();
}

// Export store for use in components
export { currentProfile as platformProfile }; 