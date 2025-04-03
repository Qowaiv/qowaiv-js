import { describe, expect, it, test } from 'vitest';
import { Percentage, Unparsable } from '../src';

function percent(n: number): Percentage {
    return Percentage.new(n);
}

describe('Percentage', () => {

    it('sign is +1 for positive', () => {
        const svo = percent(3.14);
        expect(svo.sign()).toBe(+1);
    });

    it('sign is -1 for negative', () => {
        const svo = percent(-3.14);
        expect(svo.sign()).toBe(-1);
    });

    it('sign is 0 for negative', () => {
        expect(Percentage.Zero.sign()).toBe(0);
    });

    it('abs is postive value for negative', () =>{
        const svo = percent(-3.14);
        expect(svo.abs().equals(percent(3.14))).toBe(true);
    });

    it('equals same value is true', () => {

        expect(percent(12.0).equals(percent(12.0))).toBe(true);
    });

    it('equals different values is false', () => {

        expect(percent(12.0).equals(percent(13.0))).toBe(false);
    });

    it('rounds based on the number of digts', () => {

        const svo = percent(31.41592653589793);

        expect(svo.round(-1).equals(percent(30)));
        expect(svo.round(+0).equals(percent(31)));
        expect(svo.round(+1).equals(percent(31.4)));
        expect(svo.round(+2).equals(percent(31.42)));
        expect(svo.round(+3).equals(percent(31.416)));
        expect(svo.round(+4).equals(percent(31.4159)));
    });

    it('formats based on options', () =>{

        const svo = percent(31.41592653589793);
        expect(svo.format('nl', { maximumFractionDigits: 1, symbol: '‰' })).equals("314,2‰");
    });

    it('formats with defaults', () =>{

        const svo = percent(31.41592653589793);
        expect(svo.format('en')).equals("31.416%");
    });

    test.each([
        '3.25',
        '3.250',
        '3.25%',
        '%3.25',
        '32.5‰',
        '325‱',
    ])('parses %s as 3.25%', (s) => {
        const svo = Percentage.parse(s);
        expect(svo.equals(percent(3.25))).toBe(true);
    });

    test.each([
        '%3.14%',
        ' ',
        '\t',
        '',
        null,
        undefined,
    ])('parses %s as undefined', (s) => {
        const svo = Percentage.tryParse(s);
        expect(svo).toBeInstanceOf(Unparsable);
    });

    it('can not be created from NaN', () => {
        expect(() => Percentage.new(Number.NaN)).toThrow();
    })
});
