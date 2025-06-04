/**
 * Industry Configuration Presets
 * 
 * Pre-defined industry configurations for different business domains.
 * Each preset contains terminology, features, branding, and workflow configurations
 * optimized for specific industry needs.
 */

import type { IndustryProfile } from '../types/platform.types';

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
      commandCenter: 'Operations Center',
      intelligenceHub: 'Operations Intelligence Hub',
      liveMonitoring: 'Live Operations Monitor',
      operatorCenter: 'Operator Portal',
      managementHub: 'Operations Management',
      analytics: 'Site Analytics'
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
      iconSet: 'professional',
      logoSize: { desktop: 120, mobile: 80 },
      supportEmail: 'support@opsplatform.com'
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
      commandCenter: 'Dispatch Center',
      intelligenceHub: 'Asset Intelligence Hub',
      liveMonitoring: 'Live Asset Monitoring',
      operatorCenter: 'Driver Center',
      managementHub: 'Fleet Management',
      analytics: 'Yard Analytics'
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
      iconSet: 'industrial',
      logoSize: { desktop: 120, mobile: 80 },
      supportEmail: 'support@datatracker.com'
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
      commandCenter: 'Dispatch Hub',
      intelligenceHub: 'Delivery Intelligence Center',
      liveMonitoring: 'Live Delivery Tracking',
      operatorCenter: 'Driver Portal',
      managementHub: 'Delivery Management',
      analytics: 'Location Analytics'
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
      iconSet: 'service',
      logoSize: { desktop: 120, mobile: 80 },
      supportEmail: 'support@aquaflow.com'
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
      commandCenter: 'Service Dispatch',
      intelligenceHub: 'Service Intelligence Center',
      liveMonitoring: 'Real-time Service Tracking',
      operatorCenter: 'Technician Portal',
      managementHub: 'Service Management',
      analytics: 'Site Analytics'
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
      iconSet: 'professional',
      logoSize: { desktop: 120, mobile: 80 },
      supportEmail: 'support@servicepro.com'
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
      commandCenter: 'Emergency Dispatch',
      intelligenceHub: 'Restoration Intelligence Center',
      liveMonitoring: 'Live Restoration Monitor',
      operatorCenter: 'Specialist Portal',
      managementHub: 'Restoration Management',
      analytics: 'Property Analytics'
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
      iconSet: 'service',
      logoSize: { desktop: 120, mobile: 80 },
      supportEmail: 'support@restorepro.com'
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
// Preset Utilities
// ================================

export function getIndustryPreset(industryId: string): IndustryProfile | undefined {
  return industryPresets[industryId];
}

export function getAllIndustryIds(): string[] {
  return Object.keys(industryPresets);
}

export function getIndustryNames(): Record<string, string> {
  return Object.entries(industryPresets).reduce((acc, [id, profile]) => {
    acc[id] = profile.name;
    return acc;
  }, {} as Record<string, string>);
} 