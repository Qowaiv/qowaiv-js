import { describe, expect, it } from "vitest";
import { z, ZodError } from 'zod/v3';
import { q } from '../src';
import { isQowaivIssue, QowaivIssue } from '../src/QowaivError';

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

        const issue = result.error?.issues[0]! as QowaivIssue;
        expect(isQowaivIssue(issue)).toBe(true);
        expect(issue.params.qowaiv).toBe('invalid_guid');
    });

    it('is valid', () => {
        const definition = z.object({
            guid: q.guid()
        });
        const result = definition.safeParse({
            guid: '85ef8f9c-cdf4-48c8-9512-a4a30e38b1fa',
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
