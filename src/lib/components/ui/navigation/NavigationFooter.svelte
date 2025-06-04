<script lang="ts">
	import type { SystemStatus } from '$lib/types/navigation.types';
	import { brandConfig } from '$lib/utils/navigation-utils';

	interface Props {
		systemStatus: SystemStatus;
		version?: string;
	}

	let { systemStatus, version = brandConfig.version }: Props = $props();
</script>

<div class="nav-footer">
	<div class="system-status">
		<div 
			class="status-indicator" 
			class:online={systemStatus.isOnline}
			class:offline={!systemStatus.isOnline}
		></div>
		<span class="status-text">{systemStatus.text}</span>
	</div>
	<div class="version-info">{version}</div>
</div>

<style>
	.nav-footer {
		padding: 16px 20px;
		border-top: 1px solid var(--sidebar-border);
		background: var(--nav-footer-bg);
	}

	.system-status {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.status-indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	.status-indicator.online {
		background: var(--datatracker-success);
	}

	.status-indicator.offline {
		background: var(--datatracker-error);
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.status-text {
		font-size: 12px;
		font-weight: 500;
		color: var(--nav-footer-text);
	}

	.version-info {
		font-size: 10px;
		font-weight: 400;
		color: var(--nav-version-text);
	}
</style> 