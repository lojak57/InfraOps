/**
 * Job Store Actions & Utilities
 * 
 * Business logic, actions, and utility functions for managing
 * job state, sensor data, and temperature calculations.
 */

import { get } from 'svelte/store';
import { browser } from '$app/environment';
import type { 
  Job, 
  TemperatureReading, 
  FlowMeterReading, 
  PressureReading, 
  GasDetection, 
  SensorReading, 
  PumpSystemData,
  SensorDataType,
  TemperatureStats
} from '../types/jobStore.types';
import { demoJob, getCurrentTime } from '../data/jobStore.data';

// Import the actual store (this will be defined in the main file)
let currentJob: any;
let jobHistory: any;

// Set store references (called from main file)
export function setStoreReferences(current: any, history: any) {
  currentJob = current;
  jobHistory = history;
}

// ================================
// Job Management Actions
// ================================

export const jobActions = {
  // Initialize with demo data
  initializeDemoData: () => {
    if (browser && currentJob && jobHistory) {
      currentJob.set(demoJob);
      jobHistory.update((jobs: Job[]) => [...jobs, demoJob]);
    }
  },

  // Start a new job
  startJob: (job: Omit<Job, 'id' | 'startTime' | 'status'>) => {
    const newJob: Job = {
      ...job,
      id: `JOB-${Date.now()}`,
      startTime: getCurrentTime(),
      status: 'loading',
      transitProgress: 0,
      temperatureReadings: [],
      flowMeterReadings: [],
      pressureReadings: [],
      gasDetections: [],
      sensorReadings: [],
      pumpSystemData: []
    };
    
    if (currentJob && jobHistory) {
      currentJob.set(newJob);
      jobHistory.update((jobs: Job[]) => [...jobs, newJob]);
    }
  },

  // Update job status
  updateJobStatus: (jobId: string, status: Job['status']) => {
    if (jobHistory) {
      jobHistory.update((jobs: Job[]) => 
        jobs.map(job => 
          job.id === jobId 
            ? { ...job, status, ...(status === 'completed' ? { endTime: getCurrentTime() } : {}) }
            : job
        )
      );
    }
    
    if (currentJob) {
      currentJob.update((job: Job | null) => 
        job?.id === jobId 
          ? { ...job, status, ...(status === 'completed' ? { endTime: getCurrentTime() } : {}) }
          : job
      );
    }
  },

  // Add sensor reading to current job
  addSensorReading: (reading: SensorDataType) => {
    if (!currentJob) return;
    
    currentJob.update((job: Job | null) => {
      if (!job) return job;
      
      // Determine which array to update based on reading type
      if ('ambient' in reading) {
        return { ...job, temperatureReadings: [...job.temperatureReadings, reading] };
      } else if ('netVolume' in reading) {
        return { ...job, flowMeterReadings: [...job.flowMeterReadings, reading] };
      } else if ('containerLoad' in reading) {
        return { ...job, pressureReadings: [...job.pressureReadings, reading] };
      } else if ('toxicGasExternal' in reading) {
        return { ...job, gasDetections: [...job.gasDetections, reading] };
      } else if ('tankLevel' in reading) {
        return { ...job, sensorReadings: [...job.sensorReadings, reading] };
      } else if ('pumpRpm' in reading) {
        return { ...job, pumpSystemData: [...job.pumpSystemData, reading] };
      }
      
      return job;
    });
  },

  // Update job progress
  updateJobProgress: (jobId: string, progress: number, estimatedTimeRemaining: number) => {
    if (jobHistory) {
      jobHistory.update((jobs: Job[]) => 
        jobs.map(job => 
          job.id === jobId 
            ? { ...job, transitProgress: progress, estimatedTimeRemaining }
            : job
        )
      );
    }
    
    if (currentJob) {
      currentJob.update((job: Job | null) => 
        job?.id === jobId 
          ? { ...job, transitProgress: progress, estimatedTimeRemaining }
          : job
      );
    }
  },

  // Update job location
  updateJobLocation: (jobId: string, location: { lat: number; lng: number }) => {
    if (jobHistory) {
      jobHistory.update((jobs: Job[]) => 
        jobs.map(job => 
          job.id === jobId 
            ? { ...job, currentLocation: location }
            : job
        )
      );
    }
    
    if (currentJob) {
      currentJob.update((job: Job | null) => 
        job?.id === jobId 
          ? { ...job, currentLocation: location }
          : job
      );
    }
  },

  // Clear current job
  clearCurrentJob: () => {
    if (currentJob) {
      currentJob.set(null);
    }
  },

  // Get job by ID
  getJobById: (jobId: string): Job | undefined => {
    if (!jobHistory) return undefined;
    const jobs = get(jobHistory);
    return jobs.find(job => job.id === jobId);
  }
};

