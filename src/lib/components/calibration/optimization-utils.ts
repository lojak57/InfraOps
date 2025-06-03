import type { TruckRecommendation, PriorityLevel } from './optimization.types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDelta(delta: number): string {
  const sign = delta >= 0 ? '+' : '';
  return `${sign}${delta.toFixed(2)}%`;
}

export function getPriorityLevel(truck: TruckRecommendation): 'high' | 'medium' | 'low' {
  if (truck.status === 'critical') return 'high';
  if (Math.abs(truck.avgLoadDelta) > 0.3) return 'medium';
  return 'low';
}

export function getPriorityColor(priority: 'high' | 'medium' | 'low'): string {
  switch (priority) {
    case 'high': return '#ef4444';
    case 'medium': return '#f59e0b';
    case 'low': return '#3b82f6';
    default: return '#6b7280';
  }
}

export function getEstimatedDaysUntilCalibration(truck: TruckRecommendation): number {
  // Simulate estimation based on current delta trend
  const baseDays = truck.status === 'critical' ? 0 : 
          truck.status === 'warning' ? Math.floor(Math.random() * 7) + 1 :
          Math.floor(Math.random() * 14) + 7;
  return baseDays;
}

export function filterAndSortRecommendations(fleetData: TruckRecommendation[], limit: number = 5): TruckRecommendation[] {
  return fleetData
    .filter(truck => truck.status !== 'good')
    .sort((a, b) => {
      // Sort by priority: critical first, then by delta magnitude
      if (a.status === 'critical' && b.status !== 'critical') return -1;
      if (b.status === 'critical' && a.status !== 'critical') return 1;
      return Math.abs(b.avgLoadDelta) - Math.abs(a.avgLoadDelta);
    })
    .slice(0, limit);
} 