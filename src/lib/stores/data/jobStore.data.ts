/**
 * Job Store Mock Data
 * 
 * Mock data for sites, drivers, vehicles, and demo jobs
 * used for testing and demonstration purposes.
 */

import type { Site, Driver, Vehicle, Job, SystemStatus } from '../types/jobStore.types';
import { browser } from '$app/environment';

// ================================
// Timestamp Utilities
// ================================

// Helper function to create consistent timestamps
function getStaticTimestamp(offsetMinutes: number = 0): Date {
  // Use a fixed base timestamp for SSR consistency
  const baseTime = 1735064220000; // Fixed timestamp
  return new Date(baseTime + (offsetMinutes * 60 * 1000));
}

// Helper function to get current time only on client
function getCurrentTime(): Date {
  return browser ? new Date() : getStaticTimestamp();
}

// ================================
// Sites Mock Data
// ================================

export const mockSites: Site[] = [
  {
    id: 'site-1',
    name: 'Regional Distribution Center',
    location: { lat: 31.8457, lng: -102.3676 },
    type: 'pickup'
  },
  {
    id: 'site-2',
    name: 'Central Warehouse',
    location: { lat: 28.8644, lng: -97.9222 },
    type: 'pickup'
  },
  {
    id: 'site-3',
    name: 'Metro Processing Facility',
    location: { lat: 29.7604, lng: -95.3698 },
    type: 'delivery'
  },
  {
    id: 'site-4',
    name: 'Coastal Distribution Terminal',
    location: { lat: 27.8006, lng: -97.3964 },
    type: 'delivery'
  }
];

// ================================
// Drivers Mock Data
// ================================

export const mockDrivers: Driver[] = [
  {
    id: 'driver-1',
    name: 'Jake Thompson',
    experience: 8,
    totalJobs: 1240,
    averageEfficiency: 97.2
  },
  {
    id: 'driver-2',
    name: 'Maria Santos',
    experience: 5,
    totalJobs: 890,
    averageEfficiency: 98.1
  },
  {
    id: 'driver-3',
    name: 'Robert Johnson',
    experience: 12,
    totalJobs: 2150,
    averageEfficiency: 96.8
  },
  {
    id: 'driver-4',
    name: 'Sarah Miller',
    experience: 3,
    totalJobs: 450,
    averageEfficiency: 98.5
  }
];

// ================================
// Vehicles Mock Data
// ================================

export const mockVehicles: Vehicle[] = [
  {
    id: 'vehicle-1',
    plateNumber: 'TRK-001',
    capacity: 8000, // units
    model: 'Freight Jober 3000',
    year: 2022,
    averageEfficiency: 96.5
  },
  {
    id: 'vehicle-2',
    plateNumber: 'TRK-002',
    capacity: 8500, // units
    model: 'Freight Jober 3500',
    year: 2023,
    averageEfficiency: 97.8
  },
  {
    id: 'vehicle-3',
    plateNumber: 'TRK-003',
    capacity: 7500, // units
    model: 'Freight Jober 2500',
    year: 2021,
    averageEfficiency: 95.2
  }
];

// ================================
// System Status Mock Data
// ================================

export const mockSystemStatus: SystemStatus = {
  systemOnline: true,
  connectedDevices: 8,
  networkHealth: 98.5,
  lastUpdate: getCurrentTime(),
  dataLatency: 120,
  flowMeterOnline: true,
  gasDetectorsOnline: true,
  pressureSensorsOnline: true,
  temperatureSensorsOnline: true,
  pumpSystemOnline: true,
  operationsOnline: true
};

// ================================
// Demo Job Data
// ================================

