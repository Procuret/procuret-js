/* Procuret JS - Query Term Type (URL Parameter) */

/**
 * URL query parameter term
 */
export class PR_QueryTerm {

    /**
     * @param {string} key - Parameter key
     * @param {string|number|boolean} value - Parameter value
     */
    constructor(key, value) {
        /** @type {string} */
        this._key = key;
        /** @type {string} */
        this._value = PR_QueryTerm._interpretValue(value);
    }

    /**
     * Encoded query string representation (key=value)
     * @type {string}
     */
    get string() {
        return this._key + '=' + encodeURIComponent(this._value);
    }

    /**
     * Convert value to string representation
     * @param {string|number|boolean} value
     * @returns {string}
     * @private
     */
    static _interpretValue(value) {
        if (value === true) { return 'true'; }
        if (value === false) { return 'false'; }
        return String(value);
    }

    /**
     * Conditionally push a term to an array if value is not null/undefined
     * @param {string} key - Parameter key
     * @param {*} value - Parameter value (skipped if null/undefined)
     * @param {PR_QueryTerm[]} array - Array to push to
     * @returns {PR_QueryTerm[]} The same array
     */
    static compactPush(key, value, array) {
        if (value == null) { return array; }
        array.push(new PR_QueryTerm(key, value));
        return array;
    }

    /**
     * Alias for compactPush
     * @param {string} k - Parameter key
     * @param {*} v - Parameter value
     * @param {PR_QueryTerm[]} a - Array to push to
     * @returns {PR_QueryTerm[]}
     */
    static cp(k, v, a) { return PR_QueryTerm.compactPush(k, v, a); }
}
