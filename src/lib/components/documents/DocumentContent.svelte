<script lang="ts">
  import type { DocumentContent as DocumentContentType } from './document-viewer.types';

  export let documentContent: DocumentContentType;
  export let zoomLevel: number;
  export let rotation: number;
</script>

<div class="viewer-content">
  <div 
    class="document-container"
    style="transform: scale({zoomLevel / 100}) rotate({rotation}deg)"
  >
    {@html documentContent.content}
  </div>
</div>

<style>
  .viewer-content {
    flex: 1;
    overflow: auto;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .document-container {
    transition: transform 0.3s ease;
    transform-origin: center;
  }
  
  /* PDF Document Styles */
  :global(.pdf-page) {
    background: white;
    width: 8.5in;
    min-height: 11in;
    padding: 1in;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    font-family: 'Times New Roman', serif;
    line-height: 1.6;
  }
  
  :global(.pdf-header) {
    text-align: center;
    margin-bottom: 2rem;
    border-bottom: 2px solid #1a1a1a;
    padding-bottom: 1rem;
  }
  
  :global(.pdf-header h1) {
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
    color: #1a1a1a;
  }
  
  :global(.pdf-header h2) {
    font-size: 18px;
    font-weight: normal;
    margin: 0 0 0.5rem 0;
    color: #4b5563;
  }
  
  :global(.report-period, .policy-number, .inspection-date, .document-info) {
    font-size: 14px;
    font-weight: bold;
    color: #6b7280;
  }
  
  :global(.pdf-section) {
    margin-bottom: 2rem;
  }
  
  :global(.pdf-section h3) {
    font-size: 16px;
    font-weight: bold;
    margin: 0 0 1rem 0;
    color: #1a1a1a;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.5rem;
  }
  
  :global(.info-grid) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  :global(.fuel-table, .coverage-table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  
  :global(.fuel-table th, .coverage-table th) {
    background: #f3f4f6;
    padding: 8px;
    text-align: left;
    border: 1px solid #d1d5db;
    font-weight: bold;
  }
  
  :global(.fuel-table td, .coverage-table td) {
    padding: 8px;
    border: 1px solid #d1d5db;
  }
  
  :global(.vehicle-list) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  :global(.vehicle-item) {
    padding: 0.5rem;
    background: #f9fafb;
    border-radius: 4px;
  }
  
  :global(.checklist) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  :global(.checklist-category h4) {
    font-size: 14px;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
    color: #1a1a1a;
  }
  
  :global(.checklist-item) {
    font-size: 12px;
    margin-bottom: 0.25rem;
    color: #059669;
  }
  
  :global(.pdf-footer) {
    margin-top: 3rem;
    border-top: 1px solid #e5e7eb;
    padding-top: 1rem;
  }
  
  :global(.signature-section) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  :global(.signature-line) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  /* Image Document Styles */
  :global(.image-container) {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    text-align: center;
  }
  
  :global(.image-placeholder) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  :global(.image-icon) {
    font-size: 4rem;
    opacity: 0.5;
  }
  
  :global(.image-info h3) {
    margin: 0;
    font-size: 18px;
    color: #1a1a1a;
  }
  
  :global(.image-details) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: #6b7280;
    font-size: 14px;
  }
  
  /* Text Document Styles */
  :global(.text-document) {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-width: 800px;
    font-family: 'Georgia', serif;
    line-height: 1.6;
  }
  
  :global(.text-document h2) {
    margin: 0 0 1rem 0;
    color: #1a1a1a;
  }
  
  :global(.text-content) {
    color: #374151;
  }
  
  :global(.text-content h3, .text-content h4) {
    color: #1a1a1a;
    margin: 1.5rem 0 0.5rem 0;
  }
  
  :global(.text-content hr) {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 1.5rem 0;
  }
  
  :global(.text-content ul) {
    padding-left: 1.5rem;
  }
  
  :global(.text-content li) {
    margin-bottom: 0.5rem;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    :global(.pdf-page) {
      width: 100%;
      padding: 0.5in;
    }
    
    :global(.info-grid) {
      grid-template-columns: 1fr;
    }
    
    :global(.checklist) {
      grid-template-columns: 1fr;
    }
  }
</style> 