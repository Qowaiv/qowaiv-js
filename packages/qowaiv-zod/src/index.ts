import { z } from 'zod/v3';
import { qowaivErrorMap } from './QowaivError';
import { email } from './Email';
import { iban } from './Iban';

z.setErrorMap(qowaivErrorMap);

export const q = {
    email,
    iban,
};
