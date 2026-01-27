/* Procuret JS - Order Type */

/**
 * Sort order direction
 */
export class PR_Order {

    /** @type {string} */
    static get ASCENDING_KEY() { return 'ascending'; }

    /** @type {string} */
    static get DESCENDING_KEY() { return 'descending'; }

    /**
     * @param {string} key - Order key
     */
    constructor(key) {
        /** @type {string} */
        this._key = key;
    }

    /** @type {string} */
    get key() { return this._key; }

    /** @type {PR_Order} */
    static get ASCENDING() { return new PR_Order('ascending'); }

    /** @type {PR_Order} */
    static get DESCENDING() { return new PR_Order('descending'); }

    /** @type {PR_Order[]} */
    static get enumerations() {
        return [
            PR_Order.ASCENDING,
            PR_Order.DESCENDING
        ];
    }

    /**
     * Find order by key
     * @param {string} key
     * @returns {PR_Order}
     */
    static withKey(key) {
        const Self = PR_Order;
        for (let i = 0; i < Self.enumerations.length; i++) {
            if (Self.enumerations[i].key == key) {
                return Self.enumerations[i];
            }
        }
        throw Error('Unknown key ' + key);
    }
}
