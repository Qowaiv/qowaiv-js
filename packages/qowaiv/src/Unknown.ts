/**
 * Represents a Globally unique identifier (GUID).
 */
export class Unknown implements Equatable, Formattable<any>, JsonStringifyable {

    public static readonly instance = new Unknown();

    /**
     * @constructor
     * @remarks It is the default constructor, for creating an actual GUID
     *          you will normally use Guid.newGuid() or Guid.parse(string).
     */
    private constructor() {
    }

    /** 
     * Returns a string that represents the current GUID.
     */
    public toString(): string {
        return '?';
    }
    /** 
     * Returns a string that represents unknown.
     * @param {string} f the format to apply.
     */
    public format(f?: any): string {
        return '?';
    }
    /** 
     * @returns a JSON representation of unknown.
     */
    public toJSON(): string {
        return '?';
    }

    /**
     * @param other the object to compare with.
     * @returns true if other is a GUID representing the same value.
     */
    public equals(other: unknown): boolean {
        return other instanceof (Unknown);
    }

    /**
      * Creates unknown from a JSON token.
      * @param {any} token A JSON token representing unknown.
      * @returns {Unknown | undefined} An unknown if valid, undefined if empty.
      */
    public static fromJSON(token: any): Unknown | undefined {
        return token === '?'
            ? Unknown.instance
            : undefined;
    }

    /**
     * Tries to parse an unknown string.
     * @param {string} s A string containing an unknown to convert.
     * @returns {Guid} An unknown if valid, otherwise undefined.
     */
    public static tryParse(s: string | null | undefined): Unknown | undefined {
        return s === '?'
            ? Unknown.instance
            : undefined;
    }
}
