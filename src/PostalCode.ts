import { Svo, Unparsable } from '../src';

class PostalCodeInfo {
    public constructor(pattern: RegExp, search?: RegExp | undefined, replace?: string | undefined) {
        this.pattern = pattern;
        this.search = search;
        this.replace = replace;
    }

    private readonly pattern: RegExp;
    private readonly search: RegExp | undefined;
    private readonly replace: string | undefined;

    public isValid(code: string): boolean {
        return this.pattern.test(code);
    }

    public format(code: string) {
        return this.search === undefined || this.replace === undefined
            ? code
            : code.replace(this.search, this.replace);
    }
}

/**
 * Represents a postal code.
 */
export class PostalCode implements IEquatable, IFormattable, IJsonStringifyable {

    /**
    * @constructor
    * @remarks It is the default constructor, for creating an actual
    *          PostalCode use PostalCode.parse(string).
    */
    private constructor(value: string) {
        this.value = value;
    }

    /**
     * The underlying value.
     */
    private readonly value: string;

    /**
     * Gets the length of the postal code.
     */
    public get length() {
        return this.value.length;
    }

    /** 
     * Returns a string that represents the current postal code.
     */
    toString(): string {
        return this.value;
    }

    /** 
     * Returns a string that represents the current postal code.
     */
    format(f: string): string {
        const info = PostalCode.Infos.get(f);

        return info?.isValid(this.value)
            ? info.format(this.value)
            : this.value;
    }

    /** 
     * Returns a JSON representation of the postal code.
     */
    public toJSON(): string {
        return this.value;
    }

    /**
     * Returns true if other is not null or undefined and a PostalCode
     * representing the same value, otherwise false.
     */
    public equals(other: unknown): boolean {
        return other instanceof (PostalCode)
            && other.value === this.value;
    }

    /**
     * Returns true if the postal code is valid for the specified country, otherwise false.
     * @param {string} country The country to validate for.
     * @remarks Returns false if the country does not have postal codes, unless the postal code is empty.
     */
    public isValid(country: string): boolean {
        const info = PostalCode.Infos.get(country);
        return info?.isValid(this.value) === true;
    }

    /**
     * Creates a postal code from a JSON string.
     * @param {string} s A JSON string representing the postal code.
     * @returns {PostalCode} A postal code if valid, otherwise undefined.
     */
    public static fromJSON(s: string): PostalCode | null {
        return PostalCode.parse(s);
    }

    /**
     * Parses a postal code string.
     * @param {string} s A string containing postal code to convert.
     * @returns {PostalCode} A postal code if valid, otherwise trhows.
     */
    public static parse(s: string | null | undefined): PostalCode | null {
        const svo = PostalCode.tryParse(s);

        if (svo === undefined) {
            throw new Unparsable('Not a valid postal code', s);
        }
        return svo;
    }

    /**
     * Tries to parse a postal code string.
     * @param {string} s A string containing postal code to convert.
     * @returns {PostalCode} A postal code if valid, otherwise undefined.
     */
    public static tryParse(s: string | null | undefined): PostalCode | null | undefined {

        if (Svo.isEmpty(s)) { return null; }

        s = Svo.unify(s!);
        return s.length >= 2 && s.length <= 10
            ? new PostalCode(s)
            : undefined;
    }

