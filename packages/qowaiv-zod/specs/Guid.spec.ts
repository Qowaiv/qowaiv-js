import { describe, expect, it } from "vitest";
import { z, ZodError } from 'zod';
import { q } from '../src';
import { QowaivZodIssue } from '../src/QowaivZodIssue';
import { QowaivZodIssues } from '../src/QowaivZodIssues';

describe('GUID validation', () => {
    it('is invalid', () => {
        const definition = z.object({
            guid: q.guid()
        });
        const result = definition.safeParse({
            guid: 'invalid',
        });

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error?.issues.length).toBe(1);

        const issue = result.error?.issues[0]! as QowaivZodIssue;
        expect(QowaivZodIssues.supports(issue)).toBe(true);
        expect(issue.params.qowaiv).toBe('invalid_guid');
    });

    it('is valid', () => {
        const definition = z.object({
            guid: q.guid()
        });
        const result = definition.safeParse({
            guid: '890f46d1-e8c5-4733-8458-3307133de5ac',
        });

        expect(result.success).toBe(true);
        expect(result.error).toBeUndefined();
    });
    
    it('is valid if optional', () => {
        const definition = z.object({
            guid: q.guid().optional()
        });
        const result = definition.safeParse({
            guid: undefined,
        });

        expect(result.success).toBe(true);
        expect(result.error).toBeUndefined();
    });
});
