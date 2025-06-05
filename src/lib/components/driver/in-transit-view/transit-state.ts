export interface TransitState {
  transitSpeed: number;
  distanceToDelivery: number;
  estimatedArrival: Date;
  tankPressure: number;
  loadTemperature: number;
  alertLevel: 'normal' | 'caution' | 'warning';
  maxSpeedAlert: number;
}

export function createInitialTransitState(): TransitState {
  return {
    transitSpeed: 58, // mph
    distanceToDelivery: 142.7, // miles remaining
    estimatedArrival: new Date(Date.now() + 150 * 60 * 1000), // 2.5 hours
    tankPressure: 145, // PSI
    loadTemperature: 78, // F
    alertLevel: 'normal', // 'normal' | 'caution' | 'warning'
    maxSpeedAlert: 65 // Speed limit for hazmat transport
  };
}

export function updateTransitSpeed(currentState: TransitState, newSpeed: number): TransitState {
  const alertLevel = newSpeed > currentState.maxSpeedAlert ? 'warning' : 'normal';
  
  return {
    ...currentState,
    transitSpeed: newSpeed,
    alertLevel
  };
}

export function updateDistanceToDelivery(currentState: TransitState, newDistance: number): TransitState {
  // Recalculate estimated arrival based on current speed
  const hoursRemaining = newDistance / currentState.transitSpeed;
  const estimatedArrival = new Date(Date.now() + hoursRemaining * 60 * 60 * 1000);
  
  return {
    ...currentState,
    distanceToDelivery: newDistance,
    estimatedArrival
  };
}

export function formatEstimatedArrival(arrival: Date): string {
  return arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function getAlertColor(alertLevel: string): string {
  switch (alertLevel) {
    case 'warning':
      return '#ef4444';
    case 'caution':
      return '#f59e0b';
    default:
      return '#10b981';
  }
} 