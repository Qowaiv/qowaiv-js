import { describe, expect, it, test } from 'vitest';
import { Unknown } from '../src/Unknown';
const unknown = Unknown.instance;

describe('Unknown', () => {

    it('equals same instance', () => {

        expect(unknown.equals(unknown)).toBe(true);
    });

    test.each([
        null,
        { },
        true,
        false,
        42,
        3.14159265359,
        undefined,
        "not unknown",
        ""])
        ('Does not equal other %s', (s) => {
            expect(unknown.equals(s)).toBe(false);
    });

    it('toString() returns "?"', () => {

        expect(unknown.toString()).toBe('?');
    });

    it('toJSON() returns "?"', () => {

        expect(unknown.toJSON()).toBe('?');
    });

    it('format() returns "?"', () => {

        expect(unknown.format('')).toBe('?');
    });

    it('fromJSON returns unknown for "?"', () => {

        expect(Unknown.fromJSON('?')).toBe(unknown);
    });

    it('tryParse returns unknown for "?"', () => {

        expect(Unknown.tryParse('?')).toBe(unknown);
    });

    it('fromJSON returns undefined for all but for "?"', () => {

        expect(Unknown.fromJSON(true)).toBeUndefined();
    });

    test.each([
        null,
        { },
        true,
        false,
        42,
        3.14159265359,
        undefined,
        "not unknown",
        ""])
        ('fromJSON returns undefined for %s', (s) =>{
            expect(Unknown.fromJSON(s)).toBeUndefined();
    });

    test.each([
        null,
        undefined,
        "not unknown",
        ""])
        ('tryParse returns undefined for %s', (s) =>{
            expect(Unknown.tryParse(s)).toBeUndefined();
    });
});