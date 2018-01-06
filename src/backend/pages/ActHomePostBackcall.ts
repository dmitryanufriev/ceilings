import {Request} from "express";
import {IActionAsync} from "../application/actions/IActionAsync";
import {IHtmlEngine} from "../application/html/IHtmlEngine";
import {IOutput} from "../application/outputs/IOutput";
import {IConfiguration} from "../configuration/IConfiguration";
import {EmailAddress} from "../smtp/EmailAddress";
import {SmtpFrom} from "../smtp/message/fields/SmtpFrom";
import {SmtpHtml} from "../smtp/message/fields/SmtpHtml";
import {SmtpSubject} from "../smtp/message/fields/SmtpSubject";
import {SmtpTo} from "../smtp/message/fields/SmtpTo";
import {SmtpMessage} from "../smtp/message/SmtpMessage";
import {ISmtpTransport} from "../smtp/transport/ISmtpTransport";

export class ActHomePostBackcall implements IActionAsync {
    private configuration: IConfiguration;
    private html: IHtmlEngine;
    private smtp: ISmtpTransport;
    private out: IOutput;

    constructor(configuration: IConfiguration, html: IHtmlEngine, smtp: ISmtpTransport, output: IOutput) {
        this.configuration = configuration;
        this.html = html;
        this.smtp = smtp;
        this.out = output;
    }

    public async output(req: Request): Promise<IOutput> {
        await this.smtp.send(
            new SmtpMessage(
                new SmtpFrom(
                    new EmailAddress(
                        this.configuration.value("email"),
                        "Натяжные потолки от Жени"
                    )
                ),
                new SmtpTo(
                    new EmailAddress(
                        this.configuration.value("Admin")
                    )
                ),
                new SmtpSubject(
                    "Обратный звонок"
                ),
                new SmtpHtml(
                    this.html,
                    req.body
                )
            )
        );
        return this.out;
    }
}
