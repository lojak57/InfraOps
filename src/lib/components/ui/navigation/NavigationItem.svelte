<script lang="ts">
	import type { NavigationItem } from '$lib/types/navigation.types';
	import { isActiveRoute } from '$lib/utils/navigation-utils';

	interface Props {
		item: NavigationItem;
		currentPath: string;
		isMobile?: boolean;
		onItemClick?: () => void;
	}

	let { item, currentPath, isMobile = false, onItemClick }: Props = $props();

	const isActive = $derived(isActiveRoute(item.href, currentPath));

	function handleClick() {
		if (onItemClick) {
			onItemClick();
		}
	}
</script>

<a 
	href={item.href} 
	class="nav-item"
	class:active={isActive}
	class:mobile={isMobile}
	title={item.description}
	onclick={handleClick}
>
	<div class="nav-item-icon">
		<svelte:component this={item.icon} size={isMobile ? 20 : 18} />
	</div>
	<div class="nav-item-content">
		<span class="nav-item-label">{item.label}</span>
		<span class="nav-item-description">{item.description}</span>
	</div>
</a>

<style>
	.nav-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 20px;
		margin: 0 8px;
		border-radius: 12px;
		text-decoration: none;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
		color: var(--nav-text);
	}

	.nav-item.mobile {
		padding: 16px 12px;
		margin: 0;
	}

	.nav-item::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: var(--nav-hover-bg);
		transform: scaleY(0);
		transition: transform 0.2s ease;
	}

	.nav-item.mobile::before {
		display: none;
	}

	.nav-item:hover {
		background: var(--nav-hover-bg);
		color: var(--nav-hover-text);
	}

	.nav-item:not(.mobile):hover {
		transform: translateX(4px);
	}

	.nav-item:hover::before {
		transform: scaleY(1);
	}

	.nav-item.active {
		background: var(--nav-hover-bg);
		border: 1px solid var(--nav-hover-bg);
		color: var(--nav-text-active);
	}

	.nav-item.active:not(.mobile) {
		transform: translateX(4px);
	}

	.nav-item.active::before {
		transform: scaleY(1);
	}

	.nav-item-icon {
		color: inherit;
		transition: color 0.2s ease;
		flex-shrink: 0;
	}

	.nav-item-content {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
		min-width: 0;
	}

	.nav-item-label {
		font-size: 14px;
		font-weight: 600;
		color: inherit;
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.nav-item.mobile .nav-item-label {
		font-size: 16px;
	}

	.nav-item.active .nav-item-label {
		font-weight: 700;
	}

	.nav-item-description {
		font-size: 11px;
		font-weight: 400;
		color: var(--nav-text-secondary);
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.nav-item.mobile .nav-item-description {
		font-size: 13px;
	}

	.nav-item:hover .nav-item-description,
	.nav-item.active .nav-item-description {
		color: rgba(255, 255, 255, 0.9);
	}
</style> 