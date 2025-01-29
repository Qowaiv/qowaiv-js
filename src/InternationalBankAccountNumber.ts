import { Unparsable } from '../src';

export class InternationalBankAccountNumber implements IEquatable, IFormattable, IJsonStringifyable {
    /**
     * @constructor
     * @remarks It is the default constructor, for creating an actual IBAN
     *          you will normally use InternationalBankAccountNumber.parse(string).
     */
    private constructor() { }

    /**
     * The underlying value.
     */
    private v = '';

    /** 
    * Returns a string that represents the current IBAN.
    */
    public toString(): string {
        return this.v;
    }

    /** 
    * Returns a string that represents the current IBAN.
    */
    public format(f: string): string {
        // TODO: use right implementation
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
     * Returns true if other is an IBAN
     * representing the same value, otherwise false.
     */
    public equals(other: any): boolean {
        return other instanceof (InternationalBankAccountNumber)
            && other.v === this.v;
    }

    /** 
     * Returns a JSON representation of the IBAN.
     */
    public toJSON(): string {
        return this.v;
    }

    /**
    * Returns a new empty IBAN.
    */
    public static empty(): InternationalBankAccountNumber {
        return new InternationalBankAccountNumber();
    }

    /**
         * Creates a IBAN from a JSON string.
         * @param {string} s A JSON string representing the IBAN.
         * @returns {InternationalBankAccountNumber} A IBAN if valid, otherwise undefined.
         */
    public static fromJSON(s: string): InternationalBankAccountNumber | undefined {
        return InternationalBankAccountNumber.parse(s);
    }

    /**
     * Parses a IBAN string.
     * @param {string} s A string containing IBAN to convert.
     * @returns {InternationalBankAccountNumber} IBAN if valid, otherwise throws.
     */
    public static parse(s: string): InternationalBankAccountNumber {
        const svo = InternationalBankAccountNumber.tryParse(s);

        if (svo === undefined) {
            throw new Unparsable('Not a valid IBAN', s);
        }
        return svo;
    }

    /**
     * Tries to parse a IBAN string.
     * @param {string} s A string containing IBAN to convert.
     * @returns {InternationalBankAccountNumber} A IBAN if valid, otherwise undefined.
     */
    public static tryParse(s: string): InternationalBankAccountNumber | undefined {

        // an empty string should equal IBAN.Empty.
        if (s === '' || s === null) { return InternationalBankAccountNumber.empty(); }

        s = InternationalBankAccountNumber.strip(s);

        const pattern = InternationalBankAccountNumber.Bbans.get(s.substring(0, 2))
            ?? /^[A-Z0-9]{10,34}$/;

        if (pattern.test(s.substring(2)) &&
            InternationalBankAccountNumber.Mod97(s)) {
            let iban = new InternationalBankAccountNumber();
            iban.v = s;
            return iban;
        }
        return undefined;
    }

    private static Mod97(iban: string): boolean {
        let mod = 0;
        for (var i = 0; i < iban.length; i++) {
            var digit = iban[(i + 4) % iban.length]; // Calculate the first 4 characters (country and checksum) last
            var index = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(digit);
            mod *= index > 9 ? 100 : 10;
            mod += index;
            mod %= 97;
        }
        return mod == 1;
    }

    private static strip(s: string): string {
        return s.replace(/[_\-  \.]/g, '');
    }

    private static Bbans = new Map<string, RegExp>([
        ['AD', /^[0-9][0-9][0-9]{8}[A-Z0-9]{12}$/],
        ['AE', /^[0-9][0-9][0-9]{3}[0-9]{16}$/],
        ['AL', /^[0-9][0-9][0-9]{8}[A-Z0-9]{16}$/],
        ['AO', /^[0-9][0-9][0-9]{21}$/],
        ['AT', /^[0-9][0-9][0-9]{16}$/],
        ['AZ', /^[0-9][0-9][A-Z]{4}[A-Z0-9]{20}$/],
        ['BA', /^39[0-9]{16}$/],
        ['BE', /^[0-9][0-9][0-9]{12}$/],
        ['BF', /^[0-9][0-9][A-Z0-9]{2}[0-9]{22}$/],
        ['BG', /^[0-9][0-9][A-Z]{4}[0-9]{6}[A-Z0-9]{8}$/],
        ['BH', /^[0-9][0-9][A-Z]{4}[A-Z0-9]{14}$/],
        ['BI', /^[0-9][0-9][0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}$/],
        ['BJ', /^[0-9][0-9][A-Z0-9]{2}[0-9]{22}$/],
        ['BR', /^[0-9][0-9][0-9]{23}[A-Z]{1}[A-Z0-9]{1}$/],
        ['BY', /^[0-9][0-9][A-Z0-9]{4}[0-9]{4}[A-Z0-9]{16}$/],
        ['CF', /^[0-9][0-9][0-9]{23}$/],
        ['CG', /^[0-9][0-9][0-9]{23}$/],
        ['CH', /^[0-9][0-9][0-9]{5}[A-Z0-9]{12}$/],
        ['CI', /^[0-9][0-9][A-Z]{2}[0-9]{22}$/],
        ['CM', /^[0-9][0-9][0-9]{23}$/],
        ['CR', /^[0-9][0-9]0[0-9]{17}$/],
        ['CV', /^[0-9][0-9][0-9]{21}$/],
        ['CY', /^[0-9][0-9][0-9]{8}[A-Z0-9]{16}$/],
        ['CZ', /^[0-9][0-9][0-9]{20}$/],
        ['DE', /^[0-9][0-9][0-9]{18}$/],
        ['DJ', /^[0-9][0-9][0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}$/],
        ['DK', /^[0-9][0-9][0-9]{14}$/],
        ['DO', /^[0-9][0-9][A-Z0-9]{4}[0-9]{20}$/],
        ['DZ', /^[0-9][0-9][0-9]{22}$/],
        ['EE', /^[0-9][0-9][0-9]{16}$/],
        ['EG', /^[0-9][0-9][0-9]{25}$/],
        ['ES', /^[0-9][0-9][0-9]{20}$/],
        ['FI', /^[0-9][0-9][0-9]{14}$/],
        ['FO', /^[0-9][0-9][0-9]{14}$/],
        ['FR', /^[0-9][0-9][0-9]{10}[A-Z0-9]{11}[0-9]{2}$/],
        ['GA', /^[0-9][0-9][0-9]{23}$/],
        ['GB', /^[0-9][0-9][A-Z]{4}[0-9]{14}$/],
        ['GE', /^[0-9][0-9][A-Z]{2}[0-9]{16}$/],
        ['GI', /^[0-9][0-9][A-Z]{4}[A-Z0-9]{15}$/],
        ['GL', /^[0-9][0-9][0-9]{14}$/],
        ['GQ', /^[0-9][0-9][0-9]{23}$/],
        ['GR', /^[0-9][0-9][0-9]{7}[A-Z0-9]{16}$/],
        ['GT', /^[0-9][0-9][A-Z0-9]{4}[A-Z0-9]{20}$/],
        ['GW', /^[0-9][0-9][A-Z0-9]{2}[0-9]{19}$/],
        ['HN', /^[0-9][0-9][A-Z]{4}[0-9]{20}$/],
        ['HR', /^[0-9][0-9][0-9]{17}$/],
        ['HU', /^[0-9][0-9][0-9]{24}$/],
        ['IE', /^[0-9][0-9][A-Z]{4}[0-9]{14}$/],
        ['IL', /^[0-9][0-9][0-9]{19}$/],
        ['IQ', /^[0-9][0-9][A-Z]{4}[0-9]{15}$/],
        ['IR', /^[0-9][0-9]0[0-9]{2}0[0-9]{18}$/],
        ['IS', /^[0-9][0-9][0-9]{22}$/],
        ['IT', /^[0-9][0-9][A-Z]{1}[0-9]{10}[A-Z0-9]{12}$/],
        ['JO', /^[0-9][0-9][A-Z]{4}[0-9]{4}[A-Z0-9]{18}$/],
        ['KM', /^[0-9][0-9][0-9]{23}$/],
        ['KW', /^[0-9][0-9][A-Z]{4}[A-Z0-9]{22}$/],
        ['KZ', /^[0-9][0-9][0-9]{3}[A-Z0-9]{13}$/],
        ['LB', /^[0-9][0-9][0-9]{4}[A-Z0-9]{20}$/],
        ['LC', /^[0-9][0-9][A-Z]{4}[A-Z0-9]{24}$/],
        ['LI', /^[0-9][0-9][0-9]{5}[A-Z0-9]{12}$/],
        ['LT', /^[0-9][0-9][0-9]{16}$/],
        ['LU', /^[0-9][0-9][0-9]{3}[A-Z0-9]{13}$/],
        ['LV', /^[0-9][0-9][A-Z]{4}[A-Z0-9]{13}$/],
        ['LY', /^[0-9][0-9][0-9]{21}$/],
        ['MA', /^[0-9][0-9][0-9]{24}$/],
        ['MC', /^[0-9][0-9][0-9]{10}[A-Z0-9]{11}[0-9]{2}$/],
        ['MD', /^[0-9][0-9][A-Z0-9]{2}[A-Z0-9]{18}$/],
        ['ME', /^25[0-9]{18}$/],
        ['MG', /^[0-9][0-9][0-9]{23}$/],
        ['MK', /^07[0-9]{3}[A-Z0-9]{10}[0-9]{2}$/],
        ['ML', /^[0-9][0-9][A-Z0-9]{2}[0-9]{22}$/],
        ['MR', /^13[0-9]{23}$/],
        ['MT', /^[0-9][0-9][A-Z]{4}[0-9]{5}[A-Z0-9]{18}$/],
        ['MU', /^[0-9][0-9][A-Z]{4}[0-9]{16}000[A-Z]{3}$/],
        ['MZ', /^[0-9][0-9][0-9]{21}$/],
        ['NE', /^[0-9][0-9][A-Z]{2}[0-9]{22}$/],
        ['NI', /^[0-9][0-9][A-Z]{4}[0-9]{20}$/],
        ['NL', /^[0-9][0-9][A-Z]{4}[0-9]{10}$/],
        ['NO', /^[0-9][0-9][0-9]{11}$/],
        ['PK', /^[0-9][0-9][A-Z]{4}[A-Z0-9]{16}$/],
        ['PL', /^[0-9][0-9][0-9]{24}$/],
        ['PS', /^[0-9][0-9][A-Z]{4}[A-Z0-9]{21}$/],
        ['PT', /^50[0-9]{21}$/],
        ['QA', /^[0-9][0-9][A-Z]{4}[A-Z0-9]{21}$/],
        ['RO', /^[0-9][0-9][A-Z]{4}[A-Z0-9]{16}$/],
        ['RS', /^35[0-9]{18}$/],
        ['RU', /^[0-9][0-9][0-9]{14}[A-Z0-9]{15}$/],
        ['SA', /^[0-9][0-9][0-9]{2}[A-Z0-9]{18}$/],
        ['SC', /^[0-9][0-9][A-Z]{4}[0-9]{20}[A-Z]{3}$/],
        ['SD', /^[0-9][0-9][0-9]{14}$/],
        ['SE', /^[0-9][0-9][0-9]{20}$/],
        ['SI', /^56[0-9]{15}$/],
        ['SK', /^[0-9][0-9][0-9]{20}$/],
        ['SM', /^[0-9][0-9][A-Z]{1}[0-9]{10}[A-Z0-9]{12}$/],
        ['SN', /^[0-9][0-9][A-Z]{2}[0-9]{22}$/],
        ['ST', /^[0-9][0-9][0-9]{21}$/],
        ['SV', /^[0-9][0-9][A-Z]{4}[0-9]{20}$/],
        ['TD', /^[0-9][0-9][0-9]{23}$/],
        ['TG', /^[0-9][0-9][A-Z]{2}[0-9]{22}$/],
        ['TL', /^38[0-9]{19}$/],
        ['TN', /^59[0-9]{20}$/],
        ['TR', /^[0-9][0-9][0-9]{5}0[A-Z0-9]{16}$/],
        ['UA', /^[0-9][0-9][0-9]{6}[A-Z0-9]{19}$/],
        ['VA', /^[0-9][0-9][0-9]{3}[0-9]{15}$/],
        ['VG', /^[0-9][0-9][A-Z]{4}[0-9]{16}$/],
        ['XK', /^[0-9][0-9][0-9]{4}[0-9]{10}[0-9]{2}$/],
    ]);
}
