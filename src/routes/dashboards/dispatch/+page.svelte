<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 875 lines → @current-size: ~120 lines  
@phase: Phase 5 - MONSTER TARGET OBLITERATION
@extractors: DispatchHeader, PendingAssignments, AvailableDrivers, ActiveRoutes, FleetStatus, OutOfService, DispatchMap, DriverAssignmentModal, dispatch-page-utils.ts, dispatch-page.types.ts
-->
<script lang="ts">
	import { onMount } from 'svelte';

	// Import orchestrator components
	import DispatchHeader from './components/DispatchHeader.svelte';
	import PendingAssignments from './components/PendingAssignments.svelte';
	import AvailableDrivers from './components/AvailableDrivers.svelte';
	import ActiveRoutes from './components/ActiveRoutes.svelte';
	import FleetStatus from './components/FleetStatus.svelte';
	import OutOfService from './components/OutOfService.svelte';
	import DispatchMap from './components/DispatchMap.svelte';
	import DriverAssignmentModal from './components/DriverAssignmentModal.svelte';

	// Import business logic and types
	import type { Driver, UnavailableDriver, Route, Assignment, TruckStatus, SectionStates, DispatchState } from './types/dispatch-page.types';
	import {
		generateAvailableDrivers,
		generateUnavailableDrivers,
		generateActiveRoutes,
		generatePendingAssignments,
		generateTruckStatus,
		getInitialSectionStates,
		removeFromPendingAssignments,
		createNewRoute,
		addToActiveRoutes,
		removeFromAvailableDrivers,
		findDriverById,
		updateSectionState,
		shouldAutoOpenPendingAssignments
	} from './utils/dispatch-page-utils';

	// Initialize data using utils
	let availableDrivers: Driver[] = generateAvailableDrivers();
	let unavailableDrivers: UnavailableDriver[] = generateUnavailableDrivers();
	let activeRoutes: Route[] = generateActiveRoutes();
	let pendingAssignments: Assignment[] = generatePendingAssignments();
	let truckStatus: TruckStatus = generateTruckStatus();
	let sectionStates: SectionStates = getInitialSectionStates();

	// Modal state
	let showAssignmentModal = false;
	let selectedAssignment: Assignment | null = null;
	let selectedDriver = '';
	let showFullscreenMap = false;

	// Reactive values
	$: pendingCount = pendingAssignments.length;
	$: sectionStates = shouldAutoOpenPendingAssignments(pendingCount, sectionStates);

	// Event handlers
	function handleSectionToggle(sectionKey: string, event: CustomEvent) {
		sectionStates = updateSectionState(sectionStates, sectionKey, event.detail.isOpen);
	}

	function handleOpenAssignment(event: CustomEvent) {
		selectedAssignment = event.detail.assignment;
		showAssignmentModal = true;
	}

	function handleAssignDriver() {
		if (selectedDriver && selectedAssignment) {
			// Remove from pending
			pendingAssignments = removeFromPendingAssignments(pendingAssignments, selectedAssignment.id);
			
			// Find driver and create route
			const driver = findDriverById(availableDrivers, selectedDriver);
			if (driver) {
				const newRoute = createNewRoute(driver, selectedAssignment);
				activeRoutes = addToActiveRoutes(activeRoutes, newRoute);
				availableDrivers = removeFromAvailableDrivers(availableDrivers, selectedDriver);
			}
		}
		
		// Reset modal state
		showAssignmentModal = false;
		selectedAssignment = null;
		selectedDriver = '';
	}

	function handleCancelAssignment() {
		showAssignmentModal = false;
		selectedAssignment = null;
		selectedDriver = '';
	}

	function handleDriverSelectionChange(event: CustomEvent) {
		selectedDriver = event.detail.driverId;
	}

	function handleEmergencyContact() {
		// In production: Handle emergency contact logic
		console.log('Emergency contact triggered');
	}

	// Initialize on mount
	onMount(() => {
		pendingCount = pendingAssignments.length;
	});
</script>

<svelte:head>
	<title>Dispatch Center - Logistics Temp Tracker</title>
</svelte:head>

<div class="dispatch-center">
	<!-- Header -->
	<DispatchHeader on:emergency-contact={handleEmergencyContact} />

	<!-- Main Content: Two-Pane Layout -->
	<div class="dispatch-layout">
		<!-- Left Pane: Dispatch Snapshot -->
		<div class="dispatch-snapshot">
			<PendingAssignments 
				{pendingAssignments} 
				isOpen={sectionStates.pendingAssignments}
				on:toggle-section={(e) => handleSectionToggle('pendingAssignments', e)}
				on:open-assignment={handleOpenAssignment}
			/>

			<AvailableDrivers 
				{availableDrivers} 
				isOpen={sectionStates.availableDrivers}
				on:toggle-section={(e) => handleSectionToggle('availableDrivers', e)}
			/>

			<ActiveRoutes 
				{activeRoutes} 
				isOpen={sectionStates.activeRoutes}
				on:toggle-section={(e) => handleSectionToggle('activeRoutes', e)}
			/>

			<FleetStatus 
				{truckStatus} 
				isOpen={sectionStates.fleetStatus}
				on:toggle-section={(e) => handleSectionToggle('fleetStatus', e)}
			/>

			<OutOfService 
				{unavailableDrivers} 
				isOpen={sectionStates.outOfService}
				on:toggle-section={(e) => handleSectionToggle('outOfService', e)}
			/>
		</div>

		<!-- Right Pane: Interactive Map -->
		<DispatchMap 
			bind:showFullscreen={showFullscreenMap}
			autoUpdate={true}
		/>
	</div>

	<!-- Driver Assignment Modal -->
	<DriverAssignmentModal 
		isOpen={showAssignmentModal}
		{selectedAssignment}
		{availableDrivers}
		bind:selectedDriver
		on:assign-driver={handleAssignDriver}
		on:cancel-assignment={handleCancelAssignment}
		on:driver-selection-change={handleDriverSelectionChange}
	/>
</div>

<style>
	.dispatch-center {
		min-height: 100vh;
		background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%);
		display: flex;
		flex-direction: column;
	}

	.dispatch-layout {
		display: flex;
		flex: 1;
		gap: 20px;
		padding: 0 20px 20px 20px;
		overflow: hidden;
	}

	.dispatch-snapshot {
		width: 400px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		overflow-y: auto;
		max-height: calc(100vh - 140px);
	}

	/* Mobile Responsiveness */
	@media (max-width: 1024px) {
		.dispatch-layout {
			flex-direction: column;
		}

		.dispatch-snapshot {
			width: 100%;
			max-height: 400px;
		}
	}

	@media (max-width: 768px) {
		.dispatch-center {
			padding: 0;
		}

		.dispatch-layout {
			padding: 0 12px 12px 12px;
		}
	}
</style> 