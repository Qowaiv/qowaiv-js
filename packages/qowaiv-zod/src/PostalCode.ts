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
import { PostalCode } from "@qowaiv/qowaiv";
import { QowaivZodIssueCode } from './QowaivZodIssueCode';

export type PostalCodeCheck = { kind: "invalid_postal_code" };

export interface PostalCodeDef extends ZodTypeDef {
    checks: PostalCodeCheck[];
}

class PostalCodeValidator extends ZodType<
    PostalCode | undefined,
    PostalCodeDef,
    unknown
> {
    _parse(
        input: ParseInput
    ): ParseReturnType<PostalCode | undefined> {

        let ctx: undefined | ParseContext = undefined;
        const status = new ParseStatus();
        const parsed = typeof input.data === "string" ? PostalCode.tryParse(input.data) : undefined;
        const svo = parsed instanceof PostalCode ? parsed : undefined;

        if (svo === undefined) {
            ctx = this._getOrReturnCtx(input, ctx);

            addIssueToContext(ctx, {
                code: "custom",
                params: { qowaiv: QowaivZodIssueCode.invalid_postal_code },
            });

            status.dirty();
            return INVALID;
        }

        input.data = svo;

        return { status: status.value, value: svo };
    }

    _addCheck(check: PostalCodeCheck) {
        return new PostalCodeValidator({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }

    _removeCheck(check: PostalCodeCheck) {
        return new PostalCodeValidator({
            ...this._def,
            checks: this._def.checks.filter(cur => cur.kind !== check.kind),
        });
    }
}

export const postalCode = (): PostalCodeValidator => new PostalCodeValidator({ checks: [{ kind: QowaivZodIssueCode.invalid_postal_code }] });
