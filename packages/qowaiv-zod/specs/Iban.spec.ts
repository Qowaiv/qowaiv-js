import { describe, expect, it } from "vitest";
import { z, ZodError } from 'zod';
import { q } from '../src';
import { QowaivZodIssue } from '../src/QowaivZodIssue';
import { QowaivZodIssues } from '../src/QowaivZodIssues';

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

        const issue = result.error?.issues[0]! as QowaivZodIssue;
        expect(QowaivZodIssues.supports(issue)).toBe(true);
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
    
    it('is valid if optional', () => {
        const definition = z.object({
            iban: q.iban().optional()
        });
        const result = definition.safeParse({
            iban: undefined,
        });

        expect(result.success).toBe(true);
        expect(result.error).toBeUndefined();
    });
});
