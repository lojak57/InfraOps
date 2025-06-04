<script lang="ts">
	import { dispatchAnalytics } from '$lib/stores/dispatchAnalytics';
	import { 
		filterJobs, 
		sortJobs, 
		paginateJobs, 
		getUniqueDrivers, 
		getUniqueStatuses 
	} from './raw-data-table-utils';
	import type { TableFilters, TableSorting, TablePagination, FilterOptions } from './raw-data-table.types';
	import DataTableHeader from './DataTableHeader.svelte';
	import DataTableFilters from './DataTableFilters.svelte';
	import DataTableBody from './DataTableBody.svelte';
	import DataTablePagination from './DataTablePagination.svelte';

	// Reactive data - converted to $derived for runes mode
	const allJobs = $derived($dispatchAnalytics.demoJobs);
	const allYards = $derived($dispatchAnalytics.demoYards);
	const allTrucks = $derived($dispatchAnalytics.demoTrucks);

	// State management
	let filters: TableFilters = {
		searchQuery: '',
		selectedYard: '',
		selectedTruck: '',
		selectedDriver: '',
		selectedStatus: ''
	};

	let sorting: TableSorting = {
		field: 'startTime',
		direction: 'desc'
	};

	let pagination: TablePagination = {
		currentPage: 1,
		itemsPerPage: 25,
		totalItems: 0,
		totalPages: 0
	};

	// Computed values - converted to $derived
	const filterOptions = $derived({
		uniqueDrivers: getUniqueDrivers(allJobs),
		uniqueStatuses: getUniqueStatuses(allJobs),
		allYards,
		allTrucks
	} as FilterOptions);

	const filteredJobs = $derived(filterJobs(allJobs, filters, allTrucks));
	const sortedJobs = $derived(sortJobs(filteredJobs, sorting));
	
	// Update pagination when sorted jobs change - using $effect for side effects
	$effect(() => {
		pagination.totalItems = sortedJobs.length;
		pagination.totalPages = Math.ceil(sortedJobs.length / pagination.itemsPerPage);
		// Reset to page 1 if current page is beyond total pages
		if (pagination.currentPage > pagination.totalPages && pagination.totalPages > 0) {
			pagination.currentPage = 1;
		}
	});
	
	const paginatedJobs = $derived(paginateJobs(sortedJobs, pagination.currentPage, pagination.itemsPerPage));

	// Event handlers
	function handleFiltersChanged(event: CustomEvent<TableFilters>) {
		filters = event.detail;
		pagination.currentPage = 1; // Reset to first page on filter change
	}

	function handleSortChanged(event: CustomEvent<TableSorting>) {
		sorting = event.detail;
	}

	function handlePageChanged(event: CustomEvent<TablePagination>) {
		pagination = event.detail;
	}

	function handleJobClick(event: CustomEvent<{ jobId: string }>) {
		const { jobId } = event.detail;
		dispatchAnalytics.drillDown('job', jobId);
		// Dispatch custom event to trigger parent tab change
		window.dispatchEvent(new CustomEvent('job-detail-requested', { 
			detail: { jobId }
		}));
	}
</script>

<div class="raw-data-table">
	<DataTableHeader 
		filteredJobsCount={filteredJobs.length}
		totalJobsCount={allJobs.length}
		{filteredJobs}
	/>

	<DataTableFilters 
		{filters}
		{filterOptions}
		on:filtersChanged={handleFiltersChanged}
	/>

	<DataTableBody 
		jobs={paginatedJobs}
		{sorting}
		on:sortChanged={handleSortChanged}
		on:jobClick={handleJobClick}
	/>

	<DataTablePagination 
		{pagination}
		on:pageChanged={handlePageChanged}
	/>
</div>

<style>
	.raw-data-table {
		@apply flex flex-col h-full bg-white dark:bg-gray-800 min-h-0;
		padding: 1.5rem;
		gap: 1rem;
	}
</style> 