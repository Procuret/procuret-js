/* Procuret JS - QueryString */

import { PR_QueryTerm } from './query_term.js';

/**
 * URL query string builder
 */
export class PR_QueryString {

    /**
     * @param {PR_QueryTerm[]} url_parameters - Array of query terms
     */
    constructor(url_parameters) {
        if (url_parameters.length === undefined) {
            throw Error('parameters do not appear to be an array');
        }
        /** @type {PR_QueryTerm[]} */
        this._parameters = url_parameters;
    }

    /**
     * Full query string starting with '?'
     * @type {string}
     */
    get query() {
        let query = '?';
        for (let i = 0; i < this._parameters.length; i++) {
            if (i === 0) {
                query += this._parameters[i].string;
                continue;
            }
            query += '&' + this._parameters[i].string;
        }
        return query;
    }
}
