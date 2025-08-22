import { Unparsable } from '.';

export class DateOnly implements IEquatable, IJsonStringifyable {

    /**
     * Creates a new date-only.
     * @param year 1 based year
     * @param month 1 based month
     * @param day  1 based day
     */
    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month - 1;
        this.day = day;
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
    public getDate(): number {
        return this.day;
    }

    /**
     * @returns the day of the week (0 – 6) for the specified date-only.
     */
    public getDayOfWeek(): number {
        const y = this.year - 1;
        const days = this.getDayOfYear()
            + y
            + ~~(y/4)
            + ~~(y/400)
            - ~~(y/100);
        return days % 7;
    }

    /**
     * @returns The day of the year (1 - 366) for the specified date-only.
     */
    public getDayOfYear(): number {
        return this.day
            + [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][this.month] // days per month
            + (this.month >= 2 && DateOnly.isLeapYear(this.year) ? 1 : 0);
    }

    /**
     * @returns the specified date-only as a date-time for dates starting at 1970-01-01.
     */
    public toDateTime(): Date | undefined {
        return this.year < 1970
            ? undefined
            : new Date(Date.UTC(this.year, this.month, this.day));
    }

    /** 
     * @returns a string that represents the current postal code.
     */
    public toString(): string {
        return `${DateOnly.#pad(this.getYear(), 4)}-${DateOnly.#pad(this.getMonth())}-${DateOnly.#pad(this.getDate())}`;
    }

    /** 
     * @returns a JSON representation of the date-only.
     */
    public toJSON(): string {
        return this.toString();
    }

    /**
     * @remarks String.ProtoType.padStart() is not available.
     */
    static #pad(n: number, padding?: number) : string{
        let s = n.toString();
        while(s.length < (padding ?? 2)){
            s = '0'+s;
        }
        return s;
    }
    /**
     * @returns true if other is a date representing the same value.
     */
    public equals(other: unknown): boolean {
        return (other instanceof(DateOnly)
            && this.year === other.year
            && this.month === other.month
            && this.day === other.day)
        || (other instanceof(Date)
            && this.year === other.getUTCFullYear()
            && this.month === other.getUTCMonth()
            && this.day === other.getUTCDate());
    }

    /**
     * @param year The year to check.
     * @returns true if the year is a leap year.
     */
    public static isLeapYear(year: number) : boolean{
        return !(year & 3 || year & 15 && !(year % 25))
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
}
