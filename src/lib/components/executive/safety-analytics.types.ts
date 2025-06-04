export interface SafetyIncidents {
  total: number;
  minor: number;
  major: number;
  critical: number;
  lastIncident: number;
}

export interface SafetyTraining {
  completed: number;
  total: number;
  percentage: number;
  upcoming: number;
}

export interface SafetyInspections {
  passed: number;
  total: number;
  percentage: number;
  failed: number;
}

export interface SafetyCompliance {
  dot: number;
  osha: number;
  environmental: number;
  internal: number;
}

export interface SafetyBreakdown {
  incidents: SafetyIncidents;
  training: SafetyTraining;
  inspections: SafetyInspections;
  compliance: SafetyCompliance;
}

export interface RegionalSafety {
  region: string;
  score: number;
  incidents: number;
  trend: 'up' | 'down' | 'stable';
}

export interface ScoreComposition {
  name: string;
  weight: number;
  score: number;
}

export interface SafetyAnalyticsData {
  breakdown: SafetyBreakdown;
  regional: RegionalSafety[];
  overallScore: number;
  scoreComposition: ScoreComposition[];
} 