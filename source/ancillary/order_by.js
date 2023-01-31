/* Procuret JS - OrderBy Type */

class PR_OrderBy {

    constructor(key) {
        this._key = key;
        return;
    }

    get key() { return this._key; }

    static get enumerations() { throw Error('Not implemented'); }
    static get default() { throw Error('Not implemented'); }
    static get defaultOrder() { return PR_Order.DESCENDING; }

    static withKey(
        key,
        enumerations
    ) {
        for (let i = 0; i < enumerations.length; i++) {
            if (enumerations[i].key == key) {
                return enumerations[i];
            }
            continue;
        }
        throw Error('Unknown key ' + key);
    }

}
