import { describe, expect, it, test } from 'vitest';
import { Guid, Unparsable } from '../src';

describe("GUID: ", () => {

    test.each([
        ' ',
        '\t',
        '',
        null,
        undefined,
    ])('parses %s as undefined', (s) => {
        const svo = Guid.parse(s!);
        expect(svo).toBeUndefined();
    });

    it("The version of newGuid() should be valid", () => {

        const svo = Guid.newGuid();
        expect(Guid.parse(svo.toString())).toBeDefined();
    });

    it("The version of newGuid(seed) should be valid", () => {

        const seed = Guid.parse("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
        const guid = Guid.newGuid(seed!);
        expect(Guid.parse(guid.toString())).toBeDefined();
    });

    it("The version of newGuid() should be 4", () => {

        const svo = Guid.newGuid();
        expect(svo.version).toBe(4);
    });

    it("The version of some random guid should be 4", () => {

        const svo = Guid.parse("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
        expect(svo!.version).toBe(4);
    });

    it("format('B') should have brackets.", () => {

        const svo = Guid.parse("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
        expect(svo!.format("B")).toBe("{DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189}");
    });

    it("format('b') should have brackets and be lowercase.", () => {

        const svo = Guid.parse("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
        expect(svo!.format("b")).toBe("{dc7fba65-df6f-4cb9-8faa-6c7b5654f189}");
    });

    it("format('S') should have no dashes.", () => {

        const svo = Guid.parse("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
        expect(svo!.format("S")).toBe("DC7FBA65DF6F4CB98FAA6C7B5654F189");
    });

    it("format('s') should have no dashed and be lowercase.", () => {

        const svo = Guid.parse("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
        expect(svo!.format("s")).toBe("dc7fba65df6f4cb98faa6c7b5654f189");
    });

    it("parse('{DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189}') should be parseable.", () => {

        const svo = Guid.parse("{DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189}");
        expect(svo!.format("U")).toBe("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
    });

    it("Parse('Nonsense') should not be parseable.", () => {

        const svo = Guid.tryParse("Nonsense");
        expect(svo).toBeInstanceOf(Unparsable);
    });

    it('throws for invalid input on parse', () => {

        expect(() => Guid.parse('Nonsense')).toThrowError(expect.objectContaining({
            message: 'Not a valid GUID',
            attemptedValue: 'Nonsense',
        }));
    });
});
