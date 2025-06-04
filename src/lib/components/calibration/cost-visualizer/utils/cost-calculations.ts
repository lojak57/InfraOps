import type { CostMetrics, ROIMetrics } from '../types/cost-visualizer.types';

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(amount);
}

export function calculateROIMetrics(costBreakdown: any): ROIMetrics {
	return {
		monthlyROI: (costBreakdown.monthlySavings / costBreakdown.monthlyTotal) * 100,
		annualROI: (costBreakdown.annualSavings / costBreakdown.annualTotal) * 100,
		paybackMonths: 2, // Assuming 2 months implementation time
		breakEvenAmount: costBreakdown.monthlySavings * 2
	};
}

export function calculateKeyStats(costBreakdown: any, fleetSize: number): CostMetrics {
	return {
		totalFleet: fleetSize,
		currentAnnualCost: costBreakdown.annualTotal,
		optimizedAnnualCost: costBreakdown.optimizedAnnual,
		annualSavings: costBreakdown.annualSavings,
		monthlySavings: costBreakdown.monthlySavings,
		avgSavingsPerTruck: costBreakdown.annualSavings / fleetSize
	};
}

export function getOptimizationDetails() {
	return [
		{
			icon: '🔍',
			title: 'Load Monitoring',
			description: 'Every Coriolis reading is logged and compared across the fleet'
		},
		{
			icon: '📊',
			title: 'Pattern Recognition',
			description: 'AI identifies drift patterns and outliers vs. terminal readings'
		},
		{
			icon: '🎯',
			title: 'Targeted Calibration',
			description: 'Only recommend calibration when actual drift is detected'
		},
		{
			icon: '💰',
			title: 'Cost Savings',
			description: 'Reduce unnecessary calibrations by 40% while maintaining accuracy'
		}
	];
}

export function generateInsightCards(keyStats: CostMetrics, roiMetrics: ROIMetrics) {
	return [
		{
			type: 'primary' as const,
			icon: '💡',
			title: 'Smart Insight',
			content: `Your fleet could save <strong>${formatCurrency(keyStats.monthlySavings)}/month</strong> with data-driven calibrations`
		},
		{
			type: 'secondary' as const,
			icon: '⚡',
			title: 'Quick ROI',
			content: `Implementation pays for itself in <strong>${roiMetrics.paybackMonths} months</strong> with ongoing savings`
		},
		{
			type: 'tertiary' as const,
			icon: '🎯',
			title: 'Per-Truck Impact',
			content: `Average savings of <strong>${formatCurrency(keyStats.avgSavingsPerTruck)}/truck/year</strong> with VeriJob`
		}
	];
} 