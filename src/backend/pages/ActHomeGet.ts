import {Request} from "express";
import {IActionAsync} from "../actress/actions/IActionAsync";
import {IConfiguration} from "../actress/configuration/IConfiguration";
import {ImageInstagram} from "../actress/instagram/ImageInstagram";
import {ImagesInstagramRecent} from "../actress/instagram/ImagesInstagramRecent";
import {IOutput} from "../actress/outputs/IOutput";

export class ActHomeGet implements IActionAsync {
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
                    src: img.src()
                };
            }),
            phone: this.contacts.value(
                "phone"
            )
        });
    }
}
