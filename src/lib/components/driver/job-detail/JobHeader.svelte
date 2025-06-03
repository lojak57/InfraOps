<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { X } from 'lucide-svelte';
  import { getPriorityColor, getPriorityLabel } from '$lib/utils/jobCalculations';
  import type { ScheduledJob } from '$lib/types/job.types';

  const dispatch = createEventDispatcher<{ close: void }>();

  export let job: ScheduledJob;

  function handleClose() {
    dispatch('close');
  }
</script>

<div class="modal-header">
  <div class="header-content">
    <div class="job-title-section">
      <h2 class="job-title">Job Details</h2>
      <div class="job-meta">
        <span class="job-id">Ticket #{job.id}</span>
        <div class="customer-banner">{job.accountName}</div>
        <div class="priority-badge" style="background-color: {getPriorityColor(job.priority)}">
          {getPriorityLabel(job.priority)}
        </div>
      </div>
    </div>
    <button class="close-btn tap-target" on:click={handleClose} aria-label="Close">
      <X size={24} />
    </button>
  </div>
</div>

<style>
  .modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
    border-radius: 16px 16px 0 0;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  }

  .job-title-section {
    flex: 1;
  }

  .job-title {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 12px 0;
    line-height: 1.2;
  }

  .job-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }

  .job-id {
    font-size: 14px;
    font-weight: 600;
    color: #666;
    background: #f3f4f6;
    padding: 4px 8px;
    border-radius: 6px;
  }

  .customer-banner {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    background: #f8fafc;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }

  .priority-badge {
    font-size: 12px;
    font-weight: 700;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .close-btn {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    min-height: 40px;
  }

  .close-btn:hover {
    background: #f3f4f6;
    color: #1a1a1a;
  }

  .tap-target {
    min-width: 44px;
    min-height: 44px;
  }

  /* Mobile responsiveness */
  @media (max-width: 480px) {
    .modal-header {
      padding: 16px 20px;
    }

    .job-title {
      font-size: 20px;
    }

    .job-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    .customer-banner {
      font-size: 14px;
    }
  }
</style> 