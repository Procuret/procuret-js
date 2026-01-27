/**
 * API response decoder utility
 */
export class PR_Response {
    /**
     * Decode a single response object
     * @template T
     * @param {Error|null} error - Error if request failed
     * @param {Object|null} data - Raw response data
     * @param {function(Error|null, T|null): void} callback - Callback receiving result
     * @param {{decode: function(Object): T}} outputType - Type with decode method
     */
    static decode<T>(error: Error | null, data: any | null, callback: (arg0: Error | null, arg1: T | null) => void, outputType: {
        decode: (arg0: any) => T;
    }): void;
    /**
     * Decode an array of response objects
     * @template T
     * @param {Error|null} error - Error if request failed
     * @param {Object[]|null} data - Raw response data array
     * @param {function(Error|null, T[]|null): void} callback - Callback receiving results
     * @param {{decode: function(Object): T}} outputType - Type with decode method
     */
    static decodeMany<T>(error: Error | null, data: any[] | null, callback: (arg0: Error | null, arg1: T[] | null) => void, outputType: {
        decode: (arg0: any) => T;
    }): void;
}
//# sourceMappingURL=response.d.ts.map