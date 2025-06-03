<!--
  DataTracker Platform - Dashboard Card Component
  
  A reusable card component for dashboard metrics and content.
  Follows enterprise design patterns with theming support.
-->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  // Props
  export let title: string;
  export let subtitle: string = '';
  export let value: string | number = '';
  export let icon: string = '';
  export let status: 'success' | 'warning' | 'error' | 'info' | 'neutral' = 'neutral';
  export let trend: 'up' | 'down' | 'neutral' | '' = '';
  export let trendValue: string = '';
  export let pickup: boolean = false;
  export let clickable: boolean = false;
  export let href: string = '';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  // Event dispatcher
  const dispatch = createEventDispatcher<{
    click: { title: string; value: string | number };
  }>();
  
  // Computed classes
  $: cardClasses = [
    'dashboard-card',
    `dashboard-card--${size}`,
    `dashboard-card--${status}`,
    clickable ? 'dashboard-card--clickable' : '',
    pickup ? 'dashboard-card--pickup' : ''
  ].filter(Boolean).join(' ');
  
  $: statusClasses = {
    success: 'text-green-600 bg-green-50',
    warning: 'text-amber-600 bg-amber-50', 
    error: 'text-red-600 bg-red-50',
    info: 'text-blue-600 bg-blue-50',
    neutral: 'text-gray-600 bg-gray-50'
  };
  
  $: trendClasses = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };
  
  // Event handlers
  function handleClick() {
    if (clickable) {
      dispatch('click', { title, value });
    }
  }
  
  function handleKeyDown(event: KeyboardEvent) {
    if (clickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick();
    }
  }
</script>

