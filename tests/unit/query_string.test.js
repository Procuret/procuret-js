import { describe, it, expect } from 'vitest';
import { PR_QueryString } from '../../src/ancillary/query_string.js';
import { PR_QueryTerm } from '../../src/ancillary/query_term.js';

describe('PR_QueryString', () => {
    describe('constructor', () => {
        it('should accept array of query terms', () => {
            const terms = [
                new PR_QueryTerm('foo', 'bar'),
                new PR_QueryTerm('baz', 'qux')
            ];

            const qs = new PR_QueryString(terms);
            expect(qs).toBeDefined();
        });

        it('should throw for non-array input', () => {
            // Objects without .length property throw
            expect(() => new PR_QueryString({})).toThrow(
                'parameters do not appear to be an array'
            );
        });
    });

    describe('query', () => {
        it('should return empty query string for no terms', () => {
            const qs = new PR_QueryString([]);
            expect(qs.query).toBe('?');
        });

        it('should return query string with single term', () => {
            const terms = [new PR_QueryTerm('foo', 'bar')];
            const qs = new PR_QueryString(terms);

            expect(qs.query).toBe('?foo=bar');
        });

        it('should return query string with multiple terms', () => {
            const terms = [
                new PR_QueryTerm('foo', 'bar'),
                new PR_QueryTerm('baz', 'qux')
            ];
            const qs = new PR_QueryString(terms);

            expect(qs.query).toBe('?foo=bar&baz=qux');
        });

        it('should encode special characters', () => {
            const terms = [new PR_QueryTerm('message', 'hello world')];
            const qs = new PR_QueryString(terms);

            expect(qs.query).toBe('?message=hello%20world');
        });
    });
});

describe('PR_QueryTerm', () => {
    describe('constructor', () => {
        it('should create term with key and value', () => {
            const term = new PR_QueryTerm('key', 'value');
            expect(term.string).toBe('key=value');
        });

        it('should convert boolean true to string', () => {
            const term = new PR_QueryTerm('enabled', true);
            expect(term.string).toBe('enabled=true');
        });

        it('should convert boolean false to string', () => {
            const term = new PR_QueryTerm('enabled', false);
            expect(term.string).toBe('enabled=false');
        });
    });

    describe('compactPush', () => {
        it('should push term when value is defined', () => {
            const arr = [];
            PR_QueryTerm.compactPush('key', 'value', arr);

            expect(arr).toHaveLength(1);
            expect(arr[0].string).toBe('key=value');
        });

        it('should not push when value is null', () => {
            const arr = [];
            PR_QueryTerm.compactPush('key', null, arr);

            expect(arr).toHaveLength(0);
        });

        it('should not push when value is undefined', () => {
            const arr = [];
            PR_QueryTerm.compactPush('key', undefined, arr);

            expect(arr).toHaveLength(0);
        });

        it('should return the array', () => {
            const arr = [];
            const result = PR_QueryTerm.compactPush('key', 'value', arr);

            expect(result).toBe(arr);
        });
    });

    describe('cp (alias)', () => {
        it('should work like compactPush', () => {
            const arr = [];
            PR_QueryTerm.cp('key', 'value', arr);

            expect(arr).toHaveLength(1);
        });
    });
});
