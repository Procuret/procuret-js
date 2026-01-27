/* Procuret API JS - Amount JS Class */

import { PR_Currency } from '../library/currency.js';

/**
 * Monetary amount with magnitude and currency
 */
export class PR_Amount {

    /**
     * @param {string} magnitude - String decimal number e.g. "4,000" or "4000"
     * @param {PR_Currency} currency - Currency denomination
     */
    constructor(magnitude, currency) {
        if (!currency) { throw Error('Cannot init w/ falsey PR_Currency'); }

        /** @type {string} */
        this._magnitude = magnitude;
        /** @type {PR_Currency} */
        this._currency = currency;
    }

    /**
     * Magnitude as JavaScript Number
     * @type {number}
     */
    get asNumber() { return Number(this._magnitude); }

    /**
     * Locale-formatted string
     * @type {string}
     */
    get asLocaleString() {
        return this.asNumber.toLocaleString(undefined, {
            minimumFractionDigits: this._currency.exponent
        });
    }

    /**
     * String with currency symbol prefix (e.g., '$1,000.00')
     * @type {string}
     */
    get asSymbolisedString() {
        return this._currency.symbol + this.asLocaleString;
    }

    /**
     * String with ISO code prefix (e.g., 'AUD 1,000.00')
     * @type {string}
     */
    get asDenominatedString() {
        return this._currency.iso_4217 + ' ' + this.asLocaleString;
    }

    /**
     * String representation of the magnitude
     * @type {string}
     */
    get magnitude() { return this._magnitude; }

    /**
     * Currency denomination
     * @type {PR_Currency}
     */
    get denomination() { return this._currency; }

    /**
     * True if magnitude > 0
     * @type {boolean}
     */
    get isGreaterThanZero() { return Number(this._magnitude) > 0; }

    /**
     * Round to specified decimal places
     * @param {number} decimalPlaces
     * @returns {PR_Amount}
     */
    rounded(decimalPlaces) {
        return new PR_Amount(
            Number(this._magnitude).toFixed(decimalPlaces),
            this._currency
        );
    }

    /**
     * Check if magnitude exceeds given value
     * @param {number} value
     * @returns {boolean}
     */
    magnitudeIsGreaterThan(value) {
        return Number(this._magnitude) > value;
    }

    /**
     * Encode to API format
     * @returns {{magnitude: string, denomination: number}}
     */
    encode() {
        return {
            'magnitude': this._magnitude,
            'denomination': this._currency.indexid
        };
    }

    /**
     * Decode from raw data
     * @param {{magnitude: string, denomination: Object}} data
     * @returns {PR_Amount}
     */
    static decode(data) {
        return new PR_Amount(
            data['magnitude'],
            PR_Currency.decode(data['denomination'])
        );
    }

    /**
     * Optionally decode from raw data
     * @param {Object|null|undefined} data
     * @returns {PR_Amount|null}
     */
    static optionallyDecode(data) {
        if (!data) { return null; }
        return PR_Amount.decode(data);
    }
}
