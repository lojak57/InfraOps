<script lang="ts">
	interface Props {
		message?: string;
		size?: 'sm' | 'md' | 'lg';
		color?: string;
	}

	let { message = 'Loading chart data...', size = 'md', color = '#7CB342' }: Props = $props();

	const sizeClasses = {
		sm: { spinner: 'w-5 h-5', text: 'text-sm', gap: 'gap-2' },
		md: { spinner: 'w-6 h-6', text: 'text-base', gap: 'gap-3' },
		lg: { spinner: 'w-8 h-8', text: 'text-lg', gap: 'gap-4' }
	};

	const classes = $derived(sizeClasses[size]);
</script>

<div class="chart-loading {classes.gap}">
	<div 
		class="loading-spinner {classes.spinner}"
		style="border-top-color: {color};"
	></div>
	<span class="loading-text {classes.text}">{message}</span>
</div>

<style>
	.chart-loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: #6b7280;
		min-height: 200px;
	}

	.loading-spinner {
		border: 2px solid #e5e7eb;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		flex-shrink: 0;
	}

	@keyframes spin {
		0% { 
			transform: rotate(0deg); 
		}
		100% { 
			transform: rotate(360deg); 
		}
	}

	.loading-text {
		font-weight: 500;
		text-align: center;
		opacity: 0.8;
	}

	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.chart-loading {
			color: #9ca3af;
		}

		.loading-spinner {
			border-color: #374151;
		}
	}

	/* Animation variations */
	.chart-loading:hover .loading-spinner {
		animation-duration: 0.7s;
	}

	/* Responsive sizing */
	@media (max-width: 768px) {
		.chart-loading {
			min-height: 150px;
		}

		.loading-text {
			font-size: 0.875rem;
		}
	}
</style> 