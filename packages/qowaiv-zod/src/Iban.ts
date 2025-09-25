/* eslint-disable no-underscore-dangle */
import {
  addIssueToContext,
  INVALID,
  type ParseContext,
  type ParseInput,
  type ParseReturnType,
  ParseStatus,
  ZodType,
  type ZodTypeDef,
} from "zod";
import { InternationalBankAccountNumber } from "@qowaiv/qowaiv";
import { QowaivZodIssueCode } from './QowaivZodIssueCode';

export type IbanCheck = { kind: "invalid_iban" };

export interface IbanDef extends ZodTypeDef {
    checks: IbanCheck[];
}

class IbanValidator extends ZodType<
    InternationalBankAccountNumber | undefined,
    IbanDef,
    unknown
> {
    _parse(
        input: ParseInput
    ): ParseReturnType<InternationalBankAccountNumber | undefined> {
        let ctx: undefined | ParseContext = undefined;

        const status = new ParseStatus();

        const parsed =
            typeof input.data === "string"
                ? InternationalBankAccountNumber.tryParse(input.data)
                : undefined;
        const iban =
            parsed instanceof InternationalBankAccountNumber
                ? parsed
                : undefined;

        if (iban === undefined) {
            ctx = this._getOrReturnCtx(input, ctx);

            addIssueToContext(ctx, {
                code: "custom",
                params: {
                    qowaiv: QowaivZodIssueCode.invalid_iban,
                },
            });

            status.dirty();

            return INVALID;
        }

        input.data = iban;

        return { status: status.value, value: iban };
    }

    _addCheck(check: IbanCheck) {
        return new IbanValidator({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }

    _removeCheck(check: IbanCheck) {
        return new IbanValidator({
            ...this._def,
            checks: this._def.checks.filter(
                (current) => current.kind !== check.kind
            ),
        });
    }
}

export const iban = (): IbanValidator => new IbanValidator({ checks: [{ kind: QowaivZodIssueCode.invalid_iban }] });
