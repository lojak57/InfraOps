import { Award, Target, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-svelte';
import type { YardData, StatusInfo, RegionalAverage, PerformanceMetric } from './regional-yard.types';

// Get status color and icon
export function getStatusInfo(status: string): StatusInfo {
  switch (status) {
    case 'excellent':
      return { color: 'text-emerald-600', icon: Award, bgColor: 'bg-emerald-50' };
    case 'good':
      return { color: 'text-blue-600', icon: Target, bgColor: 'bg-blue-50' };
    case 'attention':
      return { color: 'text-orange-600', icon: AlertTriangle, bgColor: 'bg-orange-50' };
    default:
      return { color: 'text-gray-600', icon: Target, bgColor: 'bg-gray-50' };
  }
}

// Get trend icon
export function getTrendIcon(trend: string) {
  switch (trend) {
    case 'up': return TrendingUp;
    case 'down': return TrendingDown;
    default: return null;
  }
}

// Get trend color
export function getTrendColor(trend: string): string {
  switch (trend) {
    case 'up': return 'text-emerald-600';
    case 'down': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

// Performance color coding
export function getPerformanceColor(value: number, metric: PerformanceMetric): string {
  switch (metric) {
    case 'efficiency':
      return value >= 95 ? 'text-emerald-600' : value >= 90 ? 'text-blue-600' : value >= 85 ? 'text-yellow-600' : 'text-red-600';
    case 'utilization':
      return value >= 85 ? 'text-emerald-600' : value >= 80 ? 'text-blue-600' : value >= 75 ? 'text-yellow-600' : 'text-red-600';
    case 'bpd':
      return value >= 2800 ? 'text-emerald-600' : value >= 2400 ? 'text-blue-600' : value >= 2000 ? 'text-yellow-600' : 'text-red-600';
    case 'bph':
      return value >= 180 ? 'text-emerald-600' : value >= 160 ? 'text-blue-600' : value >= 140 ? 'text-yellow-600' : 'text-red-600';
    default:
      return 'text-gray-900';
  }
}

// Get rank badge color - unified with performance status colors
export function getRankColor(rank: number, status: string): string {
  switch (status) {
    case 'excellent': return 'bg-green-600 text-white';
    case 'good': return 'bg-blue-600 text-white';
    case 'attention': return 'bg-red-600 text-white';
    default: return 'bg-slate-400 text-white';
  }
}

// Simple sparkline component
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

// Sorting function
export function sortYardData(data: YardData[], column: keyof YardData, direction: 'asc' | 'desc'): YardData[] {
  return data.sort((a, b) => {
    let aVal = a[column];
    let bVal = b[column];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (direction === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });
}

// Calculate regional averages
export function calculateRegionalAverage(yardData: YardData[]): RegionalAverage {
  return {
    totalBPD: Math.round(yardData.reduce((sum, yard) => sum + yard.totalBPD, 0) / yardData.length),
    efficiency: Math.round((yardData.reduce((sum, yard) => sum + yard.efficiency, 0) / yardData.length) * 10) / 10,
    utilization: Math.round((yardData.reduce((sum, yard) => sum + yard.utilizationRate, 0) / yardData.length) * 10) / 10,
    avgDriveTime: Math.round((yardData.reduce((sum, yard) => sum + yard.avgDriveTime, 0) / yardData.length) * 10) / 10
  };
}

// Get best performer
export function getBestPerformer(yardData: YardData[]): YardData | null {
  return yardData.find(yard => yard.rank === 1) || null;
}

// Get improvement opportunity
export function getImprovementOpportunity(yardData: YardData[]): YardData | null {
  return yardData.find(yard => yard.status === 'attention') || null;
} 