<script lang="ts">
	interface Props {
		isLive: boolean;
		size?: 'sm' | 'md' | 'lg';
		showText?: boolean;
	}

	let { isLive, size = 'md', showText = true }: Props = $props();

	const sizeClasses = {
		sm: { dot: 'w-4 h-4', text: 'text-xs', padding: 'px-2 py-1' },
		md: { dot: 'w-6 h-6', text: 'text-sm', padding: 'px-3 py-1.5' },
		lg: { dot: 'w-8 h-8', text: 'text-base', padding: 'px-4 py-2' }
	};

	const classes = $derived(sizeClasses[size]);
</script>

{#if isLive}
	<div class="live-indicator {classes.padding}">
		<div class="live-dot {classes.dot}"></div>
		{#if showText}
			<span class="live-text {classes.text}">LIVE</span>
		{/if}
	</div>
{/if}

<style>
	.live-indicator {
		display: flex;
		align-items: center;
		gap: 6px;
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid rgba(16, 185, 129, 0.2);
		border-radius: 12px;
		transition: all 0.3s ease;
	}

	.live-dot {
		background: #10b981;
		border-radius: 50%;
		animation: livePulse 2s infinite;
		flex-shrink: 0;
	}

	@keyframes livePulse {
		0%, 100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.5;
			transform: scale(1.2);
		}
	}

	.live-text {
		font-weight: 600;
		color: #10b981;
		letter-spacing: 0.5px;
		white-space: nowrap;
	}

	/* Mobile responsiveness */
	@media (max-width: 768px) {
		.live-indicator {
			gap: 4px;
		}
		
		.live-text {
			font-size: 0.75rem;
		}
	}

	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.live-indicator {
			background: rgba(16, 185, 129, 0.15);
			border-color: rgba(16, 185, 129, 0.3);
		}
	}
</style> 