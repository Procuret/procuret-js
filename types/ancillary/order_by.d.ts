/**
 * Base class for order-by fields
 */
export class PR_OrderBy {
    /**
     * Array of all order-by values - must be overridden by subclasses
     * @type {PR_OrderBy[]}
     */
    static get enumerations(): PR_OrderBy[];
    /**
     * Default order-by value - must be overridden by subclasses
     * @type {PR_OrderBy}
     */
    static get default(): PR_OrderBy;
    /**
     * Default sort order
     * @type {PR_Order}
     */
    static get defaultOrder(): PR_Order;
    /**
     * Find order-by by key
     * @param {string} key
     * @param {PR_OrderBy[]} enumerations
     * @returns {PR_OrderBy}
     */
    static withKey(key: string, enumerations: PR_OrderBy[]): PR_OrderBy;
    /**
     * @param {string} key - Order-by key
     */
    constructor(key: string);
    /** @type {string} */
    _key: string;
    /** @type {string} */
    get key(): string;
}
import { PR_Order } from './order.js';
//# sourceMappingURL=order_by.d.ts.map