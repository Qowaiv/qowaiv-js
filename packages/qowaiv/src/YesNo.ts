import { Svo, Unparsable } from '.';

type YesNoFormat = 's';

/**
 * Represents a yes/no.
 */
export abstract class YesNo implements Equatable, Formattable<YesNoFormat>, JsonStringifyable {

    public static readonly yes: YesNo = new Yes();
    public static readonly no: YesNo = new No();
    public static readonly unknown: YesNo = new Unknown();

    /**
    * @param other the object to compare with.
    * @returns true if {other} represents the same value, otherwise false.
    */
    abstract equals(other: unknown): boolean;

    /** 
     * @returns a JSON representation of the yes/no.
     */
    abstract toJSON(): any;

    /** 
     * Returns a string that represents the current yes/no.
     */
    abstract toString(): string;

    abstract format(options?: YesNoFormat | undefined): string;


    /**
      * Creates a yes/no from a JSON string.
      * @param {string | number | boolean | null | undefined} s A JSON token representing the yes/no.
      * @returns {YesNo | undefined} A yes/no if valid, otherwise undefined.
      */
    public static fromJSON(s: string | number | boolean | null | undefined): YesNo | undefined {
        switch (s) {
            case 1:
            case true:
            case 'yes': return YesNo.yes;
            case 0:
            case false:
            case 'no': return YesNo.no;
            case '?': return YesNo.unknown;
            default: return undefined;
        }
    }

    /**
     * Parses a yes/no string.
     * @param {string} s A string containing yes/no to convert.
     * @returns {YesNo | undefined} A yes/no if valid, otherwise throws.
     */
    public static parse(s: string | null | undefined): YesNo | undefined {
        const svo = YesNo.tryParse(s);

        if (svo instanceof (Unparsable)) {
            throw svo;
        }
        return svo;
    }

    /**
     * Tries to parse a yes/no string.
     * @param {string} s A string containing yes/no to convert.
     * @returns {YesNo | Unparsable | undefined} A yes/no if valid, otherwise undefined.
     */
    public static tryParse(s: string | null | undefined): YesNo | Unparsable | undefined {

        if (Svo.isEmpty(s)) return undefined;

        return new Unparsable('Not a valid yes/no', s);
    }
}
class Yes implements YesNo {

    equals(other: unknown): boolean {
        return other instanceof (Yes);
    }

    toString(): string {
        return 'yes';
    }
    format(options?: string | undefined): string {
        throw new Error('Method not implemented.');
    }

    toJSON() {
        return 'yes';
    }
}
class No implements YesNo {

    equals(other: unknown): boolean {
        return other instanceof (No);
    }

    toString(): string {
        return 'no';
    }
    format(options?: YesNoFormat | undefined): string {
        throw new Error('Method not implemented.');
    }

    toJSON() {
        return 'no';
    }
}

class Unknown implements YesNo {

    equals(other: unknown): boolean {
        return other instanceof (Unknown);
    }

    toString(): string {
        return '?';
    }
    format(options?: YesNoFormat | undefined): string {
        throw new Error('Method not implemented.');
    }

    toJSON() {
        return '?';
    }
}