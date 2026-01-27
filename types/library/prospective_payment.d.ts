/**
 * @typedef {Object} Session
 * @property {string} apiKey - API key
 * @property {string} sessionId - Session ID
 */
/**
 * Theoretical payment amount for instalment plan quotations.
 * Use this to display potential payment options to customers.
 */
export class PR_ProspectivePayment {
    /** @type {string} */
    static get path(): string;
    /** @type {string} */
    static get listPath(): string;
    /**
     * Decode from raw data
     * @param {{payment: string, cycle: number, supplier_id: string, periods: number, currency: Object}} data
     * @returns {PR_ProspectivePayment}
     */
    static decode(data: {
        payment: string;
        cycle: number;
        supplier_id: string;
        periods: number;
        currency: any;
    }): PR_ProspectivePayment;
    /**
     * Retrieve a single prospective payment for specified parameters.
     * @param {function(Error|null, PR_ProspectivePayment|null): void} callback - Callback receiving error or payment
     * @param {string} principal - Loan principal amount as string
     * @param {string} supplierId - Supplier ID
     * @param {PR_Currency} denomination - Currency denomination
     * @param {number} months - Number of payment months
     * @param {string|null} [endpoint] - Optional API endpoint override
     * @param {Session|null} [session] - Optional session for authentication
     */
    static retrieve(callback: (arg0: Error | null, arg1: PR_ProspectivePayment | null) => void, principal: string, supplierId: string, denomination: PR_Currency, months: number, endpoint?: string | null, session?: Session | null): void;
    /**
     * Retrieve all available prospective payments for given parameters.
     * @param {function(Error|null, PR_ProspectivePayment[]|null): void} callback - Callback receiving error or payments
     * @param {string} principal - Loan principal amount as string
     * @param {PR_Currency} denomination - Currency denomination
     * @param {string} supplierId - Supplier ID
     * @param {string|null} [endpoint] - Optional API endpoint override
     * @param {Session|null} [session] - Optional session for authentication
     */
    static retrieveAllAvailable(callback: (arg0: Error | null, arg1: PR_ProspectivePayment[] | null) => void, principal: string, denomination: PR_Currency, supplierId: string, endpoint?: string | null, session?: Session | null): void;
    /**
     * @param {string} payment - String encoded decimal number
     * @param {number} rawCycle - Cycle type (integer)
     * @param {string} supplierId - Supplier ID
     * @param {number} periods - Number of payment periods
     * @param {PR_Currency} currency - Currency denomination
     */
    constructor(payment: string, rawCycle: number, supplierId: string, periods: number, currency: PR_Currency);
    /** @type {string} */
    _payment: string;
    /** @type {number} */
    _rawCycle: number;
    /** @type {string} */
    _supplierId: string;
    /** @type {number} */
    _periods: number;
    /** @type {PR_Currency} */
    _currency: PR_Currency;
    /**
     * Number of monthly payments
     * @type {number}
     */
    get periods(): number;
    /**
     * Monthly payment amount
     * @type {PR_Amount}
     */
    get amount(): PR_Amount;
    /**
     * Supplier ID this quote is valid for
     * @type {string}
     */
    get supplierId(): string;
}
export type Session = {
    /**
     * - API key
     */
    apiKey: string;
    /**
     * - Session ID
     */
    sessionId: string;
};
import { PR_Currency } from './currency.js';
import { PR_Amount } from '../ancillary/amount.js';
//# sourceMappingURL=prospective_payment.d.ts.map