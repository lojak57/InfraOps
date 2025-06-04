<script lang="ts">
	import type { DemoConfig } from './types/cost-visualizer.types';

	export let demoConfig: DemoConfig;

	function handleContactSales() {
		demoConfig.contactAction();
	}
</script>

<div class="demo-footer">
	<div class="footer-content">
		<div class="demo-info">
			<span class="demo-label">🚛 Demo Configuration:</span>
			<span>{demoConfig.companyName} - {demoConfig.fleetSize.toLocaleString()} Truck Fleet</span>
		</div>
		<div class="contact-info">
			<span>Learn more about VeriJob optimization</span>
			<button class="contact-btn" on:click={handleContactSales}>Contact Sales</button>
		</div>
	</div>
</div>

<style>
	.demo-footer {
		background: rgba(15, 23, 42, 0.95);
		backdrop-filter: blur(20px);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: 20px 24px;
		margin-top: 24px;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1400px;
		margin: 0 auto;
	}

	.demo-info {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #e2e8f0;
		font-size: 14px;
	}

	.demo-label {
		font-weight: 600;
	}

	.contact-info {
		display: flex;
		align-items: center;
		gap: 16px;
		color: #94a3b8;
		font-size: 14px;
	}

	.contact-btn {
		padding: 8px 16px;
		background: linear-gradient(135deg, #3b82f6, #1d4ed8);
		color: white;
		border: none;
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.contact-btn:hover {
		background: linear-gradient(135deg, #2563eb, #1e40af);
		transform: translateY(-1px);
	}

	@media (max-width: 768px) {
		.footer-content {
			flex-direction: column;
			gap: 12px;
			text-align: center;
		}
	}
</style> 