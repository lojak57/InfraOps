<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 619 lines → @current-size: ~120 lines  
@phase: Phase 5 - HEAVYWEIGHT TARGET OBLITERATION
@extractors: IncidentModalHeader, IncidentOverview, IncidentDetailsGrid, IncidentAnalysis, IncidentImpact, OtherIncidentsList, incident-detail-utils.ts, incident-detail.types.ts
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// Import orchestrator components
	import IncidentModalHeader from './incident-detail/components/IncidentModalHeader.svelte';
	import IncidentOverview from './incident-detail/components/IncidentOverview.svelte';
	import IncidentDetailsGrid from './incident-detail/components/IncidentDetailsGrid.svelte';
	import IncidentAnalysis from './incident-detail/components/IncidentAnalysis.svelte';
	import IncidentImpact from './incident-detail/components/IncidentImpact.svelte';
	import OtherIncidentsList from './incident-detail/components/OtherIncidentsList.svelte';

	// Import business logic and types
	import type { IncidentType, Incident } from './incident-detail/types/incident-detail.types';
	import {
		generateIncidentData,
		getIncidentsByType,
		getSelectedIncident,
		handleBackdropClick,
		shouldShowOtherIncidents,
		isValidIncident
	} from './incident-detail/utils/incident-detail-utils';

	// Props
	export let isOpen = false;
	export let incidentType: IncidentType = 'minor';

	const dispatch = createEventDispatcher<{
		close: void;
		'incident-selected': { incident: Incident };
	}>();

	// Initialize data using utilities
	const incidentData = generateIncidentData();

	// Reactive calculations
	$: incidents = getIncidentsByType(incidentData, incidentType);
	$: selectedIncident = getSelectedIncident(incidents);

	// Event handlers
	function handleClose() {
		isOpen = false;
		dispatch('close');
	}

	function handleBackdropClickEvent(event: MouseEvent) {
		handleBackdropClick(event, handleClose);
	}

	function handleIncidentSelected(event: CustomEvent<{ incident: Incident }>) {
		dispatch('incident-selected', event.detail);
	}
</script>

{#if isOpen && selectedIncident && isValidIncident(selectedIncident)}
	<div class="modal-backdrop" on:click={handleBackdropClickEvent}>
		<div class="modal-container">
			<!-- Header -->
			<IncidentModalHeader 
				incident={selectedIncident}
				on:close={handleClose}
			/>

			<!-- Content -->
			<div class="modal-content">
				<!-- Incident Overview -->
				<IncidentOverview incident={selectedIncident} />

				<!-- Details Grid -->
				<IncidentDetailsGrid incident={selectedIncident} />

				<!-- Analysis Section -->
				<IncidentAnalysis incident={selectedIncident} />

				<!-- Impact Metrics -->
				<IncidentImpact incident={selectedIncident} />

				<!-- Additional Incidents -->
				{#if shouldShowOtherIncidents(incidents)}
					<OtherIncidentsList 
						{incidents}
						{incidentType}
						on:incident-selected={handleIncidentSelected}
					/>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(6px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2000;
		padding: 20px;
	}

	.modal-container {
		background: white;
		border-radius: 24px;
		max-width: 900px;
		width: 100%;
		max-height: 95vh;
		overflow: hidden;
		box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
		display: flex;
		flex-direction: column;
	}

	.modal-content {
		flex: 1;
		overflow-y: auto;
		padding: 32px;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.modal-backdrop {
			padding: 10px;
		}

		.modal-content {
			padding: 20px;
		}
	}
</style> 