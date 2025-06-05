import maplibregl from 'maplibre-gl';
import type { FleetAsset } from './types/fleet-tracking.types.js';
import { 
	getStatusColor,
	getStatusIcon,
	generateAssetPopupContent,
	getRouteCoordinates,
	calculateFleetBounds
} from './utils/fleet-utils.js';

export class FleetMapManager {
	private map: maplibregl.Map | null = null;
	private markers: Record<string, maplibregl.Marker> = {};
	private routeLines: Record<string, any> = {};
	private isMapLoaded = false;

	constructor(private container: HTMLDivElement) {}

	initializeMap(): void {
		if (!this.container) return;

		this.map = new maplibregl.Map({
			container: this.container,
			style: {
				"version": 8,
				"sources": {
					"satellite": {
						"type": "raster",
						"tiles": ["https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"],
						"tileSize": 256
					}
				},
				"layers": [{
					"id": "satellite",
					"type": "raster",
					"source": "satellite"
				}]
			},
			center: [-95.3698, 29.7604],
			zoom: 6
		});

		this.map.on('load', () => {
			this.isMapLoaded = true;
		});
	}

	addFleetAssetsToMap(assets: FleetAsset[]): void {
		if (!this.map || !this.isMapLoaded) return;

		// Clear existing markers
		Object.values(this.markers).forEach(marker => marker.remove());
		this.markers = {};

		// Clear existing routes
		Object.keys(this.routeLines).forEach(routeId => {
			if (this.map?.getLayer(routeId)) this.map.removeLayer(routeId);
			if (this.map?.getSource(routeId)) this.map.removeSource(routeId);
		});
		this.routeLines = {};

		// Add new markers and routes
		assets.forEach(asset => {
			this.addAssetMarker(asset);
			this.addAssetRoute(asset);
		});
	}

	private addAssetMarker(asset: FleetAsset): void {
		if (!this.map) return;

		const el = document.createElement('div');
		el.className = 'fleet-marker';
		el.innerHTML = `
			<div class="marker-container">
				<div class="marker-icon" style="background-color: ${getStatusColor(asset.status)}">
					${getStatusIcon(asset.status)}
				</div>
				<div class="marker-label">${asset.id}</div>
			</div>
		`;

		const popup = new maplibregl.Popup({
			offset: 25,
			closeButton: true,
			closeOnClick: false
		}).setHTML(generateAssetPopupContent(asset));

		const marker = new maplibregl.Marker({ element: el })
			.setLngLat([asset.lng, asset.lat])
			.setPopup(popup)
			.addTo(this.map);

		this.markers[asset.id] = marker;
	}

	private addAssetRoute(asset: FleetAsset): void {
		if (!this.map || !asset.route) return;

		const routeId = `route-${asset.id}`;
		const coordinates = getRouteCoordinates(asset);

		this.map.addSource(routeId, {
			'type': 'geojson',
			'data': {
				'type': 'Feature',
				'properties': { 'truckId': asset.id, 'status': asset.status },
				'geometry': { 'type': 'LineString', 'coordinates': coordinates }
			}
		});

		this.map.addLayer({
			'id': routeId,
			'type': 'line',
			'source': routeId,
			'layout': { 'line-join': 'round', 'line-cap': 'round' },
			'paint': {
				'line-color': getStatusColor(asset.status),
				'line-width': 3,
				'line-opacity': 0.7
			}
		});

		this.routeLines[routeId] = true;
	}

	fitMapToFleet(assets: FleetAsset[]): void {
		if (!this.map || assets.length === 0) return;

		const bounds = calculateFleetBounds(assets);
		this.map.fitBounds(bounds, { padding: 50, maxZoom: 12 });
	}

	destroy(): void {
		if (this.map) {
			this.map.remove();
			this.map = null;
		}
	}

	get mapLoaded(): boolean {
		return this.isMapLoaded;
	}
} 