import { util, defaultErrorMap, ErrorMapCtx, ZodIssueBase, ZodIssueOptionalMessage } from 'zod/v3';

export const QowaivIssueCode = util.arrayToEnum([
    'invalid_guid',
    'invalid_email_address',
    'invalid_email_address_ip_based',
    'invalid_iban',
]);

export interface QowaivInvalidGuidIssue extends ZodIssueBase {
    code: 'custom';
    params: { qowaiv: typeof QowaivIssueCode.invalid_guid };
}

export interface QowaivInvalidEmailIssue extends ZodIssueBase {
    code: 'custom';
    params: { qowaiv: typeof QowaivIssueCode.invalid_email_address };
}

export interface QowaivInvalidEmailIpBasedIssue extends ZodIssueBase {
    code: 'custom';
    params: { qowaiv: typeof QowaivIssueCode.invalid_email_address_ip_based };
}

export interface QowaivInvalidInternationalBankAccountNumber extends ZodIssueBase {
    code: 'custom';
    params: { qowaiv: typeof QowaivIssueCode.invalid_iban };
}

export type QowaivIssue = 
    QowaivInvalidEmailIssue
    | QowaivInvalidEmailIpBasedIssue
    | QowaivInvalidGuidIssue
    | QowaivInvalidInternationalBankAccountNumber;

export function isQowaivIssue(issue: ZodIssueOptionalMessage | QowaivIssue): issue is QowaivIssue {
    return (issue.code === 'custom'
        && issue.params !== undefined
        && 'qowaiv' in issue.params
        && issue.params.qowaiv in QowaivIssueCode
    );
}

export type QowaivErrorMap = (
    issue: ZodIssueOptionalMessage | QowaivIssue,
    _ctx: ErrorMapCtx
) => { message: string };

export const qowaivErrorMap: QowaivErrorMap = (issue, _ctx) => {
    return isQowaivIssue(issue)
        ? { message: messages.get(issue.params.qowaiv)! }
        : defaultErrorMap(issue, _ctx);
};

const messages = new Map<string, string>([
    [QowaivIssueCode.invalid_guid, 'Invalid GUID'],
    [QowaivIssueCode.invalid_email_address, 'Invalid email address'],
    [QowaivIssueCode.invalid_email_address_ip_based, 'IP-based email address'],
    [QowaivIssueCode.invalid_iban, 'Invalid IBAN'],
]);
