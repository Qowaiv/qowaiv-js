import { util } from 'zod';

export const QowaivIssueCode = util.arrayToEnum([
    "invalid_email",
    "invalid_email_ipbased",
]);

export type ZodIssueCode = keyof typeof QowaivIssueCode;

export function isQowaivIssueCode(issueCode: string): issueCode is keyof typeof QowaivIssueCode {
    return Object.keys(QowaivIssueCode).indexOf(issueCode) !== -1;
}
