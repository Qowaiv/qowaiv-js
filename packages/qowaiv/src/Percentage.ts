import { Unparsable } from '.';

/**
 * Represents a percentage.
 */
export class Percentage implements IEquatable, ILocalizable<PercentageFormatOptions>, IJsonStringifyable {

    /**
     * Represents 0 percent.
     */
    public static readonly Zero = new Percentage(0);

    /**
     * Represents 1 percent.
     */
    public static readonly One = new Percentage(0.01);

    /**
     * Represents 100 percent.
     */
    public static readonly Hundred = new Percentage(1);

    /**
     * @constructor
     * @remarks It is the default constructor, for creating an actual
     *          Percentage use Percentage.parse(string).
     */
    private constructor(value: number) {
        this.#value = value;
    }

    /**
     * The underlying value.
     */
    readonly #value: number;

    /**
     *Gets the sign of the percentage.
     */
    public sign(): number {
        return Math.sign(this.#value);
    }

    /**
     *Gets the absolute value of the percentage.
     */
    public abs(): Percentage {
        return new Percentage(Math.abs(this.#value));
    }

    /**
     * Rounds the percentage to the specified number of digits.
     * @param d the numbers of digits to round to
     * @returns a rounded percentage.
     */
    public round(d?: number): Percentage {

        const f = Math.pow(10, (d ?? 0) + 2);
        const val = Math.round(this.#value / f) * f;
        return new Percentage(val);
    }

    /** 
     * Returns a string that represents the current percentage.
     */
    public toString(): string {
        return this.format();
    }

    /** 
     *  Returns a formatted string that represents the current percentage.
     */
    public format(locales?: string | string[], options?: PercentageFormatOptions): string {

        const symbol = options?.symbol ?? Percentage.#PercentSymbol;
        const f = Percentage.#Factors.get(symbol) ?? Percentage.#Factor;
        const value = this.#value / f;

        return `${value.toLocaleString(locales, options)}${symbol}`;
    }

    /** 
     * @returns a JSON representation of the percentage.
     */
    public toJSON(): string {
        return this.toString();
    }

    /**
     * @returns true if other is a percentage representing the same value.
     */
    public equals(other: unknown): boolean {
        return other instanceof (Percentage)
            && other.#value === this.#value;
    }

    /**
     * Creates a percentage from a JSON string.
     * @param {string} s A JSON string representing the percentage.
     * @returns {Percentage} A percentage if valid, otherwise undefined.
     */
    public static fromJSON(s: string | null | undefined): Percentage {
        return Percentage.parse(s);
    }

    /**
     * Creates a percentage (3.14 => 3.14%).
     * @param n the number
     * @returns a percentage
     */
    public static new(n: number): Percentage {
        if (Number.isFinite(n)) {
            return new Percentage(n * Percentage.#Factor);
        }
        throw new Error(`'${n}' can not represent a percentage`);
    }

    /**
     * Parses a percentage string.
     * @param {string} s A string containing percentage to convert.
     * @returns {Percentage} A percentage if valid, otherwise throws.
     */
    public static parse(s: string | null | undefined): Percentage {
        const svo = Percentage.tryParse(s);

        if (svo instanceof (Unparsable)) {
            throw svo;
        }
        return svo;
    }

    /**
     * Tries to parse a percentage string.
     * @param {string} s A string containing percentage to convert.
     * @returns {Percentage} A percentage if valid, otherwise undefined.
     */
    public static tryParse(s: string | null | undefined): Percentage | Unparsable {

        if (typeof s === 'string') {
            let factor = 0.01;

            for (const [sym, fac] of Percentage.#Factors) {
                if (s.endsWith(sym)) {
                    factor = fac;
                    s = s?.slice(0, -1);
                    break;
                }
                if (s.startsWith(sym)) {
                    factor = fac;
                    s = s?.slice(1);
                    break;
                }
            }

            const n = parseFloat(s.trim()) * factor;

            if (isFinite(n)) {
                return new Percentage(n)
            }
        }
        return new Unparsable('Not a valid percentage', s);
    }

    /**
      * The percentage symbol (%).
      */
    static readonly #PercentSymbol = '%';

    /**
      * The per mille symbol (‰).
      */
    static readonly #PerMilleSymbol = '‰';

    /**
      * The per ten thousand symbol (0/000).
      */
    static readonly #PerTenThousandSymbol = '‱';

    static readonly #Factor = 0.01;

    static readonly #Factors = new Map<string, number>([
        [Percentage.#PercentSymbol, 0.01],
        [Percentage.#PerMilleSymbol, 0.001],
        [Percentage.#PerTenThousandSymbol, 0.0001],
    ]);
}
