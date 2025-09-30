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
import { Percentage } from "@qowaiv/qowaiv";
import { QowaivZodIssueCode } from './QowaivZodIssueCode';

export type PercentageCheck = { kind: "invalid_percentage" };

export interface PercentageDef extends ZodTypeDef {
    checks: PercentageCheck[];
}

class PercentageValidator extends ZodType<
    Percentage | undefined,
    PercentageDef,
    unknown
> {
    _parse(
        input: ParseInput
    ): ParseReturnType<Percentage | undefined> {

        let ctx: undefined | ParseContext = undefined;
        const status = new ParseStatus();
        const parsed = typeof input.data === "string" ? Percentage.tryParse(input.data) : undefined;
        const percentage = parsed instanceof Percentage ? parsed : undefined;

        if (percentage === undefined) {
            ctx = this._getOrReturnCtx(input, ctx);

            addIssueToContext(ctx, {
                code: "custom",
                params: { qowaiv: QowaivZodIssueCode.invalid_percentage },
            });

            status.dirty();
            return INVALID;
        }

        input.data = percentage;

        return { status: status.value, value: percentage };
    }

    _addCheck(check: PercentageCheck) {
        return new PercentageValidator({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }

    _removeCheck(check: PercentageCheck) {
        return new PercentageValidator({
            ...this._def,
            checks: this._def.checks.filter(cur => cur.kind !== check.kind),
        });
    }
}

export const percentage = (): PercentageValidator => new PercentageValidator({ checks: [{ kind: QowaivZodIssueCode.invalid_percentage }] });
