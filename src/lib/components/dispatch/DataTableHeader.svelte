<script lang="ts">
  import { Download, Database } from 'lucide-svelte';
  import { format } from 'date-fns';
  import type { DemoJobData } from '$lib/stores/dispatchAnalytics';
  import { formatNumber, formatCurrency } from './raw-data-table-formatters';

  export let filteredJobsCount: number;
  export let totalJobsCount: number;
  export let filteredJobs: DemoJobData[];

  function exportToCSV() {
    const headers = [
      'Job ID', 'Truck ID', 'Driver', 'Customer', 'Origin', 'Destination',
      'Start Time', 'End Time', 'Duration (min)', 'Distance (mi)',
      'Onload Volume', 'Offload Volume', 'Volume Loss', 'Volume Loss %',
      'Avg Temp', 'Min Temp', 'Max Temp', 'Efficiency %', 'Revenue',
      'Fuel Cost', 'Status', 'Alerts', 'API Gravity', 'Water Cut', 'H2S Levels'
    ];

    const csvData = filteredJobs.map(job => [
      job.id,
      job.truckId,
      job.driverName,
      job.customer,
      job.origin,
      job.destination,
      format(job.startTime, 'yyyy-MM-dd HH:mm:ss'),
      job.endTime ? format(job.endTime, 'yyyy-MM-dd HH:mm:ss') : '',
      job.duration,
      job.distance,
      job.onloadVolume.toFixed(2),
      job.offloadVolume.toFixed(2),
      job.volumeLoss.toFixed(2),
      job.volumeLossPercent.toFixed(2),
      job.avgTemp.toFixed(1),
      job.minTemp.toFixed(1),
      job.maxTemp.toFixed(1),
      job.efficiency.toFixed(1),
      job.revenue.toFixed(2),
      job.fuelCost.toFixed(2),
      job.status,
      job.alerts.length,
      job.apiGravity.toFixed(1),
      job.waterCut.toFixed(2),
      job.h2sLevels.toFixed(2)
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    // Mock download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-tickets-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
</script>

<div class="table-header">
  <div class="header-content">
    <div class="title-section">
      <h2 class="table-title">
        <Database class="w-5 h-5" />
        Raw Job Ticket Data
      </h2>
      <p class="table-subtitle">
        {filteredJobsCount} of {totalJobsCount} job tickets • Click any row to view detailed data
      </p>
    </div>

    <div class="header-actions">
      <button 
        class="export-btn"
        on:click={exportToCSV}
        title="Export filtered data to CSV"
      >
        <Download class="w-4 h-4" />
        Export CSV
      </button>
    </div>
  </div>
</div>

<style>
  .table-header {
    @apply border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900;
  }

  .header-content {
    @apply flex justify-between items-center p-6;
  }

  .title-section {
    @apply flex flex-col gap-1;
  }

  .table-title {
    @apply flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white;
  }

  .table-subtitle {
    @apply text-sm text-gray-500 dark:text-gray-400;
  }

  .header-actions {
    @apply flex items-center gap-3;
  }

  .export-btn {
    @apply flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors;
  }

  @media (max-width: 768px) {
    .header-content {
      @apply flex-col gap-4 items-start;
    }
  }
</style> 