<script lang="ts">
	export let nextStepText: string = "In 5.4 mi — Exit Loop 250 toward US-87 South";
	export let nextStepIcon: string = "🧭";
</script>

<div class="next-step-banner">
	<div class="next-step-content">
		<span class="next-step-icon">{nextStepIcon}</span>
		<span class="next-step-text">{nextStepText}</span>
	</div>
</div>

<style>
	.next-step-banner {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
		color: white;
		padding: 12px 16px;
		z-index: 10;
	}

	.next-step-content {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 14px;
		font-weight: 600;
	}

	.next-step-icon {
		font-size: 16px;
	}

	/* Tablet and desktop adjustments */
	@media (min-width: 768px) {
		.next-step-banner {
			padding: 16px 20px;
		}

		.next-step-content {
			font-size: 15px;
		}
	}
</style> 