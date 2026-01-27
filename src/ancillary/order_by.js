/* Procuret JS - OrderBy Type */

import { PR_Order } from './order.js';

/**
 * Base class for order-by fields
 */
export class PR_OrderBy {

    /**
     * @param {string} key - Order-by key
     */
    constructor(key) {
        /** @type {string} */
        this._key = key;
    }

    /** @type {string} */
    get key() { return this._key; }

    /**
     * Array of all order-by values - must be overridden by subclasses
     * @type {PR_OrderBy[]}
     */
    static get enumerations() { throw Error('Not implemented'); }

    /**
     * Default order-by value - must be overridden by subclasses
     * @type {PR_OrderBy}
     */
    static get default() { throw Error('Not implemented'); }

    /**
     * Default sort order
     * @type {PR_Order}
     */
    static get defaultOrder() { return PR_Order.DESCENDING; }

    /**
     * Find order-by by key
     * @param {string} key
     * @param {PR_OrderBy[]} enumerations
     * @returns {PR_OrderBy}
     */
    static withKey(key, enumerations) {
        for (let i = 0; i < enumerations.length; i++) {
            if (enumerations[i].key == key) {
                return enumerations[i];
            }
        }
        throw Error('Unknown key ' + key);
    }
}
