import * as nunjucks from "nunjucks";
import {ISmtpField} from "./ISmtpField";
import {SmtpHtml} from "./SmtpHtml";

export class SmtpHtmlTemplate implements ISmtpField {
    private template: string;
    private values: any;

    constructor(template: string, values: any = {}) {
        this.template = template;
        this.values = values;
    }

    public field(): any {
        return new SmtpHtml(
            nunjucks.render(this.template, this.values)
        ).field();
    }
}