    private static readonly Infos = new Map<string, PostalCodeInfo>([
        ['AD', new PostalCodeInfo(/^(AD)?[1-7]\d{2}$/, /^(AD)?(...)$/, 'AD-$2')],
        ['AF', new PostalCodeInfo(/^(0[1-9]|[1-3]\d|4[0-3])(\d{2})(?<!00)$/)],
        ['AI', new PostalCodeInfo(/^(AI)?2640$/, /^.+$/, 'AI-2640')],
        ['AL', new PostalCodeInfo(/^[1-9]\d{3}$/)],
        ['AM', new PostalCodeInfo(/^[0-4]\d{3}$/)],
        ['AR', new PostalCodeInfo(/^[A-Z][1-9]\d{3}[A-Z]{3}$/, /^(.)(....)(...)$/, '$1 $2 $3')],
        ['AS', new PostalCodeInfo(/^9\d{4}(\d{4})?$/, /^(.{5})(....)?$/, '$1 $2')],
        ['AT', new PostalCodeInfo(/^[1-9]\d{3}$/)],
        ['AU', new PostalCodeInfo(/^(0[89]|[1-9]\d)\d{2}$/)],
        ['AX', new PostalCodeInfo(/^22\d{3}$/, /^(..)(...)$/, '$1-$2')],
        ['AZ', new PostalCodeInfo(/^(AZ)?\d{4}$/, /^(AZ)?(....)$/, 'AZ-$2')],
        ['BA', new PostalCodeInfo(/^\d{5}$/)],
        ['BB', new PostalCodeInfo(/^(BB)?\d{5}$/, /^(BB)?(.{5})$/, 'BB-$2')],
        ['BD', new PostalCodeInfo(/^\d{4}$/)],
        ['BE', new PostalCodeInfo(/^[1-9]\d{3}$/)],
        ['BG', new PostalCodeInfo(/^[1-9]\d{3}$/)],
        ['BH', new PostalCodeInfo(/^(1[0-2]|[1-9])\d{2}$/)],
        ['BL', new PostalCodeInfo(/^977\d{2}$/)],
        ['BM', new PostalCodeInfo(/^[A-Z]{2}([A-Z0-9]{2})?$/, /^(..)(..)$/, '$1 $2')],
        ['BN', new PostalCodeInfo(/^[A-Z]{2}\d{4}$/)],
        ['BO', new PostalCodeInfo(/^\d{4}$/)],
        ['BR', new PostalCodeInfo(/^(\d{2})(?<!00)\d{6}$/, /^(.{5})(...)$/, '$1-$2')],
        ['BT', new PostalCodeInfo(/^\d{3}$/)],
        ['BY', new PostalCodeInfo(/^\d{6}$/)],
        ['CA', new PostalCodeInfo(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]\d[ABCEGHJKLMNPRSTVWXYZ]\d$/, /^(...)(...)$/, '$1 $2')],
        ['CC', new PostalCodeInfo(/^\d{4}$/)],
        ['CH', new PostalCodeInfo(/^[1-9]\d{3}$/)],
        ['CL', new PostalCodeInfo(/^\d{7}$/, /^(...)(....)$/, '$1-$2')],
        ['CN', new PostalCodeInfo(/^(\d{2})(?<!00)\d{4}$/)],
        ['CO', new PostalCodeInfo(/^\d{6}$/)],
        ['CR', new PostalCodeInfo(/^\d{5}$/)],
        ['CU', new PostalCodeInfo(/^(CP)?\d{5}$/, /^(..)?(.{5})$/, 'CP$2')],
        ['CV', new PostalCodeInfo(/^\d{4}$/)],
        ['CX', new PostalCodeInfo(/^\d{4}$/)],
        ['CY', new PostalCodeInfo(/^[1-9]\d{3}$/)],
        ['CZ', new PostalCodeInfo(/^[1-7]\d{4}$/, /^(...)(..)$/, '$1 $2')],
        ['DE', new PostalCodeInfo(/^(\d{2})(?<!00)\d{3}$/)],
        ['DK', new PostalCodeInfo(/^(DK)?[1-9]\d{3}$/, /^(DK)?(....)$/, 'DK-$2')],
        ['DZ', new PostalCodeInfo(/^\d{5}$/)],
        ['EC', new PostalCodeInfo(/^\d{6}$/)],
        ['EE', new PostalCodeInfo(/^\d{5}$/)],
        ['EG', new PostalCodeInfo(/^[1-9]\d{4}$/)],
        ['ES', new PostalCodeInfo(/^((0[1-9])|([1-4]\d)|(5[012]))\d{3}$/)],
        ['ET', new PostalCodeInfo(/^\d{4}$/)],
        ['FI', new PostalCodeInfo(/^\d{5}$/, /^(..)(...)$/, '$1-$2')],
        ['FK', new PostalCodeInfo(/^FIQQ1ZZ$/, /^.+$/, 'FIQQ 1ZZ')],
        ['FM', new PostalCodeInfo(/^9694[1234](\d{4})?$/, /^(.{5})(....)$/, '$1-$2')],
        ['FO', new PostalCodeInfo(/^(FO)?[1-9]\d{2}$/, /^(FO)?(...)$/, 'FO-$2')],
        ['FR', new PostalCodeInfo(/^(\d{2})(?<!00)\d{3}$/)],
        ['GA', new PostalCodeInfo(/^\d{4}$/, /^(..)(..)$/, '$1 $2')],
        ['GB', new PostalCodeInfo(/^[A-Z]?[A-Z]\d[A-Z0-9]?\d[A-Z]{2}$/, /^(.+)(...)$/, '$1 $2')],
        ['GE', new PostalCodeInfo(/^\d{4}$/)],
        ['GF', new PostalCodeInfo(/^973\d{2}$/)],
        ['GG', new PostalCodeInfo(/^(GY)?\d{2,3}[A-Z]{2}$/, /^(GY)?(...?)(...)$/, 'GY$2 $3')],
        ['GI', new PostalCodeInfo(/^GX111AA$/, /^.+$/, 'GX11 1AA')],
        ['GL', new PostalCodeInfo(/^(GL)?39\d{2}$/, /^(GL)?(....)$/, 'GL-$2')],
        ['GP', new PostalCodeInfo(/^971\d{2}$/)],
        ['GR', new PostalCodeInfo(/^[1-9]\d{4}$/, /^(...)(..)$/, '$1 $2')],
        ['GS', new PostalCodeInfo(/^SIQQ1ZZ$/, /^.+$/, 'SIQQ 1ZZ')],
        ['GT', new PostalCodeInfo(/^\d{5}$/)],
        ['GU', new PostalCodeInfo(/^969([12]\d|3[0-3])(\d{4})?$/, /^(.{5})(....)$/, '$1-$2')],
        ['GW', new PostalCodeInfo(/^\d{4}$/)],
        ['HM', new PostalCodeInfo(/^\d{4}$/)],
        ['HN', new PostalCodeInfo(/^\d{5}$/)],
        ['HR', new PostalCodeInfo(/^\d{5}$/)],
        ['HT', new PostalCodeInfo(/^\d{4}$/)],
        ['HU', new PostalCodeInfo(/^[1-9]\d{3}$/)],
        ['ID', new PostalCodeInfo(/^[1-9]\d{4}$/)],
        ['IL', new PostalCodeInfo(/^\d{7}$/)],
        ['IM', new PostalCodeInfo(/^(IM)?\d{2,3}[A-Z]{2}$/, /^(IM)?(..?)(...)$/, 'IM$2 $3')],
        ['IN', new PostalCodeInfo(/^[1-9]\d{5}$/)],
        ['IO', new PostalCodeInfo(/^BBND1ZZ$/, /^.+$/, 'BBND 1ZZ')],
        ['IQ', new PostalCodeInfo(/^[13456]\d{4}$/)],
        ['IR', new PostalCodeInfo(/^\d{10}$/, /^(.{5})(.{5})$/, '$1-$2')],
        ['IS', new PostalCodeInfo(/^\d{3}$/)],
        ['IT', new PostalCodeInfo(/^(\d{3})(?<!000)\d{2}$/)],
        ['JE', new PostalCodeInfo(/^(JE)?\d{2,3}[A-Z]{2}$/, /^(JE)?(...?)(...)$/, 'JE$2 $3')],
        ['JO', new PostalCodeInfo(/^\d{5}$/)],
        ['JP', new PostalCodeInfo(/^\d{7}$/, /^(....)(...)$/, '$1-$2')],
        ['KG', new PostalCodeInfo(/^\d{6}$/)],
        ['KH', new PostalCodeInfo(/^\d{5}$/)],
        ['KR', new PostalCodeInfo(/^[1-7]\d{5}$/, /^(...)(...)$/, '$1-$2')],
        ['KY', new PostalCodeInfo(/^(KY)?\d{5}$/, /^(KY)?(.)(....)$/, 'KY$2-$3')],
        ['KZ', new PostalCodeInfo(/^\d{6}$/)],
        ['LA', new PostalCodeInfo(/^\d{5}$/)],
        ['LB', new PostalCodeInfo(/^\d{8}$/, /^(....)(....)$/, '$1 $2')],
        ['LI', new PostalCodeInfo(/^94(8[5-9]|9[0-8])$/)],
        ['LK', new PostalCodeInfo(/^\d{5}$/)],
        ['LR', new PostalCodeInfo(/^\d{4}$/)],
        ['LS', new PostalCodeInfo(/^\d{3}$/)],
        ['LT', new PostalCodeInfo(/^(LT)?\d{5}$/, /^(LT)?(.{5})$/, 'LT-$2')],
        ['LU', new PostalCodeInfo(/^\d{4}$/)],
        ['LV', new PostalCodeInfo(/^(LV)?\d{4}$/, /^(LV)?(....)$/, 'LV-$2')],
        ['LY', new PostalCodeInfo(/^\d{5}$/)],
        ['MA', new PostalCodeInfo(/^[1-9]\d{4}$/, /^(..)(...)$/, '$1 $2')],
        ['MC', new PostalCodeInfo(/^(MC)?980\d{2}$/)],
        ['MD', new PostalCodeInfo(/^(MD)?\d{4}$/, /^(MD)?(....)$/, 'MD-$2')],
        ['ME', new PostalCodeInfo(/^8[145]\d{3}$/)],
        ['MF', new PostalCodeInfo(/^978\d{2}$/)],
        ['MG', new PostalCodeInfo(/^\d{3}$/)],
        ['MH', new PostalCodeInfo(/^969[67]\d(\d{4})?$/, /^(.{5})(....)$/, '$1-$2')],
        ['MK', new PostalCodeInfo(/^\d{4}$/)],
        ['MM', new PostalCodeInfo(/^\d{5}$/)],
        ['MN', new PostalCodeInfo(/^\d{5}$/)],
        ['MP', new PostalCodeInfo(/^9695[012](\d{4})?$/, /^(.{5})(....)$/, '$1-$2')],
        ['MQ', new PostalCodeInfo(/^972\d{2}$/)],
        ['MT', new PostalCodeInfo(/^[A-Z]{3}\d{4}$/, /^(...)(....)$/, '$1 $2')],
        ['MX', new PostalCodeInfo(/^\d{5}$/)],
        ['MY', new PostalCodeInfo(/^(\d{2})(?<!00)\d{3}$/)],
        ['MZ', new PostalCodeInfo(/^\d{4}$/)],
        ['NA', new PostalCodeInfo(/^9[0-2]\d{3}$/)],
        ['NC', new PostalCodeInfo(/^988\d{2}$/)],
        ['NE', new PostalCodeInfo(/^\d{4}$/)],
        ['NF', new PostalCodeInfo(/^\d{4}$/)],
        ['NG', new PostalCodeInfo(/^\d{6}$/)],
        ['NI', new PostalCodeInfo(/^\d{5}$/)],
        ['NL', new PostalCodeInfo(/^[1-9]\d{3}([A-Z]{2})(?<!SS|SA|SD)$/, /^(....)(..)$/, '$1 $2')],
        ['NO', new PostalCodeInfo(/^\d{4}$/)],
        ['NP', new PostalCodeInfo(/^\d{5}$/)],
        ['NZ', new PostalCodeInfo(/^\d{4}$/)],
        ['OM', new PostalCodeInfo(/^\d{3}$/)],
        ['PA', new PostalCodeInfo(/^\d{6}$/)],
        ['PE', new PostalCodeInfo(/^\d{5}$/)],
        ['PF', new PostalCodeInfo(/^987\d{2}$/)],
        ['PG', new PostalCodeInfo(/^\d{3}$/)],
        ['PH', new PostalCodeInfo(/^(\d{2})(?<!00)\d{2}$/)],
        ['PK', new PostalCodeInfo(/^[1-9]\d{4}$/)],
        ['PL', new PostalCodeInfo(/^\d{5}$/, /^(..)(...)$/, '$1-$2')],
        ['PM', new PostalCodeInfo(/^97500$/)],
        ['PN', new PostalCodeInfo(/^PCRN1ZZ$/, /^.+$/, 'PCRN 1ZZ')],
        ['PR', new PostalCodeInfo(/^\d{5}$/)],
        ['PS', new PostalCodeInfo(/^\d{5}$/)],
        ['PT', new PostalCodeInfo(/^[1-9]\d{6}$/, /^(....)(...)$/, '$1 $2')],
        ['PW', new PostalCodeInfo(/^96940(\d{4})?$/, /^(.{5})(....)$/, '$1-$2')],
        ['PY', new PostalCodeInfo(/^\d{4}$/)],
        ['RE', new PostalCodeInfo(/^974\d{2}$/)],
        ['RO', new PostalCodeInfo(/^(\d{2})(?<!00)\d{4}$/)],
        ['RS', new PostalCodeInfo(/^[123]\d{4}$/)],
        ['RU', new PostalCodeInfo(/^[1-6]\d{5}$/)],
        ['SA', new PostalCodeInfo(/^\d{5}(\d{4})?$/, /^(.{5})(....)$/, '$1-$2')],
        ['SD', new PostalCodeInfo(/^\d{5}$/)],
        ['SE', new PostalCodeInfo(/^[1-9]\d{4}$/, /^(...)(..)$/, '$1 $2')],
        ['SG', new PostalCodeInfo(/^\d{6}$/)],
        ['SH', new PostalCodeInfo(/^STHL1ZZ$/, /^.+$/, 'STHL 1ZZ')],
        ['SI', new PostalCodeInfo(/^(SI)?\d{4}$/, /^(SI)?(....)$/, 'SI-$2')],
        ['SK', new PostalCodeInfo(/^\d{5}$/, /^(...)(..)$/, '$1 $2')],
        ['SM', new PostalCodeInfo(/^4789\d$/)],
        ['SN', new PostalCodeInfo(/^(CP)?\d{5}$/, /^(..)?(.{5})$/, 'CP$2')],
        ['SV', new PostalCodeInfo(/^01101$/)],
        ['SZ', new PostalCodeInfo(/^[HLMS]\d{3}$/)],
        ['TC', new PostalCodeInfo(/^TKCA1ZZ$/, /^.+$/, 'TKCA 1ZZ')],
        ['TD', new PostalCodeInfo(/^\d{5}$/)],
        ['TH', new PostalCodeInfo(/^[1-9]\d{4}$/)],
        ['TJ', new PostalCodeInfo(/^\d{6}$/)],
        ['TM', new PostalCodeInfo(/^\d{6}$/)],
        ['TN', new PostalCodeInfo(/^\d{4}$/)],
        ['TR', new PostalCodeInfo(/^(\d{2})(?<!00)\d{3}$/)],
        ['TT', new PostalCodeInfo(/^\d{6}$/)],
        ['TW', new PostalCodeInfo(/^[1-9]\d{4}$/)],
        ['UA', new PostalCodeInfo(/^(\d{2})(?<!00)\d{3}$/)],
        ['US', new PostalCodeInfo(/^\d{5}(\d{4})?$/, /^(.{5})(....)$/, '$1-$2')],
        ['UY', new PostalCodeInfo(/^\d{5}$/)],
        ['VA', new PostalCodeInfo(/^00120$/)],
        ['VC', new PostalCodeInfo(/^(VC)?\d{4}$/, /^(VC)?(....)$/, 'VC$2')],
        ['VE', new PostalCodeInfo(/^\d{4}[A-Z]?$/, /^(....)(.)$/, '$1-$2')],
        ['VG', new PostalCodeInfo(/^(VG)?11[0-6]\d$/, /^(VG)?(....)$/, 'VG$2')],
        ['VI', new PostalCodeInfo(/^008[1-5]\d(\d{4})?$/, /^(.{5})(....)$/, '$1-$2')],
        ['VN', new PostalCodeInfo(/^\d{6}$/)],
        ['WF', new PostalCodeInfo(/^986\d{2}$/)],
        ['XK', new PostalCodeInfo(/^[1-7]\d{4}$/)],
        ['YT', new PostalCodeInfo(/^976\d{2}$/)],
        ['ZA', new PostalCodeInfo(/^(\d{4})(?<!0000)$/)],
        ['ZM', new PostalCodeInfo(/^\d{5}$/)],
    ]);
}
