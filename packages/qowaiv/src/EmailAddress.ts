import { Svo, Unparsable } from '.';

class Is {
    public static local(ch: string): boolean {
        return ch.charCodeAt(0) > 127
            || "!#$%&'*+-./0123456789=?ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(ch) >= 0;
    }

    public static domain(ch: string): boolean {
        return ch.charCodeAt(0) > 127
            || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'.indexOf(ch) >= 0;
    }

    public static whitespace(ch: string): boolean {
        return /\s/.test(ch);
    }

    public static topDomain(part: string): boolean {
        return /^([^\x00-\x7F]|[a-z])+$/.test(part);
    }

    public static punycode(part: string): boolean {
        return /^xn--[a-z0-9-]{2,}$/.test(part);
    }

    public static ipV4(domain: string): string | undefined {
        const parts = domain.split('.').map(Number);
        return parts.length === 4
            && parts[0] >= 0 && parts[0] <= 255
            && parts[1] >= 0 && parts[1] <= 255
            && parts[2] >= 0 && parts[2] <= 255
            && parts[3] >= 0 && parts[3] <= 255
            ? `[${parts[0]}.${parts[1]}.${parts[2]}.${parts[3]}]`
            : undefined;
    }

    public static ipV6(domain: string): string | undefined {
        domain = domain.toLowerCase();
        domain = domain.startsWith('ivp6:')
            ? domain.slice(5)
            : domain;

        return /^(?:[a-f0-9]{1,4}:){7}[a-f0-9]{1,4}$/.test(domain)
            ? `[IPv6:${domain}]`
            : undefined;
    }
}

class Parser {
    constructor(input: string, result?: string) {
        this.input = input;
        this.result = result ?? '';
    }

    readonly input: string;
    readonly result: string;

    public parse(): string | undefined {
        return this.email()?.result;
    }

    private email(): Parser | undefined {
        return this
            ?.displayName()
            ?.mailto()
            ?.stripComment()
            ?.local()
            ?.domain();
    }

    private displayName(): Parser | undefined {
        if (this.input.startsWith('"')) {
            const quote = this.quoted();
            if (quote) {
                return Is.whitespace(this.input[quote.length])
                    ? new Parser(this.input.slice(quote.length).trim())
                    : this;
            }
            else {
                return undefined;
            }
        }
        else if (this.input.endsWith('>')) {
            const lt = this.input.lastIndexOf('<');
            return lt >= 0
                ? new Parser(this.input.slice(lt + 1, this.input.length - 1))
                : undefined;
        }

        else if (this.input.endsWith(')')) {
            const start = this.input.lastIndexOf('(');
            return start !== -1
                && this.input.slice(start, this.input.length - 1).indexOf(')') === -1
                ? new Parser(this.input.slice(0, start).trim())
                : undefined;
        }
        else {
            return this;
        }
    }

    private mailto(): Parser {
        return this.input.toUpperCase().startsWith('MAILTO:')
            ? new Parser(this.input.slice(7))
            : this;
    }

    private stripComment() : Parser{
        return new Parser(this.input.replace(/\([^()]*\)/g, ''));
    }

    private local(): Parser | undefined {
        return this.localRegular()
            ?? this.localQuoted();
    }

    private localRegular(): Parser | undefined {

        let buffer = '';
        for (const ch of this.input) {
            buffer += ch;            
            if (buffer.length <= 64 && Is.local(ch)) {
                if (buffer === '.' || buffer.endsWith('..')) return undefined;
            }
            else if (ch === '@')  {
                return buffer.length > 1
                    && !buffer.endsWith('.@')
                    ? new Parser(this.input.slice(buffer.length), buffer)
                    : undefined;
            }
            else return undefined;
        }
        return undefined;
    }

    private localQuoted(): Parser | undefined {
        const quote = this.quoted();
        return quote != undefined
            && quote.length >= 3
            && quote.length <= 64
            && this.input[quote.length] === '@'
            ? new Parser(this.input.slice(quote.length + 1), quote + '@')
            : undefined;
    }

