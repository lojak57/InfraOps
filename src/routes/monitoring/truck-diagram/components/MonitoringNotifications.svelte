<script lang="ts">
	import { onMount } from 'svelte';
	import type { NotificationData } from '../types/monitoring-page.types';
	import { getNotificationClass } from '../utils/monitoring-page-utils';

	export let notifications: NotificationData[] = [];

	// Auto-remove notifications after 3 seconds
	onMount(() => {
		notifications.forEach((notification, index) => {
			setTimeout(() => {
				notifications = notifications.filter((_, i) => i !== index);
			}, 3000);
		});
	});

	function removeNotification(index: number) {
		notifications = notifications.filter((_, i) => i !== index);
	}
</script>

<!-- Notification Container -->
<div id="notifications" class="notifications">
	{#each notifications as notification, index}
		<div 
			class={getNotificationClass(notification.type)}
			on:click={() => removeNotification(index)}
			role="button"
			tabindex="0"
			on:keydown={(e) => e.key === 'Enter' && removeNotification(index)}
		>
			{notification.message}
			<button class="close-btn" on:click|stopPropagation={() => removeNotification(index)}>
				✕
			</button>
		</div>
	{/each}
</div>

<style>
	.notifications {
		position: fixed;
		top: 20px;
		right: 20px;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	:global(.notification) {
		padding: 12px 16px;
		border-radius: 8px;
		color: white;
		font-size: 14px;
		font-weight: 500;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		animation: slideIn 0.3s ease;
		cursor: pointer;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: 250px;
	}

	:global(.notification-success) {
		background: #16a34a;
	}

	:global(.notification-info) {
		background: #3b82f6;
	}

	:global(.notification-warning) {
		background: #f59e0b;
	}

	:global(.notification-error) {
		background: #ef4444;
	}

	.close-btn {
		background: none;
		border: none;
		color: white;
		font-size: 16px;
		cursor: pointer;
		padding: 0;
		margin-left: 12px;
		opacity: 0.7;
		transition: opacity 0.2s ease;
	}

	.close-btn:hover {
		opacity: 1;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
</style> 