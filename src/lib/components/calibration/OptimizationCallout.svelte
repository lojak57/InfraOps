<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{
    learnMore: void;
  }>();

  function handleLearnMore() {
    dispatch('learnMore');
  }
</script>

<div class="integration-callout">
  <div class="callout-icon">🏭</div>
  <div class="callout-content">
    <h4>Powered by Advanced Diagnostics</h4>
    <p>VeriJob integrates with Krohne's Opticheck technology for real-time Coriolis meter diagnostics and predictive maintenance.</p>
    <button class="learn-more-btn" on:click={handleLearnMore}>
      Learn More About Integration
    </button>
  </div>
</div>

<style>
  .integration-callout {
    padding: 20px;
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    border-top: 1px solid rgba(59, 130, 246, 0.2);
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .callout-icon {
    font-size: 32px;
  }

  .callout-content {
    flex: 1;
  }

  .callout-content h4 {
    color: #1e40af;
    margin: 0 0 6px 0;
    font-size: 14px;
  }

  .callout-content p {
    color: #1e40af;
    margin: 0 0 10px 0;
    font-size: 12px;
    line-height: 1.4;
  }

  .learn-more-btn {
    padding: 6px 12px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .learn-more-btn:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .integration-callout {
      flex-direction: column;
      text-align: center;
    }
  }
</style> 