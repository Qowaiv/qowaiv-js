import { describe, expect, it } from 'vitest';
import { q } from '../src';

describe("q", () => {
    it('exists',()  =>{
        expect(q).toBeTypeOf("object");
    });
});
