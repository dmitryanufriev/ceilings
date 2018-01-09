import * as nodemailer from "nodemailer";
import {IConfiguration} from "../../configuration/IConfiguration";
import {SmtpMessage} from "../message/SmtpMessage";
import {ISmtpTransport} from "./ISmtpTransport";

export class SmtpMailRu implements ISmtpTransport {
    private mailru: IConfiguration;

    constructor(mailru: IConfiguration) {
        this.mailru = mailru;
    }

    public async send(message: SmtpMessage): Promise<void> {
        const transport = nodemailer.createTransport({
            auth: {
                pass: this.mailru.value("Password"),
                user: this.mailru.value("User")
            },
            host: this.mailru.value("Server"),
            pool: true,
            port: 465,
            secure: true
        });
        const ready = await transport.verify();
        if (ready) {
            console.log("Ready to send");
        } else {
            console.log("Fail to verify");
        }
        await transport.sendMail(
            message.message()
        );
    }
}
