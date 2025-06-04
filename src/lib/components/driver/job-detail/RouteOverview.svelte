<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 1042-line component → @current-size: ~120 lines  
@phase: Phase 1 - Critical Components
@extractors: RouteOverview from JobDetailModal.svelte
-->
<script lang="ts">
	import { MapPin, Truck } from 'lucide-svelte';
	import { formatTime, formatDuration } from './utils/job-calculations.js';
	import type { ScheduledJob, Location } from './types/job-detail.types.js';
	
	// Props
	export let job: ScheduledJob;
	export let currentLocation: Location;
	export let distanceToPickup: number;
	export let estimatedTravelTime: number;
</script>

<!-- Route Overview -->
<div class="route-overview">
	<h4 class="section-title">Route Overview</h4>
	
	<!-- Current Location -->
	<div class="location-card current">
		<div class="location-icon current-icon">
			<Truck size={18} />
		</div>
		<div class="location-details">
			<span class="location-name">Current Location</span>
			<span class="location-address">{currentLocation.address}</span>
		</div>
		<div class="location-meta">
			<span class="distance-badge">Start</span>
		</div>
	</div>

	<!-- Travel to Pickup -->
	<div class="route-segment">
		<div class="segment-line"></div>
		<div class="segment-info">
			<span class="segment-distance">{distanceToPickup.toFixed(1)} mi</span>
			<span class="segment-time">{estimatedTravelTime} min</span>
		</div>
	</div>

	<!-- Pickup Location -->
	<div class="location-card pickup">
		<div class="location-icon pickup-icon">
			<MapPin size={18} />
		</div>
		<div class="location-details">
			<span class="location-name">{job.pickupLocation.name}</span>
			<span class="location-subtitle">{job.pickupLocation.padName} • {job.pickupLocation.tankNumber}</span>
			<span class="location-address">{job.pickupLocation.address}</span>
		</div>
		<div class="location-meta">
			<span class="time-badge">{formatTime(job.scheduledTime)}</span>
		</div>
	</div>

	<!-- Transport Segment -->
	<div class="route-segment">
		<div class="segment-line"></div>
		<div class="segment-info">
			<span class="segment-distance">{job.distance} mi</span>
			<span class="segment-time">{formatDuration(job.estimatedDuration)}</span>
		</div>
	</div>

	<!-- Delivery Location -->
	<div class="location-card delivery">
		<div class="location-icon delivery-icon">
			<MapPin size={18} />
		</div>
		<div class="location-details">
			<span class="location-name">{job.deliveryLocation.name}</span>
			<span class="location-address">{job.deliveryLocation.address}</span>
		</div>
		<div class="location-meta">
			<span class="distance-badge">{job.estimatedUnits} units</span>
		</div>
	</div>
</div>

<style>
	.route-overview {
		padding: 1.5rem;
		border-bottom: 1px solid #f1f5f9;
	}

	.section-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 1rem;
	}

	.location-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border-radius: 0.75rem;
		border: 1px solid #e2e8f0;
		background: white;
		margin-bottom: 0.5rem;
	}

	.location-card.current {
		background: #f0f9ff;
		border-color: #3b82f6;
	}

	.location-card.pickup {
		background: #fef7f0;
		border-color: #f59e0b;
	}

	.location-card.delivery {
		background: #f0fdf4;
		border-color: #22c55e;
	}

	.location-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.current-icon {
		background: #3b82f6;
		color: white;
	}

	.pickup-icon {
		background: #f59e0b;
		color: white;
	}

	.delivery-icon {
		background: #22c55e;
		color: white;
	}

	.location-details {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.location-name {
		font-size: 0.875rem;
		font-weight: 600;
		color: #1e293b;
	}

	.location-subtitle {
		font-size: 0.75rem;
		font-weight: 500;
		color: #64748b;
	}

	.location-address {
		font-size: 0.75rem;
		color: #64748b;
	}

	.location-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.25rem;
	}

	.distance-badge,
	.time-badge {
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
		background: #f1f5f9;
		color: #475569;
	}

	.route-segment {
		position: relative;
		display: flex;
		justify-content: center;
		margin: 0.5rem 0;
	}

	.segment-line {
		width: 2px;
		height: 1.5rem;
		background: linear-gradient(to bottom, #d1d5db, #9ca3af);
		border-radius: 1px;
	}

	.segment-info {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.125rem;
		font-size: 0.75rem;
		color: #64748b;
	}

	.segment-distance {
		font-weight: 600;
	}

	.segment-time {
		font-weight: 500;
	}
</style> 