<script lang="ts">
	import type { InspectionProgress } from './types/inspection.types';

	export let driverName: string;
	export let truckId: string;
	export let trailerNumber: string;
	export let currentDate: Date;
	export let progress: InspectionProgress;
</script>

<div class="inspection-header bg-white border-b border-slate-200 p-4 sticky top-0 z-20">
	<div class="header-content max-w-4xl mx-auto flex justify-between items-center">
		<div class="truck-info flex-1">
			<h1 class="text-xl font-semibold text-slate-800">Pre-Trip Inspection</h1>
			<div class="vehicle-details flex items-center gap-2 text-sm text-slate-600">
				<span class="font-mono font-semibold text-slate-800">{truckId}</span>
				<span>•</span>
				<span class="font-mono font-semibold text-slate-800">{trailerNumber}</span>
			</div>
			<div class="inspection-meta flex items-center gap-2 text-xs text-slate-500">
				<span>{driverName}</span>
				<span>•</span>
				<span>{currentDate.toLocaleDateString()}</span>
			</div>
		</div>
		<div class="progress-indicator flex flex-col items-center gap-2">
			<div class="progress-circle relative w-16 h-16">
				<svg class="progress-ring w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
					<circle class="progress-ring-background" cx="32" cy="32" r="28" 
						fill="none" stroke="#e5e7eb" stroke-width="4" />
					<circle class="progress-ring-progress" cx="32" cy="32" r="28"
						fill="none" stroke="#059669" stroke-width="4" stroke-linecap="round"
						style="stroke-dasharray: {176}; stroke-dashoffset: {176 - (176 * progress.completionPercent / 100)}; transition: stroke-dashoffset 0.3s ease" />
				</svg>
				<span class="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-800">{progress.completionPercent}%</span>
			</div>
			<div class="progress-stats text-center text-xs">
				<span class="text-green-600 font-semibold">{progress.completedItems}/{progress.totalItems}</span>
				{#if progress.failedItems > 0}
					<div class="text-red-500 font-semibold">{progress.failedItems} defects</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	@media (max-width: 768px) {
		.header-content {
			flex-direction: column;
			align-items: flex-start;
			gap: 12px;
		}

		.progress-indicator {
			align-self: flex-end;
		}
	}
</style> 