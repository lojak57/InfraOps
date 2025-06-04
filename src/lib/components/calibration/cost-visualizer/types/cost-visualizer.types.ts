export interface CostMetrics {
	totalFleet: number;
	currentAnnualCost: number;
	optimizedAnnualCost: number;
	annualSavings: number;
	monthlySavings: number;
	avgSavingsPerTruck: number;
}

export interface ROIMetrics {
	monthlyROI: number;
	annualROI: number;
	paybackMonths: number;
	breakEvenAmount: number;
}

export interface VisualizerTheme {
	isDark: boolean;
	toggleTheme: () => void;
}

export interface OptimizationDetail {
	icon: string;
	title: string;
	description: string;
}

export interface InsightCard {
	type: 'primary' | 'secondary' | 'tertiary';
	icon: string;
	title: string;
	content: string;
}

export interface MetricItem {
	label: string;
	value: string;
	type?: 'cost' | 'savings' | 'roi';
	highlight?: boolean;
}

export interface DemoConfig {
	companyName: string;
	fleetSize: number;
	contactAction: () => void;
} 