<script lang="ts">
	// No props needed - header content is static
</script>

<div class="table-header">
	<h3 class="table-title">Calibration Cost Analysis</h3>
	<div class="comparison-toggle">
		<span class="current-model">Current Model</span>
		<span class="vs">vs</span>
		<span class="optimized-model">VeriJob Optimization</span>
	</div>
</div>

<style>
	.table-header {
		background: linear-gradient(135deg, #f8fafc, #e2e8f0);
		padding: 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.table-title {
		font-size: 20px;
		font-weight: 700;
		color: #0f172a;
		margin: 0;
	}

	.comparison-toggle {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 14px;
		font-weight: 500;
	}

	.current-model {
		color: #dc2626;
		background: rgba(220, 38, 38, 0.1);
		padding: 4px 8px;
		border-radius: 4px;
	}

	.vs {
		color: #64748b;
		font-weight: 400;
	}

	.optimized-model {
		color: #059669;
		background: rgba(5, 150, 105, 0.1);
		padding: 4px 8px;
		border-radius: 4px;
	}

	@media (max-width: 768px) {
		.table-header {
			flex-direction: column;
			gap: 12px;
			align-items: flex-start;
		}
	}
</style> 