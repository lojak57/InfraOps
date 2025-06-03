<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: 1005 lines → @current-size: ~180 lines  
@phase: Phase 1 - Critical Components
@extractors: ComplianceMetrics, ComplianceAlerts, compliance-utils.ts, compliance.types.ts
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Download, Calendar, FileText } from 'lucide-svelte';
	import { documentStats, complianceAlerts, documents, documentActions } from '$lib/stores/documentStore';
	import Chart from '$lib/components/charts/Chart.svelte';
	import ComplianceMetrics from './compliance-dashboard/ComplianceMetrics.svelte';
	import ComplianceAlerts from './compliance-dashboard/ComplianceAlerts.svelte';
	import {
		calculateComplianceStats,
		generateComplianceChartData,
		calculateDocumentTypeDistribution,
		generateDistributionChartData,
		getExpiringDocuments,
		formatDate,
		filterDocumentsByCustomer,
		filterAlertsByCustomer
	} from './compliance-dashboard/utils/compliance-utils.js';
	import type { ComplianceFilters } from './compliance-dashboard/types/compliance.types.js';

	// Props
	export let customerId: string | undefined = undefined;

	// State
	let filters: ComplianceFilters = {
		timeframe: '30d',
		showOnlyExpiring: false,
		customerId
	};

	let currentTime = new Date(1735064220000); // Static timestamp for SSR consistency

	// Update to current time once mounted
	onMount(() => {
		currentTime = new Date();
	});

	// Reactive data filtering and calculations
	$: filteredDocuments = filterDocumentsByCustomer($documents, customerId);
	$: filteredAlerts = filterAlertsByCustomer($complianceAlerts, $documents, customerId);
	$: complianceStats = calculateComplianceStats(filteredDocuments, currentTime);
	$: complianceChartData = generateComplianceChartData(complianceStats);
	$: documentTypeDistribution = calculateDocumentTypeDistribution(filteredDocuments);
	$: distributionChartData = generateDistributionChartData(documentTypeDistribution);

	// Actions
	const actions = {
		acknowledgeAlert: (alertId: string) => {
			documentActions.acknowledgeAlert(alertId);
		},

		exportReport: () => {
			const reportData = {
				generatedAt: currentTime.toISOString(),
				customerId,
				stats: complianceStats,
				alerts: filteredAlerts,
				expiringDocuments: getExpiringDocuments(filteredDocuments, 30, currentTime)
			};
			
			const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `compliance-report-${formatDate(currentTime)}.json`;
			a.click();
			URL.revokeObjectURL(url);
		},

		toggleExpiringFilter: (show: boolean) => {
			filters = { ...filters, showOnlyExpiring: show };
		}
	};
</script>

