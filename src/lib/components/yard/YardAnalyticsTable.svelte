<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { yardAnalyticsData, yardAnalyticsSummary } from './data/yardAnalyticsData';
	import { 
		sortAnalyticsData,
		formatDate, 
		formatNumber, 
		formatPercentage, 
		formatDecimal,
		getTrendIcon, 
		getTrendColor, 
		getPerformanceColor,
		generateSparklineSVG,
		calculateAverages,
		countExternalFactorDays,
		type SortColumn,
		type SortDirection
	} from './utils/yardAnalyticsUtils';

	const dispatch = createEventDispatcher();

	// Props
	export let visible = false;

	// State
	let selectedTimeframe = 'Last 7 Days';
	let sortColumn: SortColumn = 'date';
	let sortDirection: SortDirection = 'desc';
	let data = yardAnalyticsData;

	// Options
	const timeframeOptions = ['Last 7 Days', 'Last 30 Days', 'Custom'];

	// Computed values
	$: sortedData = sortAnalyticsData(data, sortColumn, sortDirection);
	$: averages = calculateAverages(sortedData);
	$: externalFactorDays = countExternalFactorDays(sortedData);

	function handleSort(column: SortColumn) {
		if (sortColumn === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = column;
			sortDirection = 'desc';
		}
	}

	function closeAnalytics() {
		visible = false;
		dispatch('close');
	}
</script>

