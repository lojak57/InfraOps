<script lang="ts">
	import type { SensorReading } from '$lib/stores/truckMonitoringData';

	export let sensors: SensorReading[];
	export let footerInfo: string = 'All sensors configured for automatic email alerts';

	$: normalCount = sensors.filter(s => s.status === 'normal').length;
	$: warningCount = sensors.filter(s => s.status === 'warning').length;
	$: criticalCount = sensors.filter(s => s.status === 'critical').length;
</script>

<div class="panel-footer">
	<div class="sensor-summary">
		<div class="summary-item">
			<span class="summary-count">{normalCount}</span>
			<span class="summary-label">Normal</span>
		</div>
		<div class="summary-item">
			<span class="summary-count">{warningCount}</span>
			<span class="summary-label">Warning</span>
		</div>
		<div class="summary-item">
			<span class="summary-count">{criticalCount}</span>
			<span class="summary-label">Critical</span>
		</div>
	</div>
	
	<div class="footer-info">
		<span class="info-text">{footerInfo}</span>
	</div>
</div>

<style>
	.panel-footer {
		background: rgba(248, 250, 252, 0.8);
		border-top: 1px solid rgba(0, 0, 0, 0.05);
		padding: 16px 20px;
	}

	.sensor-summary {
		display: flex;
		justify-content: center;
		gap: 24px;
		margin-bottom: 12px;
	}

	.summary-item {
		text-align: center;
	}

	.summary-count {
		display: block;
		font-size: 18px;
		font-weight: 700;
		color: #0f172a;
		font-family: 'JetBrains Mono', monospace;
	}

	.summary-label {
		display: block;
		font-size: 11px;
		color: #64748b;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-top: 2px;
	}

	.footer-info {
		text-align: center;
	}

	.info-text {
		font-size: 10px;
		color: #94a3b8;
		font-style: italic;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.sensor-summary {
			justify-content: space-around;
		}
	}
</style> 