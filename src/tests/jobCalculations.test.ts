import { describe, it, expect } from 'vitest';
import {
  calculateDistance,
  formatTime,
  formatDuration,
  getPriorityColor,
  getPriorityLabel,
  getTimeUntilJob,
  isJobReady,
  calculateJobMetrics
} from '../lib/utils/jobCalculations';
import type { ScheduledJob, Location } from '../lib/types/job.types';

describe('Job Calculations', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two coordinates', () => {
      // Houston to Dallas approximately 225 miles (corrected expectation)
      const houstonLat = 29.7604;
      const houstonLng = -95.3698;
      const dallasLat = 32.7767;
      const dallasLng = -96.7970;
      
      const distance = calculateDistance(houstonLat, houstonLng, dallasLat, dallasLng);
      expect(distance).toBeCloseTo(225, 0); // Within 1 mile
    });

    it('should return 0 for same coordinates', () => {
      const distance = calculateDistance(29.7604, -95.3698, 29.7604, -95.3698);
      expect(distance).toBeCloseTo(0, 2);
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      const date = new Date('2024-01-01T14:30:00');
      const formatted = formatTime(date);
      expect(formatted).toMatch(/2:30\s*PM/i);
    });
  });

  describe('formatDuration', () => {
    it('should format hours and minutes', () => {
      expect(formatDuration(2.5)).toBe('2h 30m');
      expect(formatDuration(1.25)).toBe('1h 15m');
    });

    it('should format minutes only for less than 1 hour', () => {
      expect(formatDuration(0.5)).toBe('30m');
      expect(formatDuration(0.25)).toBe('15m');
    });

    it('should handle zero duration', () => {
      expect(formatDuration(0)).toBe('0m');
    });
  });

  describe('getPriorityColor', () => {
    it('should return correct colors for priorities', () => {
      expect(getPriorityColor('urgent')).toBe('#dc2626');
      expect(getPriorityColor('high')).toBe('#f59e0b');
      expect(getPriorityColor('normal')).toBe('#3b82f6');
      expect(getPriorityColor('low')).toBe('#6b7280');
      expect(getPriorityColor('unknown')).toBe('#6b7280');
    });
  });

  describe('getPriorityLabel', () => {
    it('should capitalize priority labels', () => {
      expect(getPriorityLabel('urgent')).toBe('Urgent');
      expect(getPriorityLabel('high')).toBe('High');
      expect(getPriorityLabel('normal')).toBe('Normal');
    });
  });

  describe('getTimeUntilJob', () => {
    it('should return overdue for past jobs', () => {
      const pastDate = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
      expect(getTimeUntilJob(pastDate)).toBe('Overdue');
    });

    it('should return correct time for future jobs', () => {
      const futureDate = new Date(Date.now() + 2.5 * 60 * 60 * 1000); // 2.5 hours from now
      const result = getTimeUntilJob(futureDate);
      expect(result).toMatch(/2h \d+m/);
    });

    it('should return minutes only for jobs less than 1 hour away', () => {
      const futureDate = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
      const result = getTimeUntilJob(futureDate);
      expect(result).toMatch(/\d+m/);
      expect(result).not.toMatch(/h/);
    });
  });

  describe('isJobReady', () => {
    it('should return true for jobs within 30 minutes', () => {
      const mockJob: ScheduledJob = {
        id: 'test-1',
        accountName: 'Test Account',
        priority: 'normal',
        estimatedUnits: 100,
        tankLevelHeight: '50%',
        loadType: 'product',
        distance: 50,
        estimatedDuration: 2,
        scheduledTime: new Date(Date.now() + 20 * 60 * 1000), // 20 minutes from now
        pickupLocation: {
          name: 'Test Pickup',
          address: 'Test Address',
          coordinates: { lat: 29.7604, lng: -95.3698 },
          tankNumber: 'T-001',
          facilityType: 'collection point'
        },
        deliveryLocation: {
          name: 'Test Delivery',
          address: 'Test Address',
          coordinates: { lat: 29.7604, lng: -95.3698 },
          facilityType: 'processing facility'
        },
        customerContact: {
          name: 'Test Contact',
          phone: '555-0123',
          role: 'operator'
        },
        status: 'scheduled'
      };

      expect(isJobReady(mockJob)).toBe(true);
    });

    it('should return false for jobs more than 30 minutes away', () => {
      const mockJob: ScheduledJob = {
        id: 'test-1',
        accountName: 'Test Account',
        priority: 'normal',
        estimatedUnits: 100,
        tankLevelHeight: '50%',
        loadType: 'product',
        distance: 50,
        estimatedDuration: 2,
        scheduledTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
        pickupLocation: {
          name: 'Test Pickup',
          address: 'Test Address',
          coordinates: { lat: 29.7604, lng: -95.3698 },
          tankNumber: 'T-001',
          facilityType: 'collection point'
        },
        deliveryLocation: {
          name: 'Test Delivery',
          address: 'Test Address',
          coordinates: { lat: 29.7604, lng: -95.3698 },
          facilityType: 'processing facility'
        },
        customerContact: {
          name: 'Test Contact',
          phone: '555-0123',
          role: 'operator'
        },
        status: 'scheduled'
      };

      expect(isJobReady(mockJob)).toBe(false);
    });
  });

  describe('calculateJobMetrics', () => {
    it('should calculate all metrics correctly', () => {
      const mockJob: ScheduledJob = {
        id: 'test-1',
        accountName: 'Test Account',
        priority: 'normal',
        estimatedUnits: 100,
        tankLevelHeight: '50%',
        loadType: 'product',
        distance: 50,
        estimatedDuration: 2,
        scheduledTime: new Date(Date.now() + 20 * 60 * 1000), // 20 minutes from now
        pickupLocation: {
          name: 'Test Pickup',
          address: 'Test Address',
          coordinates: { lat: 29.8604, lng: -95.4698 }, // ~10 miles from current location
          tankNumber: 'T-001',
          facilityType: 'collection point'
        },
        deliveryLocation: {
          name: 'Test Delivery',
          address: 'Test Address',
          coordinates: { lat: 29.7604, lng: -95.3698 },
          facilityType: 'processing facility'
        },
        customerContact: {
          name: 'Test Contact',
          phone: '555-0123',
          role: 'operator'
        },
        status: 'scheduled'
      };

      const currentLocation: Location = {
        lat: 29.7604,
        lng: -95.3698,
        address: 'Houston Dispatch Yard'
      };

      const metrics = calculateJobMetrics(mockJob, currentLocation);

      expect(metrics.distanceToPickup).toBeGreaterThan(0);
      expect(metrics.estimatedTravelTime).toBeGreaterThan(0);
      expect(metrics.timeUntilJob).toMatch(/\d+m/);
      expect(metrics.isJobReady).toBe(true);
    });
  });
}); 