import { describe, it, expect } from 'vitest';
import { PR_Currency } from '../../src/library/currency.js';

describe('PR_Currency', () => {
    describe('static currencies', () => {
        it('should have AUD currency', () => {
            const aud = PR_Currency.AUD;

            expect(aud.indexid).toBe(1);
            expect(aud.iso_4217).toBe('AUD');
            expect(aud.name).toBe('Australian Dollar');
            expect(aud.exponent).toBe(2);
            expect(aud.symbol).toBe('$');
        });

        it('should have NZD currency', () => {
            const nzd = PR_Currency.NZD;

            expect(nzd.indexid).toBe(2);
            expect(nzd.iso_4217).toBe('NZD');
            expect(nzd.name).toBe('New Zealand Dollar');
            expect(nzd.exponent).toBe(2);
            expect(nzd.symbol).toBe('$');
        });
    });

    describe('allAvailable', () => {
        it('should return array of all currencies', () => {
            const currencies = PR_Currency.allAvailable;

            expect(currencies).toHaveLength(2);
            expect(currencies[0].iso_4217).toBe('AUD');
            expect(currencies[1].iso_4217).toBe('NZD');
        });
    });

    describe('enumerations', () => {
        it('should return array of all enumerations', () => {
            const enums = PR_Currency.enumerations;

            expect(enums).toHaveLength(2);
        });
    });

    describe('withId', () => {
        it('should return AUD for id 1', () => {
            const currency = PR_Currency.withId(1);
            expect(currency.iso_4217).toBe('AUD');
        });

        it('should return NZD for id 2', () => {
            const currency = PR_Currency.withId(2);
            expect(currency.iso_4217).toBe('NZD');
        });

        it('should throw for unknown id', () => {
            expect(() => PR_Currency.withId(999)).toThrow('Unknown currency 999');
        });
    });

    describe('decode', () => {
        it('should decode currency object', () => {
            const data = {
                indexid: 1,
                iso_4217: 'AUD',
                name: 'Australian Dollar',
                exponent: 2,
                symbol: '$'
            };

            const currency = PR_Currency.decode(data);

            expect(currency.indexid).toBe(1);
            expect(currency.iso_4217).toBe('AUD');
        });

        it('should uppercase iso_4217', () => {
            const data = {
                indexid: 1,
                iso_4217: 'aud',
                name: 'Australian Dollar',
                exponent: 2,
                symbol: '$'
            };

            const currency = PR_Currency.decode(data);
            expect(currency.iso_4217).toBe('AUD');
        });
    });
});
