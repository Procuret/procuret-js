/* Procuret JS - Enumeration Type */

/**
 * Base class for enumeration types
 */
export class PR_Enumeration {

    /**
     * Array of all enumeration values - must be overridden by subclasses
     * @type {PR_Enumeration[]}
     */
    static get enumerations() { throw Error('Not implemented'); }

    /**
     * @param {number} indexid - Unique integer identifier
     * @param {string} name - Human-readable name
     */
    constructor(indexid, name) {
        /** @type {number} */
        this._indexid = indexid;
        /** @type {string} */
        this._name = name;
    }

    /** @type {number} */
    get indexid() { return this._indexid; }

    /** @type {string} */
    get name() { return this._name; }

    /**
     * Check equality by indexid
     * @param {PR_Enumeration|null} other
     * @returns {boolean}
     */
    equalTo(other) {
        if (other == null) { return false; }
        return other.indexid === this._indexid;
    }

    /**
     * Check inequality by indexid
     * @param {PR_Enumeration|null} other
     * @returns {boolean}
     */
    notEqualTo(other) { return !this.equalTo(other); }

    /**
     * Check if this enumeration is in the given array
     * @param {PR_Enumeration[]|null|undefined} others
     * @returns {boolean}
     */
    isIn(others) {
        if (!others) { return false; }
        for (let i = 0; i < others.length; i++) {
            if (this.equalTo(others[i])) { return true; }
        }
        return false;
    }

    /**
     * Check if this enumeration is not in the given array
     * @param {PR_Enumeration[]|null|undefined} others
     * @returns {boolean}
     */
    isNotIn(others) { return !(this.isIn(others)); }

    /**
     * Find enumeration by indexid
     * @template {PR_Enumeration} T
     * @param {number} indexid
     * @param {{enumerations: T[]}} type
     * @returns {T}
     */
    static withId(indexid, type) {
        for (let i = 0; i < type.enumerations.length; i++) {
            const candidate = type.enumerations[i];
            if (candidate.indexid == indexid) { return candidate; }
        }
        throw Error('Unknown indexid ' + indexid + ' for type enum ' + type);
    }

    /**
     * Decode from raw data
     * @template {PR_Enumeration} T
     * @param {number} data
     * @param {{enumerations: T[]}} type
     * @returns {T}
     */
    static decode(data, type) {
        return PR_Enumeration.withId(data, type);
    }

    /**
     * Optionally decode from raw data
     * @template {PR_Enumeration} T
     * @param {number|null|undefined|'null'} data
     * @param {{enumerations: T[]}} type
     * @returns {T|null}
     */
    static optionallyDecode(data, type) {
        if (!data) { return null; }
        if (data == 'null') { return null; }
        return PR_Enumeration.decode(data, type);
    }
}
