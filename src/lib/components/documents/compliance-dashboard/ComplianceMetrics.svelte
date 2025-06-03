<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 1005-line component → @current-size: ~140 lines  
@phase: Phase 1 - Critical Components
@extractors: ComplianceMetrics from ComplianceDashboard.svelte
-->
<script lang="ts">
	import { Shield, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-svelte';
	import Chart from '$lib/components/charts/Chart.svelte';
	import MetricCard from '$lib/components/ui/MetricCard.svelte';
	import { getComplianceColor } from '../utils/compliance-utils.js';
	import type { ComplianceStats, ComplianceChartData } from '../types/compliance.types.js';
	
	// Props
	export let stats: ComplianceStats;
	export let chartData: ComplianceChartData;
</script>

<!-- Compliance Score Section -->
<div class="compliance-score-section">
	<div class="score-card">
		<div class="score-header">
			<Shield class="score-icon" size={32} />
			<div>
				<h2>Compliance Score</h2>
				<p>Overall document compliance rating</p>
			</div>
		</div>
		
		<div class="score-display">
			<div class="score-chart">
				<Chart 
					type="doughnut" 
					data={chartData}
					height={200}
					width={200}
					options={{
						cutout: '70%',
						plugins: {
							legend: {
								display: false
							},
							tooltip: {
								callbacks: {
									label: function(context) {
										const label = context.label || '';
										const value = context.parsed;
										const total = context.dataset.data.reduce((a, b) => a + b, 0);
										const percentage = ((value / total) * 100).toFixed(1);
										return `${label}: ${value} (${percentage}%)`;
									}
								}
							}
						}
					}}
				/>
				<div class="score-overlay">
					<span class="score-number" style="color: {getComplianceColor(stats.complianceScore)}">{stats.complianceScore}%</span>
					<span class="score-label">Compliant</span>
				</div>
			</div>
			
			<div class="score-breakdown">
				<div class="breakdown-item">
					<CheckCircle class="text-green-500" size={16} />
					<span>{stats.validDocuments} Valid</span>
				</div>
				<div class="breakdown-item">
					<Clock class="text-yellow-500" size={16} />
					<span>{stats.pendingDocuments} Pending</span>
				</div>
				<div class="breakdown-item">
					<AlertTriangle class="text-orange-500" size={16} />
					<span>{stats.expiringDocuments} Expiring</span>
				</div>
				<div class="breakdown-item">
					<XCircle class="text-red-500" size={16} />
					<span>{stats.expiredDocuments} Expired</span>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Key Metrics Grid -->
<div class="metrics-grid">
	<MetricCard
		title="Total Documents"
		value={stats.totalDocuments.toString()}
		unit=""
		trend="stable"
		icon="📄"
		color="blue"
	/>
	
	<MetricCard
		title="Valid Documents"
		value={stats.validDocuments.toString()}
		unit=""
		trend="up"
		icon="✅"
		color="emerald"
	/>
	
	<MetricCard
		title="Expiring Soon"
		value={stats.expiringDocuments.toString()}
		unit=""
		trend="down"
		icon="⚠️"
		color="amber"
	/>
	
	<MetricCard
		title="Expired"
		value={stats.expiredDocuments.toString()}
		unit=""
		trend="down"
		icon="❌"
		color="red"
	/>
</div>

<style>
	.compliance-score-section {
		margin-bottom: 2rem;
	}

	.score-card {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 1.25rem;
		padding: 2rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
	}

	.score-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.score-icon {
		color: #004E89;
	}

	.score-header h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0 0 0.25rem 0;
	}

	.score-header p {
		color: #6b7280;
		margin: 0;
		font-size: 0.875rem;
	}

	.score-display {
		display: flex;
		align-items: center;
		gap: 3rem;
	}

	.score-chart {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.score-overlay {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.score-number {
		font-size: 2rem;
		font-weight: 700;
		line-height: 1;
	}

	.score-label {
		font-size: 0.875rem;
		color: #6b7280;
		font-weight: 500;
		margin-top: 0.25rem;
	}

	.score-breakdown {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.breakdown-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 0.75rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: #1a1a1a;
	}

	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	/* Color utilities */
	:global(.text-green-500) { color: #10b981; }
	:global(.text-yellow-500) { color: #eab308; }
	:global(.text-orange-500) { color: #f97316; }
	:global(.text-red-500) { color: #ef4444; }

	/* Responsive Design */
	@media (max-width: 768px) {
		.score-display {
			flex-direction: column;
			gap: 1.5rem;
			align-items: center;
		}
		
		.score-chart {
			width: 120px;
			height: 120px;
		}
		
		.score-number {
			font-size: 1.5rem;
		}
		
		.metrics-grid {
			grid-template-columns: 1fr;
		}
	}
</style> 