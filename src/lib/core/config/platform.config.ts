/**
 * Platform Configuration System
 * 
 * Transforms DataTracker from logistics specific platform into
 * industry-agnostic white-label operations platform for underserved industries.
 */

// ================================
// Core Platform Types
// ================================

export interface IndustryProfile {
  id: string;
  name: string;
  terminology: IndustryTerminology;
  units: IndustryUnits;
  features: IndustryFeatures;
  branding: IndustryBranding;
  workflows: WorkflowConfig[];
}

export interface IndustryTerminology {
  // Core Operations
  job: string;           // "Job" | "Service Call" | "Restoration Job" | "Delivery"
  operator: string;      // "Driver" | "Technician" | "Field Agent" | "Specialist"
  asset: string;         // "Truck" | "Vehicle" | "Equipment" | "Unit"
  site: string;          // "Yard" | "Location" | "Jobsite" | "Facility"
  
  // Process Steps
  startTask: string;     // "Load Tank" | "Begin Service" | "Start Work" | "Pickup"
  completeTask: string;  // "Unload Tank" | "Complete Service" | "Finish Work" | "Delivery"
  inspection: string;    // "Pre-Trip" | "Pre-Service" | "Equipment Check" | "Safety Check"
  
  // Metrics & Measurements
  primaryMetric: string; // "Volume" | "Service Time" | "Area Covered" | "Items"
  secondaryMetric: string; // "Pressure" | "Completion Rate" | "Quality Score" | "Efficiency"
  
  // Dashboard Names
  dashboardName: string; // "Fleet Operations" | "Service Dispatch" | "Field Management"
  commandCenter: string; // "Dispatch Center" | "Operations Hub" | "Control Center"
}

export interface IndustryUnits {
  volume: string;        // "units" | "Gallons" | "Cubic Ft" | "Units"
  distance: string;      // "Miles" | "Blocks" | "Kilometers" | "Feet"
  temperature: string;   // "°F" | "°C" | "K"
  pressure: string;      // "PSI" | "Bar" | "kPa"
  time: string;          // "Hours" | "Minutes" | "Days"
  currency: string;      // "USD" | "CAD" | "EUR"
}

export interface IndustryFeatures {
  // Core Platform Features
  useRealTimeMap: boolean;
  useSensorMonitoring: boolean;
  usePreTaskChecklist: boolean;
  useInventoryTracking: boolean;
  useRouteOptimization: boolean;
  
  // Advanced Features
  useAIDispatch: boolean;
  usePredictiveAnalytics: boolean;
  useComplianceReporting: boolean;
  useCustomerPortal: boolean;
  useWeatherIntegration: boolean;
  
  // Industry-Specific
  useHazmatTracking: boolean;
  useEquipmentDiagnostics: boolean;
  useQualityAssurance: boolean;
  useEnvironmentalMonitoring: boolean;
}

export interface IndustryBranding {
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  platformName: string;
  tagline: string;
  iconSet: 'industrial' | 'service' | 'logistics' | 'professional';
}

export interface WorkflowConfig {
  id: string;
  name: string;
  steps: WorkflowStep[];
  requiredChecks: string[];
  estimatedDuration: number;
}

export interface WorkflowStep {
  id: string;
  name: string;
  icon: string;
  required: boolean;
  hasLocation: boolean;
  hasDocumentation: boolean;
  hasSignature: boolean;
}

// ================================
// Industry Presets
// ================================