    private domain(): Parser | undefined {
        return this.domainRegular()
            ?? this.domainIp();
    }

    private domainRegular(): Parser | undefined {

        let buffer = '';
        let part = '';

        for (const ch of this.input) {
            
            if (Is.domain(ch)) part += ch.toLowerCase();
            else if (ch === '.') {
                if (part === '' || part.endsWith('-') || part.length > 63) return undefined;
                
                buffer += part + ch;
                part = '';
            }
            else if (ch === '-') {
                if (part.length === 0) return undefined;
                part += ch;
            }
            else return undefined;
        }

        const domain = buffer + part;
        const email = this.result + domain;

        return email.length <= 254
            && domain.length > 1
            && !part.endsWith('-') 
            && !part.endsWith('.') 
            && part.length <= 63
            && (Is.topDomain(part) || Is.punycode(part))
            ? new Parser('', email)
            : undefined;
    }

    private domainIp(): Parser | undefined {

        const domain = this.input.startsWith('[') && this.input.endsWith(']')
            ? this.input.slice(1, this.input.length - 1)
            : this.input;

        const ip = Is.ipV4(domain) ?? Is.ipV6(domain);

        return ip
            ? new Parser('', this.result + ip)
            : undefined;
    }

    private quoted(): string | undefined {
        if (!this.input.startsWith('"')) return undefined;

        let escaped = true;

        for (let i = 1; i < this.input.length; i++) {
            if (!escaped && this.input[i] === '"') {
                return this.input.slice(0, i + 1);
            }
            else if (this.input[i] === '\\') {
                escaped = !escaped;
            }
            else {
                escaped = false;
            }
        }
        return undefined;
    }
}

export class EmailAddress implements IEquatable, IJsonStringifyable {

    /**
     * @constructor
     * @remarks This is the default constructor, for creating an actual email address
     *          you will normally use EmailAddress.parse(string) or EmailAddress.tryParse(string).
     */
    private constructor(value: string) {
        this.#value = value;
    }

    /**
     * The underlying value.
     */
    readonly #value: string;

    /**
     * The length of the email address.
     */
    public get length(): number {
        return this.#value.length;
    }

    /**
     * Indicates if the email address is IP-based.
     */
    public get isIPBased(): boolean {
        return this.#value.endsWith(']');
    }

    /** 
    * Returns a string that represents the current email address.
    */
    public toString(): string {
        return this.#value;
    }

    /**
     * @param other the object to compare with.
     * @returns true if other is an email address representing the same value.
     */
    public equals(other: unknown): boolean {
        return other instanceof (EmailAddress)
            && other.#value === this.#value;
    }

    /** 
     * @returns a JSON representation of the email address.
     */
    public toJSON(): string {
        return this.#value;
    }

    /**
     * Creates an email address from a JSON string.
     * @param {string} s A JSON string representing the email address.
     * @returns {EmailAddress} A email address if valid, otherwise undefined.
     */
    public static fromJSON(s: string): EmailAddress | undefined {
        return EmailAddress.parse(s);
    }

    /**
     * Parses an email address string.
     * @param {string} s A string containing email address to convert.
     * @returns {EmailAddress} email address if valid, otherwise throws.
     */
    public static parse(s: string | null | undefined): EmailAddress | undefined {
        const svo = EmailAddress.tryParse(s);

        if (svo instanceof (Unparsable)) {
            throw svo;
        }
        return svo;
    }

    /**
     * Tries to parse a email address string.
     * @param {string} s A string containing email address to convert.
     * @returns {EmailAddress} A email address if valid, otherwise undefined.
     */
    public static tryParse(s: string | null | undefined): EmailAddress | Unparsable | undefined {
        if (Svo.isEmpty(s)) return undefined;

        const svo = new Parser(s!.trim()).parse();
        return svo
            ? new EmailAddress(svo)
            : new Unparsable('Not a valid email address', s);
    }
}
