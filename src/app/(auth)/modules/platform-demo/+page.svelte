<!--
  Platform Demo - Industry Adaptation Showcase
  
  Demonstrates how the same components automatically adapt
  to different industry verticals and configurations.
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { platformConfig, industryPresets } from '$lib/core/config/platform.config';
  import AdaptiveMetricCard from '$lib/ui/components/AdaptiveMetricCard.svelte';
  
  let selectedIndustry = 'manufacturing';
  let currentProfile = platformConfig.getProfile();
  
  // Update profile when industry changes
  $: {
    platformConfig.setIndustryProfile(selectedIndustry);
    currentProfile = platformConfig.getProfile();
  }
  
  // Sample metrics that adapt to different industries
  const sampleMetrics = [
    {
      title: 'Active Volume',
      getValue: (profile: any) => profile.id === 'manufacturing' ? 12500 : profile.id === 'water_delivery' ? 8200 : profile.id === 'field_service' ? 45 : 2800,
      metricType: 'primary' as const,
      status: 'excellent' as const,
      trend: 'up' as const,
      trendValue: '+12%',
      getIcon: (profile: any) => profile.id === 'manufacturing' ? '🛢️' : profile.id === 'water_delivery' ? '💧' : profile.id === 'field_service' ? '⚙️' : '📦'
    },
    {
      title: 'System Health',
      getValue: () => 98.5,
      metricType: 'secondary' as const,
      status: 'excellent' as const,
      trend: 'stable' as const,
      trendValue: 'Optimal',
      getIcon: () => '🛡️'
    },
    {
      title: 'Active Operations',
      getValue: (profile: any) => profile.id === 'manufacturing' ? 8 : profile.id === 'water_delivery' ? 23 : profile.id === 'field_service' ? 15 : 6,
      metricType: 'custom' as const,
      status: 'normal' as const,
      trend: 'up' as const,
      trendValue: '+3',
      getIcon: (profile: any) => profile.id === 'manufacturing' ? '🚛' : profile.id === 'water_delivery' ? '🚚' : profile.id === 'field_service' ? '👨‍🔧' : '🏗️'
    },
    {
      title: 'Efficiency Rate',
      getValue: () => 94.2,
      metricType: 'custom' as const,
      status: 'normal' as const,
      trend: 'up' as const,
      trendValue: '+2.1%',
      getIcon: () => '⚡'
    }
  ];
</script>

<svelte:head>
  <title>Platform Demo - Multi-Industry Adaptation</title>
  <meta name="description" content="See how the platform adapts to different industries" />
</svelte:head>

