<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Incident, IncidentType } from '../types/incident-detail.types';
	import { 
		getOtherIncidents, 
		formatIncidentListItem, 
		capitalizeIncidentType 
	} from '../utils/incident-detail-utils';

	export let incidents: Incident[];
	export let incidentType: IncidentType;

	const dispatch = createEventDispatcher<{
		'incident-selected': { incident: Incident };
	}>();

	$: otherIncidents = getOtherIncidents(incidents);
	$: formattedIncidents = otherIncidents.map(formatIncidentListItem);
	$: sectionTitle = `Other ${capitalizeIncidentType(incidentType)} Incidents`;

	function handleIncidentClick(incident: Incident) {
		dispatch('incident-selected', { incident });
	}
</script>

{#if otherIncidents.length > 0}
	<div class="other-incidents">
		<h3>{sectionTitle}</h3>
		<div class="incident-list">
			{#each otherIncidents as incident, index}
				<div 
					class="incident-item"
					on:click={() => handleIncidentClick(incident)}
					role="button"
					tabindex="0"
					on:keydown={(e) => e.key === 'Enter' && handleIncidentClick(incident)}
				>
					<div class="incident-header">
						<span class="incident-id">{incident.id}</span>
						<span class="incident-date">{formattedIncidents[index].date}</span>
					</div>
					<div class="incident-summary">
						{incident.type} - {formattedIncidents[index].summary}
					</div>
					<div class="incident-location">{incident.location}</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.other-incidents h3 {
		margin: 0 0 20px 0;
		font-size: 18px;
		font-weight: 600;
		color: #1f2937;
	}

	.incident-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.incident-item {
		background: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 12px;
		padding: 16px;
		transition: all 0.2s ease;
		cursor: pointer;
	}

	.incident-item:hover {
		background: #f3f4f6;
		border-color: #d1d5db;
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.incident-item:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.incident-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
	}

	.incident-id {
		font-family: 'JetBrains Mono', monospace;
		font-weight: 600;
		color: #3b82f6;
		font-size: 12px;
	}

	.incident-date {
		font-size: 12px;
		color: #6b7280;
	}

	.incident-summary {
		color: #374151;
		font-size: 14px;
		margin-bottom: 4px;
		font-weight: 500;
	}

	.incident-location {
		color: #6b7280;
		font-size: 12px;
	}
</style> 