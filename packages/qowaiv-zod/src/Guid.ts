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
import { Guid } from "@qowaiv/qowaiv";
import { QowaivZodIssueCode } from './QowaivZodIssueCode';

export type GuidCheck = { kind: "invalid_guid" };

export interface GuidDef extends ZodTypeDef {
    checks: GuidCheck[];
}

class GuidValidator extends ZodType<
    Guid | undefined,
    GuidDef,
    unknown
> {
    _parse(
        input: ParseInput
    ): ParseReturnType<Guid | undefined> {

        let ctx: undefined | ParseContext = undefined;
        const status = new ParseStatus();
        const parsed = typeof input.data === "string" ? Guid.tryParse(input.data) : undefined;
        const svo = parsed instanceof Guid ? parsed : undefined;

        if (svo === undefined) {
            ctx = this._getOrReturnCtx(input, ctx);

            addIssueToContext(ctx, {
                code: "custom",
                params: { qowaiv: QowaivZodIssueCode.invalid_guid },
            });

            status.dirty();
            return INVALID;
        }

        input.data = svo;

        return { status: status.value, value: svo };
    }

    _addCheck(check: GuidCheck) {
        return new GuidValidator({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }

    _removeCheck(check: GuidCheck) {
        return new GuidValidator({
            ...this._def,
            checks: this._def.checks.filter(
                (current) => current.kind !== check.kind
            ),
        });
    }
}

export const guid = (): GuidValidator => new GuidValidator({ checks: [{ kind: QowaivZodIssueCode.invalid_guid }] });
