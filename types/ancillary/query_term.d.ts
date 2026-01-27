/**
 * URL query parameter term
 */
export class PR_QueryTerm {
    /**
     * Convert value to string representation
     * @param {string|number|boolean} value
     * @returns {string}
     * @private
     */
    private static _interpretValue;
    /**
     * Conditionally push a term to an array if value is not null/undefined
     * @param {string} key - Parameter key
     * @param {*} value - Parameter value (skipped if null/undefined)
     * @param {PR_QueryTerm[]} array - Array to push to
     * @returns {PR_QueryTerm[]} The same array
     */
    static compactPush(key: string, value: any, array: PR_QueryTerm[]): PR_QueryTerm[];
    /**
     * Alias for compactPush
     * @param {string} k - Parameter key
     * @param {*} v - Parameter value
     * @param {PR_QueryTerm[]} a - Array to push to
     * @returns {PR_QueryTerm[]}
     */
    static cp(k: string, v: any, a: PR_QueryTerm[]): PR_QueryTerm[];
    /**
     * @param {string} key - Parameter key
     * @param {string|number|boolean} value - Parameter value
     */
    constructor(key: string, value: string | number | boolean);
    /** @type {string} */
    _key: string;
    /** @type {string} */
    _value: string;
    /**
     * Encoded query string representation (key=value)
     * @type {string}
     */
    get string(): string;
}
//# sourceMappingURL=query_term.d.ts.map