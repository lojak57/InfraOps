<script lang="ts">
	import { Calendar, MapPin, User, Truck } from 'lucide-svelte';
	import type { Incident } from '../types/incident-detail.types';
	import { 
		formatIncidentDate, 
		extractPersonnelInfo, 
		extractVehicleInfo 
	} from '../utils/incident-detail-utils';

	export let incident: Incident;

	$: dateTimeInfo = formatIncidentDate(incident.date);
	$: personnelInfo = extractPersonnelInfo(incident);
	$: vehicleInfo = extractVehicleInfo(incident);
</script>

<div class="details-grid">
	<!-- Date & Time Section -->
	<div class="detail-section">
		<h3><Calendar size={18} /> Date & Time</h3>
		<div class="detail-content">
			<div class="detail-item">
				<span class="label">Date:</span>
				<span class="value">{dateTimeInfo.formattedDate}</span>
			</div>
			<div class="detail-item">
				<span class="label">Time:</span>
				<span class="value">{incident.time}</span>
			</div>
		</div>
	</div>

	<!-- Location Section -->
	<div class="detail-section">
		<h3><MapPin size={18} /> Location</h3>
		<div class="detail-content">
			<div class="detail-item">
				<span class="value">{incident.location}</span>
			</div>
		</div>
	</div>

	<!-- Personnel Section -->
	<div class="detail-section">
		<h3><User size={18} /> Personnel</h3>
		<div class="detail-content">
			<div class="detail-item">
				<span class="label">Driver:</span>
				<span class="value">{personnelInfo.driver}</span>
			</div>
			<div class="detail-item">
				<span class="label">Contact:</span>
				<span class="value phone">{personnelInfo.driverPhone}</span>
			</div>
			<div class="detail-item">
				<span class="label">Reported by:</span>
				<span class="value">{personnelInfo.reportedBy}</span>
			</div>
		</div>
	</div>

	<!-- Vehicle Section -->
	<div class="detail-section">
		<h3><Truck size={18} /> Vehicle</h3>
		<div class="detail-content">
			<div class="detail-item">
				<span class="label">Truck ID:</span>
				<span class="value truck-id">{vehicleInfo.truckId}</span>
			</div>
		</div>
	</div>
</div>

<style>
	.details-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 24px;
		margin-bottom: 32px;
	}

	.detail-section {
		background: #f9fafb;
		border-radius: 16px;
		padding: 20px;
		border: 1px solid #e5e7eb;
	}

	.detail-section h3 {
		margin: 0 0 16px 0;
		font-size: 16px;
		font-weight: 600;
		color: #374151;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.detail-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.detail-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.detail-item .label {
		font-weight: 500;
		color: #6b7280;
		font-size: 14px;
	}

	.detail-item .value {
		font-weight: 600;
		color: #1f2937;
		font-size: 14px;
	}

	.value.phone {
		color: #3b82f6;
		font-family: 'JetBrains Mono', monospace;
	}

	.value.truck-id {
		background: #3b82f620;
		color: #3b82f6;
		padding: 4px 8px;
		border-radius: 6px;
		font-family: 'JetBrains Mono', monospace;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.details-grid {
			grid-template-columns: 1fr;
		}
	}
</style> 