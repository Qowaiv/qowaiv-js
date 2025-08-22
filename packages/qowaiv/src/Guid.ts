import { Svo, Unparsable } from '.';

type GuidFormat = 'B' | 'b' | 'S' | 's' | 'l' | 'U' | 'u';

/**
 * Represents a Globally unique identifier (GUID).
 */
export class Guid implements IEquatable, IFormattable<GuidFormat>, IJsonStringifyable {

    /**
     * @constructor
     * @remarks It is the default constructor, for creating an actual GUID
     *          you will normally use Guid.newGuid() or Guid.parse(string).
     */
    private constructor(value: string) {
        this.#value = value;
    }

    /**
     * The underlying value.
     */
    readonly #value: string;

    /** 
     * Returns a string that represents the current GUID.
     */
    public toString(): string {
        return this.#value;
    }
    /** 
     * Returns a string that represents the current GUID.
     * @param {string} f the format to apply.
     * @remarks The formats:
     * B: Surrounded by { }.
     * b: Lowercased, surrounded by { }.
     * S: Stripped from its dashes.
     * s: Lowercased, stripped from its dashes.
     * l: Lowercased.
     * U: Uppercased.
     * u: Uppercased.
     */
    public format(f?: GuidFormat): string {
        switch (f) {
            case 'B': return '{' + this.#value + '}';
            case 'b': return '{' + this.#value.toLowerCase() + '}';
            case 'S': return this.#value.replace(/-/g, '');
            case 's': return this.#value.replace(/-/g, '').toLowerCase();
            case 'l': return this.#value.toLowerCase();
            case 'U': case 'u': default: return this.#value;
        }
    }
    /** 
     * @returns a JSON representation of the GUID.
     */
    public toJSON(): string {
        return this.#value;
    }

    /**
     * Returns the version of the GUID.
     */
    public get version(): number {
        return parseInt(this.#value.slice(14, 15));
    }

    /**
     * @param other the object to compare with.
     * @returns true if other a GUID representing the same value.
     */
    public equals(other: unknown): boolean {
        return other instanceof (Guid)
            && other.#value === this.#value;
    }

    /**
      * Creates a GUID from a JSON string.
      * @param {string} s A JSON string representing the GUID.
      * @returns {Guid} A GUID if valid, otherwise undefined.
      */
    public static fromJSON(s: string): Guid | undefined {
        return Guid.parse(s);
    }

    /**
     * Parses a GUID string.
     * @param {string} s A string containing GUID to convert.
     * @returns {Guid} A GUID if valid, otherwise trhows.
     */
    public static parse(s: string | null | undefined): Guid | undefined {
        const svo = Guid.tryParse(s);

        if (svo instanceof (Unparsable)) {
            throw svo;
        }
        return svo;
    }

    /**
     * Tries to parse a GUID string.
     * @param {string} s A string containing GUID to convert.
     * @returns {Guid} A GUID if valid, otherwise undefined.
     */
    public static tryParse(s: string | null | undefined): Guid | Unparsable | undefined {

        if (Svo.isEmpty(s)) return undefined;

        const u = Guid.unify(s!);

        if (u === '00000000-0000-0000-0000-000000000000') { return undefined; }

        // if the value parameter is valid
        return /^[0-9ABCDEF]{32}$/.test(u)
            ? new Guid(Guid.unstrip(u))
            : new Unparsable('Not a valid GUID', s);
    }

    private static unify(s: string): string {
        s = Svo.unify(s);
        return s.length > 2 && s.startsWith('{') && s.endsWith('}')
            ? s.slice(1, -1)
            : s;
    }

    private static unstrip(s: string): string {
        return s.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5').toUpperCase();
    }

    /**
     * Creates a GUID.
     * @param {Guid} seed An optional seed.
     * @returns {Guid} A random GUID.
     */
    public static newGuid(seed?: Guid): Guid {
        let v = Guid.unstrip(Guid.rnd());

        if (seed !== null && seed instanceof (Guid)) {
            let merged = '';
            for (let i = 0; i < 36; i++) {
                const l = '0123456789ABCDEF'.indexOf(seed.#value.charAt(i));
                const r = '0123456789ABCDEF'.indexOf(v.charAt(i));
                merged += l === -1 || r === -1 ? v.charAt(i) : '0123456789ABCDEF'.charAt(l ^ r);
            }
            v = merged;
        }
        // set version to 4 (Random).
        v = v.slice(0, 14) + '4' + v.slice(15);
        return new Guid(v);
    }

    /**
     * Creates a rnd GUID base string.
     * @remarks Uses window.crypto.getRandomValues() when availabe,
     * otherwise Math.Random().
     */
    private static rnd(): string {
        if (typeof window !== "undefined" &&
            typeof window.crypto.getRandomValues === "function") {

            const bytes = new Uint32Array(4);
            window.crypto.getRandomValues(bytes);
            return bytes[0].toString(16) +
                bytes[1].toString(16) +
                bytes[2].toString(16) +
                bytes[3].toString(16);
        }
        return Guid.rndBlock() +
            Guid.rndBlock() +
            Guid.rndBlock() +
            Guid.rndBlock();
    }

    /**
     * Creates random GUID blocks.
     * @remarks called 4 times by Guid.newGuid().
     */
    private static rndBlock(): string {
        return (Math.random().toString(16) + '000000000').substring(2, 10);
    }
}
