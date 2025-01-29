import { describe, expect, beforeEach, it } from 'vitest';
import { Guid } from '../src';

describe("GUID: ", () => {

    it("The version of newGuid() should be valid", () => {

        var guid = Guid.newGuid();
        expect(Guid.isValid(guid.toString())).toBeTruthy();
    });

    it("The version of newGuid(seed) should be valid", () => {

        var seed = Guid.parse("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
        var guid = Guid.newGuid(seed);
        expect(Guid.isValid(guid.toString())).toBeTruthy();
    });

    it("The version of newGuid() should be 4", () => {

        var guid = Guid.newGuid();
        expect(guid.version()).toBe(4);
    });

    it("The version of some random guid should be 4", () => {

        var guid = Guid.parse("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
        expect(guid.version()).toBe(4);
    });    

    it("The version of empty() should be 0", () => {

        var guid = Guid.empty();
        expect(guid.version()).toBe(0);
    });


    it("format('B') should have brackets.", () => {

        var guid = Guid.parse("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
        expect(guid.format("B")).toBe("{DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189}");
    }); 

    it("format('b') should have brackets and be lowercase.", () => {

        var guid = Guid.parse("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
        expect(guid.format("b")).toBe("{dc7fba65-df6f-4cb9-8faa-6c7b5654f189}");
    }); 

    it("format('S') should have no dashes.", () => {

        var guid = Guid.parse("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
        expect(guid.format("S")).toBe("DC7FBA65DF6F4CB98FAA6C7B5654F189");
    }); 

    it("format('s') should have no dashed and be lowercase.", () => {

        var guid = Guid.parse("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
        expect(guid.format("s")).toBe("dc7fba65df6f4cb98faa6c7b5654f189");
    }); 

    it("Parse('{DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189}') should be parseable.", () => {

        var guid = Guid.parse("{DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189}");
        expect(guid.format("U")).toBe("DC7FBA65-DF6F-4CB9-8FAA-6C7B5654F189");
    }); 

    it("Parse('Nonsense') should not be parseable.", () => {

        var guid = Guid.parse("Nonsense");
        expect(guid).toBeUndefined();
    }); 
});