// ================================
// Utility Functions
// ================================

export function getTemperatureStats(readings: TemperatureReading[]): TemperatureStats {
  if (readings.length === 0) {
    return { avg: 0, min: 0, max: 0, latest: 0 };
  }
  
  const temps = readings.map(r => r.internal);
  const avg = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const latest = temps[temps.length - 1];
  
  return { avg, min, max, latest };
}

export function calculateExpectedVariance(
  initialVolume: number,
  avgAmbient: number,
  avgInternal: number,
  transitTimeHours: number
): number {
  // Simplified calculation based on temperature differential and time
  const tempDiff = Math.abs(avgInternal - avgAmbient);
  const baseVariance = initialVolume * 0.001; // 0.1% base variance
  const tempFactor = tempDiff * 0.0002; // Temperature impact
  const timeFactor = transitTimeHours * 0.1; // Time impact
  
  return baseVariance + (initialVolume * tempFactor * timeFactor);
}

export function getLatestReading<T>(readings: T[]): T | null {
  return readings.length > 0 ? readings[readings.length - 1] : null;
}

export function filterReadingsByTimeRange<T extends { timestamp: Date }>(
  readings: T[], 
  startTime: Date, 
  endTime: Date
): T[] {
  return readings.filter(reading => 
    reading.timestamp >= startTime && reading.timestamp <= endTime
  );
}

export function calculateAverageFlowRate(readings: FlowMeterReading[]): number {
  if (readings.length === 0) return 0;
  
  const totalFlow = readings.reduce((sum, reading) => sum + reading.massFlowRate, 0);
  return totalFlow / readings.length;
}

export function detectAnomalies(readings: TemperatureReading[]): boolean {
  if (readings.length < 2) return false;
  
  // Simple anomaly detection based on temperature spikes
  for (let i = 1; i < readings.length; i++) {
    const current = readings[i];
    const previous = readings[i - 1];
    
    const tempChange = Math.abs(current.internal - previous.internal);
    if (tempChange > 50) { // Temperature change > 50°F
      return true;
    }
  }
  
  return false;
}

export function calculateEfficiency(
  initialVolume: number, 
  finalVolume: number, 
  expectedVariance: number
): number {
  if (finalVolume === undefined) return 0;
  
  const actualVariance = Math.abs(initialVolume - finalVolume);
  const efficiency = Math.max(0, Math.min(100, 
    ((expectedVariance - actualVariance) / expectedVariance) * 100
  ));
  
  return efficiency;
}

// ================================
// Data Validation Functions
// ================================

export function validateSensorReading(reading: SensorDataType): boolean {
  if (!reading.timestamp) return false;
  
  // Type-specific validations
  if ('ambient' in reading) {
    return reading.ambient > -50 && reading.ambient < 150;
  } else if ('netVolume' in reading) {
    return reading.netVolume >= 0 && reading.massFlowRate >= 0;
  } else if ('containerLoad' in reading) {
    return reading.containerLoad >= 0;
  } else if ('toxicGasExternal' in reading) {
    return reading.toxicGasExternal >= 0 && reading.oxygenExternal > 0;
  } else if ('tankLevel' in reading) {
    return reading.tankLevel >= 0 && reading.systemPressure >= 0;
  } else if ('pumpRpm' in reading) {
    return reading.pumpRpm >= 0 && reading.totalPumpTime >= 0;
  }
  
  return true;
}

export function sanitizeJobData(job: Partial<Job>): Partial<Job> {
  // Remove any potentially problematic data
  const sanitized = { ...job };
  
  // Ensure arrays exist
  if (!sanitized.temperatureReadings) sanitized.temperatureReadings = [];
  if (!sanitized.flowMeterReadings) sanitized.flowMeterReadings = [];
  if (!sanitized.pressureReadings) sanitized.pressureReadings = [];
  if (!sanitized.gasDetections) sanitized.gasDetections = [];
  if (!sanitized.sensorReadings) sanitized.sensorReadings = [];
  if (!sanitized.pumpSystemData) sanitized.pumpSystemData = [];
  
  // Validate numeric values
  if (sanitized.transitProgress !== undefined) {
    sanitized.transitProgress = Math.max(0, Math.min(100, sanitized.transitProgress));
  }
  
  if (sanitized.estimatedTimeRemaining !== undefined) {
    sanitized.estimatedTimeRemaining = Math.max(0, sanitized.estimatedTimeRemaining);
  }
  
  return sanitized;
} 