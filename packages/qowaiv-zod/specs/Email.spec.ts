import { describe, expect, it } from "vitest";
import { z, ZodError } from 'zod';
import { q } from '../src';
import { isQowaivIssue, QowaivIssue } from '../src/QowaivError';

describe('Email address validation', () => {
    it('is invalid', () => {
        const definition = z.object({
            emailAddress: q.email()
        });
        const result = definition.safeParse({
            emailAddress: 'invalid',
        });

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error?.issues.length).toBe(1);

        const issue = result.error?.issues[0]! as QowaivIssue;
        expect(isQowaivIssue(issue)).toBe(true);
        expect(issue.params.qowaiv).toBe('invalid_email_address');
    });

    it('is invalid ip based by default', () => {
        const definition = z.object({
            emailAddress: q.email(),
        });
        const result = definition.safeParse({
            emailAddress: 'ip@0.0.0.0',
        });

        expect(result.success).toBe(false);
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error?.issues.length).toBe(1);

        const issue = result.error?.issues[0]! as QowaivIssue;
        expect(isQowaivIssue(issue)).toBe(true);
        expect(issue.params.qowaiv).toBe('invalid_email_address_ip_based');
    });

    it('is valid', () => {
        const definition = z.object({
            emailAddress: q.email()
        });
        const result = definition.safeParse({
            emailAddress: 'valid@email.com',
        });

        expect(result.success).toBe(true);
        expect(result.error).toBeUndefined();
    });

    it('is valid ip based', () => {
        const definition = z.object({
            emailAddress: q.email().ipBased(),
        });
        const result = definition.safeParse({
            emailAddress: 'valid@0.0.0.0',
        });
        
        console.log(result.error)

        expect(result.success).toBe(true);
        expect(result.error).toBeUndefined();
    });

        it('is valid if optional', () => {
        const definition = z.object({
            emailAddress: q.email().optional()
        });
        const result = definition.safeParse({
            emailAddress: undefined,
        });

        expect(result.success).toBe(true);
        expect(result.error).toBeUndefined();
    });
});
