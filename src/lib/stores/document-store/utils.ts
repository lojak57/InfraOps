import type { CustomerDocument } from './types';
import { documents } from './core-store';

// Real-time simulation for demo
export function initializeRealtimeSimulation() {
  if (typeof window !== 'undefined') {
    setInterval(() => {
      // Simulate document status updates
      documents.update((docs: CustomerDocument[]) => {
        return docs.map((doc: CustomerDocument) => {
          // Randomly update some document statuses for demo
          if (Math.random() < 0.1) { // 10% chance
            const statuses: CustomerDocument['status'][] = ['valid', 'pending', 'expired', 'expiring_soon'];
            const currentIndex = statuses.indexOf(doc.status);
            const newStatus = statuses[(currentIndex + 1) % statuses.length];
            return { ...doc, status: newStatus };
          }
          return doc;
        });
      });
    }, 15000); // Update every 15 seconds for demo
  }
} 