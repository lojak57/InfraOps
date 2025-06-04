<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 613-line component → @current-size: ~25 lines  
@phase: Phase 6 - Driver Components
@extractors: PriorityBar from JobCard.svelte
-->
<script lang="ts">
	import { getPriorityColor } from '../utils/job-card-utils.js';
	import type { Priority } from '../types/job-card.types.js';
	
	export let priority: Priority;
</script>

<div class="priority-bar">
	<div class="priority-indicator {getPriorityColor(priority)}"></div>
</div>

<style>
	.priority-bar {
		height: 4px;
		background: #f1f5f9;
		position: relative;
	}

	.priority-indicator {
		height: 100%;
		width: 100%;
	}

	.priority-indicator.bg-red-500 {
		background: #dc2626;
	}

	.priority-indicator.bg-red-400 {
		background: #f59e0b;
	}

	.priority-indicator.bg-gray-400 {
		background: #6b7280;
	}

	.priority-indicator.bg-gray-300 {
		background: #f1f5f9;
	}
</style> 