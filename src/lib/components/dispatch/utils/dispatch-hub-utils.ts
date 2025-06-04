/**
 * Dispatch Hub Utilities
 * 
 * Utility functions for dispatch hub operations including breadcrumb generation,
 * tab management, statistics calculations, and formatting functions.
 */

import { formatDistanceToNow } from 'date-fns';
import type { 
  Home, 
  Building2, 
  Truck, 
  FileText 
} from 'lucide-svelte';

// ================================
// Types
// ================================

export type TabType = 'fleet' | 'yard' | 'truck' | 'job' | 'raw';

export interface BreadcrumbItem {
  label: string;
  level: string;
  icon: any;
}

export interface TabStats {
  fleet: {
    count: number;
    alerts: number;
    efficiency: number;
  };
  site: {
    count: number;
    alerts: number;
    efficiency: number;
  };
  asset: {
    count: number;
    alerts: number;
    efficiency: number;
  };
  job: {
    count: number;
    alerts: number;
    efficiency: number;
  };
}

// ================================
// Breadcrumb Utilities
// ================================

export function getBreadcrumbs(
  level: string, 
  selectedYard: string | null, 
  selectedTruck: string | null, 
  selectedJob: string | null,
  yardData: any[],
  terms: any,
  navTerms: any,
  icons: { Home: any, Building2: any, Truck: any, FileText: any }
): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [
    { 
      label: `${navTerms.dashboardName} Overview`, 
      level: 'fleet', 
      icon: icons.Home 
    }
  ];
  
  if (level !== 'fleet' && selectedYard) {
    const yard = yardData.find(y => y.id === selectedYard);
    crumbs.push({ 
      label: yard?.name || terms.site, 
      level: 'yard', 
      icon: icons.Building2 
    });
  }
  
  if (level !== 'fleet' && level !== 'yard' && selectedTruck) {
    crumbs.push({ 
      label: `${terms.asset} ${selectedTruck}`, 
      level: 'truck', 
      icon: icons.Truck 
    });
  }
  
  if (level === 'job' && selectedJob) {
    crumbs.push({ 
      label: `${terms.job} ${selectedJob}`, 
      level: 'job', 
      icon: icons.FileText 
    });
  }
  
  return crumbs;
}

// ================================
// Statistics Calculations
// ================================

export function calculateTabStats(
  fleetData: any,
  yardData: any[],
  truckData: any[],
  jobData: any[]
): TabStats {
  return {
    fleet: {
      count: 1,
      alerts: fleetData.alerts.length,
      efficiency: fleetData.efficiency
    },
    site: {
      count: yardData.length,
      alerts: yardData.reduce((sum, y) => sum + y.alerts.length, 0),
      efficiency: yardData.reduce((sum, y) => sum + y.efficiency, 0) / yardData.length
    },
    asset: {
      count: truckData.length,
      alerts: truckData.reduce((sum, t) => sum + t.alerts.length, 0),
      efficiency: truckData.reduce((sum, t) => sum + t.efficiency, 0) / truckData.length
    },
    job: {
      count: jobData.length,
      alerts: jobData.reduce((sum, h) => sum + h.alerts.length, 0),
      efficiency: jobData.reduce((sum, h) => sum + h.efficiency, 0) / jobData.length
    }
  };
}

// ================================
// Tab Management Logic
// ================================

export function getDefaultDrillDownForTab(
  tab: TabType,
  yardData: any[],
  truckData: any[],
  jobData: any[]
): { level: string; id?: string } | null {
  switch (tab) {
    case 'yard':
      const firstYard = yardData[0];
      return firstYard ? { level: 'yard', id: firstYard.id } : null;
      
    case 'truck':
      const firstYardForTruck = yardData[0];
      const firstTruck = truckData.find(t => t.yardId === firstYardForTruck?.id);
      return firstTruck ? { level: 'truck', id: firstTruck.id } : null;
      
    case 'job':
      const firstJob = jobData[0];
      return firstJob ? { level: 'job', id: firstJob.id } : null;
      
    default:
      return null;
  }
}

export function shouldResetOnTabChange(tab: TabType): boolean {
  return tab === 'raw';
}

// ================================
// Formatting Utilities
// ================================

export function formatLastUpdate(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatRevenue(revenue: number): string {
  return `$${(revenue / 1000000).toFixed(1)}M`;
}

export function formatEfficiency(efficiency: number): string {
  return `${efficiency.toFixed(1)}%`;
}

// ================================
// Validation Utilities
// ================================

export function isValidTab(tab: string): tab is TabType {
  return ['fleet', 'yard', 'truck', 'job', 'raw'].includes(tab);
}

export function canAccessTab(tab: TabType, level: string, hasData: boolean): boolean {
  switch (tab) {
    case 'fleet':
      return true;
    case 'yard':
    case 'truck':
    case 'job':
      return hasData;
    case 'raw':
      return true;
    default:
      return false;
  }
} 