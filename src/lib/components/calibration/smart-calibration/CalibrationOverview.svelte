<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 859-line component → @current-size: ~150 lines  
@phase: Phase 2 - High Priority Components
@extractors: CalibrationOverview from SmartCalibrationRecommender.svelte
-->
<script lang="ts">
	import { 
		calculateStatusDistribution,
		getCalibrationStatusIcon,
		getStatusDescription
	} from './utils/calibration-utils.js';
	import type { FleetStats } from './types/calibration.types.js';
	
	// Props
	export let fleetStats: FleetStats;
	
	// Calculate status distribution
	$: statusDistribution = calculateStatusDistribution(fleetStats);
</script>

<!-- Fleet Health Overview -->
<div class="health-overview">
	<h3 class="section-title">Fleet Consistency Overview</h3>
	
	<div class="health-grid">
		<div class="health-card good">
			<div class="health-icon">{getCalibrationStatusIcon('good')}</div>
			<div class="health-content">
				<div class="health-count">{fleetStats.good}</div>
				<div class="health-label">Good Status</div>
				<div class="health-percentage">{statusDistribution.good.toFixed(1)}%</div>
			</div>
			<div class="health-description">
				{getStatusDescription('good')}
			</div>
		</div>
		
		<div class="health-card warning">
			<div class="health-icon">{getCalibrationStatusIcon('warning')}</div>
			<div class="health-content">
				<div class="health-count">{fleetStats.warning}</div>
				<div class="health-label">Needs Calibration</div>
				<div class="health-percentage">{statusDistribution.warning.toFixed(1)}%</div>
			</div>
			<div class="health-description">
				{getStatusDescription('warning')}
			</div>
		</div>
		
		<div class="health-card critical">
			<div class="health-icon">{getCalibrationStatusIcon('critical')}</div>
			<div class="health-content">
				<div class="health-count">{fleetStats.critical}</div>
				<div class="health-label">Critical</div>
				<div class="health-percentage">{statusDistribution.critical.toFixed(1)}%</div>
			</div>
			<div class="health-description">
				{getStatusDescription('critical')}
			</div>
		</div>
	</div>
</div>

<style>
	.health-overview {
		background: rgba(30, 41, 59, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 16px;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
		max-width: 480px;
	}

	.section-title {
		font-size: 18px;
		font-weight: 600;
		color: #e2e8f0;
		margin: 0 0 16px 0;
	}

	.health-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 12px;
	}

	.health-card {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 16px;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.2s ease;
		background: rgba(51, 65, 85, 0.3);
	}

	.health-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.health-icon {
		font-size: 24px;
	}

	.health-content {
		flex: 1;
	}

	.health-count {
		font-size: 24px;
		font-weight: 700;
		color: #e2e8f0;
		font-family: 'JetBrains Mono', monospace;
	}

	.health-label {
		font-size: 14px;
		font-weight: 500;
		color: #cbd5e1;
		margin-top: 2px;
	}

	.health-percentage {
		font-size: 12px;
		color: #94a3b8;
		font-weight: 600;
	}

	.health-description {
		font-size: 11px;
		color: #64748b;
		text-align: right;
		line-height: 1.3;
	}
</style> 