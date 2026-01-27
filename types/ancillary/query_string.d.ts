/**
 * URL query string builder
 */
export class PR_QueryString {
    /**
     * @param {PR_QueryTerm[]} url_parameters - Array of query terms
     */
    constructor(url_parameters: PR_QueryTerm[]);
    /** @type {PR_QueryTerm[]} */
    _parameters: PR_QueryTerm[];
    /**
     * Full query string starting with '?'
     * @type {string}
     */
    get query(): string;
}
import { PR_QueryTerm } from './query_term.js';
//# sourceMappingURL=query_string.d.ts.map