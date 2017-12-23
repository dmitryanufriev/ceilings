import { Response } from "express";
import * as nunjucks from "nunjucks";
import { IOutput } from "./IOutput";

export class OutHtmlNunjucks implements IOutput {
    private template: string;
    private values: any;

    constructor(template: string, values: any = {}) {
        this.template = template;
        this.values = values;
    }

    public with(values: any): IOutput {
        return new OutHtmlNunjucks(this.template, this.values);
    }

    public write(res: Response): void {
        res.write(nunjucks.render(this.template, this.values));
        res.end();
    }
}
