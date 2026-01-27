import { describe, it, expect, vi } from 'vitest';
import { PR_Time } from '../../src/ancillary/time.js';

describe('PR_Time', () => {
    describe('constructor', () => {
        it('should create time from Date object', () => {
            const date = new Date('2024-01-15T10:30:00Z');
            const time = new PR_Time(date);

            expect(time.date).toEqual(date);
        });
    });

    describe('timestamp', () => {
        it('should return milliseconds since epoch', () => {
            const date = new Date('2024-01-15T10:30:00Z');
            const time = new PR_Time(date);

            expect(time.timestamp).toBe(date.getTime());
        });
    });

    describe('isoString', () => {
        it('should return ISO 8601 formatted string', () => {
            const date = new Date('2024-01-15T10:30:00Z');
            const time = new PR_Time(date);

            expect(time.isoString).toBe('2024-01-15T10:30:00.000Z');
        });
    });

    describe('now', () => {
        it('should create time with current date', () => {
            const before = Date.now();
            const time = PR_Time.now();
            const after = Date.now();

            expect(time.timestamp).toBeGreaterThanOrEqual(before);
            expect(time.timestamp).toBeLessThanOrEqual(after);
        });
    });

    describe('fromTimestamp', () => {
        it('should create time from timestamp', () => {
            const timestamp = 1705315800000; // 2024-01-15T10:30:00Z
            const time = PR_Time.fromTimestamp(timestamp);

            expect(time.timestamp).toBe(timestamp);
        });
    });

    describe('decode', () => {
        it('should decode ISO 8601 string', () => {
            const time = PR_Time.decode('2024-01-15T10:30:00Z');

            expect(time).not.toBeNull();
            expect(time.isoString).toBe('2024-01-15T10:30:00.000Z');
        });

        it('should return null for falsy input', () => {
            expect(PR_Time.decode(null)).toBeNull();
            expect(PR_Time.decode('')).toBeNull();
            expect(PR_Time.decode(undefined)).toBeNull();
        });
    });

    describe('optionallyDecode', () => {
        it('should decode valid data', () => {
            const time = PR_Time.optionallyDecode('2024-01-15T10:30:00Z');
            expect(time).not.toBeNull();
        });

        it('should return null for falsy data', () => {
            expect(PR_Time.optionallyDecode(null)).toBeNull();
        });
    });

    describe('encode', () => {
        it('should return ISO 8601 string', () => {
            const date = new Date('2024-01-15T10:30:00Z');
            const time = new PR_Time(date);

            expect(time.encode()).toBe('2024-01-15T10:30:00.000Z');
        });
    });
});
