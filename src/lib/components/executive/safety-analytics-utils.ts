export function getScoreColor(score: number): string {
  if (score >= 97) return 'text-green-600';
  if (score >= 95) return 'text-amber-600';
  return 'text-red-500';
}

export function getIncidentColor(incidents: number): string {
  if (incidents === 0) return 'text-green-600';
  if (incidents <= 1) return 'text-amber-600';
  return 'text-red-500';
}

export function getTrendDisplay(trend: 'up' | 'down' | 'stable'): { icon: string; text: string; color: string } {
  switch (trend) {
    case 'up':
      return { icon: '↗️', text: 'Improving', color: 'text-green-600' };
    case 'down':
      return { icon: '↘️', text: 'Needs attention', color: 'text-red-500' };
    default:
      return { icon: '→', text: 'Stable', color: 'text-slate-700' };
  }
}

export function getIncidentTypeColor(type: 'minor' | 'major' | 'critical'): string {
  switch (type) {
    case 'minor':
      return 'text-amber-600';
    case 'major':
      return 'text-red-500';
    case 'critical':
      return 'text-green-600';
    default:
      return 'text-slate-700';
  }
} 