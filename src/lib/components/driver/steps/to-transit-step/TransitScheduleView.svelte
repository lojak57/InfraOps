<script lang="ts">
	import DriverSchedule from '../../DriverSchedule.svelte';
	import TransitStatusBanner from './TransitStatusBanner.svelte';
	import { getHeaderTitle, getHeaderDescription } from './utils/to-transit-step-utils';

	export let transitType: 'pickup' | 'delivery';
	export let eventHandlers: any;

	$: headerTitle = getHeaderTitle(transitType);
	$: headerDescription = getHeaderDescription(transitType);
</script>

<div class="transit-content">
	<div class="transit-header">
		<h2>{headerTitle}</h2>
		<p>{headerDescription}</p>
		
		<!-- Status Banner for Delivery -->
		{#if transitType === 'delivery'}
			<TransitStatusBanner />
		{/if}
	</div>
	
	<DriverSchedule 
		on:job-selected={eventHandlers.handleJobSelected}
	/>
	
	<div class="primary-actions">
		<button 
			class="action-btn primary" 
			on:click={() => {
				if (transitType === 'pickup') {
					eventHandlers.handleStartNavigation && eventHandlers.handleStartNavigation();
				} else {
					eventHandlers.handleStartDeliveryNavigation && eventHandlers.handleStartDeliveryNavigation();
				}
			}}
		>
			Start {transitType === 'pickup' ? 'Navigation' : 'Delivery Route'}
		</button>
	</div>
</div>

<style>
	.transit-content {
		max-width: 800px;
		margin: 0 auto;
	}
	
	.transit-header {
		text-align: center;
		margin-bottom: 32px;
	}
	
	.transit-header h2 {
		font-size: 1.875rem;
		font-weight: 700;
		color: #1f2937;
		margin-bottom: 12px;
	}
	
	.transit-header p {
		font-size: 1.125rem;
		color: #6b7280;
		margin-bottom: 0;
	}

	.primary-actions {
		display: flex;
		justify-content: center;
		gap: 16px;
		margin-top: 32px;
	}
	
	.action-btn {
		padding: 14px 28px;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	
	.action-btn.primary {
		background: #3b82f6;
		color: #ffffff;
	}
	
	.action-btn.primary:hover {
		background: #2563eb;
	}
</style> 