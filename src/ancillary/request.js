/* Procuret JS - API request Type */

import { PR_ApiError } from './error.js';
import { getHttpClient } from '../http/client.js';

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
    static get _KEY_HEADER() { return 'x-procuret-api-key'; }

    /** @type {string} */
    static get _SESSION_ID_HEADER() { return 'x-procuret-session-id'; }

    /** @type {string} */
    static get _JSON_HEADER() { return 'application/json;charset=UTF-8'; }

    /** @type {string} */
    static get _LIVE_ENDPOINT() { return 'https://procuret.com/api'; }

    /** @type {RegExp} */
    static get _QUOTE_EXPRESSION() {
        return new RegExp(/(\b\d{13,128}\b)(?!\.)(?!\/)(?!\%)(?!")(?!:)(?!-)/g);
    }

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
    static make(
        path,
        method,
        parameters,
        data,
        callback,
        session = null,
        apiEndpoint = null,
        withoutAuth = false,
        optionalAuth = false,
        suppressError = false,
        doNotEscapeInt = false,
        throwOnGet404 = false
    ) {
        const Self = PR_ApiRequest;

        try {
            if (!path) { throw Error('Cannot make request to falsy path'); }
            if (['GET', 'UPDATE', 'DELETE', 'POST', 'PUT'].indexOf(method) < 0) {
                throw Error('Method appears invalid: ' + method);
            }

            const throwOn404 = (() => {
                if (method != 'GET') { return true; }
                return throwOnGet404;
            })();

            /** @type {RequestSummary} */
            const summary = {
                requestData: data ? JSON.stringify(data) : null,
                requestParameters: parameters,
                requestPath: path,
                requestMethod: method,
                suppressError: suppressError
            };

            const endpoint = Self._chooseApiEndpoint(apiEndpoint);
            const url = Self._buildUrl(path, parameters, endpoint);

            // Build headers
            /** @type {Record<string, string>} */
            const headers = {};

            if (!withoutAuth) {
                const apiKey = Self._chooseApiKey(session, optionalAuth);
                const sessionId = Self._chooseSessionId(session, optionalAuth);
                if (apiKey && sessionId) {
                    headers[Self._SESSION_ID_HEADER] = sessionId;
                    headers[Self._KEY_HEADER] = apiKey;
                }
            }

            /** @type {string|null} */
            let body = null;
            if (data) {
                headers['content-type'] = Self._JSON_HEADER;
                body = JSON.stringify(data);
            }

            // Use the universal HTTP client
            const httpClient = getHttpClient();
            httpClient.request(method, url, headers, body, (error, response) => {
                if (error) {
                    callback(error, null);
                    return;
                }

                Self._parseHttpResponse(
                    response.status,
                    response.body,
                    callback,
                    summary,
                    doNotEscapeInt,
                    throwOn404
                );
            });

        } catch (error) {
            callback(error, null);
        }
    }

    /**
     * Parse JSON while preserving large integers as strings
     * @param {string} string - JSON string
     * @returns {*} Parsed JSON
     */
    static integerSafeJSONParse(string) {
        const quotedBody = string.replace(
            PR_ApiRequest._QUOTE_EXPRESSION,
            '\"$&\"'
        );
        return JSON.parse(quotedBody);
    }

    /**
     * Build full URL from path, parameters, and endpoint
     * @param {string} path
     * @param {import('./query_string.js').PR_QueryString|null} parameters
     * @param {string} apiEndpoint
     * @returns {string}
     * @private
     */
    static _buildUrl(path, parameters, apiEndpoint) {
        const base = apiEndpoint + path;
        if (parameters) { return base + parameters.query; }
        return base;
    }

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
    static _parseHttpResponse(
        status,
        responseText,
        callback,
        summary,
        doNotEscapeInt,
        throwOn404
    ) {
        const Self = PR_ApiRequest;

        if (status === 200) {
            let result = null;
            try {
                if (doNotEscapeInt) { result = JSON.parse(responseText); }
                else { result = Self.integerSafeJSONParse(responseText); }
            } catch (error) {
                callback(error, null);
                return;
            }
            callback(null, result);
            return;
        }

        if (status === 404 && !throwOn404) {
            callback(null, null);
            return;
        }

        // Error response
        let errorContent = null;
        try {
            errorContent = Self.integerSafeJSONParse(responseText);
        } catch (error) {
            const e = new PR_ApiError(status, null, summary);
            callback(e, null);
            return;
        }

        const apiError = new PR_ApiError(status, errorContent, summary);
        callback(apiError, null);
    }

    /**
     * Choose API key from session or throw
     * @param {Session|null} override
     * @param {boolean} optionalAuth
     * @returns {string|null}
     * @private
     */
    static _chooseApiKey(override, optionalAuth = false) {
        if (override) { return override.apiKey; }
        if (optionalAuth) { return null; }
        throw Error('No API Key available. Supply Session instance to PR_ApiRequest.make()');
    }

    /**
     * Choose session ID from session or throw
     * @param {Session|null} override
     * @param {boolean} optionalAuth
     * @returns {string|null}
     * @private
     */
    static _chooseSessionId(override, optionalAuth = false) {
        if (override) { return override.sessionId; }
        if (optionalAuth) { return null; }
        throw Error('No Session ID available. Supply Session instance to PR_ApiRequest.make()');
    }

    /**
     * Choose API endpoint from override or default
     * @param {string|null} override
     * @returns {string}
     * @private
     */
    static _chooseApiEndpoint(override) {
        if (override) { return override; }
        return PR_ApiRequest._LIVE_ENDPOINT;
    }
}
