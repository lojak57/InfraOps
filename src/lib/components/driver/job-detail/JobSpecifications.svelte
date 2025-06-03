<script lang="ts">
  import { Gauge, BarChart3, FileText, Database, Clock, MapPin, AlertCircle } from 'lucide-svelte';
  import { formatDuration, getPriorityColor, getPriorityLabel } from '$lib/utils/jobCalculations';
  import type { ScheduledJob } from '$lib/types/job.types';

  export let job: ScheduledJob;
</script>

<div class="specifications">
  <h4 class="section-title">Job Specifications</h4>
  
  <div class="spec-grid">
    <!-- Volume & Level -->
    <div class="spec-item">
      <Gauge size={16} />
      <span class="spec-label">EST Volume</span>
      <span class="spec-value">{job.estimatedUnits} units</span>
    </div>
    
    <div class="spec-item">
      <BarChart3 size={16} />
      <span class="spec-label">Tank Level</span>
      <span class="spec-value tank-level">{job.tankLevelHeight}</span>
    </div>

    <!-- Load Details -->
    <div class="spec-item">
      <FileText size={16} />
      <span class="spec-label">Product Type</span>
      <span class="spec-value load-type">
        {job.loadType.charAt(0).toUpperCase() + job.loadType.slice(1)}
      </span>
    </div>
    
    <div class="spec-item">
      <Database size={16} />
      <span class="spec-label">Tank Number</span>
      <span class="spec-value">{job.pickupLocation.tankNumber}</span>
    </div>

    <!-- Timing & Distance -->
    <div class="spec-item">
      <Clock size={16} />
      <span class="spec-label">EST Transit Time</span>
      <span class="spec-value">{formatDuration(job.estimatedDuration)}</span>
    </div>
    
    <div class="spec-item">
      <MapPin size={16} />
      <span class="spec-label">Distance</span>
      <span class="spec-value">{job.distance} miles</span>
    </div>

    <!-- Priority -->
    <div class="spec-item priority">
      <AlertCircle size={16} />
      <span class="spec-label">Priority</span>
      <span 
        class="spec-value priority-level" 
        style="color: {getPriorityColor(job.priority)}"
      >
        {getPriorityLabel(job.priority)}
      </span>
    </div>
  </div>

  <!-- Special Requirements -->
  {#if job.hazmatRequired || job.temperatureControl || job.specialInstructions}
    <div class="special-requirements">
      <h5 class="subsection-title">Special Requirements</h5>
      <div class="requirements-list">
        {#if job.hazmatRequired}
          <div class="requirement-item hazmat">
            <AlertCircle size={14} />
            <span>HAZMAT Required</span>
          </div>
        {/if}
        
        {#if job.temperatureControl}
          <div class="requirement-item temp-control">
            <Gauge size={14} />
            <span>Temperature Control Required</span>
          </div>
        {/if}
        
        {#if job.specialInstructions}
          <div class="special-instructions">
            <FileText size={14} />
            <div>
              <span class="instruction-label">Special Instructions:</span>
              <p class="instruction-text">{job.specialInstructions}</p>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .specifications {
    padding: 20px 24px;
    background: white;
  }

  .section-title {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 16px 0;
    border-bottom: 2px solid #f3f4f6;
    padding-bottom: 8px;
  }

  .spec-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }

  .spec-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
  }

  .spec-item.priority {
    border-color: #fbbf24;
    background: #fffbeb;
  }

  .spec-label {
    font-size: 12px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    flex: 1;
  }

  .spec-value {
    font-size: 14px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .spec-value.tank-level {
    color: #059669;
  }

  .spec-value.load-type {
    color: #7c3aed;
  }

  .spec-value.priority-level {
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .special-requirements {
    border-top: 1px solid #e5e5e5;
    padding-top: 20px;
  }

  .subsection-title {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 12px 0;
  }

  .requirements-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .requirement-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
  }

  .requirement-item.hazmat {
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }

  .requirement-item.temp-control {
    background: #eff6ff;
    color: #2563eb;
    border: 1px solid #bfdbfe;
  }

  .special-instructions {
    display: flex;
    gap: 8px;
    padding: 12px;
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 8px;
  }

  .instruction-label {
    font-size: 14px;
    font-weight: 600;
    color: #0369a1;
    display: block;
    margin-bottom: 4px;
  }

  .instruction-text {
    font-size: 14px;
    color: #374151;
    line-height: 1.4;
    margin: 0;
  }

  /* Mobile responsiveness */
  @media (max-width: 640px) {
    .specifications {
      padding: 16px 20px;
    }

    .spec-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .spec-item {
      padding: 10px;
    }

    .section-title {
      font-size: 16px;
    }
  }
</style> 