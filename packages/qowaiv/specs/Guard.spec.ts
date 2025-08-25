import { describe, expect, it, test } from 'vitest';
import { Guard } from '../src';

describe("Guard: ", () => {
    test.each([
        -900719925474099,
        -10000,
        -1,
        0,
        1,
        42,
        23545235,
        900719925474099,
    ])('int guards integer value %0', (val) =>{
        expect(Guard.int(val)).toBe(val);
    });

    test.each([
        '',
        Number.NaN,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        Number.EPSILON,
        0.11,
        Math.PI,
        Math.E,
    ])('int does not guard non integer value %0', (val) =>{
        expect(() => Guard.int(val)).toThrow();
    });

    test.each([
        1,
        2,
        3,
        4,
    ])('int guards integer value %0 when in range', (val) =>{
        expect(Guard.int(val, 1, 4)).toBe(val);
    });

    test.each([
        -1,
        0,
        5,
        6,
    ])('int does no guard integer value %0 out of range', (val) =>{
        expect(() => Guard.int(val, 1, 4)).toThrow();
    });
});
