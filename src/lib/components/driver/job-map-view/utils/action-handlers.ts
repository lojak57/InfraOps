import type { JobDetails, ActionButton } from '../types/map-view.types';
import { 
	Phone, AlertCircle, Truck
} from 'lucide-svelte';

export function createActionButtons(job: JobDetails, dispatch: any): ActionButton[] {
	return [
		{
			id: 'dispatch',
			label: 'Call Dispatch',
			icon: Phone,
			variant: 'dispatch',
			action: () => callDispatch()
		},
		{
			id: 'customer',
			label: 'Emergency Contact',
			icon: Phone,
			variant: 'customer',
			action: () => callEmergency(job.customerContact.phone)
		},
		{
			id: 'issue',
			label: 'Report Issue',
			icon: AlertCircle,
			variant: 'issue',
			action: () => reportIssue()
		},
		{
			id: 'transit',
			label: 'Start Transit',
			icon: Truck,
			variant: 'transit',
			action: () => dispatch('start-transit', { job })
		}
	];
}

export function callDispatch(): void {
	console.log('Calling dispatch...');
}

export function callEmergency(phone: string): void {
	console.log('Calling emergency contact:', phone);
}

export function reportIssue(): void {
	console.log('Reporting issue...');
} 