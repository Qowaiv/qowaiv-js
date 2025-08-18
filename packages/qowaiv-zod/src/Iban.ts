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
import { QowaivIssueCode } from "./QowaivError";

export type InternationalBankAccountNumberCheck = { kind: "invalid_iban" };

export interface InternationalBankAccountNumberDef extends ZodTypeDef {
    checks: InternationalBankAccountNumberCheck[];
}

class InternationalBankAccountNumberValidator extends ZodType<
    InternationalBankAccountNumber | undefined,
    InternationalBankAccountNumberDef,
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
                    qowaiv: QowaivIssueCode.invalid_iban,
                },
            });

            status.dirty();

            return INVALID;
        }

        input.data = iban;

        return { status: status.value, value: iban };
    }

    _addCheck(check: InternationalBankAccountNumberCheck) {
        return new InternationalBankAccountNumberValidator({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }

    _removeCheck(check: InternationalBankAccountNumberCheck) {
        return new InternationalBankAccountNumberValidator({
            ...this._def,
            checks: this._def.checks.filter(
                (current) => current.kind !== check.kind
            ),
        });
    }
}

export const iban = (): InternationalBankAccountNumberValidator =>
    new InternationalBankAccountNumberValidator({
        checks: [
            {
                kind: "invalid_iban",
            },
        ],
    });
