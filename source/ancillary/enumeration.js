/* Procuret JS - Enumeration Type */

class PR_Enumeration {

    static get enumerations() { throw Error('Not implemented'); }

    constructor(
        indexid,     // Integer
        name         // String
    ) {

        this._indexid = indexid;
        this._name = name;

        return;

    }

    get indexid() { return this._indexid; }
    get name() { return this._name; }

    equalTo(other) {
        if (other == null) { return false; }
        return other.indexid === this._indexid;
    }
    notEqualTo(other) { return !this.equalTo(other); }

    isIn(others) {
        if (!others) { return false; }
        for(let i = 0; i < others.length; i++) {
            if (this.equalTo(others[i])) { return true; }
            continue;
        }
        return false;
    }
    
    isNotIn(others) { return !(this.isIn(others)); }

    static withId(indexid, type) {
        for (let i = 0; i < type.enumerations.length; i++) {
            const candidate = type.enumerations[i];
            if (candidate.indexid == indexid) { return candidate; }
            continue;
        }
        throw Error('Unknown indexid ' + indexid + ' for type enum ' + type);
    }

    static decode(data, type) {
        return PR_Enumeration.withId(data, type);
    }

    static optionallyDecode(data, type) {
        if (!data) { return null; }
        if (data == 'null') { return null; }
        return PR_Enumeration.decode(data, type);
    }

}
