import { Svo, Unparsable } from '.';

type InternationalBankAccountNumberFormat = 'm' | 'M' | 'u' | 'U' | 'h' | 'H' | 'f' | 'F';

export class InternationalBankAccountNumber implements IEquatable, IFormattable<InternationalBankAccountNumberFormat>, IJsonStringifyable {
    /**
     * @constructor
     * @remarks It is the default constructor, for creating an actual IBAN
     *          you will normally use InternationalBankAccountNumber.parse(string).
     */
    private constructor(value: string) {
        this.#value= value;
    }

    /**
     * The underlying value.
     */
    readonly #value;

    /**
     * Gets the country of the IBAN.
     */
    public get country() {
        return this.#value.slice(0, 2);
    }

    /**
     * Gets the length of the IBAN.
     */
    public get length() {
        return this.#value.length;
    }

    /** 
    * Returns a string that represents the current IBAN.
    */
    public toString(): string {
        return this.#value;
    }

    /** 
    * Returns a string that represents the current IBAN.
    * @param {string} f the format to apply.
    * @remarks The formats:
    * m: as machine readable lowercase.
    * M: as machine readable.
    * u: as unformatted lowercase (equal to machine readable lowercase).
    * U: as unformatted uppercase  (equal to machine readable).
    * h: as human readable lowercase (with non-breaking spaces).
    * H: as human readable (with non-breaking spaces).
    * f: as formatted lowercase.
    * F: as formatted uppercase.
    */
    public format(f?: InternationalBankAccountNumberFormat): string {
        switch (f) {
            case 'u': case 'm': return this.#value.toLowerCase();
            case 'U': case 'M': return this.#value;
            case 'f': return this.humanReadable(' ').toLowerCase();
            case 'F': return this.humanReadable(' ');
            case 'h': return this.humanReadable(' ').toLowerCase();
            case 'H': default: return this.humanReadable(' ');
        }
    }

    private humanReadable(ch: string): string {
        return this.#value.replace(/.{4}(?!$)/g, '$&' + ch);
    }

    /**
     * @param other the object to compare with.
     * @returns true if other is an IBAN representing the same value.
     */
    public equals(other: unknown): boolean {
        return other instanceof (InternationalBankAccountNumber)
            && other.#value === this.#value;
    }

