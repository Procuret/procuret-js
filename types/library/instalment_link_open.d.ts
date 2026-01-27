/**
 * Record of an instalment link being opened
 */
export class PR_InstalmentLinkOpen {
    /** @type {string} */
    static get path(): string;
    /**
     * Optionally decode from raw data
     * @param {Object|null|undefined} data
     * @returns {PR_InstalmentLinkOpen|null}
     */
    static optionallyDecode(data: any | null | undefined): PR_InstalmentLinkOpen | null;
    /**
     * Decode from raw data
     * @param {{sequence: number, created: string}} data
     * @returns {PR_InstalmentLinkOpen}
     */
    static decode(data: {
        sequence: number;
        created: string;
    }): PR_InstalmentLinkOpen;
    /**
     * Decode array of raw data
     * @param {Object[]} data
     * @returns {PR_InstalmentLinkOpen[]}
     */
    static decodeMany(data: any[]): PR_InstalmentLinkOpen[];
    /**
     * @param {number} sequence - Sequence number
     * @param {string} created - Encoded time string
     */
    constructor(sequence: number, created: string);
    /** @type {number} */
    _sequence: number;
    /** @type {string} */
    _created: string;
}
//# sourceMappingURL=instalment_link_open.d.ts.map