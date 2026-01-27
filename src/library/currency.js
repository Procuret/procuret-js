/* Procuret JS - PR_Currency Type */

import { PR_Enumeration } from '../ancillary/enumeration.js';

// Internal currency data (defined before class to avoid hoisting issues)
const _CURRENCY_AUD = { indexid: 1, iso_4217: 'AUD', name: 'Australian Dollar', exponent: 2, symbol: '$' };
const _CURRENCY_NZD = { indexid: 2, iso_4217: 'NZD', name: 'New Zealand Dollar', exponent: 2, symbol: '$' };

/**
 * Monetary currency enumeration
 */
export class PR_Currency extends PR_Enumeration {

    /**
     * All currency enumerations
     * @type {PR_Currency[]}
     */
    static get enumerations() {
        return [
            PR_Currency.AUD,
            PR_Currency.NZD
        ];
    }

    /**
     * @param {number} indexid - Unique identifier
     * @param {string} iso_4217 - ISO 4217 currency code
     * @param {string} name - Full currency name
     * @param {number} exponent - Decimal exponent (e.g., 2 for cents)
     * @param {string} symbol - Currency symbol
     */
    constructor(indexid, iso_4217, name, exponent, symbol) {
        super(indexid, name);

        /** @type {string} */
        this._iso_4217 = iso_4217.toUpperCase();
        /** @type {number} */
        this._exponent = exponent;
        /** @type {string} */
        this._symbol = symbol;
    }

    /**
     * ISO 4217 currency code (e.g., 'AUD')
     * @type {string}
     */
    get iso_4217() { return this._iso_4217; }

    /**
     * Currency symbol (e.g., '$')
     * @type {string}
     */
    get symbol() { return this._symbol; }

    /**
     * Decimal exponent (e.g., 2 for cents)
     * @type {number}
     */
    get exponent() { return this._exponent; }

    /**
     * Australian Dollar
     * @type {PR_Currency}
     */
    static get AUD() {
        return new PR_Currency(
            _CURRENCY_AUD.indexid,
            _CURRENCY_AUD.iso_4217,
            _CURRENCY_AUD.name,
            _CURRENCY_AUD.exponent,
            _CURRENCY_AUD.symbol
        );
    }

    /**
     * New Zealand Dollar
     * @type {PR_Currency}
     */
    static get NZD() {
        return new PR_Currency(
            _CURRENCY_NZD.indexid,
            _CURRENCY_NZD.iso_4217,
            _CURRENCY_NZD.name,
            _CURRENCY_NZD.exponent,
            _CURRENCY_NZD.symbol
        );
    }

    /**
     * All available currencies
     * @type {PR_Currency[]}
     */
    static get allAvailable() {
        return [
            PR_Currency.AUD,
            PR_Currency.NZD
        ];
    }

    /**
     * Decode from raw data
     * @param {{indexid: number, iso_4217: string, name: string, exponent: number, symbol: string}} data
     * @returns {PR_Currency}
     */
    static decode(data) {
        return new PR_Currency(
            data['indexid'],
            data['iso_4217'],
            data['name'],
            data['exponent'],
            data['symbol']
        );
    }

    /**
     * Find currency by indexid
     * @param {number} indexid
     * @returns {PR_Currency}
     */
    static withId(indexid) {
        const Self = PR_Currency;
        if (indexid == Self.AUD.indexid) { return Self.AUD; }
        if (indexid == Self.NZD.indexid) { return Self.NZD; }
        throw Error('Unknown currency ' + indexid);
    }
}
