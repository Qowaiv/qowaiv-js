import { util } from 'zod';
import { ErrorMapCtx, ZodErrorMap, ZodIssueBase, ZodIssueOptionalMessage } from 'zod';
import { defaultErrorMap } from 'zod';

export const QowaivIssueCode = util.arrayToEnum([
    'invalid_email_address',
    'invalid_email_address_ip_based',
]);

export interface QowaivInvalidEmailIssue extends ZodIssueBase {
    code: 'custom';
    params: {
        qowaiv: typeof QowaivIssueCode.invalid_email_address;
    };
}

export interface QowaivInvalidEmailIpBasedIssue extends ZodIssueBase {
    code: 'custom';
    params: {
        qowaiv: typeof QowaivIssueCode.invalid_email_address_ip_based;
    };
}

export type QowaivIssue = QowaivInvalidEmailIssue | QowaivInvalidEmailIpBasedIssue;

export function isQowaivIssue(issue: ZodIssueOptionalMessage | QowaivIssue): issue is QowaivIssue {
    return (
        issue.code === 'custom' &&
        issue.params !== undefined &&
        'qowaiv' in issue.params &&
        issue.params.qowaiv in QowaivIssueCode
    );
}

export type QowaivErrorMap = (
    issue: ZodIssueOptionalMessage | QowaivIssue,
    _ctx: ErrorMapCtx
) => { message: string };

export const qowaivErrorMap: QowaivErrorMap = (issue, _ctx) => {
    if (!isQowaivIssue(issue)) {
        return defaultErrorMap(issue, _ctx);
    }

    switch (issue.params.qowaiv) {
        case QowaivIssueCode.invalid_email_address:
            return {
                message: 'Invalid e-mail address',
            };
        case QowaivIssueCode.invalid_email_address_ip_based:
            return {
                message: 'IP-based e-mail address not allowed',
            };
    }
};
