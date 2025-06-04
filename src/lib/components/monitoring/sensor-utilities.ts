import type { SensorReading } from '$lib/stores/truckMonitoringData';

export function getSensorIcon(sensor: SensorReading): string {
	switch (sensor.type) {
		case 'pressure': return '📈';
		case 'vacuum': return '📉';
		case 'temperature': return '🌡️';
		default: return '🔧';
	}
}

export function getStatusColor(status: string): string {
	switch (status) {
		case 'normal': return '#22c55e';
		case 'warning': return '#f59e0b';
		case 'critical': return '#ef4444';
		default: return '#94a3b8';
	}
}

export function getStatusText(status: string): string {
	switch (status) {
		case 'normal': return 'NORMAL';
		case 'warning': return 'WARNING';
		case 'critical': return 'CRITICAL';
		default: return 'UNKNOWN';
	}
}

export function formatThreshold(sensor: SensorReading): string {
	if (sensor.type === 'vacuum') {
		return `${sensor.minThreshold}${sensor.unit} to ${sensor.maxThreshold}${sensor.unit}`;
	} else {
		return `Max: ${sensor.maxThreshold}${sensor.unit}`;
	}
}

export function getThresholdPercentage(sensor: SensorReading): number {
	if (sensor.type === 'vacuum') {
		const range = sensor.maxThreshold - sensor.minThreshold!;
		const position = sensor.currentValue - sensor.minThreshold!;
		return Math.max(0, Math.min(100, (position / range) * 100));
	} else {
		return Math.max(0, Math.min(100, (sensor.currentValue / sensor.maxThreshold) * 100));
	}
}

export function formatLastUpdated(date: Date): string {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffSecs = Math.floor(diffMs / 1000);
	
	if (diffSecs < 30) return 'Live';
	if (diffSecs < 60) return `${diffSecs}s ago`;
	const diffMins = Math.floor(diffSecs / 60);
	if (diffMins < 60) return `${diffMins}m ago`;
	return `${Math.floor(diffMins / 60)}h ago`;
} 