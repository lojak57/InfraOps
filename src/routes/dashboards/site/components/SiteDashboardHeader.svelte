<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 603-line component → @current-size: ~35 lines  
@phase: Phase 8 - Site Dashboard Components
@extractors: SiteDashboardHeader from Site Dashboard
-->
<script lang="ts">
	// No props needed - static header content
</script>

<div class="dashboard-header bg-slate-800 text-white">
	<div class="header-content">
		<div class="header-text">
			<h1 class="header-title text-xl font-semibold">Site Manager Dashboard</h1>
			<p class="header-subtitle text-slate-300">Asset overview, operator management, and site operations</p>
		</div>
	</div>
</div>

<style>
	.dashboard-header {
		border-radius: 16px;
		padding: 24px 32px;
		margin-bottom: 24px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header-text h1 {
		margin: 0 0 4px 0;
	}

	.header-text p {
		margin: 0;
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.dashboard-header {
			padding: 24px 20px;
			margin-bottom: 20px;
		}

		.header-content {
			flex-direction: column;
			text-align: center;
			gap: 16px;
		}
	}
</style> 