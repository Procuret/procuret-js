/* Procuret JS - Disposition Type */

/**
 * Pagination/disposition information for list responses
 */
export class PR_Disposition {

    /**
     * @param {number} count - Total count of items
     * @param {number} limit - Maximum items per page
     * @param {number} offset - Current offset
     * @param {number} sequence - Sequence number
     */
    constructor(count, limit, offset, sequence) {
        /** @type {number} */
        this._count = count;
        /** @type {number} */
        this._limit = limit;
        /** @type {number} */
        this._offset = offset;
        /** @type {number} */
        this._sequence = sequence;
    }

    /** @type {number} */
    get count() { return this._count; }

    /** @type {number} */
    get limit() { return this._limit; }

    /** @type {number} */
    get offset() { return this._offset; }

    /** @type {number} */
    get sequence() { return this._sequence; }

    /**
     * Decode from raw data
     * @param {{count: number, limit: number, offset: number, sequence: number}} data
     * @returns {PR_Disposition}
     */
    static decode(data) {
        return new PR_Disposition(
            data['count'],
            data['limit'],
            data['offset'],
            data['sequence']
        );
    }

    /**
     * Optionally decode from raw data
     * @param {Object|null} data
     * @returns {PR_Disposition|null}
     */
    static optionallyDecode(data) {
        if (data == null) { return null; }
        return PR_Disposition.decode(data);
    }
}
