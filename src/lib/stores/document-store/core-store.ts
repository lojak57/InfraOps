import { writable } from 'svelte/store';
import type { CustomerDocument, DocumentTemplate } from './types';
import { mockDocuments, mockTemplates } from './mock-data';

// Create stores
export const documents = writable<CustomerDocument[]>(mockDocuments);
export const documentTemplates = writable<DocumentTemplate[]>(mockTemplates);
export const selectedDocument = writable<CustomerDocument | null>(null);
export const uploadProgress = writable<{ [key: string]: number }>({}); 