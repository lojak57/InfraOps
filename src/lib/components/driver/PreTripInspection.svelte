<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { CheckCircle, AlertTriangle, XCircle, Camera, FileText, Wrench, Cog, Settings, Shield, Truck, Beaker } from 'lucide-svelte';
	
	import type { InspectionItem, InspectionProgress, InspectionState, InspectionData, CategoryGroup } from './pre-trip-inspection/types/inspection.types';
	import { 
		getInitialInspectionItems,
		groupItemsByCategory,
		calculateInspectionProgress,
		updateItemStatus,
		addNotesToItem,
		markPhotoTaken,
		getCategoryIcon,
		getCategoryDescription,
		getCategoryStatus,
		shouldShowPhotoButton
	} from './pre-trip-inspection/utils/inspection-utils';
	
	// Import orchestrator components
	import InspectionHeader from './pre-trip-inspection/InspectionHeader.svelte';

	const dispatch = createEventDispatcher();

	// Initialize inspection state
	let inspectionItems: InspectionItem[] = getInitialInspectionItems();
	let inspectionState: InspectionState = {
		currentDate: new Date(),
		driverName: "Mike Johnson",
		truckId: "892",
		trailerNumber: "445",
		currentStep: 'inspection',
		defectNotes: '',
		generalNotes: '',
		showPhotoModal: false,
		selectedItemForPhoto: null
	};

	// Reactive calculations
	$: groupedItems = groupItemsByCategory(inspectionItems);
	$: progress = calculateInspectionProgress(inspectionItems);

	// Event handlers
	function handleItemStatusUpdate(itemId: string, status: InspectionItem['status']) {
		inspectionItems = updateItemStatus(inspectionItems, itemId, status);
	}

	function handleAddNotes(itemId: string, notes: string) {
		inspectionItems = addNotesToItem(inspectionItems, itemId, notes);
	}

	function handleTakePhoto(item: InspectionItem) {
		inspectionState.selectedItemForPhoto = item;
		inspectionState.showPhotoModal = true;
	}

	function handleCompletePhotoCapture() {
		if (inspectionState.selectedItemForPhoto) {
			inspectionItems = markPhotoTaken(inspectionItems, inspectionState.selectedItemForPhoto.id);
		}
		inspectionState.showPhotoModal = false;
		inspectionState.selectedItemForPhoto = null;
	}

	function handleCompleteInspection() {
		if (progress.canComplete) {
			const inspectionData: InspectionData = {
				date: inspectionState.currentDate,
				driver: inspectionState.driverName,
				truck: inspectionState.truckId,
				trailer: inspectionState.trailerNumber,
				items: inspectionItems,
				status: progress.failedItems > 0 ? 'defects-noted' : 'passed',
				defectNotes: inspectionState.defectNotes,
				generalNotes: inspectionState.generalNotes,
				completedAt: new Date()
			};
			
			dispatch('inspection-complete', { inspectionData });
		}
	}
</script>

