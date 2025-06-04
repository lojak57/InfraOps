<script lang="ts">
	import { getSiteInfo } from './utils/to-transit-step-utils';

	export let transitType: 'pickup' | 'delivery';
	export let destination: any;
	export let sharedState: any;

	$: siteInfo = getSiteInfo(transitType, destination, sharedState);
</script>

<div class="site-details-card">
	<h3>📍 {transitType === 'pickup' ? 'Pickup' : 'Delivery'} Site Details</h3>
	<div class="site-info">
		<div class="info-row">
			<span class="info-label">Site Name</span>
			<span class="info-value">{siteInfo.siteName}</span>
		</div>
		<div class="info-row">
			<span class="info-label">Address</span>
			<span class="info-value">{siteInfo.address}</span>
		</div>
		<div class="info-row">
			<span class="info-label">Contact</span>
			<span class="info-value">{siteInfo.contact}</span>
		</div>
		{#if transitType === 'pickup' && siteInfo.tank}
			<div class="info-row">
				<span class="info-label">Tank</span>
				<span class="info-value">{siteInfo.tank}</span>
			</div>
		{:else if transitType === 'delivery' && siteInfo.bay}
			<div class="info-row">
				<span class="info-label">Bay</span>
				<span class="info-value">{siteInfo.bay}</span>
			</div>
		{/if}
	</div>
</div>

<style>
	.site-details-card {
		background: #ffffff;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 24px;
		margin-bottom: 24px;
	}
	
	.site-details-card h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1f2937;
		margin-bottom: 16px;
	}
	
	.site-info {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	
	.info-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 0;
		border-bottom: 1px solid #f3f4f6;
	}
	
	.info-row:last-child {
		border-bottom: none;
	}
	
	.info-label {
		font-size: 0.875rem;
		color: #6b7280;
		font-weight: 500;
	}
	
	.info-value {
		font-size: 0.875rem;
		color: #1f2937;
		font-weight: 600;
		text-align: right;
	}

	@media (max-width: 768px) {
		.info-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
		}
		
		.info-value {
			text-align: left;
		}
	}
</style> 