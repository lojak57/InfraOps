import { AlertTriangle, Calendar, MapPin, Truck, Clock, FileText, User, Phone } from 'lucide-svelte';
import type { 
	Incident, 
	IncidentData, 
	IncidentType,
	IncidentDateTimeInfo,
	IncidentPersonnel,
	IncidentVehicleInfo,
	IncidentAnalysis,
	IncidentImpact,
	IncidentListItem
} from '../types/incident-detail.types';

// Demo incident data generation
export function generateIncidentData(): IncidentData {
	return {
		minor: [
			{
				id: 'INC-2024-001',
				date: '2024-01-15',
				time: '14:23',
				type: 'Equipment Damage',
				severity: 'Minor',
				location: 'Metro Hub Alpha - Bay 3',
				driver: 'Driver Alpha-1',
				driverPhone: '(XXX) XXX-1001',
				truck: 'TX-4721',
				description: 'Trailer door hinge damaged during pickup. Small scrape on exterior panel.',
				cause: 'Door opened too quickly against pickup dock barrier',
				actionTaken: 'Hinge repaired on-site, safety briefing conducted',
				cost: '$340',
				downtime: '45 minutes',
				status: 'Resolved',
				reportedBy: 'Loading Supervisor - Manager Alpha-4',
				followUp: 'Scheduled reinforcement training for Q2 2024'
			},
			{
				id: 'INC-2024-002',
				date: '2024-01-22',
				time: '09:15',
				type: 'Delay',
				severity: 'Minor',
				location: 'Regional Hub North - Route 35',
				driver: 'Driver Beta-2',
				driverPhone: '(XXX) XXX-1002',
				truck: 'RN-8392',
				description: 'Delivery delayed 30 minutes due to incorrect gate access code.',
				cause: 'Client provided outdated access information',
				actionTaken: 'Contact made with site manager, correct code obtained',
				cost: '$85',
				downtime: '30 minutes',
				status: 'Resolved',
				reportedBy: 'Driver - Driver Beta-2',
				followUp: 'Updated client contact protocols'
			}
		],
		major: [
			{
				id: 'INC-2024-003',
				date: '2024-01-08',
				time: '11:47',
				type: 'Vehicle Breakdown',
				severity: 'Major',
				location: 'Interstate Route 45 South, Mile Marker 127',
				driver: 'Driver Gamma-3',
				driverPhone: '(XXX) XXX-1003',
				truck: 'TX-6145',
				description: 'Complete hydraulic system failure during transport. Vehicle immobilized.',
				cause: 'Hydraulic line rupture due to wear and pressure',
				actionTaken: 'Emergency tow service dispatched, load transferred to backup truck',
				cost: '$4,250',
				downtime: '6 hours',
				status: 'Under Investigation',
				reportedBy: 'Driver - Driver Gamma-3',
				followUp: 'Full hydraulic system inspection on all fleet vehicles scheduled'
			}
		],
		critical: []
	};
}

// Incident filtering and selection
export function getIncidentsByType(incidentData: IncidentData, type: IncidentType): Incident[] {
	return incidentData[type] || [];
}

export function getSelectedIncident(incidents: Incident[]): Incident | null {
	return incidents[0] || null;
}

// Severity utilities
export function getSeverityColor(severity: string): string {
	switch (severity.toLowerCase()) {
		case 'minor': return '#f59e0b';
		case 'major': return '#ef4444';
		case 'critical': return '#dc2626';
		default: return '#6b7280';
	}
}

export function getSeverityConfig(severity: string) {
	return {
		color: getSeverityColor(severity),
		backgroundColor: `${getSeverityColor(severity)}20`
	};
}

// Type icon utilities
export function getTypeIcon(type: string) {
	switch (type.toLowerCase()) {
		case 'equipment damage': return FileText;
		case 'delay': return Clock;
		case 'vehicle breakdown': return Truck;
		default: return AlertTriangle;
	}
}

