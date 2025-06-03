<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 1005-line component → @current-size: ~150 lines  
@phase: Phase 1 - Critical Components
@extractors: ComplianceAlerts from ComplianceDashboard.svelte
-->
<script lang="ts">
	import { AlertTriangle, CheckCircle, Clock, XCircle, FileText } from 'lucide-svelte';
	import { getAlertColor, formatDate } from '../utils/compliance-utils.js';
	import type { ComplianceAlert } from '../types/compliance.types.js';
	
	// Props
	export let alerts: ComplianceAlert[];
	export let showOnlyExpiring: boolean = false;
	export let onAcknowledgeAlert: (alertId: string) => void;
	export let onToggleFilter: (show: boolean) => void;
	
	// Get alert icon based on type
	function getAlertIcon(type: ComplianceAlert['type']) {
		switch (type) {
			case 'expired': return XCircle;
			case 'expiring': return AlertTriangle;
			case 'missing': return FileText;
			case 'invalid': return XCircle;
			default: return AlertTriangle;
		}
	}
	
	// Filter alerts based on user preference
	$: filteredAlerts = showOnlyExpiring 
		? alerts.filter(alert => alert.type === 'expiring')
		: alerts;
</script>

<!-- Alerts Section -->
<div class="alerts-section">
	<div class="section-header">
		<h2>Compliance Alerts</h2>
		<div class="alert-filters">
			<label class="filter-checkbox">
				<input 
					type="checkbox" 
					checked={showOnlyExpiring}
					on:change={(e) => onToggleFilter(e.currentTarget.checked)}
				/>
				Show only expiring documents
			</label>
		</div>
	</div>
	
	{#if filteredAlerts.length === 0}
		<div class="no-alerts">
			<CheckCircle class="no-alerts-icon" size={48} />
			<h3>All Clear!</h3>
			<p>No compliance alerts at this time</p>
		</div>
	{:else}
		<div class="alerts-list">
			{#each filteredAlerts as alert}
				<div class="alert-card {getAlertColor(alert.severity)}">
					<div class="alert-header">
						<div class="alert-icon">
							<svelte:component this={getAlertIcon(alert.type)} size={20} />
						</div>
						
						<div class="alert-content">
							<h4 class="alert-title">{alert.message}</h4>
							<p class="alert-action">{alert.actionRequired}</p>
							
							<div class="alert-meta">
								<span class="alert-severity">{alert.severity.toUpperCase()}</span>
								{#if alert.daysUntilExpiry !== undefined}
									<span class="alert-days">{alert.daysUntilExpiry} days remaining</span>
								{/if}
								<span class="alert-date">{formatDate(alert.createdAt)}</span>
							</div>
						</div>
						
						<div class="alert-actions">
							<button 
								class="acknowledge-btn"
								on:click={() => onAcknowledgeAlert(alert.id)}
								disabled={alert.acknowledged}
							>
								{alert.acknowledged ? 'Acknowledged' : 'Acknowledge'}
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.alerts-section {
		margin-bottom: 2rem;
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.section-header h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0;
	}

	.alert-filters {
		display: flex;
		gap: 1rem;
	}

	.filter-checkbox {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: #6b7280;
		cursor: pointer;
	}

	.filter-checkbox input {
		cursor: pointer;
	}

	.no-alerts {
		text-align: center;
		padding: 3rem 2rem;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border-radius: 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.no-alerts-icon {
		color: #10b981;
		margin-bottom: 1rem;
	}

	.no-alerts h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0 0 0.5rem 0;
	}

	.no-alerts p {
		color: #6b7280;
		margin: 0;
	}

	.alerts-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.alert-card {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border-radius: 1rem;
		padding: 1.5rem;
		border: 1px solid;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		transition: all 0.2s ease;
	}

	.alert-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}

	.alert-header {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.alert-icon {
		flex-shrink: 0;
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		background: rgba(255, 255, 255, 0.2);
	}

	.alert-content {
		flex: 1;
	}

	.alert-title {
		font-size: 1rem;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0 0 0.5rem 0;
		line-height: 1.4;
	}

	.alert-action {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0 0 1rem 0;
		line-height: 1.4;
	}

	.alert-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		font-size: 0.75rem;
	}

	.alert-severity {
		background: rgba(0, 0, 0, 0.1);
		color: #1a1a1a;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-weight: 600;
		letter-spacing: 0.025em;
	}

	.alert-days {
		color: #f97316;
		font-weight: 600;
	}

	.alert-date {
		color: #6b7280;
	}

	.alert-actions {
		flex-shrink: 0;
	}

	.acknowledge-btn {
		padding: 0.5rem 1rem;
		background: #004E89;
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.acknowledge-btn:hover:not(:disabled) {
		background: #003d6b;
		transform: translateY(-1px);
	}

	.acknowledge-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}

	/* Alert severity styling */
	:global(.border-red-500) { border-color: #ef4444; }
	:global(.bg-red-50) { background-color: rgba(239, 68, 68, 0.05); }
	:global(.border-orange-500) { border-color: #f97316; }
	:global(.bg-orange-50) { background-color: rgba(249, 115, 22, 0.05); }
	:global(.border-yellow-500) { border-color: #eab308; }
	:global(.bg-yellow-50) { background-color: rgba(234, 179, 8, 0.05); }
	:global(.border-blue-500) { border-color: #3b82f6; }
	:global(.bg-blue-50) { background-color: rgba(59, 130, 246, 0.05); }
	:global(.border-gray-300) { border-color: #d1d5db; }
	:global(.bg-gray-50) { background-color: rgba(209, 213, 219, 0.05); }

	/* Responsive Design */
	@media (max-width: 768px) {
		.section-header {
			flex-direction: column;
			gap: 0.75rem;
			align-items: stretch;
		}
		
		.alert-header {
			flex-direction: column;
			gap: 0.75rem;
		}
		
		.alert-actions {
			align-self: flex-start;
		}
	}
</style> 