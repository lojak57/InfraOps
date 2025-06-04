<script lang="ts">
  import { Gauge } from 'lucide-svelte';
  import { formatVolume } from './job-ticket-formatters';
  import type { MeasurementsData } from './job-ticket.types';

  export let measurements: MeasurementsData;
</script>

<section class="info-section">
  <h2><Gauge size={18} /> Volume & Measurements</h2>
  <div class="measurements-grid">
    <div class="detail-card">
      <h3>Gross Volume</h3>
      <div class="measurement-row">
        <div class="measurement-item">
          <label>Onload</label>
          <span class="volume-value">{formatVolume(measurements.gross.onload)}</span>
        </div>
        <div class="measurement-item">
          <label>Offload</label>
          <span class="volume-value">{formatVolume(measurements.gross.offload)}</span>
        </div>
        <div class="measurement-item">
          <label>Net</label>
          <span class="volume-value">{formatVolume(measurements.gross.net ?? null)}</span>
        </div>
      </div>
    </div>
    
    <div class="detail-card">
      <h3>Net Volume</h3>
      <div class="measurement-row">
        <div class="measurement-item">
          <label>Onload</label>
          <span class="volume-value">{formatVolume(measurements.net.onload)}</span>
        </div>
        <div class="measurement-item">
          <label>Offload</label>
          <span class="volume-value">{formatVolume(measurements.net.offload)}</span>
        </div>
        <div class="measurement-item">
          <label>Delivered</label>
          <span class="volume-value">{formatVolume(measurements.net.delivered ?? null)}</span>
        </div>
      </div>
    </div>
    
    <div class="detail-card loss-analysis">
      <h3>Loss Analysis</h3>
      <div class="loss-grid">
        <div class="loss-item">
          <label>Absolute Loss</label>
          <span class="loss-value">{formatVolume(measurements.loss.absolute)}</span>
        </div>
        <div class="loss-item">
          <label>Percentage Loss</label>
          <span class="loss-percentage">{measurements.loss.percentage.toFixed(3)}%</span>
        </div>
        <div class="loss-item">
          <label>Expected Loss</label>
          <span class="expected-loss">{formatVolume(measurements.loss.expectedLoss)}</span>
        </div>
        <div class="loss-item">
          <label>Variance</label>
          <span class="variance" class:over={measurements.loss.variance > 0} class:under={measurements.loss.variance < 0}>
            {measurements.loss.variance > 0 ? '+' : ''}{formatVolume(measurements.loss.variance)}
          </span>
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

  .measurements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

  .measurement-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  .measurement-item {
    text-align: center;
    flex: 1;
  }

  .measurement-item label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .volume-value {
    font-size: 18px !important;
    font-weight: 600 !important;
    color: #059669 !important;
    font-family: 'JetBrains Mono', monospace;
  }

  .loss-analysis {
    border-left: 4px solid #f59e0b;
  }

  .loss-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .loss-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: center;
  }

  .loss-item label {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .loss-value,
  .loss-percentage,
  .expected-loss {
    font-size: 16px !important;
    font-weight: 600 !important;
    font-family: 'JetBrains Mono', monospace;
  }

  .variance {
    font-size: 16px !important;
    font-weight: 600 !important;
    font-family: 'JetBrains Mono', monospace;
  }

  .variance.over {
    color: #dc2626 !important;
  }

  .variance.under {
    color: #059669 !important;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .measurements-grid {
      grid-template-columns: 1fr;
    }
    
    .measurement-row {
      flex-direction: column;
      gap: 12px;
    }
  }
</style> 