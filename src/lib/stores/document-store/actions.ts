import { get } from 'svelte/store';
import { browser } from '$app/environment';
import type { CustomerDocument } from './types';
import { documents, uploadProgress } from './core-store';

// Document management functions
export const documentActions = {
  // Add new document
  addDocument: (document: Omit<CustomerDocument, 'id' | 'uploadDate'>) => {
    const newDocument: CustomerDocument = {
      ...document,
      id: `doc-${browser ? Date.now() : 1735064220000}`,
      uploadDate: browser ? new Date() : new Date(1735064220000)
    };
    
    documents.update((docs: CustomerDocument[]) => [...docs, newDocument]);
    return newDocument.id;
  },
  
  // Update document
  updateDocument: (id: string, updates: Partial<CustomerDocument>) => {
    documents.update((docs: CustomerDocument[]) => 
      docs.map((doc: CustomerDocument) => doc.id === id ? { ...doc, ...updates } : doc)
    );
  },
  
  // Delete document
  deleteDocument: (id: string) => {
    documents.update((docs: CustomerDocument[]) => docs.filter((doc: CustomerDocument) => doc.id !== id));
  },
  
  // Get documents by type
  getDocumentsByType: (type: CustomerDocument['type']): CustomerDocument[] => {
    return get(documents).filter((doc: CustomerDocument) => doc.type === type);
  },
  
  // Get documents by customer
  getDocumentsByCustomer: (customerId: string): CustomerDocument[] => {
    return get(documents).filter((doc: CustomerDocument) => doc.customerId === customerId);
  },
  
  // Search documents
  searchDocuments: (query: string): CustomerDocument[] => {
    const lowercaseQuery = query.toLowerCase();
    return get(documents).filter((doc: CustomerDocument) => 
      doc.fileName.toLowerCase().includes(lowercaseQuery) ||
      doc.type.toLowerCase().includes(lowercaseQuery) ||
      doc.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery)) ||
      doc.metadata.description?.toLowerCase().includes(lowercaseQuery)
    );
  },
  
  // Update upload progress
  setUploadProgress: (fileId: string, progress: number) => {
    uploadProgress.update((current: { [key: string]: number }) => ({
      ...current,
      [fileId]: progress
    }));
  },
  
  // Clear upload progress
  clearUploadProgress: (fileId: string) => {
    uploadProgress.update((current: { [key: string]: number }) => {
      const { [fileId]: removed, ...rest } = current;
      return rest;
    });
  },
  
  // Acknowledge alert
  acknowledgeAlert: (alertId: string) => {
    // In a real app, this would update the alert in the backend
    console.log(`Alert ${alertId} acknowledged`);
  },
  
  // Bulk operations
  bulkUpdateStatus: (documentIds: string[], status: CustomerDocument['status']) => {
    documents.update((docs: CustomerDocument[]) => 
      docs.map((doc: CustomerDocument) => 
        documentIds.includes(doc.id) ? { ...doc, status } : doc
      )
    );
  },
  
  // Export documents data
  exportDocuments: (format: 'csv' | 'json' = 'csv'): string => {
    const docsData: CustomerDocument[] = get(documents);
    
    if (format === 'json') {
      return JSON.stringify(docsData, null, 2);
    } else {
      // CSV export
      const headers = ['ID', 'Customer ID', 'Type', 'File Name', 'Status', 'Upload Date', 'Expiry Date', 'Uploaded By'];
      const csvData = docsData.map((doc: CustomerDocument) => [
        doc.id,
        doc.customerId,
        doc.type,
        doc.fileName,
        doc.status,
        doc.uploadDate.toISOString().split('T')[0],
        doc.expiryDate?.toISOString().split('T')[0] || '',
        doc.uploadedBy
      ]);
      
      return [headers, ...csvData].map(row => row.join(',')).join('\n');
    }
  }
}; 