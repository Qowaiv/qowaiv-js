import { describe, expect, it } from 'vitest';
import { Rnd } from './_rnd';

describe('Rnd', () => {

    it('nextInt() has inclusive boundaries', () => {

        const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = 0; i < 1000; i++) {
            counts[Rnd.nextInt(2, 8)]++;
        }

        expect(counts[0]).toBe(0);
        expect(counts[1]).toBe(0);
        expect(counts[9]).toBe(0);
        expect(counts[2]).not.toBe(0);
        expect(counts[3]).not.toBe(0);
        expect(counts[4]).not.toBe(0);
        expect(counts[5]).not.toBe(0);
        expect(counts[6]).not.toBe(0);
        expect(counts[7]).not.toBe(0);
        expect(counts[8]).not.toBe(0);
    });
});