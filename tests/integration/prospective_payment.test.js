import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PR_ProspectivePayment } from '../../src/library/prospective_payment.js';
import { PR_Currency } from '../../src/library/currency.js';
import { PR_ApiRequest } from '../../src/ancillary/request.js';

describe('PR_ProspectivePayment', () => {
    describe('path constants', () => {
        it('should have correct path', () => {
            expect(PR_ProspectivePayment.path).toBe('/credit/prospective-payment');
        });

        it('should have correct listPath', () => {
            expect(PR_ProspectivePayment.listPath).toBe('/credit/prospective-payment/list');
        });
    });

    describe('constructor', () => {
        it('should create prospective payment', () => {
            const payment = new PR_ProspectivePayment(
                '50.00',
                1,
                '123456',
                12,
                PR_Currency.AUD
            );

            expect(payment.periods).toBe(12);
            expect(payment.supplierId).toBe('123456');
        });
    });

    describe('amount', () => {
        it('should return PR_Amount with payment and currency', () => {
            const payment = new PR_ProspectivePayment(
                '50.00',
                1,
                '123456',
                12,
                PR_Currency.AUD
            );

            const amount = payment.amount;

            expect(amount.magnitude).toBe('50.00');
            expect(amount.denomination.iso_4217).toBe('AUD');
        });
    });

    describe('decode', () => {
        it('should decode API response', () => {
            const data = {
                payment: '55.00',
                cycle: 1,
                supplier_id: '789',
                periods: 6,
                currency: {
                    indexid: 1,
                    iso_4217: 'AUD',
                    name: 'Australian Dollar',
                    exponent: 2,
                    symbol: '$'
                }
            };

            const payment = PR_ProspectivePayment.decode(data);

            expect(payment.periods).toBe(6);
            expect(payment.supplierId).toBe('789');
            expect(payment.amount.magnitude).toBe('55.00');
        });
    });

    describe('retrieve', () => {
        let originalMake;

        beforeEach(() => {
            originalMake = PR_ApiRequest.make;
        });

        afterEach(() => {
            PR_ApiRequest.make = originalMake;
        });

        it('should call API with correct parameters', () => {
            const mockMake = vi.fn();
            PR_ApiRequest.make = mockMake;

            PR_ProspectivePayment.retrieve(
                () => {},
                '600',
                '123456',
                PR_Currency.AUD,
                12
            );

            expect(mockMake).toHaveBeenCalledWith(
                '/credit/prospective-payment',
                'GET',
                expect.anything(),
                null,
                expect.any(Function),
                null,
                null,
                null,
                true
            );
        });

        it('should handle successful response', () => {
            PR_ApiRequest.make = vi.fn((path, method, params, data, callback) => {
                callback(null, {
                    payment: '50.00',
                    cycle: 1,
                    supplier_id: '123456',
                    periods: 12,
                    currency: {
                        indexid: 1,
                        iso_4217: 'AUD',
                        name: 'Australian Dollar',
                        exponent: 2,
                        symbol: '$'
                    }
                });
            });

            return new Promise((resolve) => {
                PR_ProspectivePayment.retrieve(
                    (error, payment) => {
                        expect(error).toBeNull();
                        expect(payment).not.toBeNull();
                        expect(payment.amount.magnitude).toBe('50.00');
                        resolve();
                    },
                    '600',
                    '123456',
                    PR_Currency.AUD,
                    12
                );
            });
        });

        it('should handle error response', () => {
            PR_ApiRequest.make = vi.fn((path, method, params, data, callback) => {
                callback(new Error('API Error'), null);
            });

            return new Promise((resolve) => {
                PR_ProspectivePayment.retrieve(
                    (error, payment) => {
                        expect(error).not.toBeNull();
                        expect(payment).toBeNull();
                        resolve();
                    },
                    '600',
                    '123456',
                    PR_Currency.AUD,
                    12
                );
            });
        });
    });

    describe('retrieveAllAvailable', () => {
        let originalMake;

        beforeEach(() => {
            originalMake = PR_ApiRequest.make;
        });

        afterEach(() => {
            PR_ApiRequest.make = originalMake;
        });

        it('should call list API endpoint', () => {
            const mockMake = vi.fn();
            PR_ApiRequest.make = mockMake;

            PR_ProspectivePayment.retrieveAllAvailable(
                () => {},
                '600',
                PR_Currency.AUD,
                '123456'
            );

            expect(mockMake).toHaveBeenCalledWith(
                '/credit/prospective-payment/list',
                'GET',
                expect.anything(),
                null,
                expect.any(Function),
                null,
                null,
                null,
                true
            );
        });

        it('should handle array response', () => {
            PR_ApiRequest.make = vi.fn((path, method, params, data, callback) => {
                callback(null, [
                    {
                        payment: '50.00',
                        cycle: 1,
                        supplier_id: '123456',
                        periods: 6,
                        currency: { indexid: 1, iso_4217: 'AUD', name: 'Australian Dollar', exponent: 2, symbol: '$' }
                    },
                    {
                        payment: '35.00',
                        cycle: 1,
                        supplier_id: '123456',
                        periods: 12,
                        currency: { indexid: 1, iso_4217: 'AUD', name: 'Australian Dollar', exponent: 2, symbol: '$' }
                    }
                ]);
            });

            return new Promise((resolve) => {
                PR_ProspectivePayment.retrieveAllAvailable(
                    (error, payments) => {
                        expect(error).toBeNull();
                        expect(payments).toHaveLength(2);
                        expect(payments[0].periods).toBe(6);
                        expect(payments[1].periods).toBe(12);
                        resolve();
                    },
                    '600',
                    PR_Currency.AUD,
                    '123456'
                );
            });
        });
    });
});
