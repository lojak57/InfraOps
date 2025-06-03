<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { X, Download, ZoomIn, ZoomOut, RotateCw, Printer } from 'lucide-svelte';
  import type { CustomerDocument } from '$lib/stores/documentStore';

  export let document: CustomerDocument;
  export let zoomLevel: number;
  export let documentIcon: any;

  const dispatch = createEventDispatcher<{
    zoomIn: void;
    zoomOut: void;
    rotate: void;
    print: void;
    download: void;
    close: void;
  }>();

  const handleZoomIn = () => dispatch('zoomIn');
  const handleZoomOut = () => dispatch('zoomOut');
  const handleRotate = () => dispatch('rotate');
  const handlePrint = () => dispatch('print');
  const handleDownload = () => dispatch('download');
  const handleClose = () => dispatch('close');
</script>

<div class="viewer-header">
  <div class="document-info">
    <svelte:component this={documentIcon} size={20} />
    <div class="document-details">
      <h3>{document.fileName}</h3>
      <span class="document-type">{document.type}</span>
    </div>
  </div>
  
  <div class="viewer-controls">
    <button class="control-btn" on:click={handleZoomOut} title="Zoom Out">
      <ZoomOut size={16} />
    </button>
    
    <span class="zoom-level">{zoomLevel}%</span>
    
    <button class="control-btn" on:click={handleZoomIn} title="Zoom In">
      <ZoomIn size={16} />
    </button>
    
    <button class="control-btn" on:click={handleRotate} title="Rotate">
      <RotateCw size={16} />
    </button>
    
    <div class="control-divider"></div>
    
    <button class="control-btn" on:click={handlePrint} title="Print">
      <Printer size={16} />
    </button>
    
    <button class="control-btn" on:click={handleDownload} title="Download">
      <Download size={16} />
    </button>
    
    <button class="control-btn close-btn" on:click={handleClose} title="Close">
      <X size={16} />
    </button>
  </div>
</div>

<style>
  .viewer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid #e5e7eb;
    background: #f9fafb;
  }
  
  .document-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .document-details h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
  }
  
  .document-type {
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
  }
  
  .viewer-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .control-btn {
    padding: 8px;
    border: none;
    background: rgba(107, 114, 128, 0.1);
    color: #6b7280;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .control-btn:hover {
    background: rgba(107, 114, 128, 0.2);
    color: #1a1a1a;
  }
  
  .close-btn:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
  }
  
  .zoom-level {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    min-width: 40px;
    text-align: center;
  }
  
  .control-divider {
    width: 1px;
    height: 20px;
    background: #e5e7eb;
    margin: 0 4px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .viewer-header {
      padding: 12px 16px;
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }
    
    .viewer-controls {
      justify-content: center;
    }
  }
</style> 