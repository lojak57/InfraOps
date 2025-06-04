/**
 * Yard Analytics Mock Data
 * 
 * Sample data for yard performance analytics demonstrating
 * operational context and performance metrics.
 */

// ================================
// Types
// ================================

export interface YardAnalyticsRow {
  date: string;
  dailyThroughput: number;
  unitsPerDriveHour: number;
  activeTrucksPercent: number;
  driversEnRoutePercent: number;
  loadEfficiencyIndex: number;
  notes: string;
  trend: 'up' | 'down' | 'stable';
  sparklineData: number[];
}

// ================================
// Mock Analytics Data
// ================================

export const yardAnalyticsData: YardAnalyticsRow[] = [
  {
    date: '2024-01-15',
    dailyThroughput: 2847,
    unitsPerDriveHour: 185.3,
    activeTrucksPercent: 75.3,
    driversEnRoutePercent: 68.2,
    loadEfficiencyIndex: 4.2,
    notes: 'Peak day - all systems optimal',
    trend: 'up',
    sparklineData: [2650, 2720, 2780, 2810, 2847, 2890, 2920]
  },
  {
    date: '2024-01-14',
    dailyThroughput: 2720,
    unitsPerDriveHour: 178.9,
    activeTrucksPercent: 71.8,
    driversEnRoutePercent: 65.4,
    loadEfficiencyIndex: 3.9,
    notes: 'Slight weather delays morning',
    trend: 'up',
    sparklineData: [2580, 2620, 2670, 2690, 2720, 2750, 2780]
  },
  {
    date: '2024-01-13',
    dailyThroughput: 2535,
    unitsPerDriveHour: 165.2,
    activeTrucksPercent: 67.4,
    driversEnRoutePercent: 62.1,
    loadEfficiencyIndex: 3.6,
    notes: 'Equipment maintenance - 3 trucks down',
    trend: 'down',
    sparklineData: [2620, 2590, 2570, 2550, 2535, 2520, 2510]
  },
  {
    date: '2024-01-12',
    dailyThroughput: 2892,
    unitsPerDriveHour: 192.7,
    activeTrucksPercent: 82.1,
    driversEnRoutePercent: 74.5,
    loadEfficiencyIndex: 4.8,
    notes: 'High demand day - extra shifts',
    trend: 'up',
    sparklineData: [2750, 2800, 2830, 2860, 2892, 2910, 2920]
  },
  {
    date: '2024-01-11',
    dailyThroughput: 2674,
    unitsPerDriveHour: 174.8,
    activeTrucksPercent: 73.6,
    driversEnRoutePercent: 67.8,
    loadEfficiencyIndex: 4.1,
    notes: 'Normal operations',
    trend: 'stable',
    sparklineData: [2650, 2660, 2670, 2674, 2680, 2675, 2670]
  },
  {
    date: '2024-01-10',
    dailyThroughput: 2456,
    unitsPerDriveHour: 158.9,
    activeTrucksPercent: 65.2,
    driversEnRoutePercent: 58.7,
    loadEfficiencyIndex: 3.4,
    notes: 'Customer pipeline maintenance',
    trend: 'down',
    sparklineData: [2580, 2550, 2520, 2490, 2456, 2440, 2430]
  },
  {
    date: '2024-01-09',
    dailyThroughput: 2789,
    unitsPerDriveHour: 183.4,
    activeTrucksPercent: 76.8,
    driversEnRoutePercent: 71.2,
    loadEfficiencyIndex: 4.4,
    notes: 'Strong performance - no issues',
    trend: 'up',
    sparklineData: [2700, 2730, 2760, 2780, 2789, 2800, 2810]
  }
];

// ================================
// Summary Statistics
// ================================

export const yardAnalyticsSummary = {
  averageThroughput: 2701,
  averageUnitsPerHour: 174.2,
  averageUtilization: 73.5,
  operationalEfficiency: 92.3,
  daysWithExternalFactors: 2,
  totalDaysAnalyzed: 7
}; 