import {Request} from "express";
import {IActionAsync} from "../actress/actions/IActionAsync";
import {IConfiguration} from "../actress/configuration/IConfiguration";
import {IHtmlEngine} from "../actress/html/IHtmlEngine";
import {IOutput} from "../actress/outputs/IOutput";
import {EmailAddress} from "../actress/smtp/EmailAddress";
import {SmtpFrom} from "../actress/smtp/message/fields/SmtpFrom";
import {SmtpHtml} from "../actress/smtp/message/fields/SmtpHtml";
import {SmtpSubject} from "../actress/smtp/message/fields/SmtpSubject";
import {SmtpTo} from "../actress/smtp/message/fields/SmtpTo";
import {SmtpMessage} from "../actress/smtp/message/SmtpMessage";
import {ISmtpTransport} from "../actress/smtp/transport/ISmtpTransport";

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
