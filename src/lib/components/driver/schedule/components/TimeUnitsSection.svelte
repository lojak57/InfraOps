<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 613-line component → @current-size: ~70 lines  
@phase: Phase 6 - Driver Components
@extractors: TimeUnitsSection from JobCard.svelte
-->
<script lang="ts">
	import { formatTime, getTimeUntilJob, getTimeStatusClass } from '../utils/job-card-utils.js';
	import type { ScheduledJob } from '../types/job-card.types.js';
	
	export let job: ScheduledJob;
</script>

<div class="time-units-section">
	<div class="time-display">
		<div class="scheduled-time">{formatTime(job.scheduledTime)}</div>
		<div class="time-status {getTimeStatusClass(job.scheduledTime)}">
			{getTimeUntilJob(job.scheduledTime)}
		</div>
	</div>
	<div class="units-display">
		<div class="units-value">{job.estimatedUnits}</div>
		<div class="units-label">units</div>
	</div>
</div>

<style>
	.time-units-section {
		width: 84px;
		padding: 0;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 8px;
	}

	.time-display {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2px;
		width: 100%;
	}

	.scheduled-time {
		text-align: left;
		font-size: 16px;
		font-weight: 700;
		color: #0f172a;
		font-family: 'JetBrains Mono', monospace;
		line-height: 1.2;
		margin: 0;
	}

	.time-status {
		font-size: 10px;
		font-weight: 600;
		padding: 2px 6px;
		border-radius: 4px;
		text-transform: uppercase;
		letter-spacing: 0.3px;
		white-space: nowrap;
		margin: 0;
		align-self: flex-start;
	}

	.time-status.normal {
		background: #f8fafc;
		color: #64748b;
	}

	.time-status.soon {
		background: #fef2f2;
		color: #dc2626;
	}

	.time-status.overdue {
		background: #fef2f2;
		color: #dc2626;
	}

	.units-display {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1px;
		width: 100%;
	}

	.units-value {
		text-align: left;
		font-size: 22px;
		font-weight: 700;
		color: #0f172a;
		font-family: 'JetBrains Mono', monospace;
		line-height: 1;
		margin: 0;
	}

	.units-label {
		font-size: 9px;
		color: #64748b;
		font-weight: 600;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		margin: 0;
	}

	/* Mobile Responsive */
	@media (max-width: 640px) {
		.time-units-section {
			min-width: 75px;
		}

		.units-value {
			font-size: 20px;
		}

		.scheduled-time {
			font-size: 14px;
		}
	}
</style> 