/**
 * User, Authentication & Organization Types
 * 
 * Types related to users, authentication, organizations, and tenancy.
 */

import type { BaseEntity } from './base.types';

// ================================
// User & Authentication Types
// ================================

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  lastLoginAt?: Date;
  profile?: UserProfile;
}

export type UserRole = 
  | 'super_admin'
  | 'admin' 
  | 'manager'
  | 'dispatcher'
  | 'driver'
  | 'viewer';

export type Permission = 
  | 'view_dashboard'
  | 'manage_jobs'
  | 'manage_drivers'
  | 'manage_trucks'
  | 'view_analytics'
  | 'manage_organization'
  | 'manage_users';

export interface UserProfile {
  avatar?: string;
  phone?: string;
  employeeId?: string;
  department?: string;
  startDate?: Date;
}

// ================================
// Organization & Tenant Types
// ================================

export interface Organization extends BaseEntity {
  name: string;
  slug: string;
  industry: string;
  size: OrganizationSize;
  settings: OrganizationSettings;
  subscription: SubscriptionInfo;
  branding: BrandingConfig;
}

export type OrganizationSize = 'small' | 'medium' | 'large' | 'enterprise';

export interface OrganizationSettings {
  timezone: string;
  currency: string;
  units: UnitSystem;
  features: FeatureFlags;
}

export type UnitSystem = 'imperial' | 'metric';

export interface FeatureFlags {
  hasExecutiveDashboard: boolean;
  hasDriverMobile: boolean;
  hasRealTimeMonitoring: boolean;
  hasMaintenanceModule: boolean;
  hasAnalytics: boolean;
  hasAPIAccess: boolean;
}

export interface SubscriptionInfo {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  trialEndsAt?: Date;
  billingCycleStart: Date;
  billingCycleEnd: Date;
}

export type SubscriptionPlan = 'free' | 'starter' | 'professional' | 'enterprise';
export type SubscriptionStatus = 'active' | 'trial' | 'past_due' | 'cancelled' | 'suspended';

export interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  faviconUrl?: string;
  customDomain?: string;
} 