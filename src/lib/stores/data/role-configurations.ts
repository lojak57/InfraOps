/**
 * Role Configurations Data
 * 
 * Pre-defined role configurations with metrics, charts, layouts, and color schemes
 * for different user types in the system.
 */

import type { Role } from '../types/role.types';

// ================================
// Role Configurations
// ================================

export const roleConfigurations: Role[] = [
	{
		id: 'overview',
		name: 'System Overview',
		title: 'System Overview',
		description: 'Complete operational dashboard',
		icon: '🏭',
		focus: 'Overall system performance and monitoring',
		metrics: [],
		charts: [],
		layout: {
			heroMetrics: [],
			primaryMetrics: [],
			secondaryMetrics: [],
			heroCharts: [],
			primaryCharts: [],
			gridLayout: 'overview'
		},
		colorScheme: {
			primary: '#7CB342',
			secondary: '#558B2F',
			accent: '#9CCC65'
		}
	},
	{
		id: 'executive',
		name: 'Executive',
		title: 'Executive',
		description: 'Strategic oversight and financial performance',
		icon: '👔',
		focus: 'Profit margins, ROI, and strategic growth targets',
		metrics: [
			{
				id: 'daily-revenue',
				label: 'Daily Revenue',
				value: '$847,250',
				unit: '',
				trend: 'up',
				trendValue: '+12.3%',
				priority: 'hero',
				impact: 'high',
				description: 'Revenue performance drives quarterly results'
			},
			{
				id: 'profit-margin',
				label: 'Profit Margin',
				value: '23.8',
				unit: '%',
				trend: 'up',
				trendValue: '+2.1%',
				priority: 'hero',
				impact: 'high',
				description: 'Key profitability indicator for executive compensation'
			},
			{
				id: 'fleet-utilization',
				label: 'Fleet Utilization',
				value: '87.2',
				unit: '%',
				trend: 'stable',
				trendValue: '+0.5%',
				priority: 'hero',
				impact: 'high',
				description: 'Asset efficiency drives return on investment'
			},
			{
				id: 'customer-satisfaction',
				label: 'Customer Satisfaction',
				value: '94.7',
				unit: '%',
				trend: 'up',
				trendValue: '+1.8%',
				priority: 'primary',
				impact: 'medium',
				description: 'Customer retention impacts long-term growth'
			}
		],
		charts: [
			{
				id: 'revenue-trends',
				type: 'line',
				title: 'Revenue & Profit Trends',
				priority: 'hero',
				relevance: 'Quarterly performance tracking'
			},
			{
				id: 'roi-dashboard',
				type: 'gauge',
				title: 'ROI Performance',
				priority: 'hero',
				relevance: 'Annual return on investment metrics'
			}
		],
		layout: {
			heroMetrics: ['daily-revenue', 'profit-margin', 'fleet-utilization'],
			primaryMetrics: ['customer-satisfaction'],
			secondaryMetrics: [],
			heroCharts: ['revenue-trends', 'roi-dashboard'],
			primaryCharts: [],
			gridLayout: 'executive'
		},
		colorScheme: {
			primary: '#1e40af',
			secondary: '#3b82f6',
			accent: '#60a5fa'
		}
	},
	{
		id: 'driver',
		name: 'Driver',
		title: 'Driver',
		description: 'Personal performance and safety metrics',
		icon: '🚛',
		focus: 'Safety scores, efficiency ratings, and performance tracking',
		metrics: [
			{
				id: 'safety-score',
				label: 'Safety Score',
				value: '98.5',
				unit: '%',
				trend: 'up',
				trendValue: '+0.3%',
				priority: 'hero',
				impact: 'high',
				description: 'Maintaining 95%+ safety score is critical'
			},
			{
				id: 'efficiency-rating',
				label: 'Efficiency Rating',
				value: '92.1',
				unit: '%',
				trend: 'up',
				trendValue: '+2.7%',
				priority: 'hero',
				impact: 'high',
				description: 'Performance above 90% shows excellence'
			},
			{
				id: 'jobs-completed',
				label: 'Jobs This Month',
				value: '47',
				unit: '',
				trend: 'up',
				trendValue: '+5',
				priority: 'hero',
				impact: 'high',
				description: 'Consistent high volume demonstrates reliability'
			},
			{
				id: 'fuel-efficiency',
				label: 'Fuel Efficiency',
				value: '6.8',
				unit: 'MPG',
				trend: 'up',
				trendValue: '+0.2',
				priority: 'primary',
				impact: 'medium',
				description: 'Top performers achieve significant fuel savings'
			}
		],
		charts: [
			{
				id: 'personal-performance',
				type: 'line',
				title: 'Personal Performance Trends',
				priority: 'hero',
				relevance: 'Monthly performance tracking'
			},
			{
				id: 'route-efficiency',
				type: 'bar',
				title: 'Route Efficiency Analysis',
				priority: 'primary',
				relevance: 'Route optimization opportunities'
			}
		],
		layout: {
			heroMetrics: ['safety-score', 'efficiency-rating', 'jobs-completed'],
			primaryMetrics: ['fuel-efficiency'],
			secondaryMetrics: [],
			heroCharts: ['personal-performance'],
			primaryCharts: ['route-efficiency'],
			gridLayout: 'mobile'
		},
		colorScheme: {
			primary: '#059669',
			secondary: '#10b981',
			accent: '#34d399'
		}
	},
	{
		id: 'dispatch',
		name: 'Dispatch',
		title: 'Dispatch',
		description: 'Fleet coordination and scheduling optimization',
		icon: '📡',
		focus: 'On-time delivery rates, resource utilization, and cost efficiency',
		metrics: [
			{
				id: 'on-time-delivery',
				label: 'On-Time Delivery',
				value: '96.3',
				unit: '%',
				trend: 'up',
				trendValue: '+1.2%',
				priority: 'hero',
				impact: 'high',
				description: '95%+ delivery rate maintains customer satisfaction'
			},
			{
				id: 'fleet-efficiency',
				label: 'Fleet Efficiency',
				value: '89.7',
				unit: '%',
				trend: 'up',
				trendValue: '+3.1%',
				priority: 'hero',
				impact: 'high',
				description: 'High utilization maximizes asset value'
			},
			{
				id: 'cost-per-mile',
				label: 'Cost Per Mile',
				value: '$2.34',
				unit: '',
				trend: 'down',
				trendValue: '-$0.12',
				priority: 'hero',
				impact: 'high',
				description: 'Cost reduction directly impacts profitability'
			},
			{
				id: 'active-jobs',
				label: 'Active Jobs',
				value: '23',
				unit: '',
				trend: 'stable',
				trendValue: '+2',
				priority: 'primary',
				impact: 'medium',
				description: 'Optimal volume management'
			}
		],
		charts: [
			{
				id: 'fleet-tracking',
				type: 'map',
				title: 'Real-Time Fleet Tracking',
				priority: 'hero',
				relevance: 'On-time delivery performance tracking'
			},
			{
				id: 'scheduling-efficiency',
				type: 'bar',
				title: 'Scheduling Efficiency',
				priority: 'primary',
				relevance: 'Resource optimization metrics'
			}
		],
		layout: {
			heroMetrics: ['on-time-delivery', 'fleet-efficiency', 'cost-per-mile'],
			primaryMetrics: ['active-jobs'],
			secondaryMetrics: [],
			heroCharts: ['fleet-tracking'],
			primaryCharts: ['scheduling-efficiency'],
			gridLayout: 'operational'
		},
		colorScheme: {
			primary: '#dc2626',
			secondary: '#ef4444',
			accent: '#f87171'
		}
	},
	{
		id: 'yard-manager',
		name: 'Yard Manager',
		title: 'Yard Manager',
		description: 'Equipment management and maintenance optimization',
		icon: '🏗️',
		focus: 'Equipment uptime, maintenance costs, and fleet usage efficiency',
		metrics: [
			{
				id: 'equipment-uptime',
				label: 'Equipment Uptime',
				value: '94.8',
				unit: '%',
				trend: 'up',
				trendValue: '+1.5%',
				priority: 'hero',
				impact: 'high',
				description: '93%+ uptime ensures operational continuity'
			},
			{
				id: 'maintenance-cost',
				label: 'Maintenance Cost',
				value: '$12,450',
				unit: '/month',
				trend: 'down',
				trendValue: '-$890',
				priority: 'hero',
				impact: 'high',
				description: 'Cost optimization improves bottom line'
			},
			{
				id: 'fleet-usage',
				label: 'Fleet Usage Rate',
				value: '87.5',
				unit: '%',
				trend: 'up',
				trendValue: '+2.1%',
				priority: 'hero',
				impact: 'high',
				description: 'Higher utilization maximizes fleet efficiency'
			},
			{
				id: 'yard-capacity',
				label: 'Yard Utilization',
				value: '78.2',
				unit: '%',
				trend: 'stable',
				trendValue: '+1.1%',
				priority: 'primary',
				impact: 'medium',
				description: 'Optimal capacity utilization'
			}
		],
		charts: [
			{
				id: 'equipment-status',
				type: 'doughnut',
				title: 'Equipment Status Overview',
				priority: 'hero',
				relevance: 'Uptime performance dashboard'
			},
			{
				id: 'maintenance-trends',
				type: 'line',
				title: 'Maintenance Cost Trends',
				priority: 'primary',
				relevance: 'Cost reduction tracking'
			}
		],
		layout: {
			heroMetrics: ['equipment-uptime', 'maintenance-cost', 'fleet-usage'],
			primaryMetrics: ['yard-capacity'],
			secondaryMetrics: [],
			heroCharts: ['equipment-status'],
			primaryCharts: ['maintenance-trends'],
			gridLayout: 'operational'
		},
		colorScheme: {
			primary: '#ea580c',
			secondary: '#f97316',
			accent: '#fb923c'
		}
	},
	{
		id: 'regional-manager',
		name: 'Regional Manager',
		title: 'Regional Manager',
		description: 'Multi-site performance and growth management',
		icon: '🗺️',
		focus: 'Regional growth targets, cross-site efficiency, and market expansion',
		metrics: [
			{
				id: 'regional-growth',
				label: 'Regional Growth',
				value: '18.7',
				unit: '%',
				trend: 'up',
				trendValue: '+3.2%',
				priority: 'hero',
				impact: 'high',
				description: '15%+ annual growth demonstrates market leadership'
			},
			{
				id: 'market-share',
				label: 'Market Share',
				value: '34.2',
				unit: '%',
				trend: 'up',
				trendValue: '+2.8%',
				priority: 'hero',
				impact: 'high',
				description: 'Market expansion drives regional success'
			},
			{
				id: 'cross-site-efficiency',
				label: 'Cross-Site Efficiency',
				value: '91.4',
				unit: '%',
				trend: 'up',
				trendValue: '+2.3%',
				priority: 'hero',
				impact: 'high',
				description: '90%+ efficiency across all sites'
			},
			{
				id: 'customer-retention',
				label: 'Customer Retention',
				value: '96.8',
				unit: '%',
				trend: 'stable',
				trendValue: '+0.5%',
				priority: 'primary',
				impact: 'medium',
				description: 'High retention drives sustainable growth'
			}
		],
		charts: [
			{
				id: 'regional-comparison',
				type: 'bar',
				title: 'Regional Performance Comparison',
				priority: 'hero',
				relevance: 'Regional ranking and performance'
			},
			{
				id: 'market-analysis',
				type: 'line',
				title: 'Market Share Analysis',
				priority: 'primary',
				relevance: 'Market expansion tracking'
			}
		],
		layout: {
			heroMetrics: ['regional-growth', 'market-share', 'cross-site-efficiency'],
			primaryMetrics: ['customer-retention'],
			secondaryMetrics: [],
			heroCharts: ['regional-comparison'],
			primaryCharts: ['market-analysis'],
			gridLayout: 'executive'
		},
		colorScheme: {
			primary: '#7c3aed',
			secondary: '#8b5cf6',
			accent: '#a78bfa'
		}
	}
];

// ================================
// Data Access Utilities
// ================================

export function getRoleById(roleId: string): Role | undefined {
	return roleConfigurations.find(role => role.id === roleId);
}

export function getAllRoles(): Role[] {
	return roleConfigurations;
}

export function getDefaultRole(): Role {
	return roleConfigurations[0]; // Overview role
}

export function getRoleNames(): Record<string, string> {
	return roleConfigurations.reduce((acc, role) => {
		acc[role.id] = role.name;
		return acc;
	}, {} as Record<string, string>);
} 