/** @type {string} */
export const PR_ERROR_INFO_KEY: string;
/**
 * Customer-facing error messages by HTTP status code
 * @type {Record<number, string>}
 */
export const PR_ERROR_CUSTOMER_INFORMATION: Record<number, string>;
/**
 * Fallback error message
 * @type {string}
 */
export const PR_ERROR_FALLBACK_INFORMATION: string;
/**
 * API error with customer-friendly and technical descriptions
 * @extends Error
 */
export class PR_ApiError extends Error {
    /**
     * Generic error description
     * @type {string}
     */
    static get genericDescription(): string;
    /**
     * @param {number} code - HTTP status code
     * @param {Object|null} [data] - Response data
     * @param {Object|null} [requestSummary] - Request summary for debugging
     */
    constructor(code: number, data?: any | null, requestSummary?: any | null);
    /** @type {number} */
    _code: number;
    /** @type {string} */
    _customerDescription: string;
    /** @type {string} */
    _technicalDescription: string;
    /** @type {Object|null} */
    _requestSummary: any | null;
    /** @type {number} - HTTP status code */
    get code(): number;
    /** @type {string} - Customer-friendly error description */
    get customerDescription(): string;
    /** @type {string} - Technical error description */
    get technicalDescription(): string;
}
//# sourceMappingURL=error.d.ts.map