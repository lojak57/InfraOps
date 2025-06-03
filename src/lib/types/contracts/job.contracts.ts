/**
 * Job Domain Contracts
 * Strict TypeScript interfaces for job-related data
 * These are the source of truth for job data structure
 */

export interface JobContract {
  readonly id: string;
  readonly truckId: string;
  readonly driverId: string;
  readonly pickupTime: Date;
  readonly dropoffTime: Date | null;
  readonly estimatedUnits: number;
  readonly actualUnits?: number;
  readonly volumeLoss?: number;
  readonly status: JobStatus;
  readonly origin: LocationContract;
  readonly destination: LocationContract;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type JobStatus = 
  | 'scheduled'
  | 'en-route'
  | 'pickup'
  | 'transit'
  | 'unpickup'
  | 'completed'
  | 'cancelled'
  | 'delayed';

export interface LocationContract {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly coordinates: {
    readonly lat: number;
    readonly lng: number;
  };
  readonly type: 'pickup' | 'delivery' | 'waypoint';
}

export interface TelemetryReading {
  readonly timestamp: Date;
  readonly value: number;
  readonly unit: string;
  readonly sensorId: string;
  readonly quality: 'good' | 'poor' | 'failed';
}

export interface TemperatureReading extends TelemetryReading {
  readonly unit: '°F' | '°C';
  readonly location: 'ambient' | 'internal' | 'container' | 'product';
}

export interface PressureReading extends TelemetryReading {
  readonly unit: 'psi' | 'bar';
  readonly location: 'tanker_on_load' | 'tanker_off_load' | 'internal' | 'vent_line';
}

// Runtime validation helpers (if using zod or similar)
export const validateJobContract = (data: unknown): data is JobContract => {
  // Add runtime validation logic here
  if (typeof data !== 'object' || data === null) return false;
  
  const job = data as Record<string, unknown>;
  
  return (
    typeof job.id === 'string' &&
    typeof job.truckId === 'string' &&
    typeof job.driverId === 'string' &&
    job.pickupTime instanceof Date &&
    (job.dropoffTime === null || job.dropoffTime instanceof Date) &&
    typeof job.estimatedUnits === 'number' &&
    typeof job.status === 'string' &&
    isValidJobStatus(job.status)
  );
};

export const isValidJobStatus = (status: string): status is JobStatus => {
  return ['scheduled', 'en-route', 'pickup', 'transit', 'unpickup', 'completed', 'cancelled', 'delayed'].includes(status);
}; 