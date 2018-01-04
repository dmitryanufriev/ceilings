import * as e from "express";
import {IValidationRule} from "../../validation/IValidationRule";
import {IOutput} from "../outputs/IOutput";
import {IActionAsync} from "./IActionAsync";

export class ActRequestBodyValidated implements IActionAsync {
    private rule: IValidationRule;
    private out: IOutput;
    private origin: IActionAsync;

    constructor(rule: IValidationRule, output: IOutput, origin: IActionAsync) {
        this.rule = rule;
        this.out = output;
        this.origin = origin;
    }

    public output(req: e.Request): Promise<IOutput> {
        return this.rule.valid(req.body)
            ? this.origin.output(req)
            : Promise.resolve(this.out);
    }
}
