import {IValidationRule} from "./IValidationRule";

export class Required implements IValidationRule {
    private field: string;

    constructor(field: string) {
        this.field = field;
    }

    public valid(body: any): boolean {
        return body[this.field];
    }
}
