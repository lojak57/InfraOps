/**
 * Job Calculation Utilities
 * Pure functions extracted from JobDetailModal for reusability and testing
 */

import type { Location, ScheduledJob, JobCalculations } from '$lib/types/job.types';

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Format time to user-friendly string
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
}

/**
 * Format duration from hours to human-readable string
 */
export function formatDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

/**
 * Get priority color based on priority level
 */
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'urgent': return '#dc2626';
    case 'high': return '#f59e0b';
    case 'normal': return '#3b82f6';
    case 'low': return '#6b7280';
    default: return '#6b7280';
  }
}

/**
 * Get formatted priority label
 */
export function getPriorityLabel(priority: string): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

/**
 * Calculate time until job starts
 */
export function getTimeUntilJob(scheduledTime: Date): string {
  const now = new Date();
  const diffMs = scheduledTime.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffMs < 0) return 'Overdue';
  if (diffHours > 0) return `${diffHours}h ${diffMins}m`;
  return `${diffMins}m`;
}

/**
 * Check if job is ready to start (within 30 minutes)
 */
export function isJobReady(job: ScheduledJob): boolean {
  if (!job) return false;
  const now = new Date();
  const timeDiff = job.scheduledTime.getTime() - now.getTime();
  return timeDiff <= (30 * 60 * 1000); // Can start 30 minutes early
}

/**
 * Calculate all job-related metrics
 */
export function calculateJobMetrics(job: ScheduledJob, currentLocation: Location): JobCalculations {
  const distanceToPickup = calculateDistance(
    currentLocation.lat, 
    currentLocation.lng, 
    job.pickupLocation.coordinates.lat, 
    job.pickupLocation.coordinates.lng
  );

  const estimatedTravelTime = Math.round((distanceToPickup / 45) * 60); // Assuming 45 mph average
  const timeUntilJob = getTimeUntilJob(job.scheduledTime);
  const jobReady = isJobReady(job);

  return {
    distanceToPickup,
    estimatedTravelTime,
    timeUntilJob,
    isJobReady: jobReady
  };
} 