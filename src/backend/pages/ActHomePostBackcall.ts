import {Request} from "express";
import {IActionAsync} from "../application/actions/IActionAsync";
import {IOutput} from "../application/outputs/IOutput";
import {IConfiguration} from "../configuration/IConfiguration";
import {EmailAddress} from "../smtp/EmailAddress";
import {SmtpFrom} from "../smtp/message/fields/SmtpFrom";
import {SmtpHtmlTemplate} from "../smtp/message/fields/SmtpHtmlTemplate";
import {SmtpSubject} from "../smtp/message/fields/SmtpSubject";
import {SmtpTo} from "../smtp/message/fields/SmtpTo";
import {SmtpMessage} from "../smtp/message/SmtpMessage";
import {ISmtpTransport} from "../smtp/transport/ISmtpTransport";

export class ActHomePostBackcall implements IActionAsync {
    private server: IConfiguration;
    private contacts: IConfiguration;
    private smtp: ISmtpTransport;
    private out: IOutput;

    constructor(server: IConfiguration, contacts: IConfiguration, smtp: ISmtpTransport, output: IOutput) {
        this.server = server;
        this.contacts = contacts;
        this.smtp = smtp;
        this.out = output;
    }

    public async output(req: Request): Promise<IOutput> {
        await this.smtp.send(
            new SmtpMessage(
                new SmtpFrom(
                    new EmailAddress(
                        this.contacts.value("email"),
                        "Натяжные потолки от Жени"
                    )
                ),
                new SmtpTo(
                    new EmailAddress(
                        this.server.value("Admin")
                    )
                ),
                new SmtpSubject(
                    "Обратный звонок"
                ),
                new SmtpHtmlTemplate(
                    "email/backcall.html",
                    req.body
                )
            )
        );
        return this.out;
    }
}
