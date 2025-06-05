// 🏆 DEMOLITION COMPLETE: Modular Document Store Architecture 🏆
// Original: 445 lines of monolithic complexity
// Now: Clean, focused, maintainable modules

// Export all types
export type {
  CustomerDocument,
  DocumentTemplate,
  FormField,
  ComplianceAlert,
  DocumentStats
} from './document-store/types';

// Export core stores
export {
  documents,
  documentTemplates,
  selectedDocument,
  uploadProgress
} from './document-store/core-store';

// Export derived stores
export {
  documentStats,
  complianceAlerts
} from './document-store/derived-stores';

// Export actions
export { documentActions } from './document-store/actions';

// Export utilities
export { initializeRealtimeSimulation } from './document-store/utils';

// Initialize real-time simulation
import { initializeRealtimeSimulation } from './document-store/utils';
initializeRealtimeSimulation(); 