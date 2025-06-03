export interface AnimationConfig {
  start: number;
  end: number;
  duration: number;
}

export interface CounterAnimationState {
  animatedCalibrationsAvoided: number;
  animatedMoneySaved: number;
  isAnimating: boolean;
  lastAnimatedValues: {
    avoided: number;
    saved: number;
  };
}

export interface TruckRecommendation {
  id: string;
  status: 'critical' | 'warning' | 'good';
  avgLoadDelta: number;
}

export interface PriorityLevel {
  level: 'high' | 'medium' | 'low';
  color: string;
  estimatedDays: number;
}

export interface OptimizationInsight {
  icon: string;
  metric: string;
  label: string;
  value: number;
}

export interface FleetStats {
  calibrationsAvoided: number;
  moneySaved: number;
  good: number;
  total: number;
  avgDelta: number;
}

export interface CostBreakdown {
  annualSavings: number;
  annualTotal: number;
} 