export const industryPresets: Record<string, IndustryProfile> = {
  baseline: {
    id: 'baseline',
    name: 'Operations Management',
    terminology: {
      job: 'Job',
      operator: 'Operator',
      asset: 'Asset',
      site: 'Site',
      startTask: 'Start Task',
      completeTask: 'Complete Task',
      inspection: 'Pre-Task Check',
      primaryMetric: 'Volume',
      secondaryMetric: 'Efficiency',
      dashboardName: 'Operations Control',
      commandCenter: 'Operations Center'
    },
    units: {
      volume: 'Units',
      distance: 'Miles',
      temperature: '°F',
      pressure: 'PSI',
      time: 'Hours',
      currency: 'USD'
    },
    features: {
      useRealTimeMap: true,
      useSensorMonitoring: true,
      usePreTaskChecklist: true,
      useInventoryTracking: true,
      useRouteOptimization: true,
      useAIDispatch: true,
      usePredictiveAnalytics: true,
      useComplianceReporting: true,
      useCustomerPortal: true,
      useWeatherIntegration: false,
      useHazmatTracking: false,
      useEquipmentDiagnostics: true,
      useQualityAssurance: true,
      useEnvironmentalMonitoring: false
    },
    branding: {
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      platformName: 'OpsPlatform',
      tagline: 'Operations Management Platform',
      iconSet: 'professional'
    },
    workflows: [
      {
        id: 'standard_job',
        name: 'Standard Job',
        steps: [
          { id: 'pre_check', name: 'Pre-Task Check', icon: '✅', required: true, hasLocation: true, hasDocumentation: true, hasSignature: true },
          { id: 'start', name: 'Start Task', icon: '▶️', required: true, hasLocation: true, hasDocumentation: true, hasSignature: false },
          { id: 'in_progress', name: 'In Progress', icon: '🔄', required: true, hasLocation: true, hasDocumentation: false, hasSignature: false },
          { id: 'complete', name: 'Complete Task', icon: '✅', required: true, hasLocation: true, hasDocumentation: true, hasSignature: true }
        ],
        requiredChecks: ['asset_inspection', 'safety_equipment', 'documentation'],
        estimatedDuration: 180
      }
    ]
  },

  manufacturing: {
    id: 'manufacturing',
    name: 'Manufacturing Oil & Gas Transport Logistics',
    terminology: {
      job: 'Job',
      operator: 'Driver',
      asset: 'Truck',
      site: 'Yard',
      startTask: 'Load Tank',
      completeTask: 'Unload Tank',
      inspection: 'Pre-Trip Inspection',
      primaryMetric: 'Volume',
      secondaryMetric: 'Pressure',
      dashboardName: 'Fleet Operations',
      commandCenter: 'Dispatch Center'
    },
    units: {
      volume: 'units',
      distance: 'Miles',
      temperature: '°F',
      pressure: 'PSI',
      time: 'Hours',
      currency: 'USD'
    },
    features: {
      useRealTimeMap: true,
      useSensorMonitoring: true,
      usePreTaskChecklist: true,
      useInventoryTracking: true,
      useRouteOptimization: true,
      useAIDispatch: true,
      usePredictiveAnalytics: true,
      useComplianceReporting: true,
      useCustomerPortal: false,
      useWeatherIntegration: true,
      useHazmatTracking: true,
      useEquipmentDiagnostics: true,
      useQualityAssurance: true,
      useEnvironmentalMonitoring: true
    },
    branding: {
      primaryColor: '#D97706',
      secondaryColor: '#92400E',
      platformName: 'DataTracker',
      tagline: 'Intelligent Logistics Operations',
      iconSet: 'industrial'
    },
    workflows: [
      {
        id: 'standard_job',
        name: 'Standard Transport Job',
        steps: [
          { id: 'pre_trip', name: 'Pre-Trip Inspection', icon: '🔍', required: true, hasLocation: true, hasDocumentation: true, hasSignature: true },
          { id: 'load', name: 'Load Tank', icon: '🛢️', required: true, hasLocation: true, hasDocumentation: true, hasSignature: false },
          { id: 'transit', name: 'In Transit', icon: '🚛', required: true, hasLocation: true, hasDocumentation: false, hasSignature: false },
          { id: 'unload', name: 'Unload Tank', icon: '📤', required: true, hasLocation: true, hasDocumentation: true, hasSignature: true }
        ],
        requiredChecks: ['vehicle_inspection', 'safety_equipment', 'documentation'],
        estimatedDuration: 240
      }
    ]
  },

  water_delivery: {
    id: 'water_delivery',
    name: 'Water Delivery & Tank Services',
    terminology: {
      job: 'Delivery',
      operator: 'Driver',
      asset: 'Truck',
      site: 'Location',
      startTask: 'Begin Delivery',
      completeTask: 'Complete Delivery',
      inspection: 'Vehicle Check',
      primaryMetric: 'Gallons',
      secondaryMetric: 'Flow Rate',
      dashboardName: 'Delivery Operations',
      commandCenter: 'Dispatch Hub'
    },
    units: {
      volume: 'Gallons',
      distance: 'Miles',
      temperature: '°F',
      pressure: 'PSI',
      time: 'Hours',
      currency: 'USD'
    },
    features: {
      useRealTimeMap: true,
      useSensorMonitoring: true,
      usePreTaskChecklist: true,
      useInventoryTracking: true,
      useRouteOptimization: true,
      useAIDispatch: false,
      usePredictiveAnalytics: false,
      useComplianceReporting: false,
      useCustomerPortal: true,
      useWeatherIntegration: false,
      useHazmatTracking: false,
      useEquipmentDiagnostics: false,
      useQualityAssurance: true,
      useEnvironmentalMonitoring: false
    },
    branding: {
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      platformName: 'AquaFlow',
      tagline: 'Smart Water Delivery Management',
      iconSet: 'service'
    },
    workflows: [
      {
        id: 'water_delivery',
        name: 'Water Delivery',
        steps: [
          { id: 'vehicle_check', name: 'Vehicle Check', icon: '✅', required: true, hasLocation: false, hasDocumentation: false, hasSignature: false },
          { id: 'pickup', name: 'Water Pickup', icon: '💧', required: true, hasLocation: true, hasDocumentation: false, hasSignature: false },
          { id: 'delivery', name: 'Customer Delivery', icon: '🏠', required: true, hasLocation: true, hasDocumentation: true, hasSignature: true }
        ],
        requiredChecks: ['tank_cleanliness', 'equipment_function'],
        estimatedDuration: 90
      }
    ]
  },

  field_service: {
    id: 'field_service',
    name: 'Field Service Operations',
    terminology: {
      job: 'Service Call',
      operator: 'Technician',
      asset: 'Service Vehicle',
      site: 'Customer Location',
      startTask: 'Begin Service',
      completeTask: 'Complete Service',
      inspection: 'Equipment Check',
      primaryMetric: 'Service Time',
      secondaryMetric: 'Completion Rate',
      dashboardName: 'Service Operations',
      commandCenter: 'Service Dispatch'
    },
    units: {
      volume: 'Units',
      distance: 'Miles',
      temperature: '°F',
      pressure: 'PSI',
      time: 'Hours',
      currency: 'USD'
    },
    features: {
      useRealTimeMap: true,
      useSensorMonitoring: false,
      usePreTaskChecklist: true,
      useInventoryTracking: true,
      useRouteOptimization: true,
      useAIDispatch: true,
      usePredictiveAnalytics: true,
      useComplianceReporting: false,
      useCustomerPortal: true,
      useWeatherIntegration: false,
      useHazmatTracking: false,
      useEquipmentDiagnostics: true,
      useQualityAssurance: true,
      useEnvironmentalMonitoring: false
    },
    branding: {
      primaryColor: '#10B981',
      secondaryColor: '#047857',
      platformName: 'ServicePro',
      tagline: 'Intelligent Field Service Management',
      iconSet: 'professional'
    },
    workflows: [
      {
        id: 'hvac_service',
        name: 'HVAC Service Call',
        steps: [
          { id: 'arrival', name: 'Arrive On-Site', icon: '📍', required: true, hasLocation: true, hasDocumentation: false, hasSignature: false },
          { id: 'diagnosis', name: 'System Diagnosis', icon: '🔧', required: true, hasLocation: false, hasDocumentation: true, hasSignature: false },
          { id: 'repair', name: 'Perform Repair', icon: '⚙️', required: true, hasLocation: false, hasDocumentation: true, hasSignature: false },
          { id: 'completion', name: 'Service Complete', icon: '✅', required: true, hasLocation: false, hasDocumentation: true, hasSignature: true }
        ],
        requiredChecks: ['safety_equipment', 'parts_inventory'],
        estimatedDuration: 120
      }
    ]
  },

  restoration: {
    id: 'restoration',
    name: 'Disaster Restoration',
    terminology: {
      job: 'Restoration Job',
      operator: 'Restoration Specialist',
      asset: 'Equipment Unit',
      site: 'Property',
      startTask: 'Begin Restoration',
      completeTask: 'Complete Restoration',
      inspection: 'Site Assessment',
      primaryMetric: 'Area Covered',
      secondaryMetric: 'Moisture Level',
      dashboardName: 'Restoration Operations',
      commandCenter: 'Emergency Dispatch'
    },
    units: {
      volume: 'Cubic Ft',
      distance: 'Feet',
      temperature: '°F',
      pressure: 'PSI',
      time: 'Days',
      currency: 'USD'
    },
    features: {
      useRealTimeMap: false,
      useSensorMonitoring: true,
      usePreTaskChecklist: true,
      useInventoryTracking: false,
      useRouteOptimization: false,
      useAIDispatch: false,
      usePredictiveAnalytics: false,
      useComplianceReporting: true,
      useCustomerPortal: true,
      useWeatherIntegration: true,
      useHazmatTracking: false,
      useEquipmentDiagnostics: true,
      useQualityAssurance: true,
      useEnvironmentalMonitoring: true
    },
    branding: {
      primaryColor: '#EF4444',
      secondaryColor: '#DC2626',
      platformName: 'RestorePro',
      tagline: 'Emergency Response & Restoration Management',
      iconSet: 'service'
    },
    workflows: [
      {
        id: 'water_damage',
        name: 'Water Damage Restoration',
        steps: [
          { id: 'assessment', name: 'Damage Assessment', icon: '🔍', required: true, hasLocation: true, hasDocumentation: true, hasSignature: true },
          { id: 'extraction', name: 'Water Extraction', icon: '💧', required: true, hasLocation: true, hasDocumentation: true, hasSignature: false },
          { id: 'drying', name: 'Drying Process', icon: '🌪️', required: true, hasLocation: true, hasDocumentation: true, hasSignature: false },
          { id: 'completion', name: 'Restoration Complete', icon: '✅', required: true, hasLocation: true, hasDocumentation: true, hasSignature: true }
        ],
        requiredChecks: ['moisture_reading', 'photo_documentation', 'insurance_approval'],
        estimatedDuration: 4320 // 3 days
      }
    ]
  }
};

// ================================
// Platform Configuration
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
}

// ================================
// Convenience Exports
// ================================

export const platformConfig = PlatformConfig.getInstance();

// Backward compatibility with current logistics terminology
export type Job = any;     // Will alias to Job for logistics
export type Operator = any; // Will alias to Driver for logistics
export type Asset = any;    // Will alias to Truck for logistics
export type Site = any;     // Will alias to Yard for logistics 