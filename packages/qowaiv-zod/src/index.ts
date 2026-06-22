import { z } from 'zod/v3';
import { qowaivErrorMap } from './QowaivError';
import { email, type EmailAddressValidator } from './Email';
import { guid, type GuidValidator } from './Guid';
import { iban, type InternationalBankAccountNumberValidator } from './Iban';

z.setErrorMap(qowaivErrorMap);

export const q: {
    email: () => EmailAddressValidator;
    guid: () => GuidValidator;
    iban: () => InternationalBankAccountNumberValidator;
} = { email, guid, iban };
