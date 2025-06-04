<script lang="ts">
  import { Thermometer } from 'lucide-svelte';
  import { formatDateTime, formatTemperature } from './job-ticket-formatters';
  import type { TemperatureData } from './job-ticket.types';

  export let temperature: TemperatureData;
</script>

<section class="info-section">
  <h2><Thermometer size={18} /> Temperature Monitoring</h2>
  <div class="temperature-grid">
    <div class="temp-card">
      <h3>Onload Temperature</h3>
      <div class="temp-readings">
        <div class="temp-item">
          <label>Product Temperature</label>
          <span class="temp-value">{formatTemperature(temperature.onload.product)}</span>
        </div>
        <div class="temp-item">
          <label>Ambient Temperature</label>
          <span class="temp-value">{formatTemperature(temperature.onload.ambient)}</span>
        </div>
        <div class="temp-item">
          <label>Recorded At</label>
          <span class="timestamp">{formatDateTime(temperature.onload.timestamp)}</span>
        </div>
      </div>
    </div>
    
    <div class="temp-card current">
      <h3>Current Temperature</h3>
      <div class="temp-readings">
        <div class="temp-item">
          <label>Product Temperature</label>
          <span class="temp-value current-temp">{formatTemperature(temperature.current.product)}</span>
        </div>
        <div class="temp-item">
          <label>Ambient Temperature</label>
          <span class="temp-value">{formatTemperature(temperature.current.ambient)}</span>
        </div>
        <div class="temp-item">
          <label>Last Update</label>
          <span class="timestamp">{formatDateTime(temperature.current.timestamp)}</span>
        </div>
      </div>
    </div>
    
    <div class="temp-card">
      <h3>Offload Temperature</h3>
      <div class="temp-readings">
        <div class="temp-item">
          <label>Product Temperature</label>
          <span class="temp-value">{formatTemperature(temperature.offload.product)}</span>
        </div>
        <div class="temp-item">
          <label>Ambient Temperature</label>
          <span class="temp-value">{formatTemperature(temperature.offload.ambient)}</span>
        </div>
        <div class="temp-item">
          <label>Recorded At</label>
          <span class="timestamp">{formatDateTime(temperature.offload.timestamp)}</span>
        </div>
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

  .temperature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .temp-card {
    background: white;
    border: 1px solid rgba(226, 232, 240, 0.8);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .temp-card.current {
    border-left: 4px solid #059669;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  }

  .temp-card h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: #334155;
  }

  .temp-readings {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .temp-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .temp-item label {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .temp-value {
    font-size: 16px !important;
    font-weight: 600 !important;
    font-family: 'JetBrains Mono', monospace;
    color: #059669 !important;
  }

  .current-temp {
    font-size: 18px !important;
    color: #047857 !important;
  }

  .timestamp {
    font-size: 12px !important;
    color: #64748b !important;
    font-family: 'JetBrains Mono', monospace;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .temperature-grid {
      grid-template-columns: 1fr;
    }
  }
</style> 