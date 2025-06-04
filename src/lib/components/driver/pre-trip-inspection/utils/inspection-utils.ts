import type { InspectionItem, InspectionProgress, CategoryGroup, StatusIcon, CategoryInfo } from '../types/inspection.types';
import { CheckCircle, AlertTriangle, XCircle, Truck, Cog, Settings, Shield, Wrench, Beaker } from 'lucide-svelte';

export function getInitialInspectionItems(): InspectionItem[] {
	return [
		// Vehicle Exterior
		{ id: 'tires', category: 'Exterior', description: 'Tires (tread depth, air pressure, damage)', status: 'pass', critical: true },
		{ id: 'wheels', category: 'Exterior', description: 'Wheels and rims (cracks, loose lugs)', status: 'pending', critical: true },
		{ id: 'lights', category: 'Exterior', description: 'All lights and reflectors working', status: 'pass', critical: true },
		{ id: 'mirrors', category: 'Exterior', description: 'Mirrors clean and properly adjusted', status: 'pass' },
		{ id: 'windshield', category: 'Exterior', description: 'Windshield and windows (cracks, chips)', status: 'pending' },
		{ id: 'hood', category: 'Exterior', description: 'Hood latched securely', status: 'pass' },
		
		// Engine Compartment
		{ id: 'fluid-level', category: 'Engine', description: 'Engine fluid level and condition', status: 'pass', critical: true },
		{ id: 'coolant', category: 'Engine', description: 'Coolant level and condition', status: 'pending', critical: true },
		{ id: 'belts', category: 'Engine', description: 'Drive belts (wear, tension)', status: 'pass' },
		{ id: 'hoses', category: 'Engine', description: 'Hoses and connections', status: 'pass' },
		{ id: 'battery', category: 'Engine', description: 'Battery secured and terminals clean', status: 'pending' },
		
		// Cab Interior
		{ id: 'seat-belts', category: 'Interior', description: 'Seat belts functional', status: 'pass', critical: true },
		{ id: 'horn', category: 'Interior', description: 'Horn working', status: 'pending' },
		{ id: 'gauges', category: 'Interior', description: 'All gauges and warning lights', status: 'pass', critical: true },
		{ id: 'wipers', category: 'Interior', description: 'Windshield wipers and washers', status: 'pass' },
		{ id: 'heater-defrost', category: 'Interior', description: 'Heater and defroster working', status: 'pass' },
		
		// Braking System
		{ id: 'brake-pedal', category: 'Brakes', description: 'Brake pedal feel and travel', status: 'pass', critical: true },
		{ id: 'parking-brake', category: 'Brakes', description: 'Parking brake operation', status: 'pending', critical: true },
		{ id: 'air-pressure', category: 'Brakes', description: 'Air pressure build-up and leaks', status: 'pass', critical: true },
		
		// Trailer/Tank Specific
		{ id: 'coupling', category: 'Coupling', description: 'Fifth wheel and kingpin secure', status: 'pass', critical: true },
		{ id: 'air-lines', category: 'Coupling', description: 'Air lines connected and secure', status: 'pending', critical: true },
		{ id: 'electrical', category: 'Coupling', description: 'Electrical connections working', status: 'pass' },
		{ id: 'tank-valves', category: 'Tank', description: 'Tank valves closed and secure', status: 'pass', critical: true },
		{ id: 'emergency-kit', category: 'Safety', description: 'Emergency kit and spill response', status: 'pass', critical: true },
		{ id: 'placards', category: 'Safety', description: 'Proper placards displayed', status: 'pending', critical: true }
	];
}

export function groupItemsByCategory(items: InspectionItem[]): CategoryGroup {
	return items.reduce((groups, item) => {
		if (!groups[item.category]) {
			groups[item.category] = [];
		}
		groups[item.category].push(item);
		return groups;
	}, {} as CategoryGroup);
}

export function calculateInspectionProgress(items: InspectionItem[]): InspectionProgress {
	const totalItems = items.length;
	const completedItems = items.filter(item => item.status !== 'pending').length;
	const failedItems = items.filter(item => item.status === 'fail' || item.status === 'defect').length;
	const criticalFailures = items.filter(item => item.critical && (item.status === 'fail' || item.status === 'defect')).length;
	const completionPercent = Math.round((completedItems / totalItems) * 100);
	const canComplete = completedItems === totalItems && criticalFailures === 0;

	return {
		totalItems,
		completedItems,
		failedItems,
		criticalFailures,
		completionPercent,
		canComplete
	};
}

export function updateItemStatus(
	items: InspectionItem[], 
	itemId: string, 
	status: InspectionItem['status']
): InspectionItem[] {
	return items.map(item => 
		item.id === itemId ? { ...item, status } : item
	);
}

export function addNotesToItem(
	items: InspectionItem[], 
	itemId: string, 
	notes: string
): InspectionItem[] {
	return items.map(item => 
		item.id === itemId ? { ...item, notes } : item
	);
}

export function markPhotoTaken(
	items: InspectionItem[], 
	itemId: string
): InspectionItem[] {
	return items.map(item => 
		item.id === itemId ? { ...item, photoTaken: true } : item
	);
}

export function getStatusIcon(status: InspectionItem['status']): StatusIcon {
	switch (status) {
		case 'pass': return { component: CheckCircle, color: 'text-emerald-600' };
		case 'fail': 
		case 'defect': return { component: XCircle, color: 'text-red-600' };
		default: return { component: AlertTriangle, color: 'text-gray-400' };
	}
}

export function getCategoryIcon(category: string): any {
	const icons: Record<string, any> = {
		'Exterior': Truck,
		'Engine': Cog,
		'Interior': Settings,
		'Brakes': Shield,
		'Coupling': Wrench,
		'Tank': Beaker,
		'Safety': Shield
	};
	return icons[category] || Shield;
}

export function getCategoryDescription(category: string): string {
	const descriptions: Record<string, string> = {
		'Exterior': 'Inspect vehicle exterior components including tires, lights, and body condition',
		'Engine': 'Check engine compartment fluids, belts, and mechanical components',
		'Interior': 'Verify cab safety equipment and operational controls',
		'Brakes': 'Test braking system components and air pressure systems',
		'Coupling': 'Inspect trailer connection points and electrical systems',
		'Tank': 'Verify tank integrity and valve operation for safe transport',
		'Safety': 'Confirm emergency equipment and regulatory compliance'
	};
	return descriptions[category] || '';
}

export function getCategoryStatus(items: InspectionItem[]): string {
	if (items.every(item => item.status === 'pass')) {
		return '✅ Complete';
	} else if (items.some(item => item.status === 'fail' || item.status === 'defect')) {
		return '⚠️ Issues Found';
	} else if (items.some(item => item.status !== 'pending')) {
		return '🔄 In Progress';
	} else {
		return '⏳ Pending';
	}
}

export function shouldShowPhotoButton(item: InspectionItem): boolean {
	return !!(item.photoRequired || item.status === 'fail' || item.status === 'defect');
} 