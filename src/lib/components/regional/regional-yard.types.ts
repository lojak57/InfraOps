export interface YardData {
  yardName: string;
  location: string;
  fleetSize: number;
  activeTrucks: number;
  driversAssigned: number;
  totalBPD: number;
  avgDriveTime: number;
  unitsPerHour: number;
  utilizationRate: number;
  efficiency: number;
  rank: number;
  trend: 'up' | 'down' | 'stable';
  status: 'excellent' | 'good' | 'attention';
  notes: string;
  sparklineData: number[];
}

export interface RegionalAverage {
  totalBPD: number;
  efficiency: number;
  utilization: number;
  avgDriveTime: number;
}

export interface StatusInfo {
  color: string;
  icon: any;
  bgColor: string;
}

export interface SortState {
  column: keyof YardData;
  direction: 'asc' | 'desc';
}

export type TimeframeOption = 'Last 7 Days' | 'Last 30 Days' | 'Custom';

export type PerformanceMetric = 'efficiency' | 'utilization' | 'bpd' | 'bph';

export interface RegionalYardComparisonEvents {
  close: void;
} 