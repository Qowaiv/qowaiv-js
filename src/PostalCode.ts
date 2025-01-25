export class PostalCodeInfos {

    private readonly data: Map<string, PostalCodeInfo>;

    constructor() {
        this.data = new Map<string, PostalCodeInfo>([
            [ 'AD', new PostalCodeInfo(/^(AD)?[1-7][0-9]{2}$/, /^(AD)?(...)$/, 'AD-$2')],
            [ 'AF', new PostalCodeInfo(/^(0[1-9]|[1-3][0-9]|4[0-3])([0-9]{2})(?<!00)$/)],
            [ 'AI', new PostalCodeInfo(/^(AI)?2640$/, /^.+$/, 'AI-2640')],
            [ 'AL', new PostalCodeInfo(/^[1-9][0-9]{3}$/)],
            [ 'AM', new PostalCodeInfo(/^[0-4][0-9]{3}$/)],
            [ 'AR', new PostalCodeInfo(/^[A-Z][1-9][0-9]{3}[A-Z]{3}$/, /^(.)(....)(...)$/, '$1 $2 $3')],
            [ 'AS', new PostalCodeInfo(/^9[0-9]{4}([0-9]{4})?$/, /^(.{5})(....)?$/, '$1 $2')],
            [ 'AT', new PostalCodeInfo(/^[1-9][0-9]{3}$/)],
            [ 'AU', new PostalCodeInfo(/^(0[89]|[1-9][0-9])[0-9]{2}$/)],
            [ 'AX', new PostalCodeInfo(/^22[0-9]{3}$/, /^(..)(...)$/, '$1-$2')],
            [ 'AZ', new PostalCodeInfo(/^(AZ)?[0-9]{4}$/, /^(AZ)?(....)$/, 'AZ-$2')],
            [ 'BA', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'BB', new PostalCodeInfo(/^(BB)?[0-9]{5}$/, /^(BB)?(.{5})$/, 'BB-$2')],
            [ 'BD', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'BE', new PostalCodeInfo(/^[1-9][0-9]{3}$/)],
            [ 'BG', new PostalCodeInfo(/^[1-9][0-9]{3}$/)],
            [ 'BH', new PostalCodeInfo(/^(1[0-2]|[1-9])[0-9]{2}$/)],
            [ 'BL', new PostalCodeInfo(/^977[0-9]{2}$/)],
            [ 'BM', new PostalCodeInfo(/^[A-Z]{2}([A-Z0-9]{2})?$/, /^(..)(..)$/, '$1 $2')],
            [ 'BN', new PostalCodeInfo(/^[A-Z]{2}[0-9]{4}$/)],
            [ 'BO', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'BR', new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{6}$/, /^(.{5})(...)$/, '$1-$2')],
            [ 'BT', new PostalCodeInfo(/^[0-9]{3}$/)],
            [ 'BY', new PostalCodeInfo(/^[0-9]{6}$/)],
            [ 'CA', new PostalCodeInfo(/^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$/, /^(...)(...)$/, '$1 $2')],
            [ 'CC', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'CH', new PostalCodeInfo(/^[1-9][0-9]{3}$/)],
            [ 'CL', new PostalCodeInfo(/^[0-9]{7}$/, /^(...)(....)$/, '$1-$2')],
            [ 'CN', new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{4}$/)],
            [ 'CO', new PostalCodeInfo(/^[0-9]{6}$/)],
            [ 'CR', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'CU', new PostalCodeInfo(/^(CP)?[0-9]{5}$/, /^(..)?(.{5})$/, 'CP$2')],
            [ 'CV', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'CX', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'CY', new PostalCodeInfo(/^[1-9][0-9]{3}$/)],
            [ 'CZ', new PostalCodeInfo(/^[1-7][0-9]{4}$/, /^(...)(..)$/, '$1 $2')],
            [ 'DE', new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{3}$/)],
            [ 'DK', new PostalCodeInfo(/^(DK)?[1-9][0-9]{3}$/, /^(DK)?(....)$/, 'DK-$2')],
            [ 'DZ', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'EC', new PostalCodeInfo(/^[0-9]{6}$/)],
            [ 'EE', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'EG', new PostalCodeInfo(/^[1-9][0-9]{4}$/)],
            [ 'ES', new PostalCodeInfo(/^((0[1-9])|([1-4][0-9])|(5[012]))[0-9]{3}$/)],
            [ 'ET', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'FI', new PostalCodeInfo(/^[0-9]{5}$/, /^(..)(...)$/, '$1-$2')],
            [ 'FK', new PostalCodeInfo(/^FIQQ1ZZ$/, /^.+$/, 'FIQQ 1ZZ')],
            [ 'FM', new PostalCodeInfo(/^9694[1234]([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2')],
            [ 'FO', new PostalCodeInfo(/^(FO)?[1-9][0-9]{2}$/, /^(FO)?(...)$/, 'FO-$2')],
            [ 'FR', new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{3}$/)],
            [ 'GA', new PostalCodeInfo(/^[0-9]{4}$/, /^(..)(..)$/, '$1 $2')],
            [ 'GB', new PostalCodeInfo(/^[A-Z]?[A-Z][0-9][A-Z0-9]?[0-9][A-Z]{2}$/, /^(.+)(...)$/, '$1 $2')],
            [ 'GE', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'GF', new PostalCodeInfo(/^973[0-9]{2}$/)],
            [ 'GG', new PostalCodeInfo(/^(GY)?[0-9]{2,3}[A-Z]{2}$/, /^(GY)?(...?)(...)$/, 'GY$2 $3')],
            [ 'GI', new PostalCodeInfo(/^GX111AA$/, /^.+$/, 'GX11 1AA')],
            [ 'GL', new PostalCodeInfo(/^(GL)?39[0-9]{2}$/, /^(GL)?(....)$/, 'GL-$2')],
            [ 'GP', new PostalCodeInfo(/^971[0-9]{2}$/)],
            [ 'GR', new PostalCodeInfo(/^[1-9][0-9]{4}$/, /^(...)(..)$/, '$1 $2')],
            [ 'GS', new PostalCodeInfo(/^SIQQ1ZZ$/, /^.+$/, 'SIQQ 1ZZ')],
            [ 'GT', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'GU', new PostalCodeInfo(/^969([12][0-9]|3[0-3])([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2')],
            [ 'GW', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'HM', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'HN', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'HR', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'HT', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'HU', new PostalCodeInfo(/^[1-9][0-9]{3}$/)],
            [ 'ID', new PostalCodeInfo(/^[1-9][0-9]{4}$/)],
            [ 'IL', new PostalCodeInfo(/^[0-9]{7}$/)],
            [ 'IM', new PostalCodeInfo(/^(IM)?[0-9]{2,3}[A-Z]{2}$/, /^(IM)?(..?)(...)$/, 'IM$2 $3')],
            [ 'IN', new PostalCodeInfo(/^[1-9][0-9]{5}$/)],
            [ 'IO', new PostalCodeInfo(/^BBND1ZZ$/, /^.+$/, 'BBND 1ZZ')],
            [ 'IQ', new PostalCodeInfo(/^[13456][0-9]{4}$/)],
            [ 'IR', new PostalCodeInfo(/^[0-9]{10}$/, /^(.{5})(.{5})$/, '$1-$2')],
            [ 'IS', new PostalCodeInfo(/^[0-9]{3}$/)],
            [ 'IT', new PostalCodeInfo(/^([0-9]{3})(?<!000)[0-9]{2}$/)],
            [ 'JE', new PostalCodeInfo(/^(JE)?[0-9]{2,3}[A-Z]{2}$/, /^(JE)?(...?)(...)$/, 'JE$2 $3')],
            [ 'JO', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'JP', new PostalCodeInfo(/^[0-9]{7}$/, /^(....)(...)$/, '$1-$2')],
            [ 'KG', new PostalCodeInfo(/^[0-9]{6}$/)],
            [ 'KH', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'KR', new PostalCodeInfo(/^[1-7][0-9]{5}$/, /^(...)(...)$/, '$1-$2')],
            [ 'KY', new PostalCodeInfo(/^(KY)?[0-9]{5}$/, /^(KY)?(.)(....)$/, 'KY$2-$3')],
            [ 'KZ', new PostalCodeInfo(/^[0-9]{6}$/)],
            [ 'LA', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'LB', new PostalCodeInfo(/^[0-9]{8}$/, /^(....)(....)$/, '$1 $2')],
            [ 'LI', new PostalCodeInfo(/^94(8[5-9]|9[0-8])$/)],
            [ 'LK', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'LR', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'LS', new PostalCodeInfo(/^[0-9]{3}$/)],
            [ 'LT', new PostalCodeInfo(/^(LT)?[0-9]{5}$/, /^(LT)?(.{5})$/, 'LT-$2')],
            [ 'LU', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'LV', new PostalCodeInfo(/^(LV)?[0-9]{4}$/, /^(LV)?(....)$/, 'LV-$2')],
            [ 'LY', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'MA', new PostalCodeInfo(/^[1-9][0-9]{4}$/, /^(..)(...)$/, '$1 $2')],
            [ 'MC', new PostalCodeInfo(/^(MC)?980[0-9]{2}$/)],
            [ 'MD', new PostalCodeInfo(/^(MD)?[0-9]{4}$/, /^(MD)?(....)$/, 'MD-$2')],
            [ 'ME', new PostalCodeInfo(/^8[145][0-9]{3}$/)],
            [ 'MF', new PostalCodeInfo(/^978[0-9]{2}$/)],
            [ 'MG', new PostalCodeInfo(/^[0-9]{3}$/)],
            [ 'MH', new PostalCodeInfo(/^969[67][0-9]([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2')],
            [ 'MK', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'MM', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'MN', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'MP', new PostalCodeInfo(/^9695[012]([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2')],
            [ 'MQ', new PostalCodeInfo(/^972[0-9]{2}$/)],
            [ 'MT', new PostalCodeInfo(/^[A-Z]{3}[0-9]{4}$/, /^(...)(....)$/, '$1 $2')],
            [ 'MX', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'MY', new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{3}$/)],
            [ 'MZ', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'NA', new PostalCodeInfo(/^9[0-2][0-9]{3}$/)],
            [ 'NC', new PostalCodeInfo(/^988[0-9]{2}$/)],
            [ 'NE', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'NF', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'NG', new PostalCodeInfo(/^[0-9]{6}$/)],
            [ 'NI', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'NL', new PostalCodeInfo(/^[1-9][0-9]{3}([A-Z]{2})(?<!SS|SA|SD)$/, /^(....)(..)$/, '$1 $2')],
            [ 'NO', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'NP', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'NZ', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'OM', new PostalCodeInfo(/^[0-9]{3}$/)],
            [ 'PA', new PostalCodeInfo(/^[0-9]{6}$/)],
            [ 'PE', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'PF', new PostalCodeInfo(/^987[0-9]{2}$/)],
            [ 'PG', new PostalCodeInfo(/^[0-9]{3}$/)],
            [ 'PH', new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{2}$/)],
            [ 'PK', new PostalCodeInfo(/^[1-9][0-9]{4}$/)],
            [ 'PL', new PostalCodeInfo(/^[0-9]{5}$/, /^(..)(...)$/, '$1-$2')],
            [ 'PM', new PostalCodeInfo(/^97500$/)],
            [ 'PN', new PostalCodeInfo(/^PCRN1ZZ$/, /^.+$/, 'PCRN 1ZZ')],
            [ 'PR', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'PS', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'PT', new PostalCodeInfo(/^[1-9][0-9]{6}$/, /^(....)(...)$/, '$1 $2')],
            [ 'PW', new PostalCodeInfo(/^96940([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2')],
            [ 'PY', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'RE', new PostalCodeInfo(/^974[0-9]{2}$/)],
            [ 'RO', new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{4}$/)],
            [ 'RS', new PostalCodeInfo(/^[123][0-9]{4}$/)],
            [ 'RU', new PostalCodeInfo(/^[1-6][0-9]{5}$/)],
            [ 'SA', new PostalCodeInfo(/^[0-9]{5}([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2')],
            [ 'SD', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'SE', new PostalCodeInfo(/^[1-9][0-9]{4}$/, /^(...)(..)$/, '$1 $2')],
            [ 'SG', new PostalCodeInfo(/^[0-9]{6}$/)],
            [ 'SH', new PostalCodeInfo(/^STHL1ZZ$/, /^.+$/, 'STHL 1ZZ')],
            [ 'SI', new PostalCodeInfo(/^(SI)?[0-9]{4}$/, /^(SI)?(....)$/, 'SI-$2')],
            [ 'SK', new PostalCodeInfo(/^[0-9]{5}$/, /^(...)(..)$/, '$1 $2')],
            [ 'SM', new PostalCodeInfo(/^4789[0-9]$/)],
            [ 'SN', new PostalCodeInfo(/^(CP)?[0-9]{5}$/, /^(..)?(.{5})$/, 'CP$2')],
            [ 'SV', new PostalCodeInfo(/^01101$/)],
            [ 'SZ', new PostalCodeInfo(/^[HLMS][0-9]{3}$/)],
            [ 'TC', new PostalCodeInfo(/^TKCA1ZZ$/, /^.+$/, 'TKCA 1ZZ')],
            [ 'TD', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'TH', new PostalCodeInfo(/^[1-9][0-9]{4}$/)],
            [ 'TJ', new PostalCodeInfo(/^[0-9]{6}$/)],
            [ 'TM', new PostalCodeInfo(/^[0-9]{6}$/)],
            [ 'TN', new PostalCodeInfo(/^[0-9]{4}$/)],
            [ 'TR', new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{3}$/)],
            [ 'TT', new PostalCodeInfo(/^[0-9]{6}$/)],
            [ 'TW', new PostalCodeInfo(/^[1-9][0-9]{4}$/)],
            [ 'UA', new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{3}$/)],
            [ 'US', new PostalCodeInfo(/^[0-9]{5}([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2')],
            [ 'UY', new PostalCodeInfo(/^[0-9]{5}$/)],
            [ 'VA', new PostalCodeInfo(/^00120$/)],
            [ 'VC', new PostalCodeInfo(/^(VC)?[0-9]{4}$/, /^(VC)?(....)$/, 'VC$2')],
            [ 'VE', new PostalCodeInfo(/^[0-9]{4}[A-Z]?$/, /^(....)(.)$/, '$1-$2')],
            [ 'VG', new PostalCodeInfo(/^(VG)?11[0-6][0-9]$/, /^(VG)?(....)$/, 'VG$2')],
            [ 'VI', new PostalCodeInfo(/^008[1-5][0-9]([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2')],
            [ 'VN', new PostalCodeInfo(/^[0-9]{6}$/)],
            [ 'WF', new PostalCodeInfo(/^986[0-9]{2}$/)],
            [ 'XK', new PostalCodeInfo(/^[1-7][0-9]{4}$/)],
            [ 'YT', new PostalCodeInfo(/^976[0-9]{2}$/)],
            [ 'ZA', new PostalCodeInfo(/^([0-9]{4})(?<!0000)$/)],
            [ 'ZM', new PostalCodeInfo(/^[0-9]{5}$/)],
        ])
    }

    public get(country: string): PostalCodeInfo | null {
        const key = country.toUpperCase();
        return this.data.get(key) ?? null;
    }
}

export class PostalCodeInfo {
    public constructor(pattern: RegExp, search?: RegExp | null, replace?: string | null) {
        this.pattern = pattern;
        this.search = search ?? null;
        this.replace = replace ?? null;
    }

    private pattern: RegExp;
    private search: RegExp | null;
    private replace: string | null;

    public isValid(code: string): boolean {
        return this.pattern.test(code);
    }

    public format(code: string) {
        return this.search ? code.replace(this.search, this.replace ?? '') : code;
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
    private constructor() { }

    /**
     * The underlying value.
     */
    private value: string = '';

    /** 
    * Returns a string that represents the current postal code.
    */
    public toString(): string {
        return this.value;
    }

    /** 
    * Returns a string that represents the current postal code.
    */
    public format(f: string): string {
        const info = PostalCode.Infos.get(f);

        return info ? info.format(this.value) : this.value;
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
    public equals(other: any): boolean {
        return other instanceof PostalCode && other.value === this.value;
    }

    /**
     * Returns true if the postal code is valid for the specified country, otherwise false.
     * @param {string} country The country to validate for.
     * @remarks Returns false if the country does not have postal codes, unless the postal code is empty.
     */
    public isValid(country: string): boolean {
        const info = PostalCode.Infos.get(country);
        return info ? info.isValid(this.value) : this.value === '';
    }

    /**
    * Returns a new empty postal code.
    */
    public static empty(): PostalCode {
        return new PostalCode();
    }

    /**
     * Creates a GUID from a JSON string.
     * @param {string} s A JSON string representing the GUID.
     * @returns {PostalCode} A GUID if valid, otherwise undefined.
     */
    public static fromJSON(s: string): PostalCode | null {
        return PostalCode.parse(s);
    }

    public static parse(s: string): PostalCode | null {
        // an empty string should equal Guid.Empty.
        if (!s) return PostalCode.empty();

        const sanitized = PostalCode.strip(s).toUpperCase();
        if (sanitized.length >= 2 && sanitized.length <= 10) {
            const postalCode = new PostalCode();
            postalCode.value = sanitized;
            return postalCode;
        }

        return null
    }

    private static strip(s: string): string {
        return s.replace(/[_\- .]/g, '');
    }

    private static Infos = new PostalCodeInfos();
}