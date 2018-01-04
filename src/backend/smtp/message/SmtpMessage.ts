import {JsonObjectComposite} from "../../application/aux/JsonObjectComposite";
import {ISmtpField} from "./fields/ISmtpField";

export class SmtpMessage {
    private smtpFields: ISmtpField[];

    constructor(...fields: ISmtpField[]) {
        this.smtpFields = fields;
    }

    public message(): any {
        return new JsonObjectComposite(
            this.smtpFields.map(
                (x) => x.field()
            )
        ).merge();
    }
}
