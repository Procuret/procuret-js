/**
 * HTTP Client abstraction for universal browser/Node.js support
 * @module http/client
 */

/**
 * Abstract HTTP client interface
 * @abstract
 */
export class HttpClient {
    /**
     * Make an HTTP request
     * @param {string} method - HTTP method (GET, POST, etc.)
     * @param {string} url - Full URL to request
     * @param {Object} headers - Request headers
     * @param {string|null} body - Request body (JSON string or null)
     * @param {function(Error?, {status: number, body: string}?): void} callback
     */
    request(method, url, headers, body, callback) {
        throw new Error('HttpClient.request must be implemented by subclass');
    }
}

/**
 * Browser HTTP client using XMLHttpRequest (with fetch fallback)
 */
export class BrowserHttpClient extends HttpClient {
    request(method, url, headers, body, callback) {
        // Prefer fetch for modern browsers
        if (typeof fetch !== 'undefined') {
            this._fetchRequest(method, url, headers, body, callback);
        } else if (typeof XMLHttpRequest !== 'undefined') {
            this._xhrRequest(method, url, headers, body, callback);
        } else {
            callback(new Error('No HTTP client available in this environment'), null);
        }
    }

    _fetchRequest(method, url, headers, body, callback) {
        const options = {
            method,
            headers: headers || {},
        };

        if (body) {
            options.body = body;
        }

        fetch(url, options)
            .then(response => {
                return response.text().then(text => ({
                    status: response.status,
                    body: text
                }));
            })
            .then(result => {
                callback(null, result);
            })
            .catch(error => {
                callback(error, null);
            });
    }

    _xhrRequest(method, url, headers, body, callback) {
        const request = new XMLHttpRequest();

        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                callback(null, {
                    status: request.status,
                    body: request.responseText
                });
            }
        };

        request.onerror = () => {
            callback(new Error('XMLHttpRequest failed'), null);
        };

        request.open(method, url, true);

        if (headers) {
            Object.keys(headers).forEach(key => {
                request.setRequestHeader(key, headers[key]);
            });
        }

        if (body) {
            request.send(body);
        } else {
            request.send();
        }
    }
}

/**
 * Node.js HTTP client using native fetch (Node 18+)
 */
export class NodeHttpClient extends HttpClient {
    request(method, url, headers, body, callback) {
        const options = {
            method,
            headers: headers || {},
        };

        if (body) {
            options.body = body;
        }

        fetch(url, options)
            .then(response => {
                return response.text().then(text => ({
                    status: response.status,
                    body: text
                }));
            })
            .then(result => {
                callback(null, result);
            })
            .catch(error => {
                callback(error, null);
            });
    }
}

/**
 * Detect the current environment and return an appropriate HTTP client
 * @returns {HttpClient}
 */
export function createHttpClient() {
    // Check for Node.js environment
    if (typeof process !== 'undefined' && process.versions && process.versions.node) {
        return new NodeHttpClient();
    }

    // Browser environment
    return new BrowserHttpClient();
}

// Default singleton client instance
let defaultClient = null;

/**
 * Get the default HTTP client (lazily initialized)
 * @returns {HttpClient}
 */
export function getHttpClient() {
    if (!defaultClient) {
        defaultClient = createHttpClient();
    }
    return defaultClient;
}

/**
 * Set a custom HTTP client (useful for testing)
 * @param {HttpClient} client
 */
export function setHttpClient(client) {
    defaultClient = client;
}
