<script lang="ts">
	interface Props {
		title: string;
		period: string;
		mockContent: string;
	}

	let { title, period, mockContent }: Props = $props();
</script>

<div class="chart-placeholder">
	<div class="chart-header">
		<h3>{title}</h3>
		<span class="chart-period">{period}</span>
	</div>
	<div class="chart-body">
		<div class="chart-mock">
			{mockContent}
		</div>
	</div>
</div>

<style>
	.chart-placeholder {
		@apply bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700;
	}

	.chart-header {
		@apply flex items-center justify-between mb-4;
	}

	.chart-header h3 {
		@apply text-lg font-semibold text-gray-900 dark:text-white;
	}

	.chart-period {
		@apply text-sm text-gray-500 dark:text-gray-400;
	}

	.chart-body {
		@apply h-48 flex items-center justify-center;
	}

	.chart-mock {
		@apply text-center text-gray-600 dark:text-gray-400 p-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg;
	}
</style> 