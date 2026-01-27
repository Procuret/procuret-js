import { describe, it, expect } from 'vitest';
import { PR_Enumeration } from '../../src/ancillary/enumeration.js';

// Create a test enumeration class
class TestEnum extends PR_Enumeration {
    static get FIRST() { return new TestEnum(1, 'First'); }
    static get SECOND() { return new TestEnum(2, 'Second'); }

    static get enumerations() {
        return [TestEnum.FIRST, TestEnum.SECOND];
    }
}

describe('PR_Enumeration', () => {
    describe('constructor', () => {
        it('should create enumeration with indexid and name', () => {
            const e = new PR_Enumeration(1, 'Test');

            expect(e.indexid).toBe(1);
            expect(e.name).toBe('Test');
        });
    });

    describe('equalTo', () => {
        it('should return true for same indexid', () => {
            const a = TestEnum.FIRST;
            const b = new TestEnum(1, 'Different Name');

            expect(a.equalTo(b)).toBe(true);
        });

        it('should return false for different indexid', () => {
            const a = TestEnum.FIRST;
            const b = TestEnum.SECOND;

            expect(a.equalTo(b)).toBe(false);
        });

        it('should return false for null', () => {
            expect(TestEnum.FIRST.equalTo(null)).toBe(false);
        });
    });

    describe('notEqualTo', () => {
        it('should return opposite of equalTo', () => {
            expect(TestEnum.FIRST.notEqualTo(TestEnum.SECOND)).toBe(true);
            expect(TestEnum.FIRST.notEqualTo(TestEnum.FIRST)).toBe(false);
        });
    });

    describe('isIn', () => {
        it('should return true when in array', () => {
            const arr = [TestEnum.FIRST, TestEnum.SECOND];
            expect(TestEnum.FIRST.isIn(arr)).toBe(true);
        });

        it('should return false when not in array', () => {
            const arr = [TestEnum.SECOND];
            expect(TestEnum.FIRST.isIn(arr)).toBe(false);
        });

        it('should return false for falsy array', () => {
            expect(TestEnum.FIRST.isIn(null)).toBe(false);
            expect(TestEnum.FIRST.isIn(undefined)).toBe(false);
        });
    });

    describe('isNotIn', () => {
        it('should return opposite of isIn', () => {
            const arr = [TestEnum.FIRST];

            expect(TestEnum.FIRST.isNotIn(arr)).toBe(false);
            expect(TestEnum.SECOND.isNotIn(arr)).toBe(true);
        });
    });

    describe('withId', () => {
        it('should find enumeration by indexid', () => {
            const result = PR_Enumeration.withId(1, TestEnum);
            expect(result.indexid).toBe(1);
        });

        it('should throw for unknown indexid', () => {
            expect(() => PR_Enumeration.withId(999, TestEnum)).toThrow();
        });
    });

    describe('decode', () => {
        it('should decode indexid to enumeration', () => {
            const result = PR_Enumeration.decode(1, TestEnum);
            expect(result.indexid).toBe(1);
        });
    });

    describe('optionallyDecode', () => {
        it('should return null for falsy data', () => {
            expect(PR_Enumeration.optionallyDecode(null, TestEnum)).toBeNull();
            expect(PR_Enumeration.optionallyDecode('null', TestEnum)).toBeNull();
        });

        it('should decode valid data', () => {
            const result = PR_Enumeration.optionallyDecode(1, TestEnum);
            expect(result.indexid).toBe(1);
        });
    });
});
