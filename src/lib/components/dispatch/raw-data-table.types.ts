import type { DemoJobData } from '$lib/stores/dispatchAnalytics';

export interface TableFilters {
  searchQuery: string;
  selectedYard: string;
  selectedTruck: string;
  selectedDriver: string;
  selectedStatus: string;
}

export interface TableSorting {
  field: keyof DemoJobData;
  direction: 'asc' | 'desc';
}

export interface TablePagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface FilterOptions {
  uniqueDrivers: string[];
  uniqueStatuses: string[];
  allYards: Array<{ id: string; name: string }>;
  allTrucks: Array<{ id: string; model: string; yardId: string }>;
}

export interface TableState {
  filters: TableFilters;
  sorting: TableSorting;
  pagination: TablePagination;
} 