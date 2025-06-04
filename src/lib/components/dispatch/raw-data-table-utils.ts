import type { DemoJobData } from '$lib/stores/dispatchAnalytics';
import type { TableFilters, TableSorting } from './raw-data-table.types';

export function filterJobs(
  jobs: DemoJobData[], 
  filters: TableFilters, 
  allTrucks: Array<{ id: string; yardId: string }>
): DemoJobData[] {
  return jobs.filter(job => {
    const matchesSearch = !filters.searchQuery || 
      job.id.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      job.truckId.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      job.driverName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      job.customer.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      job.origin.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      job.destination.toLowerCase().includes(filters.searchQuery.toLowerCase());

    const matchesYard = !filters.selectedYard || 
      allTrucks.find(t => t.id === job.truckId)?.yardId === filters.selectedYard;

    const matchesTruck = !filters.selectedTruck || job.truckId === filters.selectedTruck;
    const matchesDriver = !filters.selectedDriver || job.driverName === filters.selectedDriver;
    const matchesStatus = !filters.selectedStatus || job.status === filters.selectedStatus;

    return matchesSearch && matchesYard && matchesTruck && matchesDriver && matchesStatus;
  });
}

export function sortJobs(jobs: DemoJobData[], sorting: TableSorting): DemoJobData[] {
  return [...jobs].sort((a, b) => {
    let aVal = a[sorting.field];
    let bVal = b[sorting.field];

    // Handle null/undefined values
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return sorting.direction === 'asc' ? -1 : 1;
    if (bVal == null) return sorting.direction === 'asc' ? 1 : -1;

    // Handle dates
    if (aVal instanceof Date && bVal instanceof Date) {
      aVal = aVal.getTime();
      bVal = bVal.getTime();
    }

    // Handle strings
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (sorting.direction === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });
}

export function paginateJobs(jobs: DemoJobData[], currentPage: number, itemsPerPage: number): DemoJobData[] {
  return jobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
}

export function getUniqueDrivers(jobs: DemoJobData[]): string[] {
  return [...new Set(jobs.map(h => h.driverName))].sort();
}

export function getUniqueStatuses(jobs: DemoJobData[]): string[] {
  return [...new Set(jobs.map(h => h.status))];
}

export function getStatusStyle(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'scheduled':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
} 