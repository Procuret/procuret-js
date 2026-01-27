/**
 * Base class for enumeration types
 */
export class PR_Enumeration {
    /**
     * Array of all enumeration values - must be overridden by subclasses
     * @type {PR_Enumeration[]}
     */
    static get enumerations(): PR_Enumeration[];
    /**
     * Find enumeration by indexid
     * @template {PR_Enumeration} T
     * @param {number} indexid
     * @param {{enumerations: T[]}} type
     * @returns {T}
     */
    static withId<T extends PR_Enumeration>(indexid: number, type: {
        enumerations: T[];
    }): T;
    /**
     * Decode from raw data
     * @template {PR_Enumeration} T
     * @param {number} data
     * @param {{enumerations: T[]}} type
     * @returns {T}
     */
    static decode<T extends PR_Enumeration>(data: number, type: {
        enumerations: T[];
    }): T;
    /**
     * Optionally decode from raw data
     * @template {PR_Enumeration} T
     * @param {number|null|undefined|'null'} data
     * @param {{enumerations: T[]}} type
     * @returns {T|null}
     */
    static optionallyDecode<T extends PR_Enumeration>(data: number | null | undefined | "null", type: {
        enumerations: T[];
    }): T | null;
    /**
     * @param {number} indexid - Unique integer identifier
     * @param {string} name - Human-readable name
     */
    constructor(indexid: number, name: string);
    /** @type {number} */
    _indexid: number;
    /** @type {string} */
    _name: string;
    /** @type {number} */
    get indexid(): number;
    /** @type {string} */
    get name(): string;
    /**
     * Check equality by indexid
     * @param {PR_Enumeration|null} other
     * @returns {boolean}
     */
    equalTo(other: PR_Enumeration | null): boolean;
    /**
     * Check inequality by indexid
     * @param {PR_Enumeration|null} other
     * @returns {boolean}
     */
    notEqualTo(other: PR_Enumeration | null): boolean;
    /**
     * Check if this enumeration is in the given array
     * @param {PR_Enumeration[]|null|undefined} others
     * @returns {boolean}
     */
    isIn(others: PR_Enumeration[] | null | undefined): boolean;
    /**
     * Check if this enumeration is not in the given array
     * @param {PR_Enumeration[]|null|undefined} others
     * @returns {boolean}
     */
    isNotIn(others: PR_Enumeration[] | null | undefined): boolean;
}
//# sourceMappingURL=enumeration.d.ts.map