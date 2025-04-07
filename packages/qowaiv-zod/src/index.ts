import { z } from 'zod/lib';
import { qowaivErrorMap } from './QowaivError';

z.setErrorMap(qowaivErrorMap);

export const q = {};
