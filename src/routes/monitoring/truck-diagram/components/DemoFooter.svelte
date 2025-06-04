<script lang="ts">
	import { getDemoFooterInfo } from '../utils/monitoring-page-utils';

	const footerInfo = getDemoFooterInfo();
</script>

<!-- Demo Footer -->
<div class="demo-footer">
	<div class="footer-content">
		<div class="demo-info">
			<span class="demo-label">🎯 Demo Mode:</span>
			<span>{footerInfo.demoText}</span>
		</div>
		<div class="tech-stack">
			<span>{footerInfo.techStack}</span>
		</div>
	</div>
</div>

<style>
	.demo-footer {
		background: rgba(15, 23, 42, 0.95);
		backdrop-filter: blur(20px);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: 16px 24px;
		margin-top: 24px;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1400px;
		margin: 0 auto;
		color: #e2e8f0;
		font-size: 13px;
	}

	.demo-label {
		font-weight: 600;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.footer-content {
			flex-direction: column;
			gap: 8px;
			text-align: center;
		}
	}
</style> 