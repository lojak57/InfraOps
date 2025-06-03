import type { CustomerDocument } from '$lib/stores/documentStore';

export interface DocumentContent {
  type: 'pdf' | 'image' | 'text' | 'document' | 'unknown';
  content: string;
  icon: any;
}

export interface ViewerControls {
  zoomLevel: number;
  rotation: number;
}

export interface DocumentViewerEvents {
  close: void;
  download: { document: CustomerDocument };
}

export interface DocumentGeneratorContext {
  document: CustomerDocument;
  fileExtension: string;
}

export type DocumentType = 'IFTA' | 'Insurance' | 'PreTrip' | string; 