<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 613-line component → @current-size: ~110 lines  
@phase: Phase 6 - Driver Components
@extractors: RouteDisplay from JobCard.svelte
-->
<script lang="ts">
	import { MapPin, Gauge } from 'lucide-svelte';
	import { truncateLocationName, getLoadTypeBadgeText } from '../utils/job-card-utils.js';
	import type { ScheduledJob } from '../types/job-card.types.js';
	
	export let job: ScheduledJob;
</script>

<div class="route-display">
	<!-- Account and Load Type -->
	<div class="job-header">
		<div class="account-name">{job.accountName}</div>
		<div class="load-type-badge {job.loadType}">
			{getLoadTypeBadgeText(job.loadType)}
		</div>
	</div>

	<!-- Route line -->
	<div class="route-line">
		<!-- Pickup location -->
		<div class="location pickup">
			<div class="location-icon pickup-icon">
				<Gauge size={12} />
			</div>
			<div class="location-text">
				<div class="location-name">{truncateLocationName(job.pickupLocation.name)}</div>
			</div>
		</div>

		<!-- Route arrow with distance -->
		<div class="route-connector">
			<div class="route-arrow">→</div>
			<div class="distance-info">{job.distance}mi</div>
		</div>

		<!-- Delivery location -->
		<div class="location delivery">
			<div class="location-icon delivery-icon">
				<MapPin size={12} />
			</div>
			<div class="location-text">
				<div class="location-name">{truncateLocationName(job.deliveryLocation.name)}</div>
			</div>
		</div>
	</div>
</div>

<style>
	.route-display {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.job-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		margin: 0;
	}

	.account-name {
		min-width: 0;
		font-size: 15px;
		font-weight: 700;
		color: #0f172a;
		flex: 1;
		line-height: 1.2;
		margin: 0;
	}

	.load-type-badge {
		font-size: 9px;
		font-weight: 700;
		padding: 3px 6px;
		border-radius: 4px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		white-space: nowrap;
		flex-shrink: 0;
		margin: 0;
		background: #f1f5f9;
		color: #475569;
		border: 1px solid #e2e8f0;
	}

	.route-line {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
	}

	.location {
		display: flex;
		align-items: center;
		gap: 8px;
		flex: 1;
		min-width: 0;
	}

	.location-icon {
		width: 24px;
		height: 24px;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		flex-shrink: 0;
		background: #6b7280;
	}

	.location-text {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 1px;
		overflow: hidden;
	}

	.location-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 600;
		color: #0f172a;
		font-size: 13px;
		line-height: 1.2;
	}

	.route-connector {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		flex-shrink: 0;
		margin: 0 4px;
	}

	.route-arrow {
		font-size: 16px;
		color: #64748b;
		font-weight: bold;
	}

	.distance-info {
		font-size: 9px;
		color: #64748b;
		font-weight: 600;
		font-family: 'JetBrains Mono', monospace;
		background: #f1f5f9;
		padding: 1px 4px;
		border-radius: 3px;
		white-space: nowrap;
	}

	/* Mobile Responsive */
	@media (max-width: 640px) {
		.job-header {
			flex-direction: column;
			gap: 8px;
			align-items: flex-start;
		}

		.route-line {
			gap: 8px;
		}

		.location-name {
			font-size: 12px;
		}

		.distance-info {
			font-size: 9px;
		}

		.account-name {
			font-size: 13px;
		}

		.load-type-badge {
			font-size: 8px;
		}

		.location-icon {
			width: 20px;
			height: 20px;
		}
	}
</style> 