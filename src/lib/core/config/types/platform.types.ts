/**
 * Platform Configuration Types
 * 
 * Type definitions for platform configuration, industry profiles,
 * terminology, features, branding, and workflow configurations.
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
  
  // Navigation & UI Labels
  intelligenceHub: string; // "Asset Intelligence Hub" | "Service Intelligence Center" | "Operations Intelligence"
  liveMonitoring: string;  // "Live Asset Monitoring" | "Real-time Service Tracking" | "Live Operations Monitor"
  operatorCenter: string;  // "Driver Center" | "Technician Portal" | "Field Operations"
  managementHub: string;   // "Fleet Management" | "Service Management" | "Operations Management"
  analytics: string;       // "Yard Analytics" | "Site Analytics" | "Location Intelligence"
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
  
  // Additional White-Label Branding
  logoSize?: {
    desktop: number;
    mobile: number;
  };
  favicon?: string;
  companyUrl?: string;
  supportEmail?: string;
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
// Utility Types
// ================================

export type IndustryId = 'baseline' | 'manufacturing' | 'water_delivery' | 'field_service' | 'restoration';

export type IconSet = 'industrial' | 'service' | 'logistics' | 'professional';

// ================================
// Backward Compatibility Types
// ================================

export type Job = any;     // Will alias to Job for logistics
export type Operator = any; // Will alias to Driver for logistics
export type Asset = any;    // Will alias to Truck for logistics
export type Site = any;     // Will alias to Yard for logistics 