/* eslint-disable no-underscore-dangle */
import {
    addIssueToContext,
    INVALID,
    type ParseContext,
    type ParseInput,
    type ParseReturnType,
    ParseStatus,
    ZodIssueCode,
    ZodType,
    type ZodTypeDef,
} from 'zod';
import { EmailAddress } from '@qowaiv/qowaiv';
import { QowaivZodIssueCode } from './QowaivZodIssueCode';

export type EmailCheck = { kind: 'invalid_email_address_ip_based' };

export interface EmailDef extends ZodTypeDef {
    checks: EmailCheck[];
}

class EmailValidator extends ZodType<EmailAddress | undefined, EmailDef, unknown> {
    _parse(input: ParseInput): ParseReturnType<EmailAddress | undefined> {
   
        let ctx: undefined | ParseContext = undefined;
        const status = new ParseStatus();
        const parsed = typeof input.data === 'string' ? EmailAddress.tryParse(input.data) : undefined;
        const svo = parsed instanceof EmailAddress ? parsed : undefined;

        if (svo === undefined) {
            ctx = this._getOrReturnCtx(input, ctx);

            addIssueToContext(ctx, {
                code: 'custom',
                params: {
                    qowaiv: QowaivZodIssueCode.invalid_email_address,
                },
            });

            status.dirty();
            return INVALID;
        }

        input.data = svo;

        for (const check of this._def.checks) {
            if (check.kind === 'invalid_email_address_ip_based' && svo.isIPBased) {
                ctx = this._getOrReturnCtx(input, ctx);

                addIssueToContext(ctx, {
                    code: ZodIssueCode.custom,
                    params: { qowaiv: QowaivZodIssueCode.invalid_email_address_ip_based },
                });

                status.dirty();
                return INVALID;
            }
        }

        return { status: status.value, value: svo };
    }

    ipBased() {
        return this._removeCheck({
            kind: QowaivZodIssueCode.invalid_email_address_ip_based,
        });
    }

    _addCheck(check: EmailCheck) {
        return new EmailValidator({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    
    _removeCheck(check: EmailCheck) {
        return new EmailValidator({
            ...this._def,
            checks: this._def.checks.filter(current => current.kind !== check.kind),
        });
    }
}

export const email = (): EmailValidator => new EmailValidator({ checks: [{ kind: QowaivZodIssueCode.invalid_email_address_ip_based }] });
