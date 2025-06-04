<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 613-line component → @current-size: ~80 lines  
@phase: Phase 6 - Driver Components
@extractors: ActionSection from JobCard.svelte
-->
<script lang="ts">
	import { Clock, ChevronRight } from 'lucide-svelte';
	import { formatDuration, getPriorityLabel, getPriorityClass } from '../utils/job-card-utils.js';
	import type { ScheduledJob } from '../types/job-card.types.js';
	
	export let job: ScheduledJob;
</script>

<div class="action-section">
	<div class="status-info">
		<div class="priority-label {getPriorityClass(job.priority)}">
			{getPriorityLabel(job.priority)}
		</div>
		<div class="duration-badge">
			<Clock size={12} />
			<span>{formatDuration(job.estimatedDuration)}</span>
		</div>
	</div>
	<div class="view-details-btn">
		<span>View</span>
		<ChevronRight size={14} />
	</div>
</div>

<style>
	.action-section {
		width: 96px;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		gap: 8px;
	}

	.status-info {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 4px;
		width: 100%;
	}

	.duration-badge {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		color: #64748b;
		font-weight: 500;
		background: #f8fafc;
		padding: 4px 8px;
		border-radius: 4px;
		white-space: nowrap;
		border: 1px solid #e2e8f0;
	}

	.priority-label {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.3px;
		padding: 2px 6px;
		border-radius: 3px;
		align-self: flex-end;
	}

	.priority-label.urgent {
		background: #fef2f2;
		color: #dc2626;
	}

	.priority-label.high {
		background: #fef2f2;
		color: #dc2626;
	}

	.priority-label.normal {
		background: #f8fafc;
		color: #64748b;
	}

	.priority-label.low {
		background: #f8fafc;
		color: #64748b;
	}

	.view-details-btn {
		display: flex;
		align-items: center;
		gap: 4px;
		color: #3b82f6;
		font-size: 12px;
		font-weight: 600;
		padding: 6px 10px;
		border-radius: 6px;
		background: #f0f9ff;
		border: 1px solid #bfdbfe;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	/* Mobile Responsive */
	@media (max-width: 640px) {
		.action-section {
			align-items: flex-end;
			min-width: 90px;
		}

		.view-details-btn {
			font-size: 11px;
			padding: 4px 8px;
		}

		.duration-badge {
			font-size: 10px;
			padding: 3px 6px;
		}

		.priority-label {
			font-size: 9px;
		}
	}
</style> 