export interface Incident {
	id: string;
	date: string;
	time: string;
	type: string;
	severity: 'Minor' | 'Major' | 'Critical';
	location: string;
	driver: string;
	driverPhone: string;
	truck: string;
	description: string;
	cause: string;
	actionTaken: string;
	cost: string;
	downtime: string;
	status: 'Resolved' | 'Under Investigation' | 'Pending' | 'Closed';
	reportedBy: string;
	followUp: string;
}

export interface IncidentData {
	minor: Incident[];
	major: Incident[];
	critical: Incident[];
}

export type IncidentType = 'minor' | 'major' | 'critical';

export interface IncidentModalState {
	isOpen: boolean;
	incidentType: IncidentType;
	selectedIncident: Incident | null;
	incidents: Incident[];
}

export interface IncidentSeverityConfig {
	color: string;
	label: string;
	icon: any;
}

export interface IncidentTypeIconMapping {
	[key: string]: any;
}

export interface IncidentStatusConfig {
	className: string;
	label: string;
	background: string;
	color: string;
}

export interface IncidentDateTimeInfo {
	formattedDate: string;
	time: string;
	dayOfWeek: string;
}

export interface IncidentPersonnel {
	driver: string;
	driverPhone: string;
	reportedBy: string;
}

export interface IncidentVehicleInfo {
	truckId: string;
	formatted: string;
}

export interface IncidentAnalysis {
	rootCause: string;
	immediateAction: string;
	followUpPlan: string;
}

export interface IncidentImpact {
	financialCost: string;
	downtime: string;
	costFormatted: string;
	downtimeFormatted: string;
}

export interface IncidentDetailSections {
	overview: boolean;
	details: boolean;
	analysis: boolean;
	impact: boolean;
	otherIncidents: boolean;
}

export interface IncidentModalEvents {
	close: void;
	'incident-selected': { incident: Incident };
	'status-updated': { incidentId: string; status: Incident['status'] };
}

export interface IncidentModalProps {
	isOpen: boolean;
	incidentType: IncidentType;
	incidents?: Incident[];
	selectedIncident?: Incident | null;
}

export interface IncidentListItem {
	id: string;
	date: string;
	type: string;
	description: string;
	location: string;
	summary: string;
} 