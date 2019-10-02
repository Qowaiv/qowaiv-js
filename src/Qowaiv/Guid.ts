module Qowaiv {

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
          * @returns {Guid} A GUID if valid, otherwise null.
          */
        public static fromJSON(s: string): Guid {
            return Guid.parse(s);
        }

        /**
         * Returns true if the val represents valid GUID, otherwise false.
         * @param {string} s A string containing GUID.
         * @remarks This method calls create(). It's of no use, to call isValid(),
         *          to avoid a create() call.
         */
        public static isValid(s: string): boolean {
            return /^[0-9ABCDEF]{32}$/i.test(Guid.strip(s));
        }

        /**
         * Creates a GUID.
         * @param {string} s A string containing GUID to convert or a number.
         * @returns {Guid} A GUID if valid, otherwise null.
         */
        public static parse(s: string): Guid {

            // an empty string should equal Guid.Empty.
            if (s === '') { return new Guid(); }

            s = Guid.strip(s).toUpperCase();

            // if the value parameter is valid
            if (Guid.isValid(s)) {
                let guid = new Guid();
                guid.v = Guid.unstrip(s);
                return guid;
            }
            // return undefined if creation failed.
            return undefined;
        }

        private static strip(s: string): string {
            let replace = s.replace(/-/g, '');
            if (replace.indexOf('{') == 0 && replace.lastIndexOf('}') == replace.length - 1) {
                return replace.substr(1, replace.length - 2);
            }
            return replace;
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
         * @param {Guid} An optional seed.
         * @returns {Guid} A random GUID.
         */
        public static newGuid(seed?: Guid): Guid {

            let guid = new Guid();
            guid.v = Guid.unstrip(Guid.rnd());

            if (seed !== null && seed instanceof (Guid)) {
                let lookup = '0123456789ABCDEF';
                var merged = '';
                for (var i = 0; i < 36; i++) {
                    let l = lookup.indexOf(seed.v.charAt(i));
                    let r = lookup.indexOf(guid.v.charAt(i));
                    merged += l === -1 || r === -1 ? guid.v.charAt(i) : lookup.charAt(l ^ r);
                }
                guid.v = merged;
            }
            // set version to 4 (Random).
            guid.v = guid.v.substr(0, 14) + '4' + guid.v.substr(15);

            return guid;
        }

        /**
         * Creates a rnd GUID base string.
         * @remarks Uses window.crypto.getRandomValues() when availabe,
         * otherwise Math.Random().
         */
        private static rnd(): string {
            if (typeof window.crypto.getRandomValues === "function") {
                let bytes = new Uint32Array(4);
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
} 
