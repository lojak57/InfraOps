<!-- 
@refactored: 2024-12-17 - Component Size Optimization Plan
@original-size: Part of 1030-line component → @current-size: ~120 lines  
@phase: Phase 1 - Critical Components
@extractors: DocumentFilters from DocumentLibrary.svelte
-->
<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { documentTypes, statusOptions, getStatusInfo } from '../utils/document-utils.js';
	import type { DocumentFilters } from '../types/document-library.types.js';
	
	// Props
	export let filters: DocumentFilters;
	export let onFiltersChange: (newFilters: DocumentFilters) => void;
	
	// Update handlers
	function updateSearchQuery(value: string) {
		onFiltersChange({ ...filters, searchQuery: value });
	}
	
	function updateSelectedType(value: string) {
		onFiltersChange({ ...filters, selectedType: value as any });
	}
	
	function updateSelectedStatus(value: string) {
		onFiltersChange({ ...filters, selectedStatus: value as any });
	}
	
	function updateSortBy(value: string) {
		onFiltersChange({ ...filters, sortBy: value as any });
	}
	
	function toggleSortOrder() {
		onFiltersChange({ 
			...filters, 
			sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' 
		});
	}
</script>

<!-- Search and Filters -->
<div class="search-filters-section">
	<div class="search-container">
		<Search class="search-icon" size={18} />
		<input
			type="text"
			placeholder="Search documents..."
			value={filters.searchQuery}
			on:input={(e) => updateSearchQuery(e.currentTarget.value)}
			class="search-input"
		/>
	</div>
	
	<div class="filters-container">
		<select 
			value={filters.selectedType} 
			on:change={(e) => updateSelectedType(e.currentTarget.value)}
			class="filter-select"
		>
			{#each documentTypes as type}
				<option value={type}>{type === 'all' ? 'All Types' : type}</option>
			{/each}
		</select>
		
		<select 
			value={filters.selectedStatus} 
			on:change={(e) => updateSelectedStatus(e.currentTarget.value)}
			class="filter-select"
		>
			{#each statusOptions as status}
				<option value={status}>{status === 'all' ? 'All Status' : getStatusInfo(status).label}</option>
			{/each}
		</select>
		
		<select 
			value={filters.sortBy} 
			on:change={(e) => updateSortBy(e.currentTarget.value)}
			class="filter-select"
		>
			<option value="uploadDate">Upload Date</option>
			<option value="fileName">File Name</option>
			<option value="type">Type</option>
			<option value="status">Status</option>
			<option value="expiryDate">Expiry Date</option>
		</select>
		
		<button
			class="sort-order-btn"
			on:click={toggleSortOrder}
			aria-label="Toggle sort order"
		>
			{filters.sortOrder === 'asc' ? '↑' : '↓'}
		</button>
	</div>
</div>

<style>
	.search-filters-section {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.search-container {
		position: relative;
		flex: 1;
		min-width: 250px;
	}

	.search-icon {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);
		color: #6b7280;
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: 0.75rem 0.75rem 0.75rem 2.5rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.75rem;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		color: #1a1a1a;
		font-size: 0.875rem;
		transition: all 0.2s ease;
	}

	.search-input::placeholder {
		color: #6b7280;
	}

	.search-input:focus {
		outline: none;
		border-color: #004E89;
		box-shadow: 0 0 0 3px rgba(0, 78, 137, 0.1);
	}

	.filters-container {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.filter-select {
		padding: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.75rem;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		color: #1a1a1a;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s ease;
		min-width: 120px;
	}

	.filter-select:focus {
		outline: none;
		border-color: #004E89;
		box-shadow: 0 0 0 3px rgba(0, 78, 137, 0.1);
	}

	.sort-order-btn {
		padding: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.75rem;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		color: #1a1a1a;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sort-order-btn:hover {
		background: rgba(255, 255, 255, 0.35);
	}

	.sort-order-btn:focus {
		outline: none;
		border-color: #004E89;
		box-shadow: 0 0 0 3px rgba(0, 78, 137, 0.1);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.search-filters-section {
			flex-direction: column;
		}
		
		.filters-container {
			flex-wrap: wrap;
		}
		
		.filter-select {
			min-width: 100px;
		}
	}
</style> 