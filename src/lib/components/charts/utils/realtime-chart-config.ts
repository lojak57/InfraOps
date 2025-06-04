/**
 * Realtime Chart Configuration Utilities
 * 
 * Chart options, scales, and responsive configuration for Chart.js components.
 * Handles responsive design, tooltips, and chart appearance settings.
 */

// ================================
// Types
// ================================

export interface ChartPadding {
	left: number;
	right: number;
	top: number;
	bottom: number;
}

export interface ChartOptions {
	responsive: boolean;
	maintainAspectRatio: boolean;
	layout: {
		padding: ChartPadding;
	};
	plugins: any;
	scales: any;
	interaction: any;
	animation: any;
	elements: any;
}

// ================================
// Chart Options Creation
// ================================

/**
 * Create complete chart options configuration
 */
export function createChartOptions(
	color: string,
	unit: string,
	showGrid: boolean,
	animated: boolean,
	screenWidth: number,
	padding: ChartPadding
): ChartOptions {
	return {
		responsive: true,
		maintainAspectRatio: false,
		layout: {
			padding: padding
		},
		plugins: createPluginOptions(color, unit),
		scales: createScaleOptions(color, unit, showGrid, screenWidth),
		interaction: createInteractionOptions(),
		animation: createAnimationOptions(animated),
		elements: createElementOptions()
	};
}

/**
 * Create plugin configuration (legend, tooltip)
 */
export function createPluginOptions(color: string, unit: string) {
	return {
		legend: {
			display: false
		},
		tooltip: {
			mode: 'index',
			intersect: false,
			backgroundColor: 'rgba(0, 0, 0, 0.8)',
			titleColor: '#ffffff',
			bodyColor: '#ffffff',
			borderColor: color,
			borderWidth: 1,
			cornerRadius: 8,
			displayColors: false,
			callbacks: {
				label: function(context: any) {
					return `${context.parsed.y.toFixed(1)}${unit}`;
				}
			}
		}
	};
}

/**
 * Create scale configuration (x and y axes)
 */
export function createScaleOptions(
	color: string,
	unit: string,
	showGrid: boolean,
	screenWidth: number
) {
	return {
		x: createXScaleOptions(showGrid, screenWidth),
		y: createYScaleOptions(unit, showGrid)
	};
}

/**
 * Create X-axis scale configuration
 */
export function createXScaleOptions(showGrid: boolean, screenWidth: number) {
	return {
		display: true,
		position: 'bottom',
		grid: {
			display: showGrid,
			color: 'rgba(0, 0, 0, 0.1)',
			lineWidth: 1
		},
		ticks: {
			display: true,
			maxTicksLimit: screenWidth > 768 ? 5 : 3,
			color: '#374151',
			font: {
				size: 12,
				weight: 500,
				family: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
			},
			padding: 10,
			maxRotation: 0,
			minRotation: 0
		},
		border: {
			display: true,
			color: '#d1d5db'
		}
	};
}

/**
 * Create Y-axis scale configuration
 */
export function createYScaleOptions(unit: string, showGrid: boolean) {
	return {
		display: showGrid,
		position: 'left',
		grid: {
			display: showGrid,
			color: 'rgba(0, 0, 0, 0.1)',
			lineWidth: 1
		},
		ticks: {
			display: true,
			maxTicksLimit: 5,
			color: '#374151',
			font: {
				size: 12,
				weight: 500,
				family: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
			},
			callback: function(value: any) {
				return `${value}${unit}`;
			},
			padding: 10
		},
		border: {
			display: true,
			color: '#d1d5db'
		}
	};
}

/**
 * Create interaction configuration
 */
export function createInteractionOptions() {
	return {
		intersect: false,
		mode: 'index'
	};
}

/**
 * Create animation configuration
 */
export function createAnimationOptions(animated: boolean) {
	return animated ? {
		duration: 750,
		easing: 'easeInOutQuart'
	} : false;
}

/**
 * Create element configuration
 */
export function createElementOptions() {
	return {
		line: {
			tension: 0.4
		},
		point: {
			radius: 0,
			hoverRadius: 4
		}
	};
}

// ================================
// Responsive Utilities
// ================================

/**
 * Get responsive padding based on screen size
 */
export function getResponsivePadding(
	screenWidth: number,
	basePadding: ChartPadding
): ChartPadding {
	const isMobile = screenWidth <= 768;
	
	return {
		left: isMobile ? Math.max(basePadding.left - 5, 10) : basePadding.left,
		right: isMobile ? Math.max(basePadding.right - 5, 10) : basePadding.right,
		top: isMobile ? Math.max(basePadding.top - 5, 10) : basePadding.top,
		bottom: isMobile ? Math.max(basePadding.bottom - 10, 30) : basePadding.bottom
	};
}

/**
 * Get responsive chart height
 */
export function getResponsiveHeight(baseHeight: number, screenWidth: number): number {
	if (screenWidth <= 480) {
		return Math.max(baseHeight - 50, 250);
	}
	if (screenWidth <= 768) {
		return Math.max(baseHeight - 30, 300);
	}
	return baseHeight;
}

/**
 * Get responsive font sizes
 */
export function getResponsiveFontSizes(screenWidth: number) {
	const isMobile = screenWidth <= 768;
	
	return {
		title: isMobile ? 14 : 16,
		legend: isMobile ? 10 : 12,
		tick: isMobile ? 10 : 12,
		tooltip: isMobile ? 11 : 12
	};
}

// ================================
// Theme Utilities
// ================================

/**
 * Apply dark mode adjustments to chart options
 */
export function applyDarkModeOptions(options: ChartOptions): ChartOptions {
	return {
		...options,
		scales: {
			...options.scales,
			x: {
				...options.scales.x,
				ticks: {
					...options.scales.x.ticks,
					color: '#f3f4f6'
				},
				border: {
					...options.scales.x.border,
					color: '#4b5563'
				}
			},
			y: {
				...options.scales.y,
				ticks: {
					...options.scales.y.ticks,
					color: '#f3f4f6'
				},
				border: {
					...options.scales.y.border,
					color: '#4b5563'
				}
			}
		}
	};
}

/**
 * Apply light mode adjustments to chart options
 */
export function applyLightModeOptions(options: ChartOptions): ChartOptions {
	return {
		...options,
		scales: {
			...options.scales,
			x: {
				...options.scales.x,
				ticks: {
					...options.scales.x.ticks,
					color: '#374151'
				},
				border: {
					...options.scales.x.border,
					color: '#d1d5db'
				}
			},
			y: {
				...options.scales.y,
				ticks: {
					...options.scales.y.ticks,
					color: '#374151'
				},
				border: {
					...options.scales.y.border,
					color: '#d1d5db'
				}
			}
		}
	};
}

// ================================
// Constants
// ================================

export const DEFAULT_PADDING: ChartPadding = {
	left: 15,
	right: 15,
	top: 15,
	bottom: 50
};

export const MOBILE_BREAKPOINT = 768;
export const SMALL_MOBILE_BREAKPOINT = 480; 