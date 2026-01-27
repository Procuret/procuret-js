/* Procuret JS - Response Type */

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
    static decode(error, data, callback, outputType) {
        let result = null;
        if (error != null) { callback(error, null); return; }
        if (!data) { callback(null, null); return; }
        try { result = outputType.decode(data); }
        catch (error) { callback(error, null); return; }
        callback(null, result);
    }

    /**
     * Decode an array of response objects
     * @template T
     * @param {Error|null} error - Error if request failed
     * @param {Object[]|null} data - Raw response data array
     * @param {function(Error|null, T[]|null): void} callback - Callback receiving results
     * @param {{decode: function(Object): T}} outputType - Type with decode method
     */
    static decodeMany(error, data, callback, outputType) {
        let result = null;
        if (error != null) { callback(error, null); return; }
        if (data == null) { callback(null, null); return; }
        try { result = data.map((d) => { return outputType.decode(d); }); }
        catch (error) { callback(error, null); return; }
        callback(null, result);
    }
}
