<script lang="ts">
  import RealtimeChart from '$lib/components/charts/RealtimeChart.svelte';
  import { getIncidentTypeColor } from './safety-analytics-utils';
  import type { SafetyIncidents } from './safety-analytics.types';
  import { createEventDispatcher } from 'svelte';

  export let incidents: SafetyIncidents;

  const dispatch = createEventDispatcher();

  function openIncidentDetails(type: string) {
    dispatch('openIncidentDetails', { type });
  }
</script>

<div class="incidents-section">
  <h2 class="text-xl font-semibold text-slate-800 mb-6">Incident Analysis (Last 90 Days)</h2>
  <div class="incidents-overview">
    <div class="incident-summary">
      <div class="incident-card minor" on:click={() => openIncidentDetails('minor')}>
        <div class="incident-count font-mono text-3xl font-bold {getIncidentTypeColor('minor')}">{incidents.minor}</div>
        <div class="incident-type text-base font-semibold text-slate-800">Minor Incidents</div>
        <div class="incident-desc text-sm text-slate-600">Equipment scratches, minor delays</div>
      </div>
      <div class="incident-card major" on:click={() => openIncidentDetails('major')}>
        <div class="incident-count font-mono text-3xl font-bold {getIncidentTypeColor('major')}">{incidents.major}</div>
        <div class="incident-type text-base font-semibold text-slate-800">Major Incident</div>
        <div class="incident-desc text-sm text-slate-600">Vehicle breakdown requiring tow</div>
      </div>
      <div class="incident-card critical" on:click={() => openIncidentDetails('critical')}>
        <div class="incident-count font-mono text-3xl font-bold {getIncidentTypeColor('critical')}">{incidents.critical}</div>
        <div class="incident-type text-base font-semibold text-slate-800">Critical Incidents</div>
        <div class="incident-desc text-sm text-slate-600">No safety-related injuries</div>
      </div>
    </div>
    <div class="incident-chart">
      <RealtimeChart 
        title="Incident Trends (12 Months)"
        color="#EF4444"
        height={350}
        unit="incidents"
        animated={true}
      />
    </div>
  </div>
</div>

<style>
  .incidents-section {
    margin-bottom: 40px;
  }

  .incidents-overview {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: stretch;
  }

  .incident-summary {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .incident-card {
    padding: 20px;
    border-radius: 12px;
    border-left: 4px solid;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    background: white;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .incident-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(30, 64, 175, 0.2);
    border-color: #3B82F6;
    border-left-color: #1E40AF !important;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(30, 64, 175, 0.05) 100%);
  }

  .incident-card:active {
    transform: translateY(-1px);
  }

  .incident-card::after {
    content: "Click for details →";
    position: absolute;
    bottom: 8px;
    right: 12px;
    font-size: 10px;
    color: #64748b;
    opacity: 0;
    transition: all 0.3s ease;
    font-weight: 500;
  }

  .incident-card:hover::after {
    opacity: 1;
    color: #1E40AF;
    font-weight: 600;
  }

  .incident-card.minor {
    border-left-color: #f59e0b;
  }

  .incident-card.major {
    border-left-color: #ef4444;
  }

  .incident-card.critical {
    border-left-color: #10b981;
  }

  .incident-chart {
    min-height: 500px;
    background: #1a1a1a;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }

  .incident-chart :global(.chart-container) {
    flex: 1;
    min-height: 450px;
  }

  @media (max-width: 768px) {
    .incidents-overview {
      grid-template-columns: 1fr;
    }
  }
</style> 