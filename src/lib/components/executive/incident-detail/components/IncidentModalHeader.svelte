<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Incident } from '../types/incident-detail.types';
	import { 
		getTypeIcon, 
		getSeverityConfig,
		getModalHeaderTitle 
	} from '../utils/incident-detail-utils';

	export let incident: Incident;

	const dispatch = createEventDispatcher<{
		close: void;
	}>();

	$: IconComponent = getTypeIcon(incident.type);
	$: severityConfig = getSeverityConfig(incident.severity);
	$: headerTitle = getModalHeaderTitle();

	function handleClose() {
		dispatch('close');
	}
</script>

<div class="modal-header">
	<div class="header-left">
		<div 
			class="header-icon" 
			style="background-color: {severityConfig.backgroundColor}"
		>
			<svelte:component this={IconComponent} size={28} />
		</div>
		<div class="header-text">
			<h1>{headerTitle}</h1>
			<p>{incident.id} • {incident.severity} Incident</p>
		</div>
	</div>
	<button class="close-btn" on:click={handleClose}>×</button>
</div>

<style>
	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px 32px;
		background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
		color: white;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.header-icon {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #374151;
	}

	.header-text h1 {
		margin: 0 0 4px 0;
		font-size: 24px;
		font-weight: 700;
	}

	.header-text p {
		margin: 0;
		opacity: 0.9;
		font-size: 14px;
	}

	.close-btn {
		width: 40px;
		height: 40px;
		border: none;
		background: rgba(255, 255, 255, 0.2);
		color: white;
		border-radius: 8px;
		font-size: 24px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(1.05);
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.modal-header {
			padding: 20px;
		}

		.header-text h1 {
			font-size: 20px;
		}

		.header-icon {
			width: 40px;
			height: 40px;
		}
	}
</style> 