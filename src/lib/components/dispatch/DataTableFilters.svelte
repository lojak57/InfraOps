<script lang="ts">
  import { Search } from 'lucide-svelte';
  import type { TableFilters, FilterOptions } from './raw-data-table.types';
  import { createEventDispatcher } from 'svelte';

  export let filters: TableFilters;
  export let filterOptions: FilterOptions;

  const dispatch = createEventDispatcher();

  function clearFilters() {
    filters = {
      searchQuery: '',
      selectedYard: '',
      selectedTruck: '',
      selectedDriver: '',
      selectedStatus: ''
    };
    dispatch('filtersChanged', filters);
  }

  function updateFilters() {
    dispatch('filtersChanged', filters);
  }

  $: hasActiveFilters = filters.searchQuery || filters.selectedYard || filters.selectedTruck || filters.selectedDriver || filters.selectedStatus;
</script>

<div class="filters-section">
  <div class="filter-row">
    <!-- Search -->
    <div class="search-box">
      <Search class="w-4 h-4 search-icon" />
      <input
        type="text"
        placeholder="Search jobs, trucks, drivers, customers..."
        bind:value={filters.searchQuery}
        on:input={updateFilters}
        class="search-input"
      />
    </div>

    <!-- Filter dropdowns -->
    <div class="filter-group">
      <select bind:value={filters.selectedYard} on:change={updateFilters} class="filter-select">
        <option value="">All Yards</option>
        {#each filterOptions.allYards as yard}
          <option value={yard.id}>{yard.name}</option>
        {/each}
      </select>

      <select bind:value={filters.selectedTruck} on:change={updateFilters} class="filter-select">
        <option value="">All Trucks</option>
        {#each filterOptions.allTrucks as truck}
          <option value={truck.id}>{truck.id} - {truck.model}</option>
        {/each}
      </select>

      <select bind:value={filters.selectedDriver} on:change={updateFilters} class="filter-select">
        <option value="">All Drivers</option>
        {#each filterOptions.uniqueDrivers as driver}
          <option value={driver}>{driver}</option>
        {/each}
      </select>

      <select bind:value={filters.selectedStatus} on:change={updateFilters} class="filter-select">
        <option value="">All Statuses</option>
        {#each filterOptions.uniqueStatuses as status}
          <option value={status}>{status}</option>
        {/each}
      </select>

      {#if hasActiveFilters}
        <button class="clear-filters-btn" on:click={clearFilters}>
          Clear Filters
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .filters-section {
    @apply px-6 pb-4;
  }

  .filter-row {
    @apply flex flex-col lg:flex-row gap-4;
  }

  .search-box {
    @apply relative flex-1;
  }

  .search-icon {
    @apply absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400;
  }

  .search-input {
    @apply w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500;
  }

  .filter-group {
    @apply flex items-center gap-3 flex-wrap;
  }

  .filter-select {
    @apply px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm;
  }

  .clear-filters-btn {
    @apply px-3 py-2 text-sm text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors;
  }
</style> 