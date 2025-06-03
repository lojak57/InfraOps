<!--
  Adaptive Metric Card Component
  
  Industry-agnostic metric card that automatically adapts terminology,
  units, and styling based on platform configuration.
-->

<script lang="ts">
  import { platformConfig } from '$lib/core/config/platform.config';
  
  // Props
  export let title: string;
  export let value: number | string;
  export let metricType: 'primary' | 'secondary' | 'custom' = 'custom';
  export let status: 'normal' | 'warning' | 'critical' | 'excellent' = 'normal';
  export let trend: 'up' | 'down' | 'stable' = 'stable';
  export let trendValue: string = '';
  export let icon: string = '📊';
  export let showUnits: boolean = true;
  export let customUnit: string = '';
  
  // Get platform configuration
  $: profile = platformConfig.getProfile();
  $: terminology = profile.terminology;
  $: units = profile.units;
  $: branding = profile.branding;
  
  // Determine unit to display
  $: displayUnit = (() => {
    if (customUnit && customUnit.length > 0) return customUnit;
    if (!showUnits) return '';
    
    switch (metricType) {
      case 'primary':
        return title.toLowerCase().includes('volume') || title.toLowerCase().includes('gallons') || title.toLowerCase().includes('units')
          ? units.volume
          : units.time;
      case 'secondary':
        return title.toLowerCase().includes('pressure') 
          ? units.pressure 
          : title.toLowerCase().includes('temp')
          ? units.temperature
          : '';
      default:
        return '';
    }
  })();
  
  // Determine status styling based on branding
  $: statusStyle = (() => {
    const baseStyle = `
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    `;
    
    switch (status) {
      case 'excellent':
        return `${baseStyle} background: linear-gradient(135deg, ${branding.primaryColor}15 0%, ${branding.primaryColor}25 100%); border: 2px solid ${branding.primaryColor}40;`;
      case 'normal':
        return `${baseStyle} background: var(--card); border: 1px solid var(--border);`;
      case 'warning':
        return `${baseStyle} background: linear-gradient(135deg, #F59E0B15 0%, #F59E0B25 100%); border: 2px solid #F59E0B40;`;
      case 'critical':
        return `${baseStyle} background: linear-gradient(135deg, #EF444415 0%, #EF444425 100%); border: 2px solid #EF444440;`;
      default:
        return `${baseStyle} background: var(--card); border: 1px solid var(--border);`;
    }
  })();
  
  // Trend indicator
  $: trendIcon = (() => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  })();
  
  $: trendColor = (() => {
    switch (trend) {
      case 'up': return branding.primaryColor;
      case 'down': return '#EF4444';
      case 'stable': return 'var(--muted-foreground)';
      default: return 'var(--muted-foreground)';
    }
  })();
</script>

<div class="metric-card" style={statusStyle}>
  <!-- Header -->
  <div class="metric-header">
    <div class="metric-icon" style="color: {branding.primaryColor};">
      {icon}
    </div>
    <div class="metric-status {status}">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  </div>
  
  <!-- Main Value -->
  <div class="metric-main">
    <div class="metric-value" style="color: {status === 'excellent' ? branding.primaryColor : 'var(--foreground)'};">
      {typeof value === 'number' ? value.toLocaleString() : value}
      {#if displayUnit}
        <span class="metric-unit">{displayUnit}</span>
      {/if}
    </div>
    <div class="metric-title">{title}</div>
  </div>
  
  <!-- Trend -->
  {#if trendValue}
    <div class="metric-trend">
      <span class="trend-icon">{trendIcon}</span>
      <span class="trend-value" style="color: {trendColor};">
        {trendValue}
      </span>
    </div>
  {/if}
  
  <!-- Industry-specific indicator -->
  <div class="industry-indicator">
    <div class="indicator-dot" style="background-color: {branding.primaryColor};"></div>
    <span class="indicator-text">{profile.name}</span>
  </div>
</div>

<style>
  .metric-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  }
  
  .metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .metric-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .metric-icon {
    font-size: 1.5rem;
  }
  
  .metric-status {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .metric-status.excellent {
    background-color: var(--success-light);
    color: var(--success-dark);
  }
  
  .metric-status.normal {
    background-color: var(--primary-light);
    color: var(--primary-dark);
  }
  
  .metric-status.warning {
    background-color: var(--warning-light);
    color: var(--warning-dark);
  }
  
  .metric-status.critical {
    background-color: var(--error-light);
    color: var(--error-dark);
  }
  
  .metric-main {
    text-align: center;
  }
  
  .metric-value {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  
  .metric-unit {
    font-size: 1rem;
    font-weight: 500;
    color: var(--muted-foreground);
    margin-left: 0.5rem;
  }
  
  .metric-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--foreground);
    line-height: 1.2;
  }
  
  .metric-trend {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: var(--muted);
    border-radius: 0.5rem;
  }
  
  .trend-icon {
    font-size: 0.875rem;
  }
  
  .trend-value {
    font-size: 0.875rem;
    font-weight: 600;
  }
  
  .industry-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
  }
  
  .indicator-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
  }
  
  .indicator-text {
    font-size: 0.75rem;
    color: var(--muted-foreground);
    font-weight: 500;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .metric-value {
      font-size: 1.75rem;
    }
    
    .metric-card {
      padding: 1rem;
    }
  }
</style> 