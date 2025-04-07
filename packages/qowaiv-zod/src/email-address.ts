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
import { QowaivIssueCode } from './QowaivError';

export type EmailAddressCheck = { kind: 'invalid_email_address' } | { kind: 'invalid_email_address_ipbased' };

export interface EmailAddressDef extends ZodTypeDef {
    checks: EmailAddressCheck[];
}

class EmailAddressValidator extends ZodType<EmailAddress | undefined, EmailAddressDef, unknown> {
    _parse(input: ParseInput): ParseReturnType<EmailAddress | undefined> {
        let ctx: undefined | ParseContext = undefined;

        const status = new ParseStatus();

        const parsed = typeof input.data === 'string' ? EmailAddress.tryParse(input.data) : undefined;
        const emailAddress = parsed instanceof EmailAddress ? parsed : undefined;

        if (emailAddress === undefined) {
            ctx = this._getOrReturnCtx(input, ctx);

            addIssueToContext(ctx, {
                code: 'custom',
                params: {
                    qowaiv: QowaivIssueCode.invalid_email_address,
                },
            });

            status.dirty();

            return INVALID;
        }

        input.data = emailAddress;

        for (const check of this._def.checks) {
            if (check.kind === 'invalid_email_address_ipbased' && emailAddress.isIPBased) {
                ctx = this._getOrReturnCtx(input, ctx);

                addIssueToContext(ctx, {
                    code: ZodIssueCode.custom,
                    params: {
                        qowaiv: QowaivIssueCode.invalid_email_address_ip_based,
                    },
                });

                status.dirty();
            }
        }

        return { status: status.value, value: emailAddress };
    }

    noIpBased() {
        return this._addCheck({
            kind: 'invalid_email_address_ipbased',
        });
    }

    _addCheck(check: EmailAddressCheck) {
        return new EmailAddressValidator({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const emailAddress = () =>
    new EmailAddressValidator({
        checks: [],
    });
