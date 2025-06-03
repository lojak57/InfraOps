<script lang="ts">
  import { formatCurrency } from './optimization-utils';
  import type { FleetStats } from './optimization.types';

  export let fleetStats: FleetStats;
  export let animatedCalibrationsAvoided: number;
  export let animatedMoneySaved: number;
</script>

<div class="counters-section">
  <div class="counter-card avoided">
    <div class="counter-icon">❌</div>
    <div class="counter-content">
      <div class="counter-label">Calibrations Avoided</div>
      <div class="counter-value">{animatedCalibrationsAvoided.toLocaleString()}</div>
      <div class="counter-sublabel">This month</div>
    </div>
    <div class="counter-trend positive">
      <span class="trend-icon">📈</span>
      <span class="trend-text">+{fleetStats.calibrationsAvoided}</span>
    </div>
  </div>

  <div class="counter-card savings">
    <div class="counter-icon">💰</div>
    <div class="counter-content">
      <div class="counter-label">Money Saved</div>
      <div class="counter-value">{formatCurrency(animatedMoneySaved)}</div>
      <div class="counter-sublabel">This month</div>
    </div>
    <div class="counter-trend positive">
      <span class="trend-icon">💸</span>
      <span class="trend-text">vs manual schedule</span>
    </div>
  </div>

  <div class="counter-card efficiency">
    <div class="counter-icon">⚡</div>
    <div class="counter-content">
      <div class="counter-label">Fleet Efficiency</div>
      <div class="counter-value">{((fleetStats.good / fleetStats.total) * 100).toFixed(1)}%</div>
      <div class="counter-sublabel">Trucks in optimal range</div>
    </div>
    <div class="counter-trend {(fleetStats.good / fleetStats.total) > 0.8 ? 'positive' : 'warning'}">
      <span class="trend-icon">{(fleetStats.good / fleetStats.total) > 0.8 ? '✅' : '⚠️'}</span>
      <span class="trend-text">{fleetStats.good}/{fleetStats.total} trucks</span>
    </div>
  </div>
</div>

<style>
  .counters-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 20px;
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  }

  .counter-card {
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .counter-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .counter-card.avoided {
    border-left: 4px solid #ef4444;
  }

  .counter-card.savings {
    border-left: 4px solid #22c55e;
  }

  .counter-card.efficiency {
    border-left: 4px solid #3b82f6;
  }

  .counter-icon {
    font-size: 24px;
    margin-bottom: 12px;
  }

  .counter-label {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 6px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .counter-value {
    font-size: 28px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 4px;
    font-family: 'JetBrains Mono', monospace;
  }

  .counter-sublabel {
    font-size: 11px;
    color: #94a3b8;
    margin-bottom: 8px;
  }

  .counter-trend {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 500;
  }

  .counter-trend.positive {
    color: #16a34a;
  }

  .counter-trend.warning {
    color: #d97706;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .counters-section {
      grid-template-columns: 1fr;
    }
  }
</style> 