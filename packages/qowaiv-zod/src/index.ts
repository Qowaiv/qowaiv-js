import { z } from 'zod';
import { qowaivErrorMap } from './QowaivError';
import { emailAddress } from './EmailAddress';

z.setErrorMap(qowaivErrorMap);

export const q = {
    emailAddress: emailAddress,
};
