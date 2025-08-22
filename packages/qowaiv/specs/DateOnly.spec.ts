import { describe, expect, it, test } from 'vitest';
import { DateOnly } from '../src';

describe('Date-only', () => {

    it('getDay() returns 0-based day of the week', () => {
        const date = new DateOnly(2017, 6, 11);
        expect(date.getDay()).toBe(0);
    });

    it('getDate() returns 1-based day of the month', () => {
        const date = new DateOnly(2017, 6, 11);
        expect(date.getDate()).toBe(11);
    });

    it('getMonth() returns 1-based month of the year', () => {
        const date = new DateOnly(2017, 6, 11);
        expect(date.getMonth()).toBe(6);
    });

    it('getYear() returns 1-based year', () => {
        const date = new DateOnly(2017, 6, 11);
        expect(date.getYear()).toBe(2017);
    });

    it('equals is true for same dates', () => {
        const date = new DateOnly(2017, 6, 11);
        expect(date.equals(new DateOnly(2017, 6, 11))).toBe(true);
    });

    test.each([
        42,
        new DateOnly(2016, 6, 11),
        new DateOnly(2018, 6, 11),
        new DateOnly(2017, 5, 11),
        new DateOnly(2017, 7, 11),
        new DateOnly(2017, 6, 10),
        new DateOnly(2017, 6, 12),
        new Date(2017, 5, 11),
        null,
        undefined,
    ])('equals is false for %other', (other) => {
        const date = new DateOnly(2017, 6, 11);
        expect(date.equals(other)).toBe(false);
    });
});
