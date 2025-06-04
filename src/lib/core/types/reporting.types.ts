/**
 * Reporting & Document Generation Types
 * 
 * Types related to report generation, chart configuration, 
 * document export, and scheduled reporting.
 */

import type { BaseEntity } from './base.types';
import type { UserRole } from './user.types';
import type { DisplayFormat } from './api.types';
import type { 
  ChartType, 
  TimePeriod 
} from './executive.types';

// ================================
// Report Definition Types
// ================================

export interface ExecutiveReport extends BaseEntity {
  title: string;
  description: string;
  type: ReportType;
  period: TimePeriod;
  recipients: ReportRecipient[];
  schedule: ReportSchedule;
  format: ReportFormat;
  sections: ReportSection[];
  isActive: boolean;
  lastGenerated?: Date;
  nextGeneration?: Date;
}

export type ReportType = 
  | 'executive_summary'
  | 'financial_overview'
  | 'operational_kpis'
  | 'safety_report'
  | 'fleet_analysis'
  | 'driver_performance'
  | 'cost_analysis';

export interface ReportRecipient {
  email: string;
  name: string;
  role: UserRole;
  deliveryMethod: DeliveryMethod;
}

export type DeliveryMethod = 'email' | 'dashboard' | 'api' | 'download';

export interface ReportSchedule {
  frequency: ReportFrequency;
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string; // HH:MM format
  timezone: string;
}

export type ReportFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'on-demand';
export type ReportFormat = 'pdf' | 'excel' | 'csv' | 'json' | 'html';

// ================================
// Report Section Types
// ================================

export interface ReportSection {
  id: string;
  title: string;
  type: SectionType;
  content: SectionContent;
  order: number;
  isVisible: boolean;
}

export type SectionType = 
  | 'summary'
  | 'kpi_grid'
  | 'chart'
  | 'table'
  | 'text'
  | 'image'
  | 'metric_comparison';

export interface SectionContent {
  data?: any[];
  chartConfig?: ChartConfiguration;
  textContent?: string;
  imageUrl?: string;
  kpiIds?: string[];
}

// ================================
// Chart Configuration Types
// ================================

export interface ChartConfiguration {
  type: ChartType;
  xAxis: AxisConfiguration;
  yAxis: AxisConfiguration;
  series: SeriesConfiguration[];
  colors?: string[];
  showLegend: boolean;
  title?: string;
}

export interface AxisConfiguration {
  label: string;
  dataKey: string;
  format?: DisplayFormat;
  min?: number;
  max?: number;
}

export interface SeriesConfiguration {
  name: string;
  dataKey: string;
  type?: ChartType;
  color?: string;
  yAxisId?: string;
} 