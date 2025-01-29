import { describe, expect, beforeEach, it } from 'vitest';
import { PostalCode } from '../src';

describe('PostalCode', () => {
    it('should create an empty postal code', () => {
        const postalCode = PostalCode.empty();
        expect(postalCode.toString()).toBe('');
    });

    it('should parse and format a postal code', () => {
        const postalCode = PostalCode.parse(' AD700 ');
        expect(postalCode?.toString()).toBe('AD700');
        expect(postalCode?.format('AD')).toBe('AD-700');
    });

    it('should validate a postal code for a specific country', () => {
        const postalCode = PostalCode.parse('AD700');
        expect(postalCode?.isValid('AD')).toBe(true);
        expect(postalCode?.isValid('US')).toBe(false);
    });

    it('should return null when input is more than 10 characters', () => {
        const postalCode = PostalCode.parse('INVALIDINVALID');
        expect(postalCode).toBeUndefined();
    });

    it('should return null when input is less than 2 characters', () => {
        const postalCode = PostalCode.parse('I');
        expect(postalCode).toBeUndefined();
    });

    it('should correctly compare two postal codes for equality', () => {
        const postalCode1 = PostalCode.parse('AD700');
        const postalCode2 = PostalCode.parse('AD700');
        const postalCode3 = PostalCode.parse('US90210');
        expect(postalCode1?.equals(postalCode2)).toBe(true);
        expect(postalCode1?.equals(postalCode3)).toBe(false);
    });
});
