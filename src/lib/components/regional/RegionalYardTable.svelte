<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ChevronDown, ChevronUp } from 'lucide-svelte';
  import type { YardData, SortState } from './regional-yard.types';
  import { 
    getStatusInfo, getTrendIcon, getTrendColor, getPerformanceColor, 
    getRankColor, generateSparklineSVG, sortYardData 
  } from './regional-yard-utils';

  export let yardData: YardData[];

  const dispatch = createEventDispatcher<{
    sort: { yardData: YardData[] };
  }>();

  let sortState: SortState = {
    column: 'yardName',
    direction: 'asc'
  };

  function handleSort(column: keyof YardData) {
    if (sortState.column === column) {
      sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      sortState.column = column;
      sortState.direction = 'desc';
    }

    const sortedData = sortYardData(yardData, sortState.column, sortState.direction);
    dispatch('sort', { yardData: sortedData });
  }
</script>

<div class="table-container">
  <table class="comparison-table">
    <thead>
      <tr>
        <th>Rank</th>
        <th>
          <button on:click={() => handleSort('yardName')} class="sort-button">
            Yard Name
            {#if sortState.column === 'yardName'}
              {#if sortState.direction === 'asc'}<ChevronUp size={16} />{:else}<ChevronDown size={16} />{/if}
            {/if}
          </button>
        </th>
        <th>
          <button on:click={() => handleSort('fleetSize')} class="sort-button">
            Fleet Size
            {#if sortState.column === 'fleetSize'}
              {#if sortState.direction === 'asc'}<ChevronUp size={16} />{:else}<ChevronDown size={16} />{/if}
            {/if}
          </button>
        </th>
        <th>
          <button on:click={() => handleSort('activeTrucks')} class="sort-button">
            Active Trucks
            {#if sortState.column === 'activeTrucks'}
              {#if sortState.direction === 'asc'}<ChevronUp size={16} />{:else}<ChevronDown size={16} />{/if}
            {/if}
          </button>
        </th>
        <th>
          <button on:click={() => handleSort('driversAssigned')} class="sort-button">
            Drivers Assigned
            {#if sortState.column === 'driversAssigned'}
              {#if sortState.direction === 'asc'}<ChevronUp size={16} />{:else}<ChevronDown size={16} />{/if}
            {/if}
          </button>
        </th>
        <th>
          <button on:click={() => handleSort('totalBPD')} class="sort-button">
            Total BPD
            {#if sortState.column === 'totalBPD'}
              {#if sortState.direction === 'asc'}<ChevronUp size={16} />{:else}<ChevronDown size={16} />{/if}
            {/if}
          </button>
        </th>
        <th>
          <button on:click={() => handleSort('avgDriveTime')} class="sort-button">
            Avg Drive Time
            {#if sortState.column === 'avgDriveTime'}
              {#if sortState.direction === 'asc'}<ChevronUp size={16} />{:else}<ChevronDown size={16} />{/if}
            {/if}
          </button>
        </th>
        <th>
          <button on:click={() => handleSort('unitsPerHour')} class="sort-button">
            Units per Hour
            {#if sortState.column === 'unitsPerHour'}
              {#if sortState.direction === 'asc'}<ChevronUp size={16} />{:else}<ChevronDown size={16} />{/if}
            {/if}
          </button>
        </th>
        <th>Status</th>
        <th>Trend</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      {#each yardData as yard}
        <tr class="yard-row">
          <td class="rank-cell">
            <div class="rank-badge {getRankColor(yard.rank, yard.status)}">
              {yard.rank}
            </div>
          </td>
          <td class="yard-cell">
            <div class="yard-info">
              <div class="yard-name">{yard.yardName}</div>
              <div class="yard-location">{yard.location}</div>
            </div>
          </td>
          <td class="metric-cell">{yard.fleetSize}</td>
          <td class="metric-cell {getPerformanceColor(yard.utilizationRate, 'utilization')}">
            {yard.activeTrucks}
          </td>
          <td class="metric-cell">{yard.driversAssigned}</td>
          <td class="metric-cell {getPerformanceColor(yard.totalBPD, 'bpd')}">
            {yard.totalBPD.toLocaleString()}
          </td>
          <td class="metric-cell">
            {yard.avgDriveTime}h
          </td>
          <td class="metric-cell {getPerformanceColor(yard.unitsPerHour, 'bph')}">
            {yard.unitsPerHour}
          </td>
          <td class="status-cell">
            <div class="status-container {getStatusInfo(yard.status).bgColor}">
              <svelte:component this={getStatusInfo(yard.status).icon} size={16} class={getStatusInfo(yard.status).color} />
              <span class="{getStatusInfo(yard.status).color} font-medium">{yard.status.toUpperCase()}</span>
            </div>
          </td>
          <td class="trend-cell">
            <div class="trend-container {getTrendColor(yard.trend)}">
              {#if getTrendIcon(yard.trend)}
                <svelte:component this={getTrendIcon(yard.trend)} size={16} />
              {/if}
              <div class="sparkline-container">
                {@html generateSparklineSVG(yard.sparklineData)}
              </div>
            </div>
          </td>
          <td class="notes-cell">{yard.notes}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-container {
    flex: 1;
    overflow: auto;
    padding: 0 32px;
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  .comparison-table th {
    background: #f8fafc;
    padding: 16px 12px;
    text-align: left;
    font-weight: 600;
    color: #374151;
    border-bottom: 2px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .sort-button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 600;
    color: #374151;
    font-size: 14px;
  }

  .sort-button:hover {
    color: #475569;
  }

  .comparison-table td {
    padding: 16px 12px;
    border-bottom: 1px solid #f1f5f9;
  }

  .yard-row:hover {
    background: #fafbfc;
  }

  .rank-cell {
    text-align: center;
  }

  .rank-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-weight: 700;
    font-size: 14px;
  }

  .yard-cell {
    min-width: 200px;
  }

  .yard-info {
    display: flex;
    flex-direction: column;
  }

  .yard-name {
    font-weight: 600;
    color: #374151;
    margin-bottom: 2px;
  }

  .yard-location {
    font-size: 12px;
    color: #64748b;
  }

  .metric-cell {
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
  }

  .status-cell {
    min-width: 120px;
  }

  .status-container {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 12px;
  }

  .trend-cell {
    min-width: 100px;
  }

  .trend-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sparkline-container {
    opacity: 0.7;
  }

  .notes-cell {
    font-style: italic;
    color: #6b7280;
    min-width: 180px;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .table-container {
      padding: 0 20px;
    }

    .comparison-table {
      font-size: 12px;
    }

    .comparison-table th,
    .comparison-table td {
      padding: 12px 8px;
    }
  }
</style> 