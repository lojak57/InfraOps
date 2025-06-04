import { Award, Target, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-svelte';
import type { YardData, StatusInfo, RegionalAverage, PerformanceMetric, RegionalYardSummary } from './regional-yard.types';

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
  let threshold: number;
  
  switch (metric) {
    case 'efficiency':
      if (value >= 95) return 'excellent';
      if (value >= 85) return 'good';
      if (value >= 75) return 'warning';
      return 'poor';
    
    case 'utilization':
      if (value >= 90) return 'excellent';
      if (value >= 80) return 'good';
      if (value >= 70) return 'warning';
      return 'poor';
    
    case 'dailyUnits':
      if (value >= 3000) return 'excellent';
      if (value >= 2500) return 'good';
      if (value >= 2000) return 'warning';
      return 'poor';
    
    case 'bph':
      if (value >= 180) return 'excellent';
      if (value >= 150) return 'good';
      if (value >= 120) return 'warning';
      return 'poor';
    
    default:
      return 'good';
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
export function sortYardData(data: YardData[], sortBy: keyof YardData, direction: 'asc' | 'desc'): YardData[] {
  return [...data].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return direction === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    return 0;
  });
}

// Calculate regional averages
export function calculateRegionalAverage(yardData: YardData[]): RegionalAverage {
  return {
    dailyUnits: Math.round(yardData.reduce((sum, yard) => sum + yard.dailyUnits, 0) / yardData.length),
    efficiency: Math.round((yardData.reduce((sum, yard) => sum + yard.efficiency, 0) / yardData.length) * 10) / 10,
    utilizationRate: Math.round((yardData.reduce((sum, yard) => sum + yard.utilizationRate, 0) / yardData.length) * 10) / 10,
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

export function needsAttention(value: number, metric: PerformanceMetric): boolean {
  let threshold: number;
  
  switch (metric) {
    case 'efficiency': threshold = 85; break;
    case 'utilization': threshold = 80; break;
    case 'dailyUnits': threshold = 2500; break;
    case 'bph': threshold = 150; break;
    default: return false;
  }
  
  return value < threshold;
}

export function getPerformanceBarColor(value: number, metric: PerformanceMetric): string {
  const performanceLevel = getPerformanceColor(value, metric);
  
  switch (performanceLevel) {
    case 'excellent': return '#10b981'; // Green
    case 'good': return '#3b82f6';      // Blue
    case 'warning': return '#f59e0b';   // Yellow
    case 'poor': return '#ef4444';      // Red
    default: return '#6b7280';          // Gray
  }
}

export function calculateRegionalSummary(yardData: YardData[]): RegionalYardSummary {
  if (yardData.length === 0) {
    return {
      totalYards: 0,
      totalTrucks: 0,
      activeTrucks: 0,
      avgEfficiency: 0,
      dailyUnits: 0,
      alerts: []
    };
  }

  return {
    totalYards: yardData.length,
    totalTrucks: yardData.reduce((sum, yard) => sum + yard.fleetSize, 0),
    activeTrucks: yardData.reduce((sum, yard) => sum + yard.activeTrucks, 0),
    avgEfficiency: Math.round(yardData.reduce((sum, yard) => sum + yard.efficiency, 0) / yardData.length),
    dailyUnits: Math.round(yardData.reduce((sum, yard) => sum + yard.dailyUnits, 0) / yardData.length),
    alerts: []
  };
} 