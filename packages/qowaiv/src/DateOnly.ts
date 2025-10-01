import { Guard, Svo, Unparsable } from '.';

export interface DateOnly extends IEquatable, ILocalizable<DateOnlyFormat>, IJsonStringifyable {
    /**
     * The year component (1-based).
     */
    readonly year: number;
    /**
     * The month component (1-based).
     */
    readonly month: number;
    /**
     * The day component (1-based).
     */
    readonly day: number;

    /**
     * @returns the UNIX epoch for the specified date-only.
     * @remarks the number of seconds since 1970-01-01.
     */
    unixEpoch(): number;

    /**
     * @returns the day of the week (0 – 6) for the specified date-only.
     */
    dayOfWeek(): number;

    /**
     * @returns The day of the year (1 - 366) for the specified date-only.
     */
    dayOfYear(): number;

    /**
    * Adds the specified number of years to the specified date-only.
    * @param years The years to add to the specified date-only.
    * @returns a new instance of a date-only.
    */
    addYears(years: number): DateOnly;

    /**
     * Adds the specified number of months to the specified date-only.
     * @param months The months to add to the specified date-only.
     * @returns a new instance of a date-only.
     */
    addMonths(months: number): DateOnly;

    /**
     * Adds the specified number of days to the specified date-only.
     * @param days The days to add to the specified date-only.
     * @returns a new instance of a date-only.
     */
    addDays(days: number): DateOnly;

    /**
     * @returns the specified date-only as a date-time for dates starting at 1970-01-01.
     */
    toDateTime(): Date;
}

export const minValue = create(1, 1, 1);

export const maxValue = create(9999, 12, 31);

export function create(year: number, month: number, day: number): DateOnly {
    const daysTo1970 = 719162;
    const secondsPerDay = 86400000;

    Guard.int(year, 1, 9999);
    Guard.int(month, 1, 12);
    Guard.int(day, 1, daysPerMonth(year, month));

    return Object.freeze({
        year,
        month,
        day,
        unixEpoch,
        dayOfWeek,
        dayOfYear,
        addYears,
        addMonths,
        addDays,
        toDateTime,
        toString,
        format,
        toJSON,
        equals,
    } satisfies DateOnly)

    function totalDays(): number {
        return dayOfYear()
            + (year - 1) * 365
            + getLeapYears(year);
    }

    function unixEpoch(): number {
        return (totalDays() - daysTo1970 - 1) * secondsPerDay;
    }

    function dayOfWeek(): number {
        const days = unixEpoch() / secondsPerDay + daysTo1970 + 1;
        return days % 7;
    }

    function dayOfYear(): number {
        return day
            + [0, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365][month] // days per month
            + (month >= 3 && isLeapYear(year) ? 1 : 0);
    }

    function addYears(years: number) {
        return create(year + years, month, day);
    }

    function addMonths(months: number) {
        const ms = year * 12 + month - 1 + months;
        const y = ~~(ms / 12);
        const m = (ms % 12) + 1;
        const d = Math.min(daysPerMonth(y, m), day);
        return create(y, m, d);
    }

    function addDays(days: number): DateOnly {
        let d = totalDays() + days;

        // Aproximate the number of years.
        let y = ~~(d / (365.2425)) + 1;
        d -= (y - 1) * 365 + getLeapYears(y);

        let m = 0;
        while (m < 12) {
            const dpm = daysPerMonth(y, ++m);
            if (d < dpm) break;
            d -= dpm;
        }

        return create(y, m, d);
    }

    function toDateTime(): Date {
        return new Date(unixEpoch());
    }

    function toString(): string {
        return `${pad(year, 4)}-${pad(month)}-${pad(day)}`;
    }

    function format(locales?: string | string[], options?: any): string {
        const date = toDateTime();
        return date.toLocaleDateString(locales, options);
    }

    function toJSON(): string {
        return toString();
    }

    function equals(other: DateOnly): boolean {
        return (
            !Svo.isEmpty(other)
            && year === other.year
            && month === other.month
            && day === other.day)
            || (other instanceof (Date)
                && year === other.getUTCFullYear()
                && month === (other.getUTCMonth() + 1)
                && day === other.getUTCDate());
    }
}

/**
 * Creates a date-only based on a date-time.
 * @param {Date} d The date-time to convert.
 * @returns {DateOnly} represting the (UTC) date part of the date-time.
 */
export function fromDate(d: Date): DateOnly {
    return create(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

/**
 * Parses a date-only string.
 * @param {string} s A string containing date to convert.
 * @returns {DateOnly} A GUID if valid, otherwise throws.
 */
export function parse(s: string | null | undefined): DateOnly | undefined {
    const svo = tryParse(s);
    if (svo instanceof (Unparsable)) {
        throw svo;
    }
    return svo;
}

/**
 * Tries to parse a date-only string.
 * @param {string} s A string containing GUID to convert.
 * @returns {DateOnly} A date if valid, otherwise unparsable.
 */
export function tryParse(s: string | null | undefined): DateOnly | Unparsable | undefined {
    if (Svo.isEmpty(s)) {
        return undefined;
    }
    try {
        const str = s!.trim();
        const match = str.match(/^(\d{1,4})-(1[0-2]|0?\d)-(3[01]|[0-2]?\d)$/);
        if (match?.length === 4) {
            return create(Number.parseInt(match[1]), Number.parseInt(match[2]), Number.parseInt(match[3]));
        }

        const date = new Date(Date.parse(str));
        if (Number.isFinite(date.getTime())) {
            return create(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
        }
    }
    catch { /* fall trough */ }
    return new Unparsable("Not a valid date", s);
}

/**
  * @param year The year to check.
  * @returns true if the year is a leap year.
  */
export function isLeapYear(year: number): boolean {
    return !(year & 3 || year & 15 && !(year % 25));
}

/**
 * @param year The year to check.
 * @param month The month to check.
 * @returns the total days for the specified year/month.
 */
export function daysPerMonth(year: number, month: number): number {
    if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    }
    else {
        return [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }
}

function getLeapYears(year: number) {
    const y = year - 1;
    return ~~(y / 4)
        + ~~(y / 400)
        - ~~(y / 100);
}

function pad(n: number, padding?: number): string {
        let s = n.toString();
        while (s.length < (padding ?? 2)) {
            s = '0' + s;
        }
        return s;
    }