<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import JobHeader from './job-detail/JobHeader.svelte';
  import JobSpecifications from './job-detail/JobSpecifications.svelte';
  import JobActions from './job-detail/JobActions.svelte';
  import type { ScheduledJob, JobModalEvents } from '$lib/types/job.types';

  const dispatch = createEventDispatcher<JobModalEvents>();

  export let job: ScheduledJob;
  export let isOpen = false;

  // Handle events from child components
  function handleClose() {
    dispatch('close');
  }

  function handleStartNavigation(event: CustomEvent<{ job: ScheduledJob }>) {
    dispatch('start-navigation', event.detail);
  }

  function handleCallCustomer(event: CustomEvent<{ contact: any }>) {
    dispatch('call-customer', event.detail);
  }

  // Prevent scroll when modal is open
  $: if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
</script>

{#if isOpen && job}
  <div class="modal-overlay" role="dialog" aria-modal="true">
    <div class="modal-container">
      <!-- Header -->
      <JobHeader 
        {job} 
        on:close={handleClose} 
      />

      <!-- Content -->
      <div class="modal-content">
        <JobSpecifications {job} />
      </div>

      <!-- Actions -->
      <JobActions 
        {job}
        on:start-navigation={handleStartNavigation}
        on:call-customer={handleCallCustomer}
      />
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .modal-container {
    background: white;
    border-radius: 16px;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 4px 6px -1px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    transform: scale(1);
    animation: modalAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .modal-content {
    max-height: 60vh;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
  }

  .modal-content::-webkit-scrollbar {
    width: 6px;
  }

  .modal-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .modal-content::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  .modal-content::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  @keyframes modalAppear {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  /* Mobile responsiveness */
  @media (max-width: 640px) {
    .modal-overlay {
      padding: 10px;
    }

    .modal-container {
      border-radius: 12px;
      max-height: 95vh;
    }

    .modal-content {
      max-height: 70vh;
    }
  }
</style> 