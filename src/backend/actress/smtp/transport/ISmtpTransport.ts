import {SmtpMessage} from "../message/SmtpMessage";

export interface ISmtpTransport {
    send(message: SmtpMessage): Promise<void>;
}
