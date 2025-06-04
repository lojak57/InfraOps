export interface DestinationInfo {
  name: string;
  address: string;
  contact: string;
  icon: string;
  type: string;
  detail: string;
}

export interface RouteData {
  distance: string;
  estimatedTime: string;
  eta: string;
}

export interface LoadStatus {
  volume: string;
  fromSite: string;
  temperature: string;
  pressure: string;
}

export interface TransitMetrics {
  speed: {
    current: number;
    max: number;
    unit: string;
  };
  pressure: {
    value: number;
    unit: string;
    status: string;
  };
  temperature: {
    value: number;
    unit: string;
    status: string;
  };
  eta: {
    timeRemaining: string;
    arrivalTime: string;
  };
}

export interface StatusItem {
  icon: string;
  text: string;
  status: 'completed' | 'active' | 'pending';
}

export interface DeliveryStepState {
  deliverySubStep: string;
  transitType: 'pickup' | 'dropoff';
  sharedState: any;
  eventHandlers: any;
}

export interface NavigationInstruction {
  icon: string;
  text: string;
} 