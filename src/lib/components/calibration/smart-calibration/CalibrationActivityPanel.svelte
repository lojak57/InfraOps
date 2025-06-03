<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 859-line component → @current-size: ~180 lines  
@phase: Phase 2 - High Priority Components
@extractors: CalibrationActivityPanel from SmartCalibrationRecommender.svelte
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { 
		generateDemoActivities,
		generateDemoAlerts,
		formatRelativeTime,
		getActivityTypeInfo,
		getAlertSeverityInfo
	} from './utils/calibration-utils.js';
	import type { FleetStats, CalibrationActivity, CalibrationAlert } from './types/calibration.types.js';
	
	const dispatch = createEventDispatcher();
	
	// Props
	export let fleetStats: FleetStats;
	export let activeTab: 'overview' | 'calibrations' | 'alerts' = 'overview';
	
	// Demo data
	const activities = generateDemoActivities();
	const alerts = generateDemoAlerts();
	
	function handleViewFleet() {
		dispatch('view-change', { view: 'fleet' });
	}
	
	function handleViewCritical() {
		dispatch('filter-change', { filter: 'critical' });
	}
	
	function handleViewOptimization() {
		dispatch('view-change', { view: 'optimization' });
	}
	
	function handleTabChange(tab: 'overview' | 'calibrations' | 'alerts') {
		dispatch('tab-change', { tab });
	}
</script>

<!-- Tabbed Content Section -->
<div class="tabbed-section">
	<div class="tabs-header">
		<button 
			class="tab-btn" 
			class:active={activeTab === 'overview'}
			on:click={() => handleTabChange('overview')}
		>
			Overview
		</button>
		<button 
			class="tab-btn" 
			class:active={activeTab === 'calibrations'}
			on:click={() => handleTabChange('calibrations')}
		>
			Calibration History
		</button>
		<button 
			class="tab-btn" 
			class:active={activeTab === 'alerts'}
			on:click={() => handleTabChange('alerts')}
		>
			Calibration Alerts
		</button>
	</div>

	<div class="tab-content">
		{#if activeTab === 'overview'}
			<div class="tab-panel">
				<div class="actions-grid">
					<button class="action-card" on:click={handleViewFleet}>
						<div class="action-icon">📋</div>
						<div class="action-content">
							<div class="action-title">View Fleet Details</div>
							<div class="action-description">See individual truck status and metrics</div>
						</div>
					</button>
					
					<button class="action-card" on:click={handleViewCritical}>
						<div class="action-icon">🚨</div>
						<div class="action-content">
							<div class="action-title">Critical Trucks</div>
							<div class="action-description">View {fleetStats.critical} trucks needing immediate attention</div>
						</div>
					</button>
					
					<button class="action-card" on:click={handleViewOptimization}>
						<div class="action-icon">📈</div>
						<div class="action-content">
							<div class="action-title">View Savings</div>
							<div class="action-description">See optimization impact and recommendations</div>
						</div>
					</button>
				</div>
			</div>
		{:else if activeTab === 'calibrations'}
			<div class="tab-panel">
				<div class="history-content">
					<h4>Recent Calibration Activity</h4>
					<div class="activity-list">
						{#each activities as activity}
							{@const typeInfo = getActivityTypeInfo(activity.type)}
							<div class="activity-item">
								<div class="activity-icon" style="color: {typeInfo.color}">{typeInfo.icon}</div>
								<div class="activity-content">
									<div class="activity-title">{activity.description}</div>
									<div class="activity-description">
										Truck {activity.truckId} • {activity.impact || 'No additional impact noted'}
									</div>
									<div class="activity-time">{formatRelativeTime(activity.timestamp)}</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{:else if activeTab === 'alerts'}
			<div class="tab-panel">
				<div class="alerts-content">
					<h4>Active Calibration Alerts</h4>
					<div class="alerts-list">
						{#each alerts as alert}
							{@const severityInfo = getAlertSeverityInfo(alert.severity)}
							<div class="alert-item {alert.severity}" style="background-color: {severityInfo.bgColor}; border-color: {severityInfo.color}40">
								<div class="alert-content">
									<div class="alert-title" style="color: {severityInfo.color}">{alert.title}</div>
									<div class="alert-description">{alert.description}</div>
									<div class="alert-meta">
										<span>Truck {alert.truckId}</span>
										<span>•</span>
										<span>{formatRelativeTime(alert.timestamp)}</span>
										{#if alert.acknowledged}
											<span class="acknowledged">✓ Acknowledged</span>
										{/if}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.tabbed-section {
		background: rgba(30, 41, 59, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
	}

	.tabs-header {
		display: flex;
		background: rgba(15, 23, 42, 0.5);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.tab-btn {
		flex: 1;
		padding: 12px 16px;
		background: transparent;
		border: none;
		color: #94a3b8;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		border-bottom: 2px solid transparent;
	}

	.tab-btn:hover {
		background: rgba(51, 65, 85, 0.3);
		color: #cbd5e1;
	}

	.tab-btn.active {
		color: #e2e8f0;
		border-bottom-color: #3b82f6;
		background: rgba(51, 65, 85, 0.5);
	}

	.tab-content {
		padding: 20px;
	}

	.tab-panel {
		min-height: 200px;
	}

	.actions-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 12px;
	}

	.action-card {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 16px;
		background: rgba(51, 65, 85, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
	}

	.action-card:hover {
		background: rgba(71, 85, 105, 0.4);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.action-icon {
		font-size: 20px;
		min-width: 40px;
		text-align: center;
	}

	.action-content {
		flex: 1;
	}

	.action-title {
		font-size: 14px;
		font-weight: 600;
		color: #e2e8f0;
		margin-bottom: 4px;
	}

	.action-description {
		font-size: 12px;
		color: #94a3b8;
		line-height: 1.3;
	}

	.history-content, .alerts-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.history-content h4, .alerts-content h4 {
		color: #e2e8f0;
		font-size: 16px;
		font-weight: 600;
		margin: 0;
	}

	.activity-list, .alerts-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.activity-item {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		padding: 16px;
		background: rgba(51, 65, 85, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
	}

	.activity-icon {
		font-size: 20px;
		min-width: 40px;
		text-align: center;
		margin-top: 2px;
	}

	.activity-content {
		flex: 1;
	}

	.activity-title {
		font-size: 14px;
		font-weight: 600;
		color: #e2e8f0;
		margin-bottom: 4px;
	}

	.activity-description {
		font-size: 13px;
		color: #94a3b8;
		line-height: 1.4;
		margin-bottom: 4px;
	}

	.activity-time {
		font-size: 11px;
		color: #64748b;
		font-weight: 500;
	}

	.alert-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.alert-content {
		flex: 1;
	}

	.alert-title {
		font-weight: 600;
		color: #e2e8f0;
		margin-bottom: 4px;
	}

	.alert-description {
		font-size: 12px;
		color: #94a3b8;
		line-height: 1.4;
		margin-bottom: 8px;
	}

	.alert-meta {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 11px;
		color: #64748b;
	}

	.acknowledged {
		color: #22c55e;
		font-weight: 500;
	}
</style> 