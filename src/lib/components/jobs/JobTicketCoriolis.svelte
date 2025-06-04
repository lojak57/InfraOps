<script lang="ts">
  import { Gauge, AlertTriangle } from 'lucide-svelte';
  import { formatDateTime, formatVolume, formatTemperature } from './job-ticket-formatters';
  import type { CoriolisData } from './job-ticket.types';

  export let coriolis: CoriolisData;
</script>

<section class="info-section">
  <h2><Gauge size={18} /> Coriolis Meter Data</h2>
  <div class="coriolis-grid">
    <div class="detail-card">
      <h3>Onload Measurements</h3>
      <div class="coriolis-data">
        <div class="detail-grid">
          <div class="detail-item">
            <label>Meter ID</label>
            <span>{coriolis.onload.meterId}</span>
          </div>
          <div class="detail-item">
            <label>Operator</label>
            <span>{coriolis.onload.operator}</span>
          </div>
          <div class="detail-item">
            <label>Gross Volume</label>
            <span>{formatVolume(coriolis.onload.grossVolume)}</span>
          </div>
          <div class="detail-item">
            <label>Net Volume</label>
            <span>{formatVolume(coriolis.onload.netVolume)}</span>
          </div>
          <div class="detail-item">
            <label>Density</label>
            <span>{coriolis.onload.density} g/cm³</span>
          </div>
          <div class="detail-item">
            <label>Temperature</label>
            <span>{formatTemperature(coriolis.onload.temperature)}</span>
          </div>
          <div class="detail-item">
            <label>Pressure</label>
            <span>{coriolis.onload.pressure} PSI</span>
          </div>
          <div class="detail-item">
            <label>Mass Flow</label>
            <span>{coriolis.onload.massFlow} kg/min</span>
          </div>
          <div class="detail-item span-2">
            <label>Timestamp</label>
            <span>{formatDateTime(coriolis.onload.timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="detail-card">
      <h3>Offload Measurements</h3>
      <div class="coriolis-data">
        {#if coriolis.offload.meterId}
          <div class="detail-grid">
            <div class="detail-item">
              <label>Meter ID</label>
              <span>{coriolis.offload.meterId}</span>
            </div>
            <div class="detail-item">
              <label>Operator</label>
              <span>{coriolis.offload.operator ?? 'Not recorded'}</span>
            </div>
            <div class="detail-item">
              <label>Gross Volume</label>
              <span>{formatVolume(coriolis.offload.grossVolume ?? null)}</span>
            </div>
            <div class="detail-item">
              <label>Net Volume</label>
              <span>{formatVolume(coriolis.offload.netVolume ?? null)}</span>
            </div>
            <div class="detail-item">
              <label>Density</label>
              <span>{coriolis.offload.density ?? 'Not recorded'} g/cm³</span>
            </div>
            <div class="detail-item">
              <label>Temperature</label>
              <span>{formatTemperature(coriolis.offload.temperature ?? null)}</span>
            </div>
            <div class="detail-item">
              <label>Pressure</label>
              <span>{coriolis.offload.pressure ?? 'Not recorded'} PSI</span>
            </div>
            <div class="detail-item">
              <label>Mass Flow</label>
              <span>{coriolis.offload.massFlow ?? 'Not recorded'} kg/min</span>
            </div>
            <div class="detail-item span-2">
              <label>Timestamp</label>
              <span>{formatDateTime(coriolis.offload.timestamp ?? null)}</span>
            </div>
          </div>
        {:else}
          <div class="pending-data">
            <AlertTriangle size={24} color="#f59e0b" />
            <p>Offload measurements not recorded yet</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .info-section {
    background: rgba(248, 250, 252, 0.8);
    border: 1px solid rgba(226, 232, 240, 0.8);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 24px;
  }

  .info-section h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 20px 0;
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
  }

  .coriolis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
  }

  .detail-card {
    background: white;
    border: 1px solid rgba(226, 232, 240, 0.8);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .detail-card h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: #334155;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .detail-item.span-2 {
    grid-column: span 2;
  }

  .detail-item label {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .detail-item span {
    font-size: 14px;
    font-weight: 500;
    color: #1e293b;
  }

  .pending-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 40px 20px;
    color: #64748b;
    text-align: center;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .coriolis-grid {
      grid-template-columns: 1fr;
    }
    
    .detail-grid {
      grid-template-columns: 1fr;
    }
    
    .detail-item.span-2 {
      grid-column: span 1;
    }
  }
</style> 