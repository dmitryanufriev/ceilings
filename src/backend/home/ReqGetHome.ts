import { Request } from "express";
import { IConfiguration } from "../configuration/IConfiguration";
import { ValuePathViaDots } from "../configuration/ValuePathViaDots";
import { IOutput } from "../http/outputs/IOutput";
import { IRequest } from "../http/requests/IRequest";

export class ReqGetHome implements IRequest {
    private configuration: IConfiguration;
    private out: IOutput;

    constructor(configuration: IConfiguration, output: IOutput) {
        this.configuration = configuration;
        this.out = output;
    }

    public output(req: Request): Promise<IOutput> {
        return Promise.resolve(
            this.out.with({
                Facebook: this.configuration.value(
                    new ValuePathViaDots("Contacts.Social.Facebook"),
                    "default"
                ),
                Instagram: this.configuration.value(
                    new ValuePathViaDots("Contacts.Social.Instagram"),
                    "default"
                ),
                VKontakte: this.configuration.value(
                    new ValuePathViaDots("Contacts.Social.VKontakte"),
                    "default"
                ),
                email: this.configuration.value(
                    new ValuePathViaDots("Contacts.email"),
                    "default"
                ),
                phone: this.configuration.value(
                    new ValuePathViaDots("Contacts.phone"),
                    "default"
                )
            })
        );
    }
}
