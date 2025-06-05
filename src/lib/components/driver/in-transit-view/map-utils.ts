import maplibregl from 'maplibre-gl';

export interface TransitLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface JobLocation {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export function createTransitMap(
  container: HTMLDivElement,
  currentLocation: TransitLocation
): maplibregl.Map {
  return new maplibregl.Map({
    container,
    style: {
      "version": 8,
      "sources": {
        "carto-light": {
          "type": "raster",
          "tiles": [
            "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          ],
          "tileSize": 256,
          "attribution": "© CartoDB © OpenStreetMap contributors"
        }
      },
      "layers": [
        {
          "id": "carto-light-layer",
          "type": "raster",
          "source": "carto-light",
          "minzoom": 0,
          "maxzoom": 22
        }
      ]
    },
    center: [currentLocation.lng, currentLocation.lat],
    zoom: 12,
    attributionControl: false
  });
}

export function addTransitRoute(
  map: maplibregl.Map,
  currentLocation: TransitLocation,
  deliveryLocation: JobLocation,
  transitSpeed: number,
  distanceToDelivery: number
): void {
  if (!map) return;

  // Current location marker (moving truck)
  const currentMarker = new maplibregl.Marker({
    color: '#3b82f6',
    scale: 1.3
  })
  .setLngLat([currentLocation.lng, currentLocation.lat])
  .setPopup(new maplibregl.Popup().setHTML(`
    <div style="text-align: center; padding: 8px;">
      <strong style="color: #3b82f6;">In Transit</strong><br>
      <span style="font-size: 12px; color: #666;">${currentLocation.address}</span><br>
      <span style="font-size: 11px; color: #999;">${transitSpeed} mph</span>
    </div>
  `))
  .addTo(map);

  // Delivery location marker
  const deliveryMarker = new maplibregl.Marker({
    color: '#059669',
    scale: 1.1
  })
  .setLngLat([deliveryLocation.coordinates.lng, deliveryLocation.coordinates.lat])
  .setPopup(new maplibregl.Popup().setHTML(`
    <div style="text-align: center; padding: 8px;">
      <strong style="color: #059669;">Destination</strong><br>
      <span style="font-size: 12px; color: #666;">${deliveryLocation.name}</span><br>
      <span style="font-size: 11px; color: #999;">${distanceToDelivery} mi remaining</span>
    </div>
  `))
  .addTo(map);

  // Route line to delivery
  map.addSource('transit-route', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [currentLocation.lng, currentLocation.lat],
          [deliveryLocation.coordinates.lng, deliveryLocation.coordinates.lat]
        ]
      }
    }
  });

  map.addLayer({
    'id': 'active-transit-route',
    'type': 'line',
    'source': 'transit-route',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#3b82f6',
      'line-width': 5,
      'line-opacity': 0.8
    }
  });

  // Center map on route
  const bounds = new maplibregl.LngLatBounds();
  bounds.extend([currentLocation.lng, currentLocation.lat]);
  bounds.extend([deliveryLocation.coordinates.lng, deliveryLocation.coordinates.lat]);

  map.fitBounds(bounds, {
    padding: 80,
    maxZoom: 10
  });
} 