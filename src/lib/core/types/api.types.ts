/**
 * API, Validation & Response Types
 * 
 * Types related to API responses, pagination, validation, and data transfer.
 */

// ================================
// API Response Types
// ================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  pagination?: PaginationInfo;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ================================
// Validation Types
// ================================

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// ================================
// Data Source & Connection Types
// ================================

export interface AnalyticsDataSource {
  id: string;
  name: string;
  type: DataSourceType;
  connection: DataConnectionConfig;
  refreshRate: number;
  isActive: boolean;
}

export type DataSourceType = 'database' | 'api' | 'file' | 'real-time' | 'calculated';

export interface DataConnectionConfig {
  host?: string;
  database?: string;
  table?: string;
  query?: string;
  endpoint?: string;
  authentication?: AuthConfig;
}

export interface AuthConfig {
  type: AuthType;
  credentials: Record<string, string>;
}

export type AuthType = 'none' | 'basic' | 'bearer' | 'api-key' | 'oauth';

// ================================
// Filter & Query Types
// ================================

export interface DashboardFilter {
  field: string;
  operator: FilterOperator;
  value: any;
  enabled: boolean;
}

export type FilterOperator = 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between';

export interface MetricFilter {
  field: string;
  operator: FilterOperator;
  value: any;
  isRequired: boolean;
}

export type ComparisonOperator = 'greater_than' | 'less_than' | 'equals' | 'not_equals' | 'between';

// ================================
// Data Types
// ================================

export type DataType = 'currency' | 'percentage' | 'integer' | 'decimal' | 'duration' | 'count';
export type DisplayFormat = 'currency' | 'percentage' | 'decimal' | 'integer' | 'duration';
export type AggregationType = 'sum' | 'average' | 'count' | 'max' | 'min' | 'median'; 