{#if visible}
	<div class="analytics-overlay" on:click={closeAnalytics}>
		<div class="analytics-container" on:click|stopPropagation>
			<!-- Header -->
			<div class="analytics-header">
				<div class="header-content">
					<h2>Yard Performance Analytics</h2>
					<p>Defend your numbers with complete operational context</p>
				</div>
				<div class="header-controls">
					<select bind:value={selectedTimeframe} class="timeframe-select">
						{#each timeframeOptions as option}
							<option value={option}>{option}</option>
						{/each}
					</select>
					<button on:click={closeAnalytics} class="close-btn">✕</button>
				</div>
			</div>

			<!-- Key Insights -->
			<div class="key-insights">
				<div class="insight-card">
					<h4>Performance Summary</h4>
					<p>Averaged <strong>{yardAnalyticsSummary.averageThroughput} units/day</strong> with <strong>{yardAnalyticsSummary.operationalEfficiency}% operational efficiency</strong> despite planned maintenance affecting 3 trucks on Jan 13</p>
				</div>
				<div class="insight-card">
					<h4>Context Matters</h4>
					<p>Jan 10 low numbers due to <strong>customer pipeline maintenance</strong> - outside yard control. Peak performance Jan 12 shows true capability.</p>
				</div>
			</div>

			<!-- Analytics Table -->
			<div class="table-container">
				<table class="analytics-table">
					<thead>
						<tr>
							<th>
								<button on:click={() => handleSort('date')} class="sort-button">
									Date
									{#if sortColumn === 'date'}
										{#if sortDirection === 'asc'}<ChevronUp size={16} />{:else}<ChevronDown size={16} />{/if}
									{/if}
								</button>
							</th>
							<th>
								<button on:click={() => handleSort('dailyThroughput')} class="sort-button">
									Daily Throughput
									{#if sortColumn === 'dailyThroughput'}
										{#if sortDirection === 'asc'}<ChevronUp size={16} />{:else}<ChevronDown size={16} />{/if}
									{/if}
								</button>
							</th>
							<th>
								<button on:click={() => handleSort('unitsPerDriveHour')} class="sort-button">
									Units/Hour
									{#if sortColumn === 'unitsPerDriveHour'}
										{#if sortDirection === 'asc'}<ChevronUp size={16} />{:else}<ChevronDown size={16} />{/if}
									{/if}
								</button>
							</th>
							<th>
								<button on:click={() => handleSort('activeTrucksPercent')} class="sort-button">
									Active Trucks
									{#if sortColumn === 'activeTrucksPercent'}
										{#if sortDirection === 'asc'}<ChevronUp size={16} />{:else}<ChevronDown size={16} />{/if}
									{/if}
								</button>
							</th>
							<th>
								<button on:click={() => handleSort('loadEfficiencyIndex')} class="sort-button">
									Efficiency
									{#if sortColumn === 'loadEfficiencyIndex'}
										{#if sortDirection === 'asc'}<ChevronUp size={16} />{:else}<ChevronDown size={16} />{/if}
									{/if}
								</button>
							</th>
							<th>Trend</th>
							<th>Notes</th>
						</tr>
					</thead>
					<tbody>
						{#each sortedData as row}
							<tr>
								<td class="date-cell">{formatDate(row.date)}</td>
								<td class="metric-cell {getPerformanceColor(row.dailyThroughput, 'throughput')}">
									{formatNumber(row.dailyThroughput)}
								</td>
								<td class="metric-cell {getPerformanceColor(row.unitsPerDriveHour, 'unitsPerHour')}">
									{formatDecimal(row.unitsPerDriveHour)}
								</td>
								<td class="metric-cell {getPerformanceColor(row.activeTrucksPercent, 'activeTrucks')}">
									{formatPercentage(row.activeTrucksPercent)}
								</td>
								<td class="metric-cell {getPerformanceColor(row.loadEfficiencyIndex, 'loadEfficiency')}">
									{formatDecimal(row.loadEfficiencyIndex)}
								</td>
								<td class="trend-cell">
									<div class="trend-container {getTrendColor(row.trend)}">
										{#if getTrendIcon(row.trend)}
											<svelte:component this={getTrendIcon(row.trend)} size={16} />
										{/if}
										<div class="sparkline-container">
											{@html generateSparklineSVG(row.sparklineData)}
										</div>
									</div>
								</td>
								<td class="notes-cell">{row.notes}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Footer Insights -->
			<div class="footer-insights">
				<div class="insight-stat">
					<strong>Average Performance:</strong> {averages?.averageThroughput} units/day | {averages?.averageUnitsPerHour} units/hr | {averages?.averageActiveTrucks}% utilization
				</div>
				<div class="insight-stat">
					<strong>External Factors:</strong> {externalFactorDays} days impacted by factors outside yard control
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.analytics-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 20px;
	}

	.analytics-container {
		background: white;
		border-radius: 20px;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
		max-width: 95vw;
		max-height: 90vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.analytics-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 32px;
		border-bottom: 1px solid #e2e8f0;
		background: linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%);
	}

	.header-content h2 {
		font-size: 28px;
		font-weight: 700;
		color: #1e293b;
		margin: 0 0 8px 0;
	}

	.header-content p {
		font-size: 16px;
		color: #64748b;
		margin: 0;
	}

	.header-controls {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.timeframe-select {
		padding: 8px 16px;
		border: 1px solid #d1d5db;
		border-radius: 8px;
		background: white;
		font-size: 14px;
		cursor: pointer;
	}

	.close-btn {
		width: 40px;
		height: 40px;
		border: none;
		background: #f3f4f6;
		border-radius: 8px;
		cursor: pointer;
		font-size: 18px;
		color: #6b7280;
		transition: all 0.2s ease;
	}

	.close-btn:hover {
		background: #e5e7eb;
		color: #374151;
	}

	.key-insights {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		padding: 24px 32px;
		background: #fefefe;
	}

	.insight-card {
		background: linear-gradient(135deg, #475569 0%, #334155 100%);
		color: white;
		padding: 20px;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(71, 85, 105, 0.2);
	}

	.insight-card h4 {
		font-size: 16px;
		font-weight: 700;
		margin: 0 0 8px 0;
	}

	.insight-card p {
		font-size: 14px;
		margin: 0;
		line-height: 1.5;
	}

	.table-container {
		flex: 1;
		overflow: auto;
		padding: 0 32px;
	}

	.analytics-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
	}

	.analytics-table th {
		background: #f8fafc;
		padding: 16px 12px;
		text-align: left;
		font-weight: 600;
		color: #374151;
		border-bottom: 2px solid #e5e7eb;
		position: sticky;
		top: 0;
	}

	.sort-button {
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 4px;
		font-weight: 600;
		color: #374151;
		font-size: 14px;
	}

	.analytics-table td {
		padding: 16px 12px;
		border-bottom: 1px solid #f1f5f9;
	}

	.analytics-table tr:hover {
		background: #fafbfc;
	}

	.date-cell {
		font-weight: 600;
		color: #374151;
	}

	.metric-cell {
		font-weight: 700;
		font-family: 'JetBrains Mono', monospace;
	}

	.trend-cell {
		text-align: center;
	}

	.trend-container {
		display: flex;
		align-items: center;
		gap: 8px;
		justify-content: center;
	}

	.notes-cell {
		max-width: 200px;
		font-size: 13px;
		line-height: 1.4;
	}

	.footer-insights {
		padding: 24px 32px;
		background: #f8fafc;
		border-top: 1px solid #e2e8f0;
	}

	.insight-stat {
		margin-bottom: 8px;
		font-size: 14px;
		color: #475569;
	}
</style> 