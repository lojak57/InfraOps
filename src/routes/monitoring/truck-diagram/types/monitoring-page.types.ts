export interface MonitoringView {
	selected: 'overview' | 'valves' | 'sensors';
	showDiagramLabels: boolean;
}

export interface HeaderStats {
	truckId: string;
	activeAlerts: number;
	connectionStatus: 'connected' | 'disconnected';
}

export interface StatusCounts {
	valves: {
		open: number;
		closed: number;
		unknown: number;
	};
	sensors: {
		normal: number;
		warning: number;
		critical: number;
	};
}

export interface NotificationData {
	message: string;
	type: 'success' | 'info' | 'warning' | 'error';
	timestamp: Date;
}

export interface LOVISVisionStatus {
	connected: boolean;
	lastSync: Date;
	features: {
		realtimeMonitoring: boolean;
		emailAlerts: boolean;
		valveStatusCapture: boolean;
	};
}

export interface MonitoringPageState {
	view: MonitoringView;
	stats: HeaderStats;
	statusCounts: StatusCounts;
	lovisVision: LOVISVisionStatus;
	notifications: NotificationData[];
}

export interface MonitoringEventHandlers {
	onViewChange: (view: 'overview' | 'valves' | 'sensors') => void;
	onValveToggled: (valve: any) => void;
	onSensorClicked: (sensor: any) => void;
	onToggleLabels: (show: boolean) => void;
	onShowNotification: (message: string, type: NotificationData['type']) => void;
}

export interface AlertsBannerData {
	alerts: string[];
	visible: boolean;
}

export interface MonitoringLayout {
	overview: {
		diagramSection: boolean;
		quickStatus: boolean;
	};
	valves: {
		panelVisible: boolean;
	};
	sensors: {
		panelVisible: boolean;
	};
} 