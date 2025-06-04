export interface YardData {
  yardName: string;
  location: string;
  fleetSize: number;
  activeTrucks: number;
  driversAssigned: number;
  dailyUnits: number;
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

export interface YardAlert {
  id: string;
  yardId: string;
  type: 'maintenance' | 'efficiency' | 'safety' | 'volume_loss';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export interface RegionalYardSummary {
  totalYards: number;
  totalTrucks: number;
  activeTrucks: number;
  avgEfficiency: number;
  dailyUnits: number;
  alerts: YardAlert[];
}

export interface YardPerformanceRange {
  min: number;
  max: number;
  average: number;
}

export interface RegionalAverage {
  dailyUnits: number;
  efficiency: number;
  utilizationRate: number;
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

export type PerformanceMetric = 'efficiency' | 'utilization' | 'dailyUnits' | 'bph';

export interface RegionalYardComparisonEvents {
  close: void;
} 