/**
 * @typedef {Object} Session
 * @property {string} apiKey - API key
 * @property {string} sessionId - Session ID
 */
/**
 * @typedef {Object} RequestSummary
 * @property {string|null} requestData - Stringified request data
 * @property {Object|null} requestParameters - Query parameters
 * @property {string} requestPath - API path
 * @property {string} requestMethod - HTTP method
 * @property {boolean} suppressError - Whether to suppress error reporting
 */
/**
 * HTTP API request handler
 */
export class PR_ApiRequest {
    /** @type {string} */
    static get _KEY_HEADER(): string;
    /** @type {string} */
    static get _SESSION_ID_HEADER(): string;
    /** @type {string} */
    static get _JSON_HEADER(): string;
    /** @type {string} */
    static get _LIVE_ENDPOINT(): string;
    /** @type {RegExp} */
    static get _QUOTE_EXPRESSION(): RegExp;
    /**
     * Make an API request
     * @param {string} path - API path (e.g., '/humans')
     * @param {'GET'|'POST'|'PUT'|'DELETE'|'UPDATE'} method - HTTP method
     * @param {import('./query_string.js').PR_QueryString|null} parameters - Query parameters
     * @param {Object|null} data - Request body data
     * @param {function(Error|null, *): void} callback - Response callback
     * @param {Session|null} [session] - Authentication session
     * @param {string|null} [apiEndpoint] - API endpoint override
     * @param {boolean} [withoutAuth] - Send without authentication
     * @param {boolean} [optionalAuth] - Auth is optional
     * @param {boolean} [suppressError] - Don't report errors
     * @param {boolean} [doNotEscapeInt] - Don't escape 64-bit integers
     * @param {boolean} [throwOnGet404] - Throw on 404 for GET requests
     */
    static make(path: string, method: "GET" | "POST" | "PUT" | "DELETE" | "UPDATE", parameters: import("./query_string.js").PR_QueryString | null, data: any | null, callback: (arg0: Error | null, arg1: any) => void, session?: Session | null, apiEndpoint?: string | null, withoutAuth?: boolean, optionalAuth?: boolean, suppressError?: boolean, doNotEscapeInt?: boolean, throwOnGet404?: boolean): void;
    /**
     * Parse JSON while preserving large integers as strings
     * @param {string} string - JSON string
     * @returns {*} Parsed JSON
     */
    static integerSafeJSONParse(string: string): any;
    /**
     * Build full URL from path, parameters, and endpoint
     * @param {string} path
     * @param {import('./query_string.js').PR_QueryString|null} parameters
     * @param {string} apiEndpoint
     * @returns {string}
     * @private
     */
    private static _buildUrl;
    /**
     * Parse HTTP response
     * @param {number} status - HTTP status code
     * @param {string} responseText - Response body
     * @param {function(Error|null, *): void} callback
     * @param {RequestSummary} summary
     * @param {boolean} doNotEscapeInt
     * @param {boolean} throwOn404
     * @private
     */
    private static _parseHttpResponse;
    /**
     * Choose API key from session or throw
     * @param {Session|null} override
     * @param {boolean} optionalAuth
     * @returns {string|null}
     * @private
     */
    private static _chooseApiKey;
    /**
     * Choose session ID from session or throw
     * @param {Session|null} override
     * @param {boolean} optionalAuth
     * @returns {string|null}
     * @private
     */
    private static _chooseSessionId;
    /**
     * Choose API endpoint from override or default
     * @param {string|null} override
     * @returns {string}
     * @private
     */
    private static _chooseApiEndpoint;
}
export type Session = {
    /**
     * - API key
     */
    apiKey: string;
    /**
     * - Session ID
     */
    sessionId: string;
};
export type RequestSummary = {
    /**
     * - Stringified request data
     */
    requestData: string | null;
    /**
     * - Query parameters
     */
    requestParameters: any | null;
    /**
     * - API path
     */
    requestPath: string;
    /**
     * - HTTP method
     */
    requestMethod: string;
    /**
     * - Whether to suppress error reporting
     */
    suppressError: boolean;
};
//# sourceMappingURL=request.d.ts.map