<div class="pre-trip-inspection font-sans text-sm text-slate-800">
	<!-- Header with Progress -->
	<InspectionHeader 
		driverName={inspectionState.driverName}
		truckId={inspectionState.truckId}
		trailerNumber={inspectionState.trailerNumber}
		currentDate={inspectionState.currentDate}
		{progress}
	/>

	<!-- Page Break Separator -->
	<div class="page-break-separator border-t-2 border-slate-300 mt-6 pt-6 bg-slate-100">
		<div class="max-w-4xl mx-auto px-4">
			<h2 class="text-lg font-semibold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-3">
				<CheckCircle size={20} class="text-slate-600" />
				Start Inspection
			</h2>
			<p class="text-sm text-slate-600">Complete all vehicle inspection categories below to proceed with your shift</p>
		</div>
	</div>

	<!-- Inspection Form -->
	<div class="inspection-content max-w-4xl mx-auto p-4">
		<div class="inspection-grid grid gap-6">
			{#each Object.entries(groupedItems) as [category, items]}
				<div class="inspection-card rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
					<div class="inspection-card-header flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
						<h3 class="text-base font-semibold text-slate-700 flex items-center gap-2">
							<svelte:component this={getCategoryIcon(category)} size={16} class="text-slate-600" />
							{category} Inspection
						</h3>
						<div class="category-progress flex items-center gap-3 text-xs">
							<span class="bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono font-semibold">
								{items.filter(item => item.status !== 'pending').length}/{items.length}
							</span>
							<span class="text-slate-600 font-medium">
								{getCategoryStatus(items)}
							</span>
						</div>
					</div>
					
					<div class="category-description mb-4 p-3 bg-slate-50 rounded border-l-3 border-blue-300">
						<p class="text-sm text-slate-600 italic">{getCategoryDescription(category)}</p>
					</div>

					<div class="category-items grid grid-cols-2 gap-3">
						{#each items as item}
							<div class="inspection-item bg-white border border-slate-200 rounded p-3 {item.critical ? 'border-l-4 border-l-red-500' : ''}">
								<div class="item-header flex justify-between items-start gap-3 mb-3">
									<div class="item-description flex-1">
										<span class="text-sm text-slate-700 leading-tight block">{item.description}</span>
										{#if item.critical}
											<span class="critical-badge bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full mt-1 inline-block">
												Critical Safety Item
											</span>
										{/if}
									</div>
									<div class="item-actions flex-shrink-0">
										{#if shouldShowPhotoButton(item)}
											<button 
												class="photo-btn border border-blue-300 text-blue-600 bg-blue-50 hover:bg-blue-100 p-1.5 rounded flex items-center gap-1 transition-colors {item.photoTaken ? 'border-green-300 text-green-600 bg-green-50' : ''}"
												on:click={() => handleTakePhoto(item)}
											>
												<Camera size={14} />
												{#if item.photoTaken}
													<span class="text-xs">✓</span>
												{/if}
											</button>
										{/if}
									</div>
								</div>
								
								<div class="status-controls grid grid-cols-3 gap-2">
									<button 
										class="status-btn px-2 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer
										{item.status === 'pass' 
											? 'border-2 border-green-500 text-white bg-green-500 shadow-md transform scale-105' 
											: 'border-2 border-gray-300 text-gray-600 bg-white hover:border-green-400 hover:bg-green-50 hover:text-green-600'}"
										type="button"
										on:click={() => handleItemStatusUpdate(item.id, 'pass')}
									>
										<CheckCircle size={14} />
										<span>Pass</span>
									</button>
									<button 
										class="status-btn px-2 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer
										{item.status === 'fail' 
											? 'border-2 border-red-500 text-white bg-red-500 shadow-md transform scale-105' 
											: 'border-2 border-gray-300 text-gray-600 bg-white hover:border-red-400 hover:bg-red-50 hover:text-red-600'}"
										type="button"
										on:click={() => handleItemStatusUpdate(item.id, 'fail')}
									>
										<XCircle size={14} />
										<span>Fail</span>
									</button>
									<button 
										class="status-btn px-2 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer
										{item.status === 'defect' 
											? 'border-2 border-orange-500 text-white bg-orange-500 shadow-md transform scale-105' 
											: 'border-2 border-gray-300 text-gray-600 bg-white hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600'}"
										type="button"
										on:click={() => handleItemStatusUpdate(item.id, 'defect')}
									>
										<AlertTriangle size={14} />
										<span>Defect</span>
									</button>
								</div>

								{#if item.status === 'fail' || item.status === 'defect'}
									<div class="notes-section mt-3">
										<textarea 
											class="notes-input w-full min-h-[60px] border border-slate-300 rounded p-2 text-sm resize-vertical"
											placeholder="Describe the issue (required for failures/defects)..."
											value={item.notes || ''}
											on:input={(e) => handleAddNotes(item.id, (e.target as HTMLTextAreaElement)?.value || '')}
										></textarea>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- General Notes Section -->
	<div class="general-notes-section max-w-4xl mx-auto m-4 p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
		<div class="notes-header flex items-center gap-2 mb-2">
			<FileText size={20} class="text-slate-600" />
			<h3 class="text-base font-semibold text-slate-800">General Notes</h3>
		</div>
		<div class="notes-description mb-3">
			<p class="text-sm text-slate-600">Add any additional observations, concerns, or maintenance recommendations</p>
		</div>
		<textarea 
			class="general-notes-input w-full min-h-[100px] p-3 border border-slate-300 rounded text-sm leading-relaxed text-slate-700 bg-slate-50 resize-vertical transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
			placeholder="Enter any general observations, maintenance notes, or recommendations..."
			bind:value={inspectionState.generalNotes}
			rows="4"
		></textarea>
	</div>

	<!-- Completion Section -->
	<div class="completion-section max-w-4xl mx-auto p-4 bg-white border-t border-slate-200">
		{#if progress.failedItems > 0}
			<div class="defect-summary mb-4">
				<h3 class="text-base font-semibold text-red-600 mb-2">Defects Summary</h3>
				<textarea 
					class="defect-notes w-full min-h-[80px] p-3 border border-slate-300 rounded text-sm resize-vertical"
					placeholder="Additional notes about defects and corrective actions taken..."
					bind:value={inspectionState.defectNotes}
				></textarea>
			</div>
		{/if}

		<div class="completion-actions flex flex-col gap-3">
			<div class="completion-status flex items-center gap-2 p-3 rounded border">
				{#if progress.criticalFailures > 0}
					<div class="status-warning bg-red-50 border-red-200 text-red-700 flex items-center gap-2">
						<AlertTriangle size={20} />
						<span class="text-sm font-medium">Vehicle cannot operate with critical defects</span>
					</div>
				{:else if progress.failedItems > 0}
					<div class="status-defects bg-yellow-50 border-yellow-200 text-yellow-700 flex items-center gap-2">
						<FileText size={20} />
						<span class="text-sm font-medium">Defects noted - maintenance required</span>
					</div>
				{:else if progress.canComplete}
					<div class="status-ready bg-green-50 border-green-200 text-green-700 flex items-center gap-2">
						<CheckCircle size={20} />
						<span class="text-sm font-medium">Vehicle ready for operation</span>
					</div>
				{:else}
					<div class="status-incomplete bg-slate-50 border-slate-200 text-slate-700 flex items-center gap-2">
						<AlertTriangle size={20} />
						<span class="text-sm font-medium">Complete all inspections to continue</span>
					</div>
				{/if}
			</div>

			<button 
				class="complete-btn w-full p-4 rounded-lg text-base font-semibold border transition-all flex items-center justify-center gap-2 {progress.canComplete ? 'border-green-500 text-green-700 bg-green-50 hover:bg-green-100' : 'border-slate-300 text-slate-400 bg-slate-50 cursor-not-allowed'}"
				disabled={!progress.canComplete}
				on:click={handleCompleteInspection}
			>
				{#if progress.criticalFailures > 0}
					Submit Defect Report
				{:else}
					Complete Inspection
				{/if}
			</button>
		</div>
	</div>
</div>

<!-- Photo Modal -->
{#if inspectionState.showPhotoModal && inspectionState.selectedItemForPhoto}
	<div class="photo-modal-overlay fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
		<div class="photo-modal bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
			<div class="modal-header flex justify-between items-center p-4 border-b border-slate-200">
				<h3 class="text-lg font-semibold text-slate-800">Photo Documentation</h3>
				<button class="close-btn text-slate-600 hover:text-slate-800 text-2xl w-8 h-8 flex items-center justify-center" on:click={() => inspectionState.showPhotoModal = false}>×</button>
			</div>
			<div class="modal-content p-4 flex-1">
				<p class="photo-instruction text-sm text-slate-700 mb-4">Take a photo of: {inspectionState.selectedItemForPhoto.description}</p>
				<div class="camera-placeholder bg-slate-100 border-2 border-dashed border-slate-300 rounded p-8 text-center text-slate-600">
					<Camera size={48} class="mx-auto mb-2" />
					<p>Camera interface would appear here</p>
					<p class="camera-note text-xs text-slate-500 mt-2">(In production: live camera feed)</p>
				</div>
			</div>
			<div class="modal-actions flex gap-3 p-4 border-t border-slate-200">
				<button class="cancel-btn flex-1 border border-slate-300 text-slate-700 bg-slate-50 hover:bg-slate-100 py-3 rounded font-medium transition-colors" on:click={() => inspectionState.showPhotoModal = false}>
					Cancel
				</button>
				<button class="capture-btn flex-1 border border-blue-500 text-blue-700 bg-blue-50 hover:bg-blue-100 py-3 rounded font-medium transition-colors" on:click={handleCompletePhotoCapture}>
					Capture Photo
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	@media (max-width: 768px) {
		.category-items {
			grid-template-columns: 1fr;
		}

		.status-controls {
			grid-template-columns: 1fr;
			gap: 6px;
		}
	}

	@media (max-width: 640px) {
		.inspection-grid {
			gap: 16px;
		}
		
		.inspection-card {
			padding: 16px;
		}
	}

	:global(.status-btn) {
		position: relative;
		z-index: 1;
		min-height: 36px;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	:global(.status-btn:active) {
		transform: scale(0.98) !important;
	}

	:global(.photo-btn) {
		position: relative;
		z-index: 1;
		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}
</style> 