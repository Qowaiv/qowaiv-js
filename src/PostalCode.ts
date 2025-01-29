class PostalCodeInfos {

    public Get(country: string): PostalCodeInfo | undefined {
        return this[country.toUpperCase()];
    }

    public AD = new PostalCodeInfo(/^(AD)?[1-7][0-9]{2}$/, /^(AD)?(...)$/, 'AD-$2');
    public AF = new PostalCodeInfo(/^(0[1-9]|[1-3][0-9]|4[0-3])([0-9]{2})(?<!00)$/);
    public AI = new PostalCodeInfo(/^(AI)?2640$/, /^.+$/, 'AI-2640');
    public AL = new PostalCodeInfo(/^[1-9][0-9]{3}$/);
    public AM = new PostalCodeInfo(/^[0-4][0-9]{3}$/);
    public AR = new PostalCodeInfo(/^[A-Z][1-9][0-9]{3}[A-Z]{3}$/, /^(.)(....)(...)$/, '$1 $2 $3');
    public AS = new PostalCodeInfo(/^9[0-9]{4}([0-9]{4})?$/, /^(.{5})(....)?$/, '$1 $2');
    public AT = new PostalCodeInfo(/^[1-9][0-9]{3}$/);
    public AU = new PostalCodeInfo(/^(0[89]|[1-9][0-9])[0-9]{2}$/);
    public AX = new PostalCodeInfo(/^22[0-9]{3}$/, /^(..)(...)$/, '$1-$2');
    public AZ = new PostalCodeInfo(/^(AZ)?[0-9]{4}$/, /^(AZ)?(....)$/, 'AZ-$2');
    public BA = new PostalCodeInfo(/^[0-9]{5}$/);
    public BB = new PostalCodeInfo(/^(BB)?[0-9]{5}$/, /^(BB)?(.{5})$/, 'BB-$2');
    public BD = new PostalCodeInfo(/^[0-9]{4}$/);
    public BE = new PostalCodeInfo(/^[1-9][0-9]{3}$/);
    public BG = new PostalCodeInfo(/^[1-9][0-9]{3}$/);
    public BH = new PostalCodeInfo(/^(1[0-2]|[1-9])[0-9]{2}$/);
    public BL = new PostalCodeInfo(/^977[0-9]{2}$/);
    public BM = new PostalCodeInfo(/^[A-Z]{2}([A-Z0-9]{2})?$/, /^(..)(..)$/, '$1 $2');
    public BN = new PostalCodeInfo(/^[A-Z]{2}[0-9]{4}$/);
    public BO = new PostalCodeInfo(/^[0-9]{4}$/);
    public BR = new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{6}$/, /^(.{5})(...)$/, '$1-$2');
    public BT = new PostalCodeInfo(/^[0-9]{3}$/);
    public BY = new PostalCodeInfo(/^[0-9]{6}$/);
    public CA = new PostalCodeInfo(/^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$/, /^(...)(...)$/, '$1 $2');
    public CC = new PostalCodeInfo(/^[0-9]{4}$/);
    public CH = new PostalCodeInfo(/^[1-9][0-9]{3}$/);
    public CL = new PostalCodeInfo(/^[0-9]{7}$/, /^(...)(....)$/, '$1-$2');
    public CN = new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{4}$/);
    public CO = new PostalCodeInfo(/^[0-9]{6}$/);
    public CR = new PostalCodeInfo(/^[0-9]{5}$/);
    public CU = new PostalCodeInfo(/^(CP)?[0-9]{5}$/, /^(..)?(.{5})$/, 'CP$2');
    public CV = new PostalCodeInfo(/^[0-9]{4}$/);
    public CX = new PostalCodeInfo(/^[0-9]{4}$/);
    public CY = new PostalCodeInfo(/^[1-9][0-9]{3}$/);
    public CZ = new PostalCodeInfo(/^[1-7][0-9]{4}$/, /^(...)(..)$/, '$1 $2');
    public DE = new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{3}$/);
    public DK = new PostalCodeInfo(/^(DK)?[1-9][0-9]{3}$/, /^(DK)?(....)$/, 'DK-$2');
    public DZ = new PostalCodeInfo(/^[0-9]{5}$/);
    public EC = new PostalCodeInfo(/^[0-9]{6}$/);
    public EE = new PostalCodeInfo(/^[0-9]{5}$/);
    public EG = new PostalCodeInfo(/^[1-9][0-9]{4}$/);
    public ES = new PostalCodeInfo(/^((0[1-9])|([1-4][0-9])|(5[012]))[0-9]{3}$/);
    public ET = new PostalCodeInfo(/^[0-9]{4}$/);
    public FI = new PostalCodeInfo(/^[0-9]{5}$/, /^(..)(...)$/, '$1-$2');
    public FK = new PostalCodeInfo(/^FIQQ1ZZ$/, /^.+$/, 'FIQQ 1ZZ');
    public FM = new PostalCodeInfo(/^9694[1234]([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2');
    public FO = new PostalCodeInfo(/^(FO)?[1-9][0-9]{2}$/, /^(FO)?(...)$/, 'FO-$2');
    public FR = new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{3}$/);
    public GA = new PostalCodeInfo(/^[0-9]{4}$/, /^(..)(..)$/, '$1 $2');
    public GB = new PostalCodeInfo(/^[A-Z]?[A-Z][0-9][A-Z0-9]?[0-9][A-Z]{2}$/, /^(.+)(...)$/, '$1 $2');
    public GE = new PostalCodeInfo(/^[0-9]{4}$/);
    public GF = new PostalCodeInfo(/^973[0-9]{2}$/);
    public GG = new PostalCodeInfo(/^(GY)?[0-9]{2,3}[A-Z]{2}$/, /^(GY)?(...?)(...)$/, 'GY$2 $3');
    public GI = new PostalCodeInfo(/^GX111AA$/, /^.+$/, 'GX11 1AA');
    public GL = new PostalCodeInfo(/^(GL)?39[0-9]{2}$/, /^(GL)?(....)$/, 'GL-$2');
    public GP = new PostalCodeInfo(/^971[0-9]{2}$/);
    public GR = new PostalCodeInfo(/^[1-9][0-9]{4}$/, /^(...)(..)$/, '$1 $2');
    public GS = new PostalCodeInfo(/^SIQQ1ZZ$/, /^.+$/, 'SIQQ 1ZZ');
    public GT = new PostalCodeInfo(/^[0-9]{5}$/);
    public GU = new PostalCodeInfo(/^969([12][0-9]|3[0-3])([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2');
    public GW = new PostalCodeInfo(/^[0-9]{4}$/);
    public HM = new PostalCodeInfo(/^[0-9]{4}$/);
    public HN = new PostalCodeInfo(/^[0-9]{5}$/);
    public HR = new PostalCodeInfo(/^[0-9]{5}$/);
    public HT = new PostalCodeInfo(/^[0-9]{4}$/);
    public HU = new PostalCodeInfo(/^[1-9][0-9]{3}$/);
    public ID = new PostalCodeInfo(/^[1-9][0-9]{4}$/);
    public IL = new PostalCodeInfo(/^[0-9]{7}$/);
    public IM = new PostalCodeInfo(/^(IM)?[0-9]{2,3}[A-Z]{2}$/, /^(IM)?(..?)(...)$/, 'IM$2 $3');
    public IN = new PostalCodeInfo(/^[1-9][0-9]{5}$/);
    public IO = new PostalCodeInfo(/^BBND1ZZ$/, /^.+$/, 'BBND 1ZZ');
    public IQ = new PostalCodeInfo(/^[13456][0-9]{4}$/);
    public IR = new PostalCodeInfo(/^[0-9]{10}$/, /^(.{5})(.{5})$/, '$1-$2');
    public IS = new PostalCodeInfo(/^[0-9]{3}$/);
    public IT = new PostalCodeInfo(/^([0-9]{3})(?<!000)[0-9]{2}$/);
    public JE = new PostalCodeInfo(/^(JE)?[0-9]{2,3}[A-Z]{2}$/, /^(JE)?(...?)(...)$/, 'JE$2 $3');
    public JO = new PostalCodeInfo(/^[0-9]{5}$/);
    public JP = new PostalCodeInfo(/^[0-9]{7}$/, /^(....)(...)$/, '$1-$2');
    public KG = new PostalCodeInfo(/^[0-9]{6}$/);
    public KH = new PostalCodeInfo(/^[0-9]{5}$/);
    public KR = new PostalCodeInfo(/^[1-7][0-9]{5}$/, /^(...)(...)$/, '$1-$2');
    public KY = new PostalCodeInfo(/^(KY)?[0-9]{5}$/, /^(KY)?(.)(....)$/, 'KY$2-$3');
    public KZ = new PostalCodeInfo(/^[0-9]{6}$/);
    public LA = new PostalCodeInfo(/^[0-9]{5}$/);
    public LB = new PostalCodeInfo(/^[0-9]{8}$/, /^(....)(....)$/, '$1 $2');
    public LI = new PostalCodeInfo(/^94(8[5-9]|9[0-8])$/);
    public LK = new PostalCodeInfo(/^[0-9]{5}$/);
    public LR = new PostalCodeInfo(/^[0-9]{4}$/);
    public LS = new PostalCodeInfo(/^[0-9]{3}$/);
    public LT = new PostalCodeInfo(/^(LT)?[0-9]{5}$/, /^(LT)?(.{5})$/, 'LT-$2');
    public LU = new PostalCodeInfo(/^[0-9]{4}$/);
    public LV = new PostalCodeInfo(/^(LV)?[0-9]{4}$/, /^(LV)?(....)$/, 'LV-$2');
    public LY = new PostalCodeInfo(/^[0-9]{5}$/);
    public MA = new PostalCodeInfo(/^[1-9][0-9]{4}$/, /^(..)(...)$/, '$1 $2');
    public MC = new PostalCodeInfo(/^(MC)?980[0-9]{2}$/);
    public MD = new PostalCodeInfo(/^(MD)?[0-9]{4}$/, /^(MD)?(....)$/, 'MD-$2');
    public ME = new PostalCodeInfo(/^8[145][0-9]{3}$/);
    public MF = new PostalCodeInfo(/^978[0-9]{2}$/);
    public MG = new PostalCodeInfo(/^[0-9]{3}$/);
    public MH = new PostalCodeInfo(/^969[67][0-9]([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2');
    public MK = new PostalCodeInfo(/^[0-9]{4}$/);
    public MM = new PostalCodeInfo(/^[0-9]{5}$/);
    public MN = new PostalCodeInfo(/^[0-9]{5}$/);
    public MP = new PostalCodeInfo(/^9695[012]([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2');
    public MQ = new PostalCodeInfo(/^972[0-9]{2}$/);
    public MT = new PostalCodeInfo(/^[A-Z]{3}[0-9]{4}$/, /^(...)(....)$/, '$1 $2');
    public MX = new PostalCodeInfo(/^[0-9]{5}$/);
    public MY = new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{3}$/);
    public MZ = new PostalCodeInfo(/^[0-9]{4}$/);
    public NA = new PostalCodeInfo(/^9[0-2][0-9]{3}$/);
    public NC = new PostalCodeInfo(/^988[0-9]{2}$/);
    public NE = new PostalCodeInfo(/^[0-9]{4}$/);
    public NF = new PostalCodeInfo(/^[0-9]{4}$/);
    public NG = new PostalCodeInfo(/^[0-9]{6}$/);
    public NI = new PostalCodeInfo(/^[0-9]{5}$/);
    public NL = new PostalCodeInfo(/^[1-9][0-9]{3}([A-Z]{2})(?<!SS|SA|SD)$/, /^(....)(..)$/, '$1 $2');
    public NO = new PostalCodeInfo(/^[0-9]{4}$/);
    public NP = new PostalCodeInfo(/^[0-9]{5}$/);
    public NZ = new PostalCodeInfo(/^[0-9]{4}$/);
    public OM = new PostalCodeInfo(/^[0-9]{3}$/);
    public PA = new PostalCodeInfo(/^[0-9]{6}$/);
    public PE = new PostalCodeInfo(/^[0-9]{5}$/);
    public PF = new PostalCodeInfo(/^987[0-9]{2}$/);
    public PG = new PostalCodeInfo(/^[0-9]{3}$/);
    public PH = new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{2}$/);
    public PK = new PostalCodeInfo(/^[1-9][0-9]{4}$/);
    public PL = new PostalCodeInfo(/^[0-9]{5}$/, /^(..)(...)$/, '$1-$2');
    public PM = new PostalCodeInfo(/^97500$/);
    public PN = new PostalCodeInfo(/^PCRN1ZZ$/, /^.+$/, 'PCRN 1ZZ');
    public PR = new PostalCodeInfo(/^[0-9]{5}$/);
    public PS = new PostalCodeInfo(/^[0-9]{5}$/);
    public PT = new PostalCodeInfo(/^[1-9][0-9]{6}$/, /^(....)(...)$/, '$1 $2');
    public PW = new PostalCodeInfo(/^96940([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2');
    public PY = new PostalCodeInfo(/^[0-9]{4}$/);
    public RE = new PostalCodeInfo(/^974[0-9]{2}$/);
    public RO = new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{4}$/);
    public RS = new PostalCodeInfo(/^[123][0-9]{4}$/);
    public RU = new PostalCodeInfo(/^[1-6][0-9]{5}$/);
    public SA = new PostalCodeInfo(/^[0-9]{5}([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2');
    public SD = new PostalCodeInfo(/^[0-9]{5}$/);
    public SE = new PostalCodeInfo(/^[1-9][0-9]{4}$/, /^(...)(..)$/, '$1 $2');
    public SG = new PostalCodeInfo(/^[0-9]{6}$/);
    public SH = new PostalCodeInfo(/^STHL1ZZ$/, /^.+$/, 'STHL 1ZZ');
    public SI = new PostalCodeInfo(/^(SI)?[0-9]{4}$/, /^(SI)?(....)$/, 'SI-$2');
    public SK = new PostalCodeInfo(/^[0-9]{5}$/, /^(...)(..)$/, '$1 $2');
    public SM = new PostalCodeInfo(/^4789[0-9]$/);
    public SN = new PostalCodeInfo(/^(CP)?[0-9]{5}$/, /^(..)?(.{5})$/, 'CP$2');
    public SV = new PostalCodeInfo(/^01101$/);
    public SZ = new PostalCodeInfo(/^[HLMS][0-9]{3}$/);
    public TC = new PostalCodeInfo(/^TKCA1ZZ$/, /^.+$/, 'TKCA 1ZZ');
    public TD = new PostalCodeInfo(/^[0-9]{5}$/);
    public TH = new PostalCodeInfo(/^[1-9][0-9]{4}$/);
    public TJ = new PostalCodeInfo(/^[0-9]{6}$/);
    public TM = new PostalCodeInfo(/^[0-9]{6}$/);
    public TN = new PostalCodeInfo(/^[0-9]{4}$/);
    public TR = new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{3}$/);
    public TT = new PostalCodeInfo(/^[0-9]{6}$/);
    public TW = new PostalCodeInfo(/^[1-9][0-9]{4}$/);
    public UA = new PostalCodeInfo(/^([0-9]{2})(?<!00)[0-9]{3}$/);
    public US = new PostalCodeInfo(/^[0-9]{5}([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2');
    public UY = new PostalCodeInfo(/^[0-9]{5}$/);
    public VA = new PostalCodeInfo(/^00120$/);
    public VC = new PostalCodeInfo(/^(VC)?[0-9]{4}$/, /^(VC)?(....)$/, 'VC$2');
    public VE = new PostalCodeInfo(/^[0-9]{4}[A-Z]?$/, /^(....)(.)$/, '$1-$2');
    public VG = new PostalCodeInfo(/^(VG)?11[0-6][0-9]$/, /^(VG)?(....)$/, 'VG$2');
    public VI = new PostalCodeInfo(/^008[1-5][0-9]([0-9]{4})?$/, /^(.{5})(....)$/, '$1-$2');
    public VN = new PostalCodeInfo(/^[0-9]{6}$/);
    public WF = new PostalCodeInfo(/^986[0-9]{2}$/);
    public XK = new PostalCodeInfo(/^[1-7][0-9]{4}$/);
    public YT = new PostalCodeInfo(/^976[0-9]{2}$/);
    public ZA = new PostalCodeInfo(/^([0-9]{4})(?<!0000)$/);
    public ZM = new PostalCodeInfo(/^[0-9]{5}$/);
}

class PostalCodeInfo {
    public constructor(pattern: RegExp, search?: RegExp | undefined, replace?: string | undefined) {
        this.pattern = pattern;
        this.search = search;
        this.replace = replace;
    }

    private pattern: RegExp;
    private search: RegExp | undefined;
    private replace: string | undefined;

    public isValid(code: string): boolean {
        return this.pattern.test(code);
    }

    public format(code: string) {
        return this.search === undefined
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
    private constructor() { }

    /**
     * The underlying value.
     */
    private v = '';

    /** 
    * Returns a string that represents the current postal code.
    */
    toString(): string {
        return this.v;
    }

    /** 
    * Returns a string that represents the current postal code.
    */
    format(f: string): string {
        let info = PostalCode.Infos.Get(f);

        return info === undefined
            ? this.v
            : info.format(this.v);
    }

    /** 
     * Returns a JSON representation of the postal code.
     */
    public toJSON(): string {
        return this.v;
    }

    /**
     * Returns true if other is not null or undefined and a PostalCode
     * representing the same value, otherwise false.
     */
    public equals(other: any): boolean {
        return other !== null &&
            other !== undefined &&
            other instanceof (PostalCode) &&
            other.v === this.v;
    }

    /**
     * Returns true if the postal code is valid for the specified country, otherwise false.
     * @param {string} country The country to validate for.
     * @remarks Returns false if the country does not have postal codes, unless the postal code is empty.
     */
    public isValid(country: string): boolean {

        let info = PostalCode.Infos.Get(country);
        return info === undefined
            ? this.v === ''
            : info.isValid(this.v);
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
    public static fromJSON(s: string): PostalCode | undefined {
        return PostalCode.parse(s);
    }

    public static parse(s: string): PostalCode | undefined {

        // an empty string should equal Guid.Empty.
        if (s === '' || s === null) { return PostalCode.empty(); }

        s = PostalCode.strip(s).toUpperCase();
        if (s.length >= 2 && s.length <= 10) {
            let code = new PostalCode();
            code.v = s;
            return code;
        }

        return undefined
    }

    private static strip(s: string): string {
        return s.replace(/[_\- \.]/g, '');
    }

    private static Infos = new PostalCodeInfos();
}
