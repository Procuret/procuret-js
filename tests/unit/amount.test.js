import { describe, it, expect } from 'vitest';
import { PR_Amount } from '../../src/ancillary/amount.js';
import { PR_Currency } from '../../src/library/currency.js';

describe('PR_Amount', () => {
    describe('constructor', () => {
        it('should create an amount with magnitude and currency', () => {
            const amount = new PR_Amount('100.00', PR_Currency.AUD);

            expect(amount.magnitude).toBe('100.00');
            expect(amount.denomination).toEqual(PR_Currency.AUD);
        });

        it('should throw if currency is falsy', () => {
            expect(() => new PR_Amount('100.00', null)).toThrow('Cannot init w/ falsey PR_Currency');
        });
    });

    describe('asNumber', () => {
        it('should return magnitude as Number', () => {
            const amount = new PR_Amount('100.50', PR_Currency.AUD);
            expect(Number(amount.asNumber)).toBe(100.50);
        });
    });

    describe('isGreaterThanZero', () => {
        it('should return true for positive amounts', () => {
            const amount = new PR_Amount('100.00', PR_Currency.AUD);
            expect(amount.isGreaterThanZero).toBe(true);
        });

        it('should return false for zero amounts', () => {
            const amount = new PR_Amount('0', PR_Currency.AUD);
            expect(amount.isGreaterThanZero).toBe(false);
        });

        it('should return false for negative amounts', () => {
            const amount = new PR_Amount('-50', PR_Currency.AUD);
            expect(amount.isGreaterThanZero).toBe(false);
        });
    });

    describe('rounded', () => {
        it('should round to specified decimal places', () => {
            const amount = new PR_Amount('100.456', PR_Currency.AUD);
            const rounded = amount.rounded(2);

            expect(rounded.magnitude).toBe('100.46');
            expect(rounded.denomination).toEqual(PR_Currency.AUD);
        });
    });

    describe('magnitudeIsGreaterThan', () => {
        it('should return true when magnitude exceeds value', () => {
            const amount = new PR_Amount('100', PR_Currency.AUD);
            expect(amount.magnitudeIsGreaterThan(50)).toBe(true);
        });

        it('should return false when magnitude is less than value', () => {
            const amount = new PR_Amount('100', PR_Currency.AUD);
            expect(amount.magnitudeIsGreaterThan(150)).toBe(false);
        });
    });

    describe('encode', () => {
        it('should encode amount to object', () => {
            const amount = new PR_Amount('100.00', PR_Currency.AUD);
            const encoded = amount.encode();

            expect(encoded).toEqual({
                magnitude: '100.00',
                denomination: 1
            });
        });
    });

    describe('decode', () => {
        it('should decode object to PR_Amount', () => {
            const data = {
                magnitude: '250.50',
                denomination: {
                    indexid: 1,
                    iso_4217: 'AUD',
                    name: 'Australian Dollar',
                    exponent: 2,
                    symbol: '$'
                }
            };

            const amount = PR_Amount.decode(data);

            expect(amount.magnitude).toBe('250.50');
            expect(amount.denomination.iso_4217).toBe('AUD');
        });
    });

    describe('optionallyDecode', () => {
        it('should return null for falsy data', () => {
            expect(PR_Amount.optionallyDecode(null)).toBeNull();
            expect(PR_Amount.optionallyDecode(undefined)).toBeNull();
        });

        it('should decode valid data', () => {
            const data = {
                magnitude: '100',
                denomination: {
                    indexid: 1,
                    iso_4217: 'AUD',
                    name: 'Australian Dollar',
                    exponent: 2,
                    symbol: '$'
                }
            };

            const amount = PR_Amount.optionallyDecode(data);
            expect(amount).not.toBeNull();
            expect(amount.magnitude).toBe('100');
        });
    });
});
