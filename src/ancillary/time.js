/* Procuret JS - Time Type */

/**
 * Time wrapper for date handling
 */
export class PR_Time {

    /**
     * @param {Date} date - JavaScript Date object
     */
    constructor(date) {
        /** @type {Date} */
        this._date = date;
    }

    /** @type {Date} - Underlying JavaScript Date object */
    get date() { return this._date; }

    /** @type {number} - Unix timestamp in milliseconds */
    get timestamp() { return this._date.getTime(); }

    /** @type {string} - ISO 8601 formatted string */
    get isoString() { return this._date.toISOString(); }

    /** @type {string} - Locale-formatted string */
    get localeString() { return this._date.toLocaleString(); }

    /** @type {string} - Locale-formatted date string */
    get localeDateString() { return this._date.toLocaleDateString(); }

    /** @type {string} - Locale-formatted time string */
    get localeTimeString() { return this._date.toLocaleTimeString(); }

    /**
     * Create PR_Time for current moment
     * @returns {PR_Time}
     */
    static now() {
        return new PR_Time(new Date());
    }

    /**
     * Create PR_Time from Unix timestamp
     * @param {number} timestamp - Milliseconds since epoch
     * @returns {PR_Time}
     */
    static fromTimestamp(timestamp) {
        return new PR_Time(new Date(timestamp));
    }

    /**
     * Decode ISO 8601 string to PR_Time
     * @param {string|null|undefined} data - ISO 8601 format string
     * @returns {PR_Time|null}
     */
    static decode(data) {
        if (!data) { return null; }
        return new PR_Time(new Date(data));
    }

    /**
     * Optionally decode ISO 8601 string to PR_Time
     * @param {string|null|undefined} data
     * @returns {PR_Time|null}
     */
    static optionallyDecode(data) {
        if (!data) { return null; }
        return PR_Time.decode(data);
    }

    /**
     * Encode to ISO 8601 string
     * @returns {string}
     */
    encode() {
        return this._date.toISOString();
    }
}
