import { ZodIssueBase } from 'zod';

export interface QowaivZodIssue extends ZodIssueBase {
    code: 'custom';
    params: { qowaiv: string };
}