<div class="platform-demo">
  <!-- Header -->
  <div class="demo-header">
    <h1 class="demo-title">Multi-Industry Platform Demo</h1>
    <p class="demo-subtitle">
      Watch the same components automatically adapt to different industry verticals
    </p>
  </div>
  
  <!-- Industry Selector -->
  <div class="industry-selector">
    <h3 class="selector-title">Select Industry Vertical:</h3>
    <div class="industry-grid">
      {#each Object.entries(industryPresets) as [key, preset]}
        <button
          class="industry-card {selectedIndustry === key ? 'active' : ''}"
          style="border-color: {selectedIndustry === key ? preset.branding.primaryColor : 'var(--border)'};"
          on:click={() => selectedIndustry = key}
        >
          <div class="industry-header">
            <h4 class="industry-name">{preset.branding.platformName}</h4>
            <div class="industry-indicator" style="background-color: {preset.branding.primaryColor};"></div>
          </div>
          <p class="industry-tagline">{preset.branding.tagline}</p>
          <div class="industry-details">
            <span class="industry-type">{preset.name}</span>
          </div>
        </button>
      {/each}
    </div>
  </div>
  
  <!-- Current Configuration Display -->
  <div class="config-display">
    <h3 class="config-title">Current Configuration: {currentProfile.branding.platformName}</h3>
    <div class="config-grid">
      <div class="config-section">
        <h4>Terminology</h4>
        <ul>
          <li><strong>Jobs:</strong> {currentProfile.terminology.job}</li>
          <li><strong>Operators:</strong> {currentProfile.terminology.operator}</li>
          <li><strong>Assets:</strong> {currentProfile.terminology.asset}</li>
          <li><strong>Sites:</strong> {currentProfile.terminology.site}</li>
        </ul>
      </div>
      <div class="config-section">
        <h4>Units</h4>
        <ul>
          <li><strong>Volume:</strong> {currentProfile.units.volume}</li>
          <li><strong>Distance:</strong> {currentProfile.units.distance}</li>
          <li><strong>Temperature:</strong> {currentProfile.units.temperature}</li>
          <li><strong>Time:</strong> {currentProfile.units.time}</li>
        </ul>
      </div>
      <div class="config-section">
        <h4>Features</h4>
        <ul>
          <li>🗺️ Real-time Map: {currentProfile.features.useRealTimeMap ? '✅' : '❌'}</li>
          <li>📊 Sensor Monitoring: {currentProfile.features.useSensorMonitoring ? '✅' : '❌'}</li>
          <li>🤖 AI Dispatch: {currentProfile.features.useAIDispatch ? '✅' : '❌'}</li>
          <li>👥 Customer Portal: {currentProfile.features.useCustomerPortal ? '✅' : '❌'}</li>
        </ul>
      </div>
    </div>
  </div>
  
  <!-- Adaptive Metrics Demo -->
  <div class="metrics-demo">
    <h3 class="metrics-title">
      {currentProfile.terminology.dashboardName} - Live Metrics
    </h3>
    <div class="metrics-grid">
      {#each sampleMetrics as metric}
        <AdaptiveMetricCard
          title={metric.title}
          value={metric.getValue(currentProfile)}
          metricType={metric.metricType}
          status={metric.status}
          trend={metric.trend}
          trendValue={metric.trendValue}
          icon={metric.getIcon(currentProfile)}
        />
      {/each}
    </div>
  </div>
  
  <!-- Business Impact -->
  <div class="impact-section">
    <h3 class="impact-title">Business Impact</h3>
    <div class="impact-grid">
      <div class="impact-card">
        <div class="impact-icon">🚀</div>
        <h4>Faster Time to Market</h4>
        <p>Deploy to new industries in <strong>weeks, not months</strong> with pre-configured industry profiles</p>
      </div>
      <div class="impact-card">
        <div class="impact-icon">💰</div>
        <h4>Reduced Development Costs</h4>
        <p>Single codebase supports <strong>multiple industries</strong> with 90% code reuse</p>
      </div>
      <div class="impact-card">
        <div class="impact-icon">🎯</div>
        <h4>Industry-Specific UX</h4>
        <p>Each vertical gets <strong>tailored terminology and workflows</strong> that feel native</p>
      </div>
      <div class="impact-card">
        <div class="impact-icon">📈</div>
        <h4>Scalable Revenue</h4>
        <p>Same platform, <strong>multiple market opportunities</strong> across underserved industries</p>
      </div>
    </div>
  </div>
</div>

<style>
  .platform-demo {
    min-height: 100vh;
    background-color: var(--background);
    padding: 2rem;
    gap: 2rem;
    display: flex;
    flex-direction: column;
  }
  
  .demo-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .demo-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--foreground);
    margin-bottom: 1rem;
  }
  
  .demo-subtitle {
    font-size: 1.25rem;
    color: var(--muted-foreground);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .industry-selector {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 1.5rem;
  }
  
  .selector-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--foreground);
    margin-bottom: 1rem;
  }
  
  .industry-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  .industry-card {
    background: var(--background);
    border: 2px solid var(--border);
    border-radius: 0.5rem;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }
  
  .industry-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .industry-card.active {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .industry-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .industry-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--foreground);
    margin: 0;
  }
  
  .industry-indicator {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
  }
  
  .industry-tagline {
    font-size: 0.875rem;
    color: var(--muted-foreground);
    margin-bottom: 0.5rem;
  }
  
  .industry-type {
    font-size: 0.75rem;
    color: var(--muted-foreground);
    font-weight: 500;
  }
  
  .config-display {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 1.5rem;
  }
  
  .config-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--foreground);
    margin-bottom: 1rem;
  }
  
  .config-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .config-section h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--foreground);
    margin-bottom: 0.5rem;
  }
  
  .config-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .config-section li {
    font-size: 0.875rem;
    color: var(--muted-foreground);
    margin-bottom: 0.25rem;
  }
  
  .metrics-demo {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 1.5rem;
  }
  
  .metrics-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--foreground);
    margin-bottom: 1rem;
  }
  
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .impact-section {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 1.5rem;
  }
  
  .impact-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--foreground);
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .impact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .impact-card {
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    padding: 1rem;
    text-align: center;
  }
  
  .impact-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .impact-card h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--foreground);
    margin-bottom: 0.5rem;
  }
  
  .impact-card p {
    font-size: 0.875rem;
    color: var(--muted-foreground);
    line-height: 1.5;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .platform-demo {
      padding: 1rem;
      gap: 1rem;
    }
    
    .demo-title {
      font-size: 2rem;
    }
    
    .industry-grid,
    .config-grid,
    .metrics-grid,
    .impact-grid {
      grid-template-columns: 1fr;
    }
  }
</style> 