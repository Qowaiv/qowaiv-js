import { Unparsable } from '../src';

/**
 * Represents a Globally unique identifier (GUID).
 */
export class Guid implements IEquatable, IFormattable, IJsonStringifyable {

    /**
     * @constructor
     * @remarks It is the default constructor, for creating an actual GUID
     *          you will normally use Guid.newGuid() or Guid.parse(string).
     */
    private constructor() { }

    /**
     * The underlying value.
     */
    private v = '00000000-0000-0000-0000-000000000000';

    /** 
     * Returns a string that represents the current GUID.
     */
    public toString(): string {
        return this.v;
    }
    /** 
     * Returns a string that represents the current GUID.
     */
    public format(f?: string): string {
        switch (f) {
            case 'B': return '{' + this.v + '}';
            case 'b': return '{' + this.v.toLowerCase() + '}';
            case 'S': return this.v.replace(/-/g, '');
            case 's': return this.v.replace(/-/g, '').toLowerCase();
            case 'l': return this.v.toLowerCase();
            case 'U': case 'u': default: return this.v;
        }
    }
    /** 
     * Returns a JSON representation of the GUID.
     */
    public toJSON(): string {
        return this.v;
    }

    /**
     * Returns the version of the GUID.
     */
    public version(): number {
        return parseInt(this.v.substr(14, 1));
    }

    /**
     * Returns true if other is not null or undefined and a GUID
     * representing the same value, otherwise false.
     */
    public equals(other: any): boolean {
        return other !== null &&
            other !== undefined &&
            other instanceof (Guid) &&
            other.v === this.v;
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
	public static parse(s: string): Guid {
		const guid = Guid.tryParse(s);

		if (guid === undefined) {
			throw new Unparsable('Not a valid GUID', s);
		}
		return guid;
	}

	/**
	 * Tries to parse a GUID string.
	 * @param {string} s A string containing GUID to convert.
	 * @returns {Guid} A GUID if valid, otherwise undefined.
	 */
	public static tryParse(s: string): Guid | undefined {

		// an empty string should equal Guid.Empty.
		if (s === '' || s === null) { return Guid.empty(); }

		s = Guid.unify(s);

		// if the value parameter is valid
		if (/^[0-9A-F]{32}$/.test(s)) {
			const guid = new Guid();
			guid.v = Guid.unstrip(s);
			return guid;
		}
		// return undefined if creation failed.
		return undefined;
	}


    private static unify(s: string): string {
        s = s.replace(/-/g, '').trim().toUpperCase();
        return s.length > 2 && s[0] == '{' && s[s.length -1] == '}'
            ? s.substring(1, s.length -2)
            : s;
    }
    private static unstrip(s: string): string {
        return s.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5').toUpperCase();
    }

    /**
     * Returns a new empty GUID.
     */
    public static empty(): Guid {
        return new Guid();
    }

    /**
     * Creates a GUID.
     * @param {Guid} seed An optional seed.
     * @returns {Guid} A random GUID.
     */
    public static newGuid(seed?: Guid): Guid {

        const guid = new Guid();
        guid.v = Guid.unstrip(Guid.rnd());

        if (seed !== null && seed instanceof (Guid)) {
            let merged = '';
            for (let i = 0; i < 36; i++) {
                const l = '0123456789ABCDEF'.indexOf(seed.v.charAt(i));
                const r = '0123456789ABCDEF'.indexOf(guid.v.charAt(i));
                merged += l === -1 || r === -1 ? guid.v.charAt(i) : '0123456789ABCDEF'.charAt(l ^ r);
            }
            guid.v = merged;
        }
        // set version to 4 (Random).
        guid.v = guid.v.substring(0, 14) + '4' + guid.v.substring(15);
        return guid;
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
        return Guid.rndGuid() +
            Guid.rndGuid() +
            Guid.rndGuid() +
            Guid.rndGuid();
    }

    /**
     * Creates random GUID blocks.
     * @remarks called 4 times by Guid.newGuid().
     */
    private static rndGuid(): string {
        return (Math.random().toString(16) + '000000000').substr(2, 8);
    }
}
