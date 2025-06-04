<script lang="ts">
	import { Shield } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { mockSafetyAnalyticsData } from './safety-analytics-data';
	import SafetyScoreHeader from './SafetyScoreHeader.svelte';
	import SafetyMetricsGrid from './SafetyMetricsGrid.svelte';
	import SafetyIncidentAnalysis from './SafetyIncidentAnalysis.svelte';
	import SafetyRegionalPerformance from './SafetyRegionalPerformance.svelte';
	import SafetyComplianceDashboard from './SafetyComplianceDashboard.svelte';
	import IncidentDetailModal from './IncidentDetailModal.svelte';
	
	export let isOpen = false;
	
	const dispatch = createEventDispatcher();
	
	// Incident detail modal state
	let showIncidentModal = false;
	let selectedIncidentType = 'minor';

	function closeModal() {
		isOpen = false;
		dispatch('close');
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	}

	function handleOpenIncidentDetails(event: CustomEvent<{ type: string }>) {
		selectedIncidentType = event.detail.type;
		showIncidentModal = true;
	}
</script>

{#if isOpen}
	<div class="modal-backdrop" on:click={handleBackdropClick}>
		<div class="modal-container">
			<!-- Header -->
			<div class="modal-header">
				<div class="header-left">
					<div class="header-icon">
						<Shield size={32} />
					</div>
					<div class="header-text">
						<h1 class="text-xl font-semibold">Safety Analytics Deep Dive</h1>
						<p class="text-sm">Comprehensive breakdown of your {mockSafetyAnalyticsData.overallScore}% safety score</p>
					</div>
				</div>
				<button class="close-btn" on:click={closeModal}>×</button>
			</div>

			<!-- Content -->
			<div class="modal-content">
				<SafetyScoreHeader 
					overallScore={mockSafetyAnalyticsData.overallScore}
					scoreComposition={mockSafetyAnalyticsData.scoreComposition}
				/>
				
				<SafetyMetricsGrid breakdown={mockSafetyAnalyticsData.breakdown} />
				
				<SafetyIncidentAnalysis 
					incidents={mockSafetyAnalyticsData.breakdown.incidents}
					on:openIncidentDetails={handleOpenIncidentDetails}
				/>
				
				<SafetyRegionalPerformance regional={mockSafetyAnalyticsData.regional} />
				
				<SafetyComplianceDashboard compliance={mockSafetyAnalyticsData.breakdown.compliance} />
			</div>
		</div>
	</div>
{/if}

<!-- Incident Detail Modal -->
<IncidentDetailModal 
	isOpen={showIncidentModal} 
	incidentType={selectedIncidentType}
	on:close={() => showIncidentModal = false}
/>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 20px;
	}

	.modal-container {
		background: white;
		border-radius: 24px;
		max-width: 1200px;
		width: 100%;
		max-height: 90vh;
		overflow: hidden;
		box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
		display: flex;
		flex-direction: column;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px 32px;
		background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
		color: white;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.header-icon {
		width: 48px;
		height: 48px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.header-text h1 {
		margin: 0 0 4px 0;
		color: white;
	}

	.header-text p {
		margin: 0;
		opacity: 0.9;
		color: white;
	}

	.close-btn {
		width: 40px;
		height: 40px;
		border: none;
		background: rgba(255, 255, 255, 0.2);
		color: white;
		border-radius: 8px;
		font-size: 24px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.modal-content {
		flex: 1;
		overflow-y: auto;
		padding: 32px;
	}

	@media (max-width: 768px) {
		.modal-backdrop {
			padding: 10px;
		}

		.modal-header {
			padding: 20px;
		}

		.modal-content {
			padding: 20px;
		}
	}
</style> 