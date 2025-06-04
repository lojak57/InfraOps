<script lang="ts">
  import { Shield, CheckCircle, AlertTriangle } from 'lucide-svelte';
  import { formatDateTime } from './job-ticket-formatters';
  import { getSafetyStatus } from './job-ticket-safety-utils';
  import type { SafetyData } from './job-ticket.types';

  export let safety: SafetyData;
</script>

<section class="info-section">
  <h2><Shield size={18} /> Safety & Compliance</h2>
  <div class="safety-grid">
    <div class="detail-card">
      <h3>Pre-Trip Inspection</h3>
      <div class="safety-status">
        {#if safety.preTrip.completed}
          <div class="status-indicator completed">
            <CheckCircle size={20} />
            <span>Completed</span>
          </div>
        {:else}
          <div class="status-indicator pending">
            <AlertTriangle size={20} />
            <span>Pending</span>
          </div>
        {/if}
        <div class="detail-grid">
          <div class="detail-item">
            <label>Inspector</label>
            <span>{safety.preTrip.inspector}</span>
          </div>
          <div class="detail-item">
            <label>Completed At</label>
            <span>{formatDateTime(safety.preTrip.timestamp)}</span>
          </div>
          <div class="detail-item span-2">
            <label>Issues Found</label>
            <span>{safety.preTrip.issues.length === 0 ? 'None' : safety.preTrip.issues.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="detail-card">
      <h3>H₂S Monitoring</h3>
      <div class="gas-monitoring">
        {#if safety.h2sLevels.current !== null}
          {@const safetyStatus = getSafetyStatus(safety.h2sLevels.current, safety.h2sLevels.alarm, safety.h2sLevels.critical)}
          <div class="gas-level" style="color: {safetyStatus.color};">
            <span class="level-value">{safety.h2sLevels.current.toFixed(1)}</span>
            <span class="level-unit">PPM</span>
            <span class="level-status">{safetyStatus.status.toUpperCase()}</span>
          </div>
        {/if}
        <div class="level-thresholds">
          <div class="threshold-item">
            <label>Alarm Level</label>
            <span>{safety.h2sLevels.alarm} PPM</span>
          </div>
          <div class="threshold-item">
            <label>Critical Level</label>
            <span>{safety.h2sLevels.critical} PPM</span>
          </div>
          <div class="threshold-item">
            <label>Max Recorded</label>
            <span>{safety.h2sLevels.max} PPM</span>
          </div>
          <div class="threshold-item">
            <label>Last Reading</label>
            <span>{formatDateTime(safety.h2sLevels.lastReading)}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="detail-card">
      <h3>Gas Detection System</h3>
      <div class="gas-grid">
        <div class="gas-item">
          <label>LEL</label>
          <span class="gas-value">{safety.gasDetection.lel}%</span>
        </div>
        <div class="gas-item">
          <label>CO</label>
          <span class="gas-value">{safety.gasDetection.co} PPM</span>
        </div>
        <div class="gas-item">
          <label>O₂</label>
          <span class="gas-value">{safety.gasDetection.o2}%</span>
        </div>
        <div class="gas-item span-3">
          <label>Last Calibrated</label>
          <span>{formatDateTime(safety.gasDetection.lastCalibrated)}</span>
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

  .safety-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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

  .detail-item.span-3 {
    grid-column: span 3;
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

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding: 8px 12px;
    border-radius: 8px;
    font-weight: 500;
  }

  .status-indicator.completed {
    background: #dcfce7;
    color: #166534;
  }

  .status-indicator.pending {
    background: #fef3c7;
    color: #92400e;
  }

  .gas-level {
    text-align: center;
    margin-bottom: 16px;
  }

  .level-value {
    font-size: 32px;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
  }

  .level-unit {
    font-size: 14px;
    font-weight: 500;
    margin-left: 4px;
  }

  .level-status {
    display: block;
    font-size: 12px;
    font-weight: 600;
    margin-top: 4px;
    letter-spacing: 0.5px;
  }

  .level-thresholds {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .threshold-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .threshold-item label {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .gas-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
  }

  .gas-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: center;
  }

  .gas-item label {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .gas-value {
    font-size: 16px !important;
    font-weight: 600 !important;
    font-family: 'JetBrains Mono', monospace;
    color: #059669 !important;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .safety-grid {
      grid-template-columns: 1fr;
    }
    
    .detail-grid {
      grid-template-columns: 1fr;
    }
    
    .detail-item.span-2,
    .detail-item.span-3 {
      grid-column: span 1;
    }
    
    .gas-grid {
      grid-template-columns: 1fr;
    }
    
    .level-thresholds {
      grid-template-columns: 1fr;
    }
  }
</style> 