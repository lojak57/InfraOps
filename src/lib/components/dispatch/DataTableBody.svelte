<script lang="ts">
  import { 
    SortAsc, 
    SortDesc,
    Eye,
    AlertTriangle,
    CheckCircle,
    Clock,
    Calendar,
    Search
  } from 'lucide-svelte';
  import { format } from 'date-fns';
  import { createEventDispatcher } from 'svelte';
  import type { DemoJobData } from '$lib/stores/dispatchAnalytics';
  import type { TableSorting } from './raw-data-table.types';
  import { formatCurrency, formatNumber } from './raw-data-table-formatters';
  import { getStatusStyle } from './raw-data-table-utils';

  export let jobs: DemoJobData[];
  export let sorting: TableSorting;

  const dispatch = createEventDispatcher();

  function handleSort(field: keyof DemoJobData) {
    if (sorting.field === field) {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    } else {
      sorting.field = field;
      sorting.direction = 'desc';
    }
    dispatch('sortChanged', sorting);
  }

  function handleJobClick(jobId: string) {
    dispatch('jobClick', { jobId });
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'in-progress':
        return Clock;
      case 'scheduled':
        return Calendar;
      default:
        return Clock;
    }
  }
</script>

<div class="table-container">
  <table class="data-table">
    <thead>
      <tr>
        <th class="sortable" on:click={() => handleSort('id')}>
          <span class="th-content">
            Job ID
            {#if sorting.field === 'id'}
              <svelte:component this={sorting.direction === 'asc' ? SortAsc : SortDesc} class="w-3 h-3" />
            {/if}
          </span>
        </th>
        <th class="sortable" on:click={() => handleSort('truckId')}>
          <span class="th-content">
            Truck
            {#if sorting.field === 'truckId'}
              <svelte:component this={sorting.direction === 'asc' ? SortAsc : SortDesc} class="w-3 h-3" />
            {/if}
          </span>
        </th>
        <th class="sortable" on:click={() => handleSort('driverName')}>
          <span class="th-content">
            Driver
            {#if sorting.field === 'driverName'}
              <svelte:component this={sorting.direction === 'asc' ? SortAsc : SortDesc} class="w-3 h-3" />
            {/if}
          </span>
        </th>
        <th class="sortable" on:click={() => handleSort('customer')}>
          <span class="th-content">
            Customer
            {#if sorting.field === 'customer'}
              <svelte:component this={sorting.direction === 'asc' ? SortAsc : SortDesc} class="w-3 h-3" />
            {/if}
          </span>
        </th>
        <th class="sortable" on:click={() => handleSort('startTime')}>
          <span class="th-content">
            Start Time
            {#if sorting.field === 'startTime'}
              <svelte:component this={sorting.direction === 'asc' ? SortAsc : SortDesc} class="w-3 h-3" />
            {/if}
          </span>
        </th>
        <th class="sortable" on:click={() => handleSort('volumeLossPercent')}>
          <span class="th-content">
            Volume Loss %
            {#if sorting.field === 'volumeLossPercent'}
              <svelte:component this={sorting.direction === 'asc' ? SortAsc : SortDesc} class="w-3 h-3" />
            {/if}
          </span>
        </th>
        <th class="sortable" on:click={() => handleSort('efficiency')}>
          <span class="th-content">
            Efficiency %
            {#if sorting.field === 'efficiency'}
              <svelte:component this={sorting.direction === 'asc' ? SortAsc : SortDesc} class="w-3 h-3" />
            {/if}
          </span>
        </th>
        <th class="sortable" on:click={() => handleSort('revenue')}>
          <span class="th-content">
            Revenue
            {#if sorting.field === 'revenue'}
              <svelte:component this={sorting.direction === 'asc' ? SortAsc : SortDesc} class="w-3 h-3" />
            {/if}
          </span>
        </th>
        <th class="sortable" on:click={() => handleSort('status')}>
          <span class="th-content">
            Status
            {#if sorting.field === 'status'}
              <svelte:component this={sorting.direction === 'asc' ? SortAsc : SortDesc} class="w-3 h-3" />
            {/if}
          </span>
        </th>
        <th>Alerts</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each jobs as job (job.id)}
        <tr class="data-row clickable-row" on:click={() => handleJobClick(job.id)}>
          <td class="font-mono text-sm">{job.id}</td>
          <td class="font-mono font-medium">{job.truckId}</td>
          <td>{job.driverName}</td>
          <td>{job.customer}</td>
          <td class="font-mono text-sm">
            {format(job.startTime, 'MMM dd, HH:mm')}
          </td>
          <td class="text-right">
            <span class="volume-loss" class:high-loss={job.volumeLossPercent > 3}>
              {formatNumber(job.volumeLossPercent, 1)}%
            </span>
          </td>
          <td class="text-right">
            <span class="efficiency" class:low-efficiency={job.efficiency < 85}>
              {formatNumber(job.efficiency, 1)}%
            </span>
          </td>
          <td class="text-right font-mono">
            {formatCurrency(job.revenue)}
          </td>
          <td>
            <span class="status-badge {getStatusStyle(job.status)}">
              <svelte:component this={getStatusIcon(job.status)} class="w-3 h-3" />
              {job.status}
            </span>
          </td>
          <td>
            {#if job.alerts.length > 0}
              <span class="alerts-badge">
                <AlertTriangle class="w-3 h-3" />
                {job.alerts.length}
              </span>
            {:else}
              <span class="text-gray-400">—</span>
            {/if}
          </td>
          <td>
            <button class="action-btn" title="View Details" on:click|stopPropagation={() => handleJobClick(job.id)}>
              <Eye class="w-4 h-4" />
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if jobs.length === 0}
    <div class="empty-state">
      <Search class="w-12 h-12 text-gray-300" />
      <h3 class="empty-title">No job tickets found</h3>
      <p class="empty-description">
        Try adjusting your search criteria or clearing filters.
      </p>
    </div>
  {/if}
</div>

<style>
  .table-container {
    @apply flex-1 overflow-auto;
  }

  .data-table {
    @apply w-full min-w-max;
  }

  .data-table th {
    @apply px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 sticky top-0;
  }

  .data-table th.sortable {
    @apply cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors;
  }

  .th-content {
    @apply flex items-center gap-1;
  }

  .data-table td {
    @apply px-4 py-3 text-sm text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700;
  }

  .data-row {
    @apply border-b border-gray-100 dark:border-gray-700 transition-colors duration-150;
  }

  .clickable-row {
    @apply cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10;
  }

  .clickable-row:hover {
    @apply bg-blue-50 dark:bg-blue-900/10;
  }

  .volume-loss.high-loss {
    @apply text-red-600 dark:text-red-400 font-semibold;
  }

  .efficiency.low-efficiency {
    @apply text-yellow-600 dark:text-yellow-400 font-semibold;
  }

  .status-badge {
    @apply inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium;
  }

  .alerts-badge {
    @apply inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-full text-xs font-medium;
  }

  .action-btn {
    @apply p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors;
  }

  .empty-state {
    @apply flex flex-col items-center justify-center py-12 text-center;
  }

  .empty-title {
    @apply mt-4 text-lg font-medium text-gray-900 dark:text-white;
  }

  .empty-description {
    @apply mt-2 text-sm text-gray-500 dark:text-gray-400;
  }

  @media (max-width: 768px) {
    .data-table {
      @apply text-xs;
    }

    .data-table th,
    .data-table td {
      @apply px-2 py-2;
    }
  }
</style> 