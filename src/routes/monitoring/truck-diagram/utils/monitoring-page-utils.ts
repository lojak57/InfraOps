import type { 
	HeaderStats, 
	StatusCounts, 
	LOVISVisionStatus, 
	NotificationData,
	AlertsBannerData 
} from '../types/monitoring-page.types';

// Status calculation utilities
export function calculateValveStatusCounts(valves: any[]): StatusCounts['valves'] {
	return {
		open: valves.filter(v => v.status === 'open').length,
		closed: valves.filter(v => v.status === 'closed').length,
		unknown: valves.filter(v => v.status === 'unknown').length
	};
}

export function calculateSensorStatusCounts(sensors: any[]): StatusCounts['sensors'] {
	return {
		normal: sensors.filter(s => s.status === 'normal').length,
		warning: sensors.filter(s => s.status === 'warning').length,
		critical: sensors.filter(s => s.status === 'critical').length
	};
}

export function calculateHeaderStats(truckMonitoringData: any, systemAlerts: string[]): HeaderStats {
	return {
		truckId: truckMonitoringData.truckId,
		activeAlerts: systemAlerts.length,
		connectionStatus: truckMonitoringData.connectionStatus
	};
}

export function calculateStatusCounts(truckMonitoringData: any): StatusCounts {
	return {
		valves: calculateValveStatusCounts(truckMonitoringData.valves),
		sensors: calculateSensorStatusCounts(truckMonitoringData.sensors)
	};
}

// LOVISVision integration utilities
export function getLOVISVisionStatus(truckMonitoringData: any): LOVISVisionStatus {
	return {
		connected: truckMonitoringData.connectionStatus === 'connected',
		lastSync: new Date(truckMonitoringData.lastSync),
		features: {
			realtimeMonitoring: true,
			emailAlerts: true,
			valveStatusCapture: true
		}
	};
}

export function formatLastSyncTime(lastSync: Date): string {
	return lastSync.toLocaleTimeString();
}

// Notification system utilities
export function createNotification(message: string, type: NotificationData['type']): NotificationData {
	return {
		message,
		type,
		timestamp: new Date()
	};
}

export function getNotificationClass(type: NotificationData['type']): string {
	return `notification notification-${type}`;
}

export function showBrowserNotification(notification: NotificationData): void {
	// Simple notification implementation for browser
	const notifications = document.getElementById('notifications');
	if (notifications) {
		const notificationElement = document.createElement('div');
		notificationElement.className = getNotificationClass(notification.type);
		notificationElement.textContent = notification.message;
		notifications.appendChild(notificationElement);
		
		setTimeout(() => {
			notificationElement.remove();
		}, 3000);
	}
}

// Event handler utilities
export function handleValveToggled(valve: any): NotificationData {
	return createNotification(
		`${valve.name} ${valve.status.toUpperCase()}`,
		'success'
	);
}

export function handleSensorClicked(sensor: any): NotificationData {
	return createNotification(
		`Viewing ${sensor.name} details`,
		'info'
	);
}

// Alerts banner utilities
export function processSystemAlerts(systemAlerts: string[]): AlertsBannerData {
	return {
		alerts: systemAlerts,
		visible: systemAlerts.length > 0
	};
}

export function formatAlertsText(systemAlerts: string[]): string {
	const alertCount = systemAlerts.length;
	const alertText = alertCount > 1 ? 'Active Alerts' : 'Active Alert';
	const mainAlerts = systemAlerts.slice(0, 2).join(' • ');
	const additionalCount = alertCount > 2 ? alertCount - 2 : 0;
	
	return `${alertCount} ${alertText}: ${mainAlerts}${additionalCount > 0 ? ` and ${additionalCount} more...` : ''}`;
}

// View management utilities
export function getViewModeClass(selectedView: string, currentView: string): string {
	return selectedView === currentView ? 'nav-tab active' : 'nav-tab';
}

export function shouldShowOverview(selectedView: string): boolean {
	return selectedView === 'overview';
}

export function shouldShowValves(selectedView: string): boolean {
	return selectedView === 'valves';
}

export function shouldShowSensors(selectedView: string): boolean {
	return selectedView === 'sensors';
}

// Connection status utilities
export function getConnectionStatusColor(status: 'connected' | 'disconnected'): string {
	return status === 'connected' ? '🟢' : '🔴';
}

export function hasConnectionWarning(stats: HeaderStats): boolean {
	return stats.activeAlerts > 0;
}

// Page metadata utilities
export function getPageMetadata() {
	return {
		title: 'Live Truck Monitoring - FlowOps Logistics Operations',
		description: 'Real-time valve and sensor monitoring for oil transport trucks with interactive diagrams and LOVISVision integration.'
	};
}

export function setPageTitle(): void {
	const metadata = getPageMetadata();
	document.title = metadata.title;
}

// Demo data utilities
export function getDemoFooterInfo() {
	return {
		demoText: 'Interactive valve control • Live sensor simulation • LOVISVision integration',
		techStack: 'Powered by FlowOps • Krohne Opticheck • LOVISVision'
	};
} 