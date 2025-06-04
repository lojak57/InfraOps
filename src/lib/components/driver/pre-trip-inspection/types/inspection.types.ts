export interface InspectionItem {
	id: string;
	category: string;
	description: string;
	status: 'pending' | 'pass' | 'fail' | 'defect';
	notes?: string;
	photoRequired?: boolean;
	photoTaken?: boolean;
	critical?: boolean;
}

export interface InspectionProgress {
	totalItems: number;
	completedItems: number;
	failedItems: number;
	criticalFailures: number;
	completionPercent: number;
	canComplete: boolean;
}

export interface InspectionState {
	currentDate: Date;
	driverName: string;
	truckId: string;
	trailerNumber: string;
	currentStep: 'inspection' | 'review' | 'complete';
	defectNotes: string;
	generalNotes: string;
	showPhotoModal: boolean;
	selectedItemForPhoto: InspectionItem | null;
}

export interface InspectionData {
	date: Date;
	driver: string;
	truck: string;
	trailer: string;
	items: InspectionItem[];
	status: 'passed' | 'defects-noted';
	defectNotes: string;
	generalNotes: string;
	completedAt: Date;
}

export interface CategoryGroup {
	[category: string]: InspectionItem[];
}

export interface StatusIcon {
	component: any;
	color: string;
}

export interface CategoryInfo {
	name: string;
	description: string;
	icon: any;
} 