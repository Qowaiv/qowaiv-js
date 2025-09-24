import { ZodIssueOptionalMessage } from 'zod';
import { QowaivZodIssue } from './QowaivZodIssue';
import { QowaivZodIssueCode } from './QowaivZodIssueCode';

export class QowaivZodIssues {

    public static readonly messages = new Map<string, string>([
        [QowaivZodIssueCode.invalid_date_only, 'Invalid date'],
        [QowaivZodIssueCode.invalid_guid, 'Invalid GUID'],
        [QowaivZodIssueCode.invalid_email_address, 'Invalid email address'],
        [QowaivZodIssueCode.invalid_email_address_ip_based, 'IP-based email address'],
        [QowaivZodIssueCode.invalid_iban, 'Invalid IBAN'],
        [QowaivZodIssueCode.invalid_percentage, 'Invalid percentage'],
        [QowaivZodIssueCode.invalid_postal_code, 'Invalid postal code'],
    ]);

    /**
     * Indicates that the issue is a Qowaiv Zod issue.
     * @param issue the issue to check.
     */
    public static supports(issue: ZodIssueOptionalMessage | QowaivZodIssue): issue is QowaivZodIssue {
        return issue.code === 'custom'
            && issue.params !== undefined
            && 'qowaiv' in issue.params
            && issue.params.qowaiv in QowaivZodIssueCode;
    }
}