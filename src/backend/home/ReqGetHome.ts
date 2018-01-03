import { Request } from "express";
import { IConfiguration } from "../configuration/IConfiguration";
import { ValuePathViaDots } from "../configuration/ValuePathViaDots";
import { IOutput } from "../http/outputs/IOutput";
import { IRequest } from "../http/requests/IRequest";
import { ImageInstagram } from "../instagram/ImageInstagram";
import { ImagesInstagramRecent } from "../instagram/ImagesInstagramRecent";

export class ReqGetHome implements IRequest {
    private configuration: IConfiguration;
    private images: ImagesInstagramRecent;
    private out: IOutput;

    constructor(configuration: IConfiguration, images: ImagesInstagramRecent, output: IOutput) {
        this.configuration = configuration;
        this.images = images;
        this.out = output;
    }

    public async output(req: Request): Promise<IOutput> {
        const recent = await this.images.images();
        return this.out.with({
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
            images: recent.map((img: ImageInstagram) => {
                return {
                    href: img.href(),
                    src: img.src("standard_resolution")
                };
            }),
            phone: this.configuration.value(
                new ValuePathViaDots("Contacts.phone"),
                "default"
            )
        });
    }
}
