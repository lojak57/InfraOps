/**
 * Realtime Chart Data Utilities
 * 
 * Data generation, management, and calculations for real-time chart components.
 * Provides realistic logistics data simulation and trend generation.
 */

// ================================
// Types
// ================================

export interface DataPoint {
	value: number;
	timestamp: string;
}

export interface ChartDataset {
	label: string;
	data: number[];
	borderColor: string;
	backgroundColor: string;
	borderWidth: number;
	fill: boolean;
	tension: number;
	pointRadius: number;
	pointHoverRadius: number;
	pointHoverBackgroundColor: string;
	pointHoverBorderColor: string;
	pointHoverBorderWidth: number;
}

export interface ChartData {
	labels: string[];
	datasets: ChartDataset[];
}

// ================================
// Data Generation
// ================================

/**
 * Get realistic base value based on chart title/context
 */
export function getBaseValueFromTitle(title: string): number {
	const titleLower = title.toLowerCase();
	
	// Return realistic values based on common logistics metrics
	if (titleLower.includes('temperature')) return 85; // °F
	if (titleLower.includes('pressure')) return 120; // PSI
	if (titleLower.includes('flow')) return 450; // rate
	if (titleLower.includes('volume')) return 2500; // units
	if (titleLower.includes('h2s') || titleLower.includes('safety')) return 0.5; // PPM
	if (titleLower.includes('network') || titleLower.includes('health')) return 97; // %
	if (titleLower.includes('efficiency')) return 94; // %
	
	return 75; // Default fallback
}

/**
 * Generate realistic initial dataset
 */
export function generateRealisticData(
	title: string, 
	maxDataPoints: number, 
	updateInterval: number
): { dataPoints: number[], labels: string[] } {
	const dataPoints: number[] = [];
	const labels: string[] = [];
	
	const baseValue = getBaseValueFromTitle(title);
	const variance = baseValue * 0.1; // 10% variance
	
	// Initialize with historical data points
	for (let i = 0; i < maxDataPoints; i++) {
		const timestamp = new Date(Date.now() - (maxDataPoints - i) * updateInterval);
		const value = baseValue + (Math.random() - 0.5) * variance;
		
		dataPoints.push(Math.max(0, value));
		labels.push(formatTimestamp(timestamp));
	}
	
	return { dataPoints, labels };
}

/**
 * Generate new data point with trending behavior
 */
export function generateNewDataPoint(
	title: string, 
	lastValue?: number
): { value: number, timestamp: string } {
	const baseValue = getBaseValueFromTitle(title);
	const variance = baseValue * 0.08; // Slightly smaller variance for realistic data
	
	// Add some trending behavior
	const currentValue = lastValue || baseValue;
	const trend = (Math.random() - 0.5) * 0.3; // Small trend component
	const noise = (Math.random() - 0.5) * variance; // Random noise
	
	const newValue = Math.max(0, currentValue + trend + noise);
	const newTimestamp = formatTimestamp(new Date());
	
	return { value: newValue, timestamp: newTimestamp };
}

/**
 * Update data arrays with new point, maintaining max length
 */
export function updateDataArrays(
	dataPoints: number[],
	labels: string[],
	newValue: number,
	newTimestamp: string,
	maxDataPoints: number
): { dataPoints: number[], labels: string[] } {
	const newDataPoints = [...dataPoints, newValue];
	const newLabels = [...labels, newTimestamp];
	
	// Remove old data if we exceed max points
	if (newDataPoints.length > maxDataPoints) {
		newDataPoints.shift();
		newLabels.shift();
	}
	
	return { dataPoints: newDataPoints, labels: newLabels };
}

// ================================
// Chart Data Setup
// ================================

/**
 * Create Chart.js compatible dataset
 */
export function createChartDataset(
	title: string,
	dataPoints: number[],
	color: string
): ChartDataset {
	return {
		label: title,
		data: dataPoints,
		borderColor: color,
		backgroundColor: `${color}20`,
		borderWidth: 2,
		fill: true,
		tension: 0.4,
		pointRadius: 0,
		pointHoverRadius: 4,
		pointHoverBackgroundColor: color,
		pointHoverBorderColor: '#ffffff',
		pointHoverBorderWidth: 2
	};
}

/**
 * Create complete chart data object
 */
export function createChartData(
	title: string,
	dataPoints: number[],
	labels: string[],
	color: string
): ChartData {
	return {
		labels: labels,
		datasets: [createChartDataset(title, dataPoints, color)]
	};
}

// ================================
// Utilities
// ================================

/**
 * Format timestamp for display
 */
export function formatTimestamp(timestamp: Date): string {
	return timestamp.toLocaleTimeString([], { 
		hour: '2-digit', 
		minute: '2-digit',
		second: '2-digit'
	});
}

/**
 * Calculate data statistics
 */
export function calculateDataStats(dataPoints: number[]): {
	min: number;
	max: number;
	avg: number;
	current: number;
} {
	if (dataPoints.length === 0) {
		return { min: 0, max: 0, avg: 0, current: 0 };
	}
	
	const min = Math.min(...dataPoints);
	const max = Math.max(...dataPoints);
	const avg = dataPoints.reduce((sum, val) => sum + val, 0) / dataPoints.length;
	const current = dataPoints[dataPoints.length - 1];
	
	return { min, max, avg, current };
}

/**
 * Get trend direction from recent data
 */
export function getTrendDirection(dataPoints: number[], lookback: number = 3): 'up' | 'down' | 'stable' {
	if (dataPoints.length < lookback + 1) return 'stable';
	
	const recent = dataPoints.slice(-lookback);
	const earlier = dataPoints.slice(-(lookback * 2), -lookback);
	
	const recentAvg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
	const earlierAvg = earlier.reduce((sum, val) => sum + val, 0) / earlier.length;
	
	const threshold = 0.02; // 2% threshold for trend detection
	const percentChange = (recentAvg - earlierAvg) / earlierAvg;
	
	if (percentChange > threshold) return 'up';
	if (percentChange < -threshold) return 'down';
	return 'stable';
} 