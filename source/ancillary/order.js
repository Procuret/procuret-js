/* Procuret JS - Order Type */

class PR_Order {

    static get ASCENDING_KEY() { return 'ascending'; }
    static get DESCENDING_KEY() { return 'descending'; }

    constructor(key) {
        this._key = key;
        return;
    }

    get key() { return this._key }

    static get ASCENDING() { return new PR_Order('ascending'); }
    static get DESCENDING() { return new PR_Order('descending'); }

    static get enumerations() { return [
        PR_Order.ASCENDING,
        PR_Order.DESCENDING
    ];}

    static withKey(
        key  // String
    ) {  // -> PR_Order
        const Self = PR_Order
        for (let i = 0; i < Self.enumerations.length; i++) {
            if (Self.enumerations[i].key == key) {
                return Self.enumerations[i]
            }
            continue
        }
        throw Error('Unknown key ' + key);
    }

}
