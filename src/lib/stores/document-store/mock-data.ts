import type { CustomerDocument, DocumentTemplate } from './types';

// Mock data for demonstration
export const mockDocuments: CustomerDocument[] = [
  {
    id: 'doc-001',
    customerId: 'customer-001',
    jobId: 'job-001',
    type: 'IFTA',
    fileName: 'IFTA_Q4_2024.pdf',
    fileUrl: '/documents/ifta_q4_2024.pdf',
    uploadDate: new Date('2024-01-15'),
    expiryDate: new Date('2024-12-31'),
    status: 'valid',
    uploadedBy: 'John Smith',
    fileSize: 2048576,
    tags: ['quarterly', 'tax', 'fuel'],
    metadata: {
      description: 'Q4 2024 IFTA fuel tax report',
      version: '1.0',
      approvedBy: 'Sarah Johnson',
      approvalDate: new Date('2024-01-16'),
      priority: 'high'
    }
  },
  {
    id: 'doc-002',
    customerId: 'customer-001',
    type: 'Insurance',
    fileName: 'Commercial_Auto_Insurance_2024.pdf',
    fileUrl: '/documents/insurance_2024.pdf',
    uploadDate: new Date('2024-01-01'),
    expiryDate: new Date('2024-03-15'),
    status: 'expiring_soon',
    uploadedBy: 'Mike Davis',
    fileSize: 1536000,
    tags: ['insurance', 'commercial', 'auto'],
    metadata: {
      description: 'Commercial auto insurance policy',
      version: '2024.1',
      priority: 'critical',
      notes: 'Renewal required before March 15th'
    }
  },
  {
    id: 'doc-003',
    customerId: 'customer-002',
    type: 'PreTrip',
    fileName: 'PreTrip_Inspection_20240115.pdf',
    fileUrl: '/documents/pretrip_20240115.pdf',
    uploadDate: new Date('2024-01-15'),
    status: 'valid',
    uploadedBy: 'Driver Tom Wilson',
    fileSize: 512000,
    tags: ['inspection', 'safety', 'daily'],
    metadata: {
      description: 'Daily pre-trip inspection report',
      version: '1.0',
      priority: 'medium'
    }
  },
  {
    id: 'doc-004',
    customerId: 'customer-001',
    type: 'JSA',
    fileName: 'Job_Safety_Analysis_Tank_Cleaning.pdf',
    fileUrl: '/documents/jsa_tank_cleaning.pdf',
    uploadDate: new Date('2023-12-01'),
    expiryDate: new Date('2024-01-10'),
    status: 'expired',
    uploadedBy: 'Safety Manager',
    fileSize: 768000,
    tags: ['safety', 'jsa', 'tank-cleaning'],
    metadata: {
      description: 'Job Safety Analysis for tank cleaning operations',
      version: '3.2',
      priority: 'critical',
      notes: 'Requires immediate renewal'
    }
  }
];

export const mockTemplates: DocumentTemplate[] = [
  {
    id: 'template-001',
    name: 'IFTA Quarterly Report',
    type: 'IFTA',
    description: 'International Fuel Tax Agreement quarterly filing',
    isRequired: true,
    renewalPeriod: 90,
    category: 'legal',
    fields: [
      {
        id: 'quarter',
        name: 'quarter',
        type: 'select',
        label: 'Reporting Quarter',
        required: true,
        options: ['Q1', 'Q2', 'Q3', 'Q4']
      },
      {
        id: 'year',
        name: 'year',
        type: 'number',
        label: 'Reporting Year',
        required: true,
        validation: { min: 2020, max: 2030 }
      },
      {
        id: 'totalMiles',
        name: 'totalMiles',
        type: 'number',
        label: 'Total Miles Driven',
        required: true,
        validation: { min: 0 }
      }
    ]
  },
  {
    id: 'template-002',
    name: 'Pre-Trip Inspection',
    type: 'PreTrip',
    description: 'Daily vehicle inspection checklist',
    isRequired: true,
    category: 'safety',
    fields: [
      {
        id: 'vehicleId',
        name: 'vehicleId',
        type: 'text',
        label: 'Vehicle ID',
        required: true
      },
      {
        id: 'driverName',
        name: 'driverName',
        type: 'text',
        label: 'Driver Name',
        required: true
      },
      {
        id: 'inspectionDate',
        name: 'inspectionDate',
        type: 'date',
        label: 'Inspection Date',
        required: true
      },
      {
        id: 'defectsFound',
        name: 'defectsFound',
        type: 'checkbox',
        label: 'Defects Found',
        required: false
      },
      {
        id: 'notes',
        name: 'notes',
        type: 'textarea',
        label: 'Additional Notes',
        required: false
      }
    ]
  }
]; 