<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Navigation, Phone, AlertTriangle, Clock } from 'lucide-svelte';
  import { isJobReady, getTimeUntilJob } from '$lib/utils/jobCalculations';
  import type { ScheduledJob, CustomerContact } from '$lib/types/job.types';

  const dispatch = createEventDispatcher<{
    'start-navigation': { job: ScheduledJob };
    'call-customer': { contact: CustomerContact };
  }>();

  export let job: ScheduledJob;

  $: jobReady = isJobReady(job);
  $: timeUntil = getTimeUntilJob(job.scheduledTime);

  function handleStartJob() {
    dispatch('start-navigation', { job });
  }

  function handleCallCustomer() {
    dispatch('call-customer', { contact: job.customerContact });
  }
</script>

<div class="job-actions">
  <!-- Time until job -->
  <div class="time-status">
    <Clock size={16} />
    <span class="time-label">Time until job:</span>
    <span class="time-value" class:overdue={timeUntil === 'Overdue'}>{timeUntil}</span>
  </div>

  <!-- Action buttons -->
  <div class="action-buttons">
    <!-- Start Navigation Button -->
    <button 
      class="start-btn"
      class:ready={jobReady}
      on:click={handleStartJob}
      disabled={!jobReady}
    >
      <Navigation size={18} />
      {jobReady ? 'Start Navigation' : 'Job Not Ready'}
    </button>

    <!-- Call Customer Button -->
    <button class="call-btn" on:click={handleCallCustomer}>
      <Phone size={16} />
      Call Customer
    </button>
  </div>

  <!-- Emergency info -->
  {#if job.priority === 'urgent'}
    <div class="emergency-notice">
      <AlertTriangle size={16} />
      <span>URGENT: Contact dispatch immediately if any issues arise</span>
    </div>
  {/if}

  <!-- Customer contact info -->
  <div class="contact-info">
    <h5>Customer Contact</h5>
    <div class="contact-details">
      <div class="contact-item">
        <span class="contact-label">Name:</span>
        <span class="contact-value">{job.customerContact.name}</span>
      </div>
      <div class="contact-item">
        <span class="contact-label">Role:</span>
        <span class="contact-value">{job.customerContact.role}</span>
      </div>
      <div class="contact-item">
        <span class="contact-label">Phone:</span>
        <span class="contact-value">{job.customerContact.phone}</span>
      </div>
      {#if job.customerContact.email}
        <div class="contact-item">
          <span class="contact-label">Email:</span>
          <span class="contact-value">{job.customerContact.email}</span>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .job-actions {
    padding: 20px 24px;
    border-top: 1px solid #e5e5e5;
    background: #f9fafb;
    border-radius: 0 0 16px 16px;
  }

  .time-status {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding: 12px;
    background: white;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
  }

  .time-label {
    font-size: 14px;
    color: #666;
  }

  .time-value {
    font-weight: 600;
    color: #059669;
  }

  .time-value.overdue {
    color: #dc2626;
  }

  .action-buttons {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
  }

  .start-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 24px;
    background: #6b7280;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: not-allowed;
    transition: all 0.2s ease;
  }

  .start-btn.ready {
    background: #059669;
    cursor: pointer;
  }

  .start-btn.ready:hover {
    background: #047857;
    transform: translateY(-1px);
  }

  .call-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 20px;
    background: white;
    color: #059669;
    border: 2px solid #059669;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .call-btn:hover {
    background: #059669;
    color: white;
    transform: translateY(-1px);
  }

  .emergency-notice {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    color: #dc2626;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .contact-info {
    background: white;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
  }

  .contact-info h5 {
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .contact-details {
    display: grid;
    gap: 8px;
  }

  .contact-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .contact-label {
    font-size: 14px;
    color: #666;
  }

  .contact-value {
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
  }

  /* Mobile responsiveness */
  @media (max-width: 480px) {
    .job-actions {
      padding: 16px 20px;
    }

    .action-buttons {
      flex-direction: column;
    }

    .start-btn, .call-btn {
      padding: 14px 20px;
      font-size: 15px;
    }

    .contact-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
    }
  }
</style> 