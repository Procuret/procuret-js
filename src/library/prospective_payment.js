/* Procuret JS - Prospective Payment Type */

import { PR_Amount } from '../ancillary/amount.js';
import { PR_QueryTerm } from '../ancillary/query_term.js';
import { PR_QueryString } from '../ancillary/query_string.js';
import { PR_ApiRequest } from '../ancillary/request.js';
import { PR_Currency } from './currency.js';

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
    static get path() { return '/credit/prospective-payment'; }

    /** @type {string} */
    static get listPath() { return PR_ProspectivePayment.path + '/list'; }

    /**
     * @param {string} payment - String encoded decimal number
     * @param {number} rawCycle - Cycle type (integer)
     * @param {string} supplierId - Supplier ID
     * @param {number} periods - Number of payment periods
     * @param {PR_Currency} currency - Currency denomination
     */
    constructor(payment, rawCycle, supplierId, periods, currency) {
        /** @type {string} */
        this._payment = payment;
        /** @type {number} */
        this._rawCycle = rawCycle;
        /** @type {string} */
        this._supplierId = supplierId;
        /** @type {number} */
        this._periods = periods;
        /** @type {PR_Currency} */
        this._currency = currency;
    }

    /**
     * Number of monthly payments
     * @type {number}
     */
    get periods() { return this._periods; }

    /**
     * Monthly payment amount
     * @type {PR_Amount}
     */
    get amount() {
        return new PR_Amount(this._payment, this._currency);
    }

    /**
     * Supplier ID this quote is valid for
     * @type {string}
     */
    get supplierId() { return this._supplierId; }

    /**
     * Decode from raw data
     * @param {{payment: string, cycle: number, supplier_id: string, periods: number, currency: Object}} data
     * @returns {PR_ProspectivePayment}
     */
    static decode(data) {
        return new PR_ProspectivePayment(
            data['payment'],
            data['cycle'],
            data['supplier_id'],
            data['periods'],
            PR_Currency.decode(data['currency'])
        );
    }

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
    static retrieve(
        callback,
        principal,
        supplierId,
        denomination,
        months,
        endpoint = null,
        session = null
    ) {
        try {
            const targets = [
                new PR_QueryTerm('cycle', 1),
                new PR_QueryTerm('supplier_id', supplierId),
                new PR_QueryTerm('principle', principal),
                new PR_QueryTerm('periods', months),
                new PR_QueryTerm('denomination', denomination.indexid)
            ];

            const parameters = new PR_QueryString(targets);

            PR_ApiRequest.make(
                PR_ProspectivePayment.path,
                'GET',
                parameters,
                null,
                (error, data) => {
                    if (error != null) { callback(error, null); return; }
                    callback(null, PR_ProspectivePayment.decode(data));
                },
                session,
                endpoint,
                null,
                true
            );
        } catch (error) {
            callback(error, null);
        }
    }

    /**
     * Retrieve all available prospective payments for given parameters.
     * @param {function(Error|null, PR_ProspectivePayment[]|null): void} callback - Callback receiving error or payments
     * @param {string} principal - Loan principal amount as string
     * @param {PR_Currency} denomination - Currency denomination
     * @param {string} supplierId - Supplier ID
     * @param {string|null} [endpoint] - Optional API endpoint override
     * @param {Session|null} [session] - Optional session for authentication
     */
    static retrieveAllAvailable(
        callback,
        principal,
        denomination,
        supplierId,
        endpoint = null,
        session = null
    ) {
        try {
            const targets = [
                new PR_QueryTerm('cycle', 1),
                new PR_QueryTerm('supplier_id', supplierId),
                new PR_QueryTerm('principal_magnitude', principal),
                new PR_QueryTerm('denomination', denomination.indexid)
            ];

            const parameters = new PR_QueryString(targets);

            PR_ApiRequest.make(
                PR_ProspectivePayment.listPath,
                'GET',
                parameters,
                null,
                (error, data) => {
                    if (error != null) { callback(error, null); return; }
                    callback(null, data.map((d) => PR_ProspectivePayment.decode(d)));
                },
                session,
                endpoint,
                null,
                true
            );
        } catch (error) {
            callback(error, null);
        }
    }
}
