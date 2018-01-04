import {IValidationRule} from "./IValidationRule";

export class MaxLength implements IValidationRule {
    private field: string;
    private maxLength: number;

    constructor(field: string, maxLength: number) {
        this.field = field;
        this.maxLength = maxLength;
    }

    public valid(body: any): boolean {
        return !body[this.field] || body[this.field].length <= this.maxLength;
    }
}
