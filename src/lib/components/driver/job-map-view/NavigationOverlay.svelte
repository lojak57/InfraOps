<script lang="ts">
	import { Navigation } from 'lucide-svelte';
	import { getCurrentNavigationTurn } from './utils/map-calculations';

	const navigationTurn = getCurrentNavigationTurn();
</script>

<div class="nav-overlay">
	<div class="next-turn">
		<div class="turn-icon">
			<Navigation size={20} />
		</div>
		<div class="turn-info">
			<span class="turn-distance">{navigationTurn.distance}</span>
			<span class="turn-instruction">{navigationTurn.instruction}</span>
		</div>
		<div class="turn-status">
			<span class="current-road">{navigationTurn.currentRoad}</span>
		</div>
	</div>
</div>

<style>
	.nav-overlay {
		position: absolute;
		top: 80px;
		left: 20px;
		right: 20px;
		z-index: 1000;
	}

	.next-turn {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 12px;
		padding: 16px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.turn-icon {
		width: 40px;
		height: 40px;
		background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		flex-shrink: 0;
	}

	.turn-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.turn-distance {
		font-size: 12px;
		color: #3b82f6;
		font-weight: 600;
	}

	.turn-instruction {
		font-size: 14px;
		color: #1e293b;
		font-weight: 600;
		line-height: 1.2;
	}

	.turn-status {
		font-size: 11px;
		color: #64748b;
		font-weight: 500;
	}

	.current-road {
		font-style: italic;
	}
</style> 