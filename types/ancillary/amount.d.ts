/**
 * Monetary amount with magnitude and currency
 */
export class PR_Amount {
    /**
     * Decode from raw data
     * @param {{magnitude: string, denomination: Object}} data
     * @returns {PR_Amount}
     */
    static decode(data: {
        magnitude: string;
        denomination: any;
    }): PR_Amount;
    /**
     * Optionally decode from raw data
     * @param {Object|null|undefined} data
     * @returns {PR_Amount|null}
     */
    static optionallyDecode(data: any | null | undefined): PR_Amount | null;
    /**
     * @param {string} magnitude - String decimal number e.g. "4,000" or "4000"
     * @param {PR_Currency} currency - Currency denomination
     */
    constructor(magnitude: string, currency: PR_Currency);
    /** @type {string} */
    _magnitude: string;
    /** @type {PR_Currency} */
    _currency: PR_Currency;
    /**
     * Magnitude as JavaScript Number
     * @type {number}
     */
    get asNumber(): number;
    /**
     * Locale-formatted string
     * @type {string}
     */
    get asLocaleString(): string;
    /**
     * String with currency symbol prefix (e.g., '$1,000.00')
     * @type {string}
     */
    get asSymbolisedString(): string;
    /**
     * String with ISO code prefix (e.g., 'AUD 1,000.00')
     * @type {string}
     */
    get asDenominatedString(): string;
    /**
     * String representation of the magnitude
     * @type {string}
     */
    get magnitude(): string;
    /**
     * Currency denomination
     * @type {PR_Currency}
     */
    get denomination(): PR_Currency;
    /**
     * True if magnitude > 0
     * @type {boolean}
     */
    get isGreaterThanZero(): boolean;
    /**
     * Round to specified decimal places
     * @param {number} decimalPlaces
     * @returns {PR_Amount}
     */
    rounded(decimalPlaces: number): PR_Amount;
    /**
     * Check if magnitude exceeds given value
     * @param {number} value
     * @returns {boolean}
     */
    magnitudeIsGreaterThan(value: number): boolean;
    /**
     * Encode to API format
     * @returns {{magnitude: string, denomination: number}}
     */
    encode(): {
        magnitude: string;
        denomination: number;
    };
}
import { PR_Currency } from '../library/currency.js';
//# sourceMappingURL=amount.d.ts.map