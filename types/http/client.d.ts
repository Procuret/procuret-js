/**
 * Detect the current environment and return an appropriate HTTP client
 * @returns {HttpClient}
 */
export function createHttpClient(): HttpClient;
/**
 * Get the default HTTP client (lazily initialized)
 * @returns {HttpClient}
 */
export function getHttpClient(): HttpClient;
/**
 * Set a custom HTTP client (useful for testing)
 * @param {HttpClient} client
 */
export function setHttpClient(client: HttpClient): void;
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
    request(method: string, url: string, headers: any, body: string | null, callback: (arg0: Error | null, arg1: {
        status: number;
        body: string;
    } | null) => void): void;
}
/**
 * Browser HTTP client using XMLHttpRequest (with fetch fallback)
 */
export class BrowserHttpClient extends HttpClient {
    request(method: any, url: any, headers: any, body: any, callback: any): void;
    _fetchRequest(method: any, url: any, headers: any, body: any, callback: any): void;
    _xhrRequest(method: any, url: any, headers: any, body: any, callback: any): void;
}
/**
 * Node.js HTTP client using native fetch (Node 18+)
 */
export class NodeHttpClient extends HttpClient {
    request(method: any, url: any, headers: any, body: any, callback: any): void;
}
//# sourceMappingURL=client.d.ts.map