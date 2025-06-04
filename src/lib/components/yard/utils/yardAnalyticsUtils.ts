/**
 * Yard Analytics Utilities
 * 
 * Utility functions for formatting, sorting, color coding,
 * and generating sparklines for yard analytics data.
 */

import { TrendingUp, TrendingDown } from 'lucide-svelte';
import type { YardAnalyticsRow } from '../data/yardAnalyticsData';

// ================================
// Sorting Functions
// ================================

export type SortDirection = 'asc' | 'desc';
export type SortColumn = keyof YardAnalyticsRow;

export function sortAnalyticsData(
  data: YardAnalyticsRow[], 
  column: SortColumn, 
  direction: SortDirection
): YardAnalyticsRow[] {
  return [...data].sort((a, b) => {
    let aVal = a[column];
    let bVal = b[column];

    // Handle date sorting
    if (column === 'date') {
      aVal = new Date(aVal as string).getTime() as any;
      bVal = new Date(bVal as string).getTime() as any;
    }

    if (direction === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });
}

// ================================
// Formatting Functions
// ================================

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
}

export function formatNumber(value: number): string {
  return value.toLocaleString();
}

export function formatPercentage(value: number): string {
  return `${value}%`;
}

export function formatDecimal(value: number, decimals: number = 1): string {
  return value.toFixed(decimals);
}

// ================================
// Trend Functions
// ================================

export function getTrendIcon(trend: string) {
  switch (trend) {
    case 'up': return TrendingUp;
    case 'down': return TrendingDown;
    default: return null;
  }
}

export function getTrendColor(trend: string): string {
  switch (trend) {
    case 'up': return 'text-emerald-600';
    case 'down': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

// ================================
// Performance Color Coding
// ================================

export type MetricType = 'throughput' | 'unitsPerHour' | 'activeTrucks' | 'driversEnRoute' | 'loadEfficiency';

export function getPerformanceColor(value: number, metric: MetricType): string {
  switch (metric) {
    case 'throughput':
      return value >= 2800 ? 'text-emerald-600' : value >= 2600 ? 'text-yellow-600' : 'text-red-600';
    case 'unitsPerHour':
      return value >= 180 ? 'text-emerald-600' : value >= 160 ? 'text-yellow-600' : 'text-red-600';
    case 'activeTrucks':
      return value >= 75 ? 'text-emerald-600' : value >= 65 ? 'text-yellow-600' : 'text-red-600';
    case 'driversEnRoute':
      return value >= 70 ? 'text-emerald-600' : value >= 60 ? 'text-yellow-600' : 'text-red-600';
    case 'loadEfficiency':
      return value >= 4.0 ? 'text-emerald-600' : value >= 3.5 ? 'text-yellow-600' : 'text-red-600';
    default:
      return 'text-gray-900';
  }
}

// ================================
// Sparkline Generation
// ================================

export function generateSparklineSVG(data: number[]): string {
  const width = 80;
  const height = 24;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return `<svg width="${width}" height="${height}" class="sparkline">
    <polyline fill="none" stroke="currentColor" stroke-width="1.5" points="${points}"/>
  </svg>`;
}

// ================================
// Data Analysis Functions
// ================================

export function calculateAverages(data: YardAnalyticsRow[]) {
  if (data.length === 0) return null;
  
  const totals = data.reduce((acc, row) => ({
    throughput: acc.throughput + row.dailyThroughput,
    unitsPerHour: acc.unitsPerHour + row.unitsPerDriveHour,
    activeTrucks: acc.activeTrucks + row.activeTrucksPercent,
    driversEnRoute: acc.driversEnRoute + row.driversEnRoutePercent,
    loadEfficiency: acc.loadEfficiency + row.loadEfficiencyIndex
  }), {
    throughput: 0,
    unitsPerHour: 0,
    activeTrucks: 0,
    driversEnRoute: 0,
    loadEfficiency: 0
  });
  
  const count = data.length;
  return {
    averageThroughput: Math.round(totals.throughput / count),
    averageUnitsPerHour: Number((totals.unitsPerHour / count).toFixed(1)),
    averageActiveTrucks: Number((totals.activeTrucks / count).toFixed(1)),
    averageDriversEnRoute: Number((totals.driversEnRoute / count).toFixed(1)),
    averageLoadEfficiency: Number((totals.loadEfficiency / count).toFixed(1))
  };
}

export function countExternalFactorDays(data: YardAnalyticsRow[]): number {
  return data.filter(row => 
    row.notes.toLowerCase().includes('weather') ||
    row.notes.toLowerCase().includes('maintenance') ||
    row.notes.toLowerCase().includes('customer')
  ).length;
} 