import { Request } from "express";
import { IConfiguration } from "../configuration/IConfiguration";
import { IOutput } from "../http/outputs/IOutput";
import { IRequest } from "../http/requests/IRequest";
import { ImageInstagram } from "../instagram/ImageInstagram";
import { ImagesInstagramRecent } from "../instagram/ImagesInstagramRecent";

export class ReqGetHome implements IRequest {
    private contacts: IConfiguration;
    private images: ImagesInstagramRecent;
    private out: IOutput;

    constructor(contacts: IConfiguration, images: ImagesInstagramRecent, output: IOutput) {
        this.contacts = contacts;
        this.images = images;
        this.out = output;
    }

    public async output(req: Request): Promise<IOutput> {
        const recent = await this.images.images();
        return this.out.with({
            Facebook: this.contacts.value(
                "Social.Facebook"
            ),
            Instagram: this.contacts.value(
                "Social.Instagram"
            ),
            VKontakte: this.contacts.value(
                "Social.VKontakte"
            ),
            email: this.contacts.value(
                "email"
            ),
            images: recent.map((img: ImageInstagram) => {
                return {
                    href: img.href(),
                    src: img.src("standard_resolution")
                };
            }),
            phone: this.contacts.value(
                "phone"
            )
        });
    }
}