<!-- Card wrapper -->
{#if href}
  <a 
    {href}
    class={cardClasses}
    role="button"
    tabindex="0"
    on:click={handleClick}
    on:keydown={handleKeyDown}
  >
    <slot name="content" {pickup} {status}>
      <!-- Default content -->
      <div class="dashboard-card__content">
        {#if icon}
          <div class="dashboard-card__icon {statusClasses[status]}">
            <span class="icon-{icon}"></span>
          </div>
        {/if}
        
        <div class="dashboard-card__body">
          <div class="dashboard-card__header">
            <h3 class="dashboard-card__title">{title}</h3>
            {#if subtitle}
              <p class="dashboard-card__subtitle">{subtitle}</p>
            {/if}
          </div>
          
          <div class="dashboard-card__value">
            {#if pickup}
              <div class="dashboard-card__skeleton"></div>
            {:else}
              <span class="dashboard-card__metric">{value}</span>
              {#if trend && trendValue}
                <span class="dashboard-card__trend {trendClasses[trend]}">
                  <span class="trend-icon trend-icon--{trend}"></span>
                  {trendValue}
                </span>
              {/if}
            {/if}
          </div>
        </div>
      </div>
    </slot>
  </a>
{:else}
  <div 
    class={cardClasses}
    role={clickable ? 'button' : undefined}
    tabindex={clickable ? 0 : undefined}
    on:click={handleClick}
    on:keydown={handleKeyDown}
  >
    <slot name="content" {pickup} {status}>
      <!-- Default content -->
      <div class="dashboard-card__content">
        {#if icon}
          <div class="dashboard-card__icon {statusClasses[status]}">
            <span class="icon-{icon}"></span>
          </div>
        {/if}
        
        <div class="dashboard-card__body">
          <div class="dashboard-card__header">
            <h3 class="dashboard-card__title">{title}</h3>
            {#if subtitle}
              <p class="dashboard-card__subtitle">{subtitle}</p>
            {/if}
          </div>
          
          <div class="dashboard-card__value">
            {#if pickup}
              <div class="dashboard-card__skeleton"></div>
            {:else}
              <span class="dashboard-card__metric">{value}</span>
              {#if trend && trendValue}
                <span class="dashboard-card__trend {trendClasses[trend]}">
                  <span class="trend-icon trend-icon--{trend}"></span>
                  {trendValue}
                </span>
              {/if}
            {/if}
          </div>
        </div>
      </div>
    </slot>
  </div>
{/if}

<style>
  /* Base card styles */
  .dashboard-card {
    @apply relative overflow-hidden;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.85) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    box-shadow: 
      0 4px 16px rgba(0, 0, 0, 0.06),
      0 1px 4px rgba(0, 0, 0, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    color: inherit;
  }
  
  /* Size variants */
  .dashboard-card--sm {
    padding: 12px 16px;
    min-height: 80px;
  }
  
  .dashboard-card--md {
    padding: 16px 20px;
    min-height: 120px;
  }
  
  .dashboard-card--lg {
    padding: 24px 28px;
    min-height: 160px;
  }
  
  /* Status variants */
  .dashboard-card--success::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #059669 0%, #10B981 100%);
    border-radius: 16px 16px 0 0;
  }
  
  .dashboard-card--warning::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%);
    border-radius: 16px 16px 0 0;
  }
  
  .dashboard-card--error::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #DC2626 0%, #EF4444 100%);
    border-radius: 16px 16px 0 0;
  }
  
  .dashboard-card--info::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #2563EB 0%, #3B82F6 100%);
    border-radius: 16px 16px 0 0;
  }
  
  /* Interactive states */
  .dashboard-card--clickable {
    cursor: pointer;
  }
  
  .dashboard-card--clickable:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 
      0 12px 32px rgba(0, 0, 0, 0.1),
      0 4px 16px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  .dashboard-card--clickable:focus {
    outline: none;
    ring: 2px solid var(--color-primary, #1E40AF);
    ring-offset: 2px;
  }
  
  .dashboard-card--clickable:active {
    transform: translateY(-1px) scale(1.005);
  }
  
  /* Loading state */
  .dashboard-card--pickup {
    pointer-events: none;
  }
  
  /* Content layout */
  .dashboard-card__content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    height: 100%;
  }
  
  .dashboard-card__icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
  
  .dashboard-card__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 60px;
  }
  
  .dashboard-card__header {
    margin-bottom: 8px;
  }
  
  .dashboard-card__title {
    font-size: 14px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 4px 0;
    line-height: 1.3;
  }
  
  .dashboard-card__subtitle {
    font-size: 12px;
    font-weight: 400;
    color: #6b7280;
    margin: 0;
    line-height: 1.4;
  }
  
  .dashboard-card__value {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
  
  .dashboard-card__metric {
    font-family: 'JetBrains Mono', monospace;
    font-size: 24px;
    font-weight: 700;
    color: #111827;
    line-height: 1;
  }
  
  .dashboard-card--sm .dashboard-card__metric {
    font-size: 20px;
  }
  
  .dashboard-card--lg .dashboard-card__metric {
    font-size: 28px;
  }
  
  .dashboard-card__trend {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 500;
  }
  
  /* Skeleton loader */
  .dashboard-card__skeleton {
    width: 100px;
    height: 24px;
    background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
    background-size: 200% 100%;
    animation: skeleton-pickup 1.5s infinite;
    border-radius: 4px;
  }
  
  @keyframes skeleton-pickup {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  
  /* Trend icons */
  .trend-icon--up::before {
    content: '↗';
  }
  
  .trend-icon--down::before {
    content: '↘';
  }
  
  .trend-icon--neutral::before {
    content: '→';
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .dashboard-card {
      border-radius: 12px;
    }
    
    .dashboard-card--md {
      padding: 14px 16px;
      min-height: 100px;
    }
    
    .dashboard-card__content {
      gap: 10px;
    }
    
    .dashboard-card__icon {
      width: 36px;
      height: 36px;
      font-size: 16px;
    }
    
    .dashboard-card__metric {
      font-size: 20px;
    }
  }
</style> 