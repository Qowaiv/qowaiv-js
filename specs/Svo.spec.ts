import { describe, expect, it } from 'vitest';
import { Svo } from '../src';

describe("Svo.unify", () => {

    it('normalizes to uppercase',()  =>{
        const u = Svo.unify('abCd');
        expect(u).toBe('ABCD');
    });

    it('normalizes to lowercase',()  =>{
        const u = Svo.unify('abCd', true);
        expect(u).toBe('abcd');
    });

    it('removes spaces',()  =>{
        const u = Svo.unify(' A\t\tB\r\nC D    ');
        expect(u).toBe('ABCD');
    });

    it('removes format characters',()  =>{
        const u = Svo.unify('-A_B.CD');
        expect(u).toBe('ABCD');
    });
});

