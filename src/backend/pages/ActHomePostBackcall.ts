import {Request} from "express";
import {IActionAsync} from "../application/actions/IActionAsync";
import {IOutput} from "../application/outputs/IOutput";
import {EmailAddress} from "../smtp/EmailAddress";
import {SmtpFrom} from "../smtp/message/fields/SmtpFrom";
import {SmtpSubject} from "../smtp/message/fields/SmtpSubject";
import {SmtpText} from "../smtp/message/fields/SmtpText";
import {SmtpTo} from "../smtp/message/fields/SmtpTo";
import {SmtpMessage} from "../smtp/message/SmtpMessage";
import {ISmtpTransport} from "../smtp/transport/ISmtpTransport";

export class ActHomePostBackcall implements IActionAsync {
    private smtp: ISmtpTransport;
    private out: IOutput;

    constructor(smtp: ISmtpTransport, output: IOutput) {
        this.smtp = smtp;
        this.out = output;
    }

    public async output(req: Request): Promise<IOutput> {
        await this.smtp.send(
            new SmtpMessage(
                new SmtpFrom(
                    new EmailAddress(
                        "170981@bk.ru"
                    )
                ),
                new SmtpTo(
                    new EmailAddress(
                        "dmitryanufriev@gmail.com"
                    )
                ),
                new SmtpSubject(
                    "Натяжные потолки от Жени - Обратный звонок"
                ),
                new SmtpText(
                    "Hello world!"
                )
            )
        );
        return this.out;
    }
}
