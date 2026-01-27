#!/usr/bin/env node

/**
 * Procuret JS Build Script
 *
 * Produces multiple distribution formats:
 * - dist/procuret.js       - ES Module
 * - dist/procuret.cjs      - CommonJS for older Node.js
 * - dist/procuret.browser.js - IIFE with global Procuret namespace
 * - dist/procuret.min.js   - Minified browser bundle
 */

import * as esbuild from 'esbuild';
import { mkdirSync, existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const srcDir = join(rootDir, 'src');
const distDir = join(rootDir, 'dist');

// Read version from package.json
const pkg = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'));
const version = pkg.version;

// Ensure dist directory exists
if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
}

const isWatch = process.argv.includes('--watch');

// Shared build options
const sharedOptions = {
    entryPoints: [join(srcDir, 'index.js')],
    bundle: true,
    sourcemap: true,
    target: ['es2020'],
    define: {
        '__VERSION__': JSON.stringify(version),
    },
};

// Build configurations
const builds = [
    // ES Module
    {
        ...sharedOptions,
        outfile: join(distDir, 'procuret.js'),
        format: 'esm',
    },
    // CommonJS
    {
        ...sharedOptions,
        outfile: join(distDir, 'procuret.cjs'),
        format: 'cjs',
    },
    // Browser IIFE (unminified)
    {
        ...sharedOptions,
        outfile: join(distDir, 'procuret.browser.js'),
        format: 'iife',
        globalName: 'Procuret',
        footer: {
            js: `
// Expose classes globally for backward compatibility
if (typeof window !== 'undefined') {
    Object.assign(window, Procuret);
}
`,
        },
    },
    // Browser IIFE (minified)
    {
        ...sharedOptions,
        outfile: join(distDir, 'procuret.min.js'),
        format: 'iife',
        globalName: 'Procuret',
        minify: true,
        footer: {
            js: `if(typeof window!=='undefined'){Object.assign(window,Procuret);}`,
        },
    },
];

async function build() {
    console.log('Building Procuret JS...\n');

    try {
        if (isWatch) {
            // Create contexts for watch mode
            const contexts = await Promise.all(
                builds.map(config => esbuild.context(config))
            );

            // Start watching
            await Promise.all(contexts.map(ctx => ctx.watch()));

            console.log('Watching for changes...');
        } else {
            // One-time build
            for (const config of builds) {
                await esbuild.build(config);
                console.log(`  Built: ${config.outfile.replace(rootDir + '/', '')}`);
            }
            console.log('\nBuild complete!');
        }
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

build();
