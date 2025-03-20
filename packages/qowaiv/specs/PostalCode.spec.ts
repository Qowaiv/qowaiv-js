import { describe, expect, it, test } from 'vitest';
import { PostalCode, Unparsable } from '../src';

describe('PostalCode', () => {

    test.each([
        ' ',
        '\t',
        '',
        null,
        undefined,
    ])('parses %s as undefined', (s) => {
        const svo = PostalCode.parse(s!);
        expect(svo).toBeUndefined();
    });

    it('has an accessble length', () => {
        const svo = PostalCode.parse('4590 ZC');
        expect(svo!.length).toBe(6);
    });

    it('parses and format a postal code', () => {
        const postalCode0 = PostalCode.parse(' AD700 ');
        const postalCode1 = PostalCode.parse('2017IL');
        expect(postalCode0!.toString()).toBe('AD700');
        expect(postalCode0!.format('AD')).toBe('AD-700');
        expect(postalCode1!.format('NL')).toBe('2017 IL');
    });

    it('does not format a postal code that is not valid for a country', () => {
        const postalCode = PostalCode.parse('123456');
        expect(postalCode!.toString()).toBe('123456');
        expect(postalCode!.format('NL')).toBe('123456');
    });

    it('validates a postal code for a specific country', () => {
        const postalCode = PostalCode.parse('AD700');
        expect(postalCode!.isValid('AD')).toBe(true);
        expect(postalCode!.isValid('US')).toBe(false);
    });

    it('returns undefined when input is more than 10 characters', () => {
        const postalCode = PostalCode.tryParse('INVALIDINVALID');
        expect(postalCode).toBeInstanceOf(Unparsable);
    });

    it('returns Unparsable when input is less than 2 characters', () => {
        const postalCode = PostalCode.tryParse('I');
        expect(postalCode).toBeInstanceOf(Unparsable);
    });

    it('throws for invalid input on parse', () => {

        expect(() => PostalCode.parse('I')).toThrowError(expect.objectContaining({
            message: 'Not a valid postal code',
            attemptedValue: 'I',
        }));
    });

    it('should correctly compare two postal codes for equality', () => {
        const code1 = PostalCode.parse('AD700');
        const code2 = PostalCode.parse('AD700');
        const code3 = PostalCode.parse('US90210');
        expect(code1!.equals(code2)).toBe(true);
        expect(code1!.equals(code3)).toBe(false);
    });
});
