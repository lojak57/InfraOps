<script lang="ts">
	export let size = 120;
</script>

<div class="datatracker-logo" style="width: {size}px;">
	<img 
		src="/logo.png" 
		alt="DataTracker Logo"
		style="width: 100%; height: auto;"
	/>
</div>

<style>
	.datatracker-logo {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.datatracker-logo img {
		transition: all 0.3s ease;
	}
	
	.datatracker-logo:hover img {
		transform: scale(1.05);
	}
</style> 