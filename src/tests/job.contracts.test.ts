import { describe, it, expect } from 'vitest';
import { validateJobContract, isValidJobStatus, type JobContract } from '../lib/types/contracts/job.contracts';

describe('Job Contracts', () => {
  describe('isValidJobStatus', () => {
    it('should validate correct job statuses', () => {
      expect(isValidJobStatus('scheduled')).toBe(true);
      expect(isValidJobStatus('en-route')).toBe(true);
      expect(isValidJobStatus('pickup')).toBe(true);
      expect(isValidJobStatus('transit')).toBe(true);
      expect(isValidJobStatus('unpickup')).toBe(true);
      expect(isValidJobStatus('completed')).toBe(true);
      expect(isValidJobStatus('cancelled')).toBe(true);
      expect(isValidJobStatus('delayed')).toBe(true);
    });

    it('should reject invalid job statuses', () => {
      expect(isValidJobStatus('invalid')).toBe(false);
      expect(isValidJobStatus('COMPLETED')).toBe(false);
      expect(isValidJobStatus('')).toBe(false);
      expect(isValidJobStatus('in-progress')).toBe(false);
    });
  });

  describe('validateJobContract', () => {
    const validJob: JobContract = {
      id: 'job-123',
      truckId: 'truck-456',
      driverId: 'driver-789',
      pickupTime: new Date('2024-01-01T10:00:00Z'),
      dropoffTime: new Date('2024-01-01T14:00:00Z'),
      estimatedUnits: 1000,
      actualUnits: 995,
      volumeLoss: 5,
      status: 'completed',
      origin: {
        id: 'loc-1',
        name: 'Origin Site',
        address: '123 Origin St',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        type: 'pickup'
      },
      destination: {
        id: 'loc-2',
        name: 'Destination Site',
        address: '456 Destination Ave',
        coordinates: { lat: 40.7589, lng: -73.9851 },
        type: 'delivery'
      },
      createdAt: new Date('2024-01-01T09:00:00Z'),
      updatedAt: new Date('2024-01-01T14:30:00Z')
    };

    it('should validate a correct job contract', () => {
      expect(validateJobContract(validJob)).toBe(true);
    });

    it('should reject null or undefined', () => {
      expect(validateJobContract(null)).toBe(false);
      expect(validateJobContract(undefined)).toBe(false);
    });

    it('should reject non-objects', () => {
      expect(validateJobContract('string')).toBe(false);
      expect(validateJobContract(123)).toBe(false);
      expect(validateJobContract([])).toBe(false);
    });

    it('should reject objects with missing required fields', () => {
      const invalidJob = { ...validJob };
      delete (invalidJob as any).id;
      expect(validateJobContract(invalidJob)).toBe(false);
    });

    it('should reject objects with invalid status', () => {
      const invalidJob = { ...validJob, status: 'invalid-status' };
      expect(validateJobContract(invalidJob)).toBe(false);
    });

    it('should accept null dropoffTime for scheduled jobs', () => {
      const scheduledJob = { ...validJob, dropoffTime: null, status: 'scheduled' };
      expect(validateJobContract(scheduledJob)).toBe(true);
    });
  });
}); 