import { Guard, Unparsable } from '.';

export class DateOnly implements IEquatable, IJsonStringifyable {

    /**
     * The mimimum value of date-only (0001-01-01).
     */
    public static readonly minValue = new DateOnly(1, 1, 1);

    /**
     * The maxium value of date-only (9999-12-31).
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
        this.month = Guard.int(month, 1, 12) - 1;
        this.day = Guard.int(day, 1, DateOnly.daysPerMonth(year, month));
    }

    /**
     * The year component (1 based).
     */
    readonly year: number = 1;
    /**
     * The month component (0 based).
     */
    readonly month: number = 0;
    /**
     * The day component (1 based).
     */
    readonly day: number = 1;

    /**
     * @returns the year (4 digits for 4-digit years) fpr the specified date-only.
     */
    public getYear(): number {
        return this.year;
    }

    /**
     * @returns the month (1 – 12) for the specified date-only.
     */
    public getMonth(): number {
        return this.month + 1;
    }

    /**
     * @returns the  day of the month (1 – 31) for the specified date-only.
     */
    public getDay(): number {
        return this.day;
    }

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
            + [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365][this.month] // days per month
            + (this.month >= 2 && DateOnly.isLeapYear(this.year) ? 1 : 0);
    }

    /**
     * Adds the specified number of years to the specified date-only.
     * @param years The years to add to the specified date-only.
     * @returns a new instance of a date-only.
     */
    public addYears(years: number): DateOnly {
        // TODO: leave guaring to the ctor.
        const year = Guard.int(this.year + years, 1, 9999);
        return new DateOnly(year, this.getMonth(), this.day);
    }

    /**
     * Adds the specified number of months to the specified date-only.
     * @param months The months to add to the specified date-only.
     * @returns a new instance of a date-only.
     */
    public addMonths(months: number): DateOnly {
        const ms = this.year * 12 + this.month + Guard.int(months);
        const year = ~~(ms / 12);
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
        let year = ~~(day / (365.2425)) + 1;
        day -= (year - 1) * 365 + DateOnly.#getLeapYears(year);

        let month = 0;
        while (month < 12) {
            const days = DateOnly.daysPerMonth(year, ++month);
            if (day < days) break;
            day -= days;
        }

        // TODO: Guard should be done by ctor.
        Guard.int(day, 1, DateOnly.daysPerMonth(year, month));
        return new DateOnly(year, month, day);
    }

    /**
     * @returns the specified date-only as a date-time for dates starting at 1970-01-01.
     */
    public toDateTime(): Date {
        return new Date(this.unixEpoch);
    }

    /** 
     * @returns a string that represents the current postal code.
     */
    public toString(): string {
        return `${DateOnly.#pad(this.getYear(), 4)}-${DateOnly.#pad(this.getMonth())}-${DateOnly.#pad(this.getDay())}`;
    }

    /** 
     * @returns a JSON representation of the date-only.
     */
    public toJSON(): string {
        return this.toString();
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
                && this.month === other.getUTCMonth()
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
    public static daysPerMonth(year: number, month: number) {
        Guard.int(year, 1, 9999);
        if (month === 2) {
            return DateOnly.isLeapYear(year) ? 29 : 28;
        }
        else {
            return [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Guard.int(month, 1, 12)];
        }
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
        return new Unparsable('Not a valid date', s);
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
        return ~~(y / 4)
            + ~~(y / 400)
            - ~~(y / 100);
    }

    /**
     * @returns the total of days for the specified year.
     */
    static #getDaysPerYear(year: number): number {
        return DateOnly.isLeapYear(year) ? 366 : 365;
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
