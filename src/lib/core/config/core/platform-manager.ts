/**
 * Platform Configuration Manager
 * 
 * Singleton class for managing platform configuration, industry profiles,
 * and runtime configuration state.
 */

import type { 
  IndustryProfile, 
  IndustryTerminology, 
  IndustryUnits, 
  IndustryFeatures, 
  IndustryBranding 
} from '../types/platform.types';
import { industryPresets } from '../presets/industry-presets';

// ================================
// Platform Configuration Manager
// ================================

export class PlatformConfig {
  private static instance: PlatformConfig;
  private currentProfile: IndustryProfile;

  private constructor() {
    // Default to baseline (industry-agnostic configuration)
    this.currentProfile = industryPresets.baseline;
  }

  public static getInstance(): PlatformConfig {
    if (!PlatformConfig.instance) {
      PlatformConfig.instance = new PlatformConfig();
    }
    return PlatformConfig.instance;
  }

  public setIndustryProfile(industryId: string): void {
    const profile = industryPresets[industryId];
    if (profile) {
      this.currentProfile = profile;
    } else {
      throw new Error(`Industry profile '${industryId}' not found`);
    }
  }

  public getProfile(): IndustryProfile {
    return this.currentProfile;
  }

  public getTerminology(): IndustryTerminology {
    return this.currentProfile.terminology;
  }

  public getUnits(): IndustryUnits {
    return this.currentProfile.units;
  }

  public getFeatures(): IndustryFeatures {
    return this.currentProfile.features;
  }

  public getBranding(): IndustryBranding {
    return this.currentProfile.branding;
  }

  public isFeatureEnabled(feature: keyof IndustryFeatures): boolean {
    return this.currentProfile.features[feature];
  }

  // ================================
  // Utility Methods
  // ================================

  public getCurrentIndustryId(): string {
    return this.currentProfile.id;
  }

  public getCurrentIndustryName(): string {
    return this.currentProfile.name;
  }

  public getAvailableIndustries(): Array<{ id: string; name: string }> {
    return Object.values(industryPresets).map(profile => ({
      id: profile.id,
      name: profile.name
    }));
  }

  public resetToDefault(): void {
    this.currentProfile = industryPresets.baseline;
  }

  // ================================
  // Configuration Validation
  // ================================

  public validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate required fields
    if (!this.currentProfile.id) {
      errors.push('Profile ID is required');
    }

    if (!this.currentProfile.name) {
      errors.push('Profile name is required');
    }

    // Validate branding
    if (!this.currentProfile.branding.platformName) {
      errors.push('Platform name is required');
    }

    if (!this.currentProfile.branding.primaryColor) {
      errors.push('Primary color is required');
    }

    // Validate terminology
    const terminology = this.currentProfile.terminology;
    const requiredTerms = ['job', 'operator', 'asset', 'site'];
    
    for (const term of requiredTerms) {
      if (!terminology[term as keyof IndustryTerminology]) {
        errors.push(`${term} terminology is required`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// ================================
// Convenience Exports
// ================================

export const platformConfig = PlatformConfig.getInstance(); 