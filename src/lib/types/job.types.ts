/**
 * Job Modal Component Types
 * Defines interfaces for the refactored JobDetailModal components
 */

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PickupLocation {
  name: string;
  address: string;
  coordinates: Coordinates;
  tankNumber: string;
  facilityType: string;
}

export interface DeliveryLocation {
  name: string;
  address: string;
  coordinates: Coordinates;
  facilityType: string;
}

export interface CustomerContact {
  name: string;
  phone: string;
  email?: string;
  role: string;
}

export interface ScheduledJob {
  id: string;
  accountName: string;
  priority: 'urgent' | 'high' | 'normal' | 'low';
  estimatedUnits: number;
  tankLevelHeight: string;
  loadType: string;
  distance: number;
  estimatedDuration: number;
  scheduledTime: Date;
  pickupLocation: PickupLocation;
  deliveryLocation: DeliveryLocation;
  customerContact: CustomerContact;
  status: 'scheduled' | 'en-route' | 'pickup' | 'in-transit' | 'delivering' | 'completed';
  specialInstructions?: string;
  hazmatRequired?: boolean;
  temperatureControl?: boolean;
}

export interface JobModalEvents {
  close: void;
  'start-navigation': { job: ScheduledJob };
  'call-customer': { contact: CustomerContact };
  'update-status': { jobId: string; status: ScheduledJob['status'] };
}

export interface JobCalculations {
  distanceToPickup: number;
  estimatedTravelTime: number;
  timeUntilJob: string;
  isJobReady: boolean;
} 