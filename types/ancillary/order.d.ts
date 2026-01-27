/**
 * Sort order direction
 */
export class PR_Order {
    /** @type {string} */
    static get ASCENDING_KEY(): string;
    /** @type {string} */
    static get DESCENDING_KEY(): string;
    /** @type {PR_Order} */
    static get ASCENDING(): PR_Order;
    /** @type {PR_Order} */
    static get DESCENDING(): PR_Order;
    /** @type {PR_Order[]} */
    static get enumerations(): PR_Order[];
    /**
     * Find order by key
     * @param {string} key
     * @returns {PR_Order}
     */
    static withKey(key: string): PR_Order;
    /**
     * @param {string} key - Order key
     */
    constructor(key: string);
    /** @type {string} */
    _key: string;
    /** @type {string} */
    get key(): string;
}
//# sourceMappingURL=order.d.ts.map