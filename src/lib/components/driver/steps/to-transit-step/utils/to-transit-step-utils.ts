import type { 
	LocationInfo, 
	DestinationInfo, 
	RouteStats, 
	LoadStatus, 
	SiteInfo, 
	TransitMetrics, 
	StatusStep,
	NavigationInstruction 
} from '../types/to-transit-step.types';

export function getCurrentLocation(transitType: 'pickup' | 'delivery'): LocationInfo {
	return {
		lat: transitType === 'pickup' ? 35.0000 : 35.5000,
		lng: transitType === 'pickup' ? -98.0000 : -97.5000,
		address: transitType === 'pickup' ? 'En Route to Production Site' : 'En Route to Processing Terminal'
	};
}

export function getDestination(transitType: 'pickup' | 'delivery', sharedState: any): DestinationInfo {
	return transitType === 'pickup'
		? {
				name: sharedState.activeJob?.pickupSiteName || 'Production Site Alpha',
				address: sharedState.activeJob?.pickupAddress || '123 Industrial Blvd, Metro City, ST 12345',
				coordinates: { lat: 35.0000, lng: -98.0000 }
			}
		: {
				name: sharedState.activeJob?.deliverySiteName || 'Processing Terminal Beta',
				address: sharedState.activeJob?.deliveryAddress || '456 Manufacturing Ave, Industrial City, ST 54321',
				coordinates: { lat: 35.5000, lng: -97.5000 }
			};
}

export function getRouteStats(transitType: 'pickup' | 'delivery'): RouteStats {
	return transitType === 'pickup' 
		? { distance: '18.2 mi', time: '32 min' }
		: { distance: '23.4 mi', time: '42 min' };
}

export function getCurrentETA(transitType: 'pickup' | 'delivery'): string {
	const now = new Date();
	const addMinutes = transitType === 'pickup' ? 32 : 42;
	now.setMinutes(now.getMinutes() + addMinutes);
	return now.toLocaleTimeString('en-US', { 
		hour: 'numeric', 
		minute: '2-digit',
		hour12: true 
	});
}

export function getHeaderTitle(transitType: 'pickup' | 'delivery'): string {
	return transitType === 'pickup' 
		? 'Drive to Pickup Site' 
		: 'Loaded & Ready for Delivery';
}

export function getHeaderDescription(transitType: 'pickup' | 'delivery'): string {
	return transitType === 'pickup'
		? 'Review your pickup jobs and plan your route to the selected site'
		: 'Tank loaded - Plan your delivery route and navigate to offload site';
}

export function getTransitTitle(transitType: 'pickup' | 'delivery'): string {
	return transitType === 'pickup' 
		? 'IN TRANSIT TO PICKUP' 
		: 'IN TRANSIT TO DELIVERY';
}

export function getArriveButtonText(transitType: 'pickup' | 'delivery'): string {
	return transitType === 'pickup'
		? 'Arrive at Pickup Site'
		: 'Arrive at Delivery Site';
}

export function getLoadStatus(sharedState: any): LoadStatus {
	return {
		volume: sharedState.activeJob?.deliveryVolume || '120',
		from: sharedState.activeJob?.pickupSiteName || 'Johnson Tank Battery #3',
		to: sharedState.activeJob?.deliverySiteName || 'Permian Basin Processing Facility'
	};
}

export function getSiteInfo(transitType: 'pickup' | 'delivery', destination: DestinationInfo, sharedState: any): SiteInfo {
	const baseInfo = {
		siteName: destination.name,
		address: destination.address,
		contact: transitType === 'pickup' 
			? sharedState.activeJob?.pickupContact || '(432) 555-0188'
			: sharedState.activeJob?.deliveryContact || '(432) 555-0199'
	};

	if (transitType === 'pickup') {
		return {
			...baseInfo,
			tank: sharedState.activeJob?.pickupTank || '#A-15'
		};
	} else {
		return {
			...baseInfo,
			bay: sharedState.activeJob?.deliveryBay || '#7'
		};
	}
}

export function getTransitMetrics(routeStats: RouteStats, transitType: 'pickup' | 'delivery'): TransitMetrics {
	return {
		distance: routeStats.distance,
		estimatedTime: routeStats.time,
		eta: getCurrentETA(transitType)
	};
}

export function getDeliveryStatusSteps(): StatusStep[] {
	return [
		{
			icon: '✅',
			text: 'Pickup Complete',
			state: 'completed'
		},
		{
			icon: '✅',
			text: 'Loading Complete',
			state: 'completed'
		},
		{
			icon: '🚛',
			text: 'Drive to Delivery',
			state: 'active'
		},
		{
			icon: '⏳',
			text: 'Unpickup',
			state: 'pending'
		}
	];
}

export function getNavigationInstruction(transitType: 'pickup' | 'delivery'): NavigationInstruction {
	return {
		text: `In 8.2 mi — Take Exit 118 toward ${transitType === 'pickup' ? 'Well Pad Access Rd' : 'Industrial Blvd'}`,
		distance: '8.2 mi',
		direction: transitType === 'pickup' ? 'Well Pad Access Rd' : 'Industrial Blvd'
	};
} 