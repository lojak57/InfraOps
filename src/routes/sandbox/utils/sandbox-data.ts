/**
 * Sandbox Configuration Data
 * 
 * Demo definitions, quick stats, and configuration for the sandbox environment.
 * Provides structured data for sandbox features and demo options.
 */

import { BarChart3, MapPin, Truck, Clock, Users } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

// ================================
// Types
// ================================

export interface SandboxDemo {
	id: string;
	title: string;
	icon: ComponentType;
	description: string;
	href: string;
	features: string[];
	difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface QuickStat {
	label: string;
	value: string;
	icon: ComponentType;
}

// ================================
// Demo Configurations
// ================================

/**
 * Available sandbox demo options
 */
export const sandboxDemos: SandboxDemo[] = [
	{
		id: 'dispatch',
		title: 'Fleet Dispatch Center',
		icon: MapPin,
		description: 'Explore real-time fleet tracking, route optimization, and job assignment capabilities.',
		href: '/dashboards/dispatch?demo=true',
		features: ['Live fleet tracking', 'Route optimization', 'Job assignment', 'Driver coordination'],
		difficulty: 'Beginner'
	},
	{
		id: 'executive',
		title: 'Executive Dashboard',
		icon: BarChart3,
		description: 'View comprehensive business analytics, KPIs, and performance metrics.',
		href: '/dashboards/executive?demo=true',
		features: ['Business KPIs', 'Financial analytics', 'Performance trends', 'ROI insights'],
		difficulty: 'Beginner'
	},
	{
		id: 'driver',
		title: 'Driver Workflow',
		icon: Truck,
		description: 'Experience the complete driver workflow from pre-trip to delivery completion.',
		href: '/dashboards/driver?demo=true',
		features: ['Pre-trip inspection', 'Job tracking', 'Route navigation', 'Delivery confirmation'],
		difficulty: 'Intermediate'
	},
	{
		id: 'monitoring',
		title: 'Live Asset Monitoring',
		icon: Clock,
		description: 'Monitor real-time sensor data, system alerts, and equipment status.',
		href: '/monitoring/truck-diagram?demo=true',
		features: ['Real-time sensors', 'System alerts', 'Equipment status', 'IoT integration'],
		difficulty: 'Advanced'
	}
];

/**
 * Quick statistics for sandbox environment
 */
export const quickStats: QuickStat[] = [
	{ label: 'Demo Vehicles', value: '24', icon: Truck },
	{ label: 'Active Routes', value: '12', icon: MapPin },
	{ label: 'Mock Drivers', value: '18', icon: Users },
	{ label: 'Sample Jobs', value: '47', icon: BarChart3 }
];

// ================================
// Utility Functions
// ================================

/**
 * Get demo by ID
 */
export function getDemoById(id: string): SandboxDemo | undefined {
	return sandboxDemos.find(demo => demo.id === id);
}

/**
 * Get demos by difficulty level
 */
export function getDemosByDifficulty(difficulty: SandboxDemo['difficulty']): SandboxDemo[] {
	return sandboxDemos.filter(demo => demo.difficulty === difficulty);
}

/**
 * Get difficulty style class
 */
export function getDifficultyClass(difficulty: SandboxDemo['difficulty']): string {
	return difficulty.toLowerCase();
}

/**
 * Format demo URL with tracking parameters
 */
export function formatDemoUrl(href: string, source: string = 'sandbox'): string {
	const url = new URL(href, window.location.origin);
	url.searchParams.set('source', source);
	return url.toString();
}

// ================================
// Constants
// ================================

export const SANDBOX_INFO = {
	title: 'Sandbox Environment Details',
	description: 'All data is simulated and resets every 24 hours. Changes you make won\'t affect real operations. Perfect for testing, training, or evaluating the platform.',
	resetInterval: '24 hours'
};

export const HERO_CONFIG = {
	badge: 'Live Demo Environment',
	title: 'Try DataTracker Platform',
	highlight: 'Risk-Free',
	subtitle: 'Explore our full-featured fleet management platform with realistic sample data. All features are enabled - no limitations, no signup required.'
}; 