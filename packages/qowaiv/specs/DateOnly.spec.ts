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

    it('minValue is 0001-01-01', () => {
        expect(DateOnly.minValue).toStrictEqual(new DateOnly(1, 1, 1));
    });

    it('maxValue is 9999-12-31', () => {
        expect(DateOnly.maxValue).toStrictEqual(new DateOnly(9999, 12, 31));
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
    ])('getDayOfWeek() returns %0', (date, day) => {
        expect(date.getDayOfWeek()).toBe(day);
    });

    // values from: https://nsidc.org/data/user-resources/help-center/day-year-doy-calendar
    test.each([
        [new DateOnly(2025,  1,  1),   1],
        [new DateOnly(2025,  2,  3),  34],
        [new DateOnly(2025,  3,  5),  64],
        [new DateOnly(2025,  4,  7),  97],
        [new DateOnly(2025,  5,  9), 129],
        [new DateOnly(2025,  6, 11), 162],
        [new DateOnly(2025,  7, 13), 194],
        [new DateOnly(2025,  8, 15), 227],
        [new DateOnly(2025,  9, 17), 260],
        [new DateOnly(2025, 10, 19), 292],
        [new DateOnly(2025, 11, 21), 325],
        [new DateOnly(2025, 12, 31), 365],
    ])('getDayOfYear() of the week for non leap years returns %0', (date, day) => {
        expect(date.getDayOfYear()).toBe(day);
    });

    test.each([
        [new DateOnly(2024,  1,  1),   1],
        [new DateOnly(2024,  2,  3),  34],
        [new DateOnly(2024,  3,  5),  65],
        [new DateOnly(2024,  4,  7),  98],
        [new DateOnly(2024,  5,  9), 130],
        [new DateOnly(2024,  6, 11), 163],
        [new DateOnly(2024,  7, 13), 195],
        [new DateOnly(2024,  8, 15), 228],
        [new DateOnly(2024,  9, 17), 261],
        [new DateOnly(2024, 10, 19), 293],
        [new DateOnly(2024, 11, 21), 326],
        [new DateOnly(2024, 12, 31), 366],
    ])('getDayOfYear() of the week for leap years returns %0', (date, day) => {
        expect(date.getDayOfYear()).toBe(day);
    });
});
