import type { JobDetails, TrackingState, NavigationTurn, RouteStep } from '../types/map-view.types';

export function calculateTotalTime(job: JobDetails, trackingState: TrackingState): number {
	return Math.round((job.estimatedDuration + (trackingState.distanceRemaining / 45)) * 60);
}

export function generateNavigationUrl(job: JobDetails): string {
	const { lat, lng } = job.pickupLocation.coordinates;
	return `https://maps.google.com/maps?daddr=${lat},${lng}`;
}

export function formatETA(date: Date): string {
	return date.toLocaleTimeString('en-US', { 
		hour: 'numeric', 
		minute: '2-digit', 
		hour12: true 
	});
}

export function generateRouteSteps(job: JobDetails, trackingState: TrackingState): RouteStep[] {
	return [
		{
			type: 'current',
			label: 'Current → Pickup',
			distance: `${trackingState.distanceRemaining} mi`,
			isActive: true
		},
		{
			type: 'planned',
			label: 'Pickup → Delivery',
			distance: `${job.distance} mi`,
			isActive: false
		}
	];
}

export function getCurrentNavigationTurn(): NavigationTurn {
	return {
		distance: 'In 2.3 miles',
		instruction: 'Continue on I-45 North toward Pickup',
		currentRoad: 'Currently on US-290 West'
	};
} 