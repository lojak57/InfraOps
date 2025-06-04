<script lang="ts">
  import type { NavigationInstruction } from './to-delivery-step.types';

  export let navigationInstruction: NavigationInstruction;
</script>

<div class="map-section">
  <div class="map-placeholder">
    <div class="current-instruction">
      <div class="instruction-icon">{navigationInstruction.icon}</div>
      <span class="instruction-text">{navigationInstruction.text}</span>
    </div>
  </div>
</div>

<style>
  .map-section {
    background: #1f2937;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
  }
  
  .map-placeholder {
    height: 200px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  
  .current-instruction {
    background: #3b82f6;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .instruction-icon {
    font-size: 1.5rem;
  }
  
  .instruction-text {
    font-weight: 500;
  }
</style> 