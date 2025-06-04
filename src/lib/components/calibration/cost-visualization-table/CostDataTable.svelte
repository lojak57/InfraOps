<script lang="ts">
	import type { TableRow } from './types/table.types';
	import { getTableHeaders } from './utils/table-data';

	export let tableRows: TableRow[];
	export let hasAnimatedSavings: boolean = false;

	const headers = getTableHeaders();
</script>

<div class="excel-table">
	<!-- Table Header Row -->
	<div class="table-row header-row">
		{#each headers as header}
			<div class="table-cell {header.type}">{header.label}</div>
		{/each}
	</div>

	<!-- Data Rows -->
	{#each tableRows as row}
		<div 
			class="table-row" 
			class:highlight={row.highlight}
			class:total-row={row.isTotal}
			class:annual={row.isAnnual}
		>
			<div class="table-cell item" class:important={row.important} class:total={row.isTotal}>
				{row.component}
			</div>
			<div class="table-cell value" class:important={row.important} class:total={row.isTotal} class:animated={row.isTotal && !row.isAnnual}>
				{row.current}
			</div>
			<div class="table-cell value optimized" class:important={row.important} class:total={row.isTotal}>
				{row.optimized}
			</div>
			<div 
				class="table-cell value savings" 
				class:important={row.important} 
				class:total={row.isTotal}
				class:positive={row.isTotal}
				class:animated-savings={row.isAnnual && hasAnimatedSavings}
			>
				{row.savings}
			</div>
		</div>
	{/each}
</div>

<style>
	.excel-table {
		display: flex;
		flex-direction: column;
	}

	.table-row {
		display: grid;
		grid-template-columns: 2fr 1.5fr 1.5fr 1.2fr;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
		transition: background-color 0.2s ease;
	}

	.table-row:hover:not(.header-row) {
		background: rgba(59, 130, 246, 0.02);
	}

	.table-row.highlight {
		background: rgba(248, 250, 252, 0.8);
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.table-row.total-row {
		background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
		border-top: 2px solid rgba(0, 0, 0, 0.15);
		border-bottom: none;
	}

	.table-row.annual {
		background: linear-gradient(135deg, #dbeafe, #bfdbfe);
		border-top: 1px solid rgba(59, 130, 246, 0.2);
	}

	.table-cell {
		padding: 14px 16px;
		display: flex;
		align-items: center;
		font-size: 14px;
		border-right: 1px solid rgba(0, 0, 0, 0.05);
	}

	.table-cell:last-child {
		border-right: none;
	}

	.header-row .table-cell {
		background: #f8fafc;
		font-weight: 600;
		color: #475569;
		font-size: 13px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.item-header {
		background: linear-gradient(135deg, #f1f5f9, #e2e8f0) !important;
	}

	.value-header.optimized {
		background: rgba(5, 150, 105, 0.05) !important;
		color: #059669 !important;
	}

	.value-header.savings {
		background: rgba(34, 197, 94, 0.05) !important;
		color: #16a34a !important;
	}

	.table-cell.item {
		font-weight: 500;
		color: #334155;
	}

	.table-cell.value {
		font-weight: 600;
		color: #0f172a;
		font-family: 'JetBrains Mono', monospace;
	}

	.table-cell.optimized {
		color: #059669;
		background: rgba(5, 150, 105, 0.02);
	}

	.table-cell.savings {
		color: #16a34a;
		background: rgba(34, 197, 94, 0.02);
	}

	.table-cell.important {
		font-size: 15px;
		font-weight: 700;
	}

	.table-cell.total {
		font-size: 16px;
		font-weight: 700;
	}

	.table-cell.positive {
		color: #16a34a !important;
	}

	.animated {
		position: relative;
	}

	.animated::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
		animation: shimmer 2s ease-out;
	}

	.animated-savings {
		position: relative;
	}

	.animated-savings::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.15), transparent);
		animation: shimmer 2s ease-out;
	}

	@keyframes shimmer {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}

	@media (max-width: 768px) {
		.table-row {
			grid-template-columns: 1fr;
			gap: 8px;
		}

		.table-cell {
			padding: 10px 16px;
			border-right: none;
			border-bottom: 1px solid rgba(0, 0, 0, 0.05);
			justify-content: space-between;
		}
	}
</style> 