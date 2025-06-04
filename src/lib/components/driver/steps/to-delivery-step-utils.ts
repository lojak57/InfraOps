import type { 
  DestinationInfo, 
  RouteData, 
  LoadStatus, 
  TransitMetrics, 
  StatusItem,
  NavigationInstruction
} from './to-delivery-step.types';

export function generateDestinationInfo(
  transitType: 'pickup' | 'dropoff', 
  sharedState: any
): DestinationInfo {
  if (transitType === 'pickup') {
    return {
      name: sharedState.activeJob?.pickupSiteName || 'Production Site Alpha',
      address: sharedState.activeJob?.pickupAddress || '123 Industrial Blvd, Metro City, ST 12345',
      contact: sharedState.activeJob?.pickupContact || '(XXX) XXX-3001',
      icon: '📍',
      type: 'Pickup Location',
      detail: `Tank: ${sharedState.activeJob?.pickupTank || '#A-15'} | Expected Volume: ${sharedState.activeJob?.expectedVolume || '120'} units`
    };
  } else {
    return {
      name: sharedState.activeJob?.deliverySiteName || 'Processing Terminal Beta',
      address: sharedState.activeJob?.deliveryAddress || '456 Manufacturing Ave, Industrial City, ST 54321',
      contact: sharedState.activeJob?.deliveryContact || '(XXX) XXX-3002',
      icon: '🏭',
      type: 'Delivery Location',
      detail: `Bay: ${sharedState.activeJob?.deliveryBay || '#7'} | Delivery Volume: ${sharedState.activeJob?.deliveryVolume || '120'} units`
    };
  }
}

export function generateRouteData(sharedState: any): RouteData {
  return {
    distance: sharedState.activeJob?.distance || '23.4 mi',
    estimatedTime: sharedState.activeJob?.estimatedTime || '42 min',
    eta: sharedState.activeJob?.deliveryETA || '2:45 PM'
  };
}

export function generateLoadStatus(sharedState: any): LoadStatus {
  return {
    volume: sharedState.activeJob?.deliveryVolume || '120',
    fromSite: sharedState.activeJob?.pickupSiteName || 'Johnson Tank Battery #3',
    temperature: '78°F',
    pressure: '145 PSI'
  };
}

export function generateTransitMetrics(routeData: RouteData): TransitMetrics {
  return {
    speed: {
      current: 58,
      max: 65,
      unit: 'MPH'
    },
    pressure: {
      value: 145,
      unit: 'PSI',
      status: 'Normal'
    },
    temperature: {
      value: 78,
      unit: 'LOAD TEMP',
      status: 'Optimal'
    },
    eta: {
      timeRemaining: routeData.estimatedTime,
      arrivalTime: routeData.eta
    }
  };
}

export function getDeliveryStatusItems(): StatusItem[] {
  return [
    {
      icon: '✅',
      text: 'Pickup Complete',
      status: 'completed'
    },
    {
      icon: '✅',
      text: 'Loading Complete',
      status: 'completed'
    },
    {
      icon: '🎯',
      text: 'En Route to Delivery',
      status: 'active'
    },
    {
      icon: '⏳',
      text: 'Unpickup Pending',
      status: 'pending'
    }
  ];
}

export function generateNavigationInstruction(transitType: 'pickup' | 'dropoff'): NavigationInstruction {
  return {
    icon: '↗️',
    text: transitType === 'pickup' 
      ? 'In 8.2 mi — Take Exit 118 toward Well Pad Access Rd'
      : 'In 8.2 mi — Take Exit 118 toward Industrial Blvd'
  };
}

export function handleJobStatusUpdate(sharedState: any, status: string) {
  if (sharedState?.jobStatusStore) {
    sharedState.jobStatusStore.set(status);
  }
}

export function handleJobProgressUpdate(sharedState: any, progress: string) {
  if (sharedState?.jobProgress) {
    sharedState.jobProgress = progress;
  }
} 