import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    HttpClient,
    BrowserHttpClient,
    NodeHttpClient,
    createHttpClient,
    getHttpClient,
    setHttpClient
} from '../../src/http/client.js';

describe('HttpClient', () => {
    describe('abstract class', () => {
        it('should throw when request is called directly', () => {
            const client = new HttpClient();

            expect(() => {
                client.request('GET', 'http://example.com', {}, null, () => {});
            }).toThrow('HttpClient.request must be implemented by subclass');
        });
    });
});

describe('NodeHttpClient', () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it('should make requests using fetch', () => {
        const mockFetch = vi.fn().mockResolvedValue({
            status: 200,
            text: () => Promise.resolve('{"result": "ok"}')
        });
        global.fetch = mockFetch;

        const client = new NodeHttpClient();

        return new Promise((resolve) => {
            client.request('GET', 'http://example.com/api', { 'X-Test': 'value' }, null, (error, response) => {
                expect(error).toBeNull();
                expect(response.status).toBe(200);
                expect(response.body).toBe('{"result": "ok"}');

                expect(mockFetch).toHaveBeenCalledWith(
                    'http://example.com/api',
                    expect.objectContaining({
                        method: 'GET',
                        headers: { 'X-Test': 'value' }
                    })
                );

                resolve();
            });
        });
    });

    it('should include body for POST requests', () => {
        const mockFetch = vi.fn().mockResolvedValue({
            status: 201,
            text: () => Promise.resolve('{"id": 123}')
        });
        global.fetch = mockFetch;

        const client = new NodeHttpClient();
        const body = JSON.stringify({ name: 'test' });

        return new Promise((resolve) => {
            client.request('POST', 'http://example.com/api', {}, body, (error, response) => {
                expect(error).toBeNull();
                expect(response.status).toBe(201);

                expect(mockFetch).toHaveBeenCalledWith(
                    'http://example.com/api',
                    expect.objectContaining({
                        method: 'POST',
                        body: body
                    })
                );

                resolve();
            });
        });
    });

    it('should handle fetch errors', () => {
        const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));
        global.fetch = mockFetch;

        const client = new NodeHttpClient();

        return new Promise((resolve) => {
            client.request('GET', 'http://example.com/api', {}, null, (error, response) => {
                expect(error).not.toBeNull();
                expect(error.message).toBe('Network error');
                expect(response).toBeNull();
                resolve();
            });
        });
    });
});

describe('createHttpClient', () => {
    it('should return NodeHttpClient in Node.js environment', () => {
        // In vitest running on Node, this should return NodeHttpClient
        const client = createHttpClient();

        expect(client).toBeInstanceOf(NodeHttpClient);
    });
});

describe('getHttpClient / setHttpClient', () => {
    let originalClient;

    beforeEach(() => {
        // Store current client
        originalClient = getHttpClient();
    });

    afterEach(() => {
        // Restore original client
        setHttpClient(originalClient);
    });

    it('should return a client instance', () => {
        const client = getHttpClient();

        expect(client).toBeDefined();
        expect(typeof client.request).toBe('function');
    });

    it('should allow setting a custom client', () => {
        class CustomClient extends HttpClient {
            request(method, url, headers, body, callback) {
                callback(null, { status: 999, body: 'custom' });
            }
        }

        const customClient = new CustomClient();
        setHttpClient(customClient);

        const client = getHttpClient();
        expect(client).toBe(customClient);
    });

    it('should use the same instance on multiple calls', () => {
        const client1 = getHttpClient();
        const client2 = getHttpClient();

        expect(client1).toBe(client2);
    });
});