export function getIncidentTypeIconMapping() {
	return {
		'equipment damage': FileText,
		'delay': Clock,
		'vehicle breakdown': Truck,
		'default': AlertTriangle
	};
}

// Status utilities
export function getStatusClass(status: string): string {
	return `status-${status.toLowerCase().replace(' ', '-')}`;
}

export function getStatusConfig(status: string) {
	switch (status.toLowerCase()) {
		case 'resolved':
			return {
				className: 'status-resolved',
				background: '#dcfce7',
				color: '#16a34a'
			};
		case 'under investigation':
			return {
				className: 'status-under-investigation',
				background: '#fef3c7',
				color: '#d97706'
			};
		case 'pending':
			return {
				className: 'status-pending',
				background: '#e0e7ff',
				color: '#3730a3'
			};
		case 'closed':
			return {
				className: 'status-closed',
				background: '#f3f4f6',
				color: '#374151'
			};
		default:
			return {
				className: 'status-unknown',
				background: '#f3f4f6',
				color: '#6b7280'
			};
	}
}

// Date and time formatting
export function formatIncidentDate(dateString: string): IncidentDateTimeInfo {
	const date = new Date(dateString);
	return {
		formattedDate: date.toLocaleDateString('en-US', { 
			weekday: 'long', 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		}),
		time: dateString,
		dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' })
	};
}

export function formatSimpleDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString();
}

// Personnel data extraction
export function extractPersonnelInfo(incident: Incident): IncidentPersonnel {
	return {
		driver: incident.driver,
		driverPhone: incident.driverPhone,
		reportedBy: incident.reportedBy
	};
}

// Vehicle data extraction
export function extractVehicleInfo(incident: Incident): IncidentVehicleInfo {
	return {
		truckId: incident.truck,
		formatted: incident.truck
	};
}

// Analysis data extraction
export function extractAnalysisInfo(incident: Incident): IncidentAnalysis {
	return {
		rootCause: incident.cause,
		immediateAction: incident.actionTaken,
		followUpPlan: incident.followUp
	};
}

// Impact data extraction and formatting
export function extractImpactInfo(incident: Incident): IncidentImpact {
	return {
		financialCost: incident.cost,
		downtime: incident.downtime,
		costFormatted: incident.cost,
		downtimeFormatted: incident.downtime
	};
}

// Text truncation for summaries
export function truncateDescription(description: string, length: number = 60): string {
	return description.length > length 
		? `${description.substring(0, length)}...` 
		: description;
}

// Other incidents processing
export function getOtherIncidents(incidents: Incident[]): Incident[] {
	return incidents.slice(1);
}

export function formatIncidentListItem(incident: Incident): IncidentListItem {
	return {
		id: incident.id,
		date: formatSimpleDate(incident.date),
		type: incident.type,
		description: incident.description,
		location: incident.location,
		summary: truncateDescription(incident.description)
	};
}

export function hasOtherIncidents(incidents: Incident[]): boolean {
	return incidents.length > 1;
}

// Modal event handlers
export function handleBackdropClick(event: MouseEvent, onClose: () => void): void {
	if (event.target === event.currentTarget) {
		onClose();
	}
}

// Incident type capitalization
export function capitalizeIncidentType(type: string): string {
	return type.charAt(0).toUpperCase() + type.slice(1);
}

// Badge text generation
export function generateIncidentBadgeText(severity: string, type: string): string {
	return `${severity} • ${type}`;
}

// Section visibility helpers
export function shouldShowOtherIncidents(incidents: Incident[]): boolean {
	return incidents.length > 1;
}

export function getModalHeaderTitle(): string {
	return 'Incident Details';
}

// Incident data validation
export function isValidIncident(incident: any): incident is Incident {
	return incident && 
		typeof incident.id === 'string' &&
		typeof incident.date === 'string' &&
		typeof incident.severity === 'string' &&
		typeof incident.type === 'string';
} 