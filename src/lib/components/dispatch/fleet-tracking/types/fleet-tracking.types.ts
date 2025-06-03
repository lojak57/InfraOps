// Fleet Tracking Types - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 2 - High Priority Components

export interface FleetAsset {
	id: string;
	driver: string;
	lat: number;
	lng: number;
	status: 'loading' | 'transit' | 'delivery' | 'available' | 'maintenance';
	currentJob: string;
	eta: string;
	route?: AssetRoute;
	speed: number;
	bearing: number;
	lastUpdate: Date;
}

export interface AssetRoute {
	origin: RoutePoint;
	destination: RoutePoint;
}

export interface RoutePoint {
	lat: number;
	lng: number;
	name: string;
}

export interface TrackingBounds {
	north: number;
	south: number;
	east: number;
	west: number;
}

export interface MapMarker {
	id: string;
	marker: any; // maplibregl.Marker
	popup?: any; // maplibregl.Popup
}

export interface FleetSummaryStats {
	total: number;
	transit: number;
	loading: number;
	delivery: number;
	available: number;
	maintenance: number;
}

export interface TrackingSettings {
	autoUpdate: boolean;
	updateInterval: number;
	trackingMode: 'all' | 'active' | 'custom';
	showRoutes: boolean;
	showFullscreen: boolean;
}

export interface MapConfiguration {
	center: [number, number];
	zoom: number;
	style: any;
	bounds?: [[number, number], [number, number]];
}

export interface FleetEventData {
	type: 'asset-click' | 'route-change' | 'status-update' | 'fullscreen-toggle';
	asset?: FleetAsset;
	data?: any;
} 