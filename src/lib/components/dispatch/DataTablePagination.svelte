<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { TablePagination } from './raw-data-table.types';

  export let pagination: TablePagination;

  const dispatch = createEventDispatcher();

  function goToPage(page: number) {
    pagination.currentPage = page;
    dispatch('pageChanged', pagination);
  }

  function goToFirst() {
    goToPage(1);
  }

  function goToPrevious() {
    if (pagination.currentPage > 1) {
      goToPage(pagination.currentPage - 1);
    }
  }

  function goToNext() {
    if (pagination.currentPage < pagination.totalPages) {
      goToPage(pagination.currentPage + 1);
    }
  }

  function goToLast() {
    goToPage(pagination.totalPages);
  }

  $: startItem = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  $: endItem = Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems);

  $: visiblePages = (() => {
    const pages = [];
    const start = Math.max(1, pagination.currentPage - 2);
    const end = Math.min(pagination.totalPages, start + 4);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  })();
</script>

{#if pagination.totalPages > 1}
  <div class="pagination">
    <div class="pagination-info">
      Showing {startItem} to {endItem} of {pagination.totalItems} results
    </div>
    
    <div class="pagination-controls">
      <button 
        class="pagination-btn"
        disabled={pagination.currentPage === 1}
        on:click={goToFirst}
      >
        First
      </button>
      <button 
        class="pagination-btn"
        disabled={pagination.currentPage === 1}
        on:click={goToPrevious}
      >
        Previous
      </button>
      
      {#each visiblePages as page}
        <button 
          class="pagination-btn"
          class:active={page === pagination.currentPage}
          on:click={() => goToPage(page)}
        >
          {page}
        </button>
      {/each}
      
      <button 
        class="pagination-btn"
        disabled={pagination.currentPage === pagination.totalPages}
        on:click={goToNext}
      >
        Next
      </button>
      <button 
        class="pagination-btn"
        disabled={pagination.currentPage === pagination.totalPages}
        on:click={goToLast}
      >
        Last
      </button>
    </div>
  </div>
{/if}

<style>
  .pagination {
    @apply flex justify-between items-center px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700;
  }

  .pagination-info {
    @apply text-sm text-gray-500 dark:text-gray-400;
  }

  .pagination-controls {
    @apply flex items-center gap-2;
  }

  .pagination-btn {
    @apply px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .pagination-btn.active {
    @apply bg-orange-600 border-orange-600 text-white hover:bg-orange-700;
  }

  @media (max-width: 768px) {
    .pagination {
      @apply flex-col gap-4;
    }

    .pagination-controls {
      @apply justify-center;
    }
  }
</style> 