import { util } from 'zod';

export const QowaivZodIssueCode = util.arrayToEnum([
    'invalid_date_only',
    'invalid_guid',
    'invalid_email_address',
    'invalid_email_address_ip_based',
    'invalid_iban',
    'invalid_percentage',
    'invalid_postal_code',
]);
