import {Request} from "express";
import {IActionAsync} from "../actress/actions/IActionAsync";
import {IConfiguration} from "../actress/configuration/IConfiguration";
import {IImages} from "../actress/images/IImages";
import {ImageInstagram} from "../actress/images/instagram/ImageInstagram";
import {IOutput} from "../actress/outputs/IOutput";

export class ActHomeGet implements IActionAsync {
    private contacts: IConfiguration;
    private images: IImages;
    private out: IOutput;

    constructor(contacts: IConfiguration, images: IImages, output: IOutput) {
        this.contacts = contacts;
        this.images = images;
        this.out = output;
    }

    public async output(req: Request): Promise<IOutput> {
        const recent = await this.images.all();
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
