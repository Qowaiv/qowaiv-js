import { describe, expect, it } from 'vitest';
import { Clock } from '../src';
import { create as DateOnly_new } from '../src/DateOnly';

describe("Clock: ", () => {

    it("Clock now can be updated", () => {

        Clock.generator = () => new Date(2017, 6, 11);
        const now = Clock.today();

        expect(now).toStrictEqual(DateOnly_new(2017, 6, 11));
    });
});