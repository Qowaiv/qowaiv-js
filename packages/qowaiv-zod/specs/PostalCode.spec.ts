import { describe, expect, it } from "vitest";
import { z, ZodError } from 'zod';
import { q } from '../src';
import { QowaivZodIssue } from '../src/QowaivZodIssue';
import { QowaivZodIssues } from '../src/QowaivZodIssues';

describe('Postal code validation', () => {
    it('is invalid', () => {
        const definition = z.object({
            postalCode: q.postalCode()
        });
        const result = definition.safeParse({
            postalCode: 'invalid1234566',
        });

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error?.issues.length).toBe(1);

        const issue = result.error?.issues[0]! as QowaivZodIssue;
        expect(QowaivZodIssues.supports(issue)).toBe(true);
        expect(issue.params.qowaiv).toBe('invalid_postal_code');
    });

    it('is valid', () => {
        const definition = z.object({
            postalCode: q.postalCode()
        });
        const result = definition.safeParse({
            postalCode: '8599IQ',
        });

        expect(result.success).toBe(true);
        expect(result.error).toBeUndefined();
    });
    
    it('is valid if optional', () => {
        const definition = z.object({
            postalCode: q.postalCode().optional()
        });
        const result = definition.safeParse({
            postalCode: undefined,
        });

        expect(result.success).toBe(true);
        expect(result.error).toBeUndefined();
    });
});
