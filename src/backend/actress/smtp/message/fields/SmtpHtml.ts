import {IHtmlEngine} from "../../../html/IHtmlEngine";
import {ISmtpField} from "./ISmtpField";

export class SmtpHtml implements ISmtpField {
    private html: IHtmlEngine;
    private values: any;

    constructor(html: IHtmlEngine, values: any = {}) {
        this.html = html;
        this.values = values;
    }

    public field(): any {
        return {
            html: this.html.render(this.values)
        };
    }
}
