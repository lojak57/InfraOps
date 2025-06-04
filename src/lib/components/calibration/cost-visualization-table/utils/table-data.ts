import type { TableRow, SummaryCard, CostData, CalibrationConfig } from '../types/table.types';

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(amount);
}

export function formatPercentage(value: number): string {
	return `${(value * 100).toFixed(1)}%`;
}

export function generateTableRows(
	costData: CostData,
	calibrationConfig: CalibrationConfig,
	animatedValues: { monthly: number; annual: number; savings: number }
): TableRow[] {
	return [
		{
			component: 'Fleet Size',
			current: `${calibrationConfig.fleetSize.toLocaleString()} trucks`,
			optimized: `${calibrationConfig.fleetSize.toLocaleString()} trucks`,
			savings: '-'
		},
		{
			component: 'Calibration Frequency',
			current: 'Monthly',
			optimized: 'As-Needed',
			savings: '40% reduction'
		},
		{
			component: 'Time per Truck',
			current: `${calibrationConfig.timePerTruck} days`,
			optimized: `${calibrationConfig.timePerTruck} days`,
			savings: '-'
		},
		{
			component: 'Hourly Cost',
			current: `${formatCurrency(calibrationConfig.hourlyRate)}/hr`,
			optimized: `${formatCurrency(calibrationConfig.hourlyRate)}/hr`,
			savings: '-'
		},
		{
			component: 'Hours per Calibration',
			current: `${calibrationConfig.hoursPerDay} hours`,
			optimized: `${calibrationConfig.hoursPerDay} hours`,
			savings: '-'
		},
		{
			component: 'Cost per Truck',
			current: formatCurrency(costData.costPerTruck),
			optimized: formatCurrency(costData.costPerTruck),
			savings: '-',
			highlight: true,
			important: true
		},
		{
			component: 'Monthly Cost',
			current: formatCurrency(animatedValues.monthly),
			optimized: formatCurrency(costData.optimizedMonthly),
			savings: formatCurrency(costData.monthlySavings),
			isTotal: true
		},
		{
			component: 'Annual Cost',
			current: formatCurrency(animatedValues.annual),
			optimized: formatCurrency(costData.optimizedAnnual),
			savings: formatCurrency(animatedValues.savings),
			isTotal: true,
			isAnnual: true
		}
	];
}

export function generateSummaryCards(costData: CostData): SummaryCard[] {
	return [
		{
			label: 'Current Annual Cost',
			value: formatCurrency(costData.annualTotal),
			type: 'current'
		},
		{
			label: 'With VeriJob',
			value: formatCurrency(costData.optimizedAnnual),
			type: 'optimized'
		},
		{
			label: 'Annual Savings',
			value: formatCurrency(costData.annualSavings),
			type: 'savings',
			subtitle: '40% reduction',
			isPositive: true
		}
	];
}

export function getTableHeaders(): { key: string; label: string; type?: string }[] {
	return [
		{ key: 'component', label: 'Cost Component', type: 'item-header' },
		{ key: 'current', label: 'Current Model', type: 'value-header' },
		{ key: 'optimized', label: 'VeriJob Optimized', type: 'value-header optimized' },
		{ key: 'savings', label: 'Savings', type: 'value-header savings' }
	];
} 