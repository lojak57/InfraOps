import type { SafetyAnalyticsData } from './safety-analytics.types';

export const mockSafetyAnalyticsData: SafetyAnalyticsData = {
  overallScore: 96.8,
  breakdown: {
    incidents: {
      total: 3,
      minor: 2,
      major: 1,
      critical: 0,
      lastIncident: 23
    },
    training: {
      completed: 189,
      total: 195,
      percentage: 96.9,
      upcoming: 6
    },
    inspections: {
      passed: 247,
      total: 250,
      percentage: 98.8,
      failed: 3
    },
    compliance: {
      dot: 98.2,
      osha: 97.5,
      environmental: 99.1,
      internal: 96.3
    }
  },
  regional: [
    { region: 'Metro Hub Beta', score: 97.8, incidents: 0, trend: 'up' },
    { region: 'Metro Hub Gamma', score: 96.2, incidents: 1, trend: 'stable' },
    { region: 'Metro Hub Alpha', score: 98.1, incidents: 0, trend: 'up' },
    { region: 'Metro Hub Delta', score: 94.9, incidents: 2, trend: 'down' }
  ],
  scoreComposition: [
    { name: 'Incident Rate', weight: 40, score: 94.5 },
    { name: 'Training Compliance', weight: 25, score: 96.9 },
    { name: 'Vehicle Inspections', weight: 20, score: 98.8 },
    { name: 'Regulatory Compliance', weight: 15, score: 97.7 }
  ]
}; 