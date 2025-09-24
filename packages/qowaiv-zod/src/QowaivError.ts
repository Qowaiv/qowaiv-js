import { ErrorMapCtx, ZodIssueOptionalMessage } from 'zod';
import { defaultErrorMap } from 'zod';
import { QowaivZodIssue } from './QowaivZodIssue';
import { QowaivZodIssues } from './QowaivZodIssues';

export type QowaivErrorMap = (
    issue: ZodIssueOptionalMessage | QowaivZodIssue,
    _ctx: ErrorMapCtx
) => { message: string };

export const qowaivErrorMap: QowaivErrorMap = (issue, _ctx) =>
    QowaivZodIssues.supports(issue)
    ? { message: QowaivZodIssues.messages.get(issue.params.qowaiv)! }
    : defaultErrorMap(issue, _ctx);

