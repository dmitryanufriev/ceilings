import {EmailAddress} from "../../EmailAddress";
import {ISmtpField} from "./ISmtpField";

export class SmtpFrom implements ISmtpField {
    private address: EmailAddress;

    constructor(address: EmailAddress) {
        this.address = address;
    }

    public field(): any {
        return {
            from: this.address.toString()
        };
    }
}
