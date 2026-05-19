import { Guard, Svo, Unparsable } from '.';

export class DateOnly implements Equatable, Localizable<DateOnlyFormat>, JsonStringifyable {

    /**
     * The mimimum value of date-only (0001-01-01).
     */
    public static readonly minValue = new DateOnly(1, 1, 1);

    /**
     * The maximum value of date-only (9999-12-31).
     */
    public static readonly maxValue = new DateOnly(9999, 12, 31);

    static readonly #daysTo1970 = 719162;
    static readonly #secondsPerDay = 86400000;
        
    /**
     * Creates a new date-only.
     * @param year 1-based (1 - 9999) year
     * @param month 1-based (1 - 12) month
     * @param day  1-based (1 - 31) day
     */
    constructor(year: number, month: number, day: number) {
        this.year = Guard.int(year, 1, 9999);
        this.month = Guard.int(month, 1, 12);
        this.day = Guard.int(day, 1, DateOnly.daysPerMonth(year, month));
    }

    /**
     * The year component (1-based).
     */
    public readonly year: number = 1;
    /**
     * The month component (1-based).
     */
    public readonly month: number = 1;
    /**
     * The day component (1-based).
     */
    public readonly day: number = 1;

    /**
     * @returns the UNIX epoch for the specified date-only.
     * @remarks the number of seconds since 1970-01-01.
     */
    public get unixEpoch(): number {
        return (this.#totalDays - DateOnly.#daysTo1970 - 1) * DateOnly.#secondsPerDay;
    }

    /**
     * @returns the day of the week (0 – 6) for the specified date-only.
     */
    public get dayOfWeek(): number {
        const days = this.unixEpoch / DateOnly.#secondsPerDay + DateOnly.#daysTo1970 + 1;
        return days % 7;
    }

    /**
     * @returns The day of the year (1 - 366) for the specified date-only.
     */
    public get dayOfYear(): number {
        return this.day
            + [0, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365][this.month] // days per month
            + (this.month >= 3 && DateOnly.isLeapYear(this.year) ? 1 : 0);
    }

    /**
     * Adds the specified number of years to the specified date-only.
     * @param years The years to add to the specified date-only.
     * @returns a new instance of a date-only.
     */
    public addYears(years: number): DateOnly {
        return new DateOnly(this.year + years, this.month, this.day);
    }

    /**
     * Adds the specified number of months to the specified date-only.
     * @param months The months to add to the specified date-only.
     * @returns a new instance of a date-only.
     */
    public addMonths(months: number): DateOnly {
        const ms = this.year * 12 + this.month - 1 + Guard.int(months);
        const year = Math.trunc(ms / 12);
        const month = (ms % 12) + 1;
        const day = Math.min(DateOnly.daysPerMonth(year, month), this.day);
        return new DateOnly(year, month, day);
    }

    /**
     * Adds the specified number of days to the specified date-only.
     * @param days The days to add to the specified date-only.
     * @returns a new instance of a date-only.
     */
    public addDays(days: number): DateOnly {
        let day = this.#totalDays + Guard.int(days);

        // Aproximate the number of years.
        let year = Math.trunc(day / (365.2425)) + 1;
        day -= (year - 1) * 365 + DateOnly.#getLeapYears(year);

        let month = 0;
        while (month < 12) {
            const days = DateOnly.daysPerMonth(year, ++month);
            if (day < days) break;
            day -= days;
        }

        return new DateOnly(year, month, day);
    }

    /**
     * @returns the specified date-only as a date-time for dates starting at 1970-01-01.
     */
    public toDateTime(): Date {
        return new Date(this.unixEpoch);
    }

    /** 
     * @returns a string that represents the current date-only.
     */
    public toString(): string {
        return `${DateOnly.#pad(this.year, 4)}-${DateOnly.#pad(this.month)}-${DateOnly.#pad(this.day)}`;
    }

    /**
     * Returns a formatted string that represents the date.
     * @param locales A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
     * @param options An object that contains one or more properties that specify comparison options.
     * @returns formatted string.
     */
     public format(locales?: string | string[], options?: DateOnlyFormat): string {
        const date = this.toDateTime();
        return date.toLocaleDateString(locales, options);
    }

    /** 
     * @returns a JSON representation of the date-only.
     */
    public toJSON(): string {
        return this.toString();
    }

    /**
     * Creates a date from a JSON token.
     * @param {string | null | undefined} token A JSON token representing the date.
     * @returns {DateOnly} A date if valid, undefined if empty.
     */
    public static fromJSON(token: string | null | undefined): DateOnly | undefined {
        return DateOnly.parse(token);
    }

    /**
     * @returns true if other is a date representing the same value.
     */
    public equals(other: unknown): boolean {
        return (other instanceof (DateOnly)
            && this.year === other.year
            && this.month === other.month
            && this.day === other.day)
            || (other instanceof (Date)
                && this.year === other.getUTCFullYear()
                && this.month === (other.getUTCMonth() + 1)
                && this.day === other.getUTCDate());
    }

    /**
     * @param year The year to check.
     * @returns true if the year is a leap year.
     */
    public static isLeapYear(year: number): boolean {
        return !(Guard.int(year, 1, 9999) & 3 || year & 15 && !(year % 25));
    }

    /**
     * @param year The year to check.
     * @param month The month to check.
     * @returns the total days for the specified year/month.
     */
    public static daysPerMonth(year: number, month: number): number {
        Guard.int(year, 1, 9999);
        if (month === 2) {
            return DateOnly.isLeapYear(year) ? 29 : 28;
        }
        else {
            return [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Guard.int(month, 1, 12)];
        }
    }

    /**
     * Creates a date-only based on a date-time.
     * @param {Date} d The date-time to convert.
     * @returns {DateOnly} represting the (UTC) date part of the date-time.
     */
    public static fromDate(d: Date) : DateOnly {
        return new DateOnly(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
    }

    /**
     * Parses a date-only string.
     * @param {string} s A string containing date to convert.
     * @returns {DateOnly} A GUID if valid, otherwise throws.
     */
    public static parse(s: string | null | undefined): DateOnly | undefined {
        const svo = DateOnly.tryParse(s);

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
    public static tryParse(s: string | null | undefined): DateOnly | Unparsable | undefined {
        if (Svo.isEmpty(s)) {
            return undefined;
        }
        try {
            const str = s!.trim();
            const match = str.match(/^(\d{1,4})-(1[0-2]|0?\d)-(3[01]|[0-2]?\d)$/);
            if (match?.length === 4) {
                return new DateOnly(Number.parseInt(match[1]),Number.parseInt(match[2]), Number.parseInt(match[3]));
            }

            const date = new Date(Date.parse(str));
            if (Number.isFinite(date.getTime())) {
                return new DateOnly(date.getUTCFullYear(), date.getUTCMonth() +1, date.getUTCDate());
            }
        }
        catch { /* fall trough */}
        return new Unparsable("Not a valid date", s);
    }

    /**
    * @returns the total number of days from 0001-01-01.
    */
    get #totalDays(): number {
        return this.dayOfYear
            + (this.year - 1) * 365
            + DateOnly.#getLeapYears(this.year);
    }

    /**
     * @returns the total of leap years that occurred before the specified year.
     */
    static #getLeapYears(year: number) {
        const y = year - 1;
        return Math.trunc(y / 4)
            + Math.trunc(y / 400)
            - Math.trunc(y / 100);
    }

    /**
     * @remarks String.ProtoType.padStart() is not available.
     */
    static #pad(n: number, padding?: number): string {
        let s = n.toString();
        while (s.length < (padding ?? 2)) {
            s = '0' + s;
        }
        return s;
    }
}