<div class="compliance-dashboard">
	<!-- Header -->
	<div class="dashboard-header">
		<div class="header-left">
			<h1>Compliance Dashboard</h1>
			<p class="subtitle">Document compliance monitoring and alerts</p>
		</div>
		
		<div class="header-actions">
			<button class="export-btn" on:click={actions.exportReport}>
				<Download size={16} />
				Export Report
			</button>
		</div>
	</div>

	<!-- Compliance Metrics Component -->
	<ComplianceMetrics 
		stats={complianceStats}
		chartData={complianceChartData}
	/>

	<!-- Compliance Alerts Component -->
	<ComplianceAlerts 
		alerts={filteredAlerts}
		showOnlyExpiring={filters.showOnlyExpiring}
		onAcknowledgeAlert={actions.acknowledgeAlert}
		onToggleFilter={actions.toggleExpiringFilter}
	/>

	<!-- Expiry Timeline -->
	<div class="expiry-section">
		<h2>Upcoming Expirations</h2>
		
		<div class="expiry-timeline">
			<div class="timeline-item">
				<div class="timeline-period">Next 7 Days</div>
				<div class="timeline-count critical">{getExpiringDocuments(filteredDocuments, 7, currentTime).length}</div>
			</div>
			
			<div class="timeline-item">
				<div class="timeline-period">Next 30 Days</div>
				<div class="timeline-count warning">{getExpiringDocuments(filteredDocuments, 30, currentTime).length}</div>
			</div>
			
			<div class="timeline-item">
				<div class="timeline-period">Next 90 Days</div>
				<div class="timeline-count info">{getExpiringDocuments(filteredDocuments, 90, currentTime).length}</div>
			</div>
		</div>
		
		{#if getExpiringDocuments(filteredDocuments, 30, currentTime).length > 0}
			<div class="expiring-documents">
				<h3>Documents Expiring in 30 Days</h3>
				<div class="expiring-list">
					{#each getExpiringDocuments(filteredDocuments, 30, currentTime) as doc}
						<div class="expiring-item">
							<FileText class="doc-icon" size={16} />
							<div class="doc-info">
								<span class="doc-name">{doc.fileName}</span>
								<span class="doc-type">{doc.type}</span>
							</div>
							<div class="doc-expiry">
								<Calendar size={14} />
								<span>{formatDate(doc.expiryDate!)}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- Document Type Distribution -->
	<div class="distribution-section">
		<h2>Document Type Distribution</h2>
		
		<div class="distribution-chart">
			<Chart 
				type="bar" 
				data={distributionChartData}
				height={300}
				options={{
					indexAxis: 'y',
					plugins: {
						legend: {
							display: false
						}
					},
					scales: {
						x: {
							beginAtZero: true,
							ticks: {
								stepSize: 1
							}
						}
					}
				}}
			/>
		</div>
	</div>
</div>

<style>
	.compliance-dashboard {
		padding: 1.5rem;
		max-width: 1400px;
		margin: 0 auto;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
		min-height: 100vh;
	}

	.dashboard-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 1.25rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
	}

	.header-left h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: #1a1a1a;
		margin: 0 0 0.5rem 0;
	}

	.subtitle {
		color: #6b7280;
		margin: 0;
		font-size: 0.875rem;
	}

	.export-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: #004E89;
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.export-btn:hover {
		background: #003d6b;
		transform: translateY(-1px);
	}

	.expiry-section {
		margin-bottom: 2rem;
	}

	.expiry-section h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0 0 1.5rem 0;
	}

	.expiry-timeline {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.25rem;
		margin-bottom: 2rem;
	}

	.timeline-item {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 1rem;
		padding: 1.5rem;
		text-align: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		transition: all 0.2s ease;
	}

	.timeline-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}

	.timeline-period {
		font-size: 0.875rem;
		color: #6b7280;
		margin-bottom: 0.75rem;
		font-weight: 500;
	}

	.timeline-count {
		font-size: 2rem;
		font-weight: 700;
		margin: 0;
	}

	.timeline-count.critical { color: #ef4444; }
	.timeline-count.warning { color: #f97316; }
	.timeline-count.info { color: #3b82f6; }

	.expiring-documents h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0 0 1.25rem 0;
	}

	.expiring-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.expiring-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.25rem;
		background: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(10px);
		border-radius: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		transition: all 0.2s ease;
	}

	.expiring-item:hover {
		background: rgba(255, 255, 255, 0.5);
		transform: translateY(-1px);
	}

	.doc-icon {
		color: #004E89;
		margin-right: 0.75rem;
	}

	.doc-info {
		flex: 1;
	}

	.doc-name {
		display: block;
		font-weight: 500;
		color: #1a1a1a;
		margin-bottom: 0.25rem;
	}

	.doc-type {
		display: block;
		font-size: 0.75rem;
		color: #6b7280;
	}

	.doc-expiry {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		color: #6b7280;
	}

	.distribution-section {
		margin-bottom: 2rem;
	}

	.distribution-section h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0 0 1.5rem 0;
	}

	.distribution-chart {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 1.25rem;
		padding: 2rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.compliance-dashboard {
			padding: 1rem;
		}
		
		.dashboard-header {
			flex-direction: column;
			gap: 1rem;
			align-items: stretch;
			text-align: center;
		}
		
		.expiry-timeline {
			grid-template-columns: 1fr;
		}
		
		.timeline-count {
			font-size: 1.5rem;
		}
	}
</style> 