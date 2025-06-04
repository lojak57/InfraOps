import { Home, Truck, FileText, BarChart3, Settings, Users, MapPin, AlertTriangle, Wrench, DollarSign, Clock, Shield, Globe, TrendingUp, Thermometer, Fuel } from 'lucide-svelte';
import { get } from 'svelte/store';
import { navigationTerms, assetTerms, brandInfo } from '$lib/core/stores/platform.store';
import type { NavigationSection, NavigationItem, NavigationConfig, SystemStatus } from '$lib/types/navigation.types';

// Dynamic navigation sections configuration based on platform terminology
export function getNavigationSections(): NavigationSection[] {
	const navTerms = get(navigationTerms);
	const terms = get(assetTerms);
	
	return [
		{
			title: 'Role Dashboards',
			items: [
				{ href: '/', label: 'Dashboard', icon: Home, description: 'Role selection and main dashboard' },
				{ href: '/dashboards/executive', label: 'Executive Dashboard', icon: BarChart3, description: 'Executive dashboard with KPIs and analytics' },
				{ href: '/dashboards/dispatch', label: navTerms.commandCenter, icon: MapPin, description: 'Operations control and fleet management' },
				{ href: '/dashboards/driver', label: navTerms.operatorCenter, icon: Truck, description: `${terms.operator} workflows and tracking` },
				{ href: '/dashboards/regional', label: 'Regional Manager', icon: Globe, description: 'Multi-region oversight and analytics' },
				{ href: '/dashboards/site', label: `${terms.site} Manager`, icon: Settings, description: `${terms.site} operations and ${terms.asset.toLowerCase()} management` }
			]
		},
		{
			title: 'Operations',
			items: [
				{ href: '/dispatch', label: navTerms.intelligenceHub, icon: BarChart3, description: 'Executive asset intelligence and analytics' },
				{ href: '/fleet', label: navTerms.managementHub, icon: Truck, description: `${terms.asset} and ${terms.operator.toLowerCase()} management` },
				{ href: '/job', label: `${terms.job} History`, icon: Clock, description: `${terms.job} operation history` },
				{ href: '/job/live', label: 'Live Monitoring', icon: TrendingUp, description: `Real-time ${terms.job.toLowerCase()} monitoring` }
			]
		},
		{
			title: 'Monitoring',
			items: [
				{ href: '/monitoring/truck-diagram', label: navTerms.liveMonitoring, icon: BarChart3, description: 'Interactive sensor and system monitoring' },
				{ href: '/calibration/smart-recommender', label: 'Calibration Status', icon: Settings, description: 'Smart calibration recommendations' }
			]
		},
		{
			title: 'Management',
			items: [
				{ href: '/documents', label: 'Document Center', icon: FileText, description: 'Compliance & file management' },
				{ href: '/admin', label: 'System Admin', icon: Settings, description: 'Administrative controls' }
			]
		}
	];
}

// Alternative navigation items (legacy support) - now dynamic
export function getNavigationItems(): NavigationItem[] {
	const navTerms = get(navigationTerms);
	const terms = get(assetTerms);
	
	return [
		{ href: '/dashboards/driver', label: navTerms.operatorCenter, icon: Truck, description: 'Real-time tracking and workflow' },
		{ href: '/dashboards/dispatch', label: navTerms.commandCenter, icon: MapPin, description: 'Operations and fleet management' },
		{ href: '/dashboards/executive', label: 'Executive Dashboard', icon: BarChart3, description: 'Strategic operations oversight and performance analytics' },
		{ href: '/dashboards/regional', label: 'Regional Manager', icon: Globe, description: 'Multi-region oversight and comparison' },
		{ href: '/safety', label: 'Safety Central', icon: Shield, description: 'Risk mitigation and compliance' },
		{ href: '/analytics', label: navTerms.analytics, icon: TrendingUp, description: 'Performance and efficiency metrics' },
		{ href: '/maintenance', label: navTerms.managementHub, icon: Wrench, description: `${terms.asset} status and maintenance tracking` },
		{ href: '/thermal', label: 'Thermal Analysis', icon: Thermometer, description: 'Temperature insights and monitoring' },
		{ href: '/calibration', label: 'Calibration Status', icon: Settings, description: 'Flow meter calibration management' }
	];
}

// System configuration - now dynamic
export const systemStatus: SystemStatus = {
	isOnline: true,
	text: 'System Online'
};

export function getBrandConfig() {
	return get(brandInfo);
}

// Navigation utility functions
export function isActiveRoute(href: string, currentPath: string): boolean {
	if (href === '/') {
		return currentPath === '/';
	}
	return currentPath.startsWith(href);
}

export function createNavigationConfig(): NavigationConfig {
	const brand = getBrandConfig();
	
	return {
		sections: getNavigationSections(),
		systemStatus,
		version: 'v2.1.0',
		brandName: brand.platformName,
		brandTagline: brand.tagline
	};
}

// Backward compatibility exports (will be dynamic)
export const navigationSections = getNavigationSections();
export const navigationItems = getNavigationItems();
export const brandConfig = getBrandConfig(); 