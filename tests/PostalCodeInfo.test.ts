import { describe, expect, beforeEach, it } from 'vitest';
import { PostalCodeInfos, PostalCodeInfo } from '../src/PostalCode';

describe('PostalCodeInfos', () => {
  let postalCodeInfos: PostalCodeInfos;

  beforeEach(() => {
    postalCodeInfos = new PostalCodeInfos();
  });

  it('should return valid PostalCodeInfo for a known country', () => {
    const info = postalCodeInfos.get('AD');
    expect(info).toBeInstanceOf(PostalCodeInfo);
    expect(info?.isValid('AD700')).toBe(true); // Valid postal code
  });

  it('should return null for an unknown country', () => {
    const info = postalCodeInfos.get('XX');
    expect(info).toBeNull();
  });

  it('should handle case-insensitivity for country codes', () => {
    const infoLowerCase = postalCodeInfos.get('ad');
    const infoUpperCase = postalCodeInfos.get('AD');
    expect(infoLowerCase).toEqual(infoUpperCase);
  });
});

describe('PostalCodeInfo', () => {
  let postalCodeInfo: PostalCodeInfo;

  beforeEach(() => {
    postalCodeInfo = new PostalCodeInfo(/^(AD)?[1-7][0-9]{2}$/, /^(AD)?(...)$/, 'AD-$2');
  });

  it('should validate a correct postal code', () => {
    expect(postalCodeInfo.isValid('AD700')).toBe(true);
  });

  it('should invalidate an incorrect postal code', () => {
    expect(postalCodeInfo.isValid('XX999')).toBe(false);
  });

  it('should format a postal code correctly', () => {
    const formatted = postalCodeInfo.format('AD700');
    expect(formatted).toBe('AD-700');
  });

  it('should return the original postal code if no formatting is defined', () => {
    const simpleInfo = new PostalCodeInfo(/^[0-9]{4}$/);
    expect(simpleInfo.format('1234')).toBe('1234');
  });
});
