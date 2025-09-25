import { describe, expect, it } from "vitest";
import { z, ZodError } from 'zod';
import { q } from '../src';
import { QowaivZodIssue } from '../src/QowaivZodIssue';
import { QowaivZodIssues } from '../src/QowaivZodIssues';

describe('Percentage validation', () => {
    it('is invalid', () => {
        const definition = z.object({
            percentage: q.percentage()
        });
        const result = definition.safeParse({
            percentage: 'invalid',
        });

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error?.issues.length).toBe(1);

        const issue = result.error?.issues[0]! as QowaivZodIssue;
        expect(QowaivZodIssues.supports(issue)).toBe(true);
        expect(issue.params.qowaiv).toBe('invalid_percentage');
    });

    it('is valid', () => {
        const definition = z.object({
            percentage: q.percentage()
        });
        const result = definition.safeParse({
            percentage: '12%',
        });

        expect(result.success).toBe(true);
        expect(result.error).toBeUndefined();
    });
    
    it('is valid if optional', () => {
        const definition = z.object({
            percentage: q.percentage().optional()
        });
        const result = definition.safeParse({
            percentage: undefined,
        });

        expect(result.success).toBe(true);
        expect(result.error).toBeUndefined();
    });
});
