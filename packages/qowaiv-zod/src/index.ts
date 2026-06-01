import { z } from 'zod';
import { qowaivErrorMap } from './QowaivError';
import { email } from './Email';
import { iban } from './Iban';

z.setErrorMap(qowaivErrorMap);

export const q: {
    email: typeof email;
    iban: typeof iban;
} = {
    email,
    iban,
};
