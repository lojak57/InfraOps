<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 1056-line component → @current-size: ~80 lines  
@phase: Phase 1 - Critical Components
@extractors: RegionalHeader from regional/+page.svelte
-->
<script lang="ts">
	import { regionsStore, regionalActions } from '../stores/regional.store.js';
	import { createDropdownHandlers } from '../utils/regional-utils.js';
	
	// Props
	export let activeRegion: string;
	export let onYardComparison: (regionName: string) => void;
	
	// Dropdown handlers
	const dropdown = createDropdownHandlers();
	let hoveredRegion = '';
	
	// Local handlers that update hoveredRegion
	function showDropdown(regionName: string) {
		hoveredRegion = dropdown.showDropdown(regionName);
	}
	
	function hideDropdown() {
		hoveredRegion = dropdown.hideDropdown();
	}
</script>

<svelte:head>
	<title>Regional Manager Dashboard - Logistics Temp Tracker</title>
</svelte:head>

<!-- Darker Header Banner -->
<div class="dashboard-header bg-slate-800 text-white">
	<div class="header-content">
		<div class="header-text">
			<h1 class="header-title text-xl font-semibold">Regional Manager Dashboard</h1>
			<p class="header-subtitle text-slate-300">Multi-site oversight and performance comparison</p>
		</div>
	</div>
</div>

<!-- Region Filters with Hover Dropdowns -->
<div class="region-filters">
	{#each $regionsStore as region}
		<div class="region-dropdown-container">
			<button 
				class="region-filter"
				class:active={activeRegion === region.name}
				style="--region-color: {region.color}"
				on:click={() => regionalActions.selectRegion(region.name)}
				on:mouseenter={() => showDropdown(region.name)}
				on:mouseleave={hideDropdown}
			>
				<div class="filter-indicator" style="background-color: {region.color}"></div>
				<div class="filter-content">
					<span class="filter-name text-slate-800">{region.name}</span>
				</div>
				<span class="dropdown-arrow text-slate-600">▾</span>
			</button>

			<!-- Hover Dropdown Menu -->
			{#if hoveredRegion === region.name}
				<div 
					class="dropdown-menu"
					on:mouseenter={dropdown.keepDropdown}
					on:mouseleave={hideDropdown}
				>
					<ul class="text-sm text-slate-800 divide-y divide-slate-200">
						<li><button class="dropdown-item" on:click={() => onYardComparison(region.name)}>Regional Assets</button></li>
						<li><button class="dropdown-item" on:click={() => onYardComparison(region.name)}>Active Assets</button></li>
						<li><button class="dropdown-item" on:click={() => onYardComparison(region.name)}>Operators Assigned</button></li>
						<li><button class="dropdown-item" on:click={() => onYardComparison(region.name)}>Regional Efficiency</button></li>
					</ul>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.dashboard-header {
		padding: 2rem 3rem;
	}
	
	.header-content {
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.region-filters {
		display: flex;
		gap: 1rem;
		padding: 1.5rem 3rem;
		background: #f8fafc;
		border-bottom: 1px solid #e2e8f0;
	}
	
	.region-dropdown-container {
		position: relative;
	}
	
	.region-filter {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1.25rem;
		background: white;
		border: 2px solid #e2e8f0;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s;
	}
	
	.region-filter:hover,
	.region-filter.active {
		border-color: var(--region-color);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}
	
	.filter-indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}
	
	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 50;
		min-width: 200px;
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	}
	
	.dropdown-item {
		display: block;
		width: 100%;
		padding: 0.75rem 1rem;
		text-align: left;
		background: none;
		border: none;
		cursor: pointer;
	}
	
	.dropdown-item:hover {
		background: #f1f5f9;
	}
</style> 