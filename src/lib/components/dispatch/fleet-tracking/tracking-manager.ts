import { simulateAssetMovement } from './utils/fleet-utils.js';
import type { FleetAsset } from './types/fleet-tracking.types.js';

export class TrackingManager {
	private updateInterval: number | null = null;
	private assets: FleetAsset[] = [];
	private onUpdate?: (assets: FleetAsset[]) => void;

	constructor(
		initialAssets: FleetAsset[],
		onUpdateCallback?: (assets: FleetAsset[]) => void
	) {
		this.assets = initialAssets;
		this.onUpdate = onUpdateCallback;
	}

	startRealtimeTracking(intervalMs: number = 10000): void {
		this.stopRealtimeTracking(); // Clear any existing interval

		this.updateInterval = setInterval(() => {
			this.assets = this.assets.map(simulateAssetMovement);
			if (this.onUpdate) {
				this.onUpdate(this.assets);
			}
		}, intervalMs);
	}

	stopRealtimeTracking(): void {
		if (this.updateInterval) {
			clearInterval(this.updateInterval);
			this.updateInterval = null;
		}
	}

	updateAssets(newAssets: FleetAsset[]): void {
		this.assets = newAssets;
	}

	getAssets(): FleetAsset[] {
		return this.assets;
	}

	destroy(): void {
		this.stopRealtimeTracking();
		this.assets = [];
		this.onUpdate = undefined;
	}

	get isTracking(): boolean {
		return this.updateInterval !== null;
	}
} 