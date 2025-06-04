import type { SafetyStatusResult } from './job-ticket.types';

export function getSafetyStatus(level: number, alarm: number, critical: number): SafetyStatusResult {
  if (level >= critical) return { status: 'critical', color: '#ef4444' };
  if (level >= alarm) return { status: 'warning', color: '#f59e0b' };
  return { status: 'safe', color: '#10b981' };
} 