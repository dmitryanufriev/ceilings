import {ISmtpField} from "./ISmtpField";

export class SmtpText implements ISmtpField {
    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    public field(): any {
        return {
            text: this.text
        };
    }
}
