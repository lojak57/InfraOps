<script lang="ts">
  import type { StatusItem } from './to-delivery-step.types';

  export let statusItems: StatusItem[];
</script>

<div class="delivery-status-banner">
  {#each statusItems as item}
    <div class="status-item {item.status}">
      <span class="status-icon">{item.icon}</span>
      <span class="status-text">{item.text}</span>
    </div>
  {/each}
</div>

<style>
  .delivery-status-banner {
    display: flex;
    justify-content: space-between;
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    margin-top: 24px;
    border: 2px solid #e2e8f0;
  }
  
  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
  }
  
  .status-icon {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }
  
  .status-text {
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .status-item.completed {
    color: #10b981;
  }
  
  .status-item.active {
    color: #3b82f6;
    font-weight: 600;
  }
  
  .status-item.pending {
    color: #6b7280;
  }
</style> 