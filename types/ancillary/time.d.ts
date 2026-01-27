/**
 * Time wrapper for date handling
 */
export class PR_Time {
    /**
     * Create PR_Time for current moment
     * @returns {PR_Time}
     */
    static now(): PR_Time;
    /**
     * Create PR_Time from Unix timestamp
     * @param {number} timestamp - Milliseconds since epoch
     * @returns {PR_Time}
     */
    static fromTimestamp(timestamp: number): PR_Time;
    /**
     * Decode ISO 8601 string to PR_Time
     * @param {string|null|undefined} data - ISO 8601 format string
     * @returns {PR_Time|null}
     */
    static decode(data: string | null | undefined): PR_Time | null;
    /**
     * Optionally decode ISO 8601 string to PR_Time
     * @param {string|null|undefined} data
     * @returns {PR_Time|null}
     */
    static optionallyDecode(data: string | null | undefined): PR_Time | null;
    /**
     * @param {Date} date - JavaScript Date object
     */
    constructor(date: Date);
    /** @type {Date} */
    _date: Date;
    /** @type {Date} - Underlying JavaScript Date object */
    get date(): Date;
    /** @type {number} - Unix timestamp in milliseconds */
    get timestamp(): number;
    /** @type {string} - ISO 8601 formatted string */
    get isoString(): string;
    /** @type {string} - Locale-formatted string */
    get localeString(): string;
    /** @type {string} - Locale-formatted date string */
    get localeDateString(): string;
    /** @type {string} - Locale-formatted time string */
    get localeTimeString(): string;
    /**
     * Encode to ISO 8601 string
     * @returns {string}
     */
    encode(): string;
}
//# sourceMappingURL=time.d.ts.map