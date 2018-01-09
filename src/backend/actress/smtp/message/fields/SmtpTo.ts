import {EmailAddress} from "../../EmailAddress";
import {ISmtpField} from "./ISmtpField";

export class SmtpTo implements ISmtpField {
    private addresses: EmailAddress[];

    constructor(...addresses: EmailAddress[]) {
        this.addresses = addresses;
    }

    public field(): any {
        return {
            to: this.addresses.map(
                (x) => x.toString()
            ).join(", ")
        };
    }
}
