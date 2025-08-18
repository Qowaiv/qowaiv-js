import { describe, expect, it } from "vitest";
import { z, ZodError } from 'zod';
import { q } from '../src';
import { isQowaivIssue, QowaivIssue } from '../src/QowaivError';

describe('Iban validation', () => {
    it('is invalid', () => {
        const definition = z.object({
            iban: q.iban()
        });
        const result = definition.safeParse({
            iban: 'invalid',
        });

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error?.issues.length).toBe(1);

        const issue = result.error?.issues[0]! as QowaivIssue;
        expect(isQowaivIssue(issue)).toBe(true);
        expect(issue.params.qowaiv).toBe('invalid_iban');
    });

    it('is valid', () => {
        const definition = z.object({
            iban: q.iban()
        });
        const result = definition.safeParse({
            iban: 'NL02ABNA0123456789',
        });

        expect(result.success).toBe(true);
        expect(result.error).toBeUndefined();
    });
});
