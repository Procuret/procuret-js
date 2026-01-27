/**
 * Pagination/disposition information for list responses
 */
export class PR_Disposition {
    /**
     * Decode from raw data
     * @param {{count: number, limit: number, offset: number, sequence: number}} data
     * @returns {PR_Disposition}
     */
    static decode(data: {
        count: number;
        limit: number;
        offset: number;
        sequence: number;
    }): PR_Disposition;
    /**
     * Optionally decode from raw data
     * @param {Object|null} data
     * @returns {PR_Disposition|null}
     */
    static optionallyDecode(data: any | null): PR_Disposition | null;
    /**
     * @param {number} count - Total count of items
     * @param {number} limit - Maximum items per page
     * @param {number} offset - Current offset
     * @param {number} sequence - Sequence number
     */
    constructor(count: number, limit: number, offset: number, sequence: number);
    /** @type {number} */
    _count: number;
    /** @type {number} */
    _limit: number;
    /** @type {number} */
    _offset: number;
    /** @type {number} */
    _sequence: number;
    /** @type {number} */
    get count(): number;
    /** @type {number} */
    get limit(): number;
    /** @type {number} */
    get offset(): number;
    /** @type {number} */
    get sequence(): number;
}
//# sourceMappingURL=disposition.d.ts.map