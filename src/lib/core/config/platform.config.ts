/**
 * Platform Configuration - Re-exports for Backward Compatibility
 * 
 * This file has been refactored into modular components for better maintainability:
 * - Types: ./types/platform.types.ts
 * - Presets: ./presets/industry-presets.ts
 * - Manager: ./core/platform-manager.ts
 */

// ================================
// Type Re-exports
// ================================

export type {
  IndustryProfile,
  IndustryTerminology,
  IndustryUnits,
  IndustryFeatures,
  IndustryBranding,
  WorkflowConfig,
  WorkflowStep,
  IndustryId,
  IconSet,
  Job,
  Operator,
  Asset,
  Site
} from './types/platform.types';

// ================================
// Preset Re-exports
// ================================

export {
  industryPresets,
  getIndustryPreset,
  getAllIndustryIds,
  getIndustryNames
} from './presets/industry-presets';

// ================================
// Manager Re-exports
// ================================

export {
  PlatformConfig,
  platformConfig
} from './core/platform-manager';

// ================================
// Convenience Exports
// ================================

import { platformConfig } from './core/platform-manager';

// Backward compatibility exports
export const getTerminology = () => platformConfig.getTerminology();
export const getUnits = () => platformConfig.getUnits();
export const getFeatures = () => platformConfig.getFeatures();
export const getBranding = () => platformConfig.getBranding();
export const isFeatureEnabled = (feature: string) => platformConfig.isFeatureEnabled(feature as any);

// ================================
// Default Export for Compatibility
// ================================

export default platformConfig; 