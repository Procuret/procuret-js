/**
 * Monetary currency enumeration
 */
export class PR_Currency extends PR_Enumeration {
    /**
     * All currency enumerations
     * @type {PR_Currency[]}
     */
    static get enumerations(): PR_Currency[];
    /**
     * Australian Dollar
     * @type {PR_Currency}
     */
    static get AUD(): PR_Currency;
    /**
     * New Zealand Dollar
     * @type {PR_Currency}
     */
    static get NZD(): PR_Currency;
    /**
     * All available currencies
     * @type {PR_Currency[]}
     */
    static get allAvailable(): PR_Currency[];
    /**
     * Decode from raw data
     * @param {{indexid: number, iso_4217: string, name: string, exponent: number, symbol: string}} data
     * @returns {PR_Currency}
     */
    static decode(data: {
        indexid: number;
        iso_4217: string;
        name: string;
        exponent: number;
        symbol: string;
    }): PR_Currency;
    /**
     * Find currency by indexid
     * @param {number} indexid
     * @returns {PR_Currency}
     */
    static withId(indexid: number): PR_Currency;
    /**
     * @param {number} indexid - Unique identifier
     * @param {string} iso_4217 - ISO 4217 currency code
     * @param {string} name - Full currency name
     * @param {number} exponent - Decimal exponent (e.g., 2 for cents)
     * @param {string} symbol - Currency symbol
     */
    constructor(indexid: number, iso_4217: string, name: string, exponent: number, symbol: string);
    /** @type {string} */
    _iso_4217: string;
    /** @type {number} */
    _exponent: number;
    /** @type {string} */
    _symbol: string;
    /**
     * ISO 4217 currency code (e.g., 'AUD')
     * @type {string}
     */
    get iso_4217(): string;
    /**
     * Currency symbol (e.g., '$')
     * @type {string}
     */
    get symbol(): string;
    /**
     * Decimal exponent (e.g., 2 for cents)
     * @type {number}
     */
    get exponent(): number;
}
import { PR_Enumeration } from '../ancillary/enumeration.js';
//# sourceMappingURL=currency.d.ts.map