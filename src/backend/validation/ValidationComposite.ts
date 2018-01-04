import {IValidationRule} from "./IValidationRule";

export class ValidationComposite implements IValidationRule {
    private rules: IValidationRule[];

    constructor(...rules: IValidationRule[]) {
        this.rules = rules;
    }

    public valid(body: any): boolean {
        return this.rules.every((x) => x.valid(body));
    }
}
