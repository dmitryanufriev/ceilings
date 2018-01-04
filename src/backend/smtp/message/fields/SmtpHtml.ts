import {ISmtpField} from "./ISmtpField";

export class SmtpHtml implements ISmtpField {
    private html: string;

    constructor(html: string) {
        this.html = html;
    }

    public field(): any {
        return {
            html: this.html
        };
    }
}
