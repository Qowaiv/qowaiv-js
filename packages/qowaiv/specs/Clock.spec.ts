import { describe, expect, it } from 'vitest';
import { Clock, DateOnly } from '../src';

describe("Clock: ", () => {


    it("Clock now can be updated", () => {

        Clock.generator = () => new Date(2017, 6, 11);
        const now = Clock.today();

        expect(now).toStrictEqual(new DateOnly(2017, 6, 11));
    });
});