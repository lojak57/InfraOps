/**
 * Job Store Types
 * 
 * Type definitions for job management, sensor readings,
 * vehicles, drivers, and all related data structures.
 */

// ================================
// Sensor Reading Types
// ================================

export interface TemperatureReading {
  timestamp: Date;
  ambient: number;
  internal: number;
  containerTemp: number;
  productTemp: number;
  tankerTemp?: number;
  oilTemp?: number;
}

export interface FlowMeterReading {
  timestamp: Date;
  netVolume: number;        // Units
  massFlowRate: number;     // Units/min
  density: number;          // Specific gravity
  waterContent: number;     // percentage
  productTemp: number;      // °F
  gasContent: number;       // percentage
  apiGravity?: number;      // API degrees
  entrainedGas?: number;    // percentage
}

export interface PressureReading {
  timestamp: Date;
  containerLoad: number;     // PSI
  containerUnload: number;   // PSI vacuum
  containerInternal: number; // PSI
  ventLine: number;         // PSI
  tankerOnLoad?: number;    // PSI
  tankerOffLoad?: number;   // PSI
  tankerInternal?: number;  // PSI
  tankVentLine?: number;    // PSI
}

export interface GasDetection {
  timestamp: Date;
  toxicGasExternal: number;  // PPM
  toxicGasInternal: number;  // PPM
  coExternal: number;        // PPM
  coInternal: number;        // PPM
  combustibleExternal: number; // % LEL
  combustibleInternal: number; // % LEL
  oxygenExternal: number;    // % O2
  h2sExternal?: number;      // PPM
  h2sInternal?: number;      // PPM
  lelExternal?: number;      // % LEL
  o2External?: number;       // % O2
}

export interface SensorReading {
  timestamp: Date;
  tankLevel: number;        // feet
  productTemp: number;      // °F
  flowRate: number;         // Units/min
  systemPressure: number;   // PSI
  gasDetection: boolean;    // safety status
}

export interface PumpSystemData {
  timestamp: Date;
  pumpRpm: number;
  pumpTemp: number;         // °F
  inverterVoltage: number;  // V
  inverterTemp: number;     // °F
  motorTemp: number;        // °F
  rectifierTemp: number;    // °F
  generatorTemp: number;    // °F
  pumpStartTime?: Date;
  pumpStopTime?: Date;
  totalPumpTime: number;    // minutes
  systemOnline: boolean;
}

// ================================
// System Status Types
// ================================

export interface SystemStatus {
  systemOnline: boolean;
  connectedDevices: number;
  networkHealth: number;        // percentage
  lastUpdate: Date;
  dataLatency: number;          // milliseconds
  flowMeterOnline: boolean;
  gasDetectorsOnline: boolean;
  pressureSensorsOnline: boolean;
  temperatureSensorsOnline: boolean;
  pumpSystemOnline: boolean;
  operationsOnline: boolean;
}

// ================================
// Core Entity Types
// ================================

export interface Site {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  type: 'pickup' | 'delivery';
}

export interface Driver {
  id: string;
  name: string;
  experience: number; // years
  totalJobs: number;
  averageEfficiency: number; // percentage
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  capacity: number; // units
  model: string;
  year: number;
  averageEfficiency: number;
}

// ================================
// Job Types
// ================================

export type JobStatus = 'loading' | 'transit' | 'unpickup' | 'completed' | 'onpickup' | 'offpickup';

export interface Job {
  id: string;
  vehicleId: string;
  driverId: string;
  pickupSite: Site;
  deliverySite: Site;
  onloadSite?: Site;      // Alternative naming
  offloadSite?: Site;     // Alternative naming
  initialVolume: number;  // units
  finalVolume?: number;   // units
  expectedVariance?: number;    // calculated units
  expectedLoss?: number;        // Alternative naming
  actualVariance?: number;      // measured units
  actualLoss?: number;          // Alternative naming
  status: JobStatus;
  startTime: Date;
  endTime?: Date;
  transitProgress: number;      // 0-100%
  estimatedTimeRemaining: number; // minutes
  currentLocation?: { lat: number; lng: number };
  
  // Sensor Data Arrays
  temperatureReadings: TemperatureReading[];
  flowMeterReadings: FlowMeterReading[];
  coriolisReadings?: FlowMeterReading[];  // Alternative naming
  pressureReadings: PressureReading[];
  gasDetections: GasDetection[];
  sensorReadings: SensorReading[];
  pumpSystemData: PumpSystemData[];
  dryDriveData?: PumpSystemData[];      // Alternative naming
  scadaReadings?: SensorReading[];      // Alternative naming
}

// ================================
// Utility Types
// ================================

export type SensorDataType = 
  | TemperatureReading 
  | FlowMeterReading 
  | PressureReading 
  | GasDetection 
  | SensorReading 
  | PumpSystemData;

export interface TemperatureStats {
  avg: number;
  min: number;
  max: number;
  latest: number;
}

// ================================
// Store State Types
// ================================

export interface JobStoreState {
  currentJob: Job | null;
  jobHistory: Job[];
  sites: Site[];
  drivers: Driver[];
  vehicles: Vehicle[];
  systemStatus: SystemStatus;
} 