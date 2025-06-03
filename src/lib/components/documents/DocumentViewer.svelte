<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { CustomerDocument } from '$lib/stores/documentStore';
  import { getMockDocumentContent } from './document-content-generators';
  import DocumentViewerControls from './DocumentViewerControls.svelte';
  import DocumentContent from './DocumentContent.svelte';
  
  export let document: CustomerDocument | null = null;
  export let isOpen = false;
  
  const dispatch = createEventDispatcher<{
    close: void;
    download: { document: CustomerDocument };
  }>();
  
  let zoomLevel = 100;
  let rotation = 0;
  
  const handleClose = () => {
    dispatch('close');
  };
  
  const handleDownload = () => {
    if (document) {
      dispatch('download', { document });
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const zoomIn = () => {
    zoomLevel = Math.min(zoomLevel + 25, 200);
  };
  
  const zoomOut = () => {
    zoomLevel = Math.max(zoomLevel - 25, 50);
  };
  
  const rotate = () => {
    rotation = (rotation + 90) % 360;
  };
  
  $: documentContent = document ? getMockDocumentContent(document) : null;
</script>

{#if isOpen && document && documentContent}
  <div class="modal-overlay" on:click={handleClose}>
    <div class="document-viewer" on:click|stopPropagation>
      <DocumentViewerControls
        {document}
        {zoomLevel}
        documentIcon={documentContent.icon}
        on:zoomIn={zoomIn}
        on:zoomOut={zoomOut}
        on:rotate={rotate}
        on:print={handlePrint}
        on:download={handleDownload}
        on:close={handleClose}
      />
      
      <DocumentContent
        {documentContent}
        {zoomLevel}
        {rotation}
      />
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease-out;
  }
  
  .document-viewer {
    background: white;
    border-radius: 12px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    width: 100%;
    max-width: 1200px;
    height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: slideUp 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .modal-overlay {
      padding: 10px;
    }
    
    .document-viewer {
      height: 95vh;
    }
  }
</style> 