    /** 
     * Returns a JSON representation of the IBAN.
     */
    public toJSON(): string {
        return this.#value;
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
    public static parse(s: string | null | undefined): InternationalBankAccountNumber | undefined {
        const svo = InternationalBankAccountNumber.tryParse(s);

        if (svo instanceof (Unparsable)) {
            throw svo;
        }
        return svo;
    }

    /**
     * Tries to parse a IBAN string.
     * @param {string} s A string containing IBAN to convert.
     * @returns {InternationalBankAccountNumber} A IBAN if valid, otherwise undefined.
     */
    public static tryParse(s: string | null | undefined): InternationalBankAccountNumber | Unparsable | undefined {

        if (Svo.isEmpty(s)) return undefined;

        // trim '(IBAN)', 'IBAN ', and 'IBAN:'.
        let u = s!.replace(/\s*(IBAN\s+|IBAN:|\(IBAN\))\s*/i, '');
        u = Svo.unify(u);

        const pattern = InternationalBankAccountNumber.Bbans.get(u.slice(0, 2))
            ?? /^[A-Z0-9]{10,34}$/;

        return pattern.test(u.slice(2)) &&
            InternationalBankAccountNumber.mod97(u)
            ? new InternationalBankAccountNumber(u)
            : new Unparsable('Not a valid IBAN', s);
    }

    private static mod97(iban: string): boolean {
        let mod = 0;
        for (let i = 0; i < iban.length; i++) {
            const digit = iban[(i + 4) % iban.length]; // Calculate the first 4 characters (country and checksum) last
            const index = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(digit);
            mod *= index > 9 ? 100 : 10;
            mod += index;
            mod %= 97;
        }
        return mod == 1;
    }

    private static readonly Bbans = new Map<string, RegExp>([
        ['AD', /^\d{10}[A-Z0-9]{12}$/],
        ['AE', /^\d{21}$/],
        ['AL', /^\d{10}[A-Z0-9]{16}$/],
        ['AO', /^\d{23}$/],
        ['AT', /^\d{18}$/],
        ['AZ', /^\d{2}[A-Z]{4}[A-Z0-9]{20}$/],
        ['BA', /^39\d{16}$/],
        ['BE', /^\d{14}$/],
        ['BF', /^\d{2}[A-Z0-9]{2}\d{22}$/],
        ['BG', /^\d{2}[A-Z]{4}\d{6}[A-Z0-9]{8}$/],
        ['BH', /^\d{2}[A-Z]{4}[A-Z0-9]{14}$/],
        ['BI', /^\d{25}$/],
        ['BJ', /^\d{2}[A-Z0-9]{2}\d{22}$/],
        ['BR', /^\d{25}[A-Z][A-Z0-9]$/],
        ['BY', /^\d{2}[A-Z0-9]{4}\d{4}[A-Z0-9]{16}$/],
        ['CF', /^\d{25}$/],
        ['CG', /^\d{25}$/],
        ['CH', /^\d{7}[A-Z0-9]{12}$/],
        ['CI', /^\d{2}[A-Z]{2}\d{22}$/],
        ['CM', /^\d{25}$/],
        ['CR', /^\d{2}0\d{17}$/],
        ['CV', /^\d{23}$/],
        ['CY', /^\d{10}[A-Z0-9]{16}$/],
        ['CZ', /^\d{22}$/],
        ['DE', /^\d{20}$/],
        ['DJ', /^\d{25}$/],
        ['DK', /^\d{16}$/],
        ['DO', /^\d{2}[A-Z0-9]{4}\d{20}$/],
        ['DZ', /^\d{24}$/],
        ['EE', /^\d{18}$/],
        ['EG', /^\d{27}$/],
        ['ES', /^\d{22}$/],
        ['FI', /^\d{16}$/],
        ['FO', /^\d{16}$/],
        ['FR', /^\d{12}[A-Z0-9]{11}\d{2}$/],
        ['GA', /^\d{25}$/],
        ['GB', /^\d{2}[A-Z]{4}\d{14}$/],
        ['GE', /^\d{2}[A-Z]{2}\d{16}$/],
        ['GI', /^\d{2}[A-Z]{4}[A-Z0-9]{15}$/],
        ['GL', /^\d{16}$/],
        ['GQ', /^\d{25}$/],
        ['GR', /^\d{9}[A-Z0-9]{16}$/],
        ['GT', /^\d{2}[A-Z0-9]{24}$/],
        ['GW', /^\d{2}[A-Z0-9]{2}\d{19}$/],
        ['HN', /^\d{2}[A-Z]{4}\d{20}$/],
        ['HR', /^\d{19}$/],
        ['HU', /^\d{26}$/],
        ['IE', /^\d{2}[A-Z]{4}\d{14}$/],
        ['IL', /^\d{21}$/],
        ['IQ', /^\d{2}[A-Z]{4}\d{15}$/],
        ['IR', /^\d{24}$/],
        ['IS', /^\d{24}$/],
        ['IT', /^\d{2}[A-Z]\d{10}[A-Z0-9]{12}$/],
        ['JO', /^\d{2}[A-Z]{4}\d{4}[A-Z0-9]{18}$/],
        ['KM', /^\d{25}$/],
        ['KW', /^\d{2}[A-Z]{4}[A-Z0-9]{22}$/],
        ['KZ', /^\d{5}[A-Z0-9]{13}$/],
        ['LB', /^\d{6}[A-Z0-9]{20}$/],
        ['LC', /^\d{2}[A-Z]{4}[A-Z0-9]{24}$/],
        ['LI', /^\d{7}[A-Z0-9]{12}$/],
        ['LT', /^\d{18}$/],
        ['LU', /^\d{5}[A-Z0-9]{13}$/],
        ['LV', /^\d{2}[A-Z]{4}[A-Z0-9]{13}$/],
        ['LY', /^\d{23}$/],
        ['MA', /^\d{26}$/],
        ['MC', /^\d{12}[A-Z0-9]{11}\d{2}$/],
        ['MD', /^\d{2}[A-Z0-9]{20}$/],
        ['ME', /^25\d{18}$/],
        ['MG', /^\d{25}$/],
        ['MK', /^07\d{3}[A-Z0-9]{10}\d{2}$/],
        ['ML', /^\d{2}[A-Z0-9]{2}\d{22}$/],
        ['MR', /^13\d{23}$/],
        ['MT', /^\d{2}[A-Z]{4}\d{5}[A-Z0-9]{18}$/],
        ['MU', /^\d{2}[A-Z]{4}\d{16}000[A-Z]{3}$/],
        ['MZ', /^\d{23}$/],
        ['NE', /^\d{2}[A-Z]{2}\d{22}$/],
        ['NI', /^\d{2}[A-Z]{4}\d{20}$/],
        ['NL', /^\d{2}[A-Z]{4}\d{10}$/],
        ['NO', /^\d{13}$/],
        ['OM', /^\d{5}[A-Z0-9]{16}$/],
        ['PK', /^\d{2}[A-Z]{4}[A-Z0-9]{16}$/],
        ['PL', /^\d{26}$/],
        ['PS', /^\d{2}[A-Z]{4}[A-Z0-9]{21}$/],
        ['PT', /^50\d{21}$/],
        ['QA', /^\d{2}[A-Z]{4}[A-Z0-9]{21}$/],
        ['RO', /^\d{2}[A-Z]{4}[A-Z0-9]{16}$/],
        ['RS', /^35\d{18}$/],
        ['RU', /^\d{11}[A-Z0-9]{20}$/],
        ['SA', /^\d{4}[A-Z0-9]{18}$/],
        ['SC', /^\d{2}[A-Z]{4}\d{20}[A-Z]{3}$/],
        ['SD', /^\d{16}$/],
        ['SE', /^\d{22}$/],
        ['SI', /^56\d{15}$/],
        ['SK', /^\d{22}$/],
        ['SM', /^\d{2}[A-Z]\d{10}[A-Z0-9]{12}$/],
        ['SN', /^\d{2}[A-Z]{2}\d{22}$/],
        ['SO', /^\d{21}$/],
        ['ST', /^\d{23}$/],
        ['SV', /^\d{2}[A-Z]{4}\d{20}$/],
        ['TD', /^\d{25}$/],
        ['TG', /^\d{2}[A-Z]{2}\d{22}$/],
        ['TL', /^38\d{19}$/],
        ['TN', /^59\d{20}$/],
        ['TR', /^\d{7}0[A-Z0-9]{16}$/],
        ['UA', /^\d{8}[A-Z0-9]{19}$/],
        ['VA', /^\d{20}$/],
        ['VG', /^\d{2}[A-Z]{4}\d{16}$/],
        ['XK', /^\d{18}$/],
        ['YE', /^\d{2}[A-Z]{4}\d{4}[A-Z0-9]{18}$/],
    ]);
}
