#!/usr/bin/env node

/**
 * Simple HTTP server for testing the browser bundle
 * Usage: node scripts/serve.js [port]
 */

import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const PORT = process.argv[2] || 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.map': 'application/json',
};

const server = createServer(async (req, res) => {
    let filePath = req.url === '/' ? '/test-harness.html' : req.url;
    filePath = join(rootDir, filePath);

    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
        const content = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
        console.log(`200 ${req.method} ${req.url}`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            console.log(`404 ${req.method} ${req.url}`);
        } else {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
            console.error(`500 ${req.method} ${req.url}`, error);
        }
    }
});

server.listen(PORT, () => {
    console.log(`\nProcuret JS Test Server`);
    console.log(`=======================`);
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Test harness: http://localhost:${PORT}/test-harness.html`);
    console.log(`\nPress Ctrl+C to stop\n`);
});
