import {ISmtpField} from "./ISmtpField";

export class SmtpSubject implements ISmtpField {
    private subject: string;

    constructor(subject: string) {
        this.subject = subject;
    }

    public field(): any {
        return {
            subject: this.subject
        };
    }
}
