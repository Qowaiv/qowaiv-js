import { describe, expect, it, test } from 'vitest';
import { DateOnly } from '../src';

describe('Date-only', () => {

    const sun = 0;
    const mon = 1;
    const tue = 2;
    const wed = 3;
    const thu = 4;
    const fri = 5;
    const sat = 6;

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

    it('toDateTime() returns date equvilent of dates from 1970 and up', () => {
        const date = new DateOnly(2017, 6, 11);
        const time = new Date(Date.UTC(2017, 6 - 1, 11));
        expect(date.toDateTime()).toStrictEqual(time);
    });

    it('toDateTime() is undefined for dates before 1970', () => {
        const date = new DateOnly(1969, 12, 31);
        expect(date.toDateTime()).toBeUndefined();
    });

    it("equals is true for same date-only's", () => {
        const date = new DateOnly(2017, 6, 11);
        expect(date.equals(new DateOnly(2017, 6, 11))).toBe(true);
    });

    it("equals is true for same date-times's", () => {
        const date = new DateOnly(2017, 6, 11);
        const othr = new Date(Date.UTC(2017, 6 - 1, 11));
        expect(date.equals(othr)).toBe(true);
    });

    test.each([
        42,
        new DateOnly(2016, 6, 11),
        new DateOnly(2018, 6, 11),
        new DateOnly(2017, 5, 11),
        new DateOnly(2017, 7, 11),
        new DateOnly(2017, 6, 10),
        new DateOnly(2017, 6, 12),
        new Date(2017, 5, 10),
        null,
        undefined,
    ])('equals is false for %other', (other) => {
        const date = new DateOnly(2017, 6, 11);
        expect(date.equals(other)).toBe(false);
    });
    
    test.each([
        [new DateOnly(2017,  6, 11), sun],
        [new DateOnly(2000,  9, 10), sun],
        [new DateOnly(1848, 12, 25), mon],
        [new DateOnly(2001,  9, 11), tue],
        [new DateOnly(2023,  2, 14), tue],
        [new DateOnly(1969,  4, 30), wed],
        [new DateOnly(1900,  5, 24), thu],
        [new DateOnly(2025,  8, 22), fri],
        [new DateOnly(2025, 10,  3), fri],
        [new DateOnly(1979, 12,  1), sat],
    ])('getDayOfWeek() of the week returns %0', (date, day) => {
        expect(date.getDayOfWeek()).toBe(day);
    });

});
