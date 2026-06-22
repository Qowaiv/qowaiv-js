import { z } from 'zod';
import { qowaivErrorMap } from './QowaivError';
import { email, type EmailAddressValidator } from './Email';
import { iban, type InternationalBankAccountNumberValidator } from './Iban';

z.setErrorMap(qowaivErrorMap);

export const q: {
    email: () => EmailAddressValidator;
    iban: () => InternationalBankAccountNumberValidator;
} = { email, iban };
