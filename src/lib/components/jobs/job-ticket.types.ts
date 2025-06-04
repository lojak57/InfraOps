export interface ProductInfo {
  type: string;
  grade: string;
  apiGravity: number;
  sulfurContent: number;
  viscosity: string;
  flashPoint: string;
  pourPoint: string;
}

export interface VolumeData {
  onload: number | null;
  offload: number | null;
  net?: number | null;
  delivered?: number | null;
}

export interface LossAnalysis {
  absolute: number;
  percentage: number;
  expectedLoss: number;
  variance: number;
}

export interface MeasurementsData {
  gross: VolumeData;
  net: VolumeData;
  loss: LossAnalysis;
}

export interface TemperatureReading {
  product: number | null;
  ambient: number | null;
  timestamp: string | null;
}

export interface TemperatureData {
  onload: TemperatureReading;
  current: TemperatureReading;
  offload: TemperatureReading;
}

export interface CoriolisMeterReading {
  meterId: string;
  operator: string;
  grossVolume: number;
  netVolume: number;
  density: number;
  temperature: number;
  pressure: number;
  massFlow: number;
  timestamp: string;
}

export interface CoriolisData {
  onload: CoriolisMeterReading;
  offload: Partial<CoriolisMeterReading>;
}

export interface PreTripInspection {
  completed: boolean;
  inspector: string;
  timestamp: string | null;
  issues: string[];
}

export interface H2SLevels {
  current: number | null;
  alarm: number;
  critical: number;
  max: number;
  lastReading: string | null;
}

export interface GasDetection {
  lel: number;
  co: number;
  o2: number;
  lastCalibrated: string | null;
}

export interface SafetyData {
  preTrip: PreTripInspection;
  h2sLevels: H2SLevels;
  gasDetection: GasDetection;
}

export interface JobTicketData {
  product: ProductInfo;
  measurements: MeasurementsData;
  temperature: TemperatureData;
  coriolis: CoriolisData;
  safety: SafetyData;
}

export interface SafetyStatusResult {
  status: 'critical' | 'warning' | 'safe';
  color: string;
} 