export interface CustomerDocument {
  id: string;
  customerId: string;
  jobId?: string;
  type: 'IFTA' | 'Insurance' | 'Contract' | 'PreTrip' | 'JSA' | 'Emissions' | 'BOL' | 'Manifest' | 'Safety' | 'Maintenance';
  fileName: string;
  fileUrl: string;
  uploadDate: Date;
  expiryDate?: Date;
  status: 'valid' | 'expired' | 'pending' | 'rejected' | 'expiring_soon';
  uploadedBy: string;
  fileSize: number;
  tags: string[];
  metadata: {
    description?: string;
    version?: string;
    approvedBy?: string;
    approvalDate?: Date;
    notes?: string;
    priority?: 'low' | 'medium' | 'high' | 'critical';
  };
}

export interface DocumentTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  fields: FormField[];
  customerId?: string;
  isRequired: boolean;
  renewalPeriod?: number; // days
  category: 'legal' | 'safety' | 'operational' | 'financial';
}

export interface FormField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'file' | 'textarea';
  label: string;
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface ComplianceAlert {
  id: string;
  documentId: string;
  type: 'expiring' | 'expired' | 'missing' | 'invalid';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  daysUntilExpiry?: number;
  actionRequired: string;
  createdAt: Date;
  acknowledged: boolean;
}

export interface DocumentStats {
  totalDocuments: number;
  validDocuments: number;
  expiredDocuments: number;
  expiringDocuments: number;
  pendingDocuments: number;
  complianceScore: number;
  lastUpdated: Date;
} 