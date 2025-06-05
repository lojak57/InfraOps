import { derived } from 'svelte/store';
import { browser } from '$app/environment';
import type { CustomerDocument, DocumentStats, ComplianceAlert } from './types';
import { documents } from './core-store';

// Derived stores for analytics
export const documentStats = derived(documents, ($documents: CustomerDocument[]): DocumentStats => {
  // Use static timestamp for SSR consistency, will be updated on client
  const now = browser ? new Date() : new Date(1735064220000);
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  const total = $documents.length;
  const valid = $documents.filter((doc: CustomerDocument) => doc.status === 'valid').length;
  const expired = $documents.filter((doc: CustomerDocument) => doc.status === 'expired').length;
  const expiring = $documents.filter((doc: CustomerDocument) => 
    doc.expiryDate && doc.expiryDate <= thirtyDaysFromNow && doc.expiryDate > now
  ).length;
  const pending = $documents.filter((doc: CustomerDocument) => doc.status === 'pending').length;
  
  const complianceScore = total > 0 ? Math.round(((valid + pending) / total) * 100) : 100;
  
  return {
    totalDocuments: total,
    validDocuments: valid,
    expiredDocuments: expired,
    expiringDocuments: expiring,
    pendingDocuments: pending,
    complianceScore,
    lastUpdated: now
  };
});

export const complianceAlerts = derived(documents, ($documents: CustomerDocument[]): ComplianceAlert[] => {
  const alerts: ComplianceAlert[] = [];
  // Use static timestamp for SSR consistency, will be updated on client
  const now = browser ? new Date() : new Date(1735064220000);
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  $documents.forEach((doc: CustomerDocument) => {
    if (doc.status === 'expired') {
      alerts.push({
        id: `alert-${doc.id}-expired`,
        documentId: doc.id,
        type: 'expired',
        severity: 'critical',
        message: `${doc.type} document "${doc.fileName}" has expired`,
        actionRequired: 'Upload new document immediately',
        createdAt: now,
        acknowledged: false
      });
    } else if (doc.expiryDate && doc.expiryDate <= thirtyDaysFromNow && doc.expiryDate > now) {
      const daysUntilExpiry = Math.ceil((doc.expiryDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
      alerts.push({
        id: `alert-${doc.id}-expiring`,
        documentId: doc.id,
        type: 'expiring',
        severity: daysUntilExpiry <= 7 ? 'high' : 'medium',
        message: `${doc.type} document "${doc.fileName}" expires in ${daysUntilExpiry} days`,
        daysUntilExpiry,
        actionRequired: 'Schedule document renewal',
        createdAt: now,
        acknowledged: false
      });
    }
  });
  
  return alerts.sort((a, b) => {
    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
}); 