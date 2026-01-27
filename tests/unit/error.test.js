import { describe, it, expect } from 'vitest';
import {
    PR_ApiError,
    PR_ERROR_INFO_KEY,
    PR_ERROR_CUSTOMER_INFORMATION,
    PR_ERROR_FALLBACK_INFORMATION
} from '../../src/ancillary/error.js';

describe('PR_ApiError', () => {
    describe('constructor', () => {
        it('should create error with code', () => {
            const error = new PR_ApiError(400);

            expect(error.code).toBe(400);
            expect(error).toBeInstanceOf(Error);
        });

        it('should set customer description for known codes', () => {
            const error = new PR_ApiError(400);

            expect(error.customerDescription).toBe(PR_ERROR_CUSTOMER_INFORMATION[400]);
        });

        it('should use fallback for unknown codes', () => {
            const error = new PR_ApiError(999);

            expect(error.customerDescription).toBe(PR_ERROR_FALLBACK_INFORMATION);
        });

        it('should extract technical description from data', () => {
            const data = {
                [PR_ERROR_INFO_KEY]: 'Detailed error info'
            };
            const error = new PR_ApiError(400, data);

            expect(error.technicalDescription).toBe('Detailed error info');
        });

        it('should use generic description when no error info', () => {
            const error = new PR_ApiError(400);

            expect(error.technicalDescription).toBe('Generic 400');
        });

        it('should handle code 0 as client side error', () => {
            const error = new PR_ApiError(0);

            expect(error.technicalDescription).toBe('Client side error');
        });
    });

    describe('genericDescription', () => {
        it('should return fallback information', () => {
            expect(PR_ApiError.genericDescription).toBe(PR_ERROR_FALLBACK_INFORMATION);
        });
    });

    describe('known error codes', () => {
        const knownCodes = [400, 500, 503, 401, 403, 429, 404, 422];

        knownCodes.forEach(code => {
            it(`should have customer description for ${code}`, () => {
                expect(PR_ERROR_CUSTOMER_INFORMATION[code]).toBeDefined();
            });
        });
    });
});