export const demoJob: Job = {
  id: 'JOB-001547',
  vehicleId: 'vehicle-1',
  driverId: 'driver-1',
  pickupSite: {
    id: 'site-1',
    name: 'Regional Distribution Center',
    location: { lat: 31.8457, lng: -102.3676 },
    type: 'pickup'
  },
  deliverySite: {
    id: 'site-3',
    name: 'Metro Processing Facility',
    location: { lat: 29.7604, lng: -95.3698 },
    type: 'delivery'
  },
  // Alternative naming support
  onloadSite: {
    id: 'site-1',
    name: 'Regional Distribution Center',
    location: { lat: 31.8457, lng: -102.3676 },
    type: 'pickup'
  },
  offloadSite: {
    id: 'site-3',
    name: 'Metro Processing Facility',
    location: { lat: 29.7604, lng: -95.3698 },
    type: 'delivery'
  },
  initialVolume: 7850,
  expectedVariance: 125.5,
  expectedLoss: 125.5,
  status: 'transit',
  startTime: getStaticTimestamp(-180), // 3 hours ago
  transitProgress: 65,
  estimatedTimeRemaining: 95,
  currentLocation: { lat: 30.8, lng: -99.2 },
  temperatureReadings: [
    {
      timestamp: getStaticTimestamp(-180),
      ambient: 78.2,
      internal: 82.1,
      containerTemp: 185.4,
      productTemp: 168.1,
      tankerTemp: 185.4,
      oilTemp: 168.1
    },
    {
      timestamp: getStaticTimestamp(-120),
      ambient: 82.5,
      internal: 85.3,
      containerTemp: 178.9,
      productTemp: 165.7,
      tankerTemp: 178.9,
      oilTemp: 165.7
    },
    {
      timestamp: getStaticTimestamp(-60),
      ambient: 85.1,
      internal: 88.2,
      containerTemp: 172.3,
      productTemp: 162.4,
      tankerTemp: 172.3,
      oilTemp: 162.4
    },
    {
      timestamp: getStaticTimestamp(0),
      ambient: 88.7,
      internal: 91.8,
      containerTemp: 165.8,
      productTemp: 158.9,
      tankerTemp: 165.8,
      oilTemp: 158.9
    }
  ],
  flowMeterReadings: [
    {
      timestamp: getStaticTimestamp(-180),
      netVolume: 7850.0,
      massFlowRate: 125.5,
      density: 0.85,
      waterContent: 0.02,
      productTemp: 168.1,
      gasContent: 0.001,
      apiGravity: 35.2,
      entrainedGas: 0.001
    },
    {
      timestamp: getStaticTimestamp(0),
      netVolume: 7724.5,
      massFlowRate: 0.0,
      density: 0.85,
      waterContent: 0.02,
      productTemp: 158.9,
      gasContent: 0.001,
      apiGravity: 35.2,
      entrainedGas: 0.001
    }
  ],
  pressureReadings: [
    {
      timestamp: getStaticTimestamp(-180),
      containerLoad: 14.7,
      containerUnload: -2.1,
      containerInternal: 12.3,
      ventLine: 0.5,
      tankerOnLoad: 14.7,
      tankerOffLoad: -2.1,
      tankerInternal: 12.3,
      tankVentLine: 0.5
    },
    {
      timestamp: getStaticTimestamp(0),
      containerLoad: 14.2,
      containerUnload: -1.8,
      containerInternal: 11.9,
      ventLine: 0.3,
      tankerOnLoad: 14.2,
      tankerOffLoad: -1.8,
      tankerInternal: 11.9,
      tankVentLine: 0.3
    }
  ],
  gasDetections: [
    {
      timestamp: getStaticTimestamp(-180),
      toxicGasExternal: 0.0,
      toxicGasInternal: 0.0,
      coExternal: 2.1,
      coInternal: 0.8,
      combustibleExternal: 0.0,
      combustibleInternal: 0.0,
      oxygenExternal: 20.9,
      h2sExternal: 0.0,
      h2sInternal: 0.0,
      lelExternal: 0.0,
      o2External: 20.9
    },
    {
      timestamp: getStaticTimestamp(0),
      toxicGasExternal: 0.0,
      toxicGasInternal: 0.0,
      coExternal: 1.8,
      coInternal: 0.5,
      combustibleExternal: 0.0,
      combustibleInternal: 0.0,
      oxygenExternal: 20.9,
      h2sExternal: 0.0,
      h2sInternal: 0.0,
      lelExternal: 0.0,
      o2External: 20.9
    }
  ],
  sensorReadings: [
    {
      timestamp: getStaticTimestamp(-180),
      tankLevel: 8.5,
      productTemp: 168.1,
      flowRate: 125.5,
      systemPressure: 14.7,
      gasDetection: false
    },
    {
      timestamp: getStaticTimestamp(0),
      tankLevel: 8.3,
      productTemp: 158.9,
      flowRate: 0.0,
      systemPressure: 14.2,
      gasDetection: false
    }
  ],
  pumpSystemData: [
    {
      timestamp: getStaticTimestamp(-180),
      pumpRpm: 1800,
      pumpTemp: 185.2,
      inverterVoltage: 480.5,
      inverterTemp: 165.8,
      motorTemp: 195.3,
      rectifierTemp: 158.9,
      generatorTemp: 175.6,
      pumpStartTime: getStaticTimestamp(-180),
      totalPumpTime: 45,
      systemOnline: true
    },
    {
      timestamp: getStaticTimestamp(-120),
      pumpRpm: 0,
      pumpTemp: 165.4,
      inverterVoltage: 480.2,
      inverterTemp: 145.2,
      motorTemp: 168.7,
      rectifierTemp: 142.1,
      generatorTemp: 155.3,
      pumpStopTime: getStaticTimestamp(-120),
      totalPumpTime: 60,
      systemOnline: true
    }
  ],
  // Alternative naming support
  coriolisReadings: [
    {
      timestamp: getStaticTimestamp(-180),
      netVolume: 7850.0,
      massFlowRate: 125.5,
      density: 0.85,
      waterContent: 0.02,
      productTemp: 168.1,
      gasContent: 0.001,
      apiGravity: 35.2,
      entrainedGas: 0.001
    }
  ],
  dryDriveData: [
    {
      timestamp: getStaticTimestamp(-180),
      pumpRpm: 1800,
      pumpTemp: 185.2,
      inverterVoltage: 480.5,
      inverterTemp: 165.8,
      motorTemp: 195.3,
      rectifierTemp: 158.9,
      generatorTemp: 175.6,
      pumpStartTime: getStaticTimestamp(-180),
      totalPumpTime: 45,
      systemOnline: true
    }
  ],
  scadaReadings: [
    {
      timestamp: getStaticTimestamp(-180),
      tankLevel: 8.5,
      productTemp: 168.1,
      flowRate: 125.5,
      systemPressure: 14.7,
      gasDetection: false
    }
  ]
};

// ================================
// Export Utilities
// ================================

export { getStaticTimestamp, getCurrentTime }; 