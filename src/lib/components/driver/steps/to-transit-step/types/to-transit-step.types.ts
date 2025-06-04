export interface TransitType {
	type: 'pickup' | 'delivery';
	subStep: string;
}

export interface LocationInfo {
	lat: number;
	lng: number;
	address: string;
}

export interface DestinationInfo {
	name: string;
	address: string;
	coordinates: { lat: number; lng: number };
}

export interface RouteStats {
	distance: string;
	time: string;
}

export interface LoadStatus {
	volume: string;
	from: string;
	to: string;
}

export interface SiteInfo {
	siteName: string;
	address: string;
	contact: string;
	tank?: string;
	bay?: string;
}

export interface TransitMetrics {
	distance: string;
	estimatedTime: string;
	eta: string;
}

export interface StatusStep {
	icon: string;
	text: string;
	state: 'completed' | 'active' | 'pending';
}

export interface NavigationInstruction {
	text: string;
	distance: string;
	direction: string;
} 