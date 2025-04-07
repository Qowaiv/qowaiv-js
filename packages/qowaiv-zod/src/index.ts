import { z } from 'zod';
import { qowaivErrorMap } from './QowaivError';
import { emailAddress } from './email-address';

z.setErrorMap(qowaivErrorMap);

export const q = {
    emailAddress: emailAddress,
};
