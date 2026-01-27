/* Procuret JS - Instalment Link Open Type */

/**
 * Record of an instalment link being opened
 */
export class PR_InstalmentLinkOpen {

    /** @type {string} */
    static get path() { return '/instalment-link/open'; }

    /**
     * @param {number} sequence - Sequence number
     * @param {string} created - Encoded time string
     */
    constructor(sequence, created) {
        /** @type {number} */
        this._sequence = sequence;
        /** @type {string} */
        this._created = created;
    }

    /**
     * Optionally decode from raw data
     * @param {Object|null|undefined} data
     * @returns {PR_InstalmentLinkOpen|null}
     */
    static optionallyDecode(data) {
        if (!data) { return null; }
        return new PR_InstalmentLinkOpen(
            data['sequence'],
            data['created']
        );
    }

    /**
     * Decode from raw data
     * @param {{sequence: number, created: string}} data
     * @returns {PR_InstalmentLinkOpen}
     */
    static decode(data) {
        const result = PR_InstalmentLinkOpen.optionallyDecode(data);
        if (!result) { throw Error('Unexpectedly null data'); }
        return result;
    }

    /**
     * Decode array of raw data
     * @param {Object[]} data
     * @returns {PR_InstalmentLinkOpen[]}
     */
    static decodeMany(data) {
        return data.map((d) => { return PR_InstalmentLinkOpen.decode(d); });
    }
}
