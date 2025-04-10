import { z } from 'zod';
import { qowaivErrorMap } from './QowaivError';
import { email } from './Email';

z.setErrorMap(qowaivErrorMap);

export const q = {
    email,
};
