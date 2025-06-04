<script lang="ts">
	import type { ComponentType } from 'svelte';

	interface Props {
		icon: ComponentType;
		value: string | number;
		label: string;
		subtitle: string;
		variant?: 'primary' | 'success' | 'warning' | 'info' | 'error' | 'neutral';
	}

	let { icon: Icon, value, label, subtitle, variant = 'neutral' }: Props = $props();
</script>

<div class="kpi-card {variant}">
	<div class="kpi-icon">
		<Icon size={24} />
	</div>
	<div class="kpi-content">
		<div class="kpi-value">{value}</div>
		<div class="kpi-label">{label}</div>
		<div class="kpi-sub">{subtitle}</div>
	</div>
</div>

<style>
	.kpi-card {
		@apply bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow;
	}

	.kpi-card.primary {
		@apply border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20;
	}

	.kpi-card.success {
		@apply border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20;
	}

	.kpi-card.warning {
		@apply border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20;
	}

	.kpi-card.info {
		@apply border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20;
	}

	.kpi-card.error {
		@apply border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20;
	}

	.kpi-card.neutral {
		@apply border-gray-200 dark:border-gray-700;
	}

	.kpi-icon {
		@apply flex items-center justify-center w-12 h-12 rounded-lg bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 mb-4;
	}

	.kpi-content {
		@apply space-y-1;
	}

	.kpi-value {
		@apply text-2xl font-bold text-gray-900 dark:text-white;
	}

	.kpi-label {
		@apply text-sm font-medium text-gray-600 dark:text-gray-300;
	}

	.kpi-sub {
		@apply text-xs text-gray-500 dark:text-gray-400;
	}
</style> 