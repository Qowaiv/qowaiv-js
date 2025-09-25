import { z } from 'zod';
import { qowaivErrorMap } from './QowaivError';
import { guid } from './Guid';
import { email } from './Email';
import { iban } from './Iban';
import { percentage } from './Percentage';
import { postalCode } from './PostalCode';

z.setErrorMap(qowaivErrorMap);

export const q = {
    guid,
    email,
    iban,
    percentage,
    postalCode,
};
