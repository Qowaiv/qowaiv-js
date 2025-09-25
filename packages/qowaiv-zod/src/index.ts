import { z } from 'zod';
import { qowaivErrorMap } from './QowaivError';
import { guid } from './Guid';
import { email } from './Email';
import { iban } from './Iban';

z.setErrorMap(qowaivErrorMap);

export const q = {
    guid,
    email,
    iban,
};
