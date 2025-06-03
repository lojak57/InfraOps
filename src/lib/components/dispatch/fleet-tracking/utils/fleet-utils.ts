// Fleet Tracking Utilities - Extracted from Component Refactoring Plan
// @refactored: 2024-12-17 - Component Size Optimization Plan
// @phase: Phase 2 - High Priority Components

import type { FleetAsset, FleetSummaryStats, AssetRoute } from '../types/fleet-tracking.types.js';

// Filter assets based on tracking mode
export function getFilteredAssets(assets: FleetAsset[], mode: string): FleetAsset[] {
	switch (mode) {
		case 'active':
			return assets.filter(asset => ['loading', 'transit', 'delivery'].includes(asset.status));
		case 'all':
			return assets;
		default:
			return assets;
	}
}

// Get status color for fleet assets
export function getStatusColor(status: string): string {
	switch (status) {
		case 'loading': return '#f59e0b';      // amber
		case 'transit': return '#3b82f6';      // blue  
		case 'delivery': return '#10b981';     // emerald
		case 'available': return '#6b7280';    // gray
		case 'maintenance': return '#ef4444';  // red
		default: return '#6b7280';
	}
}

// Get status icon for fleet assets
export function getStatusIcon(status: string): string {
	switch (status) {
		case 'loading': return '⏳';
		case 'transit': return '🚛';
		case 'delivery': return '📦';
		case 'available': return '✅';
		case 'maintenance': return '🔧';
		default: return '❓';
	}
}

// Calculate fleet summary statistics
export function calculateFleetStats(assets: FleetAsset[]): FleetSummaryStats {
	return {
		total: assets.length,
		transit: assets.filter(a => a.status === 'transit').length,
		loading: assets.filter(a => a.status === 'loading').length,
		delivery: assets.filter(a => a.status === 'delivery').length,
		available: assets.filter(a => a.status === 'available').length,
		maintenance: assets.filter(a => a.status === 'maintenance').length
	};
}

// Generate popup content for fleet asset
export function generateAssetPopupContent(asset: FleetAsset): string {
	return `
		<div class="fleet-popup">
			<div class="popup-header">
				<strong>${asset.id}</strong>
				<span class="status-badge" style="background-color: ${getStatusColor(asset.status)}40; color: ${getStatusColor(asset.status)}">
					${asset.status.toUpperCase()}
				</span>
			</div>
			<div class="popup-content">
				<div class="popup-row">
					<span class="label">Driver:</span>
					<span class="value">${asset.driver}</span>
				</div>
				<div class="popup-row">
					<span class="label">Current Job:</span>
					<span class="value">${asset.currentJob}</span>
				</div>
				<div class="popup-row">
					<span class="label">ETA:</span>
					<span class="value">${asset.eta}</span>
				</div>
				<div class="popup-row">
					<span class="label">Speed:</span>
					<span class="value">${asset.speed} mph</span>
				</div>
				<div class="popup-row">
					<span class="label">Last Update:</span>
					<span class="value">${asset.lastUpdate.toLocaleTimeString()}</span>
				</div>
			</div>
		</div>
	`;
}

// Simulate position updates for active assets
export function simulateAssetMovement(asset: FleetAsset): FleetAsset {
	if (asset.status === 'transit' || asset.status === 'delivery') {
		// Simulate movement along route
		const speedInDegrees = asset.speed * 0.000278; // Rough conversion
		const deltaLat = Math.cos(asset.bearing * Math.PI / 180) * speedInDegrees * 0.1;
		const deltaLng = Math.sin(asset.bearing * Math.PI / 180) * speedInDegrees * 0.1;
		
		return {
			...asset,
			lat: asset.lat + deltaLat + (Math.random() - 0.5) * 0.001,
			lng: asset.lng + deltaLng + (Math.random() - 0.5) * 0.001,
			speed: Math.max(0, asset.speed + (Math.random() - 0.5) * 5),
			lastUpdate: new Date()
		};
	}
	return asset;
}

// Get route coordinates for mapping
export function getRouteCoordinates(asset: FleetAsset): [number, number][] {
	if (!asset.route) return [];
	
	return [
		[asset.route.origin.lng, asset.route.origin.lat],
		[asset.lng, asset.lat], // Current position
		[asset.route.destination.lng, asset.route.destination.lat]
	];
}

// Calculate bounds for map fitting
export function calculateFleetBounds(assets: FleetAsset[]): [[number, number], [number, number]] {
	if (assets.length === 0) {
		return [[-180, -90], [180, 90]]; // Default world bounds
	}

	let minLng = Infinity;
	let maxLng = -Infinity;
	let minLat = Infinity;
	let maxLat = -Infinity;

	assets.forEach(asset => {
		minLng = Math.min(minLng, asset.lng);
		maxLng = Math.max(maxLng, asset.lng);
		minLat = Math.min(minLat, asset.lat);
		maxLat = Math.max(maxLat, asset.lat);

		// Include route destinations in bounds
		if (asset.route) {
			minLng = Math.min(minLng, asset.route.destination.lng);
			maxLng = Math.max(maxLng, asset.route.destination.lng);
			minLat = Math.min(minLat, asset.route.destination.lat);
			maxLat = Math.max(maxLat, asset.route.destination.lat);
		}
	});

	return [[minLng, minLat], [maxLng, maxLat]];
}

// Check if asset needs attention (alerts)
export function needsAttention(asset: FleetAsset): boolean {
	const now = new Date();
	const lastUpdateAge = now.getTime() - asset.lastUpdate.getTime();
	const staleThreshold = 5 * 60 * 1000; // 5 minutes

	return (
		asset.status === 'maintenance' ||
		lastUpdateAge > staleThreshold ||
		asset.speed < 0
	);
}

// Format ETA display
export function formatETA(eta: string): string {
	if (eta === '—' || eta === '') return 'Unknown';
	return eta;
}

// Get asset status priority for sorting
export function getStatusPriority(status: string): number {
	switch (status) {
		case 'maintenance': return 0; // Highest priority
		case 'loading': return 1;
		case 'transit': return 2;
		case 'delivery': return 3;
		case 'available': return 4; // Lowest priority
		default: return 5;
	}
} 