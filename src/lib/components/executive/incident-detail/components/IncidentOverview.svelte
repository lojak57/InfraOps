<script lang="ts">
	import type { Incident } from '../types/incident-detail.types';
	import { 
		getSeverityConfig, 
		getStatusConfig, 
		generateIncidentBadgeText 
	} from '../utils/incident-detail-utils';

	export let incident: Incident;

	$: severityConfig = getSeverityConfig(incident.severity);
	$: statusConfig = getStatusConfig(incident.status);
	$: badgeText = generateIncidentBadgeText(incident.severity, incident.type);
</script>

<div class="incident-overview">
	<div class="overview-header">
		<div 
			class="incident-badge" 
			style="background-color: {severityConfig.backgroundColor}; color: {severityConfig.color}"
		>
			{badgeText}
		</div>
		<div 
			class="incident-status"
			style="background: {statusConfig.background}; color: {statusConfig.color}"
		>
			{incident.status}
		</div>
	</div>
	
	<div class="incident-description">
		<h3>Description</h3>
		<p>{incident.description}</p>
	</div>
</div>

<style>
	.incident-overview {
		margin-bottom: 32px;
	}

	.overview-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
	}

	.incident-badge {
		padding: 8px 16px;
		border-radius: 20px;
		font-weight: 600;
		font-size: 14px;
	}

	.incident-status {
		padding: 6px 12px;
		border-radius: 12px;
		font-weight: 600;
		font-size: 12px;
		text-transform: uppercase;
	}

	.incident-description h3 {
		margin: 0 0 12px 0;
		font-size: 18px;
		font-weight: 600;
		color: #1f2937;
	}

	.incident-description p {
		margin: 0;
		color: #4b5563;
		line-height: 1.6;
		font-size: 16px;
	}
</style> 