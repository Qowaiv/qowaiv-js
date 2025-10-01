import { describe, expect, it, test } from 'vitest';
import { create, parse, fromDate, minValue, maxValue, isLeapYear, daysPerMonth } from '../src/DateOnly';
import { Rnd } from './_rnd';

describe('Date-time', () => {

    test.each([
        [create(1308,  4, 16), -20881584000000],
        [create(1753,  1,  1),  -6847804800000],
        [create(1969, 12, 31),       -86400000],
        [create(1970,  1,  1),               0],
        [create(1970,  1,  2),        86400000],
        [create(1970,  1,  3),       172800000],
        [create(9999, 12, 31), 253402214400000],
    ])('unix time stamp for %s is %', (date, expected) => {
        const timestamp = Date.UTC(date.year, date.month - 1, date.day);

        expect(date.unixEpoch).toBe(expected);
        expect(timestamp).toBe(expected);
    });

    test.each(Rnd.nextDates(100))
    ('%s: DateOnly.dayOfWeek equals Date.getDay() ', (date) => {

        const dateOnly = fromDate(date);
        expect(dateOnly.dayOfWeek).toBe(date.getUTCDay());
    });
});

describe('Date-only', () => {

    it('minValue is 0001-01-01', () => {
        expect(minValue).toStrictEqual(create(1, 1, 1));
    });

    it('maxValue is 9999-12-31', () => {
        expect(maxValue).toStrictEqual(create(9999, 12, 31));
    });

    it('day returns 1-based day of the month', () => {
        const date = create(2017, 6, 11);
        expect(date.day).toBe(11);
    });

    it('month returns 1-based month of the year', () => {
        const date = create(2017, 6, 11);
        expect(date.month).toBe(6);
    });

    it('year returns 1-based year', () => {
        const date = create(2017, 6, 11);
        expect(date.year).toBe(2017);
    });

    describe('parse', () => {

        test.each([
            ' ',
            '\t',
            '',
            null,
            undefined,
            ])('parses %s as undefined', (s) => {
                const svo = parse(s!);
                expect(svo).toBeUndefined();
            });

        it('throws for invalid input', () => {
            expect(() => parse('not a date')).throws('Not a valid date');
        });

        it('parses yyyy-MM-dd', () => {
            expect(parse('2017-06-11')).toStrictEqual(create(2017, 6, 11));
        });

        it('parses yyy-M-d', () => {
            expect(parse('217-6-3')).toStrictEqual(create(217, 6, 3));
        });

        it('parses standard date-time string format', () => {
            expect(parse('2017-06-11T06:15:00Z')).toStrictEqual(create(2017, 6, 11));
        });
    });

    describe('add', () => {

        it('years guards min value', () => {
            expect(() => minValue.addYears(-1)).throws();
        });

        it('years guards max value', () => {
            expect(() => maxValue.addYears(+1)).throws();
        });

        it('years returns a new date-only', () => {
            const curr = create(2017, 6, 11);
            const next = curr.addYears(8);

            expect(next.equals(create(2025, 6, 11))).toBe(true);
            expect(next).not.toBe(curr);
        });

        it('months guards min value', () => {
            expect(() => minValue.addMonths(-1)).throws();
        });

        it('months guards max value', () => {
            expect(() => maxValue.addMonths(+1)).throws();
        });

        it('months returns a new date-only', () => {
            const curr = create(2017, 6, 11);
            const next = curr.addMonths(8);
            expect(next).toStrictEqual(create(2018, 2, 11));
            expect(next).not.toBe(curr);
        });

        it('months returns a new date-only guarding the day of the month', () => {
            const curr = create(1988, 5, 31);
            const next = curr.addMonths(-3);
            expect(next).toStrictEqual(create(1988, 2, 29));
        });

        it('days guards min value', () => {
            expect(() => minValue.addDays(-1)).throws();
        });

        it('days guards max value', () => {
            expect(() => maxValue.addDays(+1)).throws();
        });

         it('0 days returns a new date-only', () => {
            const curr = create(2017, 6, 11);
            const next = curr.addDays(0);
            expect(next).toStrictEqual(create(2017, 6, 11));
            expect(next).not.toBe(curr);
        });

        it('-1 days returns a new date-only', () => {
            const curr = create(2017, 6, 11);
            const next = curr.addDays(-1);
            expect(next).toStrictEqual(create(2017, 6, 10));
            expect(next).not.toBe(curr);
        });

         it('+1 days returns a new date-only', () => {
            const curr = create(2017, 6, 11);
            const next = curr.addDays(+1);
            expect(next).toStrictEqual(create(2017, 6, 12));
            expect(next).not.toBe(curr);
        });

          it('+1 days returns a new date-only in a leap year', () => {
            const curr = create(1988, 2, 29);
            const next = curr.addDays(+1);
            expect(next).toStrictEqual(create(1988, 3, 1));
            expect(next).not.toBe(curr);
        });

         it('days returns a new date-only', () => {
            const curr = create(2017, 6, 11);
            const next = curr.addDays(3650);
            expect(next).toStrictEqual(create(2027, 6, 9));
            expect(next).not.toBe(curr);
        });
    });

     describe('format', () => {
        
        it('toString() is conform ISO', () => {
            expect(create(2017, 6, 11).toString()).toBe('2017-06-11');
        });

        it('Supports date style full', () => {
            expect(create(2017, 6, 11).format('nl', { dateStyle: 'full' })).toBe('zondag 11 juni 2017');
        });

         it('Supports date style long', () => {
            expect(create(2017, 6, 11).format('nl', { dateStyle: 'long' })).toBe('11 juni 2017');
        });


        it('Supports date style medium', () => {
            expect(create(2017, 6, 11).format('nl', { dateStyle: 'medium' })).toBe('11 jun 2017');
        });

        it('Supports date style short', () => {
            expect(create(2017, 6, 11).format('nl', { dateStyle: 'short' })).toBe('11-06-2017');
        });

     });

    it('toDateTime() returns date equivalent of dates.', () => {
        const date = create(2017, 6, 11);
        const time = new Date(Date.UTC(2017, 6 - 1, 11));
        expect(date.toDateTime()).toStrictEqual(time);
    });

    it("equals is true for same date-only's", () => {
        const date = create(2017, 6, 11);
        expect(date.equals(create(2017, 6, 11))).toBe(true);
    });

    it("equals is true for same date-times's", () => {
        const date = create(2017, 6, 11);
        const othr = new Date(Date.UTC(2017, 6 - 1, 11));
        expect(date.equals(othr)).toBe(true);
    });

    test.each([
        42,
        create(2016, 6, 11),
        create(2018, 6, 11),
        create(2017, 5, 11),
        create(2017, 7, 11),
        create(2017, 6, 10),
        create(2017, 6, 12),
        new Date(2017, 5, 10),
        null,
        undefined,
    ])('equals is false for %s', (other) => {
        const date = create(2017, 6, 11);
        expect(date.equals(other)).toBe(false);
    });

    describe('days per', () => {

        test.each([1, 3, 5, 7, 8, 10, 12])
            ('month is 31 for Jan, Mar, Jul, Aug, Oct, and Dec', (month) => {

                expect(daysPerMonth(2025, month)).toBe(31);
            });

        test.each([4, 6, 9, 11])
            ('month is 30 for Apr, Jun, Sep, and Nov', (month) => {

                expect(daysPerMonth(2025, month)).toBe(30);
            });

        it('month is 28 for Feb not in a leap year', () => {
            expect(daysPerMonth(2025, 2)).toBe(28);
        });

        it('month is 29 for Feb in a leap year', () => {
            expect(daysPerMonth(2024, 2)).toBe(29);
        });
    });

    describe('day of', () => {
        const sun = 0;
        const mon = 1;
        const tue = 2;
        const wed = 3;
        const thu = 4;
        const fri = 5;
        const sat = 6;

        test.each([
            [create(2017, 6, 11), sun],
            [create(2000, 9, 10), sun],
            [create(1848, 12, 25), mon],
            [create(2001, 9, 11), tue],
            [create(2023, 2, 14), tue],
            [create(1969, 4, 30), wed],
            [create(1900, 5, 24), thu],
            [create(1970, 1, 1), thu],
            [create(2025, 8, 22), fri],
            [create(2025, 10, 3), fri],
            [create(1979, 12, 1), sat],
        ])('week returns %1 for %0', (date, day) => {
            expect(date.dayOfWeek()).toBe(day);
        });

        // values from: https://nsidc.org/data/user-resources/help-center/day-year-doy-calendar
        test.each([
            [create(2025, 1, 1), 1],
            [create(2025, 2, 3), 34],
            [create(2025, 3, 5), 64],
            [create(2025, 4, 7), 97],
            [create(2025, 5, 9), 129],
            [create(2025, 6, 11), 162],
            [create(2025, 7, 13), 194],
            [create(2025, 8, 15), 227],
            [create(2025, 9, 17), 260],
            [create(2025, 10, 19), 292],
            [create(2025, 11, 21), 325],
            [create(2025, 12, 31), 365],
        ])('year for non leap years returns %1 for %0', (date, day) => {
            expect(date.dayOfYear()).toBe(day);
        });

        test.each([
            [create(2024, 1, 1), 1],
            [create(2024, 2, 3), 34],
            [create(2024, 3, 5), 65],
            [create(2024, 4, 7), 98],
            [create(2024, 5, 9), 130],
            [create(2024, 6, 11), 163],
            [create(2024, 7, 13), 195],
            [create(2024, 8, 15), 228],
            [create(2024, 9, 17), 261],
            [create(2024, 10, 19), 293],
            [create(2024, 11, 21), 326],
            [create(2024, 12, 31), 366],
        ])('year for leap years returns %0', (date, day) => {
            expect(date.dayOfYear()).toBe(day);
        });
    });

    describe('Leap years', () => {

        test.each([1901, 1990, 2003])
            ('Years not divisible by 4 are not', (year) => {
                expect(isLeapYear(year)).toBe(false);
            });

        test.each([1900, 1800])
            ('Years divisible by 100 but not 400 are not', (year) => {
                expect(isLeapYear(year)).toBe(false);
            });

        test.each([1988, 2000, 2024])
            ('Years divisible by 4 (not divisible by 100 except divisible by 400) are', (year) => {
                expect(isLeapYear(year)).toBe(true);
            });
    });
});
