<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 1042-line component → @current-size: ~180 lines  
@phase: Phase 1 - Critical Components
@extractors: JobSpecifications from JobDetailModal.svelte
-->
<script lang="ts">
	import { 
		Gauge, BarChart3, FileText, Database, Clock, MapPin, AlertCircle,
		Truck, Thermometer, AlertTriangle, Package, Droplets, TrendingUp 
	} from 'lucide-svelte';
	import { formatDuration, getPriorityColor, getPriorityLabel } from './utils/job-calculations.js';
	import type { ScheduledJob } from './types/job-detail.types.js';
	
	// Props
	export let job: ScheduledJob;
</script>

<!-- Job Specifications - FIRST THING DRIVERS SEE -->
<div class="specifications">
	<h4 class="section-title">Job Specifications</h4>
	<div class="spec-grid">
		<!-- Volume & Level -->
		<div class="spec-item">
			<Gauge size={16} />
			<span class="spec-label">EST Volume</span>
			<span class="spec-value">{job.estimatedUnits} units</span>
		</div>
		<div class="spec-item">
			<BarChart3 size={16} />
			<span class="spec-label">Tank Level</span>
			<span class="spec-value tank-level">{job.tankLevelHeight}</span>
		</div>

		<!-- Load Details -->
		<div class="spec-item">
			<FileText size={16} />
			<span class="spec-label">Product Type</span>
			<span class="spec-value load-type">{job.loadType.charAt(0).toUpperCase() + job.loadType.slice(1)}</span>
		</div>
		<div class="spec-item">
			<Database size={16} />
			<span class="spec-label">Tank Number</span>
			<span class="spec-value">{job.pickupLocation.tankNumber}</span>
		</div>

		<!-- Timing & Distance -->
		<div class="spec-item">
			<Clock size={16} />
			<span class="spec-label">EST Transit Time</span>
			<span class="spec-value">{formatDuration(job.estimatedDuration)}</span>
		</div>
		<div class="spec-item">
			<MapPin size={16} />
			<span class="spec-label">Distance</span>
			<span class="spec-value">{job.distance} miles</span>
		</div>

		<!-- Priority -->
		<div class="spec-item priority">
			<AlertCircle size={16} />
			<span class="spec-label">Priority</span>
			<span class="spec-value priority-level" style="color: {getPriorityColor(job.priority)}">{getPriorityLabel(job.priority)}</span>
		</div>
	</div>

	<!-- Additional Technical Specifications -->
	<div class="tech-specs">
		<h5 class="subsection-title">Technical Details</h5>
		<div class="tech-grid">
			<div class="tech-item">
				<span class="tech-label">API Gravity:</span>
				<span class="tech-value">0.0°</span>
			</div>
			<div class="tech-item">
				<span class="tech-label">Water Cut:</span>
				<span class="tech-value">0.0%</span>
			</div>
			<div class="tech-item">
				<span class="tech-label">Density:</span>
				<span class="tech-value">0.000 g/cm³</span>
			</div>
			<div class="tech-item">
				<span class="tech-label">Pad Name:</span>
				<span class="tech-value">{job.pickupLocation.padName}</span>
			</div>
			<div class="tech-item">
				<span class="tech-label">Rate:</span>
				<span class="tech-value">$0.00</span>
			</div>
			<div class="tech-item">
				<span class="tech-label">Fuel Surcharge:</span>
				<span class="tech-value">$0.00</span>
			</div>
		</div>
	</div>

	<!-- Quick Status Summary -->
	<div class="status-summary">
		<div class="summary-item equipment">
			<Truck size={14} />
			<span>Equipment: Verified & Available</span>
		</div>
		<div class="summary-item documentation">
			<FileText size={14} />
			<span>Documentation: BOL, Manifest, Permits Ready</span>
		</div>
	</div>
</div>

<style>
	.specifications {
		padding: 1.5rem;
		border-bottom: 1px solid #f1f5f9;
	}

	.section-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.spec-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.spec-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		background: #f8fafc;
		border-radius: 0.5rem;
		border: 1px solid #e2e8f0;
	}

	.spec-item.priority {
		grid-column: span 2;
		background: #fef7f0;
		border-color: #fed7aa;
	}

	.spec-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #64748b;
		flex: 1;
	}

	.spec-value {
		font-size: 0.875rem;
		font-weight: 600;
		color: #1e293b;
	}

	.spec-value.tank-level {
		color: #059669;
	}

	.spec-value.load-type {
		text-transform: capitalize;
	}

	.spec-value.priority-level {
		font-weight: 700;
	}

	.tech-specs {
		margin-bottom: 1.5rem;
	}

	.subsection-title {
		font-size: 1rem;
		font-weight: 600;
		color: #475569;
		margin-bottom: 0.75rem;
	}

	.tech-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}

	.tech-item {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid #f1f5f9;
	}

	.tech-item:last-child {
		border-bottom: none;
	}

	.tech-label {
		font-size: 0.8125rem;
		color: #64748b;
		font-weight: 500;
	}

	.tech-value {
		font-size: 0.8125rem;
		color: #1e293b;
		font-weight: 600;
	}

	.status-summary {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.summary-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		background: #f0f9ff;
		border-radius: 0.375rem;
		font-size: 0.8125rem;
		color: #0c4a6e;
	}

	.summary-item.equipment {
		background: #f0fdf4;
		color: #14532d;
	}

	.summary-item.documentation {
		background: #fef7f0;
		color: #9a3412;
	}
</style> 