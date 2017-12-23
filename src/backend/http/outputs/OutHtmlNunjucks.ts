import { Response } from "express";
import { IOutput } from "./IOutput";

export class OutHtmlNunjucks implements IOutput {
    private template: string;
    private values: any;

    constructor(template: string, values: any = {}) {
        this.template = template;
        this.values = values;
    }

    with(values: any): IOutput {
        return new OutHtmlNunjucks(this.template, this.values);
    }

    write(res: Response): void {
        res.render(this.template, this.values);
    }
}