export interface AnimationState {
	animatedMonthly: number;
	animatedAnnual: number;
	animatedSavings: number;
	animationRunning: boolean;
	animationTimeouts: number[];
	lastAnimatedValues: {
		monthly: number;
		annual: number;
		savings: number;
	};
}

export interface TableRow {
	component: string;
	current: string;
	optimized: string;
	savings: string;
	highlight?: boolean;
	important?: boolean;
	isTotal?: boolean;
	isAnnual?: boolean;
}

export interface SummaryCard {
	label: string;
	value: string;
	type: 'current' | 'optimized' | 'savings';
	subtitle?: string;
	isPositive?: boolean;
}

export interface AnimationConfig {
	duration: number;
	delay: number;
	easing: (progress: number) => number;
}

export interface TableAnimations {
	monthly: AnimationConfig;
	annual: AnimationConfig;
	savings: AnimationConfig;
}

export interface CostData {
	monthlyTotal: number;
	annualTotal: number;
	annualSavings: number;
	optimizedMonthly: number;
	optimizedAnnual: number;
	monthlySavings: number;
	costPerTruck: number;
}

export interface CalibrationConfig {
	fleetSize: number;
	timePerTruck: number;
	hourlyRate: number;
	hoursPerDay: